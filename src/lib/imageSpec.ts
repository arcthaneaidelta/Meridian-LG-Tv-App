import { StoreAsset, AssetStatus } from '../data/assets';

export interface ImageInspectionResult {
  width: number;
  height: number;
  format: string;
  weightKb: number;
  status: AssetStatus;
  message: string;
}

export async function inspectLocalImage(file: File, asset: StoreAsset): Promise<ImageInspectionResult> {
  const format = file.type === 'image/png' ? 'PNG' : file.type === 'image/jpeg' ? 'JPG' : file.name.split('.').pop()?.toUpperCase() || 'UNKNOWN';
  const weightKb = Math.round(file.size / 1024);

  return new Promise((resolve) => {
    const img = new Image();
    const objectUrl = URL.createObjectURL(file);

    img.onload = () => {
      URL.revokeObjectURL(objectUrl);
      const width = img.naturalWidth;
      const height = img.naturalHeight;

      let status: AssetStatus = 'pass';
      let message = 'Asset matches required dimensions and weight.';

      const exp = asset.expectedSpec;
      const exactMatch = width === exp.width && height === exp.height;
      const ratioMatch = Math.abs(width / height - exp.width / exp.height) < 0.05;

      if (!exactMatch) {
        if (ratioMatch) {
          status = 'warn';
          message = `Dimensions ${width}×${height} match aspect ratio but differ from target ${exp.dimensions}.`;
        } else {
          status = 'fail';
          message = `Dimensions ${width}×${height} do not match expected ${exp.dimensions}. Crop required.`;
        }
      }

      if (weightKb > exp.maxWeightKb) {
        status = 'fail';
        message = `File size ${weightKb} KB exceeds maximum threshold of ${exp.maxWeight}.`;
      }

      resolve({
        width,
        height,
        format,
        weightKb,
        status,
        message,
      });
    };

    img.onerror = () => {
      URL.revokeObjectURL(objectUrl);
      resolve({
        width: 0,
        height: 0,
        format,
        weightKb,
        status: 'fail',
        message: 'Could not decode image file. Please provide a valid PNG or JPG.',
      });
    };

    img.src = objectUrl;
  });
}

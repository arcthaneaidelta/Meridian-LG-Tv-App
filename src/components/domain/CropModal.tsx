import React, { useState } from 'react';
import { Modal } from '../ui/Modal';
import { Button } from '../ui/Button';
import { StoreAsset } from '../../data/assets';
import { Crop } from 'lucide-react';

interface CropModalProps {
  isOpen: boolean;
  onClose: () => void;
  asset: StoreAsset | null;
  onConfirmCrop: (assetId: string) => void;
}

export const CropModal: React.FC<CropModalProps> = ({
  isOpen,
  onClose,
  asset,
  onConfirmCrop,
}) => {
  const [isApplying, setIsApplying] = useState(false);

  if (!asset) return null;

  const handleApply = () => {
    setIsApplying(true);
    setTimeout(() => {
      onConfirmCrop(asset.id);
      setIsApplying(false);
      onClose();
    }, 450);
  };

  const exp = asset.expectedSpec;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={`Crop ${asset.name} to Spec`}
      description={`Target dimensions: ${exp.dimensions} (${exp.format}) for LG Content Store.`}
      maxWidth="md"
    >
      <div className="flex flex-col gap-4">
        {/* CSS-based visual Crop Preview Box */}
        <div className="relative flex items-center justify-center rounded-md border border-border bg-[#12161A] p-6 overflow-hidden">
          <div className="relative max-w-full flex items-center justify-center">
            {/* Base Image Container */}
            <div className="relative h-44 w-72 bg-[#1E252B] rounded flex items-center justify-center border border-[#34424E] overflow-hidden">
              <div className="text-center p-4">
                <span className="font-mono text-xs text-muted block">Source File ({asset.fileName})</span>
                <span className="text-xs text-app-text-2">{asset.currentInfo.dimensions}</span>
              </div>

              {/* Crop Bounds Overlay Box (CSS dashed outline) */}
              <div
                className="absolute inset-4 border-2 border-dashed border-accent bg-accent/10 flex items-center justify-center pointer-events-none"
                style={{
                  aspectRatio: `${exp.width} / ${exp.height}`,
                }}
              >
                <span className="rounded bg-accent px-2 py-0.5 font-mono text-[10px] font-semibold text-white">
                  Target: {exp.dimensions}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="rounded border border-border bg-surface p-3 text-xs text-app-text-2">
          <p className="font-semibold text-app-text mb-1">Lossless local crop</p>
          <p>
            Adjusts bounds to {exp.dimensions} while preserving color gamut and transparent alpha channels.
          </p>
        </div>

        <div className="flex justify-end gap-3 pt-2">
          <Button variant="secondary" size="sm" onClick={onClose}>
            Cancel
          </Button>
          <Button
            variant="primary"
            size="sm"
            onClick={handleApply}
            isLoading={isApplying}
            icon={<Crop className="h-3.5 w-3.5" />}
          >
            Apply Exact Crop
          </Button>
        </div>
      </div>
    </Modal>
  );
};

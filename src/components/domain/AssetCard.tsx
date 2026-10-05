import React, { useRef, useState } from 'react';
import { Upload, Crop, CheckCircle2, AlertTriangle, AlertCircle, Eye } from 'lucide-react';
import { StoreAsset } from '../../data/assets';
import { StatusPill } from '../ui/StatusPill';
import { Button } from '../ui/Button';
import { inspectLocalImage } from '../../lib/imageSpec';

interface AssetCardProps {
  asset: StoreAsset;
  onUpdateStatus: (id: string, status: 'pass' | 'warn' | 'fail', message?: string) => void;
  onOpenCropModal: (asset: StoreAsset) => void;
  showTitleSafe?: boolean;
}

export const AssetCard: React.FC<AssetCardProps> = ({
  asset,
  onUpdateStatus,
  onOpenCropModal,
  showTitleSafe = false,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isChecking, setIsChecking] = useState(false);

  const handleFileDrop = async (file: File) => {
    setIsChecking(true);
    // Real browser-side decode, no upload
    setTimeout(async () => {
      const res = await inspectLocalImage(file, asset);
      onUpdateStatus(asset.id, res.status, res.message);
      setIsChecking(false);
    }, 400);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFileDrop(e.dataTransfer.files[0]);
    }
  };

  const exp = asset.expectedSpec;
  const cur = asset.currentInfo;

  return (
    <div
      onDragOver={(e) => e.preventDefault()}
      onDrop={handleDrop}
      className={`flex flex-col rounded-md border p-5 transition-all duration-140 bg-surface shadow-sh-1 ${
        asset.status === 'pass'
          ? 'border-border hover:border-secondary'
          : asset.status === 'warn'
          ? 'border-warning/50'
          : 'border-error/50'
      }`}
    >
      {/* Top Header */}
      <div className="flex items-start justify-between gap-3 pb-3 border-b border-border">
        <div>
          <h4 className="font-ui text-sm font-semibold text-app-text">{asset.name}</h4>
          <span className="font-mono text-[11px] text-muted">{asset.fileName}</span>
        </div>
        <StatusPill status={asset.status} size="sm" />
      </div>

      {/* Visual Preview Box */}
      <div className="relative my-4 flex h-36 w-full items-center justify-center rounded border border-border bg-[#14181C] overflow-hidden">
        {/* Placeholder Graphic */}
        <div className="flex flex-col items-center justify-center text-center p-3">
          <div className="h-10 w-10 rounded bg-primary/30 text-secondary flex items-center justify-center font-bold text-sm mb-1.5">
            {exp.format}
          </div>
          <span className="font-mono text-[11px] text-[#A0AEC0]">{cur.dimensions}</span>
          <span className="font-mono text-[10px] text-muted">{cur.weight}</span>
        </div>

        {/* Title Safe Zone Guide on splash/backgrounds */}
        {showTitleSafe && asset.isTitleSafeSupported && (
          <div className="pointer-events-none absolute inset-[5%] border border-dashed border-accent flex items-start justify-end p-1">
            <span className="text-[9px] font-mono text-accent bg-black/60 px-1 rounded">
              Title Safe
            </span>
          </div>
        )}

        {isChecking && (
          <div className="absolute inset-0 bg-black/70 flex items-center justify-center text-xs text-white font-mono">
            Checking spec...
          </div>
        )}
      </div>

      {/* Specification Checklist */}
      <div className="space-y-1 text-xs text-app-text-2 mb-4">
        <div className="flex justify-between">
          <span className="text-muted">Target Dimensions:</span>
          <span className="font-mono font-medium text-app-text">{exp.dimensions}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-muted">Max Weight:</span>
          <span className="font-mono font-medium text-app-text">{exp.maxWeight}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-muted">Format:</span>
          <span className="font-mono font-medium text-app-text">{exp.format}</span>
        </div>
      </div>

      {/* Status Verdict Note */}
      {asset.statusMessage && (
        <p className="text-xs text-app-text-2 mb-4 bg-elevated/70 p-2 rounded border border-border">
          {asset.statusMessage}
        </p>
      )}

      {/* Drop Zone Actions */}
      <div className="mt-auto flex items-center gap-2 pt-2">
        <input
          type="file"
          ref={fileInputRef}
          accept="image/png, image/jpeg"
          className="hidden"
          onChange={(e) => {
            if (e.target.files && e.target.files[0]) {
              handleFileDrop(e.target.files[0]);
            }
          }}
        />
        <Button
          variant="secondary"
          size="sm"
          onClick={() => fileInputRef.current?.click()}
          icon={<Upload className="h-3 w-3" />}
          className="flex-1 text-xs"
        >
          Replace File
        </Button>

        {asset.status !== 'pass' && (
          <Button
            variant="primary"
            size="sm"
            onClick={() => onOpenCropModal(asset)}
            icon={<Crop className="h-3 w-3" />}
            className="text-xs"
          >
            Crop to Spec
          </Button>
        )}
      </div>
    </div>
  );
};

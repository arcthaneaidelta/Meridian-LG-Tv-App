import React, { useState } from 'react';
import { useAppStore } from '../../store';
import { StoreAsset } from '../../data/assets';
import { AssetCard } from '../../components/domain/AssetCard';
import { CropModal } from '../../components/domain/CropModal';
import { Button } from '../../components/ui/Button';
import { RotateCcw, Shield, CheckCircle2, AlertTriangle, Info } from 'lucide-react';

export const StoreAssets: React.FC = () => {
  const { storeAssets, updateAssetStatus, cropAssetToSpec, resetAssets } = useAppStore();
  const [selectedCropAsset, setSelectedCropAsset] = useState<StoreAsset | null>(null);
  const [showTitleSafe, setShowTitleSafe] = useState(false);

  const passCount = storeAssets.filter((a) => a.status === 'pass').length;
  const warnCount = storeAssets.filter((a) => a.status === 'warn').length;
  const failCount = storeAssets.filter((a) => a.status === 'fail').length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-border pb-4">
        <div>
          <h2 className="font-display text-2xl sm:text-3xl font-normal text-app-text tracking-tight">
            Store Assets & Graphics Pre-Flight
          </h2>
          <p className="mt-1 text-xs sm:text-sm text-app-text-2">
            Local browser dimension, aspect ratio, and file weight inspection before LG Seller Lounge intake.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowTitleSafe(!showTitleSafe)}
            className={`flex items-center gap-1.5 rounded border px-3 py-1.5 text-xs font-medium transition-colors ${
              showTitleSafe
                ? 'border-primary bg-primary text-surface'
                : 'border-border bg-elevated text-app-text hover:bg-surface'
            }`}
          >
            <Shield className="h-3.5 w-3.5" />
            <span>Title-Safe Overlay</span>
          </button>

          <Button
            variant="ghost"
            size="sm"
            onClick={resetAssets}
            icon={<RotateCcw className="h-3.5 w-3.5" />}
          >
            Reset Assets
          </Button>
        </div>
      </div>

      {/* Summary Status Strip */}
      <div className="flex flex-wrap items-center justify-between gap-4 rounded-lg border border-border bg-surface p-4 text-xs shadow-sh-1">
        <div className="flex items-center gap-2">
          <span className="font-semibold text-app-text">Asset Conformity:</span>
          <span className="font-mono text-muted">7 Required Store Files</span>
        </div>

        <div className="flex items-center gap-4 font-mono font-medium">
          <span className="flex items-center gap-1 text-success">
            <CheckCircle2 className="h-3.5 w-3.5" />
            <span>{passCount} Pass</span>
          </span>
          {warnCount > 0 && (
            <span className="flex items-center gap-1 text-warning">
              <AlertTriangle className="h-3.5 w-3.5" />
              <span>{warnCount} Attention</span>
            </span>
          )}
          {failCount > 0 && (
            <span className="flex items-center gap-1 text-error">
              <span>{failCount} Fail</span>
            </span>
          )}
        </div>
      </div>

      {/* Grid of 7 Asset Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {storeAssets.map((asset) => (
          <AssetCard
            key={asset.id}
            asset={asset}
            onUpdateStatus={updateAssetStatus}
            onOpenCropModal={(a) => setSelectedCropAsset(a)}
            showTitleSafe={showTitleSafe}
          />
        ))}
      </div>

      <div className="rounded-md border border-border bg-surface p-4 text-xs text-muted flex items-start gap-2">
        <Info className="h-4 w-4 shrink-0 mt-0.5 text-primary" />
        <p>
          Images are verified locally in your browser (dimensions, aspect ratio, memory weight) and are never uploaded to any remote server.
        </p>
      </div>

      {/* CSS-based Crop Modal */}
      <CropModal
        isOpen={Boolean(selectedCropAsset)}
        onClose={() => setSelectedCropAsset(null)}
        asset={selectedCropAsset}
        onConfirmCrop={(id) => cropAssetToSpec(id)}
      />
    </div>
  );
};

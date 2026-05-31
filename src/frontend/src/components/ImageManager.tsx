import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  ChevronDown,
  ChevronUp,
  ImageIcon,
  Loader2,
  Star,
  Trash2,
  Upload,
} from "lucide-react";
import { useRef, useState } from "react";
import type { ExternalBlob } from "../backend";

export interface ManagedImage {
  /** blob reference for existing uploaded images */
  blob?: ExternalBlob;
  /** local File object for newly selected images pending upload */
  file?: File;
  /** local preview URL (object URL for new files) */
  previewUrl: string;
  /** whether this image is uploaded to the backend */
  uploaded: boolean;
  uploadProgress?: number;
}

interface ImageManagerProps {
  images: ManagedImage[];
  primaryIndex: number;
  onImagesChange: (images: ManagedImage[]) => void;
  onPrimaryChange: (index: number) => void;
  /** Called when the star is clicked in edit mode — persists to backend */
  onPrimaryPersist?: (index: number) => void;
  onUpload: (file: File, index: number) => Promise<void>;
  uploading?: boolean;
}

export function ImageManager({
  images,
  primaryIndex,
  onImagesChange,
  onPrimaryChange,
  onPrimaryPersist,
  onUpload,
  uploading = false,
}: ImageManagerProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [dragOver, setDragOver] = useState(false);

  const handleFiles = async (files: FileList | null) => {
    if (!files || files.length === 0) return;
    const newImages: ManagedImage[] = Array.from(files).map((file) => ({
      file,
      previewUrl: URL.createObjectURL(file),
      uploaded: false,
      uploadProgress: 0,
    }));
    const startIdx = images.length;
    onImagesChange([...images, ...newImages]);
    // upload each file sequentially
    for (let i = 0; i < newImages.length; i++) {
      await onUpload(files[i], startIdx + i);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    handleFiles(e.dataTransfer.files);
  };

  const handleRemove = (index: number) => {
    const updated = images.filter((_, i) => i !== index);
    onImagesChange(updated);
    if (primaryIndex === index) {
      onPrimaryChange(0);
    } else if (primaryIndex > index) {
      onPrimaryChange(primaryIndex - 1);
    }
  };

  const handleMoveUp = (index: number) => {
    if (index === 0) return;
    const updated = [...images];
    [updated[index - 1], updated[index]] = [updated[index], updated[index - 1]];
    onImagesChange(updated);
    if (primaryIndex === index) onPrimaryChange(index - 1);
    else if (primaryIndex === index - 1) onPrimaryChange(index);
  };

  const handleMoveDown = (index: number) => {
    if (index === images.length - 1) return;
    const updated = [...images];
    [updated[index], updated[index + 1]] = [updated[index + 1], updated[index]];
    onImagesChange(updated);
    if (primaryIndex === index) onPrimaryChange(index + 1);
    else if (primaryIndex === index + 1) onPrimaryChange(index);
  };

  return (
    <div className="space-y-4">
      {/* Drop zone */}
      <label
        htmlFor="image-file-input"
        className={cn(
          "flex flex-col items-center border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors",
          dragOver
            ? "border-primary bg-primary/5"
            : "border-border hover:border-primary/50 hover:bg-muted/30",
        )}
        onDragOver={(e) => {
          e.preventDefault();
          setDragOver(true);
        }}
        onDragLeave={() => setDragOver(false)}
        onDrop={handleDrop}
        data-ocid="image-upload-zone"
      >
        <Upload className="w-6 h-6 text-muted-foreground mb-2" />
        <p className="text-sm font-medium text-foreground">
          Click or drag photos here
        </p>
        <p className="text-xs text-muted-foreground mt-1">
          JPG, PNG, WEBP — multiple files supported
        </p>
        <input
          id="image-file-input"
          ref={fileInputRef}
          type="file"
          accept="image/*"
          multiple
          className="hidden"
          onChange={(e) => handleFiles(e.target.files)}
          data-ocid="image-file-input"
        />
      </label>

      {/* Image grid */}
      {images.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {images.map((img, idx) => (
            <div
              key={img.previewUrl || idx}
              className={cn(
                "relative group rounded-lg overflow-hidden border-2 bg-muted aspect-video",
                primaryIndex === idx ? "border-primary" : "border-border",
              )}
              data-ocid="image-thumbnail"
            >
              {/* Image */}
              {img.previewUrl ? (
                <img
                  src={img.previewUrl}
                  alt={`Plot ${idx + 1}`}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <ImageIcon className="w-8 h-8 text-muted-foreground" />
                </div>
              )}

              {/* Upload progress overlay */}
              {!img.uploaded && img.file && (
                <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center gap-1">
                  <Loader2 className="w-5 h-5 text-white animate-spin" />
                  {img.uploadProgress !== undefined &&
                    img.uploadProgress > 0 && (
                      <span className="text-white text-xs">
                        {Math.round(img.uploadProgress)}%
                      </span>
                    )}
                </div>
              )}

              {/* Primary badge */}
              {primaryIndex === idx && (
                <div className="absolute top-1 left-1">
                  <span className="bg-primary text-primary-foreground text-[10px] font-semibold px-1.5 py-0.5 rounded">
                    Primary
                  </span>
                </div>
              )}

              {/* Controls overlay */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors" />
              <div className="absolute top-1 right-1 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                {/* Set primary */}
                <button
                  type="button"
                  title="Set as primary"
                  onClick={() => {
                    onPrimaryChange(idx);
                    onPrimaryPersist?.(idx);
                  }}
                  className={cn(
                    "w-6 h-6 rounded flex items-center justify-center transition-colors",
                    primaryIndex === idx
                      ? "bg-primary text-primary-foreground"
                      : "bg-black/50 text-white hover:bg-primary",
                  )}
                  data-ocid="set-primary-btn"
                  aria-label="Set as primary image"
                >
                  <Star
                    className="w-3 h-3"
                    fill={primaryIndex === idx ? "currentColor" : "none"}
                  />
                </button>
                {/* Remove */}
                <button
                  type="button"
                  title="Remove image"
                  onClick={() => handleRemove(idx)}
                  className="w-6 h-6 rounded bg-black/50 text-white hover:bg-destructive flex items-center justify-center transition-colors"
                  data-ocid="remove-image-btn"
                  aria-label="Remove image"
                >
                  <Trash2 className="w-3 h-3" />
                </button>
              </div>

              {/* Reorder buttons */}
              <div className="absolute bottom-1 left-1 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                  type="button"
                  title="Move up"
                  onClick={() => handleMoveUp(idx)}
                  disabled={idx === 0}
                  className="w-6 h-6 rounded bg-black/50 text-white hover:bg-black/70 disabled:opacity-30 flex items-center justify-center transition-colors"
                  data-ocid="move-image-up"
                  aria-label="Move image left"
                >
                  <ChevronUp className="w-3 h-3" />
                </button>
                <button
                  type="button"
                  title="Move down"
                  onClick={() => handleMoveDown(idx)}
                  disabled={idx === images.length - 1}
                  className="w-6 h-6 rounded bg-black/50 text-white hover:bg-black/70 disabled:opacity-30 flex items-center justify-center transition-colors"
                  data-ocid="move-image-down"
                  aria-label="Move image right"
                >
                  <ChevronDown className="w-3 h-3" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {uploading && (
        <p className="text-xs text-muted-foreground flex items-center gap-1.5">
          <Loader2 className="w-3 h-3 animate-spin" />
          Uploading images…
        </p>
      )}
    </div>
  );
}

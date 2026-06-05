import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { useActor } from "@caffeineai/core-infrastructure";
import type { Principal } from "@icp-sdk/core/principal";
import { useNavigate } from "@tanstack/react-router";
import {
  ChevronDown,
  ChevronUp,
  Construction,
  HardHat,
  Loader2,
  LocateFixed,
  MapPin,
  Phone,
  Star,
  Tag,
  X,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useCallback, useState } from "react";
import { toast } from "sonner";
import {
  type ConstructionSiteFields,
  ExternalBlob,
  LegalStatus,
  PropertyStatus,
  createActor,
} from "../backend";
import type { Property } from "../backend";
import {
  useAddImageToProperty,
  useAddProperty,
  useReorderImages,
  useSetPrimaryImageIndex,
  useUpdateProperty,
} from "../hooks/useProperties";
import { ImageManager, type ManagedImage } from "./ImageManager";
import PropertyMap from "./PropertyMap";

// ── Types
export interface PropertyFormValues {
  title: string;
  locationName: string;
  latitude: string;
  longitude: string;
  areaSizeSqFt: string;
  price: string;
  description: string;
  legalStatus: LegalStatus;
  status: PropertyStatus;
  notes: string;
  // Extended UI-only fields
  tags: string[];
  featured: boolean;
  contactPhone: string;
  contactWhatsApp: string;
  plotBoundaryJson: string;
  // Construction site fields
  isConstructionSite: boolean;
  constructionProgressPercentage: string;
  constructionCurrentPhase: string;
  constructionStartDate: string;
  constructionExpectedCompletion: string;
  constructionLiveUpdates: string;
}

const PRESET_TAGS = [
  "New",
  "Hot Deal",
  "Featured",
  "Reduced Price",
  "Corner Plot",
  "Near Highway",
  "Residential",
  "Agricultural",
];

const defaultValues: PropertyFormValues = {
  title: "",
  locationName: "",
  latitude: "",
  longitude: "",
  areaSizeSqFt: "",
  price: "",
  description: "",
  legalStatus: LegalStatus.approved,
  status: PropertyStatus.available,
  notes: "",
  tags: [],
  featured: false,
  contactPhone: "",
  contactWhatsApp: "",
  plotBoundaryJson: "",
  isConstructionSite: false,
  constructionProgressPercentage: "0",
  constructionCurrentPhase: "",
  constructionStartDate: "",
  constructionExpectedCompletion: "",
  constructionLiveUpdates: "",
};

interface PropertyFormProps {
  property?: Property;
  mode: "new" | "edit";
}

function toFormValues(p: Property): PropertyFormValues {
  return {
    title: p.title,
    locationName: p.locationName,
    latitude: String(p.latitude),
    longitude: String(p.longitude),
    areaSizeSqFt: String(p.areaSizeSqFt),
    price: String(Number(p.price)),
    description: p.description,
    legalStatus: p.legalStatus,
    status: p.status,
    notes: p.notes ?? "",
    tags: [],
    featured: false,
    contactPhone: "",
    contactWhatsApp: "",
    plotBoundaryJson: "",
    isConstructionSite: p.isConstructionSite ?? false,
    constructionProgressPercentage: String(
      Number(p.constructionFields?.progressPercentage ?? 0),
    ),
    constructionCurrentPhase: p.constructionFields?.currentPhase ?? "",
    constructionStartDate: p.constructionFields?.constructionStartDate ?? "",
    constructionExpectedCompletion:
      p.constructionFields?.expectedCompletionDate ?? "",
    constructionLiveUpdates: p.constructionFields?.liveUpdates ?? "",
  };
}

// ── Map Picker Modal
function MapPickerModal({
  lat,
  lng,
  onConfirm,
  onClose,
}: {
  lat: string;
  lng: string;
  onConfirm: (lat: string, lng: string) => void;
  onClose: () => void;
}) {
  const [pickedLat, setPickedLat] = useState(lat);
  const [pickedLng, setPickedLng] = useState(lng);
  const [geoLoading, setGeoLoading] = useState(false);

  const handleUseMyLocation = () => {
    if (!navigator.geolocation) {
      toast.error("Geolocation not supported");
      return;
    }
    setGeoLoading(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setPickedLat(pos.coords.latitude.toFixed(6));
        setPickedLng(pos.coords.longitude.toFixed(6));
        setGeoLoading(false);
        toast.success("Location captured");
      },
      () => {
        toast.error("Unable to get location");
        setGeoLoading(false);
      },
    );
  };

  const validLat = pickedLat && !Number.isNaN(Number(pickedLat));
  const validLng = pickedLng && !Number.isNaN(Number(pickedLng));

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      {/* Frosted backdrop */}
      <div className="absolute inset-0 bg-foreground/40 blur-backdrop" />

      <motion.div
        initial={{ scale: 0.92, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.92, opacity: 0, y: 20 }}
        transition={{ type: "spring", damping: 22, stiffness: 300 }}
        className="relative w-full max-w-lg glass-light rounded-2xl shadow-elevation overflow-hidden"
        data-ocid="map_picker.dialog"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-border/30">
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-primary" />
            <h3 className="font-display font-semibold text-base text-foreground">
              Pick Location on Map
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-7 h-7 rounded-full bg-muted/60 flex items-center justify-center hover:bg-muted transition-colors"
            aria-label="Close map picker"
            data-ocid="map_picker.close_button"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="p-5 space-y-4">
          {/* Leaflet interactive map */}
          <PropertyMap
            mode="picker"
            selectedLat={
              pickedLat && !Number.isNaN(Number(pickedLat))
                ? Number(pickedLat)
                : undefined
            }
            selectedLng={
              pickedLng && !Number.isNaN(Number(pickedLng))
                ? Number(pickedLng)
                : undefined
            }
            onLocationSelect={(lat, lng) => {
              setPickedLat(String(lat));
              setPickedLng(String(lng));
            }}
            className="mb-1"
          />

          {/* Coordinate display */}
          {validLat && validLng && (
            <div className="flex items-center gap-2 text-xs text-muted-foreground bg-muted/40 px-3 py-2 rounded-lg">
              <MapPin className="w-3 h-3 text-primary shrink-0" />
              <span className="font-mono">
                {Number(pickedLat).toFixed(6)}, {Number(pickedLng).toFixed(6)}
              </span>
            </div>
          )}

          {/* Coordinate inputs */}
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <Label htmlFor="picker-lat" className="text-xs">
                Latitude
              </Label>
              <Input
                id="picker-lat"
                type="number"
                step="any"
                placeholder="28.535517"
                value={pickedLat}
                onChange={(e) => setPickedLat(e.target.value)}
                data-ocid="map_picker.latitude_input"
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="picker-lng" className="text-xs">
                Longitude
              </Label>
              <Input
                id="picker-lng"
                type="number"
                step="any"
                placeholder="77.391029"
                value={pickedLng}
                onChange={(e) => setPickedLng(e.target.value)}
                data-ocid="map_picker.longitude_input"
              />
            </div>
          </div>

          {/* Use my location */}
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={handleUseMyLocation}
            disabled={geoLoading}
            className="w-full gap-2 text-xs"
            data-ocid="map_picker.use_location_button"
          >
            {geoLoading ? (
              <Loader2 className="w-3.5 h-3.5 animate-spin" />
            ) : (
              <LocateFixed className="w-3.5 h-3.5" />
            )}
            Use My Location
          </Button>

          {/* Actions */}
          <div className="flex gap-2 pt-1">
            <Button
              type="button"
              variant="outline"
              className="flex-1"
              onClick={onClose}
              data-ocid="map_picker.cancel_button"
            >
              Cancel
            </Button>
            <Button
              type="button"
              className="flex-1"
              disabled={!validLat || !validLng}
              onClick={() => {
                onConfirm(pickedLat, pickedLng);
                onClose();
              }}
              data-ocid="map_picker.confirm_button"
            >
              Use These Coordinates
            </Button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

// ── Tags Input Component
function TagsInput({
  tags,
  onChange,
}: {
  tags: string[];
  onChange: (tags: string[]) => void;
}) {
  const [customInput, setCustomInput] = useState("");

  const addTag = (tag: string) => {
    const trimmed = tag.trim();
    if (trimmed && !tags.includes(trimmed)) onChange([...tags, trimmed]);
  };

  const removeTag = (tag: string) => onChange(tags.filter((t) => t !== tag));

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      addTag(customInput);
      setCustomInput("");
    }
  };

  return (
    <div className="space-y-3">
      {/* Preset tags */}
      <div className="flex flex-wrap gap-2">
        {PRESET_TAGS.map((tag) => {
          const active = tags.includes(tag);
          return (
            <button
              key={tag}
              type="button"
              onClick={() => (active ? removeTag(tag) : addTag(tag))}
              className={`text-xs px-3 py-1 rounded-full border transition-smooth ${
                active
                  ? "bg-primary text-primary-foreground border-primary"
                  : "bg-muted/40 text-muted-foreground border-border hover:border-primary/50"
              }`}
              data-ocid={`tags.preset_${tag.toLowerCase().replace(/ /g, "_")}`}
            >
              {tag}
            </button>
          );
        })}
      </div>

      {/* Custom tag input */}
      <div className="flex gap-2">
        <Input
          placeholder="Type custom tag and press Enter"
          value={customInput}
          onChange={(e) => setCustomInput(e.target.value)}
          onKeyDown={handleKeyDown}
          className="text-sm"
          data-ocid="tags.custom_input"
        />
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => {
            addTag(customInput);
            setCustomInput("");
          }}
          disabled={!customInput.trim()}
          data-ocid="tags.add_button"
        >
          Add
        </Button>
      </div>

      {/* Active tags */}
      {tags.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {tags.map((tag) => (
            <Badge key={tag} variant="secondary" className="gap-1 pr-1 text-xs">
              {tag}
              <button
                type="button"
                onClick={() => removeTag(tag)}
                className="w-4 h-4 rounded-full hover:bg-muted flex items-center justify-center"
                aria-label={`Remove tag ${tag}`}
                data-ocid={`tags.remove_${tag.toLowerCase().replace(/ /g, "_")}`}
              >
                <X className="w-2.5 h-2.5" />
              </button>
            </Badge>
          ))}
        </div>
      )}
    </div>
  );
}

// ── Section wrapper
function FormSection({
  title,
  icon: Icon,
  children,
  collapsible = false,
}: {
  title: string;
  icon?: React.ElementType;
  children: React.ReactNode;
  collapsible?: boolean;
}) {
  const [open, setOpen] = useState(true);
  return (
    <section className="bg-card border border-border rounded-2xl overflow-hidden shadow-card">
      <button
        type="button"
        className={`w-full flex items-center gap-2.5 px-6 py-4 ${
          collapsible ? "cursor-pointer hover:bg-muted/30" : "cursor-default"
        } transition-colors`}
        onClick={() => collapsible && setOpen((v) => !v)}
        aria-expanded={collapsible ? open : undefined}
      >
        {Icon && <Icon className="w-4 h-4 text-primary shrink-0" />}
        <span className="font-display font-semibold text-base text-foreground flex-1 text-left">
          {title}
        </span>
        {collapsible &&
          (open ? (
            <ChevronUp className="w-4 h-4 text-muted-foreground" />
          ) : (
            <ChevronDown className="w-4 h-4 text-muted-foreground" />
          ))}
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="px-6 pb-6 pt-1 space-y-5 border-t border-border">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

// ── Main Form
export function PropertyForm({ property, mode }: PropertyFormProps) {
  const navigate = useNavigate();
  const { actor } = useActor(createActor);
  const addProperty = useAddProperty();
  const updateProperty = useUpdateProperty();
  const addImage = useAddImageToProperty();
  const reorderImages = useReorderImages();
  const setPrimaryImageIndex = useSetPrimaryImageIndex();

  const [values, setValues] = useState<PropertyFormValues>(
    property ? toFormValues(property) : defaultValues,
  );
  const [errors, setErrors] = useState<
    Partial<Record<keyof PropertyFormValues, string>>
  >({});
  const [geoLoading, setGeoLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [showMapPicker, setShowMapPicker] = useState(false);
  const [showManualCoords, setShowManualCoords] = useState(
    !!(property?.latitude && property?.longitude),
  );

  const [images, setImages] = useState<ManagedImage[]>(
    () =>
      property?.images?.map((blob) => ({
        blob,
        previewUrl: blob.getDirectURL(),
        uploaded: true,
      })) ?? [],
  );
  const [primaryIndex, setPrimaryIndex] = useState(
    property ? Number(property.primaryImageIndex) : 0,
  );

  const set = <K extends keyof PropertyFormValues>(
    field: K,
    value: PropertyFormValues[K],
  ) => {
    setValues((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const setStr =
    (field: keyof PropertyFormValues) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      set(field, e.target.value as PropertyFormValues[typeof field]);

  const validate = (): boolean => {
    const newErrors: Partial<Record<keyof PropertyFormValues, string>> = {};
    if (!values.title.trim()) newErrors.title = "Title is required";
    if (!values.locationName.trim())
      newErrors.locationName = "Location is required";
    if (!values.latitude || Number.isNaN(Number(values.latitude)))
      newErrors.latitude = "Valid latitude required";
    if (!values.longitude || Number.isNaN(Number(values.longitude)))
      newErrors.longitude = "Valid longitude required";
    if (
      !values.areaSizeSqFt ||
      Number.isNaN(Number(values.areaSizeSqFt)) ||
      Number(values.areaSizeSqFt) <= 0
    )
      newErrors.areaSizeSqFt = "Valid area required";
    if (
      !values.price ||
      Number.isNaN(Number(values.price)) ||
      Number(values.price) < 0
    )
      newErrors.price = "Valid price required";
    if (!values.description.trim())
      newErrors.description = "Description is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleUseLocation = () => {
    if (!navigator.geolocation) {
      toast.error("Geolocation not supported");
      return;
    }
    setGeoLoading(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        set("latitude", String(pos.coords.latitude.toFixed(6)));
        set("longitude", String(pos.coords.longitude.toFixed(6)));
        setGeoLoading(false);
        setShowManualCoords(true);
        toast.success("Location captured");
      },
      () => {
        toast.error("Unable to retrieve location");
        setGeoLoading(false);
      },
    );
  };

  const handleUpload = useCallback(
    async (file: File, index: number) => {
      if (!actor) {
        toast.error("Backend not available");
        return;
      }
      setUploading(true);
      try {
        const bytes = new Uint8Array(await file.arrayBuffer());
        const blob = ExternalBlob.fromBytes(bytes).withUploadProgress((pct) => {
          setImages((prev) => {
            const updated = [...prev];
            if (updated[index])
              updated[index] = { ...updated[index], uploadProgress: pct };
            return updated;
          });
        });

        if (mode === "edit" && property) {
          await addImage.mutateAsync({
            propertyId: property.propertyId,
            image: blob,
          });
          setImages((prev) => {
            const updated = [...prev];
            if (updated[index])
              updated[index] = {
                ...updated[index],
                blob,
                previewUrl: blob.getDirectURL(),
                uploaded: true,
              };
            return updated;
          });
        } else {
          setImages((prev) => {
            const updated = [...prev];
            if (updated[index])
              updated[index] = { ...updated[index], blob, uploaded: true };
            return updated;
          });
        }
      } catch {
        toast.error("Image upload failed");
      } finally {
        setUploading(false);
      }
    },
    [actor, mode, property, addImage],
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setSubmitting(true);
    try {
      if (mode === "new") {
        const constructionFieldsPayload: ConstructionSiteFields | undefined =
          values.isConstructionSite
            ? {
                progressPercentage: BigInt(
                  Math.min(
                    100,
                    Math.max(
                      0,
                      Math.round(
                        Number(values.constructionProgressPercentage) || 0,
                      ),
                    ),
                  ),
                ),
                currentPhase: values.constructionCurrentPhase.trim(),
                constructionStartDate: values.constructionStartDate,
                expectedCompletionDate: values.constructionExpectedCompletion,
                liveUpdates: values.constructionLiveUpdates.trim(),
                sitePhotos: [],
              }
            : undefined;

        const propertyId = await addProperty.mutateAsync({
          title: values.title.trim(),
          locationName: values.locationName.trim(),
          latitude: Number(values.latitude),
          longitude: Number(values.longitude),
          areaSizeSqFt: Number(values.areaSizeSqFt),
          price: BigInt(Math.round(Number(values.price))),
          description: values.description.trim(),
          legalStatus: values.legalStatus,
          notes: values.notes.trim() || undefined,
          featured: values.featured ?? false,
          tags: values.tags ?? [],
          isConstructionSite: values.isConstructionSite,
          constructionFields: constructionFieldsPayload,
        });

        for (const img of images) {
          if (img.blob) {
            await addImage.mutateAsync({ propertyId, image: img.blob });
          }
        }

        if (images.length > 1) {
          await reorderImages.mutateAsync({
            propertyId,
            newOrder: images.map((_, i) => BigInt(i)),
          });
        }

        toast.success("Property added successfully");
        navigate({ to: "/admin" });
      } else if (property) {
        const updateConstructionFields: ConstructionSiteFields | undefined =
          values.isConstructionSite
            ? {
                progressPercentage: BigInt(
                  Math.min(
                    100,
                    Math.max(
                      0,
                      Math.round(
                        Number(values.constructionProgressPercentage) || 0,
                      ),
                    ),
                  ),
                ),
                currentPhase: values.constructionCurrentPhase.trim(),
                constructionStartDate: values.constructionStartDate,
                expectedCompletionDate: values.constructionExpectedCompletion,
                liveUpdates: values.constructionLiveUpdates.trim(),
                sitePhotos: [],
              }
            : undefined;

        await updateProperty.mutateAsync({
          propertyId: property.propertyId,
          input: {
            title: values.title.trim(),
            locationName: values.locationName.trim(),
            latitude: Number(values.latitude),
            longitude: Number(values.longitude),
            areaSizeSqFt: Number(values.areaSizeSqFt),
            price: BigInt(Math.round(Number(values.price))),
            description: values.description.trim(),
            legalStatus: values.legalStatus,
            notes: values.notes.trim() || undefined,
            isConstructionSite: values.isConstructionSite,
            constructionFields: updateConstructionFields,
          },
        });
        // Extended UI fields (tags, featured, contactPhone, contactWhatsApp)
        // are UI-only — backend schema doesn't include them yet.

        const uploadedImages = images.filter((img) => img.uploaded);
        if (uploadedImages.length > 1) {
          await reorderImages.mutateAsync({
            propertyId: property.propertyId,
            newOrder: uploadedImages.map((_, i) => BigInt(i)),
          });
        }

        toast.success("Property updated");
        navigate({ to: "/admin" });
      }
    } catch (err) {
      const msg = err instanceof Error ? err.message : "An error occurred";
      toast.error(msg);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <AnimatePresence>
        {showMapPicker && (
          <MapPickerModal
            lat={values.latitude}
            lng={values.longitude}
            onConfirm={(lat, lng) => {
              set("latitude", lat);
              set("longitude", lng);
              setShowManualCoords(true);
            }}
            onClose={() => setShowMapPicker(false)}
          />
        )}
      </AnimatePresence>

      <form
        onSubmit={handleSubmit}
        className="space-y-6"
        noValidate
        data-ocid="property_form"
      >
        {/* 1. Basic Info */}
        <FormSection title="Basic Information">
          <div className="grid sm:grid-cols-2 gap-5">
            <div className="sm:col-span-2 space-y-1.5">
              <Label htmlFor="title">
                Title <span className="text-destructive">*</span>
              </Label>
              <Input
                id="title"
                placeholder="e.g. Residential Plot in Noida Sector 62"
                value={values.title}
                onChange={setStr("title")}
                className={errors.title ? "border-destructive" : ""}
                data-ocid="property_form.title_input"
              />
              {errors.title && (
                <motion.p
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-xs text-destructive"
                  data-ocid="property_form.title_error"
                >
                  {errors.title}
                </motion.p>
              )}
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="locationName">
                Location Name <span className="text-destructive">*</span>
              </Label>
              <Input
                id="locationName"
                placeholder="City / Village / Area"
                value={values.locationName}
                onChange={setStr("locationName")}
                className={errors.locationName ? "border-destructive" : ""}
                data-ocid="property_form.location_input"
              />
              {errors.locationName && (
                <p
                  className="text-xs text-destructive"
                  data-ocid="property_form.location_error"
                >
                  {errors.locationName}
                </p>
              )}
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="price">
                Price (₹) <span className="text-destructive">*</span>
              </Label>
              <Input
                id="price"
                type="number"
                min="0"
                placeholder="e.g. 4500000"
                value={values.price}
                onChange={setStr("price")}
                className={errors.price ? "border-destructive" : ""}
                data-ocid="property_form.price_input"
              />
              {errors.price && (
                <p
                  className="text-xs text-destructive"
                  data-ocid="property_form.price_error"
                >
                  {errors.price}
                </p>
              )}
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="areaSizeSqFt">
                Area (sq ft) <span className="text-destructive">*</span>
              </Label>
              <Input
                id="areaSizeSqFt"
                type="number"
                min="1"
                placeholder="e.g. 1200"
                value={values.areaSizeSqFt}
                onChange={setStr("areaSizeSqFt")}
                className={errors.areaSizeSqFt ? "border-destructive" : ""}
                data-ocid="property_form.area_input"
              />
              {errors.areaSizeSqFt && (
                <p
                  className="text-xs text-destructive"
                  data-ocid="property_form.area_error"
                >
                  {errors.areaSizeSqFt}
                </p>
              )}
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="legalStatus">Legal Status</Label>
              <Select
                value={values.legalStatus}
                onValueChange={(v) => set("legalStatus", v as LegalStatus)}
              >
                <SelectTrigger
                  id="legalStatus"
                  data-ocid="property_form.legal_status_select"
                >
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value={LegalStatus.approved}>Approved</SelectItem>
                  <SelectItem value={LegalStatus.not_approved}>
                    Not Approved
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            {mode === "edit" && (
              <div className="space-y-1.5">
                <Label htmlFor="status">Status</Label>
                <Select
                  value={values.status}
                  onValueChange={(v) => set("status", v as PropertyStatus)}
                >
                  <SelectTrigger
                    id="status"
                    data-ocid="property_form.status_select"
                  >
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value={PropertyStatus.available}>
                      Available
                    </SelectItem>
                    <SelectItem value={PropertyStatus.sold}>Sold</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="description">
              Description <span className="text-destructive">*</span>
            </Label>
            <Textarea
              id="description"
              placeholder="Describe the property — layout, features, surroundings…"
              rows={4}
              value={values.description}
              onChange={setStr("description")}
              className={errors.description ? "border-destructive" : ""}
              data-ocid="property_form.description_textarea"
            />
            {errors.description && (
              <p
                className="text-xs text-destructive"
                data-ocid="property_form.description_error"
              >
                {errors.description}
              </p>
            )}
          </div>

          {/* Featured toggle */}
          <div className="flex items-center justify-between rounded-xl bg-muted/40 px-4 py-3 border border-border">
            <div className="flex items-center gap-2">
              <Star
                className={`w-4 h-4 ${
                  values.featured
                    ? "text-yellow-500 fill-yellow-500"
                    : "text-muted-foreground"
                }`}
              />
              <div>
                <p className="text-sm font-medium text-foreground">Featured</p>
                <p className="text-xs text-muted-foreground">
                  {values.featured
                    ? "Shown as featured on homepage"
                    : "Not featured"}
                </p>
              </div>
            </div>
            <Switch
              checked={values.featured}
              onCheckedChange={(v) => set("featured", v)}
              data-ocid="property_form.featured_toggle"
            />
          </div>

          {/* Construction site toggle */}
          <div className="flex items-center justify-between rounded-xl bg-amber-50/60 dark:bg-amber-950/20 px-4 py-3 border border-amber-200/60 dark:border-amber-800/40">
            <div className="flex items-center gap-2">
              <HardHat
                className={`w-4 h-4 ${
                  values.isConstructionSite
                    ? "text-amber-600"
                    : "text-muted-foreground"
                }`}
              />
              <div>
                <p className="text-sm font-medium text-foreground">
                  Construction Site
                </p>
                <p className="text-xs text-muted-foreground">
                  {values.isConstructionSite
                    ? "Shows construction progress fields"
                    : "Toggle to add construction details"}
                </p>
              </div>
            </div>
            <Switch
              checked={values.isConstructionSite}
              onCheckedChange={(v) => set("isConstructionSite", v)}
              data-ocid="property_form.construction_site_toggle"
            />
          </div>
        </FormSection>

        {/* Construction Details Section */}
        <AnimatePresence>
          {values.isConstructionSite && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25, ease: "easeInOut" }}
              className="overflow-hidden"
            >
              <FormSection title="Construction Details" icon={Construction}>
                {/* Progress slider */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="constructionProgress">Progress</Label>
                    <span className="text-sm font-semibold text-amber-600 tabular-nums">
                      {values.constructionProgressPercentage || 0}%
                    </span>
                  </div>
                  <input
                    id="constructionProgress"
                    type="range"
                    min={0}
                    max={100}
                    step={1}
                    value={values.constructionProgressPercentage || 0}
                    onChange={(e) =>
                      set("constructionProgressPercentage", e.target.value)
                    }
                    className="w-full h-2 rounded-full accent-amber-500 cursor-pointer"
                    data-ocid="property_form.construction_progress_slider"
                  />
                  <div className="relative h-3 rounded-full bg-muted overflow-hidden">
                    <motion.div
                      className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-amber-400 to-amber-600"
                      animate={{
                        width: `${values.constructionProgressPercentage || 0}%`,
                      }}
                      transition={{ duration: 0.3 }}
                    />
                  </div>
                  <Input
                    type="number"
                    min={0}
                    max={100}
                    placeholder="0–100"
                    value={values.constructionProgressPercentage}
                    onChange={(e) =>
                      set("constructionProgressPercentage", e.target.value)
                    }
                    className="w-24 text-sm"
                    data-ocid="property_form.construction_progress_input"
                  />
                </div>

                <div className="grid sm:grid-cols-2 gap-5">
                  <div className="space-y-1.5">
                    <Label htmlFor="constructionPhase">Current Phase</Label>
                    <Input
                      id="constructionPhase"
                      placeholder="e.g. Foundation, Framing, Finishing"
                      value={values.constructionCurrentPhase}
                      onChange={(e) =>
                        set("constructionCurrentPhase", e.target.value)
                      }
                      data-ocid="property_form.construction_phase_input"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="constructionStartDate">
                      Construction Start Date
                    </Label>
                    <Input
                      id="constructionStartDate"
                      type="date"
                      value={values.constructionStartDate}
                      onChange={(e) =>
                        set("constructionStartDate", e.target.value)
                      }
                      data-ocid="property_form.construction_start_input"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="constructionExpected">
                      Expected Completion Date
                    </Label>
                    <Input
                      id="constructionExpected"
                      type="date"
                      value={values.constructionExpectedCompletion}
                      onChange={(e) =>
                        set("constructionExpectedCompletion", e.target.value)
                      }
                      data-ocid="property_form.construction_completion_input"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="constructionUpdates">Live Updates</Label>
                  <Textarea
                    id="constructionUpdates"
                    placeholder="Latest progress update, recent milestones, upcoming work…"
                    rows={3}
                    value={values.constructionLiveUpdates}
                    onChange={(e) =>
                      set("constructionLiveUpdates", e.target.value)
                    }
                    data-ocid="property_form.construction_updates_textarea"
                  />
                  <p className="text-xs text-muted-foreground">
                    Visible to buyers as a live site update
                  </p>
                </div>
              </FormSection>
            </motion.div>
          )}
        </AnimatePresence>

        {/* 2. Location */}
        <FormSection title="Location" icon={MapPin}>
          {/* Map picker button */}
          <div className="flex items-center gap-3">
            <Button
              type="button"
              variant="outline"
              className="gap-2 flex-1 sm:flex-none"
              onClick={() => setShowMapPicker(true)}
              data-ocid="property_form.pick_on_map_button"
            >
              <MapPin className="w-4 h-4 text-primary" />
              Pick on Map
            </Button>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={handleUseLocation}
              disabled={geoLoading}
              className="gap-1.5 text-xs"
              data-ocid="property_form.use_location_button"
            >
              {geoLoading ? (
                <Loader2 className="w-3 h-3 animate-spin" />
              ) : (
                <LocateFixed className="w-3 h-3" />
              )}
              Use My Location
            </Button>
            <button
              type="button"
              onClick={() => setShowManualCoords((v) => !v)}
              className="text-xs text-muted-foreground hover:text-foreground transition-colors ml-auto"
              data-ocid="property_form.toggle_manual_coords"
            >
              {showManualCoords ? "Hide" : "Show"} manual entry
            </button>
          </div>

          {/* Coordinate preview */}
          {values.latitude && values.longitude && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              className="flex items-center gap-2 text-xs text-muted-foreground"
            >
              <MapPin className="w-3 h-3 text-primary shrink-0" />
              <span>
                {values.latitude}, {values.longitude}
              </span>
              <a
                href={`https://www.google.com/maps?q=${values.latitude},${values.longitude}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                Preview on Google Maps ↗
              </a>
            </motion.div>
          )}

          {/* Manual coordinate fields */}
          <AnimatePresence>
            {showManualCoords && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="overflow-hidden"
              >
                <div className="grid sm:grid-cols-2 gap-5 pt-1">
                  <div className="space-y-1.5">
                    <Label htmlFor="latitude">
                      Latitude <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="latitude"
                      type="number"
                      step="any"
                      placeholder="e.g. 28.535517"
                      value={values.latitude}
                      onChange={setStr("latitude")}
                      className={errors.latitude ? "border-destructive" : ""}
                      data-ocid="property_form.latitude_input"
                    />
                    {errors.latitude && (
                      <p
                        className="text-xs text-destructive"
                        data-ocid="property_form.latitude_error"
                      >
                        {errors.latitude}
                      </p>
                    )}
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="longitude">
                      Longitude <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="longitude"
                      type="number"
                      step="any"
                      placeholder="e.g. 77.391029"
                      value={values.longitude}
                      onChange={setStr("longitude")}
                      className={errors.longitude ? "border-destructive" : ""}
                      data-ocid="property_form.longitude_input"
                    />
                    {errors.longitude && (
                      <p
                        className="text-xs text-destructive"
                        data-ocid="property_form.longitude_error"
                      >
                        {errors.longitude}
                      </p>
                    )}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Live Leaflet map preview */}
          {values.latitude &&
            values.longitude &&
            !errors.latitude &&
            !errors.longitude && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <PropertyMap
                  mode="view"
                  properties={[
                    {
                      propertyId: "preview",
                      title: values.title || "Property Location",
                      locationName: values.locationName,
                      latitude: Number(values.latitude),
                      longitude: Number(values.longitude),
                      areaSizeSqFt: Number(values.areaSizeSqFt) || 0,
                      price: BigInt(0),
                      description: "",
                      legalStatus: values.legalStatus,
                      status: values.status,
                      images: [],
                      primaryImageIndex: BigInt(0),
                      dateAdded: BigInt(Date.now()),
                      notes: undefined,
                      featured: false,
                      tags: [],
                      viewCount: BigInt(0),
                      ownerId: null as unknown as Principal,
                      isConstructionSite: false,
                    },
                  ]}
                  className=""
                />
              </motion.div>
            )}
        </FormSection>

        {/* 3. Tags */}
        <FormSection title="Tags" icon={Tag} collapsible>
          <TagsInput
            tags={values.tags}
            onChange={(tags) => set("tags", tags)}
          />
          <p className="text-xs text-muted-foreground">
            Tags are stored locally for display purposes. Click presets or add
            custom tags.
          </p>
        </FormSection>

        {/* 4. Contact Info */}
        <FormSection title="Agent Contact Information" icon={Phone} collapsible>
          <div className="grid sm:grid-cols-2 gap-5">
            <div className="space-y-1.5">
              <Label htmlFor="contactPhone">Contact Phone</Label>
              <Input
                id="contactPhone"
                type="tel"
                placeholder="+91 98765 43210"
                value={values.contactPhone}
                onChange={setStr("contactPhone")}
                data-ocid="property_form.contact_phone_input"
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="contactWhatsApp">WhatsApp Number</Label>
              <Input
                id="contactWhatsApp"
                type="tel"
                placeholder="+91 98765 43210"
                value={values.contactWhatsApp}
                onChange={setStr("contactWhatsApp")}
                data-ocid="property_form.whatsapp_input"
              />
            </div>
          </div>
          <p className="text-xs text-muted-foreground">
            Contact info is stored locally. Shown on property cards when backend
            support is added.
          </p>
        </FormSection>

        {/* 5. Media */}
        <FormSection title="Property Images">
          <p className="text-xs text-muted-foreground">
            Upload multiple images. Drag to reorder. Star sets the primary/cover
            image.
          </p>
          <ImageManager
            images={images}
            primaryIndex={primaryIndex}
            onImagesChange={setImages}
            onPrimaryChange={setPrimaryIndex}
            onPrimaryPersist={
              mode === "edit" && property
                ? (idx) => {
                    setPrimaryImageIndex.mutate({
                      propertyId: property.propertyId,
                      index: BigInt(idx),
                    });
                  }
                : undefined
            }
            onUpload={handleUpload}
            uploading={uploading}
          />
        </FormSection>

        {/* 6. Additional */}
        <FormSection title="Additional" collapsible>
          <div className="space-y-1.5">
            <Label htmlFor="notes">
              Notes{" "}
              <span className="text-muted-foreground text-xs">(optional)</span>
            </Label>
            <Textarea
              id="notes"
              placeholder="Internal notes, special conditions, access instructions…"
              rows={2}
              value={values.notes}
              onChange={setStr("notes")}
              data-ocid="property_form.notes_textarea"
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="plotBoundary">
              Plot Boundary{" "}
              <span className="text-muted-foreground text-xs">
                (JSON coordinates, optional)
              </span>
            </Label>
            <Textarea
              id="plotBoundary"
              placeholder="[[28.53, 77.39], [28.54, 77.40], ...]"
              rows={3}
              value={values.plotBoundaryJson}
              onChange={setStr("plotBoundaryJson")}
              className="font-mono text-xs"
              data-ocid="property_form.boundary_textarea"
            />
          </div>
        </FormSection>

        <Separator />

        {/* Actions */}
        <div className="flex items-center justify-end gap-3 pb-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => navigate({ to: "/admin" })}
            disabled={submitting}
            data-ocid="property_form.cancel_button"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            disabled={submitting || uploading}
            className="min-w-[130px]"
            data-ocid="property_form.submit_button"
          >
            {submitting ? (
              <span className="flex items-center gap-2">
                <Loader2 className="w-4 h-4 animate-spin" />
                Saving…
              </span>
            ) : mode === "new" ? (
              "Add Property"
            ) : (
              "Save Changes"
            )}
          </Button>
        </div>
      </form>
    </>
  );
}

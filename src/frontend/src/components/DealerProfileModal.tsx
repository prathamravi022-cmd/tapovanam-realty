import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Award,
  Briefcase,
  Building2,
  Camera,
  Edit3,
  Facebook,
  Instagram,
  Linkedin,
  Mail,
  Phone,
  Save,
  User,
  X,
} from "lucide-react";
import { motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import type { DealerProfile } from "../backend";
import {
  useDealerProfile,
  useSetDealerProfile,
} from "../hooks/useDealerProfile";
import { GlassModal } from "./GlassModal";

interface DealerProfileModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const DEFAULT_PROFILE: DealerProfile = {
  name: "Shubham Sharma",
  designation: "",
  experience: "",
  bio: "",
  phone: "",
  whatsappNumber: "",
  email: "",
  photoUrl: "",
  linkedinUrl: "",
  instagramUrl: "",
  facebookUrl: "",
};

export function DealerProfileModal({
  open,
  onOpenChange,
}: DealerProfileModalProps) {
  const { data: profile, isLoading } = useDealerProfile();
  const setProfile = useSetDealerProfile();
  const [isEditing, setIsEditing] = useState(false);
  const [form, setForm] = useState<DealerProfile>(DEFAULT_PROFILE);
  const photoInputRef = useRef<HTMLInputElement>(null);

  const dealer = profile ?? DEFAULT_PROFILE;

  // Back button closes modal (Android back gesture support)
  useEffect(() => {
    if (!open) return;
    window.history.pushState({ dealerModal: true }, "");
    function handlePopState() {
      onOpenChange(false);
    }
    window.addEventListener("popstate", handlePopState);
    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, [open, onOpenChange]);

  function startEdit() {
    setForm(dealer);
    setIsEditing(true);
  }

  function cancelEdit() {
    setIsEditing(false);
  }

  function handleChange(field: keyof DealerProfile, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  async function handleSave() {
    try {
      await setProfile.mutateAsync(form);
      setIsEditing(false);
      toast.success("Profile saved successfully!");
    } catch {
      toast.error("Failed to save profile. Please try again.");
    }
  }

  async function handlePhotoUpload(file: File) {
    try {
      const dataUrl = await new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result as string);
        reader.onerror = () => reject(new Error("File read failed"));
        reader.readAsDataURL(file);
      });
      const current = profile ?? DEFAULT_PROFILE;
      await setProfile.mutateAsync({ ...current, photoUrl: dataUrl });
      toast.success("Profile photo updated!");
    } catch {
      toast.error("Failed to upload photo. Please try again.");
    }
  }

  const whatsappUrl = dealer.whatsappNumber
    ? `https://wa.me/${dealer.whatsappNumber.replace(/[^0-9]/g, "")}?text=${encodeURIComponent("Inquiry - Tapovanam Realty Services")}`
    : null;

  const mailtoUrl = dealer.email
    ? `mailto:${dealer.email}?subject=${encodeURIComponent("Inquiry - Tapovanam Realty Services")}`
    : null;

  return (
    <GlassModal
      open={open}
      onOpenChange={(v) => {
        onOpenChange(v);
        if (!v) setIsEditing(false);
      }}
      className="max-w-sm sm:max-w-md"
      title="Agent Profile"
    >
      {isLoading ? (
        <div
          className="flex items-center justify-center py-10"
          data-ocid="dealer-profile.loading_state"
        >
          <div className="w-8 h-8 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
        </div>
      ) : isEditing ? (
        <EditForm
          form={form}
          onChange={handleChange}
          onSave={handleSave}
          onCancel={cancelEdit}
          isSaving={setProfile.isPending}
          photoInputRef={photoInputRef}
          onPhotoUpload={handlePhotoUpload}
        />
      ) : (
        <ProfileView
          dealer={dealer}
          onEdit={startEdit}
          whatsappUrl={whatsappUrl}
          mailtoUrl={mailtoUrl}
          photoInputRef={photoInputRef}
          onPhotoUpload={handlePhotoUpload}
        />
      )}
      {/* Hidden photo file input shared between view and edit modes */}
      <input
        ref={photoInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) handlePhotoUpload(file);
          e.target.value = "";
        }}
        data-ocid="dealer-profile.photo_upload_input"
      />
    </GlassModal>
  );
}

/* ─── Profile View ─── */
interface ProfileViewProps {
  dealer: DealerProfile;
  onEdit: () => void;
  whatsappUrl: string | null;
  mailtoUrl: string | null;
  photoInputRef: React.RefObject<HTMLInputElement | null>;
  onPhotoUpload: (file: File) => void;
}

function ProfileView({
  dealer,
  onEdit,
  whatsappUrl,
  mailtoUrl,
  photoInputRef,
}: ProfileViewProps) {
  const hasSocials =
    dealer.linkedinUrl || dealer.instagramUrl || dealer.facebookUrl;

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
      className="space-y-5"
      data-ocid="dealer-profile.panel"
    >
      {/* Photo + Name + Edit */}
      <div className="flex flex-col items-center text-center gap-3 pt-2">
        <div className="relative">
          <button
            type="button"
            onClick={() => photoInputRef.current?.click()}
            className="group relative w-20 h-20 rounded-full overflow-hidden bg-amber-100 dark:bg-amber-900/30 border-2 border-amber-400/60 shadow-lg flex items-center justify-center cursor-pointer"
            aria-label="Upload profile photo"
            data-ocid="dealer-profile.photo_upload_button"
          >
            {dealer.photoUrl ? (
              <img
                src={dealer.photoUrl}
                alt={dealer.name}
                className="w-full h-full object-cover"
              />
            ) : (
              <User className="w-9 h-9 text-amber-500" />
            )}
            {/* Camera overlay on hover */}
            <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity rounded-full">
              <Camera className="w-5 h-5 text-white" />
            </div>
          </button>
          {/* Gold ring accent */}
          <div className="absolute inset-0 rounded-full ring-2 ring-amber-400/40 ring-offset-2 ring-offset-transparent pointer-events-none" />
        </div>

        <div>
          <h2 className="font-display font-bold text-xl text-foreground leading-tight break-words text-center w-full">
            {dealer.name || "Shubham Sharma"}
          </h2>
          {dealer.designation && (
            <p className="text-sm text-amber-600 dark:text-amber-400 font-medium mt-0.5">
              {dealer.designation}
            </p>
          )}
          <div className="flex items-center justify-center gap-1.5 mt-1 flex-wrap">
            <Building2 className="w-3.5 h-3.5 text-muted-foreground shrink-0" />
            <span className="text-xs text-muted-foreground break-words text-center">
              Tapovanam Realty Services
            </span>
          </div>
        </div>

        {dealer.experience && (
          <div className="flex items-center gap-1.5 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-700/40 rounded-full px-3 py-1">
            <Award className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
            <span className="text-xs font-semibold text-amber-700 dark:text-amber-300">
              {dealer.experience} Experience
            </span>
          </div>
        )}
      </div>

      {/* Bio */}
      {dealer.bio && (
        <p className="text-sm text-muted-foreground leading-relaxed text-center px-1">
          {dealer.bio}
        </p>
      )}

      {/* Contact section */}
      <div className="space-y-2">
        <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground px-0.5">
          Contact
        </p>
        <div className="grid gap-2">
          {whatsappUrl ? (
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              data-ocid="dealer-profile.whatsapp_button"
              className="flex items-center gap-2.5 rounded-xl px-4 py-2.5 bg-green-500 hover:bg-green-600 text-white font-medium text-sm transition-colors duration-200 shadow-sm"
            >
              {/* WhatsApp SVG icon */}
              <svg
                viewBox="0 0 24 24"
                className="w-4 h-4 fill-current"
                aria-hidden="true"
              >
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              WhatsApp
            </a>
          ) : (
            <div className="flex items-center gap-2.5 rounded-xl px-4 py-2.5 bg-muted/60 text-muted-foreground text-sm border border-border">
              <svg
                viewBox="0 0 24 24"
                className="w-4 h-4 fill-current opacity-40"
                aria-hidden="true"
              >
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              WhatsApp — Add via Edit Profile
            </div>
          )}

          {mailtoUrl ? (
            <a
              href={mailtoUrl}
              data-ocid="dealer-profile.email_button"
              className="flex items-center gap-2.5 rounded-xl px-4 py-2.5 bg-amber-500 hover:bg-amber-600 text-white font-medium text-sm transition-colors duration-200 shadow-sm"
            >
              <Mail className="w-4 h-4" />
              Send Email
            </a>
          ) : (
            <div className="flex items-center gap-2.5 rounded-xl px-4 py-2.5 bg-muted/60 text-muted-foreground text-sm border border-border">
              <Mail className="w-4 h-4 opacity-40" />
              Email — Add via Edit Profile
            </div>
          )}

          {dealer.phone ? (
            <a
              href={`tel:${dealer.phone}`}
              data-ocid="dealer-profile.phone_link"
              className="flex items-center gap-2.5 rounded-xl px-4 py-2.5 bg-muted hover:bg-muted/80 text-foreground font-medium text-sm transition-colors duration-200 border border-border"
            >
              <Phone className="w-4 h-4 text-amber-500" />
              {dealer.phone}
            </a>
          ) : (
            <div className="flex items-center gap-2.5 rounded-xl px-4 py-2.5 bg-muted/60 text-muted-foreground text-sm border border-border">
              <Phone className="w-4 h-4 opacity-40" />
              Phone — Add via Edit Profile
            </div>
          )}
        </div>
      </div>

      {/* Social links */}
      {hasSocials && (
        <div className="flex items-center justify-center gap-3 pt-1">
          {dealer.linkedinUrl && (
            <a
              href={dealer.linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              data-ocid="dealer-profile.linkedin_link"
              className="w-9 h-9 rounded-full flex items-center justify-center bg-[#0A66C2]/10 hover:bg-[#0A66C2]/20 text-[#0A66C2] transition-colors duration-200"
            >
              <Linkedin className="w-4 h-4" />
            </a>
          )}
          {dealer.instagramUrl && (
            <a
              href={dealer.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              data-ocid="dealer-profile.instagram_link"
              className="w-9 h-9 rounded-full flex items-center justify-center bg-pink-500/10 hover:bg-pink-500/20 text-pink-500 transition-colors duration-200"
            >
              <Instagram className="w-4 h-4" />
            </a>
          )}
          {dealer.facebookUrl && (
            <a
              href={dealer.facebookUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              data-ocid="dealer-profile.facebook_link"
              className="w-9 h-9 rounded-full flex items-center justify-center bg-[#1877F2]/10 hover:bg-[#1877F2]/20 text-[#1877F2] transition-colors duration-200"
            >
              <Facebook className="w-4 h-4" />
            </a>
          )}
        </div>
      )}

      {/* Edit button */}
      <div className="pt-1 border-t border-white/20 dark:border-white/10">
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={onEdit}
          className="w-full gap-2 text-amber-600 dark:text-amber-400 hover:bg-amber-50 dark:hover:bg-amber-900/20 hover:text-amber-700 dark:hover:text-amber-300"
          data-ocid="dealer-profile.edit_button"
        >
          <Edit3 className="w-3.5 h-3.5" />
          Edit Profile
        </Button>
      </div>
    </motion.div>
  );
}

/* ─── Edit Form ─── */
interface EditFormProps {
  form: DealerProfile;
  onChange: (field: keyof DealerProfile, value: string) => void;
  onSave: () => void;
  onCancel: () => void;
  isSaving: boolean;
  photoInputRef: React.RefObject<HTMLInputElement | null>;
  onPhotoUpload: (file: File) => void;
}

function EditForm({
  form,
  onChange,
  onSave,
  onCancel,
  isSaving,
  photoInputRef,
}: EditFormProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.2 }}
      className="space-y-4"
      data-ocid="dealer-profile.edit_form"
    >
      <div className="flex items-center gap-2 pb-1 border-b border-white/20 dark:border-white/10">
        <Briefcase className="w-4 h-4 text-amber-500" />
        <h3 className="font-display font-semibold text-foreground text-base">
          Edit Profile
        </h3>
      </div>

      {/* Photo upload area in edit mode */}
      <div className="flex justify-center pt-1">
        <button
          type="button"
          onClick={() => photoInputRef.current?.click()}
          className="group relative w-20 h-20 rounded-full overflow-hidden bg-amber-100 dark:bg-amber-900/30 border-2 border-amber-400/60 shadow-lg flex items-center justify-center cursor-pointer"
          aria-label="Upload profile photo"
          data-ocid="dealer-profile.edit_photo_button"
        >
          {form.photoUrl ? (
            <img
              src={form.photoUrl}
              alt="Profile"
              className="w-full h-full object-cover"
            />
          ) : (
            <User className="w-9 h-9 text-amber-500" />
          )}
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-full">
            <Camera className="w-5 h-5 text-white" />
            <span className="text-white text-[9px] mt-0.5">Upload</span>
          </div>
        </button>
      </div>

      <div className="space-y-3 max-h-[55vh] overflow-y-auto pr-1">
        <Field label="Full Name" id="dp-name">
          <Input
            id="dp-name"
            value={form.name}
            onChange={(e) => onChange("name", e.target.value)}
            placeholder="e.g. Shubham Sharma"
            data-ocid="dealer-profile.name_input"
          />
        </Field>

        <Field label="Designation" id="dp-designation">
          <Input
            id="dp-designation"
            value={form.designation}
            onChange={(e) => onChange("designation", e.target.value)}
            placeholder="e.g. Senior Real Estate Consultant"
            data-ocid="dealer-profile.designation_input"
          />
        </Field>

        <Field label="Experience" id="dp-experience">
          <Input
            id="dp-experience"
            value={form.experience}
            onChange={(e) => onChange("experience", e.target.value)}
            placeholder="e.g. 8+ Years"
            data-ocid="dealer-profile.experience_input"
          />
        </Field>

        <Field label="Bio" id="dp-bio">
          <Textarea
            id="dp-bio"
            value={form.bio}
            onChange={(e) => onChange("bio", e.target.value)}
            placeholder="Short introduction about yourself..."
            rows={3}
            className="resize-none"
            data-ocid="dealer-profile.bio_textarea"
          />
        </Field>

        <Field label="Phone" id="dp-phone">
          <Input
            id="dp-phone"
            type="tel"
            value={form.phone}
            onChange={(e) => onChange("phone", e.target.value)}
            placeholder="+91 98765 43210"
            data-ocid="dealer-profile.phone_input"
          />
        </Field>

        <Field label="WhatsApp Number" id="dp-whatsapp">
          <Input
            id="dp-whatsapp"
            type="tel"
            value={form.whatsappNumber}
            onChange={(e) => onChange("whatsappNumber", e.target.value)}
            placeholder="919876543210 (with country code, no +)"
            data-ocid="dealer-profile.whatsapp_input"
          />
        </Field>

        <Field label="Email" id="dp-email">
          <Input
            id="dp-email"
            type="email"
            value={form.email}
            onChange={(e) => onChange("email", e.target.value)}
            placeholder="shubham@tapovanamrealty.com"
            data-ocid="dealer-profile.email_input"
          />
        </Field>

        <Field label="Photo URL" id="dp-photo">
          <Input
            id="dp-photo"
            value={form.photoUrl}
            onChange={(e) => onChange("photoUrl", e.target.value)}
            placeholder="https://example.com/photo.jpg"
            data-ocid="dealer-profile.photo_input"
          />
        </Field>

        <Field label="LinkedIn URL" id="dp-linkedin">
          <Input
            id="dp-linkedin"
            value={form.linkedinUrl}
            onChange={(e) => onChange("linkedinUrl", e.target.value)}
            placeholder="https://linkedin.com/in/shubhamsharma"
            data-ocid="dealer-profile.linkedin_input"
          />
        </Field>

        <Field label="Instagram URL" id="dp-instagram">
          <Input
            id="dp-instagram"
            value={form.instagramUrl}
            onChange={(e) => onChange("instagramUrl", e.target.value)}
            placeholder="https://instagram.com/shubhamsharma"
            data-ocid="dealer-profile.instagram_input"
          />
        </Field>

        <Field label="Facebook URL" id="dp-facebook">
          <Input
            id="dp-facebook"
            value={form.facebookUrl}
            onChange={(e) => onChange("facebookUrl", e.target.value)}
            placeholder="https://facebook.com/shubhamsharma"
            data-ocid="dealer-profile.facebook_input"
          />
        </Field>
      </div>

      {/* Save / Cancel */}
      <div className="flex gap-2 pt-2 border-t border-white/20 dark:border-white/10">
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={onCancel}
          className="flex-1 gap-1.5"
          disabled={isSaving}
          data-ocid="dealer-profile.cancel_button"
        >
          <X className="w-3.5 h-3.5" />
          Cancel
        </Button>
        <Button
          type="button"
          size="sm"
          onClick={onSave}
          className="flex-1 gap-1.5 bg-amber-500 hover:bg-amber-600 text-white"
          disabled={isSaving}
          data-ocid="dealer-profile.save_button"
        >
          {isSaving ? (
            <div className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          ) : (
            <Save className="w-3.5 h-3.5" />
          )}
          {isSaving ? "Saving..." : "Save Profile"}
        </Button>
      </div>
    </motion.div>
  );
}

/* ─── Field helper ─── */
function Field({
  label,
  id,
  children,
}: { label: string; id: string; children: React.ReactNode }) {
  return (
    <div className="space-y-1">
      <Label htmlFor={id} className="text-xs font-medium text-muted-foreground">
        {label}
      </Label>
      {children}
    </div>
  );
}

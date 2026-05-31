import type { AddPartnerInput, BuilderPartner } from "@/backend";
import { GlassModal } from "@/components/GlassModal";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { Switch } from "@/components/ui/switch";
import {
  Building2,
  CheckCircle2,
  Edit2,
  Globe,
  Mail,
  Phone,
  Plus,
  Trash2,
  Users,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import {
  useAddPartner,
  useDeletePartner,
  usePartners,
  useUpdatePartner,
} from "../hooks/usePartners";

// ─── Form state type ────────────────────────────────────────────────────────
type PartnerFormState = {
  name: string;
  logoUrl: string;
  specialization: string;
  contactPhone: string;
  contactEmail: string;
  websiteUrl: string;
  isVerified: boolean;
};

const emptyForm: PartnerFormState = {
  name: "",
  logoUrl: "",
  specialization: "",
  contactPhone: "",
  contactEmail: "",
  websiteUrl: "",
  isVerified: false,
};

// ─── Partner form (add / edit) ───────────────────────────────────────────────
function PartnerForm({
  initial,
  onSubmit,
  isSubmitting,
  submitLabel,
}: {
  initial: PartnerFormState;
  onSubmit: (values: PartnerFormState) => void;
  isSubmitting: boolean;
  submitLabel: string;
}) {
  const [values, setValues] = useState<PartnerFormState>(initial);

  function field(
    key: keyof PartnerFormState,
    label: string,
    type = "text",
    placeholder = "",
  ) {
    return (
      <div className="flex flex-col gap-1.5">
        <Label htmlFor={key} className="text-sm font-medium">
          {label}
        </Label>
        <Input
          id={key}
          type={type}
          placeholder={placeholder}
          value={values[key] as string}
          onChange={(e) => setValues((v) => ({ ...v, [key]: e.target.value }))}
          className="bg-background border-input"
          data-ocid={`admin-partners.${key}-input`}
        />
      </div>
    );
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit(values);
      }}
      className="flex flex-col gap-4"
    >
      {field("name", "Partner Name *", "text", "e.g. Sharma Builders")}
      {field(
        "specialization",
        "Specialization",
        "text",
        "e.g. Residential, Commercial",
      )}
      {field("contactPhone", "Contact Phone", "tel", "+91 98765 43210")}
      {field("contactEmail", "Contact Email", "email", "partner@example.com")}
      {field("websiteUrl", "Website URL", "url", "https://example.com")}
      {field("logoUrl", "Logo URL", "url", "https://example.com/logo.png")}

      <div className="flex items-center justify-between p-3 rounded-lg bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800">
        <div className="flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-amber-600" />
          <Label
            htmlFor="isVerified"
            className="text-sm font-medium text-amber-700 dark:text-amber-300 cursor-pointer"
          >
            Verified Partner
          </Label>
        </div>
        <Switch
          id="isVerified"
          checked={values.isVerified}
          onCheckedChange={(checked) =>
            setValues((v) => ({ ...v, isVerified: checked }))
          }
          data-ocid="admin-partners.verified-toggle"
        />
      </div>

      <Button
        type="submit"
        disabled={isSubmitting || !values.name.trim()}
        className="w-full bg-amber-500 hover:bg-amber-600 text-white font-semibold mt-1"
        data-ocid="admin-partners.submit_button"
      >
        {isSubmitting ? "Saving..." : submitLabel}
      </Button>
    </form>
  );
}

// ─── Delete confirmation modal ───────────────────────────────────────────────
function DeleteConfirmModal({
  open,
  partnerName,
  isDeleting,
  onConfirm,
  onCancel,
}: {
  open: boolean;
  partnerName: string;
  isDeleting: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}) {
  return (
    <GlassModal
      open={open}
      onOpenChange={(o) => !o && onCancel()}
      title="Delete Partner"
    >
      <div className="flex flex-col gap-5">
        <p className="text-muted-foreground text-sm">
          Are you sure you want to delete{" "}
          <span className="font-semibold text-foreground">{partnerName}</span>?
          This action cannot be undone.
        </p>
        <div className="flex gap-3">
          <Button
            type="button"
            variant="outline"
            className="flex-1"
            onClick={onCancel}
            data-ocid="admin-partners.delete-cancel_button"
          >
            Cancel
          </Button>
          <Button
            type="button"
            disabled={isDeleting}
            className="flex-1 bg-destructive hover:bg-destructive/90 text-destructive-foreground"
            onClick={onConfirm}
            data-ocid="admin-partners.delete-confirm_button"
          >
            {isDeleting ? "Deleting..." : "Delete"}
          </Button>
        </div>
      </div>
    </GlassModal>
  );
}

// ─── Partner row ─────────────────────────────────────────────────────────────
function PartnerRow({
  partner,
  index,
  onEdit,
  onDelete,
}: {
  partner: BuilderPartner;
  index: number;
  onEdit: (p: BuilderPartner) => void;
  onDelete: (p: BuilderPartner) => void;
}) {
  return (
    <div
      className="flex items-center gap-3 px-4 py-3 rounded-xl border border-border bg-card hover:bg-muted/30 transition-smooth"
      data-ocid={`admin-partners.item.${index + 1}`}
    >
      {/* Logo */}
      <div className="w-10 h-10 rounded-lg border border-border bg-muted flex items-center justify-center shrink-0 overflow-hidden">
        {partner.logoUrl ? (
          <img
            src={partner.logoUrl}
            alt={partner.name}
            className="w-full h-full object-contain"
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).style.display = "none";
            }}
          />
        ) : (
          <Building2 className="w-5 h-5 text-muted-foreground" />
        )}
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="font-semibold text-foreground text-sm truncate">
            {partner.name}
          </span>
          {partner.isVerified && (
            <Badge className="text-[10px] px-1.5 py-0 bg-amber-100 dark:bg-amber-900/40 text-amber-700 dark:text-amber-300 border-amber-300 dark:border-amber-700 hover:bg-amber-100 shrink-0">
              <CheckCircle2 className="w-2.5 h-2.5 mr-0.5" />
              Verified
            </Badge>
          )}
        </div>
        <div className="flex items-center gap-3 mt-0.5 flex-wrap">
          {partner.specialization && (
            <span className="text-xs text-muted-foreground">
              {partner.specialization}
            </span>
          )}
          {partner.contactPhone && (
            <span className="flex items-center gap-1 text-xs text-muted-foreground">
              <Phone className="w-3 h-3" />
              {partner.contactPhone}
            </span>
          )}
          {partner.contactEmail && (
            <span className="flex items-center gap-1 text-xs text-muted-foreground">
              <Mail className="w-3 h-3" />
              <span className="truncate max-w-[120px]">
                {partner.contactEmail}
              </span>
            </span>
          )}
          {partner.websiteUrl && (
            <span className="flex items-center gap-1 text-xs text-muted-foreground">
              <Globe className="w-3 h-3" />
              <span className="truncate max-w-[100px]">
                {partner.websiteUrl.replace(/^https?:\/\/(www\.)?/, "")}
              </span>
            </span>
          )}
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-1 shrink-0">
        <Button
          type="button"
          variant="ghost"
          size="sm"
          className="h-8 w-8 p-0 text-muted-foreground hover:text-foreground"
          onClick={() => onEdit(partner)}
          aria-label="Edit partner"
          data-ocid={`admin-partners.edit_button.${index + 1}`}
        >
          <Edit2 className="w-3.5 h-3.5" />
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          className="h-8 w-8 p-0 text-muted-foreground hover:text-destructive"
          onClick={() => onDelete(partner)}
          aria-label="Delete partner"
          data-ocid={`admin-partners.delete_button.${index + 1}`}
        >
          <Trash2 className="w-3.5 h-3.5" />
        </Button>
      </div>
    </div>
  );
}

// ─── Page ────────────────────────────────────────────────────────────────────
export function AdminPartnersPage() {
  const { data: partners, isLoading } = usePartners();
  const addPartner = useAddPartner();
  const updatePartner = useUpdatePartner();
  const deletePartner = useDeletePartner();

  const [addModalOpen, setAddModalOpen] = useState(false);
  const [editTarget, setEditTarget] = useState<BuilderPartner | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<BuilderPartner | null>(null);

  async function handleAdd(values: PartnerFormState) {
    const input: AddPartnerInput = {
      name: values.name.trim(),
      logoUrl: values.logoUrl.trim(),
      specialization: values.specialization.trim(),
      contactPhone: values.contactPhone.trim(),
      contactEmail: values.contactEmail.trim(),
      websiteUrl: values.websiteUrl.trim(),
      isVerified: values.isVerified,
    };
    try {
      await addPartner.mutateAsync(input);
      toast.success("Partner added successfully");
      setAddModalOpen(false);
    } catch {
      toast.error("Failed to add partner");
    }
  }

  async function handleEdit(values: PartnerFormState) {
    if (!editTarget) return;
    try {
      await updatePartner.mutateAsync({
        partnerId: editTarget.id,
        input: {
          name: values.name.trim(),
          logoUrl: values.logoUrl.trim(),
          specialization: values.specialization.trim(),
          contactPhone: values.contactPhone.trim(),
          contactEmail: values.contactEmail.trim(),
          websiteUrl: values.websiteUrl.trim(),
          isVerified: values.isVerified,
        },
      });
      toast.success("Partner updated");
      setEditTarget(null);
    } catch {
      toast.error("Failed to update partner");
    }
  }

  async function handleDelete() {
    if (!deleteTarget) return;
    try {
      await deletePartner.mutateAsync(deleteTarget.id);
      toast.success("Partner deleted");
      setDeleteTarget(null);
    } catch {
      toast.error("Failed to delete partner");
    }
  }

  return (
    <div className="min-h-screen bg-background" data-ocid="admin-partners.page">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Page header */}
        <div className="flex items-center justify-between mb-6 gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <div className="w-1 h-6 rounded-full bg-gradient-to-b from-amber-400 to-yellow-500" />
              <h1 className="font-display font-bold text-2xl text-foreground">
                Builder Partners
              </h1>
            </div>
            <p className="text-sm text-muted-foreground">
              Manage authorised builder partners
            </p>
          </div>
          <Button
            type="button"
            onClick={() => setAddModalOpen(true)}
            className="gap-2 bg-amber-500 hover:bg-amber-600 text-white font-semibold shadow-sm shrink-0"
            data-ocid="admin-partners.add_button"
          >
            <Plus className="w-4 h-4" />
            <span className="hidden sm:inline">Add Partner</span>
            <span className="sm:hidden">Add</span>
          </Button>
        </div>

        {/* Partners list */}
        <Card className="border border-border">
          <CardHeader className="pb-3">
            <CardTitle className="text-base font-semibold text-foreground flex items-center gap-2">
              <Users className="w-4 h-4 text-amber-500" />
              All Partners
              {partners && (
                <Badge variant="secondary" className="ml-auto text-xs">
                  {partners.length}
                </Badge>
              )}
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            {isLoading ? (
              <div className="flex flex-col gap-3">
                {Array.from({ length: 3 }).map((_, i) => (
                  // biome-ignore lint/suspicious/noArrayIndexKey: skeleton
                  <Skeleton key={i} className="h-16 rounded-xl" />
                ))}
              </div>
            ) : partners && partners.length > 0 ? (
              <div className="flex flex-col gap-2">
                {partners.map((p, i) => (
                  <PartnerRow
                    key={p.id}
                    partner={p}
                    index={i}
                    onEdit={(partner) => setEditTarget(partner)}
                    onDelete={(partner) => setDeleteTarget(partner)}
                  />
                ))}
              </div>
            ) : (
              <div
                className="flex flex-col items-center justify-center py-16 gap-3"
                data-ocid="admin-partners.empty_state"
              >
                <div className="w-12 h-12 rounded-2xl bg-amber-50 dark:bg-amber-900/20 flex items-center justify-center">
                  <Users className="w-6 h-6 text-amber-500" />
                </div>
                <p className="text-sm text-muted-foreground">
                  No partners yet. Add the first one!
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Add Partner modal */}
      <GlassModal
        open={addModalOpen}
        onOpenChange={setAddModalOpen}
        title="Add Partner"
        className="max-w-lg"
        data-ocid="admin-partners.add-modal.dialog"
      >
        <PartnerForm
          initial={emptyForm}
          onSubmit={handleAdd}
          isSubmitting={addPartner.isPending}
          submitLabel="Add Partner"
        />
      </GlassModal>

      {/* Edit Partner modal */}
      <GlassModal
        open={!!editTarget}
        onOpenChange={(o) => !o && setEditTarget(null)}
        title="Edit Partner"
        className="max-w-lg"
        data-ocid="admin-partners.edit-modal.dialog"
      >
        {editTarget && (
          <PartnerForm
            initial={{
              name: editTarget.name,
              logoUrl: editTarget.logoUrl,
              specialization: editTarget.specialization,
              contactPhone: editTarget.contactPhone,
              contactEmail: editTarget.contactEmail,
              websiteUrl: editTarget.websiteUrl,
              isVerified: editTarget.isVerified,
            }}
            onSubmit={handleEdit}
            isSubmitting={updatePartner.isPending}
            submitLabel="Save Changes"
          />
        )}
      </GlassModal>

      {/* Delete confirm modal */}
      <DeleteConfirmModal
        open={!!deleteTarget}
        partnerName={deleteTarget?.name ?? ""}
        isDeleting={deletePartner.isPending}
        onConfirm={handleDelete}
        onCancel={() => setDeleteTarget(null)}
      />
    </div>
  );
}

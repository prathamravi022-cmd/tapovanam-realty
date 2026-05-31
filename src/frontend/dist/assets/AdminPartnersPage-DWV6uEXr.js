import { c as createLucideIcon, r as reactExports, B as jsxRuntimeExports, K as Button, aE as GlassModal, a8 as Building2, W as Phone, aD as Mail, N as Label, a9 as ue, I as Input } from "./index-D6obxqBN.js";
import { B as Badge } from "./badge-DMkhsvL2.js";
import { u as usePartners, c as useAddPartner, d as useUpdatePartner, e as useDeletePartner, C as Card, f as CardHeader, g as CardTitle, U as Users, a as CardContent, b as CircleCheck, G as Globe } from "./usePartners-ia77-uRa.js";
import { S as Skeleton } from "./skeleton-24zo03YF.js";
import { S as Switch } from "./switch-BLRt9our.js";
import { P as Plus } from "./plus-4kNKOwcO.js";
import { T as Trash2 } from "./index-IHAb3OcJ.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  [
    "path",
    {
      d: "M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z",
      key: "1a8usu"
    }
  ]
];
const Pen = createLucideIcon("pen", __iconNode);
const emptyForm = {
  name: "",
  logoUrl: "",
  specialization: "",
  contactPhone: "",
  contactEmail: "",
  websiteUrl: "",
  isVerified: false
};
function PartnerForm({
  initial,
  onSubmit,
  isSubmitting,
  submitLabel
}) {
  const [values, setValues] = reactExports.useState(initial);
  function field(key, label, type = "text", placeholder = "") {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-1.5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: key, className: "text-sm font-medium", children: label }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Input,
        {
          id: key,
          type,
          placeholder,
          value: values[key],
          onChange: (e) => setValues((v) => ({ ...v, [key]: e.target.value })),
          className: "bg-background border-input",
          "data-ocid": `admin-partners.${key}-input`
        }
      )
    ] });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "form",
    {
      onSubmit: (e) => {
        e.preventDefault();
        onSubmit(values);
      },
      className: "flex flex-col gap-4",
      children: [
        field("name", "Partner Name *", "text", "e.g. Sharma Builders"),
        field(
          "specialization",
          "Specialization",
          "text",
          "e.g. Residential, Commercial"
        ),
        field("contactPhone", "Contact Phone", "tel", "+91 98765 43210"),
        field("contactEmail", "Contact Email", "email", "partner@example.com"),
        field("websiteUrl", "Website URL", "url", "https://example.com"),
        field("logoUrl", "Logo URL", "url", "https://example.com/logo.png"),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between p-3 rounded-lg bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-4 h-4 text-amber-600" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Label,
              {
                htmlFor: "isVerified",
                className: "text-sm font-medium text-amber-700 dark:text-amber-300 cursor-pointer",
                children: "Verified Partner"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Switch,
            {
              id: "isVerified",
              checked: values.isVerified,
              onCheckedChange: (checked) => setValues((v) => ({ ...v, isVerified: checked })),
              "data-ocid": "admin-partners.verified-toggle"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            type: "submit",
            disabled: isSubmitting || !values.name.trim(),
            className: "w-full bg-amber-500 hover:bg-amber-600 text-white font-semibold mt-1",
            "data-ocid": "admin-partners.submit_button",
            children: isSubmitting ? "Saving..." : submitLabel
          }
        )
      ]
    }
  );
}
function DeleteConfirmModal({
  open,
  partnerName,
  isDeleting,
  onConfirm,
  onCancel
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    GlassModal,
    {
      open,
      onOpenChange: (o) => !o && onCancel(),
      title: "Delete Partner",
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-muted-foreground text-sm", children: [
          "Are you sure you want to delete",
          " ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-foreground", children: partnerName }),
          "? This action cannot be undone."
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              type: "button",
              variant: "outline",
              className: "flex-1",
              onClick: onCancel,
              "data-ocid": "admin-partners.delete-cancel_button",
              children: "Cancel"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              type: "button",
              disabled: isDeleting,
              className: "flex-1 bg-destructive hover:bg-destructive/90 text-destructive-foreground",
              onClick: onConfirm,
              "data-ocid": "admin-partners.delete-confirm_button",
              children: isDeleting ? "Deleting..." : "Delete"
            }
          )
        ] })
      ] })
    }
  );
}
function PartnerRow({
  partner,
  index,
  onEdit,
  onDelete
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "flex items-center gap-3 px-4 py-3 rounded-xl border border-border bg-card hover:bg-muted/30 transition-smooth",
      "data-ocid": `admin-partners.item.${index + 1}`,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-10 h-10 rounded-lg border border-border bg-muted flex items-center justify-center shrink-0 overflow-hidden", children: partner.logoUrl ? /* @__PURE__ */ jsxRuntimeExports.jsx(
          "img",
          {
            src: partner.logoUrl,
            alt: partner.name,
            className: "w-full h-full object-contain",
            onError: (e) => {
              e.currentTarget.style.display = "none";
            }
          }
        ) : /* @__PURE__ */ jsxRuntimeExports.jsx(Building2, { className: "w-5 h-5 text-muted-foreground" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 flex-wrap", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-foreground text-sm truncate", children: partner.name }),
            partner.isVerified && /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { className: "text-[10px] px-1.5 py-0 bg-amber-100 dark:bg-amber-900/40 text-amber-700 dark:text-amber-300 border-amber-300 dark:border-amber-700 hover:bg-amber-100 shrink-0", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-2.5 h-2.5 mr-0.5" }),
              "Verified"
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 mt-0.5 flex-wrap", children: [
            partner.specialization && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: partner.specialization }),
            partner.contactPhone && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1 text-xs text-muted-foreground", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Phone, { className: "w-3 h-3" }),
              partner.contactPhone
            ] }),
            partner.contactEmail && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1 text-xs text-muted-foreground", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Mail, { className: "w-3 h-3" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "truncate max-w-[120px]", children: partner.contactEmail })
            ] }),
            partner.websiteUrl && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1 text-xs text-muted-foreground", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Globe, { className: "w-3 h-3" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "truncate max-w-[100px]", children: partner.websiteUrl.replace(/^https?:\/\/(www\.)?/, "") })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1 shrink-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              type: "button",
              variant: "ghost",
              size: "sm",
              className: "h-8 w-8 p-0 text-muted-foreground hover:text-foreground",
              onClick: () => onEdit(partner),
              "aria-label": "Edit partner",
              "data-ocid": `admin-partners.edit_button.${index + 1}`,
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(Pen, { className: "w-3.5 h-3.5" })
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              type: "button",
              variant: "ghost",
              size: "sm",
              className: "h-8 w-8 p-0 text-muted-foreground hover:text-destructive",
              onClick: () => onDelete(partner),
              "aria-label": "Delete partner",
              "data-ocid": `admin-partners.delete_button.${index + 1}`,
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "w-3.5 h-3.5" })
            }
          )
        ] })
      ]
    }
  );
}
function AdminPartnersPage() {
  const { data: partners, isLoading } = usePartners();
  const addPartner = useAddPartner();
  const updatePartner = useUpdatePartner();
  const deletePartner = useDeletePartner();
  const [addModalOpen, setAddModalOpen] = reactExports.useState(false);
  const [editTarget, setEditTarget] = reactExports.useState(null);
  const [deleteTarget, setDeleteTarget] = reactExports.useState(null);
  async function handleAdd(values) {
    const input = {
      name: values.name.trim(),
      logoUrl: values.logoUrl.trim(),
      specialization: values.specialization.trim(),
      contactPhone: values.contactPhone.trim(),
      contactEmail: values.contactEmail.trim(),
      websiteUrl: values.websiteUrl.trim(),
      isVerified: values.isVerified
    };
    try {
      await addPartner.mutateAsync(input);
      ue.success("Partner added successfully");
      setAddModalOpen(false);
    } catch {
      ue.error("Failed to add partner");
    }
  }
  async function handleEdit(values) {
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
          isVerified: values.isVerified
        }
      });
      ue.success("Partner updated");
      setEditTarget(null);
    } catch {
      ue.error("Failed to update partner");
    }
  }
  async function handleDelete() {
    if (!deleteTarget) return;
    try {
      await deletePartner.mutateAsync(deleteTarget.id);
      ue.success("Partner deleted");
      setDeleteTarget(null);
    } catch {
      ue.error("Failed to delete partner");
    }
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-background", "data-ocid": "admin-partners.page", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-4xl mx-auto px-4 py-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-6 gap-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-1 h-6 rounded-full bg-gradient-to-b from-amber-400 to-yellow-500" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display font-bold text-2xl text-foreground", children: "Builder Partners" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Manage authorised builder partners" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            type: "button",
            onClick: () => setAddModalOpen(true),
            className: "gap-2 bg-amber-500 hover:bg-amber-600 text-white font-semibold shadow-sm shrink-0",
            "data-ocid": "admin-partners.add_button",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "w-4 h-4" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "hidden sm:inline", children: "Add Partner" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "sm:hidden", children: "Add" })
            ]
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "border border-border", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "pb-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "text-base font-semibold text-foreground flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "w-4 h-4 text-amber-500" }),
          "All Partners",
          partners && /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "secondary", className: "ml-auto text-xs", children: partners.length })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "pt-0", children: isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-col gap-3", children: Array.from({ length: 3 }).map((_, i) => (
          // biome-ignore lint/suspicious/noArrayIndexKey: skeleton
          /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-16 rounded-xl" }, i)
        )) }) : partners && partners.length > 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-col gap-2", children: partners.map((p, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          PartnerRow,
          {
            partner: p,
            index: i,
            onEdit: (partner) => setEditTarget(partner),
            onDelete: (partner) => setDeleteTarget(partner)
          },
          p.id
        )) }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "flex flex-col items-center justify-center py-16 gap-3",
            "data-ocid": "admin-partners.empty_state",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-12 h-12 rounded-2xl bg-amber-50 dark:bg-amber-900/20 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "w-6 h-6 text-amber-500" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "No partners yet. Add the first one!" })
            ]
          }
        ) })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      GlassModal,
      {
        open: addModalOpen,
        onOpenChange: setAddModalOpen,
        title: "Add Partner",
        className: "max-w-lg",
        "data-ocid": "admin-partners.add-modal.dialog",
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          PartnerForm,
          {
            initial: emptyForm,
            onSubmit: handleAdd,
            isSubmitting: addPartner.isPending,
            submitLabel: "Add Partner"
          }
        )
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      GlassModal,
      {
        open: !!editTarget,
        onOpenChange: (o) => !o && setEditTarget(null),
        title: "Edit Partner",
        className: "max-w-lg",
        "data-ocid": "admin-partners.edit-modal.dialog",
        children: editTarget && /* @__PURE__ */ jsxRuntimeExports.jsx(
          PartnerForm,
          {
            initial: {
              name: editTarget.name,
              logoUrl: editTarget.logoUrl,
              specialization: editTarget.specialization,
              contactPhone: editTarget.contactPhone,
              contactEmail: editTarget.contactEmail,
              websiteUrl: editTarget.websiteUrl,
              isVerified: editTarget.isVerified
            },
            onSubmit: handleEdit,
            isSubmitting: updatePartner.isPending,
            submitLabel: "Save Changes"
          }
        )
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      DeleteConfirmModal,
      {
        open: !!deleteTarget,
        partnerName: (deleteTarget == null ? void 0 : deleteTarget.name) ?? "",
        isDeleting: deletePartner.isPending,
        onConfirm: handleDelete,
        onCancel: () => setDeleteTarget(null)
      }
    )
  ] });
}
export {
  AdminPartnersPage
};

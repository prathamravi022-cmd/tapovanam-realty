import { c as createLucideIcon, T as useParams, aa as useNavigate, B as jsxRuntimeExports, L as Link, K as Button, P as PropertyStatus, a9 as ue } from "./index-D6obxqBN.js";
import { A as AlertDialog, a as AlertDialogTrigger, b as AlertDialogContent, c as AlertDialogHeader, d as AlertDialogTitle, e as AlertDialogDescription, f as AlertDialogFooter, g as AlertDialogCancel, h as AlertDialogAction } from "./alert-dialog-9ndjw9WW.js";
import { S as Skeleton } from "./skeleton-24zo03YF.js";
import { P as PropertyForm } from "./PropertyForm-Dr1z-Rf2.js";
import { u as useProperties, a as useDeleteProperty } from "./useProperties-SsI244bB.js";
import { C as ChevronLeft } from "./map-pin-BZS1lrIG.js";
import { T as Trash2 } from "./index-IHAb3OcJ.js";
import "./badge-DMkhsvL2.js";
import "./chevron-up-mXdalfp2.js";
import "./star-Dhud6W4L.js";
import "./switch-BLRt9our.js";
import "./PropertyMap-rE-6yC17.js";
import "./hard-hat-BZ9LXJGF.js";
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
      d: "m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3",
      key: "wmoenq"
    }
  ],
  ["path", { d: "M12 9v4", key: "juzpu7" }],
  ["path", { d: "M12 17h.01", key: "p32p05" }]
];
const TriangleAlert = createLucideIcon("triangle-alert", __iconNode);
function AdminPropertyEditPage() {
  const { id } = useParams({ from: "/admin/property/$id/edit" });
  const navigate = useNavigate();
  const { data: properties, isLoading: propsLoading } = useProperties();
  const deleteProperty = useDeleteProperty();
  const property = properties == null ? void 0 : properties.find((p) => p.propertyId === id);
  const handleDelete = async () => {
    if (!property) return;
    try {
      await deleteProperty.mutateAsync(property.propertyId);
      ue.success(`"${property.title}" deleted`);
      navigate({ to: "/admin" });
    } catch {
      ue.error("Failed to delete property");
    }
  };
  if (propsLoading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-3xl mx-auto px-4 py-10 space-y-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-8 w-64" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-96 w-full rounded-xl" })
    ] });
  }
  if (!property) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-3xl mx-auto px-4 py-20 flex flex-col items-center gap-6 text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-16 h-16 rounded-full bg-muted flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(TriangleAlert, { className: "w-8 h-8 text-muted-foreground" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-2xl font-semibold text-foreground mb-2", children: "Property Not Found" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm", children: "The property you're trying to edit doesn't exist or has been deleted." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/admin", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { variant: "outline", className: "gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronLeft, { className: "w-4 h-4" }),
        "Back to Dashboard"
      ] }) })
    ] });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-3xl mx-auto px-4 py-8", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/admin", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          variant: "ghost",
          size: "sm",
          className: "gap-1.5 text-muted-foreground hover:text-foreground -ml-2",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronLeft, { className: "w-4 h-4" }),
            "Dashboard"
          ]
        }
      ) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground text-sm", children: "/" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-medium text-foreground truncate max-w-[200px]", children: property.title })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row sm:items-start gap-3 mb-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-2xl font-semibold text-foreground", children: "Edit Property" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm mt-1 truncate", children: property.title })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 shrink-0", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "span",
          {
            className: `text-xs font-medium px-2 py-1 rounded-full ${property.status === PropertyStatus.available ? "bg-primary/10 text-primary" : "bg-secondary/10 text-secondary-foreground"}`,
            children: property.status === PropertyStatus.available ? "Available" : "Sold"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialog, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogTrigger, { asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              variant: "outline",
              size: "sm",
              className: "gap-1.5 text-destructive border-destructive/30 hover:bg-destructive hover:text-destructive-foreground",
              "data-ocid": "delete-property-btn",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "w-4 h-4" }),
                "Delete"
              ]
            }
          ) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogContent, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogHeader, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogTitle, { children: "Delete Property" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogDescription, { children: [
                "Are you sure you want to permanently delete",
                " ",
                /* @__PURE__ */ jsxRuntimeExports.jsxs("strong", { children: [
                  "“",
                  property.title,
                  "”"
                ] }),
                "? All images and data will be removed. This cannot be undone."
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogFooter, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogCancel, { children: "Cancel" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                AlertDialogAction,
                {
                  className: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
                  onClick: handleDelete,
                  disabled: deleteProperty.isPending,
                  "data-ocid": "confirm-delete-btn",
                  children: deleteProperty.isPending ? "Deleting…" : "Delete Property"
                }
              )
            ] })
          ] })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(PropertyForm, { mode: "edit", property })
  ] });
}
export {
  AdminPropertyEditPage
};

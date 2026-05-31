import { B as jsxRuntimeExports, L as Link, K as Button } from "./index-D6obxqBN.js";
import { P as PropertyForm } from "./PropertyForm-Dr1z-Rf2.js";
import { C as ChevronLeft } from "./map-pin-BZS1lrIG.js";
import "./badge-DMkhsvL2.js";
import "./index-IHAb3OcJ.js";
import "./chevron-up-mXdalfp2.js";
import "./star-Dhud6W4L.js";
import "./switch-BLRt9our.js";
import "./useProperties-SsI244bB.js";
import "./PropertyMap-rE-6yC17.js";
import "./hard-hat-BZ9LXJGF.js";
function AdminPropertyNewPage() {
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
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-medium text-foreground", children: "Add New Property" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-2xl font-semibold text-foreground", children: "Add New Property" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm mt-1", children: "Fill in the details to list a new plot or land." })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(PropertyForm, { mode: "new" })
  ] });
}
export {
  AdminPropertyNewPage
};

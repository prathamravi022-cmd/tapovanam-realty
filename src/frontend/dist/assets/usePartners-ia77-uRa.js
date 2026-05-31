import { c as createLucideIcon, B as jsxRuntimeExports, D as cn, O as useActor, Q as useQuery, F as useQueryClient, aC as useMutation, R as createActor } from "./index-D6obxqBN.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["path", { d: "m9 12 2 2 4-4", key: "dzmm74" }]
];
const CircleCheck = createLucideIcon("circle-check", __iconNode$2);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["path", { d: "M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20", key: "13o1zl" }],
  ["path", { d: "M2 12h20", key: "9i4pu4" }]
];
const Globe = createLucideIcon("globe", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2", key: "1yyitq" }],
  ["path", { d: "M16 3.128a4 4 0 0 1 0 7.744", key: "16gr8j" }],
  ["path", { d: "M22 21v-2a4 4 0 0 0-3-3.87", key: "kshegd" }],
  ["circle", { cx: "9", cy: "7", r: "4", key: "nufk8" }]
];
const Users = createLucideIcon("users", __iconNode);
function Card({ className, ...props }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      "data-slot": "card",
      className: cn(
        "bg-card text-card-foreground flex flex-col gap-6 rounded-xl border py-6 shadow-sm",
        className
      ),
      ...props
    }
  );
}
function CardHeader({ className, ...props }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      "data-slot": "card-header",
      className: cn(
        "@container/card-header grid auto-rows-min grid-rows-[auto_auto] items-start gap-1.5 px-6 has-data-[slot=card-action]:grid-cols-[1fr_auto] [.border-b]:pb-6",
        className
      ),
      ...props
    }
  );
}
function CardTitle({ className, ...props }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      "data-slot": "card-title",
      className: cn("leading-none font-semibold", className),
      ...props
    }
  );
}
function CardContent({ className, ...props }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      "data-slot": "card-content",
      className: cn("px-6", className),
      ...props
    }
  );
}
const PARTNERS_QUERY_KEY = ["partners"];
function usePartners() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: PARTNERS_QUERY_KEY,
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllPartners();
    },
    enabled: !!actor && !isFetching,
    staleTime: 15e3
  });
}
function useAddPartner() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (input) => {
      if (!actor) throw new Error("Actor not available");
      return actor.addPartner(input);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: PARTNERS_QUERY_KEY });
    }
  });
}
function useUpdatePartner() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ partnerId, input }) => {
      if (!actor) throw new Error("Actor not available");
      return actor.updatePartner(partnerId, input);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: PARTNERS_QUERY_KEY });
    }
  });
}
function useDeletePartner() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (partnerId) => {
      if (!actor) throw new Error("Actor not available");
      return actor.deletePartner(partnerId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: PARTNERS_QUERY_KEY });
    }
  });
}
export {
  Card as C,
  Globe as G,
  Users as U,
  CardContent as a,
  CircleCheck as b,
  useAddPartner as c,
  useUpdatePartner as d,
  useDeletePartner as e,
  CardHeader as f,
  CardTitle as g,
  usePartners as u
};

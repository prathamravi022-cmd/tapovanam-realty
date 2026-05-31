import { c as createLucideIcon, a1 as createContextScope, a5 as React2, $ as useComposedRefs, B as jsxRuntimeExports, an as createSlot, r as reactExports, ao as reactDomExports, Z as Primitive, ap as useCallbackRef, aq as useLayoutEffect2, _ as useControllableState, ar as useId, a0 as composeEventHandlers, as as Portal$1, at as hideOthers, au as useFocusGuards, av as ReactRemoveScroll, aw as FocusScope, ax as DismissableLayer, D as cn, ay as Primitive$1, aa as useNavigate, O as useActor, P as PropertyStatus, az as LegalStatus, a9 as ue, aA as ExternalBlob, E as AnimatePresence, N as Label, I as Input, C as motion, aB as Textarea, K as Button, W as Phone, X, R as createActor } from "./index-D6obxqBN.js";
import { B as Badge } from "./badge-DMkhsvL2.js";
import { a as useSize, u as usePrevious, T as Trash2 } from "./index-IHAb3OcJ.js";
import { a as ChevronDown, C as ChevronUp } from "./chevron-up-mXdalfp2.js";
import { C as Check, S as Star } from "./star-Dhud6W4L.js";
import { S as Switch } from "./switch-BLRt9our.js";
import { c as useAddProperty, d as useUpdateProperty, e as useAddImageToProperty, f as useReorderImages, g as useSetPrimaryImageIndex } from "./useProperties-SsI244bB.js";
import { P as PropertyMap, T as Tag } from "./PropertyMap-rE-6yC17.js";
import { H as HardHat } from "./hard-hat-BZ9LXJGF.js";
import { M as MapPin } from "./map-pin-BZS1lrIG.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$4 = [
  ["rect", { x: "2", y: "6", width: "20", height: "8", rx: "1", key: "1estib" }],
  ["path", { d: "M17 14v7", key: "7m2elx" }],
  ["path", { d: "M7 14v7", key: "1cm7wv" }],
  ["path", { d: "M17 3v3", key: "1v4jwn" }],
  ["path", { d: "M7 3v3", key: "7o6guu" }],
  ["path", { d: "M10 14 2.3 6.3", key: "1023jk" }],
  ["path", { d: "m14 6 7.7 7.7", key: "1s8pl2" }],
  ["path", { d: "m8 6 8 8", key: "hl96qh" }]
];
const Construction = createLucideIcon("construction", __iconNode$4);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$3 = [
  ["rect", { width: "18", height: "18", x: "3", y: "3", rx: "2", ry: "2", key: "1m3agn" }],
  ["circle", { cx: "9", cy: "9", r: "2", key: "af1f0g" }],
  ["path", { d: "m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21", key: "1xmnt7" }]
];
const Image = createLucideIcon("image", __iconNode$3);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [["path", { d: "M21 12a9 9 0 1 1-6.219-8.56", key: "13zald" }]];
const LoaderCircle = createLucideIcon("loader-circle", __iconNode$2);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["line", { x1: "2", x2: "5", y1: "12", y2: "12", key: "bvdh0s" }],
  ["line", { x1: "19", x2: "22", y1: "12", y2: "12", key: "1tbv5k" }],
  ["line", { x1: "12", x2: "12", y1: "2", y2: "5", key: "11lu5j" }],
  ["line", { x1: "12", x2: "12", y1: "19", y2: "22", key: "x3vr5v" }],
  ["circle", { cx: "12", cy: "12", r: "7", key: "fim9np" }],
  ["circle", { cx: "12", cy: "12", r: "3", key: "1v7zrd" }]
];
const LocateFixed = createLucideIcon("locate-fixed", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M12 3v12", key: "1x0j5s" }],
  ["path", { d: "m17 8-5-5-5 5", key: "7q97r8" }],
  ["path", { d: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4", key: "ih7n3h" }]
];
const Upload = createLucideIcon("upload", __iconNode);
function clamp$1(value, [min2, max2]) {
  return Math.min(max2, Math.max(min2, value));
}
function createCollection(name) {
  const PROVIDER_NAME = name + "CollectionProvider";
  const [createCollectionContext, createCollectionScope2] = createContextScope(PROVIDER_NAME);
  const [CollectionProviderImpl, useCollectionContext] = createCollectionContext(
    PROVIDER_NAME,
    { collectionRef: { current: null }, itemMap: /* @__PURE__ */ new Map() }
  );
  const CollectionProvider = (props) => {
    const { scope, children } = props;
    const ref = React2.useRef(null);
    const itemMap = React2.useRef(/* @__PURE__ */ new Map()).current;
    return /* @__PURE__ */ jsxRuntimeExports.jsx(CollectionProviderImpl, { scope, itemMap, collectionRef: ref, children });
  };
  CollectionProvider.displayName = PROVIDER_NAME;
  const COLLECTION_SLOT_NAME = name + "CollectionSlot";
  const CollectionSlotImpl = createSlot(COLLECTION_SLOT_NAME);
  const CollectionSlot = React2.forwardRef(
    (props, forwardedRef) => {
      const { scope, children } = props;
      const context = useCollectionContext(COLLECTION_SLOT_NAME, scope);
      const composedRefs = useComposedRefs(forwardedRef, context.collectionRef);
      return /* @__PURE__ */ jsxRuntimeExports.jsx(CollectionSlotImpl, { ref: composedRefs, children });
    }
  );
  CollectionSlot.displayName = COLLECTION_SLOT_NAME;
  const ITEM_SLOT_NAME = name + "CollectionItemSlot";
  const ITEM_DATA_ATTR = "data-radix-collection-item";
  const CollectionItemSlotImpl = createSlot(ITEM_SLOT_NAME);
  const CollectionItemSlot = React2.forwardRef(
    (props, forwardedRef) => {
      const { scope, children, ...itemData } = props;
      const ref = React2.useRef(null);
      const composedRefs = useComposedRefs(forwardedRef, ref);
      const context = useCollectionContext(ITEM_SLOT_NAME, scope);
      React2.useEffect(() => {
        context.itemMap.set(ref, { ref, ...itemData });
        return () => void context.itemMap.delete(ref);
      });
      return /* @__PURE__ */ jsxRuntimeExports.jsx(CollectionItemSlotImpl, { ...{ [ITEM_DATA_ATTR]: "" }, ref: composedRefs, children });
    }
  );
  CollectionItemSlot.displayName = ITEM_SLOT_NAME;
  function useCollection2(scope) {
    const context = useCollectionContext(name + "CollectionConsumer", scope);
    const getItems = React2.useCallback(() => {
      const collectionNode = context.collectionRef.current;
      if (!collectionNode) return [];
      const orderedNodes = Array.from(collectionNode.querySelectorAll(`[${ITEM_DATA_ATTR}]`));
      const items = Array.from(context.itemMap.values());
      const orderedItems = items.sort(
        (a, b) => orderedNodes.indexOf(a.ref.current) - orderedNodes.indexOf(b.ref.current)
      );
      return orderedItems;
    }, [context.collectionRef, context.itemMap]);
    return getItems;
  }
  return [
    { Provider: CollectionProvider, Slot: CollectionSlot, ItemSlot: CollectionItemSlot },
    useCollection2,
    createCollectionScope2
  ];
}
var DirectionContext = reactExports.createContext(void 0);
function useDirection(localDir) {
  const globalDir = reactExports.useContext(DirectionContext);
  return localDir || globalDir || "ltr";
}
const sides = ["top", "right", "bottom", "left"];
const min = Math.min;
const max = Math.max;
const round = Math.round;
const floor = Math.floor;
const createCoords = (v) => ({
  x: v,
  y: v
});
const oppositeSideMap = {
  left: "right",
  right: "left",
  bottom: "top",
  top: "bottom"
};
function clamp(start, value, end) {
  return max(start, min(value, end));
}
function evaluate(value, param) {
  return typeof value === "function" ? value(param) : value;
}
function getSide(placement) {
  return placement.split("-")[0];
}
function getAlignment(placement) {
  return placement.split("-")[1];
}
function getOppositeAxis(axis) {
  return axis === "x" ? "y" : "x";
}
function getAxisLength(axis) {
  return axis === "y" ? "height" : "width";
}
function getSideAxis(placement) {
  const firstChar = placement[0];
  return firstChar === "t" || firstChar === "b" ? "y" : "x";
}
function getAlignmentAxis(placement) {
  return getOppositeAxis(getSideAxis(placement));
}
function getAlignmentSides(placement, rects, rtl) {
  if (rtl === void 0) {
    rtl = false;
  }
  const alignment = getAlignment(placement);
  const alignmentAxis = getAlignmentAxis(placement);
  const length = getAxisLength(alignmentAxis);
  let mainAlignmentSide = alignmentAxis === "x" ? alignment === (rtl ? "end" : "start") ? "right" : "left" : alignment === "start" ? "bottom" : "top";
  if (rects.reference[length] > rects.floating[length]) {
    mainAlignmentSide = getOppositePlacement(mainAlignmentSide);
  }
  return [mainAlignmentSide, getOppositePlacement(mainAlignmentSide)];
}
function getExpandedPlacements(placement) {
  const oppositePlacement = getOppositePlacement(placement);
  return [getOppositeAlignmentPlacement(placement), oppositePlacement, getOppositeAlignmentPlacement(oppositePlacement)];
}
function getOppositeAlignmentPlacement(placement) {
  return placement.includes("start") ? placement.replace("start", "end") : placement.replace("end", "start");
}
const lrPlacement = ["left", "right"];
const rlPlacement = ["right", "left"];
const tbPlacement = ["top", "bottom"];
const btPlacement = ["bottom", "top"];
function getSideList(side, isStart, rtl) {
  switch (side) {
    case "top":
    case "bottom":
      if (rtl) return isStart ? rlPlacement : lrPlacement;
      return isStart ? lrPlacement : rlPlacement;
    case "left":
    case "right":
      return isStart ? tbPlacement : btPlacement;
    default:
      return [];
  }
}
function getOppositeAxisPlacements(placement, flipAlignment, direction, rtl) {
  const alignment = getAlignment(placement);
  let list = getSideList(getSide(placement), direction === "start", rtl);
  if (alignment) {
    list = list.map((side) => side + "-" + alignment);
    if (flipAlignment) {
      list = list.concat(list.map(getOppositeAlignmentPlacement));
    }
  }
  return list;
}
function getOppositePlacement(placement) {
  const side = getSide(placement);
  return oppositeSideMap[side] + placement.slice(side.length);
}
function expandPaddingObject(padding) {
  return {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    ...padding
  };
}
function getPaddingObject(padding) {
  return typeof padding !== "number" ? expandPaddingObject(padding) : {
    top: padding,
    right: padding,
    bottom: padding,
    left: padding
  };
}
function rectToClientRect(rect) {
  const {
    x,
    y,
    width,
    height
  } = rect;
  return {
    width,
    height,
    top: y,
    left: x,
    right: x + width,
    bottom: y + height,
    x,
    y
  };
}
function computeCoordsFromPlacement(_ref, placement, rtl) {
  let {
    reference,
    floating
  } = _ref;
  const sideAxis = getSideAxis(placement);
  const alignmentAxis = getAlignmentAxis(placement);
  const alignLength = getAxisLength(alignmentAxis);
  const side = getSide(placement);
  const isVertical = sideAxis === "y";
  const commonX = reference.x + reference.width / 2 - floating.width / 2;
  const commonY = reference.y + reference.height / 2 - floating.height / 2;
  const commonAlign = reference[alignLength] / 2 - floating[alignLength] / 2;
  let coords;
  switch (side) {
    case "top":
      coords = {
        x: commonX,
        y: reference.y - floating.height
      };
      break;
    case "bottom":
      coords = {
        x: commonX,
        y: reference.y + reference.height
      };
      break;
    case "right":
      coords = {
        x: reference.x + reference.width,
        y: commonY
      };
      break;
    case "left":
      coords = {
        x: reference.x - floating.width,
        y: commonY
      };
      break;
    default:
      coords = {
        x: reference.x,
        y: reference.y
      };
  }
  switch (getAlignment(placement)) {
    case "start":
      coords[alignmentAxis] -= commonAlign * (rtl && isVertical ? -1 : 1);
      break;
    case "end":
      coords[alignmentAxis] += commonAlign * (rtl && isVertical ? -1 : 1);
      break;
  }
  return coords;
}
async function detectOverflow(state, options) {
  var _await$platform$isEle;
  if (options === void 0) {
    options = {};
  }
  const {
    x,
    y,
    platform: platform2,
    rects,
    elements,
    strategy
  } = state;
  const {
    boundary = "clippingAncestors",
    rootBoundary = "viewport",
    elementContext = "floating",
    altBoundary = false,
    padding = 0
  } = evaluate(options, state);
  const paddingObject = getPaddingObject(padding);
  const altContext = elementContext === "floating" ? "reference" : "floating";
  const element = elements[altBoundary ? altContext : elementContext];
  const clippingClientRect = rectToClientRect(await platform2.getClippingRect({
    element: ((_await$platform$isEle = await (platform2.isElement == null ? void 0 : platform2.isElement(element))) != null ? _await$platform$isEle : true) ? element : element.contextElement || await (platform2.getDocumentElement == null ? void 0 : platform2.getDocumentElement(elements.floating)),
    boundary,
    rootBoundary,
    strategy
  }));
  const rect = elementContext === "floating" ? {
    x,
    y,
    width: rects.floating.width,
    height: rects.floating.height
  } : rects.reference;
  const offsetParent = await (platform2.getOffsetParent == null ? void 0 : platform2.getOffsetParent(elements.floating));
  const offsetScale = await (platform2.isElement == null ? void 0 : platform2.isElement(offsetParent)) ? await (platform2.getScale == null ? void 0 : platform2.getScale(offsetParent)) || {
    x: 1,
    y: 1
  } : {
    x: 1,
    y: 1
  };
  const elementClientRect = rectToClientRect(platform2.convertOffsetParentRelativeRectToViewportRelativeRect ? await platform2.convertOffsetParentRelativeRectToViewportRelativeRect({
    elements,
    rect,
    offsetParent,
    strategy
  }) : rect);
  return {
    top: (clippingClientRect.top - elementClientRect.top + paddingObject.top) / offsetScale.y,
    bottom: (elementClientRect.bottom - clippingClientRect.bottom + paddingObject.bottom) / offsetScale.y,
    left: (clippingClientRect.left - elementClientRect.left + paddingObject.left) / offsetScale.x,
    right: (elementClientRect.right - clippingClientRect.right + paddingObject.right) / offsetScale.x
  };
}
const MAX_RESET_COUNT = 50;
const computePosition$1 = async (reference, floating, config) => {
  const {
    placement = "bottom",
    strategy = "absolute",
    middleware = [],
    platform: platform2
  } = config;
  const platformWithDetectOverflow = platform2.detectOverflow ? platform2 : {
    ...platform2,
    detectOverflow
  };
  const rtl = await (platform2.isRTL == null ? void 0 : platform2.isRTL(floating));
  let rects = await platform2.getElementRects({
    reference,
    floating,
    strategy
  });
  let {
    x,
    y
  } = computeCoordsFromPlacement(rects, placement, rtl);
  let statefulPlacement = placement;
  let resetCount = 0;
  const middlewareData = {};
  for (let i = 0; i < middleware.length; i++) {
    const currentMiddleware = middleware[i];
    if (!currentMiddleware) {
      continue;
    }
    const {
      name,
      fn
    } = currentMiddleware;
    const {
      x: nextX,
      y: nextY,
      data,
      reset
    } = await fn({
      x,
      y,
      initialPlacement: placement,
      placement: statefulPlacement,
      strategy,
      middlewareData,
      rects,
      platform: platformWithDetectOverflow,
      elements: {
        reference,
        floating
      }
    });
    x = nextX != null ? nextX : x;
    y = nextY != null ? nextY : y;
    middlewareData[name] = {
      ...middlewareData[name],
      ...data
    };
    if (reset && resetCount < MAX_RESET_COUNT) {
      resetCount++;
      if (typeof reset === "object") {
        if (reset.placement) {
          statefulPlacement = reset.placement;
        }
        if (reset.rects) {
          rects = reset.rects === true ? await platform2.getElementRects({
            reference,
            floating,
            strategy
          }) : reset.rects;
        }
        ({
          x,
          y
        } = computeCoordsFromPlacement(rects, statefulPlacement, rtl));
      }
      i = -1;
    }
  }
  return {
    x,
    y,
    placement: statefulPlacement,
    strategy,
    middlewareData
  };
};
const arrow$3 = (options) => ({
  name: "arrow",
  options,
  async fn(state) {
    const {
      x,
      y,
      placement,
      rects,
      platform: platform2,
      elements,
      middlewareData
    } = state;
    const {
      element,
      padding = 0
    } = evaluate(options, state) || {};
    if (element == null) {
      return {};
    }
    const paddingObject = getPaddingObject(padding);
    const coords = {
      x,
      y
    };
    const axis = getAlignmentAxis(placement);
    const length = getAxisLength(axis);
    const arrowDimensions = await platform2.getDimensions(element);
    const isYAxis = axis === "y";
    const minProp = isYAxis ? "top" : "left";
    const maxProp = isYAxis ? "bottom" : "right";
    const clientProp = isYAxis ? "clientHeight" : "clientWidth";
    const endDiff = rects.reference[length] + rects.reference[axis] - coords[axis] - rects.floating[length];
    const startDiff = coords[axis] - rects.reference[axis];
    const arrowOffsetParent = await (platform2.getOffsetParent == null ? void 0 : platform2.getOffsetParent(element));
    let clientSize = arrowOffsetParent ? arrowOffsetParent[clientProp] : 0;
    if (!clientSize || !await (platform2.isElement == null ? void 0 : platform2.isElement(arrowOffsetParent))) {
      clientSize = elements.floating[clientProp] || rects.floating[length];
    }
    const centerToReference = endDiff / 2 - startDiff / 2;
    const largestPossiblePadding = clientSize / 2 - arrowDimensions[length] / 2 - 1;
    const minPadding = min(paddingObject[minProp], largestPossiblePadding);
    const maxPadding = min(paddingObject[maxProp], largestPossiblePadding);
    const min$1 = minPadding;
    const max2 = clientSize - arrowDimensions[length] - maxPadding;
    const center = clientSize / 2 - arrowDimensions[length] / 2 + centerToReference;
    const offset2 = clamp(min$1, center, max2);
    const shouldAddOffset = !middlewareData.arrow && getAlignment(placement) != null && center !== offset2 && rects.reference[length] / 2 - (center < min$1 ? minPadding : maxPadding) - arrowDimensions[length] / 2 < 0;
    const alignmentOffset = shouldAddOffset ? center < min$1 ? center - min$1 : center - max2 : 0;
    return {
      [axis]: coords[axis] + alignmentOffset,
      data: {
        [axis]: offset2,
        centerOffset: center - offset2 - alignmentOffset,
        ...shouldAddOffset && {
          alignmentOffset
        }
      },
      reset: shouldAddOffset
    };
  }
});
const flip$2 = function(options) {
  if (options === void 0) {
    options = {};
  }
  return {
    name: "flip",
    options,
    async fn(state) {
      var _middlewareData$arrow, _middlewareData$flip;
      const {
        placement,
        middlewareData,
        rects,
        initialPlacement,
        platform: platform2,
        elements
      } = state;
      const {
        mainAxis: checkMainAxis = true,
        crossAxis: checkCrossAxis = true,
        fallbackPlacements: specifiedFallbackPlacements,
        fallbackStrategy = "bestFit",
        fallbackAxisSideDirection = "none",
        flipAlignment = true,
        ...detectOverflowOptions
      } = evaluate(options, state);
      if ((_middlewareData$arrow = middlewareData.arrow) != null && _middlewareData$arrow.alignmentOffset) {
        return {};
      }
      const side = getSide(placement);
      const initialSideAxis = getSideAxis(initialPlacement);
      const isBasePlacement = getSide(initialPlacement) === initialPlacement;
      const rtl = await (platform2.isRTL == null ? void 0 : platform2.isRTL(elements.floating));
      const fallbackPlacements = specifiedFallbackPlacements || (isBasePlacement || !flipAlignment ? [getOppositePlacement(initialPlacement)] : getExpandedPlacements(initialPlacement));
      const hasFallbackAxisSideDirection = fallbackAxisSideDirection !== "none";
      if (!specifiedFallbackPlacements && hasFallbackAxisSideDirection) {
        fallbackPlacements.push(...getOppositeAxisPlacements(initialPlacement, flipAlignment, fallbackAxisSideDirection, rtl));
      }
      const placements = [initialPlacement, ...fallbackPlacements];
      const overflow = await platform2.detectOverflow(state, detectOverflowOptions);
      const overflows = [];
      let overflowsData = ((_middlewareData$flip = middlewareData.flip) == null ? void 0 : _middlewareData$flip.overflows) || [];
      if (checkMainAxis) {
        overflows.push(overflow[side]);
      }
      if (checkCrossAxis) {
        const sides2 = getAlignmentSides(placement, rects, rtl);
        overflows.push(overflow[sides2[0]], overflow[sides2[1]]);
      }
      overflowsData = [...overflowsData, {
        placement,
        overflows
      }];
      if (!overflows.every((side2) => side2 <= 0)) {
        var _middlewareData$flip2, _overflowsData$filter;
        const nextIndex = (((_middlewareData$flip2 = middlewareData.flip) == null ? void 0 : _middlewareData$flip2.index) || 0) + 1;
        const nextPlacement = placements[nextIndex];
        if (nextPlacement) {
          const ignoreCrossAxisOverflow = checkCrossAxis === "alignment" ? initialSideAxis !== getSideAxis(nextPlacement) : false;
          if (!ignoreCrossAxisOverflow || // We leave the current main axis only if every placement on that axis
          // overflows the main axis.
          overflowsData.every((d) => getSideAxis(d.placement) === initialSideAxis ? d.overflows[0] > 0 : true)) {
            return {
              data: {
                index: nextIndex,
                overflows: overflowsData
              },
              reset: {
                placement: nextPlacement
              }
            };
          }
        }
        let resetPlacement = (_overflowsData$filter = overflowsData.filter((d) => d.overflows[0] <= 0).sort((a, b) => a.overflows[1] - b.overflows[1])[0]) == null ? void 0 : _overflowsData$filter.placement;
        if (!resetPlacement) {
          switch (fallbackStrategy) {
            case "bestFit": {
              var _overflowsData$filter2;
              const placement2 = (_overflowsData$filter2 = overflowsData.filter((d) => {
                if (hasFallbackAxisSideDirection) {
                  const currentSideAxis = getSideAxis(d.placement);
                  return currentSideAxis === initialSideAxis || // Create a bias to the `y` side axis due to horizontal
                  // reading directions favoring greater width.
                  currentSideAxis === "y";
                }
                return true;
              }).map((d) => [d.placement, d.overflows.filter((overflow2) => overflow2 > 0).reduce((acc, overflow2) => acc + overflow2, 0)]).sort((a, b) => a[1] - b[1])[0]) == null ? void 0 : _overflowsData$filter2[0];
              if (placement2) {
                resetPlacement = placement2;
              }
              break;
            }
            case "initialPlacement":
              resetPlacement = initialPlacement;
              break;
          }
        }
        if (placement !== resetPlacement) {
          return {
            reset: {
              placement: resetPlacement
            }
          };
        }
      }
      return {};
    }
  };
};
function getSideOffsets(overflow, rect) {
  return {
    top: overflow.top - rect.height,
    right: overflow.right - rect.width,
    bottom: overflow.bottom - rect.height,
    left: overflow.left - rect.width
  };
}
function isAnySideFullyClipped(overflow) {
  return sides.some((side) => overflow[side] >= 0);
}
const hide$2 = function(options) {
  if (options === void 0) {
    options = {};
  }
  return {
    name: "hide",
    options,
    async fn(state) {
      const {
        rects,
        platform: platform2
      } = state;
      const {
        strategy = "referenceHidden",
        ...detectOverflowOptions
      } = evaluate(options, state);
      switch (strategy) {
        case "referenceHidden": {
          const overflow = await platform2.detectOverflow(state, {
            ...detectOverflowOptions,
            elementContext: "reference"
          });
          const offsets = getSideOffsets(overflow, rects.reference);
          return {
            data: {
              referenceHiddenOffsets: offsets,
              referenceHidden: isAnySideFullyClipped(offsets)
            }
          };
        }
        case "escaped": {
          const overflow = await platform2.detectOverflow(state, {
            ...detectOverflowOptions,
            altBoundary: true
          });
          const offsets = getSideOffsets(overflow, rects.floating);
          return {
            data: {
              escapedOffsets: offsets,
              escaped: isAnySideFullyClipped(offsets)
            }
          };
        }
        default: {
          return {};
        }
      }
    }
  };
};
const originSides = /* @__PURE__ */ new Set(["left", "top"]);
async function convertValueToCoords(state, options) {
  const {
    placement,
    platform: platform2,
    elements
  } = state;
  const rtl = await (platform2.isRTL == null ? void 0 : platform2.isRTL(elements.floating));
  const side = getSide(placement);
  const alignment = getAlignment(placement);
  const isVertical = getSideAxis(placement) === "y";
  const mainAxisMulti = originSides.has(side) ? -1 : 1;
  const crossAxisMulti = rtl && isVertical ? -1 : 1;
  const rawValue = evaluate(options, state);
  let {
    mainAxis,
    crossAxis,
    alignmentAxis
  } = typeof rawValue === "number" ? {
    mainAxis: rawValue,
    crossAxis: 0,
    alignmentAxis: null
  } : {
    mainAxis: rawValue.mainAxis || 0,
    crossAxis: rawValue.crossAxis || 0,
    alignmentAxis: rawValue.alignmentAxis
  };
  if (alignment && typeof alignmentAxis === "number") {
    crossAxis = alignment === "end" ? alignmentAxis * -1 : alignmentAxis;
  }
  return isVertical ? {
    x: crossAxis * crossAxisMulti,
    y: mainAxis * mainAxisMulti
  } : {
    x: mainAxis * mainAxisMulti,
    y: crossAxis * crossAxisMulti
  };
}
const offset$2 = function(options) {
  if (options === void 0) {
    options = 0;
  }
  return {
    name: "offset",
    options,
    async fn(state) {
      var _middlewareData$offse, _middlewareData$arrow;
      const {
        x,
        y,
        placement,
        middlewareData
      } = state;
      const diffCoords = await convertValueToCoords(state, options);
      if (placement === ((_middlewareData$offse = middlewareData.offset) == null ? void 0 : _middlewareData$offse.placement) && (_middlewareData$arrow = middlewareData.arrow) != null && _middlewareData$arrow.alignmentOffset) {
        return {};
      }
      return {
        x: x + diffCoords.x,
        y: y + diffCoords.y,
        data: {
          ...diffCoords,
          placement
        }
      };
    }
  };
};
const shift$2 = function(options) {
  if (options === void 0) {
    options = {};
  }
  return {
    name: "shift",
    options,
    async fn(state) {
      const {
        x,
        y,
        placement,
        platform: platform2
      } = state;
      const {
        mainAxis: checkMainAxis = true,
        crossAxis: checkCrossAxis = false,
        limiter = {
          fn: (_ref) => {
            let {
              x: x2,
              y: y2
            } = _ref;
            return {
              x: x2,
              y: y2
            };
          }
        },
        ...detectOverflowOptions
      } = evaluate(options, state);
      const coords = {
        x,
        y
      };
      const overflow = await platform2.detectOverflow(state, detectOverflowOptions);
      const crossAxis = getSideAxis(getSide(placement));
      const mainAxis = getOppositeAxis(crossAxis);
      let mainAxisCoord = coords[mainAxis];
      let crossAxisCoord = coords[crossAxis];
      if (checkMainAxis) {
        const minSide = mainAxis === "y" ? "top" : "left";
        const maxSide = mainAxis === "y" ? "bottom" : "right";
        const min2 = mainAxisCoord + overflow[minSide];
        const max2 = mainAxisCoord - overflow[maxSide];
        mainAxisCoord = clamp(min2, mainAxisCoord, max2);
      }
      if (checkCrossAxis) {
        const minSide = crossAxis === "y" ? "top" : "left";
        const maxSide = crossAxis === "y" ? "bottom" : "right";
        const min2 = crossAxisCoord + overflow[minSide];
        const max2 = crossAxisCoord - overflow[maxSide];
        crossAxisCoord = clamp(min2, crossAxisCoord, max2);
      }
      const limitedCoords = limiter.fn({
        ...state,
        [mainAxis]: mainAxisCoord,
        [crossAxis]: crossAxisCoord
      });
      return {
        ...limitedCoords,
        data: {
          x: limitedCoords.x - x,
          y: limitedCoords.y - y,
          enabled: {
            [mainAxis]: checkMainAxis,
            [crossAxis]: checkCrossAxis
          }
        }
      };
    }
  };
};
const limitShift$2 = function(options) {
  if (options === void 0) {
    options = {};
  }
  return {
    options,
    fn(state) {
      const {
        x,
        y,
        placement,
        rects,
        middlewareData
      } = state;
      const {
        offset: offset2 = 0,
        mainAxis: checkMainAxis = true,
        crossAxis: checkCrossAxis = true
      } = evaluate(options, state);
      const coords = {
        x,
        y
      };
      const crossAxis = getSideAxis(placement);
      const mainAxis = getOppositeAxis(crossAxis);
      let mainAxisCoord = coords[mainAxis];
      let crossAxisCoord = coords[crossAxis];
      const rawOffset = evaluate(offset2, state);
      const computedOffset = typeof rawOffset === "number" ? {
        mainAxis: rawOffset,
        crossAxis: 0
      } : {
        mainAxis: 0,
        crossAxis: 0,
        ...rawOffset
      };
      if (checkMainAxis) {
        const len = mainAxis === "y" ? "height" : "width";
        const limitMin = rects.reference[mainAxis] - rects.floating[len] + computedOffset.mainAxis;
        const limitMax = rects.reference[mainAxis] + rects.reference[len] - computedOffset.mainAxis;
        if (mainAxisCoord < limitMin) {
          mainAxisCoord = limitMin;
        } else if (mainAxisCoord > limitMax) {
          mainAxisCoord = limitMax;
        }
      }
      if (checkCrossAxis) {
        var _middlewareData$offse, _middlewareData$offse2;
        const len = mainAxis === "y" ? "width" : "height";
        const isOriginSide = originSides.has(getSide(placement));
        const limitMin = rects.reference[crossAxis] - rects.floating[len] + (isOriginSide ? ((_middlewareData$offse = middlewareData.offset) == null ? void 0 : _middlewareData$offse[crossAxis]) || 0 : 0) + (isOriginSide ? 0 : computedOffset.crossAxis);
        const limitMax = rects.reference[crossAxis] + rects.reference[len] + (isOriginSide ? 0 : ((_middlewareData$offse2 = middlewareData.offset) == null ? void 0 : _middlewareData$offse2[crossAxis]) || 0) - (isOriginSide ? computedOffset.crossAxis : 0);
        if (crossAxisCoord < limitMin) {
          crossAxisCoord = limitMin;
        } else if (crossAxisCoord > limitMax) {
          crossAxisCoord = limitMax;
        }
      }
      return {
        [mainAxis]: mainAxisCoord,
        [crossAxis]: crossAxisCoord
      };
    }
  };
};
const size$2 = function(options) {
  if (options === void 0) {
    options = {};
  }
  return {
    name: "size",
    options,
    async fn(state) {
      var _state$middlewareData, _state$middlewareData2;
      const {
        placement,
        rects,
        platform: platform2,
        elements
      } = state;
      const {
        apply = () => {
        },
        ...detectOverflowOptions
      } = evaluate(options, state);
      const overflow = await platform2.detectOverflow(state, detectOverflowOptions);
      const side = getSide(placement);
      const alignment = getAlignment(placement);
      const isYAxis = getSideAxis(placement) === "y";
      const {
        width,
        height
      } = rects.floating;
      let heightSide;
      let widthSide;
      if (side === "top" || side === "bottom") {
        heightSide = side;
        widthSide = alignment === (await (platform2.isRTL == null ? void 0 : platform2.isRTL(elements.floating)) ? "start" : "end") ? "left" : "right";
      } else {
        widthSide = side;
        heightSide = alignment === "end" ? "top" : "bottom";
      }
      const maximumClippingHeight = height - overflow.top - overflow.bottom;
      const maximumClippingWidth = width - overflow.left - overflow.right;
      const overflowAvailableHeight = min(height - overflow[heightSide], maximumClippingHeight);
      const overflowAvailableWidth = min(width - overflow[widthSide], maximumClippingWidth);
      const noShift = !state.middlewareData.shift;
      let availableHeight = overflowAvailableHeight;
      let availableWidth = overflowAvailableWidth;
      if ((_state$middlewareData = state.middlewareData.shift) != null && _state$middlewareData.enabled.x) {
        availableWidth = maximumClippingWidth;
      }
      if ((_state$middlewareData2 = state.middlewareData.shift) != null && _state$middlewareData2.enabled.y) {
        availableHeight = maximumClippingHeight;
      }
      if (noShift && !alignment) {
        const xMin = max(overflow.left, 0);
        const xMax = max(overflow.right, 0);
        const yMin = max(overflow.top, 0);
        const yMax = max(overflow.bottom, 0);
        if (isYAxis) {
          availableWidth = width - 2 * (xMin !== 0 || xMax !== 0 ? xMin + xMax : max(overflow.left, overflow.right));
        } else {
          availableHeight = height - 2 * (yMin !== 0 || yMax !== 0 ? yMin + yMax : max(overflow.top, overflow.bottom));
        }
      }
      await apply({
        ...state,
        availableWidth,
        availableHeight
      });
      const nextDimensions = await platform2.getDimensions(elements.floating);
      if (width !== nextDimensions.width || height !== nextDimensions.height) {
        return {
          reset: {
            rects: true
          }
        };
      }
      return {};
    }
  };
};
function hasWindow() {
  return typeof window !== "undefined";
}
function getNodeName(node) {
  if (isNode(node)) {
    return (node.nodeName || "").toLowerCase();
  }
  return "#document";
}
function getWindow(node) {
  var _node$ownerDocument;
  return (node == null || (_node$ownerDocument = node.ownerDocument) == null ? void 0 : _node$ownerDocument.defaultView) || window;
}
function getDocumentElement(node) {
  var _ref;
  return (_ref = (isNode(node) ? node.ownerDocument : node.document) || window.document) == null ? void 0 : _ref.documentElement;
}
function isNode(value) {
  if (!hasWindow()) {
    return false;
  }
  return value instanceof Node || value instanceof getWindow(value).Node;
}
function isElement(value) {
  if (!hasWindow()) {
    return false;
  }
  return value instanceof Element || value instanceof getWindow(value).Element;
}
function isHTMLElement(value) {
  if (!hasWindow()) {
    return false;
  }
  return value instanceof HTMLElement || value instanceof getWindow(value).HTMLElement;
}
function isShadowRoot(value) {
  if (!hasWindow() || typeof ShadowRoot === "undefined") {
    return false;
  }
  return value instanceof ShadowRoot || value instanceof getWindow(value).ShadowRoot;
}
function isOverflowElement(element) {
  const {
    overflow,
    overflowX,
    overflowY,
    display
  } = getComputedStyle$1(element);
  return /auto|scroll|overlay|hidden|clip/.test(overflow + overflowY + overflowX) && display !== "inline" && display !== "contents";
}
function isTableElement(element) {
  return /^(table|td|th)$/.test(getNodeName(element));
}
function isTopLayer(element) {
  try {
    if (element.matches(":popover-open")) {
      return true;
    }
  } catch (_e) {
  }
  try {
    return element.matches(":modal");
  } catch (_e) {
    return false;
  }
}
const willChangeRe = /transform|translate|scale|rotate|perspective|filter/;
const containRe = /paint|layout|strict|content/;
const isNotNone = (value) => !!value && value !== "none";
let isWebKitValue;
function isContainingBlock(elementOrCss) {
  const css = isElement(elementOrCss) ? getComputedStyle$1(elementOrCss) : elementOrCss;
  return isNotNone(css.transform) || isNotNone(css.translate) || isNotNone(css.scale) || isNotNone(css.rotate) || isNotNone(css.perspective) || !isWebKit() && (isNotNone(css.backdropFilter) || isNotNone(css.filter)) || willChangeRe.test(css.willChange || "") || containRe.test(css.contain || "");
}
function getContainingBlock(element) {
  let currentNode = getParentNode(element);
  while (isHTMLElement(currentNode) && !isLastTraversableNode(currentNode)) {
    if (isContainingBlock(currentNode)) {
      return currentNode;
    } else if (isTopLayer(currentNode)) {
      return null;
    }
    currentNode = getParentNode(currentNode);
  }
  return null;
}
function isWebKit() {
  if (isWebKitValue == null) {
    isWebKitValue = typeof CSS !== "undefined" && CSS.supports && CSS.supports("-webkit-backdrop-filter", "none");
  }
  return isWebKitValue;
}
function isLastTraversableNode(node) {
  return /^(html|body|#document)$/.test(getNodeName(node));
}
function getComputedStyle$1(element) {
  return getWindow(element).getComputedStyle(element);
}
function getNodeScroll(element) {
  if (isElement(element)) {
    return {
      scrollLeft: element.scrollLeft,
      scrollTop: element.scrollTop
    };
  }
  return {
    scrollLeft: element.scrollX,
    scrollTop: element.scrollY
  };
}
function getParentNode(node) {
  if (getNodeName(node) === "html") {
    return node;
  }
  const result = (
    // Step into the shadow DOM of the parent of a slotted node.
    node.assignedSlot || // DOM Element detected.
    node.parentNode || // ShadowRoot detected.
    isShadowRoot(node) && node.host || // Fallback.
    getDocumentElement(node)
  );
  return isShadowRoot(result) ? result.host : result;
}
function getNearestOverflowAncestor(node) {
  const parentNode = getParentNode(node);
  if (isLastTraversableNode(parentNode)) {
    return node.ownerDocument ? node.ownerDocument.body : node.body;
  }
  if (isHTMLElement(parentNode) && isOverflowElement(parentNode)) {
    return parentNode;
  }
  return getNearestOverflowAncestor(parentNode);
}
function getOverflowAncestors(node, list, traverseIframes) {
  var _node$ownerDocument2;
  if (list === void 0) {
    list = [];
  }
  if (traverseIframes === void 0) {
    traverseIframes = true;
  }
  const scrollableAncestor = getNearestOverflowAncestor(node);
  const isBody = scrollableAncestor === ((_node$ownerDocument2 = node.ownerDocument) == null ? void 0 : _node$ownerDocument2.body);
  const win = getWindow(scrollableAncestor);
  if (isBody) {
    const frameElement = getFrameElement(win);
    return list.concat(win, win.visualViewport || [], isOverflowElement(scrollableAncestor) ? scrollableAncestor : [], frameElement && traverseIframes ? getOverflowAncestors(frameElement) : []);
  } else {
    return list.concat(scrollableAncestor, getOverflowAncestors(scrollableAncestor, [], traverseIframes));
  }
}
function getFrameElement(win) {
  return win.parent && Object.getPrototypeOf(win.parent) ? win.frameElement : null;
}
function getCssDimensions(element) {
  const css = getComputedStyle$1(element);
  let width = parseFloat(css.width) || 0;
  let height = parseFloat(css.height) || 0;
  const hasOffset = isHTMLElement(element);
  const offsetWidth = hasOffset ? element.offsetWidth : width;
  const offsetHeight = hasOffset ? element.offsetHeight : height;
  const shouldFallback = round(width) !== offsetWidth || round(height) !== offsetHeight;
  if (shouldFallback) {
    width = offsetWidth;
    height = offsetHeight;
  }
  return {
    width,
    height,
    $: shouldFallback
  };
}
function unwrapElement(element) {
  return !isElement(element) ? element.contextElement : element;
}
function getScale(element) {
  const domElement = unwrapElement(element);
  if (!isHTMLElement(domElement)) {
    return createCoords(1);
  }
  const rect = domElement.getBoundingClientRect();
  const {
    width,
    height,
    $
  } = getCssDimensions(domElement);
  let x = ($ ? round(rect.width) : rect.width) / width;
  let y = ($ ? round(rect.height) : rect.height) / height;
  if (!x || !Number.isFinite(x)) {
    x = 1;
  }
  if (!y || !Number.isFinite(y)) {
    y = 1;
  }
  return {
    x,
    y
  };
}
const noOffsets = /* @__PURE__ */ createCoords(0);
function getVisualOffsets(element) {
  const win = getWindow(element);
  if (!isWebKit() || !win.visualViewport) {
    return noOffsets;
  }
  return {
    x: win.visualViewport.offsetLeft,
    y: win.visualViewport.offsetTop
  };
}
function shouldAddVisualOffsets(element, isFixed, floatingOffsetParent) {
  if (isFixed === void 0) {
    isFixed = false;
  }
  if (!floatingOffsetParent || isFixed && floatingOffsetParent !== getWindow(element)) {
    return false;
  }
  return isFixed;
}
function getBoundingClientRect(element, includeScale, isFixedStrategy, offsetParent) {
  if (includeScale === void 0) {
    includeScale = false;
  }
  if (isFixedStrategy === void 0) {
    isFixedStrategy = false;
  }
  const clientRect = element.getBoundingClientRect();
  const domElement = unwrapElement(element);
  let scale = createCoords(1);
  if (includeScale) {
    if (offsetParent) {
      if (isElement(offsetParent)) {
        scale = getScale(offsetParent);
      }
    } else {
      scale = getScale(element);
    }
  }
  const visualOffsets = shouldAddVisualOffsets(domElement, isFixedStrategy, offsetParent) ? getVisualOffsets(domElement) : createCoords(0);
  let x = (clientRect.left + visualOffsets.x) / scale.x;
  let y = (clientRect.top + visualOffsets.y) / scale.y;
  let width = clientRect.width / scale.x;
  let height = clientRect.height / scale.y;
  if (domElement) {
    const win = getWindow(domElement);
    const offsetWin = offsetParent && isElement(offsetParent) ? getWindow(offsetParent) : offsetParent;
    let currentWin = win;
    let currentIFrame = getFrameElement(currentWin);
    while (currentIFrame && offsetParent && offsetWin !== currentWin) {
      const iframeScale = getScale(currentIFrame);
      const iframeRect = currentIFrame.getBoundingClientRect();
      const css = getComputedStyle$1(currentIFrame);
      const left = iframeRect.left + (currentIFrame.clientLeft + parseFloat(css.paddingLeft)) * iframeScale.x;
      const top = iframeRect.top + (currentIFrame.clientTop + parseFloat(css.paddingTop)) * iframeScale.y;
      x *= iframeScale.x;
      y *= iframeScale.y;
      width *= iframeScale.x;
      height *= iframeScale.y;
      x += left;
      y += top;
      currentWin = getWindow(currentIFrame);
      currentIFrame = getFrameElement(currentWin);
    }
  }
  return rectToClientRect({
    width,
    height,
    x,
    y
  });
}
function getWindowScrollBarX(element, rect) {
  const leftScroll = getNodeScroll(element).scrollLeft;
  if (!rect) {
    return getBoundingClientRect(getDocumentElement(element)).left + leftScroll;
  }
  return rect.left + leftScroll;
}
function getHTMLOffset(documentElement, scroll) {
  const htmlRect = documentElement.getBoundingClientRect();
  const x = htmlRect.left + scroll.scrollLeft - getWindowScrollBarX(documentElement, htmlRect);
  const y = htmlRect.top + scroll.scrollTop;
  return {
    x,
    y
  };
}
function convertOffsetParentRelativeRectToViewportRelativeRect(_ref) {
  let {
    elements,
    rect,
    offsetParent,
    strategy
  } = _ref;
  const isFixed = strategy === "fixed";
  const documentElement = getDocumentElement(offsetParent);
  const topLayer = elements ? isTopLayer(elements.floating) : false;
  if (offsetParent === documentElement || topLayer && isFixed) {
    return rect;
  }
  let scroll = {
    scrollLeft: 0,
    scrollTop: 0
  };
  let scale = createCoords(1);
  const offsets = createCoords(0);
  const isOffsetParentAnElement = isHTMLElement(offsetParent);
  if (isOffsetParentAnElement || !isOffsetParentAnElement && !isFixed) {
    if (getNodeName(offsetParent) !== "body" || isOverflowElement(documentElement)) {
      scroll = getNodeScroll(offsetParent);
    }
    if (isOffsetParentAnElement) {
      const offsetRect = getBoundingClientRect(offsetParent);
      scale = getScale(offsetParent);
      offsets.x = offsetRect.x + offsetParent.clientLeft;
      offsets.y = offsetRect.y + offsetParent.clientTop;
    }
  }
  const htmlOffset = documentElement && !isOffsetParentAnElement && !isFixed ? getHTMLOffset(documentElement, scroll) : createCoords(0);
  return {
    width: rect.width * scale.x,
    height: rect.height * scale.y,
    x: rect.x * scale.x - scroll.scrollLeft * scale.x + offsets.x + htmlOffset.x,
    y: rect.y * scale.y - scroll.scrollTop * scale.y + offsets.y + htmlOffset.y
  };
}
function getClientRects(element) {
  return Array.from(element.getClientRects());
}
function getDocumentRect(element) {
  const html = getDocumentElement(element);
  const scroll = getNodeScroll(element);
  const body = element.ownerDocument.body;
  const width = max(html.scrollWidth, html.clientWidth, body.scrollWidth, body.clientWidth);
  const height = max(html.scrollHeight, html.clientHeight, body.scrollHeight, body.clientHeight);
  let x = -scroll.scrollLeft + getWindowScrollBarX(element);
  const y = -scroll.scrollTop;
  if (getComputedStyle$1(body).direction === "rtl") {
    x += max(html.clientWidth, body.clientWidth) - width;
  }
  return {
    width,
    height,
    x,
    y
  };
}
const SCROLLBAR_MAX = 25;
function getViewportRect(element, strategy) {
  const win = getWindow(element);
  const html = getDocumentElement(element);
  const visualViewport = win.visualViewport;
  let width = html.clientWidth;
  let height = html.clientHeight;
  let x = 0;
  let y = 0;
  if (visualViewport) {
    width = visualViewport.width;
    height = visualViewport.height;
    const visualViewportBased = isWebKit();
    if (!visualViewportBased || visualViewportBased && strategy === "fixed") {
      x = visualViewport.offsetLeft;
      y = visualViewport.offsetTop;
    }
  }
  const windowScrollbarX = getWindowScrollBarX(html);
  if (windowScrollbarX <= 0) {
    const doc = html.ownerDocument;
    const body = doc.body;
    const bodyStyles = getComputedStyle(body);
    const bodyMarginInline = doc.compatMode === "CSS1Compat" ? parseFloat(bodyStyles.marginLeft) + parseFloat(bodyStyles.marginRight) || 0 : 0;
    const clippingStableScrollbarWidth = Math.abs(html.clientWidth - body.clientWidth - bodyMarginInline);
    if (clippingStableScrollbarWidth <= SCROLLBAR_MAX) {
      width -= clippingStableScrollbarWidth;
    }
  } else if (windowScrollbarX <= SCROLLBAR_MAX) {
    width += windowScrollbarX;
  }
  return {
    width,
    height,
    x,
    y
  };
}
function getInnerBoundingClientRect(element, strategy) {
  const clientRect = getBoundingClientRect(element, true, strategy === "fixed");
  const top = clientRect.top + element.clientTop;
  const left = clientRect.left + element.clientLeft;
  const scale = isHTMLElement(element) ? getScale(element) : createCoords(1);
  const width = element.clientWidth * scale.x;
  const height = element.clientHeight * scale.y;
  const x = left * scale.x;
  const y = top * scale.y;
  return {
    width,
    height,
    x,
    y
  };
}
function getClientRectFromClippingAncestor(element, clippingAncestor, strategy) {
  let rect;
  if (clippingAncestor === "viewport") {
    rect = getViewportRect(element, strategy);
  } else if (clippingAncestor === "document") {
    rect = getDocumentRect(getDocumentElement(element));
  } else if (isElement(clippingAncestor)) {
    rect = getInnerBoundingClientRect(clippingAncestor, strategy);
  } else {
    const visualOffsets = getVisualOffsets(element);
    rect = {
      x: clippingAncestor.x - visualOffsets.x,
      y: clippingAncestor.y - visualOffsets.y,
      width: clippingAncestor.width,
      height: clippingAncestor.height
    };
  }
  return rectToClientRect(rect);
}
function hasFixedPositionAncestor(element, stopNode) {
  const parentNode = getParentNode(element);
  if (parentNode === stopNode || !isElement(parentNode) || isLastTraversableNode(parentNode)) {
    return false;
  }
  return getComputedStyle$1(parentNode).position === "fixed" || hasFixedPositionAncestor(parentNode, stopNode);
}
function getClippingElementAncestors(element, cache) {
  const cachedResult = cache.get(element);
  if (cachedResult) {
    return cachedResult;
  }
  let result = getOverflowAncestors(element, [], false).filter((el) => isElement(el) && getNodeName(el) !== "body");
  let currentContainingBlockComputedStyle = null;
  const elementIsFixed = getComputedStyle$1(element).position === "fixed";
  let currentNode = elementIsFixed ? getParentNode(element) : element;
  while (isElement(currentNode) && !isLastTraversableNode(currentNode)) {
    const computedStyle = getComputedStyle$1(currentNode);
    const currentNodeIsContaining = isContainingBlock(currentNode);
    if (!currentNodeIsContaining && computedStyle.position === "fixed") {
      currentContainingBlockComputedStyle = null;
    }
    const shouldDropCurrentNode = elementIsFixed ? !currentNodeIsContaining && !currentContainingBlockComputedStyle : !currentNodeIsContaining && computedStyle.position === "static" && !!currentContainingBlockComputedStyle && (currentContainingBlockComputedStyle.position === "absolute" || currentContainingBlockComputedStyle.position === "fixed") || isOverflowElement(currentNode) && !currentNodeIsContaining && hasFixedPositionAncestor(element, currentNode);
    if (shouldDropCurrentNode) {
      result = result.filter((ancestor) => ancestor !== currentNode);
    } else {
      currentContainingBlockComputedStyle = computedStyle;
    }
    currentNode = getParentNode(currentNode);
  }
  cache.set(element, result);
  return result;
}
function getClippingRect(_ref) {
  let {
    element,
    boundary,
    rootBoundary,
    strategy
  } = _ref;
  const elementClippingAncestors = boundary === "clippingAncestors" ? isTopLayer(element) ? [] : getClippingElementAncestors(element, this._c) : [].concat(boundary);
  const clippingAncestors = [...elementClippingAncestors, rootBoundary];
  const firstRect = getClientRectFromClippingAncestor(element, clippingAncestors[0], strategy);
  let top = firstRect.top;
  let right = firstRect.right;
  let bottom = firstRect.bottom;
  let left = firstRect.left;
  for (let i = 1; i < clippingAncestors.length; i++) {
    const rect = getClientRectFromClippingAncestor(element, clippingAncestors[i], strategy);
    top = max(rect.top, top);
    right = min(rect.right, right);
    bottom = min(rect.bottom, bottom);
    left = max(rect.left, left);
  }
  return {
    width: right - left,
    height: bottom - top,
    x: left,
    y: top
  };
}
function getDimensions(element) {
  const {
    width,
    height
  } = getCssDimensions(element);
  return {
    width,
    height
  };
}
function getRectRelativeToOffsetParent(element, offsetParent, strategy) {
  const isOffsetParentAnElement = isHTMLElement(offsetParent);
  const documentElement = getDocumentElement(offsetParent);
  const isFixed = strategy === "fixed";
  const rect = getBoundingClientRect(element, true, isFixed, offsetParent);
  let scroll = {
    scrollLeft: 0,
    scrollTop: 0
  };
  const offsets = createCoords(0);
  function setLeftRTLScrollbarOffset() {
    offsets.x = getWindowScrollBarX(documentElement);
  }
  if (isOffsetParentAnElement || !isOffsetParentAnElement && !isFixed) {
    if (getNodeName(offsetParent) !== "body" || isOverflowElement(documentElement)) {
      scroll = getNodeScroll(offsetParent);
    }
    if (isOffsetParentAnElement) {
      const offsetRect = getBoundingClientRect(offsetParent, true, isFixed, offsetParent);
      offsets.x = offsetRect.x + offsetParent.clientLeft;
      offsets.y = offsetRect.y + offsetParent.clientTop;
    } else if (documentElement) {
      setLeftRTLScrollbarOffset();
    }
  }
  if (isFixed && !isOffsetParentAnElement && documentElement) {
    setLeftRTLScrollbarOffset();
  }
  const htmlOffset = documentElement && !isOffsetParentAnElement && !isFixed ? getHTMLOffset(documentElement, scroll) : createCoords(0);
  const x = rect.left + scroll.scrollLeft - offsets.x - htmlOffset.x;
  const y = rect.top + scroll.scrollTop - offsets.y - htmlOffset.y;
  return {
    x,
    y,
    width: rect.width,
    height: rect.height
  };
}
function isStaticPositioned(element) {
  return getComputedStyle$1(element).position === "static";
}
function getTrueOffsetParent(element, polyfill) {
  if (!isHTMLElement(element) || getComputedStyle$1(element).position === "fixed") {
    return null;
  }
  if (polyfill) {
    return polyfill(element);
  }
  let rawOffsetParent = element.offsetParent;
  if (getDocumentElement(element) === rawOffsetParent) {
    rawOffsetParent = rawOffsetParent.ownerDocument.body;
  }
  return rawOffsetParent;
}
function getOffsetParent(element, polyfill) {
  const win = getWindow(element);
  if (isTopLayer(element)) {
    return win;
  }
  if (!isHTMLElement(element)) {
    let svgOffsetParent = getParentNode(element);
    while (svgOffsetParent && !isLastTraversableNode(svgOffsetParent)) {
      if (isElement(svgOffsetParent) && !isStaticPositioned(svgOffsetParent)) {
        return svgOffsetParent;
      }
      svgOffsetParent = getParentNode(svgOffsetParent);
    }
    return win;
  }
  let offsetParent = getTrueOffsetParent(element, polyfill);
  while (offsetParent && isTableElement(offsetParent) && isStaticPositioned(offsetParent)) {
    offsetParent = getTrueOffsetParent(offsetParent, polyfill);
  }
  if (offsetParent && isLastTraversableNode(offsetParent) && isStaticPositioned(offsetParent) && !isContainingBlock(offsetParent)) {
    return win;
  }
  return offsetParent || getContainingBlock(element) || win;
}
const getElementRects = async function(data) {
  const getOffsetParentFn = this.getOffsetParent || getOffsetParent;
  const getDimensionsFn = this.getDimensions;
  const floatingDimensions = await getDimensionsFn(data.floating);
  return {
    reference: getRectRelativeToOffsetParent(data.reference, await getOffsetParentFn(data.floating), data.strategy),
    floating: {
      x: 0,
      y: 0,
      width: floatingDimensions.width,
      height: floatingDimensions.height
    }
  };
};
function isRTL(element) {
  return getComputedStyle$1(element).direction === "rtl";
}
const platform = {
  convertOffsetParentRelativeRectToViewportRelativeRect,
  getDocumentElement,
  getClippingRect,
  getOffsetParent,
  getElementRects,
  getClientRects,
  getDimensions,
  getScale,
  isElement,
  isRTL
};
function rectsAreEqual(a, b) {
  return a.x === b.x && a.y === b.y && a.width === b.width && a.height === b.height;
}
function observeMove(element, onMove) {
  let io = null;
  let timeoutId;
  const root = getDocumentElement(element);
  function cleanup() {
    var _io;
    clearTimeout(timeoutId);
    (_io = io) == null || _io.disconnect();
    io = null;
  }
  function refresh(skip, threshold) {
    if (skip === void 0) {
      skip = false;
    }
    if (threshold === void 0) {
      threshold = 1;
    }
    cleanup();
    const elementRectForRootMargin = element.getBoundingClientRect();
    const {
      left,
      top,
      width,
      height
    } = elementRectForRootMargin;
    if (!skip) {
      onMove();
    }
    if (!width || !height) {
      return;
    }
    const insetTop = floor(top);
    const insetRight = floor(root.clientWidth - (left + width));
    const insetBottom = floor(root.clientHeight - (top + height));
    const insetLeft = floor(left);
    const rootMargin = -insetTop + "px " + -insetRight + "px " + -insetBottom + "px " + -insetLeft + "px";
    const options = {
      rootMargin,
      threshold: max(0, min(1, threshold)) || 1
    };
    let isFirstUpdate = true;
    function handleObserve(entries) {
      const ratio = entries[0].intersectionRatio;
      if (ratio !== threshold) {
        if (!isFirstUpdate) {
          return refresh();
        }
        if (!ratio) {
          timeoutId = setTimeout(() => {
            refresh(false, 1e-7);
          }, 1e3);
        } else {
          refresh(false, ratio);
        }
      }
      if (ratio === 1 && !rectsAreEqual(elementRectForRootMargin, element.getBoundingClientRect())) {
        refresh();
      }
      isFirstUpdate = false;
    }
    try {
      io = new IntersectionObserver(handleObserve, {
        ...options,
        // Handle <iframe>s
        root: root.ownerDocument
      });
    } catch (_e) {
      io = new IntersectionObserver(handleObserve, options);
    }
    io.observe(element);
  }
  refresh(true);
  return cleanup;
}
function autoUpdate(reference, floating, update, options) {
  if (options === void 0) {
    options = {};
  }
  const {
    ancestorScroll = true,
    ancestorResize = true,
    elementResize = typeof ResizeObserver === "function",
    layoutShift = typeof IntersectionObserver === "function",
    animationFrame = false
  } = options;
  const referenceEl = unwrapElement(reference);
  const ancestors = ancestorScroll || ancestorResize ? [...referenceEl ? getOverflowAncestors(referenceEl) : [], ...floating ? getOverflowAncestors(floating) : []] : [];
  ancestors.forEach((ancestor) => {
    ancestorScroll && ancestor.addEventListener("scroll", update, {
      passive: true
    });
    ancestorResize && ancestor.addEventListener("resize", update);
  });
  const cleanupIo = referenceEl && layoutShift ? observeMove(referenceEl, update) : null;
  let reobserveFrame = -1;
  let resizeObserver = null;
  if (elementResize) {
    resizeObserver = new ResizeObserver((_ref) => {
      let [firstEntry] = _ref;
      if (firstEntry && firstEntry.target === referenceEl && resizeObserver && floating) {
        resizeObserver.unobserve(floating);
        cancelAnimationFrame(reobserveFrame);
        reobserveFrame = requestAnimationFrame(() => {
          var _resizeObserver;
          (_resizeObserver = resizeObserver) == null || _resizeObserver.observe(floating);
        });
      }
      update();
    });
    if (referenceEl && !animationFrame) {
      resizeObserver.observe(referenceEl);
    }
    if (floating) {
      resizeObserver.observe(floating);
    }
  }
  let frameId;
  let prevRefRect = animationFrame ? getBoundingClientRect(reference) : null;
  if (animationFrame) {
    frameLoop();
  }
  function frameLoop() {
    const nextRefRect = getBoundingClientRect(reference);
    if (prevRefRect && !rectsAreEqual(prevRefRect, nextRefRect)) {
      update();
    }
    prevRefRect = nextRefRect;
    frameId = requestAnimationFrame(frameLoop);
  }
  update();
  return () => {
    var _resizeObserver2;
    ancestors.forEach((ancestor) => {
      ancestorScroll && ancestor.removeEventListener("scroll", update);
      ancestorResize && ancestor.removeEventListener("resize", update);
    });
    cleanupIo == null || cleanupIo();
    (_resizeObserver2 = resizeObserver) == null || _resizeObserver2.disconnect();
    resizeObserver = null;
    if (animationFrame) {
      cancelAnimationFrame(frameId);
    }
  };
}
const offset$1 = offset$2;
const shift$1 = shift$2;
const flip$1 = flip$2;
const size$1 = size$2;
const hide$1 = hide$2;
const arrow$2 = arrow$3;
const limitShift$1 = limitShift$2;
const computePosition = (reference, floating, options) => {
  const cache = /* @__PURE__ */ new Map();
  const mergedOptions = {
    platform,
    ...options
  };
  const platformWithCache = {
    ...mergedOptions.platform,
    _c: cache
  };
  return computePosition$1(reference, floating, {
    ...mergedOptions,
    platform: platformWithCache
  });
};
var isClient = typeof document !== "undefined";
var noop = function noop2() {
};
var index = isClient ? reactExports.useLayoutEffect : noop;
function deepEqual(a, b) {
  if (a === b) {
    return true;
  }
  if (typeof a !== typeof b) {
    return false;
  }
  if (typeof a === "function" && a.toString() === b.toString()) {
    return true;
  }
  let length;
  let i;
  let keys;
  if (a && b && typeof a === "object") {
    if (Array.isArray(a)) {
      length = a.length;
      if (length !== b.length) return false;
      for (i = length; i-- !== 0; ) {
        if (!deepEqual(a[i], b[i])) {
          return false;
        }
      }
      return true;
    }
    keys = Object.keys(a);
    length = keys.length;
    if (length !== Object.keys(b).length) {
      return false;
    }
    for (i = length; i-- !== 0; ) {
      if (!{}.hasOwnProperty.call(b, keys[i])) {
        return false;
      }
    }
    for (i = length; i-- !== 0; ) {
      const key = keys[i];
      if (key === "_owner" && a.$$typeof) {
        continue;
      }
      if (!deepEqual(a[key], b[key])) {
        return false;
      }
    }
    return true;
  }
  return a !== a && b !== b;
}
function getDPR(element) {
  if (typeof window === "undefined") {
    return 1;
  }
  const win = element.ownerDocument.defaultView || window;
  return win.devicePixelRatio || 1;
}
function roundByDPR(element, value) {
  const dpr = getDPR(element);
  return Math.round(value * dpr) / dpr;
}
function useLatestRef(value) {
  const ref = reactExports.useRef(value);
  index(() => {
    ref.current = value;
  });
  return ref;
}
function useFloating(options) {
  if (options === void 0) {
    options = {};
  }
  const {
    placement = "bottom",
    strategy = "absolute",
    middleware = [],
    platform: platform2,
    elements: {
      reference: externalReference,
      floating: externalFloating
    } = {},
    transform = true,
    whileElementsMounted,
    open
  } = options;
  const [data, setData] = reactExports.useState({
    x: 0,
    y: 0,
    strategy,
    placement,
    middlewareData: {},
    isPositioned: false
  });
  const [latestMiddleware, setLatestMiddleware] = reactExports.useState(middleware);
  if (!deepEqual(latestMiddleware, middleware)) {
    setLatestMiddleware(middleware);
  }
  const [_reference, _setReference] = reactExports.useState(null);
  const [_floating, _setFloating] = reactExports.useState(null);
  const setReference = reactExports.useCallback((node) => {
    if (node !== referenceRef.current) {
      referenceRef.current = node;
      _setReference(node);
    }
  }, []);
  const setFloating = reactExports.useCallback((node) => {
    if (node !== floatingRef.current) {
      floatingRef.current = node;
      _setFloating(node);
    }
  }, []);
  const referenceEl = externalReference || _reference;
  const floatingEl = externalFloating || _floating;
  const referenceRef = reactExports.useRef(null);
  const floatingRef = reactExports.useRef(null);
  const dataRef = reactExports.useRef(data);
  const hasWhileElementsMounted = whileElementsMounted != null;
  const whileElementsMountedRef = useLatestRef(whileElementsMounted);
  const platformRef = useLatestRef(platform2);
  const openRef = useLatestRef(open);
  const update = reactExports.useCallback(() => {
    if (!referenceRef.current || !floatingRef.current) {
      return;
    }
    const config = {
      placement,
      strategy,
      middleware: latestMiddleware
    };
    if (platformRef.current) {
      config.platform = platformRef.current;
    }
    computePosition(referenceRef.current, floatingRef.current, config).then((data2) => {
      const fullData = {
        ...data2,
        // The floating element's position may be recomputed while it's closed
        // but still mounted (such as when transitioning out). To ensure
        // `isPositioned` will be `false` initially on the next open, avoid
        // setting it to `true` when `open === false` (must be specified).
        isPositioned: openRef.current !== false
      };
      if (isMountedRef.current && !deepEqual(dataRef.current, fullData)) {
        dataRef.current = fullData;
        reactDomExports.flushSync(() => {
          setData(fullData);
        });
      }
    });
  }, [latestMiddleware, placement, strategy, platformRef, openRef]);
  index(() => {
    if (open === false && dataRef.current.isPositioned) {
      dataRef.current.isPositioned = false;
      setData((data2) => ({
        ...data2,
        isPositioned: false
      }));
    }
  }, [open]);
  const isMountedRef = reactExports.useRef(false);
  index(() => {
    isMountedRef.current = true;
    return () => {
      isMountedRef.current = false;
    };
  }, []);
  index(() => {
    if (referenceEl) referenceRef.current = referenceEl;
    if (floatingEl) floatingRef.current = floatingEl;
    if (referenceEl && floatingEl) {
      if (whileElementsMountedRef.current) {
        return whileElementsMountedRef.current(referenceEl, floatingEl, update);
      }
      update();
    }
  }, [referenceEl, floatingEl, update, whileElementsMountedRef, hasWhileElementsMounted]);
  const refs = reactExports.useMemo(() => ({
    reference: referenceRef,
    floating: floatingRef,
    setReference,
    setFloating
  }), [setReference, setFloating]);
  const elements = reactExports.useMemo(() => ({
    reference: referenceEl,
    floating: floatingEl
  }), [referenceEl, floatingEl]);
  const floatingStyles = reactExports.useMemo(() => {
    const initialStyles = {
      position: strategy,
      left: 0,
      top: 0
    };
    if (!elements.floating) {
      return initialStyles;
    }
    const x = roundByDPR(elements.floating, data.x);
    const y = roundByDPR(elements.floating, data.y);
    if (transform) {
      return {
        ...initialStyles,
        transform: "translate(" + x + "px, " + y + "px)",
        ...getDPR(elements.floating) >= 1.5 && {
          willChange: "transform"
        }
      };
    }
    return {
      position: strategy,
      left: x,
      top: y
    };
  }, [strategy, transform, elements.floating, data.x, data.y]);
  return reactExports.useMemo(() => ({
    ...data,
    update,
    refs,
    elements,
    floatingStyles
  }), [data, update, refs, elements, floatingStyles]);
}
const arrow$1 = (options) => {
  function isRef(value) {
    return {}.hasOwnProperty.call(value, "current");
  }
  return {
    name: "arrow",
    options,
    fn(state) {
      const {
        element,
        padding
      } = typeof options === "function" ? options(state) : options;
      if (element && isRef(element)) {
        if (element.current != null) {
          return arrow$2({
            element: element.current,
            padding
          }).fn(state);
        }
        return {};
      }
      if (element) {
        return arrow$2({
          element,
          padding
        }).fn(state);
      }
      return {};
    }
  };
};
const offset = (options, deps) => {
  const result = offset$1(options);
  return {
    name: result.name,
    fn: result.fn,
    options: [options, deps]
  };
};
const shift = (options, deps) => {
  const result = shift$1(options);
  return {
    name: result.name,
    fn: result.fn,
    options: [options, deps]
  };
};
const limitShift = (options, deps) => {
  const result = limitShift$1(options);
  return {
    fn: result.fn,
    options: [options, deps]
  };
};
const flip = (options, deps) => {
  const result = flip$1(options);
  return {
    name: result.name,
    fn: result.fn,
    options: [options, deps]
  };
};
const size = (options, deps) => {
  const result = size$1(options);
  return {
    name: result.name,
    fn: result.fn,
    options: [options, deps]
  };
};
const hide = (options, deps) => {
  const result = hide$1(options);
  return {
    name: result.name,
    fn: result.fn,
    options: [options, deps]
  };
};
const arrow = (options, deps) => {
  const result = arrow$1(options);
  return {
    name: result.name,
    fn: result.fn,
    options: [options, deps]
  };
};
var NAME$2 = "Arrow";
var Arrow$1 = reactExports.forwardRef((props, forwardedRef) => {
  const { children, width = 10, height = 5, ...arrowProps } = props;
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Primitive.svg,
    {
      ...arrowProps,
      ref: forwardedRef,
      width,
      height,
      viewBox: "0 0 30 10",
      preserveAspectRatio: "none",
      children: props.asChild ? children : /* @__PURE__ */ jsxRuntimeExports.jsx("polygon", { points: "0,0 30,0 15,10" })
    }
  );
});
Arrow$1.displayName = NAME$2;
var Root$1 = Arrow$1;
var POPPER_NAME = "Popper";
var [createPopperContext, createPopperScope] = createContextScope(POPPER_NAME);
var [PopperProvider, usePopperContext] = createPopperContext(POPPER_NAME);
var Popper = (props) => {
  const { __scopePopper, children } = props;
  const [anchor, setAnchor] = reactExports.useState(null);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(PopperProvider, { scope: __scopePopper, anchor, onAnchorChange: setAnchor, children });
};
Popper.displayName = POPPER_NAME;
var ANCHOR_NAME = "PopperAnchor";
var PopperAnchor = reactExports.forwardRef(
  (props, forwardedRef) => {
    const { __scopePopper, virtualRef, ...anchorProps } = props;
    const context = usePopperContext(ANCHOR_NAME, __scopePopper);
    const ref = reactExports.useRef(null);
    const composedRefs = useComposedRefs(forwardedRef, ref);
    const anchorRef = reactExports.useRef(null);
    reactExports.useEffect(() => {
      const previousAnchor = anchorRef.current;
      anchorRef.current = (virtualRef == null ? void 0 : virtualRef.current) || ref.current;
      if (previousAnchor !== anchorRef.current) {
        context.onAnchorChange(anchorRef.current);
      }
    });
    return virtualRef ? null : /* @__PURE__ */ jsxRuntimeExports.jsx(Primitive.div, { ...anchorProps, ref: composedRefs });
  }
);
PopperAnchor.displayName = ANCHOR_NAME;
var CONTENT_NAME$1 = "PopperContent";
var [PopperContentProvider, useContentContext] = createPopperContext(CONTENT_NAME$1);
var PopperContent = reactExports.forwardRef(
  (props, forwardedRef) => {
    var _a, _b, _c, _d, _e, _f;
    const {
      __scopePopper,
      side = "bottom",
      sideOffset = 0,
      align = "center",
      alignOffset = 0,
      arrowPadding = 0,
      avoidCollisions = true,
      collisionBoundary = [],
      collisionPadding: collisionPaddingProp = 0,
      sticky = "partial",
      hideWhenDetached = false,
      updatePositionStrategy = "optimized",
      onPlaced,
      ...contentProps
    } = props;
    const context = usePopperContext(CONTENT_NAME$1, __scopePopper);
    const [content, setContent] = reactExports.useState(null);
    const composedRefs = useComposedRefs(forwardedRef, (node) => setContent(node));
    const [arrow$12, setArrow] = reactExports.useState(null);
    const arrowSize = useSize(arrow$12);
    const arrowWidth = (arrowSize == null ? void 0 : arrowSize.width) ?? 0;
    const arrowHeight = (arrowSize == null ? void 0 : arrowSize.height) ?? 0;
    const desiredPlacement = side + (align !== "center" ? "-" + align : "");
    const collisionPadding = typeof collisionPaddingProp === "number" ? collisionPaddingProp : { top: 0, right: 0, bottom: 0, left: 0, ...collisionPaddingProp };
    const boundary = Array.isArray(collisionBoundary) ? collisionBoundary : [collisionBoundary];
    const hasExplicitBoundaries = boundary.length > 0;
    const detectOverflowOptions = {
      padding: collisionPadding,
      boundary: boundary.filter(isNotNull),
      // with `strategy: 'fixed'`, this is the only way to get it to respect boundaries
      altBoundary: hasExplicitBoundaries
    };
    const { refs, floatingStyles, placement, isPositioned, middlewareData } = useFloating({
      // default to `fixed` strategy so users don't have to pick and we also avoid focus scroll issues
      strategy: "fixed",
      placement: desiredPlacement,
      whileElementsMounted: (...args) => {
        const cleanup = autoUpdate(...args, {
          animationFrame: updatePositionStrategy === "always"
        });
        return cleanup;
      },
      elements: {
        reference: context.anchor
      },
      middleware: [
        offset({ mainAxis: sideOffset + arrowHeight, alignmentAxis: alignOffset }),
        avoidCollisions && shift({
          mainAxis: true,
          crossAxis: false,
          limiter: sticky === "partial" ? limitShift() : void 0,
          ...detectOverflowOptions
        }),
        avoidCollisions && flip({ ...detectOverflowOptions }),
        size({
          ...detectOverflowOptions,
          apply: ({ elements, rects, availableWidth, availableHeight }) => {
            const { width: anchorWidth, height: anchorHeight } = rects.reference;
            const contentStyle = elements.floating.style;
            contentStyle.setProperty("--radix-popper-available-width", `${availableWidth}px`);
            contentStyle.setProperty("--radix-popper-available-height", `${availableHeight}px`);
            contentStyle.setProperty("--radix-popper-anchor-width", `${anchorWidth}px`);
            contentStyle.setProperty("--radix-popper-anchor-height", `${anchorHeight}px`);
          }
        }),
        arrow$12 && arrow({ element: arrow$12, padding: arrowPadding }),
        transformOrigin({ arrowWidth, arrowHeight }),
        hideWhenDetached && hide({ strategy: "referenceHidden", ...detectOverflowOptions })
      ]
    });
    const [placedSide, placedAlign] = getSideAndAlignFromPlacement(placement);
    const handlePlaced = useCallbackRef(onPlaced);
    useLayoutEffect2(() => {
      if (isPositioned) {
        handlePlaced == null ? void 0 : handlePlaced();
      }
    }, [isPositioned, handlePlaced]);
    const arrowX = (_a = middlewareData.arrow) == null ? void 0 : _a.x;
    const arrowY = (_b = middlewareData.arrow) == null ? void 0 : _b.y;
    const cannotCenterArrow = ((_c = middlewareData.arrow) == null ? void 0 : _c.centerOffset) !== 0;
    const [contentZIndex, setContentZIndex] = reactExports.useState();
    useLayoutEffect2(() => {
      if (content) setContentZIndex(window.getComputedStyle(content).zIndex);
    }, [content]);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        ref: refs.setFloating,
        "data-radix-popper-content-wrapper": "",
        style: {
          ...floatingStyles,
          transform: isPositioned ? floatingStyles.transform : "translate(0, -200%)",
          // keep off the page when measuring
          minWidth: "max-content",
          zIndex: contentZIndex,
          ["--radix-popper-transform-origin"]: [
            (_d = middlewareData.transformOrigin) == null ? void 0 : _d.x,
            (_e = middlewareData.transformOrigin) == null ? void 0 : _e.y
          ].join(" "),
          // hide the content if using the hide middleware and should be hidden
          // set visibility to hidden and disable pointer events so the UI behaves
          // as if the PopperContent isn't there at all
          ...((_f = middlewareData.hide) == null ? void 0 : _f.referenceHidden) && {
            visibility: "hidden",
            pointerEvents: "none"
          }
        },
        dir: props.dir,
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          PopperContentProvider,
          {
            scope: __scopePopper,
            placedSide,
            onArrowChange: setArrow,
            arrowX,
            arrowY,
            shouldHideArrow: cannotCenterArrow,
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              Primitive.div,
              {
                "data-side": placedSide,
                "data-align": placedAlign,
                ...contentProps,
                ref: composedRefs,
                style: {
                  ...contentProps.style,
                  // if the PopperContent hasn't been placed yet (not all measurements done)
                  // we prevent animations so that users's animation don't kick in too early referring wrong sides
                  animation: !isPositioned ? "none" : void 0
                }
              }
            )
          }
        )
      }
    );
  }
);
PopperContent.displayName = CONTENT_NAME$1;
var ARROW_NAME$1 = "PopperArrow";
var OPPOSITE_SIDE = {
  top: "bottom",
  right: "left",
  bottom: "top",
  left: "right"
};
var PopperArrow = reactExports.forwardRef(function PopperArrow2(props, forwardedRef) {
  const { __scopePopper, ...arrowProps } = props;
  const contentContext = useContentContext(ARROW_NAME$1, __scopePopper);
  const baseSide = OPPOSITE_SIDE[contentContext.placedSide];
  return (
    // we have to use an extra wrapper because `ResizeObserver` (used by `useSize`)
    // doesn't report size as we'd expect on SVG elements.
    // it reports their bounding box which is effectively the largest path inside the SVG.
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "span",
      {
        ref: contentContext.onArrowChange,
        style: {
          position: "absolute",
          left: contentContext.arrowX,
          top: contentContext.arrowY,
          [baseSide]: 0,
          transformOrigin: {
            top: "",
            right: "0 0",
            bottom: "center 0",
            left: "100% 0"
          }[contentContext.placedSide],
          transform: {
            top: "translateY(100%)",
            right: "translateY(50%) rotate(90deg) translateX(-50%)",
            bottom: `rotate(180deg)`,
            left: "translateY(50%) rotate(-90deg) translateX(50%)"
          }[contentContext.placedSide],
          visibility: contentContext.shouldHideArrow ? "hidden" : void 0
        },
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          Root$1,
          {
            ...arrowProps,
            ref: forwardedRef,
            style: {
              ...arrowProps.style,
              // ensures the element can be measured correctly (mostly for if SVG)
              display: "block"
            }
          }
        )
      }
    )
  );
});
PopperArrow.displayName = ARROW_NAME$1;
function isNotNull(value) {
  return value !== null;
}
var transformOrigin = (options) => ({
  name: "transformOrigin",
  options,
  fn(data) {
    var _a, _b, _c;
    const { placement, rects, middlewareData } = data;
    const cannotCenterArrow = ((_a = middlewareData.arrow) == null ? void 0 : _a.centerOffset) !== 0;
    const isArrowHidden = cannotCenterArrow;
    const arrowWidth = isArrowHidden ? 0 : options.arrowWidth;
    const arrowHeight = isArrowHidden ? 0 : options.arrowHeight;
    const [placedSide, placedAlign] = getSideAndAlignFromPlacement(placement);
    const noArrowAlign = { start: "0%", center: "50%", end: "100%" }[placedAlign];
    const arrowXCenter = (((_b = middlewareData.arrow) == null ? void 0 : _b.x) ?? 0) + arrowWidth / 2;
    const arrowYCenter = (((_c = middlewareData.arrow) == null ? void 0 : _c.y) ?? 0) + arrowHeight / 2;
    let x = "";
    let y = "";
    if (placedSide === "bottom") {
      x = isArrowHidden ? noArrowAlign : `${arrowXCenter}px`;
      y = `${-arrowHeight}px`;
    } else if (placedSide === "top") {
      x = isArrowHidden ? noArrowAlign : `${arrowXCenter}px`;
      y = `${rects.floating.height + arrowHeight}px`;
    } else if (placedSide === "right") {
      x = `${-arrowHeight}px`;
      y = isArrowHidden ? noArrowAlign : `${arrowYCenter}px`;
    } else if (placedSide === "left") {
      x = `${rects.floating.width + arrowHeight}px`;
      y = isArrowHidden ? noArrowAlign : `${arrowYCenter}px`;
    }
    return { data: { x, y } };
  }
});
function getSideAndAlignFromPlacement(placement) {
  const [side, align = "center"] = placement.split("-");
  return [side, align];
}
var Root2$1 = Popper;
var Anchor = PopperAnchor;
var Content = PopperContent;
var Arrow = PopperArrow;
var VISUALLY_HIDDEN_STYLES = Object.freeze({
  // See: https://github.com/twbs/bootstrap/blob/main/scss/mixins/_visually-hidden.scss
  position: "absolute",
  border: 0,
  width: 1,
  height: 1,
  padding: 0,
  margin: -1,
  overflow: "hidden",
  clip: "rect(0, 0, 0, 0)",
  whiteSpace: "nowrap",
  wordWrap: "normal"
});
var NAME$1 = "VisuallyHidden";
var VisuallyHidden = reactExports.forwardRef(
  (props, forwardedRef) => {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      Primitive.span,
      {
        ...props,
        ref: forwardedRef,
        style: { ...VISUALLY_HIDDEN_STYLES, ...props.style }
      }
    );
  }
);
VisuallyHidden.displayName = NAME$1;
var OPEN_KEYS = [" ", "Enter", "ArrowUp", "ArrowDown"];
var SELECTION_KEYS = [" ", "Enter"];
var SELECT_NAME = "Select";
var [Collection, useCollection, createCollectionScope] = createCollection(SELECT_NAME);
var [createSelectContext] = createContextScope(SELECT_NAME, [
  createCollectionScope,
  createPopperScope
]);
var usePopperScope = createPopperScope();
var [SelectProvider, useSelectContext] = createSelectContext(SELECT_NAME);
var [SelectNativeOptionsProvider, useSelectNativeOptionsContext] = createSelectContext(SELECT_NAME);
var Select$1 = (props) => {
  const {
    __scopeSelect,
    children,
    open: openProp,
    defaultOpen,
    onOpenChange,
    value: valueProp,
    defaultValue,
    onValueChange,
    dir,
    name,
    autoComplete,
    disabled,
    required,
    form
  } = props;
  const popperScope = usePopperScope(__scopeSelect);
  const [trigger, setTrigger] = reactExports.useState(null);
  const [valueNode, setValueNode] = reactExports.useState(null);
  const [valueNodeHasChildren, setValueNodeHasChildren] = reactExports.useState(false);
  const direction = useDirection(dir);
  const [open, setOpen] = useControllableState({
    prop: openProp,
    defaultProp: defaultOpen ?? false,
    onChange: onOpenChange,
    caller: SELECT_NAME
  });
  const [value, setValue] = useControllableState({
    prop: valueProp,
    defaultProp: defaultValue,
    onChange: onValueChange,
    caller: SELECT_NAME
  });
  const triggerPointerDownPosRef = reactExports.useRef(null);
  const isFormControl = trigger ? form || !!trigger.closest("form") : true;
  const [nativeOptionsSet, setNativeOptionsSet] = reactExports.useState(/* @__PURE__ */ new Set());
  const nativeSelectKey = Array.from(nativeOptionsSet).map((option) => option.props.value).join(";");
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Root2$1, { ...popperScope, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
    SelectProvider,
    {
      required,
      scope: __scopeSelect,
      trigger,
      onTriggerChange: setTrigger,
      valueNode,
      onValueNodeChange: setValueNode,
      valueNodeHasChildren,
      onValueNodeHasChildrenChange: setValueNodeHasChildren,
      contentId: useId(),
      value,
      onValueChange: setValue,
      open,
      onOpenChange: setOpen,
      dir: direction,
      triggerPointerDownPosRef,
      disabled,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Collection.Provider, { scope: __scopeSelect, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          SelectNativeOptionsProvider,
          {
            scope: props.__scopeSelect,
            onNativeOptionAdd: reactExports.useCallback((option) => {
              setNativeOptionsSet((prev) => new Set(prev).add(option));
            }, []),
            onNativeOptionRemove: reactExports.useCallback((option) => {
              setNativeOptionsSet((prev) => {
                const optionsSet = new Set(prev);
                optionsSet.delete(option);
                return optionsSet;
              });
            }, []),
            children
          }
        ) }),
        isFormControl ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
          SelectBubbleInput,
          {
            "aria-hidden": true,
            required,
            tabIndex: -1,
            name,
            autoComplete,
            value,
            onChange: (event) => setValue(event.target.value),
            disabled,
            form,
            children: [
              value === void 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "" }) : null,
              Array.from(nativeOptionsSet)
            ]
          },
          nativeSelectKey
        ) : null
      ]
    }
  ) });
};
Select$1.displayName = SELECT_NAME;
var TRIGGER_NAME = "SelectTrigger";
var SelectTrigger$1 = reactExports.forwardRef(
  (props, forwardedRef) => {
    const { __scopeSelect, disabled = false, ...triggerProps } = props;
    const popperScope = usePopperScope(__scopeSelect);
    const context = useSelectContext(TRIGGER_NAME, __scopeSelect);
    const isDisabled = context.disabled || disabled;
    const composedRefs = useComposedRefs(forwardedRef, context.onTriggerChange);
    const getItems = useCollection(__scopeSelect);
    const pointerTypeRef = reactExports.useRef("touch");
    const [searchRef, handleTypeaheadSearch, resetTypeahead] = useTypeaheadSearch((search) => {
      const enabledItems = getItems().filter((item) => !item.disabled);
      const currentItem = enabledItems.find((item) => item.value === context.value);
      const nextItem = findNextItem(enabledItems, search, currentItem);
      if (nextItem !== void 0) {
        context.onValueChange(nextItem.value);
      }
    });
    const handleOpen = (pointerEvent) => {
      if (!isDisabled) {
        context.onOpenChange(true);
        resetTypeahead();
      }
      if (pointerEvent) {
        context.triggerPointerDownPosRef.current = {
          x: Math.round(pointerEvent.pageX),
          y: Math.round(pointerEvent.pageY)
        };
      }
    };
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Anchor, { asChild: true, ...popperScope, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      Primitive.button,
      {
        type: "button",
        role: "combobox",
        "aria-controls": context.contentId,
        "aria-expanded": context.open,
        "aria-required": context.required,
        "aria-autocomplete": "none",
        dir: context.dir,
        "data-state": context.open ? "open" : "closed",
        disabled: isDisabled,
        "data-disabled": isDisabled ? "" : void 0,
        "data-placeholder": shouldShowPlaceholder(context.value) ? "" : void 0,
        ...triggerProps,
        ref: composedRefs,
        onClick: composeEventHandlers(triggerProps.onClick, (event) => {
          event.currentTarget.focus();
          if (pointerTypeRef.current !== "mouse") {
            handleOpen(event);
          }
        }),
        onPointerDown: composeEventHandlers(triggerProps.onPointerDown, (event) => {
          pointerTypeRef.current = event.pointerType;
          const target = event.target;
          if (target.hasPointerCapture(event.pointerId)) {
            target.releasePointerCapture(event.pointerId);
          }
          if (event.button === 0 && event.ctrlKey === false && event.pointerType === "mouse") {
            handleOpen(event);
            event.preventDefault();
          }
        }),
        onKeyDown: composeEventHandlers(triggerProps.onKeyDown, (event) => {
          const isTypingAhead = searchRef.current !== "";
          const isModifierKey = event.ctrlKey || event.altKey || event.metaKey;
          if (!isModifierKey && event.key.length === 1) handleTypeaheadSearch(event.key);
          if (isTypingAhead && event.key === " ") return;
          if (OPEN_KEYS.includes(event.key)) {
            handleOpen();
            event.preventDefault();
          }
        })
      }
    ) });
  }
);
SelectTrigger$1.displayName = TRIGGER_NAME;
var VALUE_NAME = "SelectValue";
var SelectValue$1 = reactExports.forwardRef(
  (props, forwardedRef) => {
    const { __scopeSelect, className, style, children, placeholder = "", ...valueProps } = props;
    const context = useSelectContext(VALUE_NAME, __scopeSelect);
    const { onValueNodeHasChildrenChange } = context;
    const hasChildren = children !== void 0;
    const composedRefs = useComposedRefs(forwardedRef, context.onValueNodeChange);
    useLayoutEffect2(() => {
      onValueNodeHasChildrenChange(hasChildren);
    }, [onValueNodeHasChildrenChange, hasChildren]);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      Primitive.span,
      {
        ...valueProps,
        ref: composedRefs,
        style: { pointerEvents: "none" },
        children: shouldShowPlaceholder(context.value) ? /* @__PURE__ */ jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, { children: placeholder }) : children
      }
    );
  }
);
SelectValue$1.displayName = VALUE_NAME;
var ICON_NAME = "SelectIcon";
var SelectIcon = reactExports.forwardRef(
  (props, forwardedRef) => {
    const { __scopeSelect, children, ...iconProps } = props;
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Primitive.span, { "aria-hidden": true, ...iconProps, ref: forwardedRef, children: children || "▼" });
  }
);
SelectIcon.displayName = ICON_NAME;
var PORTAL_NAME = "SelectPortal";
var SelectPortal = (props) => {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Portal$1, { asChild: true, ...props });
};
SelectPortal.displayName = PORTAL_NAME;
var CONTENT_NAME = "SelectContent";
var SelectContent$1 = reactExports.forwardRef(
  (props, forwardedRef) => {
    const context = useSelectContext(CONTENT_NAME, props.__scopeSelect);
    const [fragment, setFragment] = reactExports.useState();
    useLayoutEffect2(() => {
      setFragment(new DocumentFragment());
    }, []);
    if (!context.open) {
      const frag = fragment;
      return frag ? reactDomExports.createPortal(
        /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContentProvider, { scope: props.__scopeSelect, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Collection.Slot, { scope: props.__scopeSelect, children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: props.children }) }) }),
        frag
      ) : null;
    }
    return /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContentImpl, { ...props, ref: forwardedRef });
  }
);
SelectContent$1.displayName = CONTENT_NAME;
var CONTENT_MARGIN = 10;
var [SelectContentProvider, useSelectContentContext] = createSelectContext(CONTENT_NAME);
var CONTENT_IMPL_NAME = "SelectContentImpl";
var Slot = createSlot("SelectContent.RemoveScroll");
var SelectContentImpl = reactExports.forwardRef(
  (props, forwardedRef) => {
    const {
      __scopeSelect,
      position = "item-aligned",
      onCloseAutoFocus,
      onEscapeKeyDown,
      onPointerDownOutside,
      //
      // PopperContent props
      side,
      sideOffset,
      align,
      alignOffset,
      arrowPadding,
      collisionBoundary,
      collisionPadding,
      sticky,
      hideWhenDetached,
      avoidCollisions,
      //
      ...contentProps
    } = props;
    const context = useSelectContext(CONTENT_NAME, __scopeSelect);
    const [content, setContent] = reactExports.useState(null);
    const [viewport, setViewport] = reactExports.useState(null);
    const composedRefs = useComposedRefs(forwardedRef, (node) => setContent(node));
    const [selectedItem, setSelectedItem] = reactExports.useState(null);
    const [selectedItemText, setSelectedItemText] = reactExports.useState(
      null
    );
    const getItems = useCollection(__scopeSelect);
    const [isPositioned, setIsPositioned] = reactExports.useState(false);
    const firstValidItemFoundRef = reactExports.useRef(false);
    reactExports.useEffect(() => {
      if (content) return hideOthers(content);
    }, [content]);
    useFocusGuards();
    const focusFirst = reactExports.useCallback(
      (candidates) => {
        const [firstItem, ...restItems] = getItems().map((item) => item.ref.current);
        const [lastItem] = restItems.slice(-1);
        const PREVIOUSLY_FOCUSED_ELEMENT = document.activeElement;
        for (const candidate of candidates) {
          if (candidate === PREVIOUSLY_FOCUSED_ELEMENT) return;
          candidate == null ? void 0 : candidate.scrollIntoView({ block: "nearest" });
          if (candidate === firstItem && viewport) viewport.scrollTop = 0;
          if (candidate === lastItem && viewport) viewport.scrollTop = viewport.scrollHeight;
          candidate == null ? void 0 : candidate.focus();
          if (document.activeElement !== PREVIOUSLY_FOCUSED_ELEMENT) return;
        }
      },
      [getItems, viewport]
    );
    const focusSelectedItem = reactExports.useCallback(
      () => focusFirst([selectedItem, content]),
      [focusFirst, selectedItem, content]
    );
    reactExports.useEffect(() => {
      if (isPositioned) {
        focusSelectedItem();
      }
    }, [isPositioned, focusSelectedItem]);
    const { onOpenChange, triggerPointerDownPosRef } = context;
    reactExports.useEffect(() => {
      if (content) {
        let pointerMoveDelta = { x: 0, y: 0 };
        const handlePointerMove = (event) => {
          var _a, _b;
          pointerMoveDelta = {
            x: Math.abs(Math.round(event.pageX) - (((_a = triggerPointerDownPosRef.current) == null ? void 0 : _a.x) ?? 0)),
            y: Math.abs(Math.round(event.pageY) - (((_b = triggerPointerDownPosRef.current) == null ? void 0 : _b.y) ?? 0))
          };
        };
        const handlePointerUp = (event) => {
          if (pointerMoveDelta.x <= 10 && pointerMoveDelta.y <= 10) {
            event.preventDefault();
          } else {
            if (!content.contains(event.target)) {
              onOpenChange(false);
            }
          }
          document.removeEventListener("pointermove", handlePointerMove);
          triggerPointerDownPosRef.current = null;
        };
        if (triggerPointerDownPosRef.current !== null) {
          document.addEventListener("pointermove", handlePointerMove);
          document.addEventListener("pointerup", handlePointerUp, { capture: true, once: true });
        }
        return () => {
          document.removeEventListener("pointermove", handlePointerMove);
          document.removeEventListener("pointerup", handlePointerUp, { capture: true });
        };
      }
    }, [content, onOpenChange, triggerPointerDownPosRef]);
    reactExports.useEffect(() => {
      const close = () => onOpenChange(false);
      window.addEventListener("blur", close);
      window.addEventListener("resize", close);
      return () => {
        window.removeEventListener("blur", close);
        window.removeEventListener("resize", close);
      };
    }, [onOpenChange]);
    const [searchRef, handleTypeaheadSearch] = useTypeaheadSearch((search) => {
      const enabledItems = getItems().filter((item) => !item.disabled);
      const currentItem = enabledItems.find((item) => item.ref.current === document.activeElement);
      const nextItem = findNextItem(enabledItems, search, currentItem);
      if (nextItem) {
        setTimeout(() => nextItem.ref.current.focus());
      }
    });
    const itemRefCallback = reactExports.useCallback(
      (node, value, disabled) => {
        const isFirstValidItem = !firstValidItemFoundRef.current && !disabled;
        const isSelectedItem = context.value !== void 0 && context.value === value;
        if (isSelectedItem || isFirstValidItem) {
          setSelectedItem(node);
          if (isFirstValidItem) firstValidItemFoundRef.current = true;
        }
      },
      [context.value]
    );
    const handleItemLeave = reactExports.useCallback(() => content == null ? void 0 : content.focus(), [content]);
    const itemTextRefCallback = reactExports.useCallback(
      (node, value, disabled) => {
        const isFirstValidItem = !firstValidItemFoundRef.current && !disabled;
        const isSelectedItem = context.value !== void 0 && context.value === value;
        if (isSelectedItem || isFirstValidItem) {
          setSelectedItemText(node);
        }
      },
      [context.value]
    );
    const SelectPosition = position === "popper" ? SelectPopperPosition : SelectItemAlignedPosition;
    const popperContentProps = SelectPosition === SelectPopperPosition ? {
      side,
      sideOffset,
      align,
      alignOffset,
      arrowPadding,
      collisionBoundary,
      collisionPadding,
      sticky,
      hideWhenDetached,
      avoidCollisions
    } : {};
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      SelectContentProvider,
      {
        scope: __scopeSelect,
        content,
        viewport,
        onViewportChange: setViewport,
        itemRefCallback,
        selectedItem,
        onItemLeave: handleItemLeave,
        itemTextRefCallback,
        focusSelectedItem,
        selectedItemText,
        position,
        isPositioned,
        searchRef,
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(ReactRemoveScroll, { as: Slot, allowPinchZoom: true, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          FocusScope,
          {
            asChild: true,
            trapped: context.open,
            onMountAutoFocus: (event) => {
              event.preventDefault();
            },
            onUnmountAutoFocus: composeEventHandlers(onCloseAutoFocus, (event) => {
              var _a;
              (_a = context.trigger) == null ? void 0 : _a.focus({ preventScroll: true });
              event.preventDefault();
            }),
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              DismissableLayer,
              {
                asChild: true,
                disableOutsidePointerEvents: true,
                onEscapeKeyDown,
                onPointerDownOutside,
                onFocusOutside: (event) => event.preventDefault(),
                onDismiss: () => context.onOpenChange(false),
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                  SelectPosition,
                  {
                    role: "listbox",
                    id: context.contentId,
                    "data-state": context.open ? "open" : "closed",
                    dir: context.dir,
                    onContextMenu: (event) => event.preventDefault(),
                    ...contentProps,
                    ...popperContentProps,
                    onPlaced: () => setIsPositioned(true),
                    ref: composedRefs,
                    style: {
                      // flex layout so we can place the scroll buttons properly
                      display: "flex",
                      flexDirection: "column",
                      // reset the outline by default as the content MAY get focused
                      outline: "none",
                      ...contentProps.style
                    },
                    onKeyDown: composeEventHandlers(contentProps.onKeyDown, (event) => {
                      const isModifierKey = event.ctrlKey || event.altKey || event.metaKey;
                      if (event.key === "Tab") event.preventDefault();
                      if (!isModifierKey && event.key.length === 1) handleTypeaheadSearch(event.key);
                      if (["ArrowUp", "ArrowDown", "Home", "End"].includes(event.key)) {
                        const items = getItems().filter((item) => !item.disabled);
                        let candidateNodes = items.map((item) => item.ref.current);
                        if (["ArrowUp", "End"].includes(event.key)) {
                          candidateNodes = candidateNodes.slice().reverse();
                        }
                        if (["ArrowUp", "ArrowDown"].includes(event.key)) {
                          const currentElement = event.target;
                          const currentIndex = candidateNodes.indexOf(currentElement);
                          candidateNodes = candidateNodes.slice(currentIndex + 1);
                        }
                        setTimeout(() => focusFirst(candidateNodes));
                        event.preventDefault();
                      }
                    })
                  }
                )
              }
            )
          }
        ) })
      }
    );
  }
);
SelectContentImpl.displayName = CONTENT_IMPL_NAME;
var ITEM_ALIGNED_POSITION_NAME = "SelectItemAlignedPosition";
var SelectItemAlignedPosition = reactExports.forwardRef((props, forwardedRef) => {
  const { __scopeSelect, onPlaced, ...popperProps } = props;
  const context = useSelectContext(CONTENT_NAME, __scopeSelect);
  const contentContext = useSelectContentContext(CONTENT_NAME, __scopeSelect);
  const [contentWrapper, setContentWrapper] = reactExports.useState(null);
  const [content, setContent] = reactExports.useState(null);
  const composedRefs = useComposedRefs(forwardedRef, (node) => setContent(node));
  const getItems = useCollection(__scopeSelect);
  const shouldExpandOnScrollRef = reactExports.useRef(false);
  const shouldRepositionRef = reactExports.useRef(true);
  const { viewport, selectedItem, selectedItemText, focusSelectedItem } = contentContext;
  const position = reactExports.useCallback(() => {
    if (context.trigger && context.valueNode && contentWrapper && content && viewport && selectedItem && selectedItemText) {
      const triggerRect = context.trigger.getBoundingClientRect();
      const contentRect = content.getBoundingClientRect();
      const valueNodeRect = context.valueNode.getBoundingClientRect();
      const itemTextRect = selectedItemText.getBoundingClientRect();
      if (context.dir !== "rtl") {
        const itemTextOffset = itemTextRect.left - contentRect.left;
        const left = valueNodeRect.left - itemTextOffset;
        const leftDelta = triggerRect.left - left;
        const minContentWidth = triggerRect.width + leftDelta;
        const contentWidth = Math.max(minContentWidth, contentRect.width);
        const rightEdge = window.innerWidth - CONTENT_MARGIN;
        const clampedLeft = clamp$1(left, [
          CONTENT_MARGIN,
          // Prevents the content from going off the starting edge of the
          // viewport. It may still go off the ending edge, but this can be
          // controlled by the user since they may want to manage overflow in a
          // specific way.
          // https://github.com/radix-ui/primitives/issues/2049
          Math.max(CONTENT_MARGIN, rightEdge - contentWidth)
        ]);
        contentWrapper.style.minWidth = minContentWidth + "px";
        contentWrapper.style.left = clampedLeft + "px";
      } else {
        const itemTextOffset = contentRect.right - itemTextRect.right;
        const right = window.innerWidth - valueNodeRect.right - itemTextOffset;
        const rightDelta = window.innerWidth - triggerRect.right - right;
        const minContentWidth = triggerRect.width + rightDelta;
        const contentWidth = Math.max(minContentWidth, contentRect.width);
        const leftEdge = window.innerWidth - CONTENT_MARGIN;
        const clampedRight = clamp$1(right, [
          CONTENT_MARGIN,
          Math.max(CONTENT_MARGIN, leftEdge - contentWidth)
        ]);
        contentWrapper.style.minWidth = minContentWidth + "px";
        contentWrapper.style.right = clampedRight + "px";
      }
      const items = getItems();
      const availableHeight = window.innerHeight - CONTENT_MARGIN * 2;
      const itemsHeight = viewport.scrollHeight;
      const contentStyles = window.getComputedStyle(content);
      const contentBorderTopWidth = parseInt(contentStyles.borderTopWidth, 10);
      const contentPaddingTop = parseInt(contentStyles.paddingTop, 10);
      const contentBorderBottomWidth = parseInt(contentStyles.borderBottomWidth, 10);
      const contentPaddingBottom = parseInt(contentStyles.paddingBottom, 10);
      const fullContentHeight = contentBorderTopWidth + contentPaddingTop + itemsHeight + contentPaddingBottom + contentBorderBottomWidth;
      const minContentHeight = Math.min(selectedItem.offsetHeight * 5, fullContentHeight);
      const viewportStyles = window.getComputedStyle(viewport);
      const viewportPaddingTop = parseInt(viewportStyles.paddingTop, 10);
      const viewportPaddingBottom = parseInt(viewportStyles.paddingBottom, 10);
      const topEdgeToTriggerMiddle = triggerRect.top + triggerRect.height / 2 - CONTENT_MARGIN;
      const triggerMiddleToBottomEdge = availableHeight - topEdgeToTriggerMiddle;
      const selectedItemHalfHeight = selectedItem.offsetHeight / 2;
      const itemOffsetMiddle = selectedItem.offsetTop + selectedItemHalfHeight;
      const contentTopToItemMiddle = contentBorderTopWidth + contentPaddingTop + itemOffsetMiddle;
      const itemMiddleToContentBottom = fullContentHeight - contentTopToItemMiddle;
      const willAlignWithoutTopOverflow = contentTopToItemMiddle <= topEdgeToTriggerMiddle;
      if (willAlignWithoutTopOverflow) {
        const isLastItem = items.length > 0 && selectedItem === items[items.length - 1].ref.current;
        contentWrapper.style.bottom = "0px";
        const viewportOffsetBottom = content.clientHeight - viewport.offsetTop - viewport.offsetHeight;
        const clampedTriggerMiddleToBottomEdge = Math.max(
          triggerMiddleToBottomEdge,
          selectedItemHalfHeight + // viewport might have padding bottom, include it to avoid a scrollable viewport
          (isLastItem ? viewportPaddingBottom : 0) + viewportOffsetBottom + contentBorderBottomWidth
        );
        const height = contentTopToItemMiddle + clampedTriggerMiddleToBottomEdge;
        contentWrapper.style.height = height + "px";
      } else {
        const isFirstItem = items.length > 0 && selectedItem === items[0].ref.current;
        contentWrapper.style.top = "0px";
        const clampedTopEdgeToTriggerMiddle = Math.max(
          topEdgeToTriggerMiddle,
          contentBorderTopWidth + viewport.offsetTop + // viewport might have padding top, include it to avoid a scrollable viewport
          (isFirstItem ? viewportPaddingTop : 0) + selectedItemHalfHeight
        );
        const height = clampedTopEdgeToTriggerMiddle + itemMiddleToContentBottom;
        contentWrapper.style.height = height + "px";
        viewport.scrollTop = contentTopToItemMiddle - topEdgeToTriggerMiddle + viewport.offsetTop;
      }
      contentWrapper.style.margin = `${CONTENT_MARGIN}px 0`;
      contentWrapper.style.minHeight = minContentHeight + "px";
      contentWrapper.style.maxHeight = availableHeight + "px";
      onPlaced == null ? void 0 : onPlaced();
      requestAnimationFrame(() => shouldExpandOnScrollRef.current = true);
    }
  }, [
    getItems,
    context.trigger,
    context.valueNode,
    contentWrapper,
    content,
    viewport,
    selectedItem,
    selectedItemText,
    context.dir,
    onPlaced
  ]);
  useLayoutEffect2(() => position(), [position]);
  const [contentZIndex, setContentZIndex] = reactExports.useState();
  useLayoutEffect2(() => {
    if (content) setContentZIndex(window.getComputedStyle(content).zIndex);
  }, [content]);
  const handleScrollButtonChange = reactExports.useCallback(
    (node) => {
      if (node && shouldRepositionRef.current === true) {
        position();
        focusSelectedItem == null ? void 0 : focusSelectedItem();
        shouldRepositionRef.current = false;
      }
    },
    [position, focusSelectedItem]
  );
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    SelectViewportProvider,
    {
      scope: __scopeSelect,
      contentWrapper,
      shouldExpandOnScrollRef,
      onScrollButtonChange: handleScrollButtonChange,
      children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          ref: setContentWrapper,
          style: {
            display: "flex",
            flexDirection: "column",
            position: "fixed",
            zIndex: contentZIndex
          },
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            Primitive.div,
            {
              ...popperProps,
              ref: composedRefs,
              style: {
                // When we get the height of the content, it includes borders. If we were to set
                // the height without having `boxSizing: 'border-box'` it would be too big.
                boxSizing: "border-box",
                // We need to ensure the content doesn't get taller than the wrapper
                maxHeight: "100%",
                ...popperProps.style
              }
            }
          )
        }
      )
    }
  );
});
SelectItemAlignedPosition.displayName = ITEM_ALIGNED_POSITION_NAME;
var POPPER_POSITION_NAME = "SelectPopperPosition";
var SelectPopperPosition = reactExports.forwardRef((props, forwardedRef) => {
  const {
    __scopeSelect,
    align = "start",
    collisionPadding = CONTENT_MARGIN,
    ...popperProps
  } = props;
  const popperScope = usePopperScope(__scopeSelect);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Content,
    {
      ...popperScope,
      ...popperProps,
      ref: forwardedRef,
      align,
      collisionPadding,
      style: {
        // Ensure border-box for floating-ui calculations
        boxSizing: "border-box",
        ...popperProps.style,
        // re-namespace exposed content custom properties
        ...{
          "--radix-select-content-transform-origin": "var(--radix-popper-transform-origin)",
          "--radix-select-content-available-width": "var(--radix-popper-available-width)",
          "--radix-select-content-available-height": "var(--radix-popper-available-height)",
          "--radix-select-trigger-width": "var(--radix-popper-anchor-width)",
          "--radix-select-trigger-height": "var(--radix-popper-anchor-height)"
        }
      }
    }
  );
});
SelectPopperPosition.displayName = POPPER_POSITION_NAME;
var [SelectViewportProvider, useSelectViewportContext] = createSelectContext(CONTENT_NAME, {});
var VIEWPORT_NAME = "SelectViewport";
var SelectViewport = reactExports.forwardRef(
  (props, forwardedRef) => {
    const { __scopeSelect, nonce, ...viewportProps } = props;
    const contentContext = useSelectContentContext(VIEWPORT_NAME, __scopeSelect);
    const viewportContext = useSelectViewportContext(VIEWPORT_NAME, __scopeSelect);
    const composedRefs = useComposedRefs(forwardedRef, contentContext.onViewportChange);
    const prevScrollTopRef = reactExports.useRef(0);
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "style",
        {
          dangerouslySetInnerHTML: {
            __html: `[data-radix-select-viewport]{scrollbar-width:none;-ms-overflow-style:none;-webkit-overflow-scrolling:touch;}[data-radix-select-viewport]::-webkit-scrollbar{display:none}`
          },
          nonce
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Collection.Slot, { scope: __scopeSelect, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        Primitive.div,
        {
          "data-radix-select-viewport": "",
          role: "presentation",
          ...viewportProps,
          ref: composedRefs,
          style: {
            // we use position: 'relative' here on the `viewport` so that when we call
            // `selectedItem.offsetTop` in calculations, the offset is relative to the viewport
            // (independent of the scrollUpButton).
            position: "relative",
            flex: 1,
            // Viewport should only be scrollable in the vertical direction.
            // This won't work in vertical writing modes, so we'll need to
            // revisit this if/when that is supported
            // https://developer.chrome.com/blog/vertical-form-controls
            overflow: "hidden auto",
            ...viewportProps.style
          },
          onScroll: composeEventHandlers(viewportProps.onScroll, (event) => {
            const viewport = event.currentTarget;
            const { contentWrapper, shouldExpandOnScrollRef } = viewportContext;
            if ((shouldExpandOnScrollRef == null ? void 0 : shouldExpandOnScrollRef.current) && contentWrapper) {
              const scrolledBy = Math.abs(prevScrollTopRef.current - viewport.scrollTop);
              if (scrolledBy > 0) {
                const availableHeight = window.innerHeight - CONTENT_MARGIN * 2;
                const cssMinHeight = parseFloat(contentWrapper.style.minHeight);
                const cssHeight = parseFloat(contentWrapper.style.height);
                const prevHeight = Math.max(cssMinHeight, cssHeight);
                if (prevHeight < availableHeight) {
                  const nextHeight = prevHeight + scrolledBy;
                  const clampedNextHeight = Math.min(availableHeight, nextHeight);
                  const heightDiff = nextHeight - clampedNextHeight;
                  contentWrapper.style.height = clampedNextHeight + "px";
                  if (contentWrapper.style.bottom === "0px") {
                    viewport.scrollTop = heightDiff > 0 ? heightDiff : 0;
                    contentWrapper.style.justifyContent = "flex-end";
                  }
                }
              }
            }
            prevScrollTopRef.current = viewport.scrollTop;
          })
        }
      ) })
    ] });
  }
);
SelectViewport.displayName = VIEWPORT_NAME;
var GROUP_NAME = "SelectGroup";
var [SelectGroupContextProvider, useSelectGroupContext] = createSelectContext(GROUP_NAME);
var SelectGroup = reactExports.forwardRef(
  (props, forwardedRef) => {
    const { __scopeSelect, ...groupProps } = props;
    const groupId = useId();
    return /* @__PURE__ */ jsxRuntimeExports.jsx(SelectGroupContextProvider, { scope: __scopeSelect, id: groupId, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Primitive.div, { role: "group", "aria-labelledby": groupId, ...groupProps, ref: forwardedRef }) });
  }
);
SelectGroup.displayName = GROUP_NAME;
var LABEL_NAME = "SelectLabel";
var SelectLabel = reactExports.forwardRef(
  (props, forwardedRef) => {
    const { __scopeSelect, ...labelProps } = props;
    const groupContext = useSelectGroupContext(LABEL_NAME, __scopeSelect);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Primitive.div, { id: groupContext.id, ...labelProps, ref: forwardedRef });
  }
);
SelectLabel.displayName = LABEL_NAME;
var ITEM_NAME = "SelectItem";
var [SelectItemContextProvider, useSelectItemContext] = createSelectContext(ITEM_NAME);
var SelectItem$1 = reactExports.forwardRef(
  (props, forwardedRef) => {
    const {
      __scopeSelect,
      value,
      disabled = false,
      textValue: textValueProp,
      ...itemProps
    } = props;
    const context = useSelectContext(ITEM_NAME, __scopeSelect);
    const contentContext = useSelectContentContext(ITEM_NAME, __scopeSelect);
    const isSelected = context.value === value;
    const [textValue, setTextValue] = reactExports.useState(textValueProp ?? "");
    const [isFocused, setIsFocused] = reactExports.useState(false);
    const composedRefs = useComposedRefs(
      forwardedRef,
      (node) => {
        var _a;
        return (_a = contentContext.itemRefCallback) == null ? void 0 : _a.call(contentContext, node, value, disabled);
      }
    );
    const textId = useId();
    const pointerTypeRef = reactExports.useRef("touch");
    const handleSelect = () => {
      if (!disabled) {
        context.onValueChange(value);
        context.onOpenChange(false);
      }
    };
    if (value === "") {
      throw new Error(
        "A <Select.Item /> must have a value prop that is not an empty string. This is because the Select value can be set to an empty string to clear the selection and show the placeholder."
      );
    }
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      SelectItemContextProvider,
      {
        scope: __scopeSelect,
        value,
        disabled,
        textId,
        isSelected,
        onItemTextChange: reactExports.useCallback((node) => {
          setTextValue((prevTextValue) => prevTextValue || ((node == null ? void 0 : node.textContent) ?? "").trim());
        }, []),
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          Collection.ItemSlot,
          {
            scope: __scopeSelect,
            value,
            disabled,
            textValue,
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              Primitive.div,
              {
                role: "option",
                "aria-labelledby": textId,
                "data-highlighted": isFocused ? "" : void 0,
                "aria-selected": isSelected && isFocused,
                "data-state": isSelected ? "checked" : "unchecked",
                "aria-disabled": disabled || void 0,
                "data-disabled": disabled ? "" : void 0,
                tabIndex: disabled ? void 0 : -1,
                ...itemProps,
                ref: composedRefs,
                onFocus: composeEventHandlers(itemProps.onFocus, () => setIsFocused(true)),
                onBlur: composeEventHandlers(itemProps.onBlur, () => setIsFocused(false)),
                onClick: composeEventHandlers(itemProps.onClick, () => {
                  if (pointerTypeRef.current !== "mouse") handleSelect();
                }),
                onPointerUp: composeEventHandlers(itemProps.onPointerUp, () => {
                  if (pointerTypeRef.current === "mouse") handleSelect();
                }),
                onPointerDown: composeEventHandlers(itemProps.onPointerDown, (event) => {
                  pointerTypeRef.current = event.pointerType;
                }),
                onPointerMove: composeEventHandlers(itemProps.onPointerMove, (event) => {
                  var _a;
                  pointerTypeRef.current = event.pointerType;
                  if (disabled) {
                    (_a = contentContext.onItemLeave) == null ? void 0 : _a.call(contentContext);
                  } else if (pointerTypeRef.current === "mouse") {
                    event.currentTarget.focus({ preventScroll: true });
                  }
                }),
                onPointerLeave: composeEventHandlers(itemProps.onPointerLeave, (event) => {
                  var _a;
                  if (event.currentTarget === document.activeElement) {
                    (_a = contentContext.onItemLeave) == null ? void 0 : _a.call(contentContext);
                  }
                }),
                onKeyDown: composeEventHandlers(itemProps.onKeyDown, (event) => {
                  var _a;
                  const isTypingAhead = ((_a = contentContext.searchRef) == null ? void 0 : _a.current) !== "";
                  if (isTypingAhead && event.key === " ") return;
                  if (SELECTION_KEYS.includes(event.key)) handleSelect();
                  if (event.key === " ") event.preventDefault();
                })
              }
            )
          }
        )
      }
    );
  }
);
SelectItem$1.displayName = ITEM_NAME;
var ITEM_TEXT_NAME = "SelectItemText";
var SelectItemText = reactExports.forwardRef(
  (props, forwardedRef) => {
    const { __scopeSelect, className, style, ...itemTextProps } = props;
    const context = useSelectContext(ITEM_TEXT_NAME, __scopeSelect);
    const contentContext = useSelectContentContext(ITEM_TEXT_NAME, __scopeSelect);
    const itemContext = useSelectItemContext(ITEM_TEXT_NAME, __scopeSelect);
    const nativeOptionsContext = useSelectNativeOptionsContext(ITEM_TEXT_NAME, __scopeSelect);
    const [itemTextNode, setItemTextNode] = reactExports.useState(null);
    const composedRefs = useComposedRefs(
      forwardedRef,
      (node) => setItemTextNode(node),
      itemContext.onItemTextChange,
      (node) => {
        var _a;
        return (_a = contentContext.itemTextRefCallback) == null ? void 0 : _a.call(contentContext, node, itemContext.value, itemContext.disabled);
      }
    );
    const textContent = itemTextNode == null ? void 0 : itemTextNode.textContent;
    const nativeOption = reactExports.useMemo(
      () => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: itemContext.value, disabled: itemContext.disabled, children: textContent }, itemContext.value),
      [itemContext.disabled, itemContext.value, textContent]
    );
    const { onNativeOptionAdd, onNativeOptionRemove } = nativeOptionsContext;
    useLayoutEffect2(() => {
      onNativeOptionAdd(nativeOption);
      return () => onNativeOptionRemove(nativeOption);
    }, [onNativeOptionAdd, onNativeOptionRemove, nativeOption]);
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Primitive.span, { id: itemContext.textId, ...itemTextProps, ref: composedRefs }),
      itemContext.isSelected && context.valueNode && !context.valueNodeHasChildren ? reactDomExports.createPortal(itemTextProps.children, context.valueNode) : null
    ] });
  }
);
SelectItemText.displayName = ITEM_TEXT_NAME;
var ITEM_INDICATOR_NAME = "SelectItemIndicator";
var SelectItemIndicator = reactExports.forwardRef(
  (props, forwardedRef) => {
    const { __scopeSelect, ...itemIndicatorProps } = props;
    const itemContext = useSelectItemContext(ITEM_INDICATOR_NAME, __scopeSelect);
    return itemContext.isSelected ? /* @__PURE__ */ jsxRuntimeExports.jsx(Primitive.span, { "aria-hidden": true, ...itemIndicatorProps, ref: forwardedRef }) : null;
  }
);
SelectItemIndicator.displayName = ITEM_INDICATOR_NAME;
var SCROLL_UP_BUTTON_NAME = "SelectScrollUpButton";
var SelectScrollUpButton$1 = reactExports.forwardRef((props, forwardedRef) => {
  const contentContext = useSelectContentContext(SCROLL_UP_BUTTON_NAME, props.__scopeSelect);
  const viewportContext = useSelectViewportContext(SCROLL_UP_BUTTON_NAME, props.__scopeSelect);
  const [canScrollUp, setCanScrollUp] = reactExports.useState(false);
  const composedRefs = useComposedRefs(forwardedRef, viewportContext.onScrollButtonChange);
  useLayoutEffect2(() => {
    if (contentContext.viewport && contentContext.isPositioned) {
      let handleScroll2 = function() {
        const canScrollUp2 = viewport.scrollTop > 0;
        setCanScrollUp(canScrollUp2);
      };
      const viewport = contentContext.viewport;
      handleScroll2();
      viewport.addEventListener("scroll", handleScroll2);
      return () => viewport.removeEventListener("scroll", handleScroll2);
    }
  }, [contentContext.viewport, contentContext.isPositioned]);
  return canScrollUp ? /* @__PURE__ */ jsxRuntimeExports.jsx(
    SelectScrollButtonImpl,
    {
      ...props,
      ref: composedRefs,
      onAutoScroll: () => {
        const { viewport, selectedItem } = contentContext;
        if (viewport && selectedItem) {
          viewport.scrollTop = viewport.scrollTop - selectedItem.offsetHeight;
        }
      }
    }
  ) : null;
});
SelectScrollUpButton$1.displayName = SCROLL_UP_BUTTON_NAME;
var SCROLL_DOWN_BUTTON_NAME = "SelectScrollDownButton";
var SelectScrollDownButton$1 = reactExports.forwardRef((props, forwardedRef) => {
  const contentContext = useSelectContentContext(SCROLL_DOWN_BUTTON_NAME, props.__scopeSelect);
  const viewportContext = useSelectViewportContext(SCROLL_DOWN_BUTTON_NAME, props.__scopeSelect);
  const [canScrollDown, setCanScrollDown] = reactExports.useState(false);
  const composedRefs = useComposedRefs(forwardedRef, viewportContext.onScrollButtonChange);
  useLayoutEffect2(() => {
    if (contentContext.viewport && contentContext.isPositioned) {
      let handleScroll2 = function() {
        const maxScroll = viewport.scrollHeight - viewport.clientHeight;
        const canScrollDown2 = Math.ceil(viewport.scrollTop) < maxScroll;
        setCanScrollDown(canScrollDown2);
      };
      const viewport = contentContext.viewport;
      handleScroll2();
      viewport.addEventListener("scroll", handleScroll2);
      return () => viewport.removeEventListener("scroll", handleScroll2);
    }
  }, [contentContext.viewport, contentContext.isPositioned]);
  return canScrollDown ? /* @__PURE__ */ jsxRuntimeExports.jsx(
    SelectScrollButtonImpl,
    {
      ...props,
      ref: composedRefs,
      onAutoScroll: () => {
        const { viewport, selectedItem } = contentContext;
        if (viewport && selectedItem) {
          viewport.scrollTop = viewport.scrollTop + selectedItem.offsetHeight;
        }
      }
    }
  ) : null;
});
SelectScrollDownButton$1.displayName = SCROLL_DOWN_BUTTON_NAME;
var SelectScrollButtonImpl = reactExports.forwardRef((props, forwardedRef) => {
  const { __scopeSelect, onAutoScroll, ...scrollIndicatorProps } = props;
  const contentContext = useSelectContentContext("SelectScrollButton", __scopeSelect);
  const autoScrollTimerRef = reactExports.useRef(null);
  const getItems = useCollection(__scopeSelect);
  const clearAutoScrollTimer = reactExports.useCallback(() => {
    if (autoScrollTimerRef.current !== null) {
      window.clearInterval(autoScrollTimerRef.current);
      autoScrollTimerRef.current = null;
    }
  }, []);
  reactExports.useEffect(() => {
    return () => clearAutoScrollTimer();
  }, [clearAutoScrollTimer]);
  useLayoutEffect2(() => {
    var _a;
    const activeItem = getItems().find((item) => item.ref.current === document.activeElement);
    (_a = activeItem == null ? void 0 : activeItem.ref.current) == null ? void 0 : _a.scrollIntoView({ block: "nearest" });
  }, [getItems]);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Primitive.div,
    {
      "aria-hidden": true,
      ...scrollIndicatorProps,
      ref: forwardedRef,
      style: { flexShrink: 0, ...scrollIndicatorProps.style },
      onPointerDown: composeEventHandlers(scrollIndicatorProps.onPointerDown, () => {
        if (autoScrollTimerRef.current === null) {
          autoScrollTimerRef.current = window.setInterval(onAutoScroll, 50);
        }
      }),
      onPointerMove: composeEventHandlers(scrollIndicatorProps.onPointerMove, () => {
        var _a;
        (_a = contentContext.onItemLeave) == null ? void 0 : _a.call(contentContext);
        if (autoScrollTimerRef.current === null) {
          autoScrollTimerRef.current = window.setInterval(onAutoScroll, 50);
        }
      }),
      onPointerLeave: composeEventHandlers(scrollIndicatorProps.onPointerLeave, () => {
        clearAutoScrollTimer();
      })
    }
  );
});
var SEPARATOR_NAME = "SelectSeparator";
var SelectSeparator = reactExports.forwardRef(
  (props, forwardedRef) => {
    const { __scopeSelect, ...separatorProps } = props;
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Primitive.div, { "aria-hidden": true, ...separatorProps, ref: forwardedRef });
  }
);
SelectSeparator.displayName = SEPARATOR_NAME;
var ARROW_NAME = "SelectArrow";
var SelectArrow = reactExports.forwardRef(
  (props, forwardedRef) => {
    const { __scopeSelect, ...arrowProps } = props;
    const popperScope = usePopperScope(__scopeSelect);
    const context = useSelectContext(ARROW_NAME, __scopeSelect);
    const contentContext = useSelectContentContext(ARROW_NAME, __scopeSelect);
    return context.open && contentContext.position === "popper" ? /* @__PURE__ */ jsxRuntimeExports.jsx(Arrow, { ...popperScope, ...arrowProps, ref: forwardedRef }) : null;
  }
);
SelectArrow.displayName = ARROW_NAME;
var BUBBLE_INPUT_NAME = "SelectBubbleInput";
var SelectBubbleInput = reactExports.forwardRef(
  ({ __scopeSelect, value, ...props }, forwardedRef) => {
    const ref = reactExports.useRef(null);
    const composedRefs = useComposedRefs(forwardedRef, ref);
    const prevValue = usePrevious(value);
    reactExports.useEffect(() => {
      const select = ref.current;
      if (!select) return;
      const selectProto = window.HTMLSelectElement.prototype;
      const descriptor = Object.getOwnPropertyDescriptor(
        selectProto,
        "value"
      );
      const setValue = descriptor.set;
      if (prevValue !== value && setValue) {
        const event = new Event("change", { bubbles: true });
        setValue.call(select, value);
        select.dispatchEvent(event);
      }
    }, [prevValue, value]);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      Primitive.select,
      {
        ...props,
        style: { ...VISUALLY_HIDDEN_STYLES, ...props.style },
        ref: composedRefs,
        defaultValue: value
      }
    );
  }
);
SelectBubbleInput.displayName = BUBBLE_INPUT_NAME;
function shouldShowPlaceholder(value) {
  return value === "" || value === void 0;
}
function useTypeaheadSearch(onSearchChange) {
  const handleSearchChange = useCallbackRef(onSearchChange);
  const searchRef = reactExports.useRef("");
  const timerRef = reactExports.useRef(0);
  const handleTypeaheadSearch = reactExports.useCallback(
    (key) => {
      const search = searchRef.current + key;
      handleSearchChange(search);
      (function updateSearch(value) {
        searchRef.current = value;
        window.clearTimeout(timerRef.current);
        if (value !== "") timerRef.current = window.setTimeout(() => updateSearch(""), 1e3);
      })(search);
    },
    [handleSearchChange]
  );
  const resetTypeahead = reactExports.useCallback(() => {
    searchRef.current = "";
    window.clearTimeout(timerRef.current);
  }, []);
  reactExports.useEffect(() => {
    return () => window.clearTimeout(timerRef.current);
  }, []);
  return [searchRef, handleTypeaheadSearch, resetTypeahead];
}
function findNextItem(items, search, currentItem) {
  const isRepeated = search.length > 1 && Array.from(search).every((char) => char === search[0]);
  const normalizedSearch = isRepeated ? search[0] : search;
  const currentItemIndex = currentItem ? items.indexOf(currentItem) : -1;
  let wrappedItems = wrapArray(items, Math.max(currentItemIndex, 0));
  const excludeCurrentItem = normalizedSearch.length === 1;
  if (excludeCurrentItem) wrappedItems = wrappedItems.filter((v) => v !== currentItem);
  const nextItem = wrappedItems.find(
    (item) => item.textValue.toLowerCase().startsWith(normalizedSearch.toLowerCase())
  );
  return nextItem !== currentItem ? nextItem : void 0;
}
function wrapArray(array, startIndex) {
  return array.map((_, index2) => array[(startIndex + index2) % array.length]);
}
var Root2 = Select$1;
var Trigger = SelectTrigger$1;
var Value = SelectValue$1;
var Icon = SelectIcon;
var Portal = SelectPortal;
var Content2 = SelectContent$1;
var Viewport = SelectViewport;
var Item = SelectItem$1;
var ItemText = SelectItemText;
var ItemIndicator = SelectItemIndicator;
var ScrollUpButton = SelectScrollUpButton$1;
var ScrollDownButton = SelectScrollDownButton$1;
function Select({
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Root2, { "data-slot": "select", ...props });
}
function SelectValue({
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Value, { "data-slot": "select-value", ...props });
}
function SelectTrigger({
  className,
  size: size2 = "default",
  children,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    Trigger,
    {
      "data-slot": "select-trigger",
      "data-size": size2,
      className: cn(
        "border-input data-[placeholder]:text-muted-foreground [&_svg:not([class*='text-'])]:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:bg-input/30 dark:hover:bg-input/50 flex w-fit items-center justify-between gap-2 rounded-md border bg-transparent px-3 py-2 text-sm whitespace-nowrap shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 data-[size=default]:h-9 data-[size=sm]:h-8 *:data-[slot=select-value]:line-clamp-1 *:data-[slot=select-value]:flex *:data-[slot=select-value]:items-center *:data-[slot=select-value]:gap-2 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className
      ),
      ...props,
      children: [
        children,
        /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronDown, { className: "size-4 opacity-50" }) })
      ]
    }
  );
}
function SelectContent({
  className,
  children,
  position = "popper",
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Portal, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
    Content2,
    {
      "data-slot": "select-content",
      className: cn(
        "bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 relative z-50 max-h-(--radix-select-content-available-height) min-w-[8rem] origin-(--radix-select-content-transform-origin) overflow-x-hidden overflow-y-auto rounded-md border shadow-md",
        position === "popper" && "data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1",
        className
      ),
      position,
      ...props,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(SelectScrollUpButton, {}),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Viewport,
          {
            className: cn(
              "p-1",
              position === "popper" && "h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)] scroll-my-1"
            ),
            children
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(SelectScrollDownButton, {})
      ]
    }
  ) });
}
function SelectItem({
  className,
  children,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    Item,
    {
      "data-slot": "select-item",
      className: cn(
        "focus:bg-accent focus:text-accent-foreground [&_svg:not([class*='text-'])]:text-muted-foreground relative flex w-full cursor-default items-center gap-2 rounded-sm py-1.5 pr-8 pl-2 text-sm outline-hidden select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 *:[span]:last:flex *:[span]:last:items-center *:[span]:last:gap-2",
        className
      ),
      ...props,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute right-2 flex size-3.5 items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ItemIndicator, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "size-4" }) }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(ItemText, { children })
      ]
    }
  );
}
function SelectScrollUpButton({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    ScrollUpButton,
    {
      "data-slot": "select-scroll-up-button",
      className: cn(
        "flex cursor-default items-center justify-center py-1",
        className
      ),
      ...props,
      children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronUp, { className: "size-4" })
    }
  );
}
function SelectScrollDownButton({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    ScrollDownButton,
    {
      "data-slot": "select-scroll-down-button",
      className: cn(
        "flex cursor-default items-center justify-center py-1",
        className
      ),
      ...props,
      children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronDown, { className: "size-4" })
    }
  );
}
var NAME = "Separator";
var DEFAULT_ORIENTATION = "horizontal";
var ORIENTATIONS = ["horizontal", "vertical"];
var Separator$1 = reactExports.forwardRef((props, forwardedRef) => {
  const { decorative, orientation: orientationProp = DEFAULT_ORIENTATION, ...domProps } = props;
  const orientation = isValidOrientation(orientationProp) ? orientationProp : DEFAULT_ORIENTATION;
  const ariaOrientation = orientation === "vertical" ? orientation : void 0;
  const semanticProps = decorative ? { role: "none" } : { "aria-orientation": ariaOrientation, role: "separator" };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Primitive$1.div,
    {
      "data-orientation": orientation,
      ...semanticProps,
      ...domProps,
      ref: forwardedRef
    }
  );
});
Separator$1.displayName = NAME;
function isValidOrientation(orientation) {
  return ORIENTATIONS.includes(orientation);
}
var Root = Separator$1;
function Separator({
  className,
  orientation = "horizontal",
  decorative = true,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Root,
    {
      "data-slot": "separator",
      decorative,
      orientation,
      className: cn(
        "bg-border shrink-0 data-[orientation=horizontal]:h-px data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full data-[orientation=vertical]:w-px",
        className
      ),
      ...props
    }
  );
}
function ImageManager({
  images,
  primaryIndex,
  onImagesChange,
  onPrimaryChange,
  onPrimaryPersist,
  onUpload,
  uploading = false
}) {
  const fileInputRef = reactExports.useRef(null);
  const [dragOver, setDragOver] = reactExports.useState(false);
  const handleFiles = async (files) => {
    if (!files || files.length === 0) return;
    const newImages = Array.from(files).map((file) => ({
      file,
      previewUrl: URL.createObjectURL(file),
      uploaded: false,
      uploadProgress: 0
    }));
    const startIdx = images.length;
    onImagesChange([...images, ...newImages]);
    for (let i = 0; i < newImages.length; i++) {
      await onUpload(files[i], startIdx + i);
    }
  };
  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    handleFiles(e.dataTransfer.files);
  };
  const handleRemove = (index2) => {
    const updated = images.filter((_, i) => i !== index2);
    onImagesChange(updated);
    if (primaryIndex === index2) {
      onPrimaryChange(0);
    } else if (primaryIndex > index2) {
      onPrimaryChange(primaryIndex - 1);
    }
  };
  const handleMoveUp = (index2) => {
    if (index2 === 0) return;
    const updated = [...images];
    [updated[index2 - 1], updated[index2]] = [updated[index2], updated[index2 - 1]];
    onImagesChange(updated);
    if (primaryIndex === index2) onPrimaryChange(index2 - 1);
    else if (primaryIndex === index2 - 1) onPrimaryChange(index2);
  };
  const handleMoveDown = (index2) => {
    if (index2 === images.length - 1) return;
    const updated = [...images];
    [updated[index2], updated[index2 + 1]] = [updated[index2 + 1], updated[index2]];
    onImagesChange(updated);
    if (primaryIndex === index2) onPrimaryChange(index2 + 1);
    else if (primaryIndex === index2 + 1) onPrimaryChange(index2);
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "label",
      {
        htmlFor: "image-file-input",
        className: cn(
          "flex flex-col items-center border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors",
          dragOver ? "border-primary bg-primary/5" : "border-border hover:border-primary/50 hover:bg-muted/30"
        ),
        onDragOver: (e) => {
          e.preventDefault();
          setDragOver(true);
        },
        onDragLeave: () => setDragOver(false),
        onDrop: handleDrop,
        "data-ocid": "image-upload-zone",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Upload, { className: "w-6 h-6 text-muted-foreground mb-2" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-foreground", children: "Click or drag photos here" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-1", children: "JPG, PNG, WEBP — multiple files supported" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              id: "image-file-input",
              ref: fileInputRef,
              type: "file",
              accept: "image/*",
              multiple: true,
              className: "hidden",
              onChange: (e) => handleFiles(e.target.files),
              "data-ocid": "image-file-input"
            }
          )
        ]
      }
    ),
    images.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 sm:grid-cols-3 gap-3", children: images.map((img, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: cn(
          "relative group rounded-lg overflow-hidden border-2 bg-muted aspect-video",
          primaryIndex === idx ? "border-primary" : "border-border"
        ),
        "data-ocid": "image-thumbnail",
        children: [
          img.previewUrl ? /* @__PURE__ */ jsxRuntimeExports.jsx(
            "img",
            {
              src: img.previewUrl,
              alt: `Plot ${idx + 1}`,
              className: "w-full h-full object-cover"
            }
          ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-full h-full flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Image, { className: "w-8 h-8 text-muted-foreground" }) }),
          !img.uploaded && img.file && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute inset-0 bg-black/50 flex flex-col items-center justify-center gap-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "w-5 h-5 text-white animate-spin" }),
            img.uploadProgress !== void 0 && img.uploadProgress > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-white text-xs", children: [
              Math.round(img.uploadProgress),
              "%"
            ] })
          ] }),
          primaryIndex === idx && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-1 left-1", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "bg-primary text-primary-foreground text-[10px] font-semibold px-1.5 py-0.5 rounded", children: "Primary" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute top-1 right-1 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                title: "Set as primary",
                onClick: () => {
                  onPrimaryChange(idx);
                  onPrimaryPersist == null ? void 0 : onPrimaryPersist(idx);
                },
                className: cn(
                  "w-6 h-6 rounded flex items-center justify-center transition-colors",
                  primaryIndex === idx ? "bg-primary text-primary-foreground" : "bg-black/50 text-white hover:bg-primary"
                ),
                "data-ocid": "set-primary-btn",
                "aria-label": "Set as primary image",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Star,
                  {
                    className: "w-3 h-3",
                    fill: primaryIndex === idx ? "currentColor" : "none"
                  }
                )
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                title: "Remove image",
                onClick: () => handleRemove(idx),
                className: "w-6 h-6 rounded bg-black/50 text-white hover:bg-destructive flex items-center justify-center transition-colors",
                "data-ocid": "remove-image-btn",
                "aria-label": "Remove image",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "w-3 h-3" })
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute bottom-1 left-1 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                title: "Move up",
                onClick: () => handleMoveUp(idx),
                disabled: idx === 0,
                className: "w-6 h-6 rounded bg-black/50 text-white hover:bg-black/70 disabled:opacity-30 flex items-center justify-center transition-colors",
                "data-ocid": "move-image-up",
                "aria-label": "Move image left",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronUp, { className: "w-3 h-3" })
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                title: "Move down",
                onClick: () => handleMoveDown(idx),
                disabled: idx === images.length - 1,
                className: "w-6 h-6 rounded bg-black/50 text-white hover:bg-black/70 disabled:opacity-30 flex items-center justify-center transition-colors",
                "data-ocid": "move-image-down",
                "aria-label": "Move image right",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronDown, { className: "w-3 h-3" })
              }
            )
          ] })
        ]
      },
      img.previewUrl || idx
    )) }),
    uploading && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground flex items-center gap-1.5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "w-3 h-3 animate-spin" }),
      "Uploading images…"
    ] })
  ] });
}
const PRESET_TAGS = [
  "New",
  "Hot Deal",
  "Featured",
  "Reduced Price",
  "Corner Plot",
  "Near Highway",
  "Residential",
  "Agricultural"
];
const defaultValues = {
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
  constructionLiveUpdates: ""
};
function toFormValues(p) {
  var _a, _b, _c, _d, _e;
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
      Number(((_a = p.constructionFields) == null ? void 0 : _a.progressPercentage) ?? 0)
    ),
    constructionCurrentPhase: ((_b = p.constructionFields) == null ? void 0 : _b.currentPhase) ?? "",
    constructionStartDate: ((_c = p.constructionFields) == null ? void 0 : _c.constructionStartDate) ?? "",
    constructionExpectedCompletion: ((_d = p.constructionFields) == null ? void 0 : _d.expectedCompletionDate) ?? "",
    constructionLiveUpdates: ((_e = p.constructionFields) == null ? void 0 : _e.liveUpdates) ?? ""
  };
}
function MapPickerModal({
  lat,
  lng,
  onConfirm,
  onClose
}) {
  const [pickedLat, setPickedLat] = reactExports.useState(lat);
  const [pickedLng, setPickedLng] = reactExports.useState(lng);
  const [geoLoading, setGeoLoading] = reactExports.useState(false);
  const handleUseMyLocation = () => {
    if (!navigator.geolocation) {
      ue.error("Geolocation not supported");
      return;
    }
    setGeoLoading(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setPickedLat(pos.coords.latitude.toFixed(6));
        setPickedLng(pos.coords.longitude.toFixed(6));
        setGeoLoading(false);
        ue.success("Location captured");
      },
      () => {
        ue.error("Unable to get location");
        setGeoLoading(false);
      }
    );
  };
  const validLat = pickedLat && !Number.isNaN(Number(pickedLat));
  const validLng = pickedLng && !Number.isNaN(Number(pickedLng));
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.div,
    {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      exit: { opacity: 0 },
      className: "fixed inset-0 z-50 flex items-center justify-center p-4",
      onClick: (e) => e.target === e.currentTarget && onClose(),
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-foreground/40 blur-backdrop" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            initial: { scale: 0.92, opacity: 0, y: 20 },
            animate: { scale: 1, opacity: 1, y: 0 },
            exit: { scale: 0.92, opacity: 0, y: 20 },
            transition: { type: "spring", damping: 22, stiffness: 300 },
            className: "relative w-full max-w-lg glass-light rounded-2xl shadow-elevation overflow-hidden",
            "data-ocid": "map_picker.dialog",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between px-5 py-4 border-b border-border/30", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "w-4 h-4 text-primary" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-semibold text-base text-foreground", children: "Pick Location on Map" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    type: "button",
                    onClick: onClose,
                    className: "w-7 h-7 rounded-full bg-muted/60 flex items-center justify-center hover:bg-muted transition-colors",
                    "aria-label": "Close map picker",
                    "data-ocid": "map_picker.close_button",
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-3.5 h-3.5" })
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-5 space-y-4", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  PropertyMap,
                  {
                    mode: "picker",
                    selectedLat: pickedLat && !Number.isNaN(Number(pickedLat)) ? Number(pickedLat) : void 0,
                    selectedLng: pickedLng && !Number.isNaN(Number(pickedLng)) ? Number(pickedLng) : void 0,
                    onLocationSelect: (lat2, lng2) => {
                      setPickedLat(String(lat2));
                      setPickedLng(String(lng2));
                    },
                    className: "mb-1"
                  }
                ),
                validLat && validLng && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-xs text-muted-foreground bg-muted/40 px-3 py-2 rounded-lg", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "w-3 h-3 text-primary shrink-0" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-mono", children: [
                    Number(pickedLat).toFixed(6),
                    ", ",
                    Number(pickedLng).toFixed(6)
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "picker-lat", className: "text-xs", children: "Latitude" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Input,
                      {
                        id: "picker-lat",
                        type: "number",
                        step: "any",
                        placeholder: "28.535517",
                        value: pickedLat,
                        onChange: (e) => setPickedLat(e.target.value),
                        "data-ocid": "map_picker.latitude_input"
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "picker-lng", className: "text-xs", children: "Longitude" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Input,
                      {
                        id: "picker-lng",
                        type: "number",
                        step: "any",
                        placeholder: "77.391029",
                        value: pickedLng,
                        onChange: (e) => setPickedLng(e.target.value),
                        "data-ocid": "map_picker.longitude_input"
                      }
                    )
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  Button,
                  {
                    type: "button",
                    variant: "outline",
                    size: "sm",
                    onClick: handleUseMyLocation,
                    disabled: geoLoading,
                    className: "w-full gap-2 text-xs",
                    "data-ocid": "map_picker.use_location_button",
                    children: [
                      geoLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "w-3.5 h-3.5 animate-spin" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(LocateFixed, { className: "w-3.5 h-3.5" }),
                      "Use My Location"
                    ]
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 pt-1", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Button,
                    {
                      type: "button",
                      variant: "outline",
                      className: "flex-1",
                      onClick: onClose,
                      "data-ocid": "map_picker.cancel_button",
                      children: "Cancel"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Button,
                    {
                      type: "button",
                      className: "flex-1",
                      disabled: !validLat || !validLng,
                      onClick: () => {
                        onConfirm(pickedLat, pickedLng);
                        onClose();
                      },
                      "data-ocid": "map_picker.confirm_button",
                      children: "Use These Coordinates"
                    }
                  )
                ] })
              ] })
            ]
          }
        )
      ]
    }
  );
}
function TagsInput({
  tags,
  onChange
}) {
  const [customInput, setCustomInput] = reactExports.useState("");
  const addTag = (tag) => {
    const trimmed = tag.trim();
    if (trimmed && !tags.includes(trimmed)) onChange([...tags, trimmed]);
  };
  const removeTag = (tag) => onChange(tags.filter((t) => t !== tag));
  const handleKeyDown = (e) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      addTag(customInput);
      setCustomInput("");
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-2", children: PRESET_TAGS.map((tag) => {
      const active = tags.includes(tag);
      return /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          type: "button",
          onClick: () => active ? removeTag(tag) : addTag(tag),
          className: `text-xs px-3 py-1 rounded-full border transition-smooth ${active ? "bg-primary text-primary-foreground border-primary" : "bg-muted/40 text-muted-foreground border-border hover:border-primary/50"}`,
          "data-ocid": `tags.preset_${tag.toLowerCase().replace(/ /g, "_")}`,
          children: tag
        },
        tag
      );
    }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Input,
        {
          placeholder: "Type custom tag and press Enter",
          value: customInput,
          onChange: (e) => setCustomInput(e.target.value),
          onKeyDown: handleKeyDown,
          className: "text-sm",
          "data-ocid": "tags.custom_input"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Button,
        {
          type: "button",
          variant: "outline",
          size: "sm",
          onClick: () => {
            addTag(customInput);
            setCustomInput("");
          },
          disabled: !customInput.trim(),
          "data-ocid": "tags.add_button",
          children: "Add"
        }
      )
    ] }),
    tags.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-1.5", children: tags.map((tag) => /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { variant: "secondary", className: "gap-1 pr-1 text-xs", children: [
      tag,
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          type: "button",
          onClick: () => removeTag(tag),
          className: "w-4 h-4 rounded-full hover:bg-muted flex items-center justify-center",
          "aria-label": `Remove tag ${tag}`,
          "data-ocid": `tags.remove_${tag.toLowerCase().replace(/ /g, "_")}`,
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-2.5 h-2.5" })
        }
      )
    ] }, tag)) })
  ] });
}
function FormSection({
  title,
  icon: Icon2,
  children,
  collapsible = false
}) {
  const [open, setOpen] = reactExports.useState(true);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "bg-card border border-border rounded-2xl overflow-hidden shadow-card", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "button",
      {
        type: "button",
        className: `w-full flex items-center gap-2.5 px-6 py-4 ${collapsible ? "cursor-pointer hover:bg-muted/30" : "cursor-default"} transition-colors`,
        onClick: () => collapsible && setOpen((v) => !v),
        "aria-expanded": collapsible ? open : void 0,
        children: [
          Icon2 && /* @__PURE__ */ jsxRuntimeExports.jsx(Icon2, { className: "w-4 h-4 text-primary shrink-0" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display font-semibold text-base text-foreground flex-1 text-left", children: title }),
          collapsible && (open ? /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronUp, { className: "w-4 h-4 text-muted-foreground" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronDown, { className: "w-4 h-4 text-muted-foreground" }))
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { initial: false, children: open && /* @__PURE__ */ jsxRuntimeExports.jsx(
      motion.div,
      {
        initial: { height: 0, opacity: 0 },
        animate: { height: "auto", opacity: 1 },
        exit: { height: 0, opacity: 0 },
        transition: { duration: 0.2, ease: "easeInOut" },
        className: "overflow-hidden",
        children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-6 pb-6 pt-1 space-y-5 border-t border-border", children })
      }
    ) })
  ] });
}
function PropertyForm({ property, mode }) {
  const navigate = useNavigate();
  const { actor } = useActor(createActor);
  const addProperty = useAddProperty();
  const updateProperty = useUpdateProperty();
  const addImage = useAddImageToProperty();
  const reorderImages = useReorderImages();
  const setPrimaryImageIndex = useSetPrimaryImageIndex();
  const [values, setValues] = reactExports.useState(
    property ? toFormValues(property) : defaultValues
  );
  const [errors, setErrors] = reactExports.useState({});
  const [geoLoading, setGeoLoading] = reactExports.useState(false);
  const [uploading, setUploading] = reactExports.useState(false);
  const [submitting, setSubmitting] = reactExports.useState(false);
  const [showMapPicker, setShowMapPicker] = reactExports.useState(false);
  const [showManualCoords, setShowManualCoords] = reactExports.useState(
    !!((property == null ? void 0 : property.latitude) && (property == null ? void 0 : property.longitude))
  );
  const [images, setImages] = reactExports.useState(
    () => {
      var _a;
      return ((_a = property == null ? void 0 : property.images) == null ? void 0 : _a.map((blob) => ({
        blob,
        previewUrl: blob.getDirectURL(),
        uploaded: true
      }))) ?? [];
    }
  );
  const [primaryIndex, setPrimaryIndex] = reactExports.useState(
    property ? Number(property.primaryImageIndex) : 0
  );
  const set = (field, value) => {
    setValues((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: void 0 }));
  };
  const setStr = (field) => (e) => set(field, e.target.value);
  const validate = () => {
    const newErrors = {};
    if (!values.title.trim()) newErrors.title = "Title is required";
    if (!values.locationName.trim())
      newErrors.locationName = "Location is required";
    if (!values.latitude || Number.isNaN(Number(values.latitude)))
      newErrors.latitude = "Valid latitude required";
    if (!values.longitude || Number.isNaN(Number(values.longitude)))
      newErrors.longitude = "Valid longitude required";
    if (!values.areaSizeSqFt || Number.isNaN(Number(values.areaSizeSqFt)) || Number(values.areaSizeSqFt) <= 0)
      newErrors.areaSizeSqFt = "Valid area required";
    if (!values.price || Number.isNaN(Number(values.price)) || Number(values.price) < 0)
      newErrors.price = "Valid price required";
    if (!values.description.trim())
      newErrors.description = "Description is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  const handleUseLocation = () => {
    if (!navigator.geolocation) {
      ue.error("Geolocation not supported");
      return;
    }
    setGeoLoading(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        set("latitude", String(pos.coords.latitude.toFixed(6)));
        set("longitude", String(pos.coords.longitude.toFixed(6)));
        setGeoLoading(false);
        setShowManualCoords(true);
        ue.success("Location captured");
      },
      () => {
        ue.error("Unable to retrieve location");
        setGeoLoading(false);
      }
    );
  };
  const handleUpload = reactExports.useCallback(
    async (file, index2) => {
      if (!actor) {
        ue.error("Backend not available");
        return;
      }
      setUploading(true);
      try {
        const bytes = new Uint8Array(await file.arrayBuffer());
        const blob = ExternalBlob.fromBytes(bytes).withUploadProgress((pct) => {
          setImages((prev) => {
            const updated = [...prev];
            if (updated[index2])
              updated[index2] = { ...updated[index2], uploadProgress: pct };
            return updated;
          });
        });
        if (mode === "edit" && property) {
          await addImage.mutateAsync({
            propertyId: property.propertyId,
            image: blob
          });
          setImages((prev) => {
            const updated = [...prev];
            if (updated[index2])
              updated[index2] = {
                ...updated[index2],
                blob,
                previewUrl: blob.getDirectURL(),
                uploaded: true
              };
            return updated;
          });
        } else {
          setImages((prev) => {
            const updated = [...prev];
            if (updated[index2])
              updated[index2] = { ...updated[index2], blob, uploaded: true };
            return updated;
          });
        }
      } catch {
        ue.error("Image upload failed");
      } finally {
        setUploading(false);
      }
    },
    [actor, mode, property, addImage]
  );
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setSubmitting(true);
    try {
      if (mode === "new") {
        const constructionFieldsPayload = values.isConstructionSite ? {
          progressPercentage: BigInt(
            Math.min(
              100,
              Math.max(
                0,
                Math.round(
                  Number(values.constructionProgressPercentage) || 0
                )
              )
            )
          ),
          currentPhase: values.constructionCurrentPhase.trim(),
          constructionStartDate: values.constructionStartDate,
          expectedCompletionDate: values.constructionExpectedCompletion,
          liveUpdates: values.constructionLiveUpdates.trim(),
          sitePhotos: []
        } : void 0;
        const propertyId = await addProperty.mutateAsync({
          title: values.title.trim(),
          locationName: values.locationName.trim(),
          latitude: Number(values.latitude),
          longitude: Number(values.longitude),
          areaSizeSqFt: Number(values.areaSizeSqFt),
          price: BigInt(Math.round(Number(values.price))),
          description: values.description.trim(),
          legalStatus: values.legalStatus,
          notes: values.notes.trim() || void 0,
          featured: values.featured ?? false,
          tags: values.tags ?? [],
          isConstructionSite: values.isConstructionSite,
          constructionFields: constructionFieldsPayload
        });
        for (const img of images) {
          if (img.blob) {
            await addImage.mutateAsync({ propertyId, image: img.blob });
          }
        }
        if (images.length > 1) {
          await reorderImages.mutateAsync({
            propertyId,
            newOrder: images.map((_, i) => BigInt(i))
          });
        }
        ue.success("Property added successfully");
        navigate({ to: "/admin" });
      } else if (property) {
        const updateConstructionFields = values.isConstructionSite ? {
          progressPercentage: BigInt(
            Math.min(
              100,
              Math.max(
                0,
                Math.round(
                  Number(values.constructionProgressPercentage) || 0
                )
              )
            )
          ),
          currentPhase: values.constructionCurrentPhase.trim(),
          constructionStartDate: values.constructionStartDate,
          expectedCompletionDate: values.constructionExpectedCompletion,
          liveUpdates: values.constructionLiveUpdates.trim(),
          sitePhotos: []
        } : void 0;
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
            notes: values.notes.trim() || void 0,
            isConstructionSite: values.isConstructionSite,
            constructionFields: updateConstructionFields
          }
        });
        const uploadedImages = images.filter((img) => img.uploaded);
        if (uploadedImages.length > 1) {
          await reorderImages.mutateAsync({
            propertyId: property.propertyId,
            newOrder: uploadedImages.map((_, i) => BigInt(i))
          });
        }
        ue.success("Property updated");
        navigate({ to: "/admin" });
      }
    } catch (err) {
      const msg = err instanceof Error ? err.message : "An error occurred";
      ue.error(msg);
    } finally {
      setSubmitting(false);
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { children: showMapPicker && /* @__PURE__ */ jsxRuntimeExports.jsx(
      MapPickerModal,
      {
        lat: values.latitude,
        lng: values.longitude,
        onConfirm: (lat, lng) => {
          set("latitude", lat);
          set("longitude", lng);
          setShowManualCoords(true);
        },
        onClose: () => setShowMapPicker(false)
      }
    ) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "form",
      {
        onSubmit: handleSubmit,
        className: "space-y-6",
        noValidate: true,
        "data-ocid": "property_form",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(FormSection, { title: "Basic Information", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid sm:grid-cols-2 gap-5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "sm:col-span-2 space-y-1.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { htmlFor: "title", children: [
                  "Title ",
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-destructive", children: "*" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Input,
                  {
                    id: "title",
                    placeholder: "e.g. Residential Plot in Noida Sector 62",
                    value: values.title,
                    onChange: setStr("title"),
                    className: errors.title ? "border-destructive" : "",
                    "data-ocid": "property_form.title_input"
                  }
                ),
                errors.title && /* @__PURE__ */ jsxRuntimeExports.jsx(
                  motion.p,
                  {
                    initial: { opacity: 0, y: -4 },
                    animate: { opacity: 1, y: 0 },
                    className: "text-xs text-destructive",
                    "data-ocid": "property_form.title_error",
                    children: errors.title
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { htmlFor: "locationName", children: [
                  "Location Name ",
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-destructive", children: "*" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Input,
                  {
                    id: "locationName",
                    placeholder: "City / Village / Area",
                    value: values.locationName,
                    onChange: setStr("locationName"),
                    className: errors.locationName ? "border-destructive" : "",
                    "data-ocid": "property_form.location_input"
                  }
                ),
                errors.locationName && /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "p",
                  {
                    className: "text-xs text-destructive",
                    "data-ocid": "property_form.location_error",
                    children: errors.locationName
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { htmlFor: "price", children: [
                  "Price (₹) ",
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-destructive", children: "*" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Input,
                  {
                    id: "price",
                    type: "number",
                    min: "0",
                    placeholder: "e.g. 4500000",
                    value: values.price,
                    onChange: setStr("price"),
                    className: errors.price ? "border-destructive" : "",
                    "data-ocid": "property_form.price_input"
                  }
                ),
                errors.price && /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "p",
                  {
                    className: "text-xs text-destructive",
                    "data-ocid": "property_form.price_error",
                    children: errors.price
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { htmlFor: "areaSizeSqFt", children: [
                  "Area (sq ft) ",
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-destructive", children: "*" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Input,
                  {
                    id: "areaSizeSqFt",
                    type: "number",
                    min: "1",
                    placeholder: "e.g. 1200",
                    value: values.areaSizeSqFt,
                    onChange: setStr("areaSizeSqFt"),
                    className: errors.areaSizeSqFt ? "border-destructive" : "",
                    "data-ocid": "property_form.area_input"
                  }
                ),
                errors.areaSizeSqFt && /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "p",
                  {
                    className: "text-xs text-destructive",
                    "data-ocid": "property_form.area_error",
                    children: errors.areaSizeSqFt
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "legalStatus", children: "Legal Status" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  Select,
                  {
                    value: values.legalStatus,
                    onValueChange: (v) => set("legalStatus", v),
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        SelectTrigger,
                        {
                          id: "legalStatus",
                          "data-ocid": "property_form.legal_status_select",
                          children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {})
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: LegalStatus.approved, children: "Approved" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: LegalStatus.not_approved, children: "Not Approved" })
                      ] })
                    ]
                  }
                )
              ] }),
              mode === "edit" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "status", children: "Status" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  Select,
                  {
                    value: values.status,
                    onValueChange: (v) => set("status", v),
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        SelectTrigger,
                        {
                          id: "status",
                          "data-ocid": "property_form.status_select",
                          children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {})
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: PropertyStatus.available, children: "Available" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: PropertyStatus.sold, children: "Sold" })
                      ] })
                    ]
                  }
                )
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { htmlFor: "description", children: [
                "Description ",
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-destructive", children: "*" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Textarea,
                {
                  id: "description",
                  placeholder: "Describe the property — layout, features, surroundings…",
                  rows: 4,
                  value: values.description,
                  onChange: setStr("description"),
                  className: errors.description ? "border-destructive" : "",
                  "data-ocid": "property_form.description_textarea"
                }
              ),
              errors.description && /* @__PURE__ */ jsxRuntimeExports.jsx(
                "p",
                {
                  className: "text-xs text-destructive",
                  "data-ocid": "property_form.description_error",
                  children: errors.description
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between rounded-xl bg-muted/40 px-4 py-3 border border-border", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Star,
                  {
                    className: `w-4 h-4 ${values.featured ? "text-yellow-500 fill-yellow-500" : "text-muted-foreground"}`
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-foreground", children: "Featured" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: values.featured ? "Shown as featured on homepage" : "Not featured" })
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Switch,
                {
                  checked: values.featured,
                  onCheckedChange: (v) => set("featured", v),
                  "data-ocid": "property_form.featured_toggle"
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between rounded-xl bg-amber-50/60 dark:bg-amber-950/20 px-4 py-3 border border-amber-200/60 dark:border-amber-800/40", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  HardHat,
                  {
                    className: `w-4 h-4 ${values.isConstructionSite ? "text-amber-600" : "text-muted-foreground"}`
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-foreground", children: "Construction Site" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: values.isConstructionSite ? "Shows construction progress fields" : "Toggle to add construction details" })
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Switch,
                {
                  checked: values.isConstructionSite,
                  onCheckedChange: (v) => set("isConstructionSite", v),
                  "data-ocid": "property_form.construction_site_toggle"
                }
              )
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { children: values.isConstructionSite && /* @__PURE__ */ jsxRuntimeExports.jsx(
            motion.div,
            {
              initial: { opacity: 0, height: 0 },
              animate: { opacity: 1, height: "auto" },
              exit: { opacity: 0, height: 0 },
              transition: { duration: 0.25, ease: "easeInOut" },
              className: "overflow-hidden",
              children: /* @__PURE__ */ jsxRuntimeExports.jsxs(FormSection, { title: "Construction Details", icon: Construction, children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "constructionProgress", children: "Progress" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-sm font-semibold text-amber-600 tabular-nums", children: [
                      values.constructionProgressPercentage || 0,
                      "%"
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "input",
                    {
                      id: "constructionProgress",
                      type: "range",
                      min: 0,
                      max: 100,
                      step: 1,
                      value: values.constructionProgressPercentage || 0,
                      onChange: (e) => set("constructionProgressPercentage", e.target.value),
                      className: "w-full h-2 rounded-full accent-amber-500 cursor-pointer",
                      "data-ocid": "property_form.construction_progress_slider"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative h-3 rounded-full bg-muted overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                    motion.div,
                    {
                      className: "absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-amber-400 to-amber-600",
                      animate: {
                        width: `${values.constructionProgressPercentage || 0}%`
                      },
                      transition: { duration: 0.3 }
                    }
                  ) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Input,
                    {
                      type: "number",
                      min: 0,
                      max: 100,
                      placeholder: "0–100",
                      value: values.constructionProgressPercentage,
                      onChange: (e) => set("constructionProgressPercentage", e.target.value),
                      className: "w-24 text-sm",
                      "data-ocid": "property_form.construction_progress_input"
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid sm:grid-cols-2 gap-5", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "constructionPhase", children: "Current Phase" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Input,
                      {
                        id: "constructionPhase",
                        placeholder: "e.g. Foundation, Framing, Finishing",
                        value: values.constructionCurrentPhase,
                        onChange: (e) => set("constructionCurrentPhase", e.target.value),
                        "data-ocid": "property_form.construction_phase_input"
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "constructionStartDate", children: "Construction Start Date" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Input,
                      {
                        id: "constructionStartDate",
                        type: "date",
                        value: values.constructionStartDate,
                        onChange: (e) => set("constructionStartDate", e.target.value),
                        "data-ocid": "property_form.construction_start_input"
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "constructionExpected", children: "Expected Completion Date" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Input,
                      {
                        id: "constructionExpected",
                        type: "date",
                        value: values.constructionExpectedCompletion,
                        onChange: (e) => set("constructionExpectedCompletion", e.target.value),
                        "data-ocid": "property_form.construction_completion_input"
                      }
                    )
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "constructionUpdates", children: "Live Updates" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Textarea,
                    {
                      id: "constructionUpdates",
                      placeholder: "Latest progress update, recent milestones, upcoming work…",
                      rows: 3,
                      value: values.constructionLiveUpdates,
                      onChange: (e) => set("constructionLiveUpdates", e.target.value),
                      "data-ocid": "property_form.construction_updates_textarea"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Visible to buyers as a live site update" })
                ] })
              ] })
            }
          ) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(FormSection, { title: "Location", icon: MapPin, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Button,
                {
                  type: "button",
                  variant: "outline",
                  className: "gap-2 flex-1 sm:flex-none",
                  onClick: () => setShowMapPicker(true),
                  "data-ocid": "property_form.pick_on_map_button",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "w-4 h-4 text-primary" }),
                    "Pick on Map"
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Button,
                {
                  type: "button",
                  variant: "outline",
                  size: "sm",
                  onClick: handleUseLocation,
                  disabled: geoLoading,
                  className: "gap-1.5 text-xs",
                  "data-ocid": "property_form.use_location_button",
                  children: [
                    geoLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "w-3 h-3 animate-spin" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(LocateFixed, { className: "w-3 h-3" }),
                    "Use My Location"
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "button",
                {
                  type: "button",
                  onClick: () => setShowManualCoords((v) => !v),
                  className: "text-xs text-muted-foreground hover:text-foreground transition-colors ml-auto",
                  "data-ocid": "property_form.toggle_manual_coords",
                  children: [
                    showManualCoords ? "Hide" : "Show",
                    " manual entry"
                  ]
                }
              )
            ] }),
            values.latitude && values.longitude && /* @__PURE__ */ jsxRuntimeExports.jsxs(
              motion.div,
              {
                initial: { opacity: 0, height: 0 },
                animate: { opacity: 1, height: "auto" },
                className: "flex items-center gap-2 text-xs text-muted-foreground",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "w-3 h-3 text-primary shrink-0" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                    values.latitude,
                    ", ",
                    values.longitude
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "a",
                    {
                      href: `https://www.google.com/maps?q=${values.latitude},${values.longitude}`,
                      target: "_blank",
                      rel: "noopener noreferrer",
                      className: "text-primary hover:underline",
                      children: "Preview on Google Maps ↗"
                    }
                  )
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { children: showManualCoords && /* @__PURE__ */ jsxRuntimeExports.jsx(
              motion.div,
              {
                initial: { height: 0, opacity: 0 },
                animate: { height: "auto", opacity: 1 },
                exit: { height: 0, opacity: 0 },
                transition: { duration: 0.2 },
                className: "overflow-hidden",
                children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid sm:grid-cols-2 gap-5 pt-1", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { htmlFor: "latitude", children: [
                      "Latitude ",
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-destructive", children: "*" })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Input,
                      {
                        id: "latitude",
                        type: "number",
                        step: "any",
                        placeholder: "e.g. 28.535517",
                        value: values.latitude,
                        onChange: setStr("latitude"),
                        className: errors.latitude ? "border-destructive" : "",
                        "data-ocid": "property_form.latitude_input"
                      }
                    ),
                    errors.latitude && /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "p",
                      {
                        className: "text-xs text-destructive",
                        "data-ocid": "property_form.latitude_error",
                        children: errors.latitude
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { htmlFor: "longitude", children: [
                      "Longitude ",
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-destructive", children: "*" })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Input,
                      {
                        id: "longitude",
                        type: "number",
                        step: "any",
                        placeholder: "e.g. 77.391029",
                        value: values.longitude,
                        onChange: setStr("longitude"),
                        className: errors.longitude ? "border-destructive" : "",
                        "data-ocid": "property_form.longitude_input"
                      }
                    ),
                    errors.longitude && /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "p",
                      {
                        className: "text-xs text-destructive",
                        "data-ocid": "property_form.longitude_error",
                        children: errors.longitude
                      }
                    )
                  ] })
                ] })
              }
            ) }),
            values.latitude && values.longitude && !errors.latitude && !errors.longitude && /* @__PURE__ */ jsxRuntimeExports.jsx(
              motion.div,
              {
                initial: { opacity: 0, y: 8 },
                animate: { opacity: 1, y: 0 },
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                  PropertyMap,
                  {
                    mode: "view",
                    properties: [
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
                        notes: void 0,
                        featured: false,
                        tags: [],
                        viewCount: BigInt(0),
                        ownerId: null,
                        isConstructionSite: false
                      }
                    ],
                    className: ""
                  }
                )
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(FormSection, { title: "Tags", icon: Tag, collapsible: true, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              TagsInput,
              {
                tags: values.tags,
                onChange: (tags) => set("tags", tags)
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Tags are stored locally for display purposes. Click presets or add custom tags." })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(FormSection, { title: "Agent Contact Information", icon: Phone, collapsible: true, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid sm:grid-cols-2 gap-5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "contactPhone", children: "Contact Phone" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Input,
                  {
                    id: "contactPhone",
                    type: "tel",
                    placeholder: "+91 98765 43210",
                    value: values.contactPhone,
                    onChange: setStr("contactPhone"),
                    "data-ocid": "property_form.contact_phone_input"
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "contactWhatsApp", children: "WhatsApp Number" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Input,
                  {
                    id: "contactWhatsApp",
                    type: "tel",
                    placeholder: "+91 98765 43210",
                    value: values.contactWhatsApp,
                    onChange: setStr("contactWhatsApp"),
                    "data-ocid": "property_form.whatsapp_input"
                  }
                )
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Contact info is stored locally. Shown on property cards when backend support is added." })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(FormSection, { title: "Property Images", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Upload multiple images. Drag to reorder. Star sets the primary/cover image." }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              ImageManager,
              {
                images,
                primaryIndex,
                onImagesChange: setImages,
                onPrimaryChange: setPrimaryIndex,
                onPrimaryPersist: mode === "edit" && property ? (idx) => {
                  setPrimaryImageIndex.mutate({
                    propertyId: property.propertyId,
                    index: BigInt(idx)
                  });
                } : void 0,
                onUpload: handleUpload,
                uploading
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(FormSection, { title: "Additional", collapsible: true, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { htmlFor: "notes", children: [
                "Notes",
                " ",
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground text-xs", children: "(optional)" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Textarea,
                {
                  id: "notes",
                  placeholder: "Internal notes, special conditions, access instructions…",
                  rows: 2,
                  value: values.notes,
                  onChange: setStr("notes"),
                  "data-ocid": "property_form.notes_textarea"
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { htmlFor: "plotBoundary", children: [
                "Plot Boundary",
                " ",
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground text-xs", children: "(JSON coordinates, optional)" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Textarea,
                {
                  id: "plotBoundary",
                  placeholder: "[[28.53, 77.39], [28.54, 77.40], ...]",
                  rows: 3,
                  value: values.plotBoundaryJson,
                  onChange: setStr("plotBoundaryJson"),
                  className: "font-mono text-xs",
                  "data-ocid": "property_form.boundary_textarea"
                }
              )
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, {}),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-end gap-3 pb-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                type: "button",
                variant: "outline",
                onClick: () => navigate({ to: "/admin" }),
                disabled: submitting,
                "data-ocid": "property_form.cancel_button",
                children: "Cancel"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                type: "submit",
                disabled: submitting || uploading,
                className: "min-w-[130px]",
                "data-ocid": "property_form.submit_button",
                children: submitting ? /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "w-4 h-4 animate-spin" }),
                  "Saving…"
                ] }) : mode === "new" ? "Add Property" : "Save Changes"
              }
            )
          ] })
        ]
      }
    )
  ] });
}
export {
  PropertyForm as P
};

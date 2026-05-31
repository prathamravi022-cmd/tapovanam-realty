import type { ExternalBlob } from "./backend";

export { LegalStatus, PropertyStatus } from "./backend";
export type {
  Property,
  PropertyId,
  AddPropertyInput,
  UpdatePropertyInput,
  BuilderPartner,
  AddPartnerInput,
  UpdatePartnerInput,
  DealerProfile,
  ConstructionSiteFields,
} from "./backend";

export type PropertyImage = ExternalBlob;

export interface PropertyFilters {
  search: string;
  minPrice: string;
  maxPrice: string;
  minArea: string;
  maxArea: string;
  location: string;
  status: "all" | "available" | "sold" | "construction";
}

// Extended frontend metadata (stored locally or overlaid from backend)
export interface PropertyMeta {
  tags?: string[];
  featured?: boolean;
  viewCount?: number;
  contactPhone?: string;
  contactWhatsApp?: string;
  plotBoundary?: string;
}

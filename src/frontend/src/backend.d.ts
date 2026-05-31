import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export class ExternalBlob {
    getBytes(): Promise<Uint8Array<ArrayBuffer>>;
    getDirectURL(): string;
    static fromURL(url: string): ExternalBlob;
    static fromBytes(blob: Uint8Array<ArrayBuffer>): ExternalBlob;
    withUploadProgress(onProgress: (percentage: number) => void): ExternalBlob;
}
export type Timestamp = bigint;
export interface ConstructionSiteFields {
    currentPhase: string;
    expectedCompletionDate: string;
    constructionStartDate: string;
    progressPercentage: bigint;
    sitePhotos: Array<ExternalBlob>;
    liveUpdates: string;
}
export interface AddPropertyInput {
    latitude: number;
    title: string;
    featured: boolean;
    plotBoundary?: string;
    tags: Array<string>;
    description: string;
    legalStatus: LegalStatus;
    constructionFields?: ConstructionSiteFields;
    longitude: number;
    notes?: string;
    isConstructionSite: boolean;
    contactWhatsApp?: string;
    price: bigint;
    locationName: string;
    areaSizeSqFt: number;
    contactPhone?: string;
}
export interface BuilderPartner {
    id: string;
    websiteUrl: string;
    name: string;
    createdAt: Timestamp;
    logoUrl: string;
    isVerified: boolean;
    contactEmail: string;
    specialization: string;
    contactPhone: string;
}
export interface Property {
    status: PropertyStatus;
    latitude: number;
    title: string;
    featured: boolean;
    ownerId: Principal;
    plotBoundary?: string;
    tags: Array<string>;
    primaryImageIndex: bigint;
    description: string;
    propertyId: PropertyId;
    viewCount: bigint;
    legalStatus: LegalStatus;
    constructionFields?: ConstructionSiteFields;
    longitude: number;
    notes?: string;
    isConstructionSite: boolean;
    contactWhatsApp?: string;
    price: bigint;
    locationName: string;
    areaSizeSqFt: number;
    contactPhone?: string;
    dateAdded: Timestamp;
    images: Array<ExternalBlob>;
}
export interface DealerProfile {
    bio: string;
    name: string;
    designation: string;
    photoUrl: string;
    instagramUrl: string;
    email: string;
    experience: string;
    whatsappNumber: string;
    phone: string;
    facebookUrl: string;
    linkedinUrl: string;
}
export interface UpdatePartnerInput {
    websiteUrl?: string;
    name?: string;
    logoUrl?: string;
    isVerified?: boolean;
    contactEmail?: string;
    specialization?: string;
    contactPhone?: string;
}
export type PropertyId = string;
export interface AddPartnerInput {
    websiteUrl: string;
    name: string;
    logoUrl: string;
    isVerified: boolean;
    contactEmail: string;
    specialization: string;
    contactPhone: string;
}
export interface UpdatePropertyInput {
    latitude?: number;
    title?: string;
    featured?: boolean;
    plotBoundary?: string;
    tags?: Array<string>;
    primaryImageIndex?: bigint;
    description?: string;
    legalStatus?: LegalStatus;
    constructionFields?: ConstructionSiteFields;
    longitude?: number;
    notes?: string;
    isConstructionSite?: boolean;
    contactWhatsApp?: string;
    price?: bigint;
    locationName?: string;
    areaSizeSqFt?: number;
    contactPhone?: string;
}
export enum LegalStatus {
    not_approved = "not_approved",
    approved = "approved"
}
export enum PropertyStatus {
    sold = "sold",
    available = "available"
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export interface backendInterface {
    addImageToProperty(propertyId: PropertyId, image: ExternalBlob): Promise<void>;
    addPartner(input: AddPartnerInput): Promise<string>;
    addProperty(input: AddPropertyInput): Promise<PropertyId>;
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    deletePartner(partnerId: string): Promise<void>;
    deleteProperty(propertyId: PropertyId): Promise<void>;
    getAllPartners(): Promise<Array<BuilderPartner>>;
    getAllProperties(): Promise<Array<Property>>;
    getCallerUserRole(): Promise<UserRole>;
    getDealerProfile(): Promise<DealerProfile | null>;
    getPartner(partnerId: string): Promise<BuilderPartner | null>;
    getProperty(propertyId: PropertyId): Promise<Property | null>;
    incrementViewCount(propertyId: PropertyId): Promise<void>;
    isCallerAdmin(): Promise<boolean>;
    removeImageFromProperty(propertyId: PropertyId, imageIndex: bigint): Promise<void>;
    reorderImages(propertyId: PropertyId, newOrder: Array<bigint>): Promise<void>;
    setDealerProfile(profile: DealerProfile): Promise<void>;
    setPrimaryImageIndex(propertyId: PropertyId, index: bigint): Promise<void>;
    setPropertyStatus(propertyId: PropertyId, status: PropertyStatus): Promise<void>;
    updatePartner(partnerId: string, input: UpdatePartnerInput): Promise<void>;
    updateProperty(propertyId: PropertyId, input: UpdatePropertyInput): Promise<void>;
}

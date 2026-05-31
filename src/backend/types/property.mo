import Storage "mo:caffeineai-object-storage/Storage";
import Common "common";

module {
  public type LegalStatus = {
    #approved;
    #not_approved;
  };

  public type PropertyStatus = {
    #available;
    #sold;
  };

  // ── Construction site fields ─────────────────────────────────────────────

  public type ConstructionSiteFields = {
    progressPercentage : Nat;         // 0–100
    currentPhase : Text;
    expectedCompletionDate : Text;
    constructionStartDate : Text;
    liveUpdates : Text;
    sitePhotos : [Storage.ExternalBlob];
  };

  // ── Core property record ─────────────────────────────────────────────────

  public type Property = {
    propertyId : Common.PropertyId;
    title : Text;
    locationName : Text;
    latitude : Float;
    longitude : Float;
    areaSizeSqFt : Float;
    price : Nat;
    description : Text;
    legalStatus : LegalStatus;
    images : [Storage.ExternalBlob];
    primaryImageIndex : Nat;
    dateAdded : Common.Timestamp;
    status : PropertyStatus;
    notes : ?Text;
    ownerId : Principal;
    // ── Extensions ──────────────────────────────────────────────────────
    tags : [Text];
    featured : Bool;
    viewCount : Nat;
    contactPhone : ?Text;
    contactWhatsApp : ?Text;
    plotBoundary : ?Text;
    // ── Construction site ────────────────────────────────────────────────
    isConstructionSite : Bool;
    constructionFields : ?ConstructionSiteFields;
  };

  public type AddPropertyInput = {
    title : Text;
    locationName : Text;
    latitude : Float;
    longitude : Float;
    areaSizeSqFt : Float;
    price : Nat;
    description : Text;
    legalStatus : LegalStatus;
    notes : ?Text;
    tags : [Text];
    featured : Bool;
    contactPhone : ?Text;
    contactWhatsApp : ?Text;
    plotBoundary : ?Text;
    isConstructionSite : Bool;
    constructionFields : ?ConstructionSiteFields;
  };

  public type UpdatePropertyInput = {
    title : ?Text;
    locationName : ?Text;
    latitude : ?Float;
    longitude : ?Float;
    areaSizeSqFt : ?Float;
    price : ?Nat;
    description : ?Text;
    legalStatus : ?LegalStatus;
    primaryImageIndex : ?Nat;
    notes : ?Text;
    tags : ?[Text];
    featured : ?Bool;
    contactPhone : ?Text;
    contactWhatsApp : ?Text;
    plotBoundary : ?Text;
    isConstructionSite : ?Bool;
    constructionFields : ?ConstructionSiteFields;
  };
};

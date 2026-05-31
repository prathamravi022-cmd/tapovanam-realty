import Map "mo:core/Map";
import Time "mo:core/Time";
import Nat "mo:core/Nat";
import Int "mo:core/Int";
import Runtime "mo:core/Runtime";
import Storage "mo:caffeineai-object-storage/Storage";
import Types "../types/property";
import Common "../types/common";

module {
  // ── ID generation ─────────────────────────────────────────────────────────

  func generateId(counter : Nat) : Common.PropertyId {
    "prop-" # Time.now().toText() # "-" # counter.toText();
  };

  // ── CRUD ──────────────────────────────────────────────────────────────────

  public func createProperty(
    properties : Map.Map<Common.PropertyId, Types.Property>,
    nextId : { var value : Nat },
    caller : Principal,
    input : Types.AddPropertyInput,
  ) : Common.PropertyId {
    let id = generateId(nextId.value);
    nextId.value += 1;
    let property : Types.Property = {
      propertyId = id;
      title = input.title;
      locationName = input.locationName;
      latitude = input.latitude;
      longitude = input.longitude;
      areaSizeSqFt = input.areaSizeSqFt;
      price = input.price;
      description = input.description;
      legalStatus = input.legalStatus;
      images = [];
      primaryImageIndex = 0;
      dateAdded = Time.now();
      status = #available;
      notes = input.notes;
      ownerId = caller;
      tags = input.tags;
      featured = input.featured;
      viewCount = 0;
      contactPhone = input.contactPhone;
      contactWhatsApp = input.contactWhatsApp;
      plotBoundary = input.plotBoundary;
      isConstructionSite = input.isConstructionSite;
      constructionFields = input.constructionFields;
    };
    properties.add(id, property);
    id;
  };

  public func updateProperty(
    properties : Map.Map<Common.PropertyId, Types.Property>,
    propertyId : Common.PropertyId,
    input : Types.UpdatePropertyInput,
  ) : () {
    let existing = switch (properties.get(propertyId)) {
      case (?p) p;
      case null Runtime.trap("Property not found");
    };
    let updated : Types.Property = {
      existing with
      title = switch (input.title) { case (?v) v; case null existing.title };
      locationName = switch (input.locationName) { case (?v) v; case null existing.locationName };
      latitude = switch (input.latitude) { case (?v) v; case null existing.latitude };
      longitude = switch (input.longitude) { case (?v) v; case null existing.longitude };
      areaSizeSqFt = switch (input.areaSizeSqFt) { case (?v) v; case null existing.areaSizeSqFt };
      price = switch (input.price) { case (?v) v; case null existing.price };
      description = switch (input.description) { case (?v) v; case null existing.description };
      legalStatus = switch (input.legalStatus) { case (?v) v; case null existing.legalStatus };
      primaryImageIndex = switch (input.primaryImageIndex) { case (?v) v; case null existing.primaryImageIndex };
      notes = switch (input.notes) { case (?v) ?v; case null existing.notes };
      tags = switch (input.tags) { case (?v) v; case null existing.tags };
      featured = switch (input.featured) { case (?v) v; case null existing.featured };
      contactPhone = switch (input.contactPhone) { case (?v) ?v; case null existing.contactPhone };
      contactWhatsApp = switch (input.contactWhatsApp) { case (?v) ?v; case null existing.contactWhatsApp };
      plotBoundary = switch (input.plotBoundary) { case (?v) ?v; case null existing.plotBoundary };
      isConstructionSite = switch (input.isConstructionSite) { case (?v) v; case null existing.isConstructionSite };
      constructionFields = switch (input.constructionFields) { case (?v) ?v; case null existing.constructionFields };
    };
    properties.add(propertyId, updated);
  };

  public func deleteProperty(
    properties : Map.Map<Common.PropertyId, Types.Property>,
    propertyId : Common.PropertyId,
  ) : () {
    properties.remove(propertyId);
  };

  public func getProperty(
    properties : Map.Map<Common.PropertyId, Types.Property>,
    propertyId : Common.PropertyId,
  ) : ?Types.Property {
    properties.get(propertyId);
  };

  public func getAllProperties(
    properties : Map.Map<Common.PropertyId, Types.Property>,
  ) : [Types.Property] {
    properties.values().toArray();
  };

  // ── Image management ──────────────────────────────────────────────────────

  public func addImage(
    properties : Map.Map<Common.PropertyId, Types.Property>,
    propertyId : Common.PropertyId,
    image : Storage.ExternalBlob,
  ) : () {
    let existing = switch (properties.get(propertyId)) {
      case (?p) p;
      case null Runtime.trap("Property not found");
    };
    let updated : Types.Property = {
      existing with
      images = existing.images.concat([image]);
    };
    properties.add(propertyId, updated);
  };

  public func removeImage(
    properties : Map.Map<Common.PropertyId, Types.Property>,
    propertyId : Common.PropertyId,
    imageIndex : Nat,
  ) : () {
    let existing = switch (properties.get(propertyId)) {
      case (?p) p;
      case null Runtime.trap("Property not found");
    };
    let len = existing.images.size();
    if (imageIndex >= len) {
      Runtime.trap("Image index out of bounds");
    };
    // Build new array omitting the element at imageIndex using enumerate
    let newImages = existing.images.enumerate()
      .filterMap(
        func((idx, img)) {
          if (idx == imageIndex) null else ?img;
        }
      )
      .toArray();
    // Adjust primaryImageIndex if needed
    let newPrimary = if (existing.primaryImageIndex == imageIndex) {
      0;
    } else if (imageIndex < existing.primaryImageIndex) {
      existing.primaryImageIndex - 1;
    } else {
      existing.primaryImageIndex;
    };
    let updated : Types.Property = {
      existing with
      images = newImages;
      primaryImageIndex = newPrimary;
    };
    properties.add(propertyId, updated);
  };

  public func reorderImages(
    properties : Map.Map<Common.PropertyId, Types.Property>,
    propertyId : Common.PropertyId,
    newOrder : [Nat],
  ) : () {
    let existing = switch (properties.get(propertyId)) {
      case (?p) p;
      case null Runtime.trap("Property not found");
    };
    let imgs = existing.images;
    let reordered = newOrder.map(func(idx) {
      if (idx >= imgs.size()) Runtime.trap("Image index out of bounds");
      imgs[idx];
    });
    func findNewPrimaryIndex(order : [Nat], oldIndex : Nat) : Nat {
      func loop(i : Nat) : Nat {
        if (i >= order.size()) Runtime.trap("Primary image index missing in reorder");
        if (order[i] == oldIndex) {
          i
        } else {
          loop(i + 1)
        };
      };
      loop(0)
    };
    let newPrimary = findNewPrimaryIndex(newOrder, existing.primaryImageIndex);
    let updated : Types.Property = {
      existing with
      images = reordered;
      primaryImageIndex = newPrimary;
    };
    properties.add(propertyId, updated);
  };

  // ── View counter ──────────────────────────────────────────────────────────

  public func incrementViewCount(
    properties : Map.Map<Common.PropertyId, Types.Property>,
    propertyId : Common.PropertyId,
  ) : () {
    let existing = switch (properties.get(propertyId)) {
      case (?p) p;
      case null Runtime.trap("Property not found");
    };
    let updated : Types.Property = { existing with viewCount = existing.viewCount + 1 };
    properties.add(propertyId, updated);
  };

  public func setStatus(
    properties : Map.Map<Common.PropertyId, Types.Property>,
    propertyId : Common.PropertyId,
    status : Types.PropertyStatus,
  ) : () {
    let existing = switch (properties.get(propertyId)) {
      case (?p) p;
      case null Runtime.trap("Property not found");
    };
    let updated : Types.Property = { existing with status };
    properties.add(propertyId, updated);
  };

  public func setPrimaryImageIndex(
    properties : Map.Map<Common.PropertyId, Types.Property>,
    propertyId : Common.PropertyId,
    index : Nat,
  ) : () {
    let existing = switch (properties.get(propertyId)) {
      case (?p) p;
      case null Runtime.trap("Property not found");
    };
    if (index >= existing.images.size()) {
      Runtime.trap("Image index out of bounds");
    };
    let updated : Types.Property = { existing with primaryImageIndex = index };
    properties.add(propertyId, updated);
  };
};

import Map "mo:core/Map";
import Storage "mo:caffeineai-object-storage/Storage";
import AccessControl "mo:caffeineai-authorization/access-control";
import PropertyLib "../lib/property";
import Types "../types/property";
import Common "../types/common";

mixin (
  accessControlState : AccessControl.AccessControlState,
  properties : Map.Map<Common.PropertyId, Types.Property>,
  nextId : { var value : Nat },
) {
  // ── Public read ──────────────────────────────────────────────────────────

  public query func getAllProperties() : async [Types.Property] {
    PropertyLib.getAllProperties(properties);
  };

  public query func getProperty(propertyId : Common.PropertyId) : async ?Types.Property {
    PropertyLib.getProperty(properties, propertyId);
  };

  // ── View counter ─────────────────────────────────────────────────────────

  public func incrementViewCount(propertyId : Common.PropertyId) : async () {
    PropertyLib.incrementViewCount(properties, propertyId);
  };

  // ── Open-access CRUD (no auth required) ──────────────────────────────────

  public shared ({ caller }) func addProperty(input : Types.AddPropertyInput) : async Common.PropertyId {
    PropertyLib.createProperty(properties, nextId, caller, input);
  };

  public func updateProperty(
    propertyId : Common.PropertyId,
    input : Types.UpdatePropertyInput,
  ) : async () {
    PropertyLib.updateProperty(properties, propertyId, input);
  };

  public func deleteProperty(propertyId : Common.PropertyId) : async () {
    PropertyLib.deleteProperty(properties, propertyId);
  };

  // ── Image management ─────────────────────────────────────────────────────

  public func addImageToProperty(
    propertyId : Common.PropertyId,
    image : Storage.ExternalBlob,
  ) : async () {
    PropertyLib.addImage(properties, propertyId, image);
  };

  public func removeImageFromProperty(
    propertyId : Common.PropertyId,
    imageIndex : Nat,
  ) : async () {
    PropertyLib.removeImage(properties, propertyId, imageIndex);
  };

  public func reorderImages(
    propertyId : Common.PropertyId,
    newOrder : [Nat],
  ) : async () {
    PropertyLib.reorderImages(properties, propertyId, newOrder);
  };

  // ── Status management ────────────────────────────────────────────────────

  public func setPropertyStatus(
    propertyId : Common.PropertyId,
    status : Types.PropertyStatus,
  ) : async () {
    PropertyLib.setStatus(properties, propertyId, status);
  };

  public func setPrimaryImageIndex(
    propertyId : Common.PropertyId,
    index : Nat,
  ) : async () {
    PropertyLib.setPrimaryImageIndex(properties, propertyId, index);
  };
};

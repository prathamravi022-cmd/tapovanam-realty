import Map "mo:core/Map";
import Time "mo:core/Time";
import Types "../types/partner";

module {
  public func createPartner(
    partners : Map.Map<Text, Types.BuilderPartner>,
    nextId : { var value : Nat },
    input : Types.AddPartnerInput,
  ) : Text {
    let id = debug_show(nextId.value);
    nextId.value += 1;
    partners.add(id, {
      id = id;
      name = input.name;
      logoUrl = input.logoUrl;
      specialization = input.specialization;
      contactPhone = input.contactPhone;
      contactEmail = input.contactEmail;
      websiteUrl = input.websiteUrl;
      isVerified = input.isVerified;
      createdAt = Time.now();
    });
    id
  };

  public func updatePartner(
    partners : Map.Map<Text, Types.BuilderPartner>,
    partnerId : Text,
    input : Types.UpdatePartnerInput,
  ) : () {
    switch (partners.get(partnerId)) {
      case null {};
      case (?existing) {
        partners.add(partnerId, { existing with
          name = switch (input.name) { case null existing.name; case (?v) v };
          logoUrl = switch (input.logoUrl) { case null existing.logoUrl; case (?v) v };
          specialization = switch (input.specialization) { case null existing.specialization; case (?v) v };
          contactPhone = switch (input.contactPhone) { case null existing.contactPhone; case (?v) v };
          contactEmail = switch (input.contactEmail) { case null existing.contactEmail; case (?v) v };
          websiteUrl = switch (input.websiteUrl) { case null existing.websiteUrl; case (?v) v };
          isVerified = switch (input.isVerified) { case null existing.isVerified; case (?v) v };
        });
      };
    };
  };

  public func deletePartner(
    partners : Map.Map<Text, Types.BuilderPartner>,
    partnerId : Text,
  ) : () {
    ignore partners.remove(partnerId);
  };

  public func getPartner(
    partners : Map.Map<Text, Types.BuilderPartner>,
    partnerId : Text,
  ) : ?Types.BuilderPartner {
    partners.get(partnerId)
  };

  public func getAllPartners(
    partners : Map.Map<Text, Types.BuilderPartner>,
  ) : [Types.BuilderPartner] {
    partners.values().toArray()
  };

  public func getDealerProfile(
    profileState : { var profile : ?Types.DealerProfile },
  ) : ?Types.DealerProfile {
    profileState.profile
  };

  public func setDealerProfile(
    profileState : { var profile : ?Types.DealerProfile },
    profile : Types.DealerProfile,
  ) : () {
    profileState.profile := ?profile;
  };
};

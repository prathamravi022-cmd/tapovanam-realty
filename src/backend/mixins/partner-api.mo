import Map "mo:core/Map";
import PartnerLib "../lib/partner";
import Types "../types/partner";

mixin (
  partners : Map.Map<Text, Types.BuilderPartner>,
  nextPartnerId : { var value : Nat },
  dealerProfileState : { var profile : ?Types.DealerProfile },
) {
  // ── Builder Partners ─────────────────────────────────────────────────────

  public query func getAllPartners() : async [Types.BuilderPartner] {
    PartnerLib.getAllPartners(partners);
  };

  public query func getPartner(partnerId : Text) : async ?Types.BuilderPartner {
    PartnerLib.getPartner(partners, partnerId);
  };

  public func addPartner(input : Types.AddPartnerInput) : async Text {
    PartnerLib.createPartner(partners, nextPartnerId, input);
  };

  public func updatePartner(partnerId : Text, input : Types.UpdatePartnerInput) : async () {
    PartnerLib.updatePartner(partners, partnerId, input);
  };

  public func deletePartner(partnerId : Text) : async () {
    PartnerLib.deletePartner(partners, partnerId);
  };

  // ── Dealer Profile ────────────────────────────────────────────────────────

  public query func getDealerProfile() : async ?Types.DealerProfile {
    PartnerLib.getDealerProfile(dealerProfileState);
  };

  public func setDealerProfile(profile : Types.DealerProfile) : async () {
    PartnerLib.setDealerProfile(dealerProfileState, profile);
  };
};

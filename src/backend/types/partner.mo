import Debug "mo:core/Debug";
import Common "common";

module {
  public type BuilderPartner = {
    id : Text;
    name : Text;
    logoUrl : Text;
    specialization : Text;
    contactPhone : Text;
    contactEmail : Text;
    websiteUrl : Text;
    isVerified : Bool;
    createdAt : Common.Timestamp;
  };

  public type AddPartnerInput = {
    name : Text;
    logoUrl : Text;
    specialization : Text;
    contactPhone : Text;
    contactEmail : Text;
    websiteUrl : Text;
    isVerified : Bool;
  };

  public type UpdatePartnerInput = {
    name : ?Text;
    logoUrl : ?Text;
    specialization : ?Text;
    contactPhone : ?Text;
    contactEmail : ?Text;
    websiteUrl : ?Text;
    isVerified : ?Bool;
  };

  public type DealerProfile = {
    name : Text;
    email : Text;
    phone : Text;
    whatsappNumber : Text;
    photoUrl : Text;
    designation : Text;
    experience : Text;
    bio : Text;
    linkedinUrl : Text;
    instagramUrl : Text;
    facebookUrl : Text;
  };
};

import Map "mo:core/Map";
import AccessControl "mo:caffeineai-authorization/access-control";
import MixinAuthorization "mo:caffeineai-authorization/MixinAuthorization";
import MixinObjectStorage "mo:caffeineai-object-storage/Mixin";
import PropTypes "types/property";
import PartnerTypes "types/partner";
import Common "types/common";
import PropertyMixin "mixins/property-api";
import PartnerMixin "mixins/partner-api";



actor {
  // ── Authorization state ──────────────────────────────────────────────────
  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  // ── Object storage ───────────────────────────────────────────────────────
  include MixinObjectStorage();

  // ── Property state ───────────────────────────────────────────────────────
  let properties = Map.empty<Common.PropertyId, PropTypes.Property>();
  let nextPropertyId = { var value : Nat = 0 };

  include PropertyMixin(accessControlState, properties, nextPropertyId);

  // ── Partner & dealer state ───────────────────────────────────────────────
  let partners = Map.empty<Text, PartnerTypes.BuilderPartner>();
  let nextPartnerId = { var value : Nat = 0 };
  let dealerProfileState = { var profile : ?PartnerTypes.DealerProfile = null };

  include PartnerMixin(partners, nextPartnerId, dealerProfileState);
};

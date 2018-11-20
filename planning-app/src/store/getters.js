export function getPropertyType (state) {
  return state.site.siteInfo.propertyType;
}

export function isInConservationArea (state) {
  return state.site.siteConstraints.conservationArea;
}
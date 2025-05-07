export const extractLatLng = (url) => {
  // Try to extract from `!3dLAT!4dLON` pattern
  const match1 = url.match(/!3d([-.\d]+)!4d([-.\d]+)/);
  if (match1) {
    return {
      lat: parseFloat(match1[1]),
      lng: parseFloat(match1[2])
    };
  }

  // Fallback: Try to extract from `@LAT,LON` pattern
  const match2 = url.match(/@([-.\d]+),([-.\d]+)/);
  if (match2) {
    return {
      lat: parseFloat(match2[1]),
      lng: parseFloat(match2[2])
    };
  }

  return null;
};

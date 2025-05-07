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

export const haversineDistance = (coords1, coords2) => {
  const toRad = (x) => (x * Math.PI) / 180;
  const R = 6371; // Earth radius in kilometers 6371

  const dLat = toRad(coords2.latitude - coords1.latitude);
  const dLon = toRad(coords2.longitude - coords1.longitude);
  const lat1 = toRad(coords1.latitude);
  const lat2 = toRad(coords2.latitude);

  const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c; // Distance in km
};

export const calculateDeliveryTime = (coords1, coords2) => {
  const distance = haversineDistance(coords1, coords2);
  const speedKmH = 50; // Average speed in km/h
  const timeHours = distance / speedKmH;
  const travelMinutes = Math.ceil(timeHours * 60);
  
  // Total time is preparation time plus travel time
  return travelMinutes;
};

import request from './request';
export function getCoord(number, ref) {
  var l = number[0].numerator + number[1].numerator /
    (60 * number[1].denominator) + number[2].numerator / (3600 * number[2].denominator);
  if (ref == 'W'|'S') {
    return l*(-1)
  } else {
    return l
  }
}

export function reverseGeocode(lat, lng){
  var url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=AIzaSyCN9joc20fO_YTL4VRhjeOtcdC3i04zGCs`
  return request({url: url})
      .then((data) => {
        return data;
      })
        .catch((err) => {
          return({
            formatted_address: `Reverse geocoding failed. Coordinates for this image are latitude: ${lat}, longitude: ${lng}`,
            geometry: {
              location: {
                lat: lat,
                lng: lng
              }
            },
            city: 'Unknown',
          })
  });
}

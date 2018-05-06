import Geocode from "react-geocode";

// set Google Maps Geocoding API for purposes of quota management. Its optional but recommended.
Geocode.setApiKey("AIzaSyANdKUYXmjnx4KOBkYvNMuPOZ0UP9hYczc");

// Enable or disable logs. Its optional.
Geocode.enableDebug();

export const getPositionFromAddress = address => {
    return Geocode.fromAddress(address);
};

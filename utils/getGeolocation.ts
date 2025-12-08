export const getGeolocation = (onSetLatLong: (latitude: number, longitude: number) => void) => {
  if (!navigator.geolocation) {
    console.error("Geolocation is not supported by your browser");
    return;
  }

  navigator.geolocation.getCurrentPosition(
    (position) => {
      onSetLatLong(position.coords.latitude, position.coords.longitude);
    },
    (err) => {
      console.error(err.message);
    },
  );
}

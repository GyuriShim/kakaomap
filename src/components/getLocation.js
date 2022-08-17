function getLocation() {
    if (navigator.geolocation) {
      return new Promise(resolve => {
        navigator.geolocation.getCurrentPosition(
          function(position) {
            console.info(
              `re:${position.coords.latitude} ${position.coords.longitude}`,
            );
            resolve({
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
            });
          },
          function(error) {
            console.error(error);
            resolve({
              latitude: 37.3595704,
              longitude: 127.105399,
            });
          },
          {
            enableHighAccuracy: false,
            maximumAge: 1000,
            timeout: 20000,
          },
        );
      }).then(coords => {
        console.log(`coords:${JSON.stringify(coords)}`);
        return coords;
      });
    }
    console.info('GPS를 지원하지 않습니다');
    return {
      latitude: 37.3595704,
      longitude: 127.105399,
    };
  }

export {getLocation}
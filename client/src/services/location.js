import axios from "axios";

const getPosition =  () => {
  return new Promise((resolve, reject)=> {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
}

export const setLocation = () => {
  return getPosition().then(positionData => {
    let {latitude, longitude} = positionData.coords
      let userLocation = [latitude, longitude];
      console.log(userLocation);
      // user.geolocation = userLocation;
      return axios.post("/locate", (userLocation))
        .then((data) => {
          console.log(data);
          return {
            userChatroom: data.data,
            userLocation: userLocation
          }
        })
        .catch(err => console.log(err))
  });
};

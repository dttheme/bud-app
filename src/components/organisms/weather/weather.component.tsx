import React from "react";
import axios from "axios";

const zipCode = 30312;
export const Weather = () => {
  const GET_WEATHER = zipCode => {
    axios({
      method: "get",
      url: `http://api.openweathermap.org/data/2.5/forecast?zip=${zipCode}&APPID={${
        process.env.REACT_APP_OPEN_WEATHER_KEY
      }}`
    })
      .then(response => {
        console.log(response.data);
        // setResponseData(response.data);
      })
      // .then(() => {
      //   setIsLoading(false);
      //   setSearchResultsLoaded(true);
      // });
      .catch(err => console.log(err));
  };
  GET_WEATHER(zipCode);
  return <div>HELLO!</div>;
};

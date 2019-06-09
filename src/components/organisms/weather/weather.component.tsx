import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "./weather.module.scss";

const zipCode = 30312;

type ResponseDataType = {
  city: string;
  weatherArray: [
    { dt: number; weather: { main: ""; description: ""; icon: "" }[] }
  ];
};
export const Weather = () => {
  const [responseData, setResponseData] = useState<
    ResponseDataType | undefined
  >(undefined);
  const GET_WEATHER = zipCode => {
    axios({
      method: "get",
      url: `http://api.openweathermap.org/data/2.5/forecast?zip=${zipCode}&APPID=${
        process.env.REACT_APP_OPEN_WEATHER_KEY
      }`
    })
      .then(response => {
        console.log(response.data.city);
        console.log(response.data.list);
        setResponseData({
          city: response.data.city.name,
          weatherArray: response.data.list
        });
      })
      // .then(() => {
      //   setIsLoading(false);
      //   setSearchResultsLoaded(true);
      // });
      .catch(err => console.log(err));
  };
  useEffect(() => {
    GET_WEATHER(zipCode);
  }, []);
  let setDays = new Set();
  return (
    <div>
      <div>How's the weather in {responseData && responseData.city}?</div>
      {responseData &&
        responseData.weatherArray.map(weatherEvent => {
          let date = new Date(weatherEvent.dt * 1000).toLocaleDateString(
            "en-US",
            {
              weekday: "short",
              // year: "numeric",
              month: "short",
              day: "numeric",
              hour: "numeric"
            }
          );
          const dayOfTheWeek = date.slice(0, 3);
          setDays.add(dayOfTheWeek);
          console.log(setDays.has(dayOfTheWeek));
          return (
            <div key={weatherEvent.dt} className={styles.weatherEventWrapper}>
              {setDays[dayOfTheWeek] ? null : (
                <span className={styles.date}>{date}</span>
              )}
              <span>
                {weatherEvent.weather[0].main} -{" "}
                {weatherEvent.weather[0].description}
                <img
                  className={styles.weatherIcon}
                  src={`http://openweathermap.org/img/w/${
                    weatherEvent.weather[0].icon
                  }.png`}
                  alt=""
                />
              </span>
            </div>
          );
        })}
    </div>
  );
};

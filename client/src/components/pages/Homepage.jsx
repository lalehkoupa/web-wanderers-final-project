import React from "react";
import Hero from "../molecules/Hero.jsx";
import Classes from "../molecules/Classes.jsx";
import { useState } from "react";

const Homepage = () => {
  const [data, setData] = useState([]);

  const getData = async () => {
    const res = await fetch("https://web-wanderers-cyf.herokuapp.com/jobs");
    const data = await res.json();
    setData(data);
  };
  console.log(data);

  const filteredArray = [];

  data.map((item) => {
    filteredArray.push(
      (({ date, availableSpots }) => ({ date, availableSpots }))(item)
    );
  });
  const sumObject = {};

  filteredArray.map((item) => {
    if (sumObject.hasOwnProperty(item.date)) {
      sumObject[item.date] =
        parseInt(sumObject[item.date]) + parseInt(item.availableSpots);
    } else {
      sumObject[item.date] = item.availableSpots;
    }
  });
  const sumArray = [];

  for (let key in sumObject)
    sumArray.push({ date: key, availableSpots: sumObject[key] });

  return (
    <div>
      <Hero text="Can You Help?" />
      <div class="container-fluid text-center bg-yellow_green">
        <p class="pb-2 pt-2 h3 mb-4">
          New venue: Stoke Newington School, Clissold Road N16 9EX
        </p>
      </div>
      <div class="container col-10">
        <p>
          There are Lots of ways you can get involved here at AKWAABA. You can
          help as a kitchen supervisor, driver, etc. You can choose suitable
          roles and time from available times and slots below.
        </p>
      </div>
      <Classes />
    </div>
  );
};

export default Homepage;

import { useEffect, useState } from "react";
import ClassRow from "./ClassRow";
import _ from "lodash";

const Classes = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const res = await fetch("http://localhost:4000/api/job");
    const data = await res.json();

    setData(data);
  };
  const arrangeJobsByDate = (data) => {
    let filterArray = [];
    data.map((item) => {
      filterArray.push(
        (({ date, slots, filledSlots }) => ({ date, slots, filledSlots }))(item)
      );
    });
    console.log(filterArray);
    return filterArray;
    const sumObject = {};
  };
  console.log(arrangeJobsByDate(data));
  // const filteredArray = [];

  // jobs.map((item) => {
  //   filteredArray.push((({ date, slots }) => ({ date, slots }))(item));
  // });
  // const sumObject = {};

  // filteredArray.map((item) => {
  //   if (sumObject.hasOwnProperty(item.date)) {
  //     sumObject[item.date] =
  //       parseInt(sumObject[item.date]) + parseInt(item.availableSpots);
  //   } else {
  //     sumObject[item.date] = item.availableSpots;
  //   }
  // });
  // const sumArray = [];

  // for (let key in sumObject)
  //   sumArray.push({ date: key, availableSpots: sumObject[key] });

  console.log(data);
  return (
    <>
      <h2 className="text-center fw-bold">Availabe Dates and Slots</h2>
      <div className="row d-flex justify-content-center mb-5">
        {_.map(data, (oneClass, index) => (
          <ClassRow
            key={index}
            available={oneClass.openSlots}
            date={oneClass.weekDate}
            filled={oneClass.filledSlots}
          />
        ))}
      </div>
    </>
  );
};
export default Classes;

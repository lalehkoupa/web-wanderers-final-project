import { useEffect, useState } from "react";
import ClassRow from "./ClassRow";

const Classes = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    fetch("http://localhost:4000/jobs")
      .then((res) => res.json())
      .then((data) => setData(data));
  }, []);

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

  console.log(data);

  return (
    <>
      <h2 class="text-center fw-bold">Availabe Dates and Slots</h2>
      <div class="row d-flex justify-content-center m-3 mb-5">
        {sumArray.map((oneClass, index) => (
          <ClassRow
            key={index}
            available={oneClass.availableSpots}
            date={oneClass.date}
            filled={oneClass.filled}
            startTime={oneClass.startTime}
            endTime={oneClass.endTime}
          />
        ))}
      </div>
    </>
  );
};
export default Classes;

import { useEffect, useState } from "react";
import ClassRow from "./ClassRow";

const Classes = () => {
  // useEffect(() => {
  //   fetch("http://localhost:4000/jobs")
  //     .then((res) => res.json())
  //     .then((data) => console.log(data));
  // }, []);
  const dummyData = [
    {
      date: "24-07-2022",
      availableSpots: 24,
      filled: 13,
    },
    {
      date: "26-07-2022",
      availableSpots: 2,
      filled: 1,
    },
    {
      date: "28-07-2022",
      availableSpots: 2,
      filled: 1,
    },
    {
      date: "16-07-2022",
      availableSpots: 2,
      filled: 2,
    },
  ];

  const [data, setData] = useState(dummyData);

  return (
    <>
      <h2 class="text-center fw-bold">Availabe Dates and Slots</h2>
      {data.map((oneClass, index) => (
        <ClassRow
          key={index}
          available={oneClass.availableSpots}
          date={oneClass.date}
          filled={oneClass.filled}
          startTime={oneClass.startTime}
          endTime={oneClass.endTime}
        />
      ))}
    </>
  );
};
export default Classes;

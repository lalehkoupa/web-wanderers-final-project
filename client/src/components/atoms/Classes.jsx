import { useEffect, useState } from "react";
import ClassRow from "../molecules/ClassRow";

const Classes = () => {
  const [data, setData] = useState();

  useEffect(() => {
    fetch("")
      .then((res) => res.json())
      .then((data) => setData(data));
  }, []);

  return data.map((oneClass, index) => (
    <ClassRow
      key={index}
      available={oneClass.availableSpots}
      date={oneClass.date}
      filled={oneClass.filled}
    />
  ));
};
export default Classes;

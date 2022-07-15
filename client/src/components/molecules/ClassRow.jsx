import { useState } from "react";
import { Link } from "react-router-dom";

const ClassRow = ({ available, filled, date }) => {
  const [selectedDate, setSelectedDate] = useState("");
  const handleChange = () => {
    console.log(date);
    setSelectedDate(date);
  };
  console.log(selectedDate);

  // const newTo = {
  //   pathname: "/contact",
  //   state: `${selectedDate}`,
  // };
  return (
    <>
      <div class="container d-flex flex-column align-items-center mt-4 bg-yellow_green col-8 pt-2 pb-2">
        <p class="mb-1">
          {filled} of {available} Slots Filled
        </p>
        <>
          <Link to={`/rota/${date}`}>
            <button
              type="button"
              class="btn btn-primary mt-0"
              onClick={handleChange}
            >
              {date}
            </button>
          </Link>
        </>
        {/* <div type="button" class="btn btn-primary mt-0">
          <a href="{}">{date}</a>
        </div> */}
      </div>
    </>
  );
};
export default ClassRow;

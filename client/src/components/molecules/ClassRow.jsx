const ClassRow = ({ available, filled, date }) => {
  return (
    <>
      <div className="">
        <p>
          {filled} of {available} Slots Filled
        </p>
        <div className="">
          <a href="{}">{date}</a>
        </div>
      </div>
    </>
  );
};
export default ClassRow;

const ClassRow = ({ available, filled, date }) => {
  return (
    <>
      <div>
        <p>
          {filled} of {available} Slots Filled
        </p>
        <div>
          <a href="{}">{date}</a>
        </div>
      </div>
    </>
  );
};
export default ClassRow;

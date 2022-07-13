const ClassRow = ({ available, filled, date }) => {
  console.log(available);
  console.log(filled);

  return (
    <>
      <div class="container fw-bold d-flex flex-column align-items-center mt-4 bg-yellow_green col-4 pt-2 pb-2">
        <p class="mb-1 font-weigth-bold">
          {filled} of {available} Slots Filled
        </p>
        <button type="button" class="btn btn-primary mt-0">
          {date}
        </button>
        {/* <div type="button" class="btn btn-primary mt-0">
          <a href="{}">{date}</a>
        </div> */}
      </div>
    </>
  );
};
export default ClassRow;

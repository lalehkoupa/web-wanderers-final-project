import { Link } from "react-router-dom";

const ClassRow = ({ available, filled, date }) => {
  const formatDate=date.replaceAll('/','-')
  
  return (
    <div class="col-8 col-md-3">
      <div class=" d-flex flex-column align-items-center mt-4 bg-yellow_green pt-2 pb-2">
        <p class="mb-1">
          {filled} of {available} Slots Filled
        </p>
        <>
          <Link to={`/rota/${formatDate}`}>
            <button
              type="button"
              class="btn btn-primary mt-0"
            >
              {date}
            </button>
          </Link>
        </>
      </div>
    </div>
  );
};
export default ClassRow;

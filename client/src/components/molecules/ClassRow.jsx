import { Link } from "react-router-dom";

const ClassRow = ({ available, filled, date }) => {
  const formatDate=date.replaceAll('/','-')
  
  return (
    <div className="col-8 col-md-3">
      <div className=" d-flex flex-column align-items-center mt-4 bg-yellow_green pt-2 pb-2">
        <p className="mb-1">
          {filled} of {available} Slots Filled
        </p>
        <>
          <Link to={`/rota/${formatDate}`}>
            <button
              type="button"
              className="btn btn-primary mt-0"
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

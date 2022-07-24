import React from "react";
import { Link } from "react-router-dom";

const Posts = ({ isChecked, setIsChecked, posts }) => {
  const handleClick = (event) => {
    const keyIndex = event.target.value;
    const index = isChecked.indexOf(keyIndex);
    let listChecked = [...isChecked];
    if (index === -1 && event.target.checked)
      setIsChecked(listChecked.concat(keyIndex));
    if (index !== -1 && !event.target.checked) {
      listChecked.splice(index, 1);
      setIsChecked(listChecked);
    }
  };

  return (
    <div className="card">
      {posts.map((rota) => (
        <div className="rota_container2 card-body  m-1 list-group-item d-flex justify-content-between align-items-start">
          <span>
            <h5 className="card-title">{rota.jobTitle}</h5>
            <p className="card-text">
              {" "}
              {rota.startTime} - {rota.endTime}
            </p>
          </span>

          <span class="badge rota_container2 ">
            <ul className="list-group">
              <li className="list-group-item rota_container">
                {" "}
                1 of {rota.availableSpots} slots filled{" "}
              </li>
              <li className="list-group-item rota_container">
                <Link
                  to={`/signUp/${rota.id}/${rota.jobTitle}/${rota.date}/${rota.startTime}-${rota.endTime}`}
                >
                  <button type="button" class="btn btn-primary mt-0">
                    Sign Up
                  </button>
                </Link>
              </li>
            </ul>
          </span>
        </div>
      ))}{" "}
    </div>
  );
};

export default Posts;

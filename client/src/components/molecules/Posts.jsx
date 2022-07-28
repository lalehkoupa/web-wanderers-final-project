import React from "react";
import { Link } from "react-router-dom";

const Posts = ({  posts }) => {


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

          <span className="badge rota_container2 ">
            <ul className="list-group">
              <li className="list-group-item rota_container">
                {" "}
                1 of {rota.availableSpots} slots filled{" "}
              </li>
              <li className="list-group-item rota_container">
                <Link
                  to={`/signUp/${rota.id}/${rota.jobTitle}/${rota.date}/${rota.startTime}-${rota.endTime}`}
                >
                  <button type="button" className="btn btn-primary mt-0">
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

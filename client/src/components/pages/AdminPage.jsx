import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleUser } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { useEffect, useState } from "react";
import AdminVolunteerList from "../molecules/AdminVolunteerList";
import AdminRolesList from "../molecules/AdminRolesList";
import AdminForm from "../molecules/AdminForm";
import AdminSignUp from "../molecules/AdminSignUp";

const AdminPage = () => {
  const [isActive, setIsActive] = useState(1);
  const [jobData, setJobData] = useState();
  const [userData, setUserData] = useState();
  const [totalJobs, setTotaljobs] = useState("");
  const [addJobActive, setAddJobActive] = useState(false);

  const fetchUserData = async () => {
    const res = await axios.get("http://localhost:8000/api/user");
    const data = await res.json();
    setUserData(data);
  };
  const fetchJobData = async () => {
    const res = await fetch("http://localhost:8000/api/jobs");
    const data = await res.json();
    setJobData(data);
  };

  useEffect(() => {
    fetchUserData();
    fetchJobData();
  }, []);

  console.log(jobData);
  console.log(userData);

  const handleClick = () => {};

  // const dummyData = [
  //   {
  //     firsName: "Alec",
  //     lastName: "Mike",
  //     date: "22-08-2022",
  //     startime: "12:00",
  //     endtime: "15:00",
  //     jobTitle: "Saturday Driver",
  //   },
  //   {
  //     firsName: "Helen",
  //     lastName: "Diba",
  //     date: "22-08-2022",
  //     startime: "11:00",
  //     endtime: "16:00",
  //     jobTitle: "Gate volunteer",
  //   },
  //   {
  //     firsName: "Ahmed",
  //     lastName: "Ali",
  //     date: "22-08-2022",
  //     startime: "9:00",
  //     endtime: "12:00",
  //     jobTitle: "Kitchen volunteer",
  //   },
  // ];

  return (
    <>
      {/* <div className=" d-flex flex-row align-items-center justify-content-end mb-5 px-5">
        <span className="d-flex flex-column align-items-end">
          <p className="m-0 h5">Admin Name</p>
          <button className="text-danger border-0 bg-white">Log out</button>
          <></>
        </span>
        <FontAwesomeIcon style={{ height: "45px" }} icon={faCircleUser} />
      </div> */}
      {addJobActive ? (
        <AdminForm setAddJobActive={setAddJobActive} />
      ) : (
        <>
          <span className="container d-flex justify-content-center gap-4 mb-5">
            <button
              onClick={() => {
                setIsActive(1);
                setTotaljobs(userData.length);
              }}
              className={
                isActive === 1
                  ? "border border-3 border-primary bg-primary text-white px-5 py-1"
                  : isActive === 2
                  ? "border border-3 border-primary bg-white text-primary px-5 py-1 "
                  : "border border-3 border-primary bg-primary text-white px-5 py-1"
              }
            >
              Volunteer list
            </button>
            <button
              onClick={() => {
                setIsActive(2);
                setTotaljobs(jobData.length);
              }}
              className={
                isActive === 1
                  ? "border border-3 border-primary bg-white text-primary px-5 py-1 "
                  : isActive === 2
                  ? "border border-3 border-primary bg-primary text-white px-5 py-1"
                  : "border border-3 border-primary bg-white text-primary px-5 py-1 "
              }
            >
              Roles
            </button>
            <button
              onClick={() => setIsActive(3)}
              className=" border border-3 border-dark bg-white text-dark px-5 py-1 "
            >
              Add new admin
            </button>
          </span>
          {isActive === 1 ? (
            <AdminVolunteerList data={userData} totalJobs={totalJobs} />
          ) : isActive === 2 ? (
            <AdminRolesList
              setAddJobActive={setAddJobActive}
              data={jobData}
              totalJobs={totalJobs}
            />
          ) : (
            <AdminSignUp />
          )}
          )
        </>
      )}
    </>
  );
};
export default AdminPage;

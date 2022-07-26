import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleUser } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { useEffect, useState } from "react";
import AdminVolunteerList from "../molecules/AdminVolunteerList";
import AdminRolesList from "../molecules/AdminRolesList";
import AdminForm from "./AdminForm";

const AdminPage = () => {
  //   useEffect(() => {
  //     const fetchData = async () => {
  //       const res= await axios.get("process.env.PUBLIC_URL/weeks");
  //       setData(res.data);
  //     };
  //     fetchData();
  //   }, []);
  const dummyData = [
    {
      firsName: "Alec",
      lastName: "Mike",
      date: "22-08-2022",
      startime: "12:00",
      endtime: "15:00",
      jobTitle: "Saturday Driver",
    },
    {
      firsName: "Helen",
      lastName: "Diba",
      date: "22-08-2022",
      startime: "11:00",
      endtime: "16:00",
      jobTitle: "Gate volunteer",
    },
    {
      firsName: "Ahmed",
      lastName: "Ali",
      date: "22-08-2022",
      startime: "9:00",
      endtime: "12:00",
      jobTitle: "Kitchen volunteer",
    },
  ];
  const [isActive, setIsActive] = useState(true);
  const [data, setData] = useState(dummyData);
  const [totalJobs, setTotaljobs] = useState(data.length);
  const [addJobActive, setAddJobActive] = useState(false);

  return (
    <>
      <div className=" d-flex flex-row align-items-center justify-content-end mb-5 px-5">
        <span className="d-flex flex-column align-items-end">
          <p className="m-0 h5">Admin className</p>
          <button className="text-danger border-0 bg-white">Log out</button>
          <></>
        </span>
        <FontAwesomeIcon style={{ height: "45px" }} icon={faCircleUser} />
      </div>
      {addJobActive ? (
        <AdminForm setAddJobActive={setAddJobActive} />
      ) : (
        <>
          <span className="container d-flex justify-content-center gap-4 mb-5">
            <button
              onClick={() => setIsActive(true)}
              className={
                isActive
                  ? "border border-3 border-primary bg-primary text-white px-5 py-1"
                  : "border border-3 border-primary bg-white text-primary px-5 py-1 "
              }
            >
              Volunteer list
            </button>
            <button
              onClick={() => setIsActive(false)}
              className={
                isActive
                  ? "border border-3 border-primary bg-white text-primary px-5 py-1 "
                  : "border border-3 border-primary bg-primary text-white px-5 py-1"
              }
            >
              Roles
            </button>
          </span>
          {isActive ? (
            <AdminVolunteerList data={data} totalJobs={totalJobs} />
          ) : (
            <AdminRolesList
              setAddJobActive={setAddJobActive}
              data={data}
              totalJobs={totalJobs}
            />
          )}
        </>
      )}
    </>
  );
};
export default AdminPage;

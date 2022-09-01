import { useEffect, useState } from "react";
import AdminVolunteerList from "../molecules/AdminVolunteerList";
import AdminRolesList from "../molecules/AdminRolesList";
import AdminForm from "../molecules/AdminForm";
import AdminSignUp from "../molecules/AdminSignUp";

const AdminPage = ({ type }) => {
  const [isActive, setIsActive] = useState(1);
  const [userData, setUserData] = useState();
  const [jobData, setJobData] = useState();
  const [totalJobs, setTotaljobs] = useState("");
  const [addJobActive, setAddJobActive] = useState(false);

  const API_PATH = process.env.REACT_APP_API_PATH;

  const fetchUserData = async () => {
    const res = await fetch(API_PATH + "job/signedUp");
    const data = await res.json();
    setUserData(data);
  };

  const fetchJobData = async () => {
    const res = await fetch(API_PATH + "job");
    const data = await res.json();

    setJobData(data);
  };

  useEffect(() => {
    fetchUserData();
    fetchJobData();
  }, [jobData]);

  return (
    <>
      {addJobActive ? (
        <AdminForm
          setAddJobActive={setAddJobActive}
          setJobData={setJobData}
          jobData={jobData}
        />
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
                  : isActive === 3 &&
                    "border border-3 border-primary bg-white text-primary px-5 py-1"
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
                  : isActive === 3 &&
                    "border border-3 border-primary bg-white text-primary px-5 py-1"
              }
            >
              Roles
            </button>
            {type === 1000 && (
              <button
                onClick={() => setIsActive(3)}
                className={
                  isActive === 1
                    ? "border border-3 border-primary bg-white text-primary px-5 py-1 "
                    : isActive === 2
                    ? "border border-3 border-primary bg-white text-primary px-5 py-1"
                    : isActive === 3 &&
                      "border border-3 border-primary bg-primary text-white px-5 py-1"
                }
                //" border border-3 border-dark bg-white text-dark px-5 py-1 "
              >
                Add new admin
              </button>
            )}
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
        </>
      )}
    </>
  );
};
export default AdminPage;

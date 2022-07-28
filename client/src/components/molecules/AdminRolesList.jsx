import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-regular-svg-icons";
import { faPencil } from "@fortawesome/free-solid-svg-icons";
import Modal from "./Modal";
import ModalDelete from "./ModalDelete";
import _ from "lodash";

const AdminRolesList = ({ totalJobs, data, setAddJobActive }) => {
  const [selectedJob, setSelectedJob] = useState();
  return (
    <div className="container ">
      <p className="h4 fw-bold pt-4">roles</p>
      <span className="d-flex d-flex justify-content-end">
        <button
          onClick={() => setAddJobActive(true)}
          className="border-0 py-1 px-3 admin-add-button mb-2 mx-3 "
        >
          Add New
        </button>
      </span>
      <table className="table">
        <thead className="table-secondary">
          <tr>
            <th scope="col">Role</th>
            <th scope="col">Date</th>
            <th scope="col">Time</th>
            <th scope="col">Slots</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        {_.map(data, (job, index) => (
          <tbody key={index}>
            <tr>
              <td>{job.jobTitle}</td>
              <td>{job.date}</td>
              <td>{`${job.startTime}-${job.endTime}`}</td>
              <td>{job.slots}</td>
              <td>
                <FontAwesomeIcon
                  type="button"
                  data-toggle="modal"
                  data-target="#myModal"
                  className="mx-3"
                  icon={faPencil}
                  onClick={() => setSelectedJob(job)}
                />
                <FontAwesomeIcon
                  type="button"
                  data-toggle="modal"
                  data-target="#myModalDel"
                  icon={faTrashCan}
                  onClick={() => setSelectedJob(job)}
                />
              </td>
            </tr>
          </tbody>
        ))}
      </table>
      <p className="my-5">Showing {totalJobs} Results</p>
      <Modal
        selectedJob={selectedJob}
        text="Update details"
        btnText="Update job"
      />
      <ModalDelete
        selectedJob={selectedJob}
        text="Delete job"
        btnText="Delete job"
      />
    </div>
  );
};
export default AdminRolesList;

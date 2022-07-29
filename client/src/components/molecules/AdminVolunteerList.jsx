import _ from "lodash";

const AdminVolunteerList = ({ totalJobs, data }) => {
  return (
    <div className="container">
      <p className="h4 fw-bold pt-4">Volunteer names and roles</p>
      <table className="table">
        <thead className="table-secondary">
          <tr>
            <th scope="col">Volunteer name</th>
            <th scope="col">Date</th>
            <th scope="col">Time</th>
            <th scope="col">Role</th>
          </tr>
        </thead>
        {_.map(data, (item, index) => (
          <tbody key={index}>
            <tr>
              <td>{`${item.user.firstName} ${item.user.lastName}`} </td>
              <td>{item.job.date}</td>
              <td>{`${item.job.startTime}-${item.job.endTime}`}</td>
              <td>{item.job.jobTitle}</td>
            </tr>
          </tbody>
        ))}
      </table>

      <p className="my-5">Showing {totalJobs} Results</p>
    </div>
  );
};
export default AdminVolunteerList;

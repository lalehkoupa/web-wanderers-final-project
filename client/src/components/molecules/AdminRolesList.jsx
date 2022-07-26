const AdminRolesList = ({ totalJobs, data, setAddJobActive }) => {
  return (
    <div className="container ">
      <p className="h4 font-weight-bold pt-4">roles</p>
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
          </tr>
        </thead>
        {data.map((user, index) => (
          <tbody key={index}>
            <tr>
              <td>{user.jobTitle}</td>
              <td>{user.date}</td>
              <td>{`${user.startime}-${user.endtime}`}</td>
            </tr>
          </tbody>
        ))}
      </table>
      <p className="my-5">Showing {totalJobs} Results</p>
    </div>
  );
};
export default AdminRolesList;

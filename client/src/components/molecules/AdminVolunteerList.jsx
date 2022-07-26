const AdminVolunteerList = ({ totalJobs, data }) => {
  return (
    <div className="container">
      <p className="h4 font-weight-bold pt-4">Volunteer names and roles</p>
      <table className="table">
        <thead className="table-secondary">
          <tr>
            <th scope="col">Volunteer name</th>
            <th scope="col">Date</th>
            <th scope="col">Time</th>
            <th scope="col">Role</th>
          </tr>
        </thead>
        {data.map((user, index) => (
          <tbody key={index}>
            <tr>
              <td>{`${user.firsName} ${user.lastName}`} </td>
              <td>{user.date}</td>
              <td>{`${user.startime}-${user.endtime}`}</td>
              <td>{user.jobTitle}</td>
            </tr>
          </tbody>
        ))}
      </table>
      <p className="my-5">Showing {totalJobs} Results</p>
    </div>
  );
};
export default AdminVolunteerList;

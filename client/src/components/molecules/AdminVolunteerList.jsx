const AdminVolunteerList = ({ totalJobs, data }) => {
  return (
    <div class="container">
      <p class="h4 font-weight-bold pt-4">Volunteer names and roles</p>
      <table class="table">
        <thead class="table-secondary">
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
      <p class="my-5">Showing {totalJobs} Results</p>
    </div>
  );
};
export default AdminVolunteerList;

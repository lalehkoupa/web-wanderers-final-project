const AdminRolesList = ({ totalJobs, data, setAddJobActive }) => {
  return (
    <div class="container ">
      <p class="h4 font-weight-bold pt-4">roles</p>
      <span class="d-flex d-flex justify-content-end">
        <button
          onClick={() => setAddJobActive(true)}
          class="border-0 py-1 px-3 admin-add-button mb-2 mx-3 "
        >
          Add New
        </button>
      </span>
      <table class="table">
        <thead class="table-secondary">
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
      <p class="my-5">Showing {totalJobs} Results</p>
    </div>
  );
};
export default AdminRolesList;

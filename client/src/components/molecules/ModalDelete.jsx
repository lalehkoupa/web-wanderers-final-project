import axios from "axios";

const ModalDelete = ({ text, btnText, selectedJob }) => {
  const onclickHandle = async () => {
    const res = await axios({
      url: `http://localhost:8000/api/job/:${selectedJob.job.id}`,
      method: "delete",
    });
    res.json();
  };
  return (
    <div className="container">
      <div className="modal fade" id="myModalDel" role="dialog">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title">{text}</h4>
            </div>
            <div className="modal-body"></div>
            {selectedJob ? (
              <div className="mx-4">
                <p>{selectedJob.job.jobTitle}</p>
                <p>{selectedJob.job.date}</p>
                <p>{selectedJob.job.startime}</p>
                <p>{selectedJob.job.endtime}</p>
              </div>
            ) : (
              ""
            )}
            <div className="modal-footer">
              <button onClick={onclickHandle} type="button">
                {btnText}
              </button>
              <button type="button" data-dismiss="modal">
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ModalDelete;

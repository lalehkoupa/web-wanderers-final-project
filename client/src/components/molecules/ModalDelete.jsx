import axios from "axios";

const ModalDelete = ({ text, btnText, selectedJob }) => {
  const onclickHandle = async () => {
    const res = await axios({
      url: `http://localhost:8000/api/job/:${selectedJob.id}`,
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
                <p>{selectedJob.jobTitle}</p>
                <p>{selectedJob.date}</p>
                <p>{selectedJob.startime}</p>
                <p>{selectedJob.endtime}</p>
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

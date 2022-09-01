import DatePicker from "react-datepicker";
import { useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import { addMonths } from "date-fns";

const Modal = ({ text, btnText, selectedJob }) => {
  const [date, setDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [error, setError] = useState(null);
  const [form, setForm] = useState({
    jobTitle: "",
    date: "",
    startTime: "",
    endTime: "",
    availableSlots: "",
  });

  const validateForm = () => {
    if (
      !form.jobTitle ||
      !form.date ||
      !form.startTime ||
      !form.endTime ||
      !form.availableSlots
    ) {
      setError("It's mandatory to fill up all fields");
      return false;
    }
    return true;
  };

  const API_PATH = process.env.REACT_APP_API_PATH;

  const handleChange = (key, value) => {
    setForm({ ...form, [key]: value });
  };
  const handleSubmit = async () => {
    if (validateForm()) {
      try {
        await fetch(API_PATH + `jobs/:${selectedJob.id}`, {
          method: "put",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        });
        setError(null);
      } catch (err) {
        setError(err);
      }
    }
  };

  return (
    <div className="container">
      <div className="modal fade" id="myModal" role="dialog">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title">{text}</h4>
            </div>
            <div className="modal-body">
              <div className="form-group">
                <label className="fw-bold" htmlFor="jobinput">
                  Job title
                </label>
                <input
                  id="jobinput"
                  type="text"
                  value={selectedJob ? selectedJob.jobTitle : form.jobTitle}
                  onChange={(e) => handleChange("jobTitle", e.target.value)}
                  className="form-control"
                ></input>

                <label className="fw-bold" htmlFor="date">
                  Date
                </label>
                <DatePicker
                  id="date"
                  type="text"
                  selected={date}
                  value={selectedJob ? selectedJob.date : form.date}
                  onChange={(e) => {
                    setDate(e);
                    handleChange("date", e.toISOString().substring(0, 10));
                  }}
                  closeOnScroll={true}
                  dateFormat="dd/MM/yyyy"
                  minDate={new Date()}
                  maxDate={addMonths(new Date(), 5)}
                  showDisabledMonthNavigation
                  className="form-control"
                />

                <label className="fw-bold" htmlFor="starttime">
                  Start time
                </label>
                <DatePicker
                  id="starttime"
                  selected={startTime}
                  value={selectedJob ? selectedJob.startTime : form.startTime}
                  onChange={(e) => {
                    setStartTime(e);
                    handleChange(
                      "startTime",
                      e.toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })
                    );
                  }}
                  showTimeSelect
                  showTimeSelectOnly
                  timeIntervals={15}
                  timeCaption="Start time"
                  dateFormat="HH:mm"
                  className="form-control"
                />

                <label className="fw-bold" htmlFor="endtime">
                  End time
                </label>
                <DatePicker
                  id="endtime"
                  selected={endTime}
                  value={selectedJob ? selectedJob.endTime : form.endTime}
                  onChange={(e) => {
                    setEndTime(e);
                    handleChange(
                      "endTime",
                      e.toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })
                    );
                  }}
                  showTimeSelect
                  showTimeSelectOnly
                  timeIntervals={15}
                  timeCaption="End time"
                  dateFormat="HH:mm"
                  className="form-control"
                />
                <label className="fw-bold" htmlFor="availableslots">
                  Available slots
                </label>
                <input
                  id="availableslots"
                  type="text"
                  value={selectedJob ? selectedJob.slots : form.availableSlots}
                  onChange={(e) =>
                    handleChange("availableSlots", e.target.value)
                  }
                  className="form-control"
                ></input>
              </div>
              {error ? <p className="text-danger">{error}</p> : null}
              <div className="modal-footer">
                <button
                  onClick={handleSubmit}
                  type="button"
                  data-dismiss="modal"
                >
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
    </div>
  );
};
export default Modal;

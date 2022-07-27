import DatePicker from "react-datepicker";
import { useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import { addMonths } from "date-fns";
import axios from "axios";

const Modal = ({ text, btnText }) => {
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

  const handleChange = (key, value) => {
    setForm({ ...form, [key]: value });
  };
  const handleSubmit = async () => {
    if (validateForm()) {
      try {
        await fetch("http://localhost:8000/jobs", {
          method: "patch",
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
                  className="form-control"
                  id="jobinput"
                  type="text"
                  onChange={(e) => handleChange("jobTitle", e.target.value)}
                ></input>

                <label className="fw-bold" htmlFor="date">
                  Date
                </label>
                <DatePicker
                  id="date"
                  type="text"
                  selected={date}
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
                  className="form-control"
                  type="text"
                  id="availableslots"
                  value={form.availableSlots}
                  onChange={(e) =>
                    handleChange("availableSlots", e.target.value)
                  }
                ></input>
              </div>
              {error ? <p className="text-danger">{error}</p> : null}
              <div className="modal-footer">
                <button onClick={handleSubmit} type="button">
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

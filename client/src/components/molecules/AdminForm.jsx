import DatePicker from "react-datepicker";
import { useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import { addMonths } from "date-fns";
import moment from "moment";

const AdminForm = ({ setAddJobActive }) => {
  const [date, setDate] = useState("");

  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [form, setForm] = useState({
    jobTitle: "",
    date: "",
    startTime: "",
    endTime: "",
    availableSlots: "",
  });
  const [error, setError] = useState(null);
  const [response, setResponse] = useState("");
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
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        await fetch("http://localhost:4000/api/job", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        });
        setError(null);
        setResponse("Job added!");
      } catch (err) {
        setError(err);
      }
    }
  };

  return (
    <div className="container">
      <h3>Add dates, slots and roles</h3>
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
            handleChange("date", moment(e).format("DD/MM/YYYY"));
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
            handleChange("startTime", moment(e).format("HH:mm"));
          }}
          showTimeSelect
          showTimeSelectOnly
          timeIntervals={15}
          timeCaption="Start time"
          timeFormat="HH:mm aa"
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
            console.log(e);
            handleChange("endTime", moment(e).format("HH:mm"));
          }}
          showTimeSelect
          showTimeSelectOnly
          timeIntervals={15}
          timeFormat="HH:mm aa"
          timeCaption="End time"
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
          onChange={(e) => handleChange("availableSlots", e.target.value)}
        ></input>
        {error ? (
          <p className="text-danger text-center fw-bold">{error}</p>
        ) : (
          ""
        )}
        {response ? (
          <p className="text-primary text-center fw-bold">{response}</p>
        ) : (
          ""
        )}

        <button className="btn mb-1" onClick={handleSubmit} type="submit">
          Confirm
        </button>
        <>
          <button
            onClick={() => setAddJobActive(false)}
            className="bg-blue-button text-light mb-5 py-1"
          >
            Cancel
          </button>
        </>
      </div>
    </div>
  );
};
export default AdminForm;

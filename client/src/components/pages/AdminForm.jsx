import DatePicker from "react-datepicker";
import { useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import { addMonths } from "date-fns";

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
  console.log(form);
  const handleChange = (key, value) => {
    setForm({ ...form, [key]: value });
  };
  const handleSubmit = async () => {
    //  await fetch("url", {
    //    method: "POST",
    //    headers: { "Content-Type": "application/json" },
    //    body: JSON.stringify(form),
    //  });
    console.log(form);
  };

  return (
    <div class="container">
      <h3>Add dates, slots and roles</h3>
      <div class="form-group">
        <label class="fw-bold" htmlFor="jobinput">
          Job title
        </label>
        <input
          class="form-control"
          id="jobinput"
          type="text"
          // name="jobTitle"

          onChange={(e) => handleChange("jobTitle", e.target.value)}
        ></input>

        <label class="fw-bold" htmlFor="date">
          Date
        </label>
        <DatePicker
          id="date"
          type="text"
          selected={date}
          //value={date}
          onChange={(e) => {
            setDate(e);
            handleChange("date", e.toISOString().substring(0, 10));
          }}
          closeOnScroll={true}
          dateFormat="dd/MM/yyyy"
          minDate={new Date()}
          maxDate={addMonths(new Date(), 5)}
          showDisabledMonthNavigation
          class="form-control"
        />

        <label class="fw-bold" htmlFor="starttime">
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
          class="form-control"
        />

        <label class="fw-bold" htmlFor="endtime">
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
          class="form-control"
        />
        <label class="fw-bold" htmlFor="availableslots">
          Available slots
        </label>
        <input
          class="form-control"
          type="text"
          id="availableslots"
          value={form.availableSlots}
          onChange={(e) => handleChange("availableSlots", e.target.value)}
        ></input>

        <button class="btn" onClick={handleSubmit} type="submit">
          Confirm
        </button>
        <>
          <button
            onClick={() => setAddJobActive(false)}
            class="bg-blue-button text-light mb-5 py-1"
          >
            Cancel
          </button>
        </>
      </div>
    </div>
  );
};
export default AdminForm;

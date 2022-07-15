import React from "react";
import Hero from "../molecules/Hero.jsx";
import Classes from "../atoms/Classes.jsx";

const Homepage = () => {
  //const [data, setData] = useState([]);

  // const getData = async() =>
  // {
  // 	const res = await fetch("/api/")
  // 	const data = await res.json()

  // 	setData(data)
  // }

  // useEffect(() =>
  // {
  // 	//getData()
  // })

  return (
    <div>
      <Hero />
      <div class="container-fluid text-center bg-yellow_green">
        <p class="pb-2 pt-2 h3 mb-4">
          New venue: Stoke Newington School, Cclissold Road N16 9EX
        </p>
      </div>
      <div class="container col-10">
        <p>
          There are Lots of ways you can get involved here at AKWAABA. You can
          help as a kitchen supervisor, driver, etc. You can choose suitable
          roles and time from available times and slots below.
        </p>
      </div>
      <Classes />
    </div>
  );
};

export default Homepage;

import React from "react";
import Hero from "../molecules/Hero";

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
      <h1>This is the Homepage</h1>
      <Hero />
    </div>
  );
};

export default Homepage;

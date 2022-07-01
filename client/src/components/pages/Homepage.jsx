import React, { useState, useEffect } from "react";

const Homepage = () =>
{
	const [data, setData] = useState([]);

	const getData = async() =>
	{
		const res = await fetch("/api/")
		const data = await res.json()

		setData(data)
	}

	useEffect(() => 
	{
		getData()
	})

	return (
		<div>
			<h1>This is the Homepage</h1>
			{data.msg}
		</div>
	);
};

export default Homepage;
import React from "react";
import Hero from "../molecules/Hero";
import { useEffect } from "react";
import { useState } from "react";
import exampleJobs from "../../exampleJobs.json";
import axios from "axios";
import Posts from "../molecules/Posts";
import Pagination from "../molecules/Pagination";

import { useParams } from "react-router-dom";

const Rota = () => {
  let { date } = useParams();

  const [isChecked, setIsChecked] = useState(false);
  const [posts, setPost] = useState();
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(5);

  let { date } = useParams();

  exampleJobs = exampleJobs.filter((rol) => rol.date === date);
  useEffect(() => {
    const fetchPost = async () => {
      const res = await axios.get(
        "https://web-wanderers-cyf.herokuapp.com/rota"
      );
      setPost(res.data);
      setLoading(false);
    };
    fetchPost();
  }, []);
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPost = exampleJobs.slice(indexOfFirstPost, indexOfLastPost);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  return (
    <>
      <Hero />
      <div className="container mt-5">
        {/* <h1 className=" text-primary mb-3">This is the Rota</h1> */}
        <Posts loading={loading} posts={currentPost} />
        <Pagination
          postsPerPage={postsPerPage}
          totalPost={exampleJobs.length}
          paginate={paginate}
        />
      </div>
    </>
  );
};

export default Rota;

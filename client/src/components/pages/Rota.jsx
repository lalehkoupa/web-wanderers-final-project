import React from "react";
import Hero from "../molecules/Hero";
import { useState, useEffect } from "react";
// import exampleJobs from "../../exampleJobs.json";
import axios from "axios";
import Posts from "../molecules/Posts";
import Pagination from "../molecules/Pagination";
import { useParams } from "react-router-dom";

const Rota = () => {
  const [isChecked, setIsChecked] = useState([]);
  const [posts, setPost] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(5);
  let { day, month, year } = useParams();

  let date = `${day}/${month}/${year}`;
  useEffect(() => {
    const fetchPost = async () => {
      const res = await axios.get("http://localhost:4000/api/job");
      setPost(res.data);
    };
    fetchPost();
    //scroll up to the top of the page when we redirect from homepage to this component
    window.scrollTo(0, 0);
  }, []);
  let exampleJobs = posts.filter((rol) => rol.date === date);
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPost = exampleJobs.slice(indexOfFirstPost, indexOfLastPost);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  console.log(posts);

  
  return (
    <>
      <Hero />
      <div className="container mt-5">
        <h1 className=" text-primary mb-3">This is the Rota</h1>
        <Posts
          posts={currentPost}
          setIsChecked={setIsChecked}
          isChecked={isChecked}
        />
        <Pagination
          postsPerPage={postsPerPage}
          totalPost={exampleJobs.length}
          paginate={paginate}
        />
      </div>
      <div className="text-center"></div>
    </>
  );
};

export default Rota;

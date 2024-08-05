import React, { useEffect, useState } from "react";
import Job from "../job/job/Job";
import { useDispatch, useSelector } from "react-redux";

import useGetAllJobs from "@/hooks/useGetAllJobs";
import { setSerachedQuery } from "@/redux/jobSlice";
import { motion } from "framer-motion";
const Browse = () => {
  useGetAllJobs();

  const { allJob } = useSelector((store) => store.job);
  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      dispatch(setSerachedQuery(""));
    };
  }, [dispatch]);

  if (allJob.length === 0) {
    return <p>No jobs found.</p>;
  }

  return (
    <div>
      <div className="max-w-7xl mx-auto my-10">
        <h1 className="font-bold text-xl my-10">
          Search Results {allJob.length}
        </h1>
        <motion.div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {allJob.map((job) => (
            <Job key={job._id} job={job} />
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default Browse;

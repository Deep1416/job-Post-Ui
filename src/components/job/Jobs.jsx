import React, { useEffect, useState } from "react";
import FilterCard from "./filterCard/FilterCard";
import Job from "./job/Job";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";
// import {f}

const Jobs = () => {
  const { allJob, searchedQuery } = useSelector((store) => store.job);
  const [filterJobs, setFilterJobs] = useState(allJob);

  useEffect(() => {
    if (searchedQuery) {
      const filteredJobs = allJob.filter((job) => {
        return (
          job.title.toLowerCase().includes(searchedQuery.toLowerCase()) ||
          job.description.toLowerCase().includes(searchedQuery.toLowerCase()) ||
          job.location.toLowerCase().includes(searchedQuery.toLowerCase())
        );
      });
      setFilterJobs(filteredJobs);
    } else {
      setFilterJobs(allJob);
    }
  }, [allJob, searchedQuery]);
  return (
    <div>
      <div className="max-w-6xl mx-auto mt-5">
        <div className="flex gap-5">
          <div className="w-20%">
            <FilterCard />
          </div>
          <div className="flex-1">
            {filterJobs.length === 0 ? (
              <span>Job Not Found</span>
            ) : (
              <div className="h-[88vh] overflow-y-auto pb-5">
                <div className="grid grid-cols-3 gap-4">
                  {filterJobs.map((job, index) => {
                    return (
                      <motion.div
                        initial={{
                          opacity: 0,
                          x: 100,
                        }}
                        animate={{
                          opacity: 1,
                          x: 0,
                        }}
                        exit={{ opacity: 0, x: -100 }}
                        transition={{ duration: 0.4 }}
                        key={index}
                      >
                        <Job key={job._id} job={job} />
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Jobs;

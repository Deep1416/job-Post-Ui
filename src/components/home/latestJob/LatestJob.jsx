import React from "react";

import { useSelector } from "react-redux";
import LatestJobCard from "./LatestJobCard";
import { useNavigate } from "react-router-dom";

const LatestJob = () => {
  const { allJob } = useSelector((store) => store.job);
  console.log(allJob);
  const navigate = useNavigate();

  return (
    <div className="max-w-7xl mx-auto my-20">
      <h1 className="text-4xl font-bold">
        <span className="text-[#6A38C2]">Latest & Top </span> Job Openings
      </h1>
      <div className="grid grid-cols-3 gap-4 my-5">
        {allJob.length <= 0 ? (
          <span>No Job Available</span>
        ) : (
          allJob
            ?.slice(0, 6)
            .map((job) => <LatestJobCard onClick= {()=>navigate(`/description/${job._id}`)} key={job._id} job={job} />)
        )}
      </div>
    </div>
  );
};

export default LatestJob;

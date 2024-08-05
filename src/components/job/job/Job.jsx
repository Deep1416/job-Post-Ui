import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Bookmark } from "lucide-react";
import React from "react";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const Job = ({ job }) => {
  const navigate = useNavigate();
  const daysAgo = (moogodbTime) => {
    const createdAt = new Date(moogodbTime);
    const currentTime = new Date();
    const timeDifference = currentTime - createdAt;
    return Math.floor(timeDifference / (1000 * 24 * 60 * 60));
  };
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 100,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      exit={{ opacity: 0, y: -100 }}
      transition={{ duration: 0.4 }}
      className="p-5 border rounded-lg shadow-md flex flex-col  space-y-3 bg-white"
    >
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-600 ">
          {" "}
          {job?.createdAt === 0 ? "Today" : `${daysAgo(job?.createdAt)}`} days
          ago
        </p>
        <Button variant="outline" className="rounded-full" size="icon">
          <Bookmark />
        </Button>
      </div>

      <div className="flex items-center gap-2 my-2 ">
        <Button variant="outline" className="p-6 rounded-full" size="icon">
          <Avatar>
            <AvatarImage
              src={job?.company?.logo}
              className="rounded-full"
              alt="Company Logo"
            />
          </Avatar>
        </Button>
        <div>
          <h1 className="text-lg font-medium">{job?.company?.name}</h1>
          <p className="text-sm text-gray-600">{job?.location}</p>
        </div>
      </div>
      <div>
        <h1 className="font-bold my-2 text-lg"> {job?.title}</h1>
        <p className="text-sm text-gray-600"> {job?.description}</p>
      </div>
      <div className="flex items-center gap-1 mt-4">
        <Badge className={"text-blue-700 font-bold"} variant="ghost">
          {job?.position} Positions
        </Badge>
        <Badge className={"text-[#F83002] font-bold"} variant="ghost">
          {job?.jobtype}
        </Badge>
        <Badge className={"text-[#7209b7] font-bold"} variant="ghost">
          {job?.salary}LPA
        </Badge>
      </div>
      <div className="flex items-start gap-8 mt-4">
        <Button
          variant="outline"
          onClick={() => navigate(`/description/${job?._id}`)}
        >
          Deatils
        </Button>
        <Button className="bg-[#7209b7]">Save For Later</Button>
      </div>
    </motion.div>
  );
};

export default Job;

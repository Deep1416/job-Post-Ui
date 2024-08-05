import { Button } from "@/components/ui/button";
import { setSerachedQuery } from "@/redux/jobSlice";
import { Search } from "lucide-react";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const HeroSection = () => {
  const [query, setQuery] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const searchJobHandler = () => {
    dispatch(setSerachedQuery(query));
    navigate("/browse");
  };
  return (
    <div className="text-center">
      <div className="flex items-center gap-5 flex-col my-10 mx-auto">
        <span className="px-4 py-2 rounded-full bg-gray-100 text-[#F83002] capitalize font-semibold">
          Leading Job Portal
        </span>
        <h1 className="capitalize text-5xl font-bold leading-[60px]">
          Discover, Apply & <br /> Secure Your{" "}
          <span className="text-[#6A38C2]"> Dream Job</span>
        </h1>
        <p className="text-base font-medium">
          Find the perfect job for you with our easy-to-use search and
          application tools. Connect with top employers and take your career to
          new heights.
        </p>
        <div className="flex w-[40%] shadow-lg border border-gray-200 pl-3 rounded-full rounded-r-full items-center gap-4 mx-auto">
          <input
            type="text"
            placeholder="Search for your ideal job..."
            onChange={(e) => setQuery(e.target.value)}
            className="outline-none border-none w-full py-2"
          />
          <Button className="rounded-r-full bg-[#6A38C2] hover:bg-[#5528a3] text-white">
            <Search onClick={searchJobHandler} className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;

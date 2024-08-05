import React, { useEffect } from "react";
import HeroSection from "./heroSection/HeroSection";
import CatergoryCarsoul from "./catergoryCarsoul/CatergoryCarsoul";
import LatestJob from "./latestJob/LatestJob";
import useGetAllJobs from "@/hooks/useGetAllJobs";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Home = () => {
  useGetAllJobs();
  const { user } = useSelector((store) => store.authSlice);
  const navigate = useNavigate();
  useEffect(() => {
    if (user?.role === "recruiter") {
      navigate("/admin/companies");
    }
  }, []);
  return (
    <>
      <HeroSection />
      <CatergoryCarsoul />
      <LatestJob />
    </>
  );
};

export default Home;

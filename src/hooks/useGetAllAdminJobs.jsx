import { setAllAdminJobs } from "@/redux/jobSlice";
import { JOBS_API_END_POINT } from "@/utils/apiEndpoints";
import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

const useGetAllAdminJobs = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchAllAdminJobs = async () => {
      try {
        const res = await axios.get(`${JOBS_API_END_POINT}/getAdmin`, {
          withCredentials: true,
        });
        if (res.data.success) {
          dispatch(setAllAdminJobs(res.data.jobs));
        }
        console.log(res.data.jobs);
      } catch (error) {
        console.log(error);
      }
    };

    fetchAllAdminJobs();
  }, [dispatch]); // Added dispatch to the dependency array
};

export default useGetAllAdminJobs;
import { setAppliedJob } from "@/redux/jobSlice";
import { APPLICATION_API_END_POINT } from "@/utils/apiEndpoints";
import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

const useGetAllAppliedJobs = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchAplliedJobs = async () => {
      try {
        const res = await axios.get(`${APPLICATION_API_END_POINT}/get`, {
          withCredentials: true,
        });
        console.log(res);

        if (res.data.success) {
          dispatch(setAppliedJob(res.data.applications));
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchAplliedJobs();
  }, []);
};

export default useGetAllAppliedJobs;

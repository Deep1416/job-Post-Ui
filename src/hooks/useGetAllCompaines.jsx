import { getCompanies } from "@/redux/companySlice";
import { COMPANY_API_END_POINT } from "@/utils/apiEndpoints";
import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

const useGetAllCompaines = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchCompaines = async () => {
      try {
        const res = await axios.get(`${COMPANY_API_END_POINT}/getCompany`, {
          withCredentials: true,
        });
        if (res.data.success) {
          dispatch(getCompanies(res.data.companies));
        }
        console.log(res.data.jobs);
      } catch (error) {
        console.log(error);
      }
    };
    fetchCompaines();
  }, []);
};

export default useGetAllCompaines;

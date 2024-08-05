import React, { useEffect } from "react";
import ApplicantsTable from "./applicantsTable/ApplicantsTable";
import axios from "axios";
import { APPLICATION_API_END_POINT } from "@/utils/apiEndpoints";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setAllApplicants } from "@/redux/applicationSlice";

const Applicants = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { applicants } = useSelector((store) => store.application);

  useEffect(() => {
    const fecthAllApplicants = async () => {
      try {
        const res = await axios.get(
          `${APPLICATION_API_END_POINT}/${id}/applicants`,
          { withCredentials: true }
        );
        // console.log(res.data.applications);

        if (res.data.success) {
          dispatch(setAllApplicants(res.data.applications));
        }
      } catch (error) {
        console.log(error);
      }
    };
    fecthAllApplicants();
  }, []);
//   console.log(applicants);
  return (
    <div>
      <div className="max-w-7xl mx-auto">
        <h1 className="font-bold text-xl my-5">
          Applicants {applicants?.length}
        </h1>
        <ApplicantsTable />
      </div>
    </div>
  );
};

export default Applicants;

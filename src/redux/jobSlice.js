import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  allJob: [],
  allAdminJobs: [],
  singleJob: null,
  searchJobByText: "",
  allAppliedJobs: [],
  searchedQuery: "",
};

const jobSlice = createSlice({
  name: "job",
  initialState,
  reducers: {
    setAllJob: (state, action) => {
      state.allJob = action.payload;
    },
    setSingleJob: (state, action) => {
      state.singleJob = action.payload;
    },
    setAllAdminJobs: (state, action) => {
      state.allAdminJobs = action.payload;
    },
    setSearchJobByText: (state, action) => {
      state.searchJobByText = action.payload;
    },
    setAppliedJob: (state, action) => {
      state.allAppliedJobs = action.payload;
    },
    setSerachedQuery: (state, action) => {
      state.searchedQuery = action.payload;
    },
  },
});

export const {
  setAllJob,
  setSingleJob,
  setAllAdminJobs,
  setSearchJobByText,
  setAppliedJob,
  setSerachedQuery
} = jobSlice.actions;
export default jobSlice.reducer;

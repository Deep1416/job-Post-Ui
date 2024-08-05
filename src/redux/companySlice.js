import { createSlice } from "@reduxjs/toolkit";


const initialState = {
  singlecompany: null,
  companies: [],
  searchCompanyByText :""
};

const companySlice = createSlice({
  name: "company",
  initialState,
  reducers: {
    setSingleCompany: (state, action) => {
      state.singlecompany = action.payload;
    },
    getCompanies: (state, action) => {
      state.companies = action.payload;
    },
    setSearchCompanyByText :(state , action) =>{
      state.searchCompanyByText = action.payload
    }
  },
});

export const { setSingleCompany, getCompanies ,setSearchCompanyByText } = companySlice.actions;
export default companySlice.reducer;

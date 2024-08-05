import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { setSerachedQuery } from "@/redux/jobSlice";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

const filterData = [
  {
    filterType: "Location",
    array: ["Delhi NCR", "Bangalore", "Hyderabad", "Pune", "Mumbai"],
  },
  {
    filterType: "Industry",
    array: [
      "Frontend Developer",
      "Backend Developer",
      "FullStack Developer",
      "Data Scientist",
      "DevOps Engineer",
      "UI/UX Designer",

      "Mobile Developer",
    ],
  },
  {
    filterType: "Salary",
    array: [
      "0-40k",
      "42k-1lakh",
      "1lakh-5lakh",
      "5lakh-10lakh",
     
      
    ],
  },
];

const FilterCard = () => {
  const [selectedValue, setSelectedValue] = useState("");
  const dispatch = useDispatch();
  const changeHandler = (value) => {
    setSelectedValue(value);
  };
  useEffect(() => {
    dispatch(setSerachedQuery(selectedValue));
  }, [selectedValue]);
  return (
    <div className="p-6 border rounded-lg shadow-md bg-white">
      <h1 className="text-xl font-bold">Filter Jobs</h1>
      <hr className=" mt-3" />
      <RadioGroup value={selectedValue} onValueChange={changeHandler}>
        {filterData.map((data, index) => (
          <div key={index} className="mb-4">
            <h2 className="text-lg font-semibold mb-2">{data.filterType}</h2>
            {data.array.map((item, idx) => (
              <div key={idx} className="flex items-center space-x-2 my-2">
                <RadioGroupItem value={item} id={item} />
                <Label htmlFor={item}>{item}</Label>
              </div>
            ))}
          </div>
        ))}
      </RadioGroup>
    </div>
  );
};

export default FilterCard;

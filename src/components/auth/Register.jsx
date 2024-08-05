import React, { useEffect, useState } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "@/redux/authSlice";
import { USER_API_END_POINT } from "@/utils/apiEndpoints";

const Register = () => {
  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    phoneNumber: "",
    password: "",
    role: "",
    file: null,
  });

  const navigate = useNavigate();
  const { loading , user } = useSelector((state) => state?.authSlice);
  const dispatch = useDispatch();

  const handleChangeEvent = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const changeFileHandler = (e) => {
    setFormData({ ...formData, file: e.target.files?.[0] });
  };

  const handleRadioChange = (e) => {
    setFormData({ ...formData, role: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("fullname", formData.fullname);
    data.append("email", formData.email);
    data.append("phoneNumber", formData.phoneNumber);
    data.append("password", formData.password);
    data.append("role", formData.role);

    if (formData.file) {
      data.append("file", formData.file);
    }

    try {
      dispatch(setLoading(true));
      const res = await axios.post(`${USER_API_END_POINT}/register`, data, {
        headers: {
          "Content-Type": "multipart/form-data", // Corrected content type
        },
        withCredentials: true,
      });

      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/login");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error(
        error.response?.data?.message || "An error occurred. Please try again."
      );
    } finally {
      dispatch(setLoading(false));
    }
  };
  useEffect(()=>{
    if(user){
      navigate("/")
    }
  },[])
  return (
    <div className="flex items-center justify-center max-w-6xl mx-auto">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md border border-gray-200 rounded-lg p-6 my-10"
      >
        <h1 className="font-bold text-2xl mb-5">Register</h1>

        <div className="my-2">
          <Label>Full Name</Label>
          <Input
            type="text"
            value={formData.fullname}
            name="fullname"
            onChange={handleChangeEvent}
            placeholder="Enter your full name"
          />
        </div>
        <div className="my-2">
          <Label>Email</Label>
          <Input
            type="email"
            value={formData.email}
            name="email"
            onChange={handleChangeEvent}
            placeholder="Enter your email address"
          />
        </div>
        <div className="my-2">
          <Label>Phone Number</Label>
          <Input
            type="tel"
            value={formData.phoneNumber}
            name="phoneNumber"
            onChange={handleChangeEvent}
            placeholder="Enter your phone number"
          />
        </div>
        <div className="my-2">
          <Label>Password</Label>
          <Input
            type="password"
            value={formData.password}
            name="password"
            onChange={handleChangeEvent}
            placeholder="Enter your password"
          />
        </div>
        <div className="flex items-start justify-between flex-col gap-5 my-5">
          <div className="flex items-center gap-4">
            <div className="flex items-center space-x-2">
              <input
                type="radio"
                value="student"
                name="role"
                id="student"
                checked={formData.role === "student"}
                onChange={handleRadioChange}
              />
              <Label htmlFor="student">Student</Label>
            </div>
            <div className="flex items-center space-x-2">
              <input
                type="radio"
                value="recruiter"
                name="role"
                id="recruiter"
                checked={formData.role === "recruiter"}
                onChange={handleRadioChange}
              />
              <Label htmlFor="recruiter">Recruiter</Label>
            </div>
          </div>
          <div className="flex items-center justify-between space-x-2">
            <Label htmlFor="file" className="w-[40%]">
              Profile Picture
            </Label>
            <Input
              accept="image/*"
              type="file"
              name="file"
              id="file"
              className="cursor-pointer w-[60%]"
              onChange={changeFileHandler}
            />
          </div>
        </div>
        <div className="flex flex-col items-center">
          {loading ? (
            <Button className="w-full my-4 bg-gray-500 text-white rounded">
              <Loader2 className="mr-2 h-4 animate-spin" /> Please wait...
            </Button>
          ) : (
            <Button
              type="submit"
              className="my-4 w-full bg-black text-white rounded"
            >
              Register
            </Button>
          )}
          <span>
            Already have an account?{" "}
            <Link to={"/login"} className="text-blue-600 text-sm">
              Login
            </Link>
          </span>
        </div>
      </form>
    </div>
  );
};

export default Register;

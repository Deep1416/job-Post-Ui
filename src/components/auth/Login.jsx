import React, { useEffect, useState } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setLoading, setUser } from "@/redux/authSlice";
import { Loader2 } from "lucide-react";
import { USER_API_END_POINT } from "@/utils/apiEndpoints";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    role: "",
  });
  const { loading , user } = useSelector((state) => state?.authSlice);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChangeEvent = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRadioChange = (e) => {
    setFormData({ ...formData, role: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("email", formData.email);
    data.append("password", formData.password);
    data.append("role", formData.role);

    try {
      dispatch(setLoading(true));
      const res = await axios.post(`${USER_API_END_POINT}/login`, data, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });

      if (res.data.success) {
        dispatch(setUser(res.data.user));
        toast.success(res.data.message);
        navigate("/");
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
        className="w-1/2 border border-gray-200 rounded-[5px] p-4 my-10"
      >
        <h1 className="font-bold text-xl mb-5">Login</h1>

        <div className="my-2">
          <Label>Email</Label>
          <Input
            type="email"
            value={formData.email}
            name="email"
            onChange={handleChangeEvent}
            placeholder="Enter your email address"
            required
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
            required
          />
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4 my-5">
            <div className="flex items-center space-x-2">
              <input
                type="radio"
                value="student"
                name="role"
                id="student"
                checked={formData.role === "student"}
                onChange={handleRadioChange}
                required
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
                required
              />
              <Label htmlFor="recruiter">Recruiter</Label>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center justify-center">
          {loading ? (
            <Button className="w-full my-4" disabled>
              <Loader2 className="mr-2 h-4 animate-spin" /> Please wait...
            </Button>
          ) : (
            <Button
              type="submit"
              className="my-4 w-full bg-black text-white rounded"
            >
              Login
            </Button>
          )}
          <span>
            Don't have an account?{" "}
            <Link to={"/register"} className="text-blue-600 text-sm">
              Register
            </Link>
          </span>
        </div>
      </form>
    </div>
  );
};

export default Login;

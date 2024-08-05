import { Link, useNavigate } from "react-router-dom";
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { LogOut, User2 } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import axios from "axios";
import { USER_API_END_POINT } from "@/utils/apiEndpoints";
import { setUser } from "@/redux/authSlice";

const Navbar = () => {
  const { user } = useSelector((store) => store.authSlice);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      const res = await axios.get(`${USER_API_END_POINT}/logout`, {
        withCredentials: true,
      });

      if (res.data.success) {
        dispatch(setUser(null));
        toast.success(res?.data?.message);
        navigate("/");
      } else {
        toast.error(res?.data?.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data.message);
    }
  };

  console.log(user);

  return (
    <div className="bg-white">
      <div className="flex items-center justify-between mx-auto max-w-6xl h-16">
        <div>
          <h1 className="text-2xl font-bold">
            Job<span className="text-[#F83002]">Post</span>
          </h1>
        </div>
        <div className="flex items-center justify-center gap-5 cursor-pointer">
          <ul className="flex font-medium items-center gap-5">
            {user && user.role === "student" ? (
              <>
                <Link to={"/"}>
                  <li>Home</li>
                </Link>
                <Link to={"/job"}>
                  <li>Jobs</li>
                </Link>
                <Link to={"/browse"}>
                  <li>Browse</li>
                </Link>
              </>
            ) : (
              <>
                <Link to={"/admin/companies"}>
                  <li>Companies</li>
                </Link>
                <Link to={"/admin/jobs"}>
                  <li>Jobs</li>
                </Link>
              </>
            )}
          </ul>
          {!user ? (
            <div className="flex items-center gap-4">
              <Link to={"/login"}>
                <Button variant="outline" className="rounded-[5px]">
                  Login
                </Button>
              </Link>
              <Link to={"/register"}>
                <Button className="bg-[#6A38c2] hover:bg-[#6532be] rounded-[5px] text-white">
                  Register
                </Button>
              </Link>
            </div>
          ) : (
            <Popover>
              <PopoverTrigger asChild>
                <Avatar>
                  <AvatarImage src={user.profile.profilePhoto} />
                  <AvatarFallback>{user.fullname[0]}</AvatarFallback>
                </Avatar>
              </PopoverTrigger>
              <PopoverContent className="w-80 rounded-[5px]">
                <div>
                  <div className="flex space-y-2 gap-2">
                    <Avatar>
                      <AvatarImage src={user.profile.profilePhoto} />
                      <AvatarFallback>{user.fullname[0]}</AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-semibold">{user.fullname}</h3>
                      <p className="text-sm text-muted-foreground">
                        {user.profile.bio || "No bio available"}
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-col my-2 text-gray-600">
                    {user && user.role === "student" && (
                      <div className="flex w-fit items-center gap-2 cursor-pointer">
                        <User2 />
                        <Link to={"/profile"}>
                          <Button variant="link">View Profile</Button>
                        </Link>
                      </div>
                    )}

                    <div
                      className="flex w-fit items-center gap-2 cursor-pointer"
                      onClick={handleLogout}
                    >
                      <LogOut />
                      <Button variant="link">Logout</Button>
                    </div>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;

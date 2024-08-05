import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Loader2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { Input } from "@/components/ui/input";
import axios from "axios";
import { COMPANY_API_END_POINT } from "@/utils/apiEndpoints";
import { toast } from "sonner";
import useGetCompanyById from "@/hooks/useGetCompanyById";

const CompanySetup = () => {
  const { id } = useParams();
  useGetCompanyById(id);
  const navigate = useNavigate();
  const { loading } = useSelector((store) => store.authSlice);

  const [input, setInput] = useState({
    name: "",
    description: "",
    website: "",
    location: "",
    file: null,
  });

  const { singlecompany } = useSelector((store) => store.company);
  console.log(singlecompany);

  const changeEventHandler = (e) => {
    const { name, value } = e.target;
    setInput((prevInput) => ({ ...prevInput, [name]: value }));
  };

  const changeFileHandler = (e) => {
    const file = e.target.files?.[0];
    setInput((prevInput) => ({ ...prevInput, file }));
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", input.name);
    formData.append("description", input.description);
    formData.append("website", input.website);
    formData.append("location", input.location);
    if (input.file) {
      formData.append("file", input.file);
    }
    try {
      const res = await axios.put(
        `${COMPANY_API_END_POINT}/update/${id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );
      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/admin/companies");
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data.message || "Something went wrong");
    }
  };

  useEffect(() => {
    setInput({
      name: singlecompany.name || "",
      description: singlecompany.description || "",
      website: singlecompany.website || "",
      location: singlecompany.location || "",
      file: singlecompany.file || null,
    });
  }, [singlecompany]);

  return (
    <div>
      <div className="max-w-xl mx-auto my-10">
        <form onSubmit={submitHandler}>
          <div className="flex items-center gap-5 p-8">
            <Button
              onClick={() => navigate("/admin/companies")}
              variant="outline"
              className="flex items-center gap-2 text-gray-500 font-semibold"
            >
              <ArrowLeft />
              <span>Back</span>
            </Button>
            <h1 className="font-bold text-xl">Company Setup</h1>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Company Name</Label>
              <Input
                type="text"
                name="name"
                value={input.name}
                onChange={changeEventHandler}
              />
            </div>
            <div>
              <Label>Description</Label>
              <Input
                type="text"
                name="description"
                value={input.description}
                onChange={changeEventHandler}
              />
            </div>
            <div>
              <Label>Website</Label>
              <Input
                type="text"
                name="website"
                value={input.website}
                onChange={changeEventHandler}
              />
            </div>
            <div>
              <Label>Location</Label>
              <Input
                type="text"
                name="location"
                value={input.location}
                onChange={changeEventHandler}
              />
            </div>
            <div>
              <Label>Logo</Label>
              <Input
                type="file"
                accept="image/*"
                onChange={changeFileHandler}
              />
            </div>
          </div>
          {loading ? (
            <Button className="w-full my-4" disabled>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please wait
            </Button>
          ) : (
            <Button type="submit" className="w-full my-4">
              Update
            </Button>
          )}
        </form>
      </div>
    </div>
  );
};

export default CompanySetup;
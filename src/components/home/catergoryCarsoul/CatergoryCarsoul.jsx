import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { setSerachedQuery } from "@/redux/jobSlice";
import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const jobs = [
  "Frontend Developer",
  "Backend Developer",
  "Full Stack Developer",
  "Data Analyst",
  "Data Scientist",
  "DevOps Engineer",
  "Mobile App Developer",
  "UX/UI Designer",
  "Product Manager",
  "System Administrator",
  "Cybersecurity Specialist",
  "Machine Learning Engineer",
  "IT Support Specialist",
  "Cloud Architect",
  "Database Administrator",
];

const CategoryCarousel = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const searchJobHandler = (query) => {
    dispatch(setSerachedQuery(query));
    navigate("/browse");
  };
  return (
    <div>
      <Carousel className="w-full max-w-xl mx-auto my-20">
        <CarouselContent>
          {jobs.map((item, idx) => (
            <CarouselItem key={idx} className=" md:basis-1/2 lg:basis-1/3">
              <Button onClick={()=>searchJobHandler(item)} variant="outline" className="rounded-full">
                {item}
              </Button>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
};

export default CategoryCarousel;

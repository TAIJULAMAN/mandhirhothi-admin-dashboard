/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import PageHeading from "../../Components/Shared/PageHeading.jsx";
import JoditComponent from "../../Components/Shared/JoditComponent.jsx";
import {
  useGetAboutUsQuery,
  useUpdateAboutUsMutation,
} from "../../redux/api/aboutUsApi.js";
import toast from "react-hot-toast";
import Loader from "../../Components/Shared/Loaders/Loader.jsx"; // ✅ make sure this exists

const AboutUs = () => {
  const [content, setContent] = useState(" this is about us asedf");

  const { data, isLoading } = useGetAboutUsQuery({});
  const [updateAboutUs, { isLoading: isSubmitting }] =
    useUpdateAboutUsMutation();

  // Load data into editor
  useEffect(() => {
    if (data?.data?.aboutUs) {
      setContent(data.data.aboutUs);
    }
  }, [data]);

  // Submit handler
  const handleSubmit = async () => {
    try {
      const requestData = {
        aboutUs: content,
      };
      // console.log("requestData of aboutUs", requestData);

      const res = await updateAboutUs({ requestData }).unwrap();
      if (res?.success) {
        toast.success(res?.message || "About Us updated successfully!");
      }
    } catch (error) {
      toast.error(error?.data?.message || "Something went wrong!");
      console.error(error);
    }
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      <PageHeading title="About Us" />
      <JoditComponent setContent={setContent} content={content} />
      <button
        onClick={handleSubmit}
        disabled={isSubmitting}
        className="bg-[#00823b] !text-white font-semibold w-full py-3 px-5 rounded-lg disabled:opacity-50 cursor-pointer"
      >
        {isSubmitting ? "Updating..." : "Submit"}
      </button>
    </>
  );
};

export default AboutUs;

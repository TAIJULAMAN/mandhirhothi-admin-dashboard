import React, { useEffect, useState } from "react";
import PageHeading from "../../Components/Shared/PageHeading.jsx";
import JoditComponent from "../../Components/Shared/JoditComponent.jsx";
import {
  useGetPrivacyQuery,
  useUpdatePrivacyMutation,
} from "../../redux/api/privacyApi.js";
import Loader from "../../Components/Shared/Loaders/Loader.jsx";
import { message } from "antd";

const PrivacyPolicy = () => {
  const [content, setContent] = useState("this is privacy policy");

  const { data, isLoading } = useGetPrivacyQuery();
  const [updatePrivacy, { isLoading: isSubmitting }] =
    useUpdatePrivacyMutation();

  const handleSubmit = async () => {
    if (!content) {
      message.error("Privacy policy content cannot be empty!");
      return;
    }

    const requestData = {
      PrivacyPolicy: content, // ✅ backend expects this key
    };

    try {
      const res = await updatePrivacy({ requestData }).unwrap();
      console.log("Response from updatePrivacy:", res);

      if (res?.success) {
        message.success(res?.message || "Privacy policy updated successfully!");
      }
    } catch (error) {
      message.error(error?.data?.message || "Something went wrong!");
      console.error(error);
    }
  };

  useEffect(() => {
    if (data?.data?.PrivacyPolicy) {
      setContent(data.data.PrivacyPolicy);
    }
  }, [data]);

  if (isLoading) return <Loader />;

  return (
    <>
      <PageHeading title="Privacy Policy" />
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

export default PrivacyPolicy;

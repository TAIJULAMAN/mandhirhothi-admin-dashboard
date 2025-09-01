/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import PageHeading from "../../Components/Shared/PageHeading.jsx";
import JoditComponent from "../../Components/Shared/JoditComponent.jsx";
import {
  useGetTermsAndConditionsQuery,
  useUpdateTermsAndConditionsMutation,
} from "../../redux/api/termsApi.js";
import toast from "react-hot-toast";
import Loader from "../../Components/Shared/Loaders/Loader.jsx";

const TermsCondition = () => {
  const [content, setContent] = useState("this is terms and conditions");

  const { data, isLoading } = useGetTermsAndConditionsQuery({});
  const [updateTermsAndConditions, { isLoading: isSubmitting }] =
    useUpdateTermsAndConditionsMutation();

  useEffect(() => {
    if (data?.data?.TermsConditions) {
      setContent(data.data.TermsConditions);
    }
  }, [data]);

  const handleSubmit = async () => {
    try {
      const requestData = {
        TermsConditions: content, // ✅ backend expects this key
      };
      console.log("requestData of terms", requestData);

      const res = await updateTermsAndConditions({ requestData }).unwrap();
      if (res?.success) {
        toast.success(
          res?.message || "Terms & Conditions updated successfully!"
        );
      }
    } catch (error) {
      toast.error(error?.data?.message || "Something went wrong!");
      console.error(error);
    }
  };

  if (isLoading) return <Loader />;

  return (
    <>
      <PageHeading title="Terms & Condition" />
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

export default TermsCondition;

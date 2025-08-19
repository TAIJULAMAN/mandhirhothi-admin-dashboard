/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { Button, message } from "antd";
// import toast from 'react-hot-toast';
// import Loader from '../../Components/Shared/Loaders/Loader.jsx';
// import { useGetPrivacyQuery, useUpdatePrivacyMutation } from '../../redux/api/privacyApi.js';
import PageHeading from "../../Components/Shared/PageHeading.jsx";
import JoditComponent from "../../Components/Shared/JoditComponent.jsx";
import {
  useGetPrivacyQuery,
  useUpdatePrivacyMutation,
} from "../../redux/api/privacyApi.js";

const PrivacyPolicy = () => {
  const [content, setContent] = useState("this is privacy policy");

  const [updatePrivacy] = useUpdatePrivacyMutation();
  const { data, isLoading } = useGetPrivacyQuery();

  // Submit handler
  const handleSubmit = async () => {
    if (!content) {
      message.error("Privacy policy content cannot be empty!");
      return;
    }

    console.log("Content to be submitted:", content);
    const requestData = {
      PrivacyPolicy: content, // backend expects this key
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
      setContent(data?.data?.PrivacyPolicy);
    }
  }, [data]);

  // const { data, isLoading } = useGetPrivacyQuery({});
  // console.log(data);
  // const [setDescription, { isLoading: isSubmitting }] =
  //           useUpdatePrivacyMutation();
  // useEffect(() => {
  //           if (data?.data?.desc) {
  //                     setContent(data?.data?.desc);
  //           }
  // }, [data]);

  // const updateTerms = async () => {
  //           try {
  //                     const requestData = {
  //                               name: "privacy",
  //                               desc: content

  //                     };
  //                     console.log("requestData of privacy", requestData);

  //                     const res = await setDescription({ requestData }).unwrap();
  //                     if (res?.success) {
  //                               toast.success(
  //                                         res?.message || 'Privacy policy updated successfully !'
  //                               );
  //                     }
  //           } catch (error) {
  //                     console.log(error);
  //           }
  // };

  // if (isLoading) {
  //           return (
  //                     <Loader />
  //           );
  // }

  return (
    <>
      <PageHeading title="Privacy Policy" />
      <JoditComponent setContent={setContent} content={content} />
      <button
        // onClick={handleBlock}
        onClick={handleSubmit}
        className="bg-[#00823b] !text-white font-semibold w-full py-3 px-5 rounded-lg cursor-pointer"
      >
        Submit
      </button>
    </>
  );
};

export default PrivacyPolicy;

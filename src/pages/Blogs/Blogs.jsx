import React, { useState } from "react";
import AllUsers from "../User/AllUsers";
import PageHeading from "../../Components/Shared/PageHeading";
import AllBlogs from "./BlogsTable";
import CreateBlogModal from "./CreateBlogModal";

export default function Blogs() {
   const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

    const showCreateModal = () => {
    setIsCreateModalOpen(true);
  };

  const handleCreateBlog = () => {
    // This function will be passed to AllBlogs to handle the new blog creation
    setIsCreateModalOpen(false);
  };


  return (
    <>
      <div className="flex items-center justify-between mb-5">
        <PageHeading title="Blogs" />
        {/* <div className="flex gap-5"> */}
        <button
        
          onClick={showCreateModal}
          className="bg-[#00823b] !text-white font-semibold max-w-[200px] whitespace-nowrap py-3 px-5 rounded-lg"
        >
          + Create Blog
        </button>
        {/* </div> */}
      </div>

       <CreateBlogModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSave={handleCreateBlog}
      />


      <AllBlogs />
    </>
  );
}

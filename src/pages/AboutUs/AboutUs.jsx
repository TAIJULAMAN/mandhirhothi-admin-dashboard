/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import PageHeading from '../../Components/Shared/PageHeading.jsx';
import JoditComponent from '../../Components/Shared/JoditComponent.jsx';

const AboutUs = () => {
    const [content, setContent] = useState(' this is about us');


    return (
        <>

            <PageHeading title="About Us" />
            <JoditComponent setContent={setContent} content={content} />
            <button
                // onClick={handleBlock}
                className="bg-[#00823b] !text-white font-semibold w-full py-3 px-5 rounded-lg"
            >
                Submit
            </button>
        </>
    );
};

export default AboutUs;
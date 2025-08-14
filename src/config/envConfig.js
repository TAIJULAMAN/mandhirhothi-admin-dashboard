// Function to get the base API URL
export const url =
  "https://waterproof-forum-hollywood-work.trycloudflare.com/api/v1/";
export const getBaseUrl = () => {
  return url;
};

// Function to get the image base URL
export const getImageBaseUrl = () => {
  return url;
};

export const getImageUrl = (imagePath) => {
  if (imagePath.includes("http")) {
    return imagePath;
  }
  return `${url}${imagePath}`;
};

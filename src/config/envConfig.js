// Function to get the base API URL
export const imageUrl = "https://flying-memphis-nicaragua-manual.trycloudflare.com/";
export const url = `${imageUrl}api/v1/`;


export const getBaseUrl = () => {
  return url;
};

// Function to get the image base URL
export const getImageBaseUrl = () => {
  return imageUrl;
};

// get up
export const getImageUrl = (imagePath) => {
   if (!imagePath) {
    return null; // or return a placeholder if you want
  }
  if (imagePath.includes("http")) {
    return imagePath;
  }
  return `${imageUrl}${imagePath}`;
};

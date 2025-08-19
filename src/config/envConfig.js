// Function to get the base API URL
export const url =
  "https://treated-fighting-grounds-boring.trycloudflare.com/api/v1/";

export const imageUrl =
  "https://treated-fighting-grounds-boring.trycloudflare.com/";

export const getBaseUrl = () => {
  return url;
};

// Function to get the image base URL
export const getImageBaseUrl = () => {
  return imageUrl;
};

export const getImageUrl = (imagePath) => {
  if (imagePath.includes("http")) {
    return imagePath;
  }
  return `${url}${imagePath}`;
};

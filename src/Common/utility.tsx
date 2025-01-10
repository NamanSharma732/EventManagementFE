import * as moment from 'moment-timezone';
import { toast } from 'react-toastify';

export const currentYear = new Date().getFullYear();
export const earliestYear = 1700;

// debounce function
// Function to debounce the search input
export const debounce = (func, delay) => {
  let debounceTimer;
  return function (...args) {
    const context = this;
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => func.apply(context, args), delay);
  };
};

const upload_preset = process.env.REACT_APP_UPLOAD_PRESET || "";
const cloudName = process.env.REACT_APP_CLOUD_NAME || "";

// image upload
export const postImageDetails = async (
  pics,
  setPic,
  setPicLoading
) => {
  setPicLoading(true);

  try {
    if (!pics) {
      // toast.warning("Please Select an Image!");
      return null;
    }

    if (["image/jpeg", "image/png", "image/webp"].includes(pics.type)) {
      const data = new FormData();
      data.append("file", pics);
      data.append("upload_ppreset", upload_preset);
      data.append("cloud_name", cloudName);

      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
        {
          method: "POST",
          body: data,
        }
      );

      if (!response.ok) {
        throw new Error("Failed to upload image.");
      }

      const result = await response.json();
      setPic(result.url.toString());
      setPicLoading(false);
      return result.url.toString();
    } else {
      // toast.warning(
      //   "Invalid file type. Please upload an image file (jpeg, png, or webp)."
      // );
      setPicLoading(false);
      return null;
    }
  } catch (error) {
    // toast.error("An error occurred while uploading the image.");
    setPicLoading(false);
    return null;
  }
};

// validating formdata
export const validateFormData = (formData) => {
  const values = Object.values(formData);
  if (values.some((value) => value === "" || value === null)) {
    
    toast.warning("All fields must be filled out");
    return false;
  }
  return true;
};

// detect time zone
export function getTimeZoneInfo() {
  const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const abbreviation = moment.tz(timeZone).format("z");
  const offset = moment.tz(timeZone).format("Z");
  return {
    timeZone,
    abbreviation,
    offset,
  };
}

// 
export const validateFormDataExclude = (formData, mandatoryFields) => {
  console.log(mandatoryFields.some(field => formData[field] === "" || formData[field] === null));
  
const isInvalid = mandatoryFields.some(field => formData[field] === "" || formData[field] === null);
  if (isInvalid) {
    toast.warning("Mandatory fields must be filled out");
    return false;
  }
  return true;
};


// random code generation

export const generateValidationCode = () => {
  const characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
  let code = '';

  for (let i = 0; i < 4; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    code += characters.charAt(randomIndex);
  }

  return code;
};

export const generateRandom = Math.floor(1000 + Math.random() * 9000);


// date validation

export const validateDate = (value) => {
  const regex = /^\d{4}-\d{2}-\d{2}$/;
  return regex.test(value);
};

// checking entered is number or not
export const ValidateInput = (value)=>{
  let isValid = /^[^\d]*$/.test(value);
  return isValid
}
// checking height in inc or cm
export const ValidateHeight = (value)=>{
  const isValid = /^\d+(\.\d+)?\s?(in|cm)?$/.test(value);
  return isValid
}
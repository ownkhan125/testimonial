// validationSchemas.js
import * as yup from "yup";

export const spaceValidationSchema = yup.object().shape({
    name: yup.string().required("Space Name is required."),
    square: yup.boolean(),
    // image: yup.mixed().test(
    //     "fileValidation",
    //     "Only JPEG/PNG images under 5MB are allowed",
    //     (value) => {
    //         console.log('check value ', value);
    //         if (!value ) return false;
    //         const file = value[0];
    //         const isValidType = ["image/jpeg", "image/png"].includes(file.type);
    //         const isValidSize = file.size <= 5 * 1024 * 1024;
    //         return isValidType && isValidSize;
    //     }
    // ),
    header: yup.string().required("Header Title is required."),
});





// login form Schema 
export const loginValidationSchema = yup.object().shape({
    email: yup.string().email("Invalid email format").required("Email is required."),
    password: yup.string().min(6, "Password must be at least 6 characters").required("Password is required."),
});

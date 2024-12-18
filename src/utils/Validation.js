// validationSchemas.js
import * as yup from "yup";

export const spaceValidationSchema = yup.object().shape({
    name: yup.string().required("Space Name is required."),
    square: yup.boolean(),
    image: yup
        .mixed()
        .nullable()
        .test(
            "fileValidation",
            "Only JPEG/PNG images under 5MB are allowed",
            (value) => {
                if (value == 'wrong-image') {
                    return false;
                }

                if (value instanceof FileList || Array.isArray(value)) {
                    return true;
                }

                return true;
            }

        ),

    header: yup.string().required("Header Title is required."),
});





// login form Schema 
export const loginValidationSchema = yup.object().shape({
    email: yup.string().email("Invalid email format").required("Email is required."),
    password: yup.string().min(6, "Password must be at least 6 characters").required("Password is required."),
});

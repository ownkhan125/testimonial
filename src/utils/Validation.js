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


// user testimonial form 
export const userTestimonial = yup.object().shape({
    name: yup.string().max(15, 'Name must not exceed 15 characters.').required("Name is required."),
    email: yup.string().required("Email is required."),
    message: yup.string().min(10, 'must be at least 10 characters long').required("please enter your message"),
    image: yup
        .mixed()
        .nullable()
        .test(
            "fileValidation",
            "Only JPEG/PNG images under 5MB are allowed",
            (value) => {
                console.log('check value', value);
                if (value.length > 0 && value instanceof FileList && value[0].size > 5 * 1024 * 1024) {
                    return false;
                }


                return true;
            }

        ),


    photo: yup
        .mixed()
        .nullable()
        .test(
            "fileValidation",
            "Only JPEG/PNG images under 5MB are allowed",
            (value) => {
                if (value.length > 0 && value instanceof FileList && value[0].size > 5 * 1024 * 1024) {
                    return false;
                }

                return true;
            }

        ),


});





// login form Schema 
export const loginValidationSchema = yup.object().shape({
    email: yup.string().email("Invalid email format").required("Email is required."),
    password: yup.string().min(6, "Password must be at least 6 characters").required("Password is required."),
});

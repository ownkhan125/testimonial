// useValidation.js
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

export const useValidation = (schema) => {
    return useForm({
        resolver: yupResolver(schema),
        
    });
};

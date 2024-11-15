"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";


const page = () => {
  const { register, handleSubmit } = useForm();
  const [preview, setPreview] = useState(null);

  const handleFormSubmit = (formData) => {
    // if user does not select an image, show error message and return
    if (!formData?.image[0]) {
      toast.error("Please select an image");
      return;
    }

    const imageUrl = URL.createObjectURL(formData.image[0]);
    setPreview(imageUrl);
  };

  return (
    <div className="container mx-auto py-4">
      <form className="d-flex  pb-3" onSubmit={handleSubmit(handleFormSubmit)}>
        <input
          type="file"
          className="form-control rounded-0"
          {...register("image")}
        />
        <button type="submit" className="btn btn-secondary rounded-0">
          Submit
        </button>
      </form>

      <div className="py-2">
        <h4>Image preview</h4>
        {preview && (
          <img className="img rounded-2 mt-2" src={preview} alt="preview" />
        )}
      </div>
    </div>
  );
};

export default page;
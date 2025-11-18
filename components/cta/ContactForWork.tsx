import React from "react";
import Button from "../common/Button";

const ContactForWork = () => {
  return (
    <div className="w-full px-4 md:px-8 lg:px-16 py-20 md:py-28 lg:py-36 flex justify-center items-center">
      <div className="text-center flex flex-col gap-6 md:gap-8 max-w-4xl">
        <h1 className="text-3xl md:text-4xl lg:text-6xl font-light leading-tight">
          Ready to Build Something Meaningful?{" "}
          <span className="font-bold">Let’s Talk</span>.
        </h1>

        <p className="text-neutral-base w-full md:w-3/4 lg:w-1/2 mx-auto text-sm md:text-base">
          Have an idea that needs a developer? Let's bring your vision to life
          and create something that actually makes an impact.
        </p>

        <Button className="w-fit mx-auto" label="Contact For Work" />
      </div>
    </div>
  );
};

export default ContactForWork;

import React from 'react'
import Button from '../common/Button';
import Image from 'next/image';

const About = () => {
  return (
    <div className="w-full px-4 md:px-8 lg:px-16 pt-8">
      <div className="bg-neutaral-lighter rounded-2xl p-8 md:p-16 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        {/* IMAGE — shows first on mobile */}
        <div className="flex justify-center items-center order-1 md:order-2">
          <Image
            src={"/images/my-image.jpeg"}
            alt="about-image"
            width={400}
            height={800}
            className="rounded-2xl object-cover grayscale w-full max-w-sm"
          />
        </div>

        {/* CONTENT — shows second on mobile */}
        <div className="flex flex-col space-y-8 order-2 md:order-1">
          <h1 className="text-3xl font-bolder">About Me</h1>

          <p className="text-3xl text-neutaral-darkest leading-11">
            I’m Sayanth, a web developer passionate about building sleek,
            user-focused digital experiences with a touch of{" "}
            <span className="text-neutaral-base">creativity</span>.
          </p>

          <p className="text-neutaral-base">
            I enjoy turning ideas into meaningful digital experiences. From
            component-level details to full product flows, I focus on writing
            clean code, designing intuitive interfaces, and building things that
            feel good to use. I’m always experimenting, learning, and refining
            my craft.
          </p>

          <div className="flex flex-col gap-4">
            <h3 className="text-2xl font-normal mb-2">Web Development</h3>
            <hr className="text-neutaral-light" />

            <h3 className="text-2xl font-normal mb-2">UI/UX Design</h3>
            <hr className="text-neutaral-light" />

            <h3 className="text-2xl font-normal mb-2">Frontend Engineering</h3>
            <hr className="text-neutaral-light" />
          </div>

          <div className="w-fit">
            <Button link="/" label="More About Me" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default About
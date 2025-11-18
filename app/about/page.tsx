import Image from 'next/image';
import { Metadata } from 'next';
import Button from '@/components/common/Button';

export const metadata: Metadata = {
  title: 'About Me',
  description: 'Learn more about me and my work',
};

export default function AboutPage() {
  return (
    <div className="min-h-screen w-full px-4 md:px-8 lg:px-16 py-16">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">About Me</h1>
          <div className="w-16 h-1 bg-linear-to-r from-neutaral-dark to-neutaral-lighter rounded"></div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 items-start">
          {/* Image */}
          <div className="md:col-span-1 flex justify-center">
            <Image
              src="/images/my-image.jpeg"
              alt="Profile"
              width={300}
              height={400}
              className="rounded-lg object-cover shadow-lg"
            />
          </div>

          {/* Text Content */}
          <div className="md:col-span-2 space-y-6">
            <p className="text-lg text-gray-700 leading-relaxed">
              I'm Sayanth, a passionate web developer focused on creating beautiful, 
              user-centered digital experiences. With expertise in modern web technologies, 
              I blend design thinking with clean code to build products that matter.
            </p>

            <div>
              <h2 className="text-2xl font-semibold mb-3">What I Do</h2>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start">
                  <span className="text-neutaral-dark mr-3 font-bold">•</span>
                  <span>Frontend Development with React, Next.js, and TypeScript</span>
                </li>
                <li className="flex items-start">
                  <span className="text-neutaral-dark mr-3 font-bold">•</span>
                  <span>UI/UX Design and responsive web design</span>
                </li>
                <li className="flex items-start">
                  <span className="text-neutaral-dark mr-3 font-bold">•</span>
                  <span>Full-stack development with modern tools and frameworks</span>
                </li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-semibold mb-3">Let's Connect</h2>
              <p className="text-gray-700 mb-4">
                I'm always interested in discussing new projects and opportunities.
              </p>
              <div className="flex gap-4">
                <Button link="/" label="Back Home" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

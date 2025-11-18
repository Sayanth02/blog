import Button from '@/components/common/Button';
import { Github, Linkedin, Mail } from 'lucide-react';
import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Contact Me',
  description: 'Get in touch with me',
};

export default function ContactPage() {
  return (
    <div className="min-h-screen w-full px-4 md:px-8 lg:px-16 py-16">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="mb-12 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Get In Touch</h1>
          <p className="text-lg text-gray-600">
            Have a project in mind or want to collaborate? I'd love to hear from
            you.
          </p>
          <div className="w-16 h-1 bg-linear-to-r from-neutaral-dark to-neutaral-lighter rounded mx-auto mt-6"></div>
        </div>

        {/* Contact Form */}
        <form className="space-y-6 mb-12">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-neutaral-dark focus:border-transparent outline-none transition"
              placeholder="Your name"
            />
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-neutaral-dark focus:border-transparent outline-none transition"
              placeholder="your@email.com"
            />
          </div>

          <div>
            <label
              htmlFor="subject"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Subject
            </label>
            <input
              type="text"
              id="subject"
              name="subject"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-neutaral-dark focus:border-transparent outline-none transition"
              placeholder="What's this about?"
            />
          </div>

          <div>
            <label
              htmlFor="message"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Message
            </label>
            <textarea
              id="message"
              name="message"
              required
              rows={6}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-neutaral-dark focus:border-transparent outline-none transition resize-none"
              placeholder="Your message here..."
            />
          </div>

          <button
            type="submit"
            className="w-full bg-neutaral-darker hover:bg-neutaral-dark text-white font-semibold py-3 rounded-lg transition duration-200"
          >
            Send Message
          </button>
        </form>

        {/* Alternative Contact Methods */}
        <div className="bg-gray-50 rounded-lg p-8 text-center">
          <h2 className="text-2xl font-semibold mb-6">Other Ways to Connect</h2>
          <div className="space-y-3 text-gray-700">
  {/* Email */}
  <p className="flex items-center justify-center gap-2 cursor-pointer">
    <Mail />
    <Link
      href="mailto:Sayanthpkumar875@gmail.com"
      target="_blank"
      className="font-medium hover:underline"
    >
      Sayanthpkumar875@gmail.com
    </Link>
  </p>

  {/* LinkedIn */}
  <p className="flex items-center justify-center gap-2 cursor-pointer">
    <Linkedin />
    <Link
      href="https://www.linkedin.com/in/sayanth-p-kumar-878500290"
      target="_blank"
      className="font-medium hover:underline"
    >
      linkedin.com/in/sayanth-p-kumar-878500290
    </Link>
  </p>

  {/* GitHub */}
  <p className="flex items-center justify-center gap-2 cursor-pointer">
    <Github />
    <Link
      href="https://github.com/Sayanth02"
      target="_blank"
      className="font-medium hover:underline"
    >
      github.com/Sayanth02
    </Link>
  </p>
</div>
        </div>

        {/* Back Button */}
        <div className="mt-12 text-center">
          <Button link="/" label="Back Home" />
        </div>
      </div>
    </div>
  );
}

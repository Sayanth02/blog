"use client";
import React from "react";

const Footer = () => {
  const categories = [
    { title: "Web Development", link: "/categories" },
    { title: "Frontend", link: "/categories" },
    { title: "UI/UX", link: "/categories" },
    { title: "Tutorials", link: "/categories" },
    { title: "Productivity", link: "/categories" },
    { title: "Projects", link: "/categories" },
  ];

  const socials = [
    { title: "Twitter", link: "https://twitter.com" },
    { title: "LinkedIn", link: "https://linkedin.com" },
    { title: "GitHub", link: "https://github.com" },
    { title: "Facebook", link: "https://facebook.com" },
  ];
  const pages = [
    { title: "About", link: "/about" },
    { title: "Contact", link: "/contact" },
    { title: "Privacy Policy", link: "/privacy-policy" },
    { title: "Terms of Service", link: "/terms-of-service" },
  ];
  const scrollToTop = (): void => {
    if (typeof window === "undefined") return;
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  return (
    <div className="w-full px-4 md:px-8 lg:px-16 py-8 border-t border-neutaral-lighter mt-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 py-24">
        <div className="flex flex-col space-y-6">
          <h1 className="text-4xl">The localhost</h1>
          <p className="text-neutaral-base leading-8 text-lg  w-3/4">
            I write about tech, development, and the things I’m building. The
            Local Host is my space to document what I learn. Simple ideas,
            practical insights.
          </p>
        </div>
        <div>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <h3 className="text-xl font-bold mb-4">Categories</h3>
              <ul className="flex flex-col space-y-2">
                {categories.map((category) => (
                  <li key={category.title}>
                    <a
                      href={category.link}
                      className="text-neutaral-base hover:underline"
                    >
                      {category.title}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4">Socials</h3>
              <ul className="flex flex-col space-y-2">
                {socials.map((social) => (
                  <li key={social.title}>
                    <a
                      href={social.link}
                      className="text-neutaral-base hover:underline"
                    >
                      {social.title}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4">Pages</h3>
              <ul className="flex flex-col space-y-2">
                {pages.map((page) => (
                  <li key={page.title}>
                    <a
                      href={page.link}
                      className="text-neutaral-base hover:underline"
                    >
                      {page.title}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
      <hr className="text-neutaral-lighter" />
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 py-8 md:py-12 px-6 md:px-8">
        <p className="text-gray-400 text-xs md:text-sm text-center md:text-left">
          © 2024 Copyright - Ceilor | Designed by "UIXFlow" | License | Powered
          by Webflow
        </p>

        <button
          onClick={scrollToTop}
          className="flex items-center gap-3 text-black hover:opacity-70 transition-opacity group"
          aria-label="Scroll back to top"
        >
          <span className="text-sm font-medium">Back To Top</span>
          <div className="w-10 h-10 md:w-12 md:h-12 bg-black rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
            <svg
              className="w-4 h-4 md:w-5 md:h-5 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 15l7-7 7 7"
              />
            </svg>
          </div>
        </button>
      </div>
    </div>
  );
};

export default Footer;

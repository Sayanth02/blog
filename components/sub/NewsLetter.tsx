'use client'
import React from 'react'

const NewsLetter = () => {
    const [submitted, setSubmitted] = React.useState(false);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setSubmitted(true);
    };
  return (
    <div className="w-full px-4 md:px-8 lg:px-16 py-8">
      <div className="flex flex-col md:flex-row justify-between items-center">
        <div className="flex flex-col space-y-4">
          <h2 className="text-xs text-neutaral-base">My Newsletter</h2>
          <p className="text-2xl w-1/2  leading-8 ">
            Subscribe my newsletter to get the latest posts delivered right to
            your email.
          </p>
        </div>
        <div>
          { !submitted ? (<form  onSubmit={handleSubmit}    className="flex gap-2">
            <input
              type="email"
              placeholder="Enter your email"
              className="min-w-sm px-8 py-2 border border-neutaral-lighter rounded-4xl focus:outline-none"
            />
            <button
              type="submit"
              className="px-8 py-2 bg-black text-white font-semibold rounded-4xl hover:bg-neutaral-base transition-colors"
            >
              Subscribe
            </button>
          </form>):(
            <div className='bg-black min-w-sm text-white p-4 text-center'><p >Thank you for subscribing!</p></div>
          )}
        </div>
      </div>
    </div>
  );
}

export default NewsLetter
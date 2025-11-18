import HeroCarousel from "@/components/hero/HeroCarousel";
import About from "@/components/about/About";
import RecentPosts from "@/components/recent/RecentPosts";
import ContactForWork from "@/components/cta/ContactForWork";
import Categories from "@/components/category/Categories";
import Footer from "@/components/common/Footer";
import Featured from "@/components/featured/Featured";
import NewsLetter from "@/components/sub/NewsLetter";
import { client } from "@/sanity/lib/client";
import { featuredPostsQuery } from "@/sanity/lib/queries";
import type { Post } from "@/sanity/lib/types";
import Hero from "@/components/hero/Hero";



export default async function Home() {


  return (
    <div>
      <Hero/>
      <About/>
      <RecentPosts/>
      <ContactForWork/>
      {/* <Categories/> */}
      <Featured />
      <NewsLetter/>
      <Footer/>
    </div>
  );
}

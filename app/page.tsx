import HeroCarousel from "@/components/hero/HeroCarousel";
import About from "@/components/about/About";
import RecentPosts from "@/components/recent/RecentPosts";
import ContactForWork from "@/components/cta/ContactForWork";
import Categories from "@/components/category/Categories";
import Footer from "@/components/common/Footer";
import Featured from "@/components/featured/Featured";

export default function Home() {
  return (
    <div>
      <HeroCarousel/>
      <About/>
      <RecentPosts/>
      <ContactForWork/>
      {/* <Categories/> */}
      <Featured/>
      <Footer/>
    </div>
  );
}

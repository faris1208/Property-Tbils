import { HeroSection } from '@/features/home/HeroSection';
import { FeaturedListings } from '@/features/home/FeaturedListings';
import { ExploreByCity } from '@/features/home/ExploreByCity';
import { WhyTBILS } from '@/features/home/WhyTBILS';
import { Testimonials } from '@/features/home/Testimonials';
import { BlogPreview } from '@/features/home/BlogPreview';

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <FeaturedListings />
      <ExploreByCity />
      <WhyTBILS />
      <Testimonials />
      <BlogPreview />
    </>
  );
}

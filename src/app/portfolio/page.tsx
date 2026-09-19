import { CategoryNavigation } from "@/components/portfolio/CategoryNavigation";
import { PortfolioGrid } from "@/components/portfolio/PortfolioGrid";
import { Reveal } from "@/components/motion/Reveal";
import { getCategoryList, getPortfolioImages } from "@/lib/google-drive/provider";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Portfolio",
  description:
    "Explore the complete archive of fine art weddings, couture editorials, intimate portraits, and commercial work.",
};

export default async function PortfolioPage() {
  const images = await getPortfolioImages();
  const categories = getCategoryList();

  return (
    <div className="pt-36 pb-24">
      {/* Page header */}
      <div className="max-w-screen-2xl mx-auto px-6 sm:px-10 mb-14">
        <Reveal>
          <span className="text-[10px] uppercase tracking-[0.35em] text-gold block mb-3">
            Archive
          </span>
          <h1 className="font-serif text-5xl sm:text-6xl lg:text-7xl text-ivory font-normal leading-none tracking-tight">
            The Work
          </h1>
        </Reveal>
      </div>

      {/* Category tabs */}
      <div className="max-w-screen-2xl mx-auto px-6 sm:px-10 mb-12">
        <CategoryNavigation categories={categories} activeCategory="all" />
      </div>

      {/* Gallery */}
      <div className="max-w-screen-2xl mx-auto px-6 sm:px-10">
        <PortfolioGrid images={images} />
      </div>
    </div>
  );
}

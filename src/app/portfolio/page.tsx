import { CategoryNavigation } from "@/components/portfolio/CategoryNavigation";
import { PortfolioGrid } from "@/components/portfolio/PortfolioGrid";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { getCategoryList, getPortfolioImages } from "@/lib/google-drive/provider";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Portfolio Archive",
  description:
    "Explore our complete archive of fine art destination weddings, couture fashion editorials, intimate character portraits, and commercial architecture.",
};

export default async function PortfolioPage() {
  const images = await getPortfolioImages();
  const categories = getCategoryList();

  return (
    <div className="pt-32 pb-24 max-w-7xl mx-auto px-6 sm:px-8">
      <SectionHeading
        badge="Archive"
        title="Complete Portfolio"
        subtitle="A visual retrospective of light, emotional depth, and architectural form documented across continents."
      />

      <CategoryNavigation categories={categories} activeCategory="all" />

      <PortfolioGrid images={images} />
    </div>
  );
}

import { CategoryNavigation } from "@/components/portfolio/CategoryNavigation";
import { PortfolioGrid } from "@/components/portfolio/PortfolioGrid";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { getCategoryBySlug, getCategoryList, getPortfolioImages } from "@/lib/google-drive/provider";
import { PortfolioCategory } from "@/types";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

interface CategoryPageProps {
  params: Promise<{
    category: string;
  }>;
}

export async function generateStaticParams() {
  const categories = getCategoryList();
  return categories.map((c) => ({
    category: c.slug,
  }));
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const { category: categorySlug } = await params;
  const categoryInfo = getCategoryBySlug(categorySlug);

  if (!categoryInfo) {
    return {
      title: "Collection Not Found",
    };
  }

  return {
    title: `${categoryInfo.name} Photography`,
    description: categoryInfo.description,
  };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { category: categorySlug } = await params;
  const categoryInfo = getCategoryBySlug(categorySlug);

  if (!categoryInfo) {
    notFound();
  }

  const images = await getPortfolioImages(categoryInfo.id as PortfolioCategory);
  const categories = getCategoryList();

  return (
    <div className="pt-32 pb-24 max-w-7xl mx-auto px-6 sm:px-8">
      <SectionHeading
        badge={`Collection 0${categoryInfo.order}`}
        title={`${categoryInfo.name} Photography`}
        subtitle={categoryInfo.description}
      />

      <CategoryNavigation categories={categories} activeCategory={categoryInfo.id} />

      <PortfolioGrid
        images={images}
        emptyMessage={`The ${categoryInfo.name} collection is currently being curated with fresh photographs.`}
      />
    </div>
  );
}

import { CategoryNavigation } from "@/components/portfolio/CategoryNavigation";
import { PortfolioGrid } from "@/components/portfolio/PortfolioGrid";
import { Reveal } from "@/components/motion/Reveal";
import { ParallaxImage } from "@/components/motion/ParallaxImage";
import { getCategoryBySlug, getCategoryList, getPortfolioImages } from "@/lib/google-drive/provider";
import { PortfolioCategory } from "@/types";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

interface CategoryPageProps {
  params: Promise<{ category: string }>;
}

export async function generateStaticParams() {
  return getCategoryList().map((c) => ({ category: c.slug }));
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const { category: slug } = await params;
  const cat = getCategoryBySlug(slug);
  if (!cat) return { title: "Collection Not Found" };
  return {
    title: `${cat.name} Photography`,
    description: cat.description,
  };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { category: slug } = await params;
  const cat = getCategoryBySlug(slug);
  if (!cat) notFound();

  const images = await getPortfolioImages(cat.id as PortfolioCategory);
  const categories = getCategoryList();

  return (
    <div className="pb-24">
      {/* Full-screen category hero */}
      <div className="relative h-[55vh] min-h-[380px] flex items-end overflow-hidden mb-20">
        <ParallaxImage
          src={cat.coverImage}
          alt={cat.name}
          speed={0.1}
          wrapperClassName="absolute inset-0"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-background/10" />

        <div className="relative z-10 max-w-screen-2xl mx-auto px-6 sm:px-10 w-full pb-14">
          <Reveal>
            <span className="text-[10px] uppercase tracking-[0.35em] text-gold block mb-3">
              Collection 0{cat.order}
            </span>
            <h1 className="font-serif text-5xl sm:text-6xl lg:text-7xl text-ivory font-normal leading-none tracking-tight">
              {cat.name}
            </h1>
            <p className="mt-3 text-sm text-ivory-muted font-light max-w-lg">
              {cat.subtitle}
            </p>
          </Reveal>
        </div>
      </div>

      {/* Category navigation */}
      <div className="max-w-screen-2xl mx-auto px-6 sm:px-10 mb-12">
        <CategoryNavigation categories={categories} activeCategory={cat.id} />
      </div>

      {/* Gallery */}
      <div className="max-w-screen-2xl mx-auto px-6 sm:px-10">
        <PortfolioGrid
          images={images}
          emptyMessage={`The ${cat.name} collection is currently being curated with fresh photographs.`}
        />
      </div>
    </div>
  );
}

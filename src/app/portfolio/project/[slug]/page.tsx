import { PortfolioGrid } from "@/components/portfolio/PortfolioGrid";
import { Reveal } from "@/components/motion/Reveal";
import { MagneticButton } from "@/components/motion/MagneticButton";
import { ParallaxImage } from "@/components/motion/ParallaxImage";
import { getPortfolioProjects, getProjectBySlug } from "@/lib/google-drive/provider";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

interface ProjectPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const projects = await getPortfolioProjects();
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);
  if (!project) return { title: "Project Not Found" };
  return {
    title: project.title,
    description: project.tagline || project.story?.slice(0, 160),
    openGraph: {
      title: project.title,
      description: project.tagline,
      images: [project.coverImage.url],
    },
  };
}

export default async function ProjectDetailPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);
  if (!project) notFound();

  const allProjects = await getPortfolioProjects();
  const related = allProjects
    .filter((p) => p.slug !== project.slug && p.category === project.category)
    .slice(0, 2);

  return (
    <article className="pb-24 overflow-hidden">

      {/* Full-screen hero image */}
      <div className="relative h-[85vh] min-h-[520px] flex items-end overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src={project.coverImage.url}
            alt={project.coverImage.alt}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-background/10" />
        </div>

        <div className="relative z-10 max-w-screen-2xl mx-auto px-6 sm:px-10 w-full pb-14">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-[9px] uppercase tracking-[0.3em] text-ivory-dim mb-6">
            <Link href="/portfolio" className="hover:text-gold transition-colors">Portfolio</Link>
            <span>/</span>
            <Link href={`/portfolio/${project.category}`} className="hover:text-gold transition-colors capitalize">
              {project.category}
            </Link>
            <span>/</span>
            <span className="text-gold">{project.title}</span>
          </div>

          <Reveal>
            <span className="text-[10px] uppercase tracking-[0.35em] text-gold block mb-3">
              {project.category} · Editorial Story
            </span>
            <h1 className="font-serif text-[clamp(2.2rem,6vw,5.5rem)] text-ivory font-normal leading-[0.95] tracking-tight max-w-3xl">
              {project.title}
            </h1>
            {project.tagline && (
              <p className="mt-4 font-serif text-lg sm:text-xl text-ivory-muted italic font-light">
                &ldquo;{project.tagline}&rdquo;
              </p>
            )}
          </Reveal>
        </div>
      </div>

      {/* Metadata strip */}
      <div className="max-w-screen-2xl mx-auto px-6 sm:px-10">
        <Reveal className="py-8 border-b border-surface-border grid grid-cols-2 sm:grid-cols-4 gap-6 text-[10px] uppercase tracking-[0.2em]">
          <div>
            <span className="text-ivory-dim block mb-1">Category</span>
            <span className="text-ivory capitalize">{project.category}</span>
          </div>
          {project.location && (
            <div>
              <span className="text-ivory-dim block mb-1">Location</span>
              <span className="text-ivory">{project.location}</span>
            </div>
          )}
          {project.date && (
            <div>
              <span className="text-ivory-dim block mb-1">Date</span>
              <span className="text-ivory">{project.date}</span>
            </div>
          )}
          {project.client && (
            <div>
              <span className="text-ivory-dim block mb-1">Client</span>
              <span className="text-ivory">{project.client}</span>
            </div>
          )}
        </Reveal>
      </div>

      {/* Story */}
      {project.story && (
        <div className="max-w-screen-2xl mx-auto px-6 sm:px-10 py-20">
          <Reveal className="max-w-3xl">
            <span className="text-[10px] uppercase tracking-[0.35em] text-gold block mb-6">The Story</span>
            <p className="font-serif text-xl sm:text-2xl text-ivory leading-relaxed font-light">
              {project.story}
            </p>
          </Reveal>
        </div>
      )}

      {/* Gallery — full bleed */}
      <div className="max-w-screen-2xl mx-auto px-6 sm:px-10 mb-24">
        <Reveal className="mb-12">
          <span className="text-[10px] uppercase tracking-[0.35em] text-gold block mb-3">Gallery</span>
          <h2 className="font-serif text-3xl sm:text-4xl text-ivory font-normal">The Complete Essay</h2>
        </Reveal>
        <PortfolioGrid images={project.images} />
      </div>

      {/* Related */}
      {related.length > 0 && (
        <div className="max-w-screen-2xl mx-auto px-6 sm:px-10 mb-24 border-t border-surface-border pt-20">
          <Reveal className="mb-12">
            <span className="text-[10px] uppercase tracking-[0.35em] text-gold block mb-3">More Stories</span>
            <h2 className="font-serif text-3xl sm:text-4xl text-ivory font-normal capitalize">
              More {project.category} Work
            </h2>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-surface-border">
            {related.map((rel) => (
              <Link
                key={rel.id}
                href={`/portfolio/project/${rel.slug}`}
                data-cursor="view"
                className="group block bg-background overflow-hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
              >
                <div className="relative aspect-[16/10] overflow-hidden">
                  <Image
                    src={rel.coverImage.url}
                    alt={rel.coverImage.alt}
                    fill
                    sizes="50vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                  />
                  <div className="absolute inset-0 overlay-bottom opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>
                <div className="p-6 border-t border-surface-border">
                  <span className="text-[9px] uppercase tracking-[0.3em] text-gold block mb-1">{rel.category}</span>
                  <h4 className="font-serif text-xl text-ivory group-hover:text-gold transition-colors duration-300">
                    {rel.title}
                  </h4>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Final CTA */}
      <div className="max-w-screen-2xl mx-auto px-6 sm:px-10">
        <Reveal className="relative overflow-hidden h-[45vh] min-h-[340px] flex items-center justify-center">
          <ParallaxImage
            src={project.coverImage.url}
            alt={project.title}
            speed={0.08}
            wrapperClassName="absolute inset-0"
          />
          <div className="absolute inset-0 bg-background/75" />
          <div className="relative z-10 text-center">
            <span className="text-[10px] uppercase tracking-[0.35em] text-gold block mb-4">
              Commission Inquiries
            </span>
            <h3 className="font-serif text-3xl sm:text-5xl text-ivory mb-8 font-normal">
              Let&rsquo;s create something unforgettable.
            </h3>
            <MagneticButton>
              <Link
                href="/contact"
                data-cursor="open"
                className="inline-flex text-[11px] uppercase tracking-[0.25em] bg-gold text-background px-10 py-4 hover:bg-gold-hover transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              >
                Start a Project
              </Link>
            </MagneticButton>
          </div>
        </Reveal>
      </div>

    </article>
  );
}

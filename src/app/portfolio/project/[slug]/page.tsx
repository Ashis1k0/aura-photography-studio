import { PortfolioGrid } from "@/components/portfolio/PortfolioGrid";
import { Button } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { getPortfolioProjects, getProjectBySlug } from "@/lib/google-drive/provider";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

interface ProjectPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  const projects = await getPortfolioProjects();
  return projects.map((p) => ({
    slug: p.slug,
  }));
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  if (!project) {
    return { title: "Project Not Found" };
  }

  return {
    title: `${project.title}`,
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

  if (!project) {
    notFound();
  }

  const allProjects = await getPortfolioProjects();
  const relatedProjects = allProjects
    .filter((p) => p.slug !== project.slug && p.category === project.category)
    .slice(0, 2);

  return (
    <article className="pt-32 pb-24 max-w-7xl mx-auto px-6 sm:px-8">
      {/* Top Breadcrumb */}
      <div className="mb-8 flex items-center space-x-2 text-xs uppercase tracking-widest text-ivory-dim">
        <Link href="/portfolio" className="hover:text-ivory transition-colors">
          Portfolio
        </Link>
        <span>/</span>
        <Link
          href={`/portfolio/${project.category}`}
          className="hover:text-ivory transition-colors"
        >
          {project.category}
        </Link>
        <span>/</span>
        <span className="text-gold">{project.title}</span>
      </div>

      {/* Project Header */}
      <div className="max-w-4xl mb-12">
        <span className="text-xs uppercase tracking-[0.25em] text-gold font-medium mb-3 block">
          Editorial Story &bull; {project.category}
        </span>
        <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl text-ivory font-normal leading-[1.1] tracking-tight">
          {project.title}
        </h1>
        {project.tagline && (
          <p className="mt-4 text-lg sm:text-xl text-ivory-muted font-light italic">
            &ldquo;{project.tagline}&rdquo;
          </p>
        )}
      </div>

      {/* Project Metadata Strip */}
      <div className="py-6 border-y border-surface-border mb-12 grid grid-cols-2 sm:grid-cols-4 gap-6 text-xs uppercase tracking-wider">
        <div>
          <span className="text-ivory-dim block mb-1">Category</span>
          <span className="text-ivory font-medium">{project.category}</span>
        </div>
        {project.location && (
          <div>
            <span className="text-ivory-dim block mb-1">Location</span>
            <span className="text-ivory font-medium">{project.location}</span>
          </div>
        )}
        {project.date && (
          <div>
            <span className="text-ivory-dim block mb-1">Timeline</span>
            <span className="text-ivory font-medium">{project.date}</span>
          </div>
        )}
        {project.client && (
          <div>
            <span className="text-ivory-dim block mb-1">Client</span>
            <span className="text-ivory font-medium">{project.client}</span>
          </div>
        )}
      </div>

      {/* Hero Cover Image */}
      <div className="relative w-full aspect-[16/9] sm:aspect-[21/9] bg-surface overflow-hidden border border-surface-border mb-16 shadow-2xl">
        <Image
          src={project.coverImage.url}
          alt={project.coverImage.alt}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
      </div>

      {/* Story Narrative */}
      {project.story && (
        <div className="max-w-3xl mx-auto mb-20 space-y-6">
          <span className="text-xs uppercase tracking-[0.25em] text-gold font-medium block">
            The Concept & Story
          </span>
          <p className="font-serif text-xl sm:text-2xl text-ivory leading-relaxed font-light">
            {project.story}
          </p>
        </div>
      )}

      {/* Project Image Gallery */}
      <div className="mb-24">
        <SectionHeading
          badge="Gallery"
          title="The Complete Essay"
          subtitle="Click any photograph to view in full resolution."
        />
        <PortfolioGrid images={project.images} />
      </div>

      {/* Related Projects */}
      {relatedProjects.length > 0 && (
        <div className="pt-16 border-t border-surface-border mb-20">
          <SectionHeading
            badge="More Stories"
            title="Related Commissions"
            subtitle={`Further explorations within ${project.category}.`}
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {relatedProjects.map((rel) => (
              <Link
                key={rel.id}
                href={`/portfolio/project/${rel.slug}`}
                className="group block bg-surface border border-surface-border overflow-hidden"
              >
                <div className="relative aspect-[16/10] overflow-hidden">
                  <Image
                    src={rel.coverImage.url}
                    alt={rel.coverImage.alt}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <div className="p-6">
                  <span className="text-[10px] uppercase tracking-widest text-gold block mb-1">
                    {rel.category}
                  </span>
                  <h4 className="font-serif text-xl text-ivory group-hover:text-gold transition-colors">
                    {rel.title}
                  </h4>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Final Conversion CTA */}
      <div className="p-12 sm:p-16 bg-surface border border-gold/30 text-center flex flex-col items-center space-y-6 max-w-4xl mx-auto">
        <span className="text-xs uppercase tracking-[0.25em] text-gold font-medium">
          Commission Inquiries
        </span>
        <h3 className="font-serif text-3xl sm:text-4xl text-ivory">
          Let’s create something unforgettable.
        </h3>
        <p className="text-sm text-ivory-muted max-w-md font-light">
          We are currently taking bookings for destination weddings, couture campaigns, and private portrait sessions worldwide.
        </p>
        <Button href="/contact" variant="gold" size="lg">
          Start a Project
        </Button>
      </div>
    </article>
  );
}

import { SectionHeading } from "@/components/ui/SectionHeading";
import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Journal & Field Notes",
  description:
    "Reflections on lighting, destination wedding direction, analog film grain, and visual storytelling.",
};

const ARTICLES = [
  {
    id: "art-01",
    slug: "harnessing-twilight-at-destination-unions",
    title: "The Alchemy of Blue Hour: Capturing Destination Vows Between Day and Night",
    date: "August 2026",
    readTime: "5 min read",
    category: "Technique & Vision",
    excerpt: "Why the brief twenty-minute window after sunset yields the most emotionally resonant and tender memories of any wedding celebration.",
    image: "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=1000&auto=format&fit=crop",
  },
  {
    id: "art-02",
    slug: "the-enduring-elegance-of-35mm-film",
    title: "Texture Over Perfection: Why Modern Couples Are Demanding 35mm Analog Film",
    date: "June 2026",
    readTime: "7 min read",
    category: "Medium & Philosophy",
    excerpt: "In an era of hyper-sharp clinical digital sensors, the organic silver halide grain of film restores poetry and physical soul to wedding documents.",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1000&auto=format&fit=crop",
  },
  {
    id: "art-03",
    slug: "designing-a-thoughtful-wedding-timeline",
    title: "Orchestrating Light: How to Structure Your Wedding Day for Timeless Photography",
    date: "April 2026",
    readTime: "6 min read",
    category: "Client Guidance",
    excerpt: "A photographer's guide to coordinating ceremony timing, cocktail hour, and portrait sessions with the natural arc of the sun.",
    image: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=1000&auto=format&fit=crop",
  },
];

export default function JournalPage() {
  return (
    <div className="pt-32 pb-24 max-w-7xl mx-auto px-6 sm:px-8">
      <SectionHeading
        badge="Field Notes"
        title="Journal & Reflections"
        subtitle="Insights into our visual philosophy, destination location guides, and practical advice for couples planning their celebrations."
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {ARTICLES.map((article) => (
          <article
            key={article.id}
            className="group bg-surface border border-surface-border overflow-hidden flex flex-col justify-between"
          >
            <div>
              <div className="relative aspect-[16/10] overflow-hidden">
                <Image
                  src={article.image}
                  alt={article.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute top-4 left-4 px-3 py-1 bg-background/80 backdrop-blur-md border border-surface-border text-[10px] uppercase tracking-widest text-gold">
                  {article.category}
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-center space-x-2 text-xs text-ivory-dim mb-3">
                  <span>{article.date}</span>
                  <span>&bull;</span>
                  <span>{article.readTime}</span>
                </div>
                <h3 className="font-serif text-xl text-ivory group-hover:text-gold transition-colors duration-200 leading-snug">
                  {article.title}
                </h3>
                <p className="mt-3 text-xs sm:text-sm text-ivory-muted font-light leading-relaxed">
                  {article.excerpt}
                </p>
              </div>
            </div>
            <div className="p-6 pt-0 border-t border-surface-border/50 mt-4 flex items-center justify-between text-xs text-ivory-dim">
              <span className="uppercase tracking-widest text-gold text-[10px]">Read Story</span>
              <span className="text-gold font-mono">&rarr;</span>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

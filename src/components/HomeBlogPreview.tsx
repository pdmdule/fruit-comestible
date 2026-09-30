import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Clock, BookOpen, ChefHat } from 'lucide-react';

export interface HomeBlogPostItem {
  id?: string;
  slug: string;
  title: string;
  excerpt: string;
  category?: string;
  read_time?: string;
  image?: string;
  created_at?: string;
}

const DEFAULT_POSTS: HomeBlogPostItem[] = [
  {
    slug: 'zwetschgen-tiramisu',
    title: 'Zwetschgen Tiramisu im Glas',
    excerpt:
      'Eine herrliche Schweizer Dessert-Idee: Knuspriges Zwetschgengranulat trifft auf cremige Tiramisumasse und eine fruchtig-herbe Cassis-Schicht.',
    category: 'Rezept',
    read_time: '10 Min. Zubereitung',
    image:
      'https://images.unsplash.com/photo-1568702846914-96b305d2aaeb?q=80&w=800&auto=format&fit=crop',
    created_at: '2026-09-28',
  },
  {
    slug: 'clean-food-sauberes-essen',
    title: 'Clean Food – Sauberes Essen: "Sauber" zu essen ist gar nicht leicht',
    excerpt:
      'Warum herkömmliche Glace oft einem Chemiebaukasten gleicht und wie man mit 100% Fruchtpulver gesunden Genuss ohne E-Nummern zaubert.',
    category: 'Healthy Food',
    read_time: '4 Min. Lesezeit',
    image:
      'https://images.unsplash.com/photo-1501443762994-82bd5dace89a?q=80&w=800&auto=format&fit=crop',
    created_at: '2026-09-28',
  },
  {
    slug: 'aroma-eiswuerfel',
    title: 'Aroma Eiswürfel mit Heidelbeeren & Zitrone',
    excerpt:
      'Herrlich erfrischende Rezeptidee für den Sommer: Eiswürfel mit echtem Heidelbeer- und Zitronenpulver verfeinert.',
    category: 'Rezept',
    read_time: '5 Min. Zubereitung',
    image:
      'https://images.unsplash.com/photo-1498557850523-fd3d118b962e?q=80&w=800&auto=format&fit=crop',
    created_at: '2026-09-28',
  },
];

export default function HomeBlogPreview({
  posts,
}: {
  posts?: HomeBlogPostItem[];
}) {
  const displayPosts =
    posts && posts.length > 0 ? posts.slice(0, 3) : DEFAULT_POSTS;

  return (
    <section className="space-y-12">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div className="space-y-2 max-w-2xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-stone-100 text-stone-700 text-xs font-bold">
            <BookOpen className="w-3.5 h-3.5 text-stone-500" />
            <span>Ratgeber & Rezepte</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-stone-900">
            Wissenswertes & Rezepte aus unserem Magazin
          </h2>
          <p className="text-sm sm:text-base text-stone-600 leading-relaxed">
            Erfahren Sie mehr über Clean Food, gesunde Ernährung, Vitamine und
            kreative Rezeptideen mit unseren Schweizer Knusperfrüchten.
          </p>
        </div>

        <Link
          href="/blog"
          className="inline-flex items-center gap-1.5 text-sm font-bold text-rose-700 hover:text-rose-800 transition shrink-0"
        >
          <span>Alle Rezepte & Artikel</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
        {displayPosts.map((post, idx) => {
          const isRecipe = post.category?.toLowerCase().includes('rezept');

          return (
            <Link
              key={idx}
              href={`/blog/${post.slug}`}
              className="group flex flex-col bg-white border border-stone-200/80 rounded-3xl overflow-hidden shadow-xs hover:shadow-lg hover:border-stone-300 transition-all duration-300"
            >
              {/* Image */}
              <div className="relative aspect-16/10 w-full overflow-hidden bg-stone-100">
                <Image
                  src={
                    post.image ||
                    'https://images.unsplash.com/photo-1543528176-61b239494933?q=80&w=800&auto=format&fit=crop'
                  }
                  alt={post.title}
                  fill
                  unoptimized
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-900/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                {post.category && (
                  <div className="absolute top-3.5 left-3.5 flex items-center gap-1.5">
                    <span
                      className={`px-3 py-1 rounded-full text-[10px] font-bold backdrop-blur-md shadow-2xs ${
                        isRecipe
                          ? 'bg-rose-600/90 text-white'
                          : post.category === 'Healthy Food'
                          ? 'bg-emerald-700/90 text-white'
                          : 'bg-stone-900/80 text-white'
                      }`}
                    >
                      {isRecipe ? 'Rezept' : post.category}
                    </span>
                    {isRecipe && (
                      <span className="w-5 h-5 rounded-full bg-white/90 text-rose-700 flex items-center justify-center shadow-2xs">
                        <ChefHat className="w-3 h-3 stroke-[2.2]" />
                      </span>
                    )}
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="flex-1 p-6 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-xs text-stone-400">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{post.read_time || '4 Min. Lesezeit'}</span>
                  </div>
                  <h3 className="font-extrabold text-stone-900 text-base sm:text-lg group-hover:text-rose-700 transition leading-snug line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-stone-600 line-clamp-3 leading-relaxed">
                    {post.excerpt}
                  </p>
                </div>

                <div className="pt-3 border-t border-stone-100 flex items-center gap-1.5 text-xs font-bold text-rose-700 group-hover:text-rose-800 transition">
                  <span>Weiterlesen</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      <div className="text-center pt-2">
        <Link
          href="/blog"
          className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-2xl bg-white border border-stone-200 text-stone-800 hover:bg-stone-50 font-bold text-xs shadow-2xs transition"
        >
          <span>Alle Rezepte & Artikel im Magazin ansehen</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </section>
  );
}

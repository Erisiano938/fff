
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { wordpressApi, WordPressPost } from '../../lib/wordpress';

export default function BlogSection() {
  const [articles, setArticles] = useState<WordPressPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchArticles() {
      try {
        const { posts } = await wordpressApi.getPosts({ per_page: 6 });
        setArticles(posts);
      } catch (error) {
        console.error('Erreur lors du chargement des articles:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchArticles();
  }, []);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getFeaturedImage = (article: WordPressPost) => {
    return article._embedded?.['wp:featuredmedia']?.[0]?.source_url;
  };

  const getAuthor = (article: WordPressPost) => {
    return article._embedded?.author?.[0];
  };

  const stripHtml = (html: string) => {
    return html.replace(/<[^>]*>/g, '').substring(0, 150) + '...';
  };

  if (loading) {
    return (
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Blog et Actualités
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Restez informé des dernières tendances et analyses du marché financier
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, index) => (
              <div key={index} className="bg-white rounded-xl border border-gray-100 overflow-hidden animate-pulse">
                <div className="h-48 bg-gray-300"></div>
                <div className="p-6">
                  <div className="h-4 bg-gray-300 rounded mb-2"></div>
                  <div className="h-6 bg-gray-300 rounded mb-4"></div>
                  <div className="h-4 bg-gray-300 rounded mb-2"></div>
                  <div className="h-4 bg-gray-300 rounded w-3/4"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Blog et Actualités
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Restez informé des dernières tendances et analyses du marché financier
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.map((article) => {
            const featuredImage = getFeaturedImage(article);
            const author = getAuthor(article);
            
            return (
              <article key={article.id} className="bg-white rounded-xl border border-gray-100 hover:border-blue-200 hover:shadow-lg transition-all duration-300 overflow-hidden group">
                <div className="relative overflow-hidden">
                  {featuredImage ? (
                    <img
                      src={featuredImage}
                      alt={article.title.rendered}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  ) : (
                    <div className="w-full h-48 bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                      <i className="ri-article-line text-4xl text-white"></i>
                    </div>
                  )}
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 bg-blue-600 text-white text-sm font-medium rounded-full">
                      Article
                    </span>
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex items-center text-sm text-gray-500 mb-3">
                    {author && (
                      <div className="flex items-center mr-4">
                        <img
                          src={author.avatar_urls[96]}
                          alt={author.name}
                          className="w-6 h-6 rounded-full mr-2"
                        />
                        <span>{author.name}</span>
                      </div>
                    )}
                    <div className="flex items-center">
                      <i className="ri-calendar-line mr-1"></i>
                      {formatDate(article.date)}
                    </div>
                  </div>

                  <h3 
                    className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-blue-600 transition-colors"
                    dangerouslySetInnerHTML={{ __html: article.title.rendered }}
                  />
                  
                  <p className="text-gray-600 mb-4 line-clamp-3">
                    {stripHtml(article.excerpt.rendered)}
                  </p>

                  <Link 
                    href={`/academy/article/${article.slug}`}
                    className="inline-flex items-center text-blue-600 font-medium hover:text-blue-700 transition-colors whitespace-nowrap cursor-pointer"
                  >
                    Lire l'article
                    <i className="ri-arrow-right-line ml-2"></i>
                  </Link>
                </div>
              </article>
            );
          })}
        </div>

        <div className="text-center mt-12">
          <Link 
            href="/academy/blog"
            className="inline-flex items-center px-8 py-4 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors whitespace-nowrap cursor-pointer"
          >
            Voir tous les articles
            <i className="ri-arrow-right-line ml-2"></i>
          </Link>
        </div>
      </div>
    </section>
  );
}

'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import TiptapEditor from '../../../components/TiptapEditor';
import MarkdownRenderer from '../../../components/MarkdownRenderer';
import { saveBlogPost, getStorageInfo } from '../../lib/blogStorage';
import { generateUniqueArticleId, saveArticle } from '../../lib/articleService';

interface BlogPost {
  id: string;
  title: string;
  content: string;
  markdownContent: string;
  category: string;
  tags: string[];
  coverImage: string;
  createdAt: string;
  author: string;
  views: number;
  isPublished: boolean;
  readingTime: number;
}

// -------------------------------------------------------------------------
export default function CreateBlog() {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [tags, setTags] = useState('');
  const [coverImage, setCoverImage] = useState('');
  const [content, setContent] = useState('');
  const [markdownContent, setMarkdownContent] = useState('');
  const [isGeneratingCover, setIsGeneratingCover] = useState(false);
  const [showPublishModal, setShowPublishModal] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [activeTab, setActiveTab] = useState<'editor' | 'preview'>('editor');
  const [showCoverImageModal, setShowCoverImageModal] = useState(false);
  const [coverImageDescription, setCoverImageDescription] = useState('');
  const [isGeneratingCoverImage, setIsGeneratingCoverImage] = useState(false);
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Analyse Technique');
  const [selectedDifficulty, setSelectedDifficulty] = useState('Débutant');
  const [storageInfo, setStorageInfo] = useState({ used: 0, available: 0, posts: 0 });
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [storedBlogs, setStoredBlogs] = useState<any[]>([]);

  const [stats, setStats] = useState({
    words: 0,
    characters: 0,
    readingTime: 0,
  });

  // -------------------------------------------------------------------------
  // Lifecycle
  // -------------------------------------------------------------------------
  useEffect(() => {
    setMounted(true);
    updateStorageInfo();
  }, []);

  useEffect(() => {
    if (mounted) {
      updateStats();
    }
  }, [content, mounted]);

  // -------------------------------------------------------------------------
  // Helpers
  // -------------------------------------------------------------------------
  const updateStorageInfo = () => {
    const info = getStorageInfo();
    setStorageInfo(info);
  };

  const updateStats = () => {
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = content;
    const text = tempDiv.textContent || tempDiv.innerText || '';

    const words = text.trim() ? text.trim().split(/\s+/).length : 0;
    const characters = text.length;
    const readingTime = Math.ceil(words / 200);

    setStats({ words, characters, readingTime });
  };

  const htmlToMarkdown = (html: string): string => {
    return html
      .replace(/<h1[^>]*>(.*?)<\/h1>/gi, '# $1\n\n')
      .replace(/<h2[^>]*>(.*?)<\/h2>/gi, '## $1\n\n')
      .replace(/<h3[^>]*>(.*?)<\/h3>/gi, '### $1\n\n')
      .replace(/<strong[^>]*>(.*?)<\/strong>/gi, '**$1**')
      .replace(/<b[^>]*>(.*?)<\/b>/gi, '**$1**')
      .replace(/<em[^>]*>(.*?)<\/em>/gi, '*$1*')
      .replace(/<i[^>]*>(.*?)<\/i>/gi, '*$1*')
      .replace(/<u[^>]*>(.*?)<\/u>/gi, '_$1_')
      .replace(/<a[^>]*href=\"([^\"]*)\"[^>]*>(.*?)<\/a>/gi, '[$2]($1)')
      .replace(
        /<img[^>]*src=\"([^\"]*)\"[^>]*alt=\"([^\"]*)\"[^>]*title=\"([^\"]*)\"[^>]*>/gi,
        '![$2]($1 \"$3\")',
      )
      .replace(/<img[^>]*src=\"([^\"]*)\"[^>]*alt=\"([^\"]*)\"[^>]*>/gi, '![$2]($1)')
      .replace(/<img[^>]*src=\"([^\"]*)\"[^>]*title=\"([^\"]*)\"[^>]*>/gi, '![$2]($1)')
      .replace(/<img[^>]*src=\"([^\"]*)\"[^>]*>/gi, '![]($1)')
      .replace(/<blockquote[^>]*>(.*?)<\/blockquote>/gi, '> $1\n\n')
      .replace(/<ul[^>]*>(.*?)<\/ul>/gis, (match, content) => {
        return content.replace(/<li[^>]*>(.*?)<\/li>/gi, '- $1\n') + '\n';
      })
      .replace(/<ol[^>]*>(.*?)<\/ol>/gis, (match, content) => {
        let counter = 1;
        return content.replace(/<li[^>]*>(.*?)<\/li>/gi, () => `${counter++}. $1\n`) + '\n';
      })
      .replace(/<code[^>]*>(.*?)<\/code>/gi, '`$1`')
      .replace(/<pre[^>]*><code[^>]*>(.*?)<\/code><\/pre>/gis, '```\n$1\n```\n\n')
      .replace(/<p[^>]*>(.*?)<\/p>/gi, '$1\n\n')
      .replace(/<br\s*\/?>/gi, '\n')
      .replace(/<[^>]*>/g, '')
      .replace(/\\n{3,}/g, '\\n\\n')
      .trim();
  };

  const handleContentChange = (newContent: string) => {
    setContent(newContent);
    setMarkdownContent(htmlToMarkdown(newContent));
  };

  // -------------------------------------------------------------------------
  // Image handling
  // -------------------------------------------------------------------------
  const generateCoverImage = async () => {
    if (!title || !mounted) return;

    setIsGeneratingCover(true);
    try {
      // Simulate network latency – replace with real API call later
      await new Promise((resolve) => setTimeout(resolve, 2000));
      const uniqueId = Math.random().toString(36).substring(2, 15);
      const coverUrl = `https://readdy.ai/api/search-image?query=Professional%20financial%20trading%20blog%20header%20illustration%20with%20modern%20design%20elements%2C%20premium%20dark%20theme%2C%20elegant%20typography%2C%20representing%20$%7BencodeURIComponent%28%20%20%20%20%20%20%20%20%20title%2C%20%20%20%20%20%20%20%29%7D&width=1200&height=600&seq=${uniqueId}&orientation=landscape`;
      setCoverImage(coverUrl);
    } catch (error) {
      console.error('Erreur génération image:', error);
    } finally {
      setIsGeneratingCover(false);
    }
  };

  const handleCoverImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      alert('Veuillez sélectionner un fichier image valide');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      alert("L'image ne doit pas dépasser 5MB");
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      setCoverImage(result);
    };
    reader.readAsDataURL(file);
  };

  const triggerCoverImageUpload = () => {
    fileInputRef.current?.click();
  };

  const generateCustomCoverImage = async () => {
    if (!coverImageDescription.trim() || !mounted) return;

    setIsGeneratingCoverImage(true);
    try {
      // Simulate network latency – replace with real API call later
      await new Promise((resolve) => setTimeout(resolve, 2000));
      const uniqueId = Math.random().toString(36).substring(2, 15);
      const coverUrl = `https://readdy.ai/api/search-image?query=$%7BencodeURIComponent%28%20%20%20%20%20%20%20%20%20coverImageDescription%2C%20%20%20%20%20%20%20%29%7D&width=1200&height=600&seq=${uniqueId}&orientation=landscape`;
      setCoverImage(coverUrl);
      setCoverImageDescription('');
      setShowCoverImageModal(false);
    } catch (error) {
      console.error('Erreur génération image:', error);
    } finally {
      setIsGeneratingCoverImage(false);
    }
  };

  // -------------------------------------------------------------------------
  // Save / Publish - SYSTÈME UNIFIÉ COMME WORDPRESS
  // -------------------------------------------------------------------------
  const handleSave = async () => {
    if (!title.trim() || !content.trim()) {
      setError('Le titre et le contenu sont requis');
      return;
    }

    try {
      setLoading(true);
      setSaving(true);
      setError('');

      console.log('🚀 DÉMARRAGE PUBLICATION - Système unifié WordPress-style');

      // ÉTAPE 1: Créer l'article avec un ID unique et stable
      const articleId = generateUniqueArticleId(title);
      console.log('📝 ID généré:', articleId);

      // ÉTAPE 2: Préparer les données dans un format unifié
      const unifiedArticleData = {
        // Données principales
        id: articleId,
        title: title.trim(),
        content: content,
        markdownContent: htmlToMarkdown(content),

        // Métadonnées
        category: category || 'Général',
        tags: tags.split(',').map((t) => t.trim()).filter((t) => t),
        coverImage: coverImage,
        description: content.replace(/<[^>]*>/g, '').substring(0, 150) + '...',

        // Informations système
        author: 'Expert CMV',
        createdAt: new Date().toISOString(),
        publishedAt: new Date().toISOString(),
        publishedDate: new Date().toISOString(),

        // Statut de publication
        status: 'published',
        isPublished: true,
        featured: false,
        isFeatured: false,

        // Statistiques
        views: 0,
        readingTime: stats.readingTime || Math.ceil(stats.words / 200)
      };

      console.log('📦 Article préparé:', {
        id: unifiedArticleData.id,
        title: unifiedArticleData.title,
        category: unifiedArticleData.category,
        status: unifiedArticleData.status
      });

      // ÉTAPE 3: SAUVEGARDE UNIFIÉE (comme WordPress)
      // Nettoyer d'abord le localStorage des données obsolètes
      const cleanLocalStorage = () => {
        try {
          // Supprimer les anciens formats de données
          ['academyPosts', 'articlesData', 'blog_cache', 'temp_articles'].forEach(key => {
            localStorage.removeItem(key);
          });
        } catch (e) {}
      };

      cleanLocalStorage();

      // Sauvegarder dans le format principal (blog_posts)
      let currentPosts = [];
      try {
        const existing = localStorage.getItem('blog_posts');
        currentPosts = existing ? JSON.parse(existing) : [];
      } catch (e) {
        console.warn('Erreur lecture blog_posts, initialisation:', e);
        currentPosts = [];
      }

      // Supprimer l'ancien article s'il existe
      currentPosts = currentPosts.filter((post: any) => post.id !== articleId);

      // Ajouter le nouvel article en première position
      currentPosts.unshift(unifiedArticleData);

      // Limiter à 100 articles maximum pour éviter les problèmes de stockage
      if (currentPosts.length > 100) {
        currentPosts = currentPosts.slice(0, 100);
      }

      // SAUVEGARDE CRITIQUE
      try {
        localStorage.setItem('blog_posts', JSON.stringify(currentPosts));
        console.log('✅ Sauvegarde réussie dans blog_posts:', currentPosts.length, 'articles');
      } catch (storageError: any) {
        console.error('❌ Erreur critique de sauvegarde:', storageError);

        if (storageError.name === 'QuotaExceededError') {
          // Nettoyage d'urgence
          localStorage.clear();
          localStorage.setItem('blog_posts', JSON.stringify([unifiedArticleData]));
          console.log('🧹 Nettoyage d\'urgence effectué, article sauvé seul');
        } else {
          throw storageError;
        }
      }

      // ÉTAPE 4: NOTIFICATION IMMÉDIATE (comme WordPress)
      // Événements multiples pour assurer la synchronisation
      const notifySystemsImmediately = () => {
        // Événement personnalisé principal
        window.dispatchEvent(new CustomEvent('articlesUpdated', {
          detail: {
            action: 'created',
            articleId: articleId,
            articleCount: currentPosts.length
          }
        }));

        // Événement de stockage simulé
        window.dispatchEvent(new StorageEvent('storage', {
          key: 'blog_posts',
          newValue: JSON.stringify(currentPosts),
          oldValue: null,
          storageArea: localStorage,
          url: window.location.href
        }));

        // Événement global pour tous les composants
        window.dispatchEvent(new CustomEvent('blogPostCreated', {
          detail: unifiedArticleData
        }));

        console.log('📡 Tous les événements de notification envoyés');
      };

      // Déclencher immédiatement ET avec délai pour assurer la réception
      notifySystemsImmediately();
      setTimeout(notifySystemsImmediately, 100);
      setTimeout(notifySystemsImmediately, 500);

      // ÉTAPE 5: VÉRIFICATION DE LA SAUVEGARDE
      setTimeout(() => {
        try {
          const verification = localStorage.getItem('blog_posts');
          if (verification) {
            const verifiedPosts = JSON.parse(verification);
            const found = verifiedPosts.find((p: any) => p.id === articleId);
            if (found) {
              console.log('✅ VÉRIFICATION RÉUSSIE: Article trouvé dans le stockage');
            } else {
              console.error('❌ VÉRIFICATION ÉCHOUÉE: Article non trouvé après sauvegarde');
            }
          }
        } catch (e) {
          console.error('❌ Erreur lors de la vérification:', e);
        }
      }, 1000);

      // ÉTAPE 6: Reset du formulaire
      setTitle('');
      setContent('');
      setCategory('');
      setTags('');
      setCoverImage('');
      setMarkdownContent('');
      updateStorageInfo();

      // ÉTAPE 7: Confirmation visuelle
      setShowPublishModal(true);
      setTimeout(() => setShowPublishModal(false), 3000);

      console.log('🎉 PUBLICATION TERMINÉE AVEC SUCCÈS');
      console.log('📊 Statistiques finales:', {
        articleId,
        totalArticles: currentPosts.length,
        title: unifiedArticleData.title
      });

    } catch (error) {
      console.error('💥 ERREUR CRITIQUE DE PUBLICATION:', error);

      if (error instanceof Error) {
        if (error.message.includes('QuotaExceededError') || error.message.includes('quota')) {
          setError('Espace de stockage insuffisant. Veuillez contacter l\'administrateur.');
        } else {
          setError('Erreur de publication: ' + error.message);
        }
      } else {
        setError('Erreur inconnue lors de la publication. Veuillez réessayer.');
      }
    } finally {
      setLoading(false);
      setSaving(false);
    }
  };

  // -------------------------------------------------------------------------
  // Render
  // -------------------------------------------------------------------------
  if (!mounted) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-yellow-500 mx-auto mb-4"></div>
          <p className="text-gray-400">Chargement de l'éditeur...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-950">
      {/* --- Navigation --- */}
      <nav className="bg-gray-900 shadow-lg border-b border-gray-800 px-6 py-4">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <div className="flex items-center space-x-4">
            <Link href="/admin/dashboard" className="flex items-center text-gray-400 hover:text-white transition-colors">
              <i className="ri-arrow-left-line w-5 h-5 flex items-center justify-center mr-2"></i>
              Retour
            </Link>
            <div className="text-sm text-gray-500">
              <span>Financement CMV</span>
              <i className="ri-arrow-right-s-line w-4 h-4 flex items-center justify-center mx-1"></i>
              <span>Administration</span>
              <i className="ri-arrow-right-s-line w-4 h-4 flex items-center justify-center mx-1"></i>
              <span className="text-white">Éditeur de Blog</span>
            </div>
          </div>
        </div>
      </nav>

      {/* --- Main Content --- */}
      <div className="max-w-7xl mx-auto p-6 grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Editor Column */}
        <div className="lg:col-span-3">
          <div className="bg-gray-900 rounded-lg shadow-lg border border-gray-800">
            {/* Header */}
            <div className="p-6 border-b border-gray-800">
              <h1 className="text-3xl font-bold text-white mb-6">Éditeur de Blog Optimisé</h1>

              {/* Title Input */}
              <input
                type="text"
                placeholder="Titre de l'article..."
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full text-3xl font-bold bg-transparent border-none outline-none placeholder-gray-500 text-white mb-4"
              />

              {/* Toolbar */}
              <div className="flex flex-wrap gap-4 mb-6">
                {/* Category */}
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent text-white pr-8"
                >
                  <option value="">Sélectionner une catégorie</option>
                  <option value="analyse-technique">Analyse Technique</option>
                  <option value="analyse-fondamentale">Analyse Fondamentale</option>
                  <option value="gestion-risques">Gestion des Risques</option>
                  <option value="psychologie">Psychologie du Trading</option>
                  <option value="trading-debutant">Trading Débutant</option>
                  <option value="trading-avance">Trading Avancé</option>
                </select>

                {/* Tags */}
                <input
                  type="text"
                  placeholder="Tags (séparés par des virgules)"
                  value={tags}
                  onChange={(e) => setTags(e.target.value)}
                  className="flex-1 min-w-0 px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent text-white placeholder-gray-500"
                />

                {/* Hidden File Input */}
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleCoverImageUpload}
                  className="hidden"
                />

                {/* Upload Button */}
                <button
                  onClick={triggerCoverImageUpload}
                  className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 whitespace-nowrap flex items-center transition-colors"
                >
                  <i className="ri-upload-line w-4 h-4 flex items-center justify-center mr-2"></i>
                  Upload couverture
                </button>

                {/* Auto Generate Cover */}
                <button
                  onClick={generateCoverImage}
                  disabled={!title || isGeneratingCover}
                  className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap flex items-center transition-colors"
                >
                  {isGeneratingCover ? (
                    <>
                      <i className="ri-loader-line w-4 h-4 flex items-center justify-center mr-2 animate-spin"></i>
                      Génération...
                    </>
                  ) : (
                    <>
                      <i className="ri-image-line w-4 h-4 flex items-center justify-center mr-2"></i>
                      Auto-couverture
                    </>
                  )}
                </button>

                {/* Custom Cover */}
                <button
                  onClick={() => setShowCoverImageModal(true)}
                  className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 whitespace-nowrap flex items-center transition-colors"
                >
                  <i className="ri-palette-line w-4 h-4 flex items-center justify-center mr-2"></i>
                  Couverture custom
                </button>
              </div>

              {/* Cover Preview */}
              {coverImage && (
                <div className="mb-6">
                  <div className="relative">
                    <img
                      src={coverImage}
                      alt="Image de couverture"
                      className="w-full h-64 object-cover rounded-lg border border-gray-700"
                    />
                    <button
                      onClick={() => setCoverImage('')}
                      className="absolute top-2 right-2 w-8 h-8 bg-red-600 hover:bg-red-700 text-white rounded-full flex items-center justify-center transition-colors"
                    >
                      <i className="ri-close-line"></i>
                    </button>
                  </div>
                  <p className="text-sm text-gray-400 mt-2">Image de couverture - Apparaîtra en haut de l'article</p>
                </div>
              )}
            </div>

            {/* Editor / Preview */}
            <div className="p-6">
              {/* Tab Switcher */}
              <div className="flex items-center space-x-1 mb-6 bg-gray-800 p-1 rounded-lg">
                <button
                  onClick={() => setActiveTab('editor')}
                  className={`flex-1 py-2 px-4 rounded-md font-semibold transition-colors ${
                    activeTab === 'editor' ? 'bg-yellow-600 text-black' : 'text-gray-400 hover:text-white'
                  }`}
                >
                  <i className="ri-edit-line mr-2"></i>
                  Éditeur
                </button>
                <button
                  onClick={() => setActiveTab('preview')}
                  className={`flex-1 py-2 px-4 rounded-md font-semibold transition-colors ${
                    activeTab === 'preview' ? 'bg-yellow-600 text-black' : 'text-gray-400 hover:text-white'
                  }`}
                >
                  <i className="ri-eye-line mr-2"></i>
                  Aperçu
                </button>
              </div>

              {/* Content */}
              {activeTab === 'editor' ? (
                <TiptapEditor
                  content={content}
                  onChange={handleContentChange}
                  placeholder="Commencez à écrire votre article avec un style professionnel..."
                />
              ) : (
                <div className="bg-black rounded-lg border border-gray-700 min-h-96 p-8">
                  {/* Cover in preview */}
                  {coverImage && (
                    <div className="mb-8">
                      <img src={coverImage} alt={title || 'Image de couverture'} className="w-full h-96 object-cover rounded-xl" />
                    </div>
                  )}

                  {/* Title in preview */}
                  {title && (
                    <h1 className="text-5xl font-bold mb-8 leading-tight bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent">
                      {title}
                    </h1>
                  )}

                  {/* Body preview */}
                  {content ? (
                    <div
                      className="prose prose-invert prose-lg max-w-none [&_img]:w-full [&_img]:max-w-4xl [&_img]:mx-auto [&_img]:rounded-xl [&_img]:shadow-2xl [&_img]:border [&_img]:border-gray-700 [&_img]:object-cover [&_img]:my-8 [&_h1]:text-4xl [&_h1]:font-bold [&_h1]:text-yellow-400 [&_h1]:mb-8 [&_h1]:mt-12 [&_h2]:text-3xl [&_h2]:font-bold [&_h2]:text-yellow-400 [&_h2]:mb-6 [&_h2]:mt-10 [&_h3]:text-2xl [&_h3]:font-bold [&_h3]:text-yellow-400 [&_h3]:mb-4 [&_h3]:mt-8 [&_p]:text-gray-300 [&_p]:leading-relaxed [&_p]:mb-6 [&_p]:text-lg [&_a]:text-yellow-400 [&_a]:hover:text-yellow-300 [&_a]:underline [&_strong]:text-yellow-300 [&_strong]:font-semibold [&_em]:text-gray-300 [&_em]:italic [&_ul]:text-gray-300 [&_ul]:mb-6 [&_ul]:space-y-2 [&_ul]:list-disc [&_ul]:ml-6 [&_ol]:text-gray-300 [&_ol]:mb-6 [&_ol]:space-y-2 [&_ol]:list-decimal [&_ol]:ml-6 [&_li]:text-gray-300 [&_li]:leading-relaxed [&_blockquote]:border-l-4 [&_blockquote]:border-yellow-500 [&_blockquote]:pl-6 [&_blockquote]:py-4 [&_blockquote]:my-8 [&_blockquote]:bg-gray-900/50 [&_blockquote]:rounded-r-lg [&_blockquote]:text-gray-300 [&_blockquote]:italic [&_blockquote]:text-lg [&_code]:bg-gray-800 [&_code]:text-yellow-300 [&_code]:px-2 [&_code]:py-1 [&_code]:rounded [&_code]:text-sm [&_code]:font-mono [&_pre]:bg-gray-800 [&_pre]:p-4 [&_pre]:rounded-lg [&_pre]:border [&_pre]:border-gray-700 [&_pre]:my-6 [&_table]:min-w-full [&_table]:border-collapse [&_table]:border [&_table]:border-gray-600 [&_table]:bg-gray-900/50 [&_table]:rounded-lg [&_table]:overflow-hidden [&_table]:my-8 [&_th]:border [&_th]:border-gray-600 [&_th]:px-4 [&_th]:py-3 [&_th]:text-left [&_th]:font-bold [&_th]:text-yellow-400 [&_th]:bg-gray-800 [&_td]:border [&_td]:border-gray-600 [&_td]:px-4 [&_td]:py-3 [&_td]:text-gray-300"
                      dangerouslySetInnerHTML={{ __html: content }}
                    />
                  ) : (
                    <div className="text-center text-gray-500 py-12">
                      <i className="ri-article-line text-4xl mb-4 block"></i>
                      <p>Commencez à écrire pour voir l'aperçu...</p>
                    </div>
                  )}
                </div>
              )}

              {/* Stats / Save */}
              <div className="mt-8 flex justify-between items-center">
                <div className="text-sm text-gray-400 space-y-1">
                  <div>
                    Format: <span className="text-yellow-400 font-semibold">HTML optimisé</span>
                  </div>
                  <div>
                    Stockage: <span className="text-green-400">{storageInfo.posts}/10 articles</span>
                  </div>
                </div>

                {error && (
                  <div className="text-red-400 text-sm mr-4 max-w-md">{error}</div>
                )}

                <button
                  onClick={handleSave}
                  disabled={!title.trim() || !content.trim() || saving || loading}
                  className="px-8 py-3 bg-yellow-600 hover:bg-yellow-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-black font-bold rounded-lg flex items-center whitespace-nowrap transition-colors"
                >
                  {saving || loading ? (
                    <>
                      <i className="ri-loader-line w-5 h-5 flex items-center justify-center mr-2 animate-spin"></i>
                      Publication...
                    </>
                  ) : (
                    <>
                      <i className="ri-save-line w-5 h-5 flex items-center justify-center mr-2"></i>
                      Publier l'Article
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Storage Info */}
          <div className="bg-gray-900 rounded-lg shadow-lg border border-gray-800 p-6">
            <h3 className="font-bold text-white mb-4 flex items-center">
              <i className="ri-database-line w-5 h-5 flex items-center justify-center mr-2 text-yellow-400"></i>
              Stockage
            </h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-gray-400">Articles stockés</span>
                <span className="font-semibold text-green-400">{storageInfo.posts} articles</span>
              </div>
            </div>
          </div>

          {/* Statistics */}
          <div className="bg-gray-900 rounded-lg shadow-lg border border-gray-800 p-6">
            <h3 className="font-bold text-white mb-4 flex items-center">
              <i className="ri-bar-chart-line w-5 h-5 flex items-center justify-center mr-2 text-yellow-400"></i>
              Statistiques
            </h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center py-2 border-b border-gray-800">
                <span className="text-gray-400">Mots:</span>
                <span className="font-semibold text-white">{stats.words}</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-gray-800">
                <span className="text-gray-400">Caractères:</span>
                <span className="font-semibold text-white">{stats.characters}</span>
              </div>
              <div className="flex justify-between items-center py-2">
                <span className="text-gray-400">Lecture:</span>
                <span className="font-semibold text-yellow-400">{stats.readingTime} min</span>
              </div>
            </div>
          </div>

          {/* Features */}
          <div className="bg-gray-900 rounded-lg shadow-lg border border-gray-800 p-6">
            <h3 className="font-bold text-white mb-4 flex items-center">
              <i className="ri-magic-line w-5 h-5 flex items-center justify-center mr-2 text-yellow-400"></i>
              Fonctionnalités
            </h3>
            <div className="space-y-3 text-sm text-gray-400">
              <div className="flex items-center">
                <i className="ri-check-line w-4 h-4 flex items-center justify-center mr-2 text-green-400"></i>
                Éditeur Tiptap avancé
              </div>
              <div className="flex items-center">
                <i className="ri-check-line w-4 h-4 flex items-center justify-center mr-2 text-green-400"></i>
                Rendu Markdown premium
              </div>
              <div className="flex items-center">
                <i className="ri-check-line w-4 h-4 flex items-center justify-center mr-2 text-green-200"></i>
                Images intégrées responsive
              </div>
              <div className="flex items-center">
                <i className="ri-check-line w-4 h-4 flex items-center justify-center mr-2 text-green-400"></i>
                Génération IA d'images
              </div>
              <div className="flex items-center">
                <i className="ri-check-line w-4 h-4 flex items-center justify-center mr-2 text-green-400"></i>
                Thème financier professionnel
              </div>
            </div>
          </div>

          {/* Quick Help */}
          <div className="bg-gray-900 rounded-lg shadow-lg border border-gray-800 p-6">
            <h3 className="font-bold text-white mb-4 flex items-center">
              <i className="ri-question-line w-5 h-5 flex items-center justify-center mr-2 text-yellow-400"></i>
              Aide rapide
            </h3>
            <div className="space-y-3 text-sm text-gray-400">
              <div className="flex items-center">
                <kbd className="px-2 py-1 bg-gray-800 rounded text-xs mr-2">Ctrl+B</kbd>
                <span>Gras</span>
              </div>
              <div className="flex items-center">
                <kbd className="px-2 py-1 bg-gray-800 rounded text-xs mr-2">Ctrl+I</kbd>
                <span>Italique</span>
              </div>
              <div className="flex items-center">
                <kbd className="px-2 py-1 bg-gray-800 rounded text-xs mr-2">Ctrl+U</kbd>
                <span>Souligné</span>
              </div>
              <div className="text-xs text-gray-500">
                Utilisez les raccourcis pour formater rapidement votre texte.
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ----- Modals ----- */}
      {/* Custom Cover Modal */}
      {showCoverImageModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-800 rounded-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold text-white mb-4">Image de couverture personnalisée</h3>
            <textarea
              value={coverImageDescription}
              onChange={(e) => setCoverImageDescription(e.target.value)}
              placeholder="Décrivez l'image de couverture que vous souhaitez générer..."
              rows={4}
              className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-yellow-500 focus:border-transparent resize-none"
            />
            <div className="flex justify-end space-x-3 mt-4">
              <button
                onClick={() => setShowCoverImageModal(false)}
                className="px-4 py-2 text-gray-400 hover:text-white transition-colors"
              >
                Annuler
              </button>
              <button
                onClick={generateCustomCoverImage}
                disabled={!coverImageDescription.trim() || isGeneratingCoverImage}
                className="px-6 py-2 bg-yellow-600 hover:bg-yellow-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-black font-semibold rounded-lg transition-colors"
              >
                {isGeneratingCoverImage ? (
                  <>
                    <i className="ri-loader-line mr-2 animate-spin"></i>
                    Génération...
                  </>
                ) : (
                  'Générer'
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Publish Confirmation Modal */}
      {showPublishModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-800 rounded-lg p-8 w-full max-w-sm text-center">
            <i className="ri-check-line w-16 h-16 flex items-center justify-center text-green-400 mx-auto mb-4"></i>
            <h3 className="text-xl font-bold text-white mb-2">Article publié !</h3>
            <p className="text-gray-400">
              Votre article a été publié avec succès et est maintenant visible dans l'académie.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
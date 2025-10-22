'use client';

export default function AcademyHero() {
  return (
    <section 
      className="relative py-20 bg-cover bg-center"
      style={{
        backgroundImage: "url('https://readdy.ai/api/search-image?query=Professional%20trading%20education%20environment%20with%20modern%20learning%20setup%2C%20elegant%20dark%20themed%20educational%20interface%20with%20golden%20highlights%20showing%20financial%20charts%20and%20educational%20content%2C%20sophisticated%20academy%20atmosphere%20with%20multiple%20screens%20displaying%20trading%20courses%20and%20tutorials%2C%20minimalist%20professional%20learning%20space%20with%20warm%20lighting&width=1200&height=600&seq=academyhero&orientation=landscape')"
      }}
    >
      <div className="absolute inset-0 bg-black/70"></div>
      <div className="relative container mx-auto px-6">
        <div className="w-full max-w-4xl">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 text-white leading-tight">
            Académie <span className="text-yellow-400">CMV FINANCE</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-2xl">
            Maîtrisez le trading et la finance avec nos formations professionnelles. 
            De débutant à expert, développez vos compétences avec des cours interactifs.
          </p>
          
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div className="bg-black/50 p-6 rounded-xl border border-yellow-500/20">
              <div className="text-yellow-400 text-3xl font-bold">150+</div>
              <div className="text-white font-semibold">Cours Disponibles</div>
            </div>
            <div className="bg-black/50 p-6 rounded-xl border border-yellow-500/20">
              <div className="text-yellow-400 text-3xl font-bold">25K+</div>
              <div className="text-white font-semibold">Étudiants Actifs</div>
            </div>
            <div className="bg-black/50 p-6 rounded-xl border border-yellow-500/20">
              <div className="text-yellow-400 text-3xl font-bold">95%</div>
              <div className="text-white font-semibold">Taux de Réussite</div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <button className="bg-yellow-500 text-black px-8 py-4 rounded-lg font-semibold hover:bg-yellow-400 transition-colors cursor-pointer whitespace-nowrap">
              Commencer Gratuitement
            </button>
            <button className="border border-yellow-500 text-yellow-400 px-8 py-4 rounded-lg font-semibold hover:bg-yellow-500/10 transition-colors cursor-pointer whitespace-nowrap">
              Voir les Cours
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
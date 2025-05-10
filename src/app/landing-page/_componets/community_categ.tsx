import { ChevronRight } from 'lucide-react'

export const CategoriesSection = () => {
  return (
    <section className="py-24 relative overflow-hidden bg-gray-900">
      <div className="max-w-6xl mx-auto px-4 relative z-10">
        <div className="mb-16">
          <span className="inline-block px-3 py-1 text-xs font-medium bg-white/10 text-white/80 rounded-full mb-3">
            Discover
          </span>
          <h2 className="text-3xl font-light">
            Find your{" "}
            <span className="bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
              community
            </span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              name: "Workshops",
              description: "Hands-on learning experiences",
              color: "from-blue-600/20 to-blue-800/20",
              icon: "💻",
            },
            {
              name: "Competitions",
              description: "Test your skills and win prizes",
              color: "from-indigo-600/20 to-indigo-800/20",
              icon: "🏆",
            },
            {
              name: "Social",
              description: "Connect with the community",
              color: "from-emerald-600/20 to-emerald-800/20",
              icon: "🎉",
            },
            {
              name: "Lectures",
              description: "Learn from industry experts",
              color: "from-amber-600/20 to-amber-800/20",
              icon: "🎓",
            },
          ].map((category) => (
            <div
              key={category.name}
              className="bg-black/30 backdrop-blur-sm border border-white/10 rounded-xl p-6 cursor-pointer transition-all hover:border-white/30 group relative overflow-hidden"
            >
              <div
                className={`absolute -bottom-8 -right-8 w-32 h-32 rounded-full bg-gradient-to-br ${category.color} blur-xl opacity-70 group-hover:opacity-100 transition-opacity`}
              ></div>

              <div className="relative z-10">
                <div className="text-2xl mb-3">{category.icon}</div>
                <h3 className="font-medium text-white mb-2">{category.name}</h3>
                <p className="text-sm text-white/70 mb-4">{category.description}</p>
                <button className="text-xs flex items-center font-medium text-white/70 group-hover:text-white transition-colors">
                  Explore <ChevronRight className="h-3 w-3 ml-1 group-hover:translate-x-0.5 transition-transform" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Background decorative elements */}
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
      <div className="absolute -bottom-40 left-1/2 transform -translate-x-1/2 w-2/3 h-80 bg-purple-900/20 rounded-full blur-3xl"></div>
    </section>
  )
}
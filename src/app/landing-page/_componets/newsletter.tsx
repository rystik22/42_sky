export const NewsletterSection = () => {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 relative z-10">
        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 md:p-12">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl font-light mb-4">
              Stay{" "}
              <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                informed
              </span>
            </h2>
            <p className="text-white/70 mb-8">
              Get updates on the latest events and opportunities from the 42 Abu Dhabi community.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Your email address"
                className="flex-1 bg-black/30 border border-white/10 rounded-full px-5 py-3 text-sm focus:outline-none focus:border-white/30"
              />
              <button className="bg-white text-black rounded-full px-6 py-3 text-sm font-medium hover:bg-gray-100 transition-colors">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
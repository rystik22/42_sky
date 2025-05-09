export const Footer = () => {
  return (
    <footer className="bg-gradient-to-b from-black/90 via-black/80 to-black/90 backdrop-blur-lg py-16 border-t border-white/5">
      <div className="max-w-6xl mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="h-8 w-8 rounded bg-gradient-to-br from-purple-600 via-violet-600 to-indigo-700 flex items-center justify-center shadow-lg shadow-purple-500/20">
                <span className="text-white font-bold text-sm">42</span>
              </div>
              <span className="text-gray-200 font-semibold text-sm tracking-wide">events.abudhabi.ae</span>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed">
              Official platform of 42 Abu Dhabi for events and collaboration among students, alumni, and industry
              professionals.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-sm text-gray-200 mb-3 uppercase tracking-wider">Explore</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              {["/events", "/create", "/categories", "/calendar"].map((href, i) => (
                <li key={i}>
                  <a href={href} className="hover:text-purple-300 transition-colors duration-200">
                    {href.replace("/", "").replace(/^\w/, (c) => c.toUpperCase()) || "Home"}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-sm text-gray-200 mb-3 uppercase tracking-wider">Contact</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>events@42abudhabi.ae</li>
              <li>42 Abu Dhabi Campus</li>
              <li>Mina Zayed, Abu Dhabi</li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-gray-500">© 2025 42 Abu Dhabi. All rights reserved.</p>
          <div className="flex gap-6">
            {["/privacy", "/terms", "/support"].map((href, i) => (
              <a
                key={i}
                href={href}
                className="text-xs text-gray-500 hover:text-purple-300 transition-colors duration-200"
              >
                {href.replace("/", "").replace(/^\w/, (c) => c.toUpperCase())}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Glossy gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-purple-900/10 via-indigo-800/5 to-blue-900/10 pointer-events-none"></div>

      {/* Artistic highlight */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-purple-500/30 to-transparent blur-sm"></div>
    </footer>
  )
}

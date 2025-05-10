export const Footer = () => {
  return (
    <footer className="relative bg-gradient-to-b from-black/90 via-black/80 to-black/90 backdrop-blur-lg py-16 border-t border-white/5">
      <div className="max-w-6xl mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
          {/* Brand */}
          <div>
           <div className="flex items-center">
            <a href="/" className="flex items-center gap-4 group">
              <img
              src="/image.png"
              alt="42 Events Logo"
              className="h-10 w-40 rounded-sm shadow-lg shadow-white-500/20 transition-all duration-300 group-hover:shadow-white-500/40"
              />
              <span className="font-bold text-2xl tracking-wider bg-gradient-to-r from-purple-400 via-indigo-300 to-blue-400 bg-clip-text text-transparent drop-shadow-sm hover:drop-shadow-lg transition-all duration-300 animate-pulse-slow font-stretch-50%">SKY</span>
            </a>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed">
              Official platform of 42 Abu Dhabi for events and collaboration among students, alumni, and industry professionals.
            </p>
          </div>

          {/* Explore */}
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

          {/* Contact */}
          <div>
            <h3 className="font-semibold text-sm text-gray-200 mb-3 uppercase tracking-wider">Contact</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>events@42abudhabi.ae</li>
              <li>42 Abu Dhabi Campus</li>
              <li>Mina Zayed, Abu Dhabi</li>
            </ul>
          </div>
        </div>

        {/* Bottom row */}
        <div className="mt-12 pt-6 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-gray-500 text-center md:text-left">
            © 2025 42 Abu Dhabi. All rights reserved.
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-xs text-gray-500">
            {["/privacy", "/terms", "/support"].map((href, i) => (
              <a
                key={i}
                href={href}
                className="hover:text-purple-300 transition-colors duration-200"
              >
                {href.replace("/", "").replace(/^\w/, (c) => c.toUpperCase())}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Overlay and visual highlights */}
      <>
        <div className="absolute inset-0 bg-gradient-to-r from-purple-900/10 via-indigo-800/5 to-blue-900/10 pointer-events-none" />
        <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-purple-500/30 to-transparent blur-sm" />
      </>
    </footer>
  );
};

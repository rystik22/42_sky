export const Footer = () => {
  return (
    <footer className="bg-gradient-to-t from-white via-gray-50 to-white py-16 border-t border-gray-100">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="h-8 w-8 rounded bg-black flex items-center justify-center shadow-md">
                <span className="text-white font-bold text-sm">42</span>
              </div>
              <span className="text-gray-700 font-semibold text-sm tracking-wide">events.abudhabi.ae</span>
            </div>
            <p className="text-sm text-gray-500 leading-relaxed">
              Official platform of 42 Abu Dhabi for events and collaboration among students,
              alumni, and industry professionals.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-sm text-gray-800 mb-3 uppercase tracking-wider">Explore</h3>
            <ul className="space-y-2 text-sm text-gray-500">
              {["/events", "/create", "/categories", "/calendar"].map((href, i) => (
                <li key={i}>
                  <a href={href} className="hover:text-gray-800 transition-colors duration-200">
                    {href.replace("/", "").replace(/^\w/, c => c.toUpperCase()) || "Home"}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-sm text-gray-800 mb-3 uppercase tracking-wider">Contact</h3>
            <ul className="space-y-2 text-sm text-gray-500">
              <li>events@42abudhabi.ae</li>
              <li>42 Abu Dhabi Campus</li>
              <li>Mina Zayed, Abu Dhabi</li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-gray-400">© 2025 42 Abu Dhabi. All rights reserved.</p>
          <div className="flex gap-6">
            {["/privacy", "/terms", "/support"].map((href, i) => (
              <a
                key={i}
                href={href}
                className="text-xs text-gray-400 hover:text-gray-800 transition-colors duration-200"
              >
                {href.replace("/", "").replace(/^\w/, c => c.toUpperCase())}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

function Footer() {
  return (
    <footer className="bg-[#1a0000] border-t border-orange-500/20 pt-12 pb-6 px-6">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Brand */}
        <div>
          <h3 className="font-display text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-orange-400 to-red-500 mb-3">
            Burari Crackers
          </h3>
          <p className="text-gray-400 text-sm max-w-sm">
            Roshni, dhamaka aur khushiyaan — sabse best crackers, best price mein. Book online, pickup from shop.
          </p>
        </div>

        {/* Contact Info */}
        <div>
          <h4 className="text-yellow-400 font-semibold mb-4">Contact Info</h4>
          <ul className="flex flex-col gap-3 text-sm text-gray-300">
            <li className="flex items-start gap-3">
              <span>📍</span>
              <span>
                Sunil Colony, Salempur Majra, North Delhi, Burari Village
                <br />
                Landmark: Shree Balaji Properties
              </span>
            </li>
            <li className="flex items-center gap-3">
              <span>📞</span>
              <a href="tel:+919871641179" className="hover:text-yellow-400 transition-colors">
                +91 98716 41179
              </a>
              <a href="tel:+918796586168" className="hover:text-yellow-400 transition-colors">
                +91 87965 86168
              </a>
            </li>
            <li className="flex items-center gap-3">
              <span>✉️</span>
              <a href="mailto:amitnatkhat5@gmail.com" className="hover:text-yellow-400 transition-colors">
                amitnatkhat5@gmail.com
              </a>
            </li>
            <li className="flex items-center gap-3">
              <span>🕒</span>
              <span>Mon – Sun: 10 AM – 8 PM</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="max-w-6xl mx-auto border-t border-orange-500/10 mt-10 pt-6 text-center">
        <p className="text-gray-500 text-xs">
          © {new Date().getFullYear()} Burari Crackers. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
import React from 'react';
import { MessageCircle, Github, Twitter, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Footer = () => {
  return (
    <footer className="mt-auto bg-[#0e271f] border-t border-emerald-900/40 text-slate-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 text-center">
        {/* Brand Name */}
        <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-white">
          KeenKeeper
        </h2>

        {/* Brand Bio */}
        <p className="mt-3 text-sm sm:text-base text-emerald-100/70 max-w-xl mx-auto font-normal">
          Your personal shelf of meaningful connections. Browse, tend, and nurture the relationships that matter most.
        </p>

        {/* Social Links Section */}
        <div className="mt-8">
          <h3 className="text-xs font-semibold uppercase tracking-wider text-emerald-200/80 mb-4">
            Social Links
          </h3>
          <div className="flex items-center justify-center gap-3">
            <a
              href="https://discord.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Join Discord community"
              className="w-10 h-10 rounded-full bg-white/10 hover:bg-emerald-500/20 text-white flex items-center justify-center transition-all duration-200 hover:scale-110 border border-white/10"
            >
              <MessageCircle className="w-5 h-5" />
            </a>
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="View GitHub repository"
              className="w-10 h-10 rounded-full bg-white/10 hover:bg-emerald-500/20 text-white flex items-center justify-center transition-all duration-200 hover:scale-110 border border-white/10"
            >
              <Github className="w-5 h-5" />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Follow on X"
              className="w-10 h-10 rounded-full bg-white/10 hover:bg-emerald-500/20 text-white flex items-center justify-center transition-all duration-200 hover:scale-110 border border-white/10"
            >
              <Twitter className="w-5 h-5" />
            </a>
          </div>
        </div>

        {/* Bottom copyright & legal bar */}
        <div className="mt-12 pt-8 border-t border-emerald-800/40 flex flex-col sm:flex-row items-center justify-between text-xs text-emerald-200/60 gap-4">
          <div className="flex items-center gap-1.5">
            <span>© 2026 KeenKeeper. All rights reserved.</span>
          </div>
          <div className="flex items-center gap-6">
            <Link to="/" className="hover:text-emerald-300 transition-colors">Privacy Policy</Link>
            <Link to="/" className="hover:text-emerald-300 transition-colors">Terms of Service</Link>
            <Link to="/" className="hover:text-emerald-300 transition-colors">Cookies</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

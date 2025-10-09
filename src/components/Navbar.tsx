"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  Shield,
  Menu,
  X,
  Phone,
  Mail,
  MapPin,
  Linkedin,
  Twitter,
  Instagram,
} from "lucide-react";
import { useScrollPosition } from "@/hooks/useScrollPosition";
import { colors } from "@/constants/colors";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { isScrolled } = useScrollPosition(); // scrollY > 8 gibi bir eşik önerilir

  const pathname = usePathname();

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const navLinks = [
    { href: "/", label: "Ana Sayfa" },
    { href: "/hakkimizda", label: "Hakkımızda" },
    { href: "/uzmanlik-alanlari", label: "Uzmanlık Alanları" },
    { href: "/makaleler", label: "Makaleler" },
    { href: "/duyurular", label: "Duyurular" },
    { href: "/iletisim", label: "İletişim" },
  ];

  // Tek noktadan arkaplan ve metin rengi
  const headerBg = isScrolled
    ? "bg-slate-900/95 backdrop-blur-md shadow-lg"
    : "bg-transparent";

  const linkColor = isScrolled ? "text-gray-300" : "text-white";

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${headerBg}`}
      >
        {/* TopBar */}
        <div className="text-gray-300 text-sm transition-all duration-300 bg-slate-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-wrap items-center justify-between py-2 gap-2">
              {/* Left Side - Contact Info */}
              <div className="flex flex-wrap items-center gap-4">
                <a
                  href="tel:+902125555555"
                  className={`flex items-center gap-1 transition-colors ${linkColor}`}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.color = colors.primary.main)
                  }
                  onMouseLeave={(e) => (e.currentTarget.style.color = "")}
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>+90 (212) 555 55 55</span>
                </a>
                <a
                  href="mailto:info@avmehmetdurdusen.com"
                  className={`flex items-center gap-1 transition-colors ${linkColor}`}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.color = colors.primary.main)
                  }
                  onMouseLeave={(e) => (e.currentTarget.style.color = "")}
                >
                  <Mail className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">
                    info@avmehmetdurdusen.com
                  </span>
                </a>
              </div>

              {/* Right Side - Address & Social Media */}
              <div className="flex items-center gap-4">
                <div
                  className={`hidden md:flex items-center gap-1 text-xs ${linkColor}`}
                >
                  <MapPin className="w-3.5 h-3.5" />
                  <span>Şişli / İstanbul</span>
                </div>
                <div className="flex items-center gap-2">
                  {[Linkedin, Twitter, Instagram].map((Icon, i) => (
                    <a
                      key={i}
                      href="#"
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`transition-colors ${linkColor}`}
                      onMouseEnter={(e) =>
                        (e.currentTarget.style.color = colors.primary.main)
                      }
                      onMouseLeave={(e) => (e.currentTarget.style.color = "")}
                      aria-label={Icon.name}
                    >
                      <Icon className="w-4 h-4" />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Navbar */}
        <div className={`text-white transition-all duration-300`}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16 md:h-20">
              {/* Logo */}
              <Link href="/" className="flex items-center space-x-2">
                <div className="flex items-center">
                  <Shield
                    className="w-8 h-8"
                    style={{ color: colors.primary.main }}
                  />
                  <span className="ml-2 text-xl font-bold">
                    Av. Mehmet Durdu Şen
                  </span>
                </div>
              </Link>

              {/* Desktop Navigation */}
              <div className="hidden md:flex space-x-8">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={[
                      "transition-colors duration-200 font-medium hover:text-[#cb8929]",
                      linkColor,
                      pathname === link.href ? "text-[#cb8929]" : "",
                    ].join(" ")}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>

              {/* Mobile menu button */}
              <button
                onClick={() => setIsOpen(!isOpen)}
                className={`md:hidden focus:outline-none transition-colors ${linkColor}`}
                aria-expanded={isOpen}
                aria-controls="mobile-menu"
                aria-label={isOpen ? "Menüyü kapat" : "Menüyü aç"}
              >
                {isOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </button>
            </div>

            {/* Mobile Navigation */}
            {isOpen && (
              <div
                id="mobile-menu"
                className="md:hidden pb-4 bg-slate-900/95 backdrop-blur-sm -mx-4 px-4 rounded-b-xl"
              >
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="block py-2 text-gray-300 hover:text-[#cb8929] transition-colors duration-200"
                    onClick={() => setIsOpen(false)}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      </nav>
    </>
  );
}

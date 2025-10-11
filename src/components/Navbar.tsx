"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  Menu,
  X,
  Phone,
  Mail,
  MapPin,
  Linkedin,
  Twitter,
  Instagram,
  Scale,
  LogOut,
} from "lucide-react";
import { useScrollPosition } from "@/hooks/useScrollPosition";
import { colors } from "@/constants/colors";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { isScrolled } = useScrollPosition();
  const { user, logout } = useAuth();
  const pathname = usePathname();
  const router = useRouter();

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

  const handleLogout = async () => {
    try {
      await logout();
      router.push("/");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

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
        <div className="text-gray-300 text-sm transition-all duration-300 bg-slate-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="py-2">
              {/* Desktop Layout */}
              <div className="hidden md:flex items-center justify-between gap-2">
                {/* Left Side - Contact Info */}
                <div className="flex items-center gap-4">
                  <a
                    href="tel:+905077368255"
                    className={`flex items-center gap-1 transition-colors ${linkColor}`}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.color = colors.primary.main)
                    }
                    onMouseLeave={(e) => (e.currentTarget.style.color = "")}
                  >
                    <Phone className="w-3.5 h-3.5" />
                    <span>+90 (507) 736 82 55</span>
                  </a>
                  <a
                    href="mailto:info@avdurdumehmetsen.com"
                    className={`flex items-center gap-1 transition-colors ${linkColor}`}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.color = colors.primary.main)
                    }
                    onMouseLeave={(e) => (e.currentTarget.style.color = "")}
                  >
                    <Mail className="w-3.5 h-3.5" />
                    <span>info@avdurdumehmetsen.com</span>
                  </a>
                </div>

                {/* Right Side - Address & Social Media */}
                <div className="flex items-center gap-4">
                  <div
                    className={`flex items-center gap-1 text-xs ${linkColor}`}
                  >
                    <MapPin className="w-3.5 h-3.5" />
                    <span>
                      Manavkuyu, Yüzbaşı İbrahim Hakkı Cd. 4. Halil Atilla
                      Sitesi No:233 C Blok K:5 D:9, 35000 Bayraklı/İzmir
                    </span>
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

              {/* Mobile Layout */}
              <div className="md:hidden space-y-1.5">
                {/* First Row: Phone & Social Media */}
                <div className="flex items-center justify-between">
                  <a
                    href="tel:+905077368255"
                    className={`flex items-center gap-1 transition-colors ${linkColor}`}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.color = colors.primary.main)
                    }
                    onMouseLeave={(e) => (e.currentTarget.style.color = "")}
                  >
                    <Phone className="w-3.5 h-3.5" />
                    <span className="text-xs">+90 (507) 736 82 55</span>
                  </a>
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
                        <Icon className="w-3.5 h-3.5" />
                      </a>
                    ))}
                  </div>
                </div>

                {/* Second Row: Email & Address */}
                <div className="flex flex-col gap-1">
                  <a
                    href="mailto:info@avdurdumehmetsen.com"
                    className={`flex items-center gap-1 transition-colors ${linkColor}`}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.color = colors.primary.main)
                    }
                    onMouseLeave={(e) => (e.currentTarget.style.color = "")}
                  >
                    <Mail className="w-3.5 h-3.5" />
                    <span className="text-xs">info@avdurdumehmetsen.com</span>
                  </a>
                  <div
                    className={`flex items-center gap-1 text-xs ${linkColor}`}
                  >
                    <MapPin className="w-3.5 h-3.5" />
                    <span>Bayraklı / İzmir</span>
                  </div>
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
                  <Scale
                    className="w-8 h-8"
                    style={{ color: colors.primary.main }}
                  />
                  <span className="ml-2 text-xl font-bold">
                    Şen Hukuk Bürosu
                  </span>
                </div>
              </Link>

              {/* Desktop Navigation */}
              <div className="hidden md:flex items-center space-x-8">
                {navLinks.map((link) => {
                  const isActive = pathname === link.href;
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="relative transition-colors duration-200 font-medium group"
                      style={{
                        color: isActive
                          ? colors.primary.main
                          : isScrolled
                          ? "#d1d5db"
                          : "#ffffff",
                      }}
                      onMouseEnter={(e) =>
                        !isActive &&
                        (e.currentTarget.style.color = colors.primary.main)
                      }
                      onMouseLeave={(e) =>
                        !isActive &&
                        (e.currentTarget.style.color = isScrolled
                          ? "#d1d5db"
                          : "#ffffff")
                      }
                    >
                      {link.label}
                      <span
                        className={`absolute left-0 bottom-0 h-0.5 transition-all duration-300 ${
                          isActive ? "w-full" : "w-0 group-hover:w-full"
                        }`}
                        style={{ backgroundColor: colors.primary.main }}
                      />
                    </Link>
                  );
                })}

                {/* Logout Button */}
                {user && (
                  <button
                    onClick={handleLogout}
                    className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg font-medium transition-all hover:bg-red-700 bg-red-600 text-white"
                  >
                    <LogOut className="w-4 h-4" />
                    <span className="text-sm">Çıkış</span>
                  </button>
                )}
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
                {navLinks.map((link) => {
                  const isActive = pathname === link.href;
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="block py-2 transition-colors duration-200 relative group"
                      style={{
                        color: isActive ? colors.primary.main : "#d1d5db",
                      }}
                      onClick={() => setIsOpen(false)}
                    >
                      {link.label}
                      <span
                        className={`absolute left-0 bottom-0 h-0.5 transition-all duration-300 ${
                          isActive ? "w-full" : "w-0 group-hover:w-full"
                        }`}
                        style={{ backgroundColor: colors.primary.main }}
                      />
                    </Link>
                  );
                })}

                {/* Logout Button (Mobile) */}
                {user && (
                  <div className="mt-4 pt-4 border-t border-slate-700">
                    <button
                      onClick={() => {
                        setIsOpen(false);
                        handleLogout();
                      }}
                      className="flex items-center gap-2 w-full py-2 px-4 rounded-lg font-medium transition-all hover:bg-red-700 bg-red-600 text-white"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>Çıkış Yap</span>
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </nav>
    </>
  );
}

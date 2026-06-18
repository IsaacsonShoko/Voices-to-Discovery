import { useEffect, useState } from "react";

const links = [
  { label: "The Movement", href: "/#movement" },
  { label: "Stories", href: "/#stories" },
  { label: "The Project", href: "/#project" },
  { label: "Why It Matters", href: "/why-representation-matters" },
  { label: "Join", href: "/#join" },
  { label: "Sign The Declaration", href: "/#declaration", accent: true },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 48);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <>
      <header className={`site-header ${isScrolled ? "site-header-solid" : ""}`}>
        <a className="wordmark" href="/#top">
          From Voices to Discovery
        </a>

        <nav className="desktop-nav" aria-label="Primary">
          {links.map((link) => (
            <a key={link.label} className={link.accent ? "nav-link nav-link-accent" : "nav-link"} href={link.href}>
              {link.label}
            </a>
          ))}
        </nav>

        <button
          className="menu-button"
          type="button"
          aria-expanded={menuOpen}
          aria-label="Toggle menu"
          onClick={() => setMenuOpen((value) => !value)}
        >
          <span />
          <span />
          <span />
        </button>
      </header>

      {menuOpen && (
        <div className="mobile-menu" role="dialog" aria-modal="true">
          <nav className="mobile-nav" aria-label="Mobile">
            {links.map((link) => (
              <a
                key={link.label}
                className={link.accent ? "mobile-nav-link nav-link-accent" : "mobile-nav-link"}
                href={link.href}
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>
      )}
    </>
  );
}

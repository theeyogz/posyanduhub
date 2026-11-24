import { useState } from "react";

const NAV_ITEMS = [
  { id: "beranda", label: "Beranda" },
  { id: "jadwal", label: "Jadwal" },
  { id: "kunjungan", label: "Kunjungan" },
  { id: "data-balita", label: "Data Balita" },
];

function NavIcon({ id }) {
  switch (id) {
    case "beranda":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 10.5L12 3l9 7.5" />
          <path d="M5 9.5V20a1 1 0 0 0 1 1h4v-6h4v6h4a1 1 0 0 0 1-1V9.5" />
        </svg>
      );
    case "jadwal":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="4" width="18" height="17" rx="2" />
          <path d="M16 2v4M8 2v4M3 10h18" />
        </svg>
      );
    case "kunjungan":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
          <path d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2" />
          <rect x="9" y="3" width="6" height="4" rx="1" />
          <path d="M9 14l2 2 4-4" />
        </svg>
      );
    case "data-balita":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 20.5s-7.5-4.7-9.3-9.2C1.4 8 3.6 4.5 7 4.5c2 0 3.7 1.1 5 2.7 1.3-1.6 3-2.7 5-2.7 3.4 0 5.6 3.5 4.3 6.8-1.8 4.5-9.3 9.2-9.3 9.2z" />
        </svg>
      );
    default:
      return null;
  }
}

export default function Navbar({ activePage, onNavigate, onLogout, user }) {
  const [menuOpen, setMenuOpen] = useState(false);

  const displayName = user?.name || "Pengguna";
  const avatarInitial = displayName.trim().charAt(0).toUpperCase() || "P";

  const handleSelectPage = (pageId) => {
    setMenuOpen(false);
    onNavigate(pageId);
  };

  return (
    <header className="navbar">
      <div className="navbar-inner">
        <a
          href="#beranda"
          className="brand"
          onClick={(e) => {
            e.preventDefault();
            handleSelectPage("beranda");
          }}
        >
          <div className="brand-badge">PH</div>
          <div className="brand-text">
            <span className="brand-title">Posyandu Hub</span>
            <span className="brand-subtitle">RW 03</span>
          </div>
        </a>

        <nav className="nav-pills" aria-label="Navigasi utama">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.id}
              type="button"
              className={`nav-pill ${activePage === item.id ? "is-active" : ""}`}
              onClick={() => handleSelectPage(item.id)}
            >
              <span className="nav-icon">
                <NavIcon id={item.id} />
              </span>
              <span>{item.label}</span>
            </button>
          ))}
        </nav>

        <div className="navbar-right">
          <div className="profile-menu-wrapper">
            <button
              type="button"
              className={`profile-btn ${activePage === "profil" ? "is-profile-active" : ""}`}
              onClick={() => setMenuOpen((prev) => !prev)}
            >
              <span className="profile-avatar">{avatarInitial}</span>
              <span className="profile-name">{displayName}</span>
              <svg
                className="chevron-icon"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M6 9l6 6 6-6" />
              </svg>
            </button>

            {menuOpen && (
              <div className="profile-dropdown">
                <button
                  type="button"
                  className="dropdown-item"
                  onClick={() => handleSelectPage("profil")}
                >
                  Profil &amp; Data Anak
                </button>
                <button
                  type="button"
                  className="dropdown-item is-danger"
                  onClick={() => {
                    setMenuOpen(false);
                    onLogout?.();
                  }}
                >
                  Keluar
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
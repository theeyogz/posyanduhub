import { useState } from "react";
import "./App.css";

const NAV_ITEMS = [
  { id: "beranda", label: "Beranda" },
  { id: "jadwal", label: "Jadwal" },
  { id: "kunjungan", label: "Kunjungan" },
  { id: "data-balita", label: "Data Balita" },
];

const AGENDA_ITEMS = [
  "Kapsul vitamin A merah",
  "Pengukuran antropometri lengkap",
  "Konsultasi gizi",
];

const SESSION_OPTIONS = [
  { time: "08.00 - 09.00", desc: "sesi pagi (prioritas imunisasi)" },
  { time: "09.00 - 11.00", desc: "sesi santai (timbang rutin & PMT)" },
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

export default function App() {
  const [activeNav, setActiveNav] = useState("beranda");
  const [sessionIdx, setSessionIdx] = useState(1);

  const currentSession = SESSION_OPTIONS[sessionIdx];
  const readyItems = 1;
  const totalItems = 3;
  const progressPercent = (readyItems / totalItems) * 100;

  const handleToggleSession = () => {
    setSessionIdx((prev) => (prev === 1 ? 0 : 1));
  };

  return (
    <div className="app-shell">

      <header className="navbar">
        <div className="navbar-inner">
          <a href="#beranda" className="brand" onClick={(e) => { e.preventDefault(); setActiveNav("beranda"); }}>
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
                className={`nav-pill ${activeNav === item.id ? "is-active" : ""}`}
                onClick={() => setActiveNav(item.id)}
              >
                <span className="nav-icon">
                  <NavIcon id={item.id} />
                </span>
                <span>{item.label}</span>
              </button>
            ))}
          </nav>

          <div className="navbar-right">
            <button type="button" className="profile-btn">
              <span className="profile-avatar">M</span>
              <span className="profile-name">Ibu Maria</span>
              <svg className="chevron-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M6 9l6 6 6-6" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      <main className="main-container">

        <section className="greeting">
          <h1>Halo, Ibu Maria</h1>
          <p>Ringkasan kunjungan posyandu dan tumbuh kembang anak.</p>
        </section>

        <div className="status-banner" role="status">
          <span className="status-dot" />
          <p>
            <strong>Status hari H</strong> Belum dibuka, buka 15 Okt pukul 08.00 WIB | Balai Pertemuan RW 03
          </p>
        </div>

        <section className="grid-main">

          <article className="card schedule-card">
            <div className="card-header">
              <h2>Jadwal posyandu berikutnya</h2>
              <a href="#jadwal" className="card-link" onClick={(e) => { e.preventDefault(); setActiveNav("jadwal"); }}>
                Lihat kalender lengkap →
              </a>
            </div>

            <div className="schedule-highlight">
              <div className="date-badge">
                <span className="date-month">OKT</span>
                <span className="date-day">15</span>
                <span className="date-weekday">Kamis</span>
              </div>

              <div className="schedule-info">
                <h3>Kamis, 15 Oktober 2026</h3>
                <p className="schedule-meta">08.00 - 11.00 WIB | Balai Pertemuan RW 03</p>
                <span className="countdown-pill">2 hari lagi</span>
              </div>
            </div>

            <div className="session-box">
              <div className="session-details">
                <span className="session-label">SESI KEDATANGAN PILIHAN ANDA</span>
                <p className="session-value">
                  <strong>{currentSession.time}</strong> {currentSession.desc}
                </p>
              </div>
              <button type="button" className="text-action" onClick={handleToggleSession}>
                Ubah sesi →
              </button>
            </div>

            <div className="schedule-actions">
              <button type="button" className="btn-primary">
                Simpan ke Google Calendar / Alarm HP
              </button>
              <button type="button" className="btn-outline">
                Lihat di Maps
              </button>
            </div>
          </article>

          <article className="card child-card">
            <div>
              <div className="card-header">
                <h2>Anak saya</h2>
                <a href="#data-balita" className="card-link" onClick={(e) => { e.preventDefault(); setActiveNav("data-balita"); }}>
                  Data balita →
                </a>
              </div>

              <div className="child-profile">
                <div className="child-avatar">B</div>
                <div>
                  <h3 className="child-name">Adek Budi</h3>
                  <p className="child-meta">Laki-laki, 14 bulan</p>
                </div>
              </div>
            </div>

            <div className="growth-box">
              <span className="growth-label">Status pertumbuhan terakhir</span>
              <div className="growth-status">
                <span className="trend-up" aria-hidden="true">▲</span>
                <span>Naik</span>
              </div>
              <p className="growth-meta">9,8 kg | 15 Okt 2026</p>
            </div>
          </article>
        </section>

        <section className="grid-bottom">

          <article className="card stat-card">
            <div className="card-header">
              <h2>Bawaan</h2>
              <a href="#persiapan" className="card-link" onClick={(e) => e.preventDefault()}>
                Persiapan →
              </a>
            </div>

            <div className="stat-body">
              <div className="stat-metric">
                <span className="stat-number">{readyItems}</span>
                <span className="stat-unit">dari {totalItems} siap</span>
              </div>

              <div className="progress-track" role="progressbar" aria-valuenow={readyItems} aria-valuemin={0} aria-valuemax={totalItems}>
                <div className="progress-fill" style={{ width: `${progressPercent}%` }} />
              </div>

              <p className="stat-footnote">Belum: fotokopi KK, wadah makan</p>
            </div>
          </article>

          <article className="card stat-card">
            <div className="card-header">
              <h2>Kehadiran 2026</h2>
              <a href="#riwayat" className="card-link" onClick={(e) => { e.preventDefault(); setActiveNav("kunjungan"); }}>
                Riwayat →
              </a>
            </div>

            <div className="stat-body stat-body-end">
              <div className="stat-metric">
                <span className="stat-number">9</span>
                <span className="stat-unit">dari 10 bulan</span>
              </div>
              <p className="stat-footnote">Terlewat: September 2026</p>
            </div>
          </article>

          <article className="card stat-card">
            <div className="card-header">
              <h2>Agenda usia 14 bulan</h2>
              <a href="#agenda" className="card-link" onClick={(e) => e.preventDefault()}>
                Selengkapnya →
              </a>
            </div>

            <ul className="agenda-list">
              {AGENDA_ITEMS.map((agenda) => (
                <li key={agenda}>
                  <span className="agenda-dot" />
                  <span>{agenda}</span>
                </li>
              ))}
            </ul>
          </article>
        </section>
      </main>
    </div>
  );
}
import Navbar from "../components/Navbar";
import "./Dashboard.css";

const AGENDA_ITEMS = [
  "Kapsul vitamin A merah",
  "Pengukuran antropometri lengkap",
  "Konsultasi gizi",
];

const SESSION_RECOMMENDATIONS = [
  { time: "08.00 - 09.00", desc: "sesi pagi (prioritas imunisasi)" },
  { time: "09.00 - 11.00", desc: "sesi santai (timbang rutin & PMT)" },
];

export default function Beranda({ user, onNavigate, onLogout }) {
  const displayName = user?.name || "Pengguna";
  const readyItems = 1;
  const totalItems = 3;
  const progressPercent = (readyItems / totalItems) * 100;

  return (
    <div className="app-shell">
      <Navbar activePage="beranda" user={user} onNavigate={onNavigate} onLogout={onLogout} />

      <main className="main-container">
        <section className="greeting">
          <h1>Halo, {displayName}</h1>
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
              <button type="button" className="card-link" onClick={() => onNavigate("jadwal")}>
                Lihat kalender lengkap →
              </button>
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

            <div className="session-box is-readonly-box">
              <span className="session-label">REKOMENDASI SESI KEDATANGAN</span>
              <div className="session-summary-list">
                {SESSION_RECOMMENDATIONS.map((sesi) => (
                  <p key={sesi.time} className="session-value">
                    <strong>{sesi.time}</strong> {sesi.desc}
                  </p>
                ))}
              </div>
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
                <button type="button" className="card-link" onClick={() => onNavigate("data-balita")}>
                  Data balita →
                </button>
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
              <button type="button" className="card-link" onClick={() => onNavigate("kunjungan")}>
                Persiapan →
              </button>
            </div>

            <div className="stat-body">
              <div className="stat-metric">
                <span className="stat-number">{readyItems}</span>
                <span className="stat-unit">dari {totalItems} siap</span>
              </div>

              <div className="progress-track">
                <div className="progress-fill" style={{ width: `${progressPercent}%` }} />
              </div>

              <p className="stat-footnote">Belum: fotokopi KK, wadah makan</p>
            </div>
          </article>

          <article className="card stat-card">
            <div className="card-header">
              <h2>Kehadiran 2026</h2>
              <button type="button" className="card-link" onClick={() => onNavigate("data-balita")}>
                Riwayat →
              </button>
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
              <button type="button" className="card-link" onClick={() => onNavigate("kunjungan")}>
                Selengkapnya →
              </button>
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
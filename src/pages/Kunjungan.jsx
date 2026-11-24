import { useState } from "react";
import Navbar from "../components/Navbar";
import "./Dashboard.css";

const INITIAL_CHECKLIST = [
  { id: "kia", label: "Buku KIA/KMS fisik", tag: "Wajib", tagType: "wajib", checked: true },
  { id: "kk", label: "Fotokopi KK", tag: "Imunisasi", tagType: "imunisasi", checked: false },
  { id: "wadah", label: "Wadah makan / sendok PMT", tag: "Pendukung", tagType: "pendukung", checked: false },
];

const SESSION_RECOMMENDATIONS = [
  {
    id: "pagi",
    time: "08.00 – 09.00 WIB",
    badge: "Sesi pagi",
    desc: "Untuk balita yang butuh imunisasi. Ditangani nakes, antrean lebih singkat.",
  },
  {
    id: "santai",
    time: "09.00 – 11.00 WIB",
    badge: "Sesi santai",
    desc: "Untuk timbang rutin dan PMT. Lebih longgar jika tidak ada imunisasi.",
  },
];

const SCHEDULE_STATUS = {
  isDelayed: false,
  newOpenTime: "09.00",
  reason: "Menunggu kedatangan tenaga kesehatan dari Puskesmas",
};

const SPECIAL_AGENDAS = [
  "Mendapat kapsul vitamin A merah",
  "Pengukuran antropometri lengkap",
  "Konsultasi gizi di meja kader",
];

export default function Kunjungan({ user, onNavigate, onLogout }) {
  const [checklist, setChecklist] = useState(INITIAL_CHECKLIST);
  const [selectedChild, setSelectedChild] = useState("Adek Budi (14 bulan)");
  const [reminderSaved, setReminderSaved] = useState(false);

  const readyCount = checklist.filter((item) => item.checked).length;
  const progressPercent = (readyCount / checklist.length) * 100;

  const toggleItem = (id) => {
    setChecklist((prev) =>
      prev.map((item) => (item.id === id ? { ...item, checked: !item.checked } : item))
    );
  };

  return (
    <div className="app-shell">
      <Navbar activePage="kunjungan" user={user} onNavigate={onNavigate} onLogout={onLogout} />

      <main className="main-container">
        <section className="page-header">
          <h1>Persiapan Kunjungan</h1>
          <p>Pastikan semuanya siap sebelum berangkat ke posyandu.</p>
        </section>

        <div className="prep-banner">
          <div className="prep-banner-left">
            <div className="prep-countdown-box">
              <strong>2</strong>
              <span>hari lagi</span>
            </div>
            <div className="prep-divider" />
            <div className="prep-banner-info">
              <h2>Kamis, 15 Oktober 2026</h2>
              <p>08.00 - 11.00 WIB | Balai Pertemuan RW 03</p>
              <span className="prep-status-text">Status hari H: belum dibuka</span>
            </div>
          </div>

          <button
            type="button"
            className="btn-primary btn-with-icon"
            onClick={() => setReminderSaved(true)}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 8a6 6 0 0 0-12 0c0 7-3 9-3 9h18s-3-2-3-9" />
              <path d="M13.73 21a2 2 0 0 1-3.46 0" />
            </svg>
            <span>{reminderSaved ? "Pengingat tersimpan" : "Simpan pengingat"}</span>
          </button>
        </div>

        <div className="prep-layout">
          <div className="stack-col">
            <article className="card">
              <div className="card-header">
                <div>
                  <h2>Daftar bawaan</h2>
                  <p className="card-subtext">Centang yang sudah disiapkan.</p>
                </div>
                <span className="card-link">
                  {readyCount} dari {checklist.length} siap
                </span>
              </div>

              <div className="progress-track" style={{ marginBottom: "18px" }}>
                <div className="progress-fill" style={{ width: `${progressPercent}%` }} />
              </div>

              <div className="checklist-stack">
                {checklist.map((item) => (
                  <label key={item.id} className="checklist-row">
                    <div className="checklist-left">
                      <input
                        type="checkbox"
                        checked={item.checked}
                        onChange={() => toggleItem(item.id)}
                        className="custom-checkbox"
                      />
                      <span className="checklist-label">{item.label}</span>
                    </div>
                    <span className={`item-badge is-${item.tagType}`}>{item.tag}</span>
                  </label>
                ))}
              </div>
            </article>

            <article className="card">
              <div className="card-header-stack">
                <h2>Rekomendasi sesi kedatangan</h2>
                <p>Panduan pembagian waktu kedatangan dari kader agar antrean lebih tertib.</p>
              </div>

              {SCHEDULE_STATUS.isDelayed ? (
                <div className="delay-preview-box">
                  <div className="delay-headline">
                    <span className="delay-badge">Ditunda</span>
                    <strong>
                      Posyandu dibuka lebih lambat. Perkiraan buka baru: {SCHEDULE_STATUS.newOpenTime} WIB.
                    </strong>
                  </div>
                  <p>
                    Alasan: {SCHEDULE_STATUS.reason}. Sesuaikan waktu keluar rumah Anda, informasi sesi tampil kembali setelah posyandu dibuka.
                  </p>
                </div>
              ) : (
                <>
                  <div className="punctual-pill">
                    <span className="status-dot" />
                    <span>Posyandu buka tepat waktu</span>
                  </div>

                  <div className="session-info-list">
                    {SESSION_RECOMMENDATIONS.map((opt) => (
                      <div key={opt.id} className="session-info-card">
                        <div className="session-info-title">
                          <strong>{opt.time}</strong>
                          <span className="session-info-badge">{opt.badge}</span>
                        </div>
                        <p>{opt.desc}</p>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </article>
          </div>

          <article className="card">
            <div className="card-header-stack">
              <h2>Panduan usia &amp; agenda spesial</h2>
              <p>Disesuaikan dengan usia balita Anda.</p>
            </div>

            <div className="form-field" style={{ marginBottom: "20px" }}>
              <label htmlFor="prep-child-select">Pilih anak</label>
              <select
                id="prep-child-select"
                className="select-input"
                value={selectedChild}
                onChange={(e) => setSelectedChild(e.target.value)}
              >
                <option value="Adek Budi (14 bulan)">Adek Budi (14 bulan)</option>
              </select>
            </div>

            <h3 className="agenda-subheading">Agenda untuk usia 14 bulan</h3>
            <ul className="agenda-list">
              {SPECIAL_AGENDAS.map((agenda) => (
                <li key={agenda}>
                  <span className="agenda-dot" />
                  <span>{agenda}</span>
                </li>
              ))}
            </ul>
          </article>
        </div>
      </main>
    </div>
  );
}
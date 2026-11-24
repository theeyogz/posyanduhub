import { useState } from "react";
import Navbar from "../components/Navbar";
import "./Dashboard.css";

const WEEKDAYS = ["Min", "Sen", "Sel", "Rab", "Kam", "Jum", "Sab"];

const MONTHS_DATA = [
  {
    key: "2026-09",
    label: "September 2026",
    startOffset: 2,
    daysInMonth: 30,
    today: null,
  },
  {
    key: "2026-10",
    label: "Oktober 2026",
    startOffset: 4,
    daysInMonth: 31,
    today: 13,
  },
  {
    key: "2026-11",
    label: "November 2026",
    startOffset: 0,
    daysInMonth: 30,
    today: null,
  },
  {
    key: "2026-12",
    label: "Desember 2026",
    startOffset: 2,
    daysInMonth: 31,
    today: null,
  },
];

const SCHEDULE_DETAILS = {
  "2026-09-29": {
    type: "confirmed",
    fullDate: "Selasa, 29 September 2026",
    countdown: "Sudah lewat",
    time: "08.00 - 11.00 WIB",
    location: "Balai Pertemuan RW 03",
    status: "Selesai (Absen)",
  },
  "2026-10-15": {
    type: "confirmed",
    fullDate: "Kamis, 15 Oktober 2026",
    countdown: "2 hari lagi",
    time: "08.00 - 11.00 WIB",
    location: "Balai Pertemuan RW 03",
    status: "Sudah dikonfirmasi • Belum dibuka",
  },
  "2026-11-29": {
    type: "template",
    fullDate: "Minggu, 29 November 2026",
    countdown: "45 hari lagi",
    time: "08.00 - 11.00 WIB (perkiraan)",
    location: "Balai Pertemuan RW 03",
    status: "Prediksi bulanan • Belum dikonfirmasi kader",
  },
  "2026-12-29": {
    type: "template",
    fullDate: "Selasa, 29 Desember 2026",
    countdown: "77 hari lagi",
    time: "08.00 - 11.00 WIB (perkiraan)",
    location: "Balai Pertemuan RW 03",
    status: "Prediksi bulanan • Belum dikonfirmasi kader",
  },
};

const UPCOMING_LIST = [
  {
    id: "2026-10-15",
    monthIdx: 1,
    day: 15,
    monthShort: "Okt",
    title: "Kamis, 15 Okt",
    meta: "08.00 - 11.00 WIB | Balai Pertemuan RW 03",
    countdown: "2 hari lagi",
    type: "confirmed",
  },
  {
    id: "2026-11-29",
    monthIdx: 2,
    day: 29,
    monthShort: "Nov",
    title: "Minggu, 29 Nov",
    meta: "Prediksi bulanan | Balai Pertemuan RW 03",
    countdown: "45 hari lagi",
    type: "template",
  },
];

const HISTORY_LIST = [
  { date: "Selasa, 29 Sep 2026", status: "Absen", attended: false },
  { date: "Kamis, 20 Agu 2026", status: "Hadir", attended: true },
];

export default function Jadwal({ user, onNavigate, onLogout }) {
  const [monthIdx, setMonthIdx] = useState(1);
  const [selectedKey, setSelectedKey] = useState("2026-10-15");

  const currentMonth = MONTHS_DATA[monthIdx];
  const activeDetail = SCHEDULE_DETAILS[selectedKey] || {
    type: "none",
    fullDate: `Tanggal ${Number(selectedKey.split("-")[2])} ${currentMonth.label}`,
    countdown: "Tidak ada jadwal",
    time: "-",
    location: "Balai Pertemuan RW 03",
    status: "Tidak ada kegiatan posyandu",
  };

  const emptyCells = Array.from({ length: currentMonth.startOffset }, (_, i) => i);
  const dayCells = Array.from({ length: currentMonth.daysInMonth }, (_, i) => i + 1);

  return (
    <div className="app-shell">
      <Navbar activePage="jadwal" user={user} onNavigate={onNavigate} onLogout={onLogout} />
      <main className="main-container">
        <section className="page-header">
          <h1>Jadwal Posyandu</h1>
          <p>Pilih tanggal di kalender untuk melihat detail jadwal.</p>
        </section>

        <div className="jadwal-layout">
          <div className="stack-col">
            <article className="card">
              <div className="card-header">
                <h2>Kalender posyandu</h2>
                <div className="cal-nav">
                  <button
                    type="button"
                    className="cal-nav-btn"
                    disabled={monthIdx === 0}
                    onClick={() => setMonthIdx((i) => Math.max(0, i - 1))}
                    aria-label="Bulan sebelumnya"
                  >
                    ‹
                  </button>
                  <span className="cal-month-label">{currentMonth.label}</span>
                  <button
                    type="button"
                    className="cal-nav-btn"
                    disabled={monthIdx === MONTHS_DATA.length - 1}
                    onClick={() => setMonthIdx((i) => Math.min(MONTHS_DATA.length - 1, i + 1))}
                    aria-label="Bulan berikutnya"
                  >
                    ›
                  </button>
                </div>
              </div>

              <div className="cal-grid">
                {WEEKDAYS.map((day) => (
                  <div key={day} className="cal-weekday">
                    {day}
                  </div>
                ))}

                {emptyCells.map((idx) => (
                  <div key={`empty-${idx}`} className="cal-cell is-empty" />
                ))}

                {dayCells.map((day) => {
                  const dateKey = `${currentMonth.key}-${String(day).padStart(2, "0")}`;
                  const schedule = SCHEDULE_DETAILS[dateKey];
                  const isActiveDay = selectedKey === dateKey;
                  const isToday = currentMonth.today === day;
                  const isConfirmed = schedule?.type === "confirmed";
                  const isTemplate = schedule?.type === "template";

                  return (
                    <button
                      key={dateKey}
                      type="button"
                      onClick={() => setSelectedKey(dateKey)}
                      className={[
                        "cal-cell",
                        isConfirmed ? "is-confirmed" : "",
                        isTemplate ? "is-template" : "",
                        isToday ? "is-today" : "",
                        isActiveDay ? "is-active-day" : "",
                      ]
                        .filter(Boolean)
                        .join(" ")}
                    >
                      {day}
                    </button>
                  );
                })}
              </div>

              <div className="cal-legend">
                <div className="legend-item">
                  <span className="legend-box is-confirmed" />
                  <span>Ungu penuh: jadwal fix (dikonfirmasi kader)</span>
                </div>
                <div className="legend-item">
                  <span className="legend-box is-template" />
                  <span>Kuning: prediksi bulanan (belum dikonfirmasi)</span>
                </div>
                <div className="legend-item">
                  <span className="legend-box is-today" />
                  <span>Garis ungu: hari ini</span>
                </div>
              </div>
            </article>

            <article className="card">
              <div className="card-header">
                <h2>Detail jadwal terpilih</h2>
                <span
                  className={`countdown-pill ${
                    activeDetail.type === "template" ? "is-template-pill" : ""
                  }`}
                >
                  {activeDetail.countdown}
                </span>
              </div>

              <p className="detail-date-text">{activeDetail.fullDate}</p>

              <div className="detail-boxes">
                <div className="detail-subbox">
                  <span className="subbox-label">Waktu</span>
                  <strong className="subbox-value">{activeDetail.time}</strong>
                </div>
                <div className="detail-subbox">
                  <span className="subbox-label">Lokasi</span>
                  <strong className="subbox-value">{activeDetail.location}</strong>
                </div>
                <div className="detail-subbox">
                  <span className="subbox-label">Status</span>
                  <strong className="subbox-value">{activeDetail.status}</strong>
                </div>
              </div>

              {activeDetail.type === "template" && (
                <div className="schedule-template-note">
                  Tanggal ini masih berupa prediksi jadwal bulanan dan dapat berubah hingga dikonfirmasi oleh kader.
                </div>
              )}

              {activeDetail.type !== "none" && (
                <div className="schedule-actions">
                  <button type="button" className="btn-primary">
                    Simpan ke Google Calendar / Alarm HP
                  </button>
                  <button type="button" className="btn-outline btn-with-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 21s-6-5.3-6-10a6 6 0 1 1 12 0c0 4.7-6 10-6 10z" />
                      <circle cx="12" cy="11" r="2.2" />
                    </svg>
                    <span>Lihat di Maps</span>
                  </button>
                </div>
              )}
            </article>
          </div>

          <div className="stack-col">
            <article className="card">
              <div className="card-header">
                <h2>Jadwal mendatang</h2>
              </div>

              <div className="upcoming-list">
                {UPCOMING_LIST.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    className={`upcoming-item ${selectedKey === item.id ? "is-active-item" : ""}`}
                    onClick={() => {
                      setMonthIdx(item.monthIdx);
                      setSelectedKey(item.id);
                    }}
                  >
                    <div
                      className={`mini-date-badge ${
                        item.type === "confirmed" ? "is-plum" : "is-yellow"
                      }`}
                    >
                      <span className="mini-month">{item.monthShort}</span>
                      <span className="mini-day">{item.day}</span>
                    </div>
                    <div className="upcoming-info">
                      <strong>{item.title}</strong>
                      <span>{item.meta}</span>
                    </div>
                    <span
                      className={`countdown-pill ${
                        item.type === "template" ? "is-template-pill" : ""
                      }`}
                    >
                      {item.countdown}
                    </span>
                  </button>
                ))}
              </div>
            </article>

            <article className="card">
              <div className="card-header-stack">
                <h2>Riwayat jadwal</h2>
                <p>Kunjungan yang sudah lewat</p>
              </div>

              <div className="history-list">
                {HISTORY_LIST.map((row) => (
                  <div key={row.date} className="history-row">
                    <span className="history-date">{row.date}</span>
                    <span className={`status-tag ${row.attended ? "is-hadir" : "is-absen"}`}>
                      {row.status}
                    </span>
                  </div>
                ))}
              </div>
            </article>
          </div>
        </div>
      </main>
    </div>
  );
}
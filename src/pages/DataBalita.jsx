import { useState } from "react";
import Navbar from "../components/Navbar";
import "./Dashboard.css";

const ATTENDANCE_LOG = [
  { month: "Jan", status: "hadir", symbol: "✓", text: "Hadir" },
  { month: "Feb", status: "hadir", symbol: "✓", text: "Hadir" },
  { month: "Mar", status: "susulan", symbol: "!", text: "Susulan" },
  { month: "Apr", status: "hadir", symbol: "✓", text: "Hadir" },
  { month: "Mei", status: "hadir", symbol: "✓", text: "Hadir" },
  { month: "Jun", status: "hadir", symbol: "✓", text: "Hadir" },
  { month: "Jul", status: "hadir", symbol: "✓", text: "Hadir" },
  { month: "Agu", status: "hadir", symbol: "✓", text: "Hadir" },
  { month: "Sep", status: "absen", symbol: "–", text: "Absen" },
  { month: "Okt", status: "hadir", symbol: "✓", text: "Hadir" },
  { month: "Nov", status: "belum", symbol: "", text: "Belum" },
  { month: "Des", status: "belum", symbol: "", text: "Belum" },
];

const VISIT_HISTORY = [
  {
    period: "Oktober 2026",
    bb: "9,8",
    tb: "78,0",
    statusLabel: "▲ Naik",
    statusType: "naik",
    diff: "+400 gr (target KBM: 300 gr)",
    service: "Timbang, PMT",
  },
  {
    period: "September 2026",
    bb: "-",
    tb: "-",
    statusLabel: "– Absen",
    statusType: "absen",
    diff: "-",
    service: "-",
  },
  {
    period: "Agustus 2026",
    bb: "9,4",
    tb: "76,5",
    statusLabel: "▲ Naik",
    statusType: "naik",
    diff: "+500 gr (target KBM: 300 gr)",
    service: "Timbang, vitamin A",
  },
  {
    period: "Juli 2026",
    bb: "8,9",
    tb: "75,0",
    statusLabel: "▼ Tidak naik",
    statusType: "tidak-naik",
    diff: "Kurang 100 gr dari KBM",
    service: "Timbang, konsultasi gizi",
  },
];

export default function DataBalita({ user, onNavigate, onLogout }) {
  const [selectedChild, setSelectedChild] = useState("budi");
  const [showImmunization, setShowImmunization] = useState(true);

  return (
    <div className="app-shell">
      <Navbar activePage="data-balita" user={user} onNavigate={onNavigate} onLogout={onLogout} />

      <main className="main-container">
        <div className="stack-col">
          <article className="card child-selector-card">
            <div className="child-profile">
              <div className="child-avatar">B</div>
              <div>
                <h1 className="child-title-lg">Adek Budi</h1>
                <p className="child-meta">Laki-laki, 14 bulan | NIK 3578••••••••0001</p>
              </div>
            </div>

            <div className="child-picker-inline">
              <label htmlFor="balita-select">Pilih anak</label>
              <select
                id="balita-select"
                className="select-input"
                value={selectedChild}
                onChange={(e) => setSelectedChild(e.target.value)}
              >
                <option value="budi">Adek Budi (laki-laki, 14 bulan)</option>
              </select>
            </div>
          </article>

          <article className="card">
            <div className="inline-title-row">
              <h2>Status pertumbuhan terkini</h2>
              <span>Kunjungan terakhir: 15 Okt 2026</span>
            </div>

            <div className="growth-metrics-grid">
              <div className="metric-box">
                <span className="metric-label">Berat badan (BB)</span>
                <strong className="metric-big">9,8 kg</strong>
                <span className="metric-sub">+400 gr dari penimbangan terakhir</span>
              </div>

              <div className="metric-box">
                <span className="metric-label">Tinggi badan (TB)</span>
                <strong className="metric-big">78,0 cm</strong>
                <span className="metric-sub">+1,0 cm dari penimbangan terakhir</span>
              </div>

              <div className="metric-box is-highlight">
                <span className="metric-label is-plum">Kesimpulan status pertumbuhan</span>
                <div className="metric-trend">
                  <span>▲</span>
                  <strong>Naik</strong>
                </div>
                <span className="metric-sub is-plum">
                  Naik +400 gr (target KBM minimal 300 gr)
                </span>
              </div>
            </div>
          </article>

          <article className="card">
            <div className="inline-title-row">
              <h2>Log kehadiran 12 bulan</h2>
              <span>Tahun 2026</span>
            </div>

            <div className="month-log-grid">
              {ATTENDANCE_LOG.map((m) => (
                <div key={m.month} className={`month-tile is-${m.status}`}>
                  <span className="month-name">{m.month}</span>
                  {m.symbol && <span className="month-symbol">{m.symbol}</span>}
                  <span className="month-status-text">{m.text}</span>
                </div>
              ))}
            </div>

            <div className="log-legend">
              <span>✓ Hadir tepat waktu</span>
              <span>! Hadir susulan</span>
              <span>– Absen / terlewat</span>
              <span className="muted-legend">Garis putus-putus: belum berjalan</span>
            </div>
          </article>

          <article className="card">
            <div className="card-header">
              <h2>Riwayat lengkap kunjungan sebelumnya</h2>
            </div>

            <div className="table-responsive">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>BULAN &amp; TAHUN</th>
                    <th>BB (KG)</th>
                    <th>TB (CM)</th>
                    <th>STATUS GIZI</th>
                    <th>SELISIH DARI TARGET</th>
                    <th>TINDAKAN &amp; LAYANAN</th>
                  </tr>
                </thead>
                <tbody>
                  {VISIT_HISTORY.map((row) => (
                    <tr key={row.period}>
                      <td className="fw-bold">{row.period}</td>
                      <td>{row.bb}</td>
                      <td>{row.tb}</td>
                      <td>
                        <span className={`status-pill is-${row.statusType}`}>
                          {row.statusLabel}
                        </span>
                      </td>
                      <td>{row.diff}</td>
                      <td>{row.service}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </article>

          <article className="card">
            <div className="card-header">
              <div>
                <h2>Riwayat imunisasi</h2>
                <p className="card-subtext">Catatan vaksin yang telah diberikan kepada anak</p>
              </div>
              <button
                type="button"
                className="btn-primary btn-sm"
                onClick={() => setShowImmunization((prev) => !prev)}
              >
                {showImmunization ? "Tutup riwayat" : "Lihat riwayat"}
              </button>
            </div>

            {showImmunization && (
              <div className="table-responsive">
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>JENIS VAKSIN</th>
                      <th>TANGGAL PEMBERIAN</th>
                      <th>USIA SAAT PEMBERIAN</th>
                      <th>CATATAN</th>
                    </tr>
                  </thead>
                </table>
                <div className="empty-table-state">
                  <strong>Belum ada riwayat imunisasi</strong>
                  <p>Catatan imunisasi akan tampil setelah dicatat oleh petugas.</p>
                </div>
              </div>
            )}
          </article>
        </div>
      </main>
    </div>
  );
}
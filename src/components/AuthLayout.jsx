import "../pages/Auth.css";

const HIGHLIGHTS = [
  "Jadwal, lokasi, dan status hari H yang jelas",
  "Hitung mundur dan daftar barang bawaan",
  "Riwayat kehadiran dan status gizi anak",
];

export default function AuthLayout({ children }) {
  return (
    <div className="auth-page">
      <div className="auth-wrapper">
        <aside className="auth-banner">
          <div className="auth-banner-content">
            <h1>
              Jadwal posyandu, kesiapan kunjungan, dan tumbuh kembang anak dalam
              satu tempat.
            </h1>

            <ul className="auth-checklist">
              {HIGHLIGHTS.map((item) => (
                <li key={item}>
                  <svg
                    className="check-icon"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="M5 13l4 4L19 7" />
                  </svg>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </aside>

        <section className="auth-form-section">
          <div className="auth-form-container">{children}</div>
        </section>
      </div>
    </div>
  );
}
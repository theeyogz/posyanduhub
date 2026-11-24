import { useState } from "react";
import Navbar from "../components/Navbar";
import "./Dashboard.css";

const REGISTERED_CHILDREN = [
  {
    id_balita: 1,
    nama_balita: "Adek Budi",
    jenis_kelamin: "Laki-laki",
    usia: "14 bulan",
    tanggal_lahir: "15 Agu 2025",
  },
];

export default function Profil({ user, onUpdateUser, onNavigate, onLogout }) {
  const [motherForm, setMotherForm] = useState({
    name: user?.name || "",
    noKontak: user?.no_kontak || "",
    password: "",
  });
  const [profileSaved, setProfileSaved] = useState(false);

  const avatarInitial = (motherForm.name.trim().charAt(0) || "P").toUpperCase();

  const handleSaveProfile = (e) => {
    e.preventDefault();
    onUpdateUser?.({
      name: motherForm.name,
      password: motherForm.password,
    });
    setMotherForm((prev) => ({ ...prev, password: "" }));
    setProfileSaved(true);
    setTimeout(() => setProfileSaved(false), 2500);
  };

  return (
    <div className="app-shell">
      <Navbar activePage="profil" user={user} onNavigate={onNavigate} onLogout={onLogout} />

      <main className="main-container">
        <section className="page-header">
          <h1>Profil &amp; Data Anak</h1>
          <p>Kelola akun ibu dan lihat daftar balita yang terdaftar.</p>
        </section>

        <div className="profil-layout">
          <article className="card" style={{ height: "fit-content" }}>
            <div className="profil-card-head">
              <div className="profile-avatar" style={{ width: 42, height: 42, fontSize: 16 }}>
                {avatarInitial}
              </div>
              <h2>Profil ibu</h2>
            </div>

            <form className="profil-form" onSubmit={handleSaveProfile}>
              <div className="form-field">
                <label htmlFor="mother-name">Nama lengkap</label>
                <input
                  id="mother-name"
                  type="text"
                  className="text-input"
                  value={motherForm.name}
                  onChange={(e) => setMotherForm({ ...motherForm, name: e.target.value })}
                  required
                />
              </div>

              <div className="form-field">
                <label htmlFor="mother-phone">Nomor kontak</label>
                <input
                  id="mother-phone"
                  type="tel"
                  className="text-input is-readonly"
                  value={motherForm.noKontak}
                  readOnly
                />
              </div>

              <div className="form-field">
                <label htmlFor="mother-pass">Kata sandi baru</label>
                <input
                  id="mother-pass"
                  type="password"
                  className="text-input"
                  placeholder="Kosongkan jika tidak diubah"
                  value={motherForm.password}
                  onChange={(e) => setMotherForm({ ...motherForm, password: e.target.value })}
                />
              </div>

              <div>
                <button type="submit" className="btn-primary">
                  Simpan perubahan
                </button>
                {profileSaved && <span className="save-toast">Perubahan tersimpan</span>}
              </div>
            </form>
          </article>

          <article className="card">
            <div className="card-header-stack">
              <h2>Daftar anak terdaftar</h2>
              <p>Data balita dikelola oleh kader Posyandu RW 03.</p>
            </div>

            <div className="child-list-stack">
              {REGISTERED_CHILDREN.map((child) => (
                <div key={child.id_balita} className="child-list-item">
                  <div className="child-profile">
                    <div className="child-avatar" style={{ width: 44, height: 44, fontSize: 17 }}>
                      {child.nama_balita.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <strong className="child-name" style={{ fontSize: 15.5 }}>
                        {child.nama_balita}
                      </strong>
                      <p className="child-meta" style={{ fontSize: 13 }}>
                        {child.jenis_kelamin}, {child.usia} • Lahir {child.tanggal_lahir}
                      </p>
                    </div>
                  </div>

                  <button
                    type="button"
                    className="btn-outline btn-sm"
                    onClick={() => onNavigate("data-balita")}
                  >
                    Lihat data
                  </button>
                </div>
              ))}
            </div>

            <div className="info-note-box">
              Ingin menambahkan data anak baru atau memperbaiki data balita? Hubungi kader posyandu saat kunjungan atau melalui grup warga RW 03.
            </div>
          </article>
        </div>
      </main>
    </div>
  );
}
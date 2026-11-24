import { useState } from "react";
import AuthLayout from "../components/AuthLayout";

export default function Login({ onLogin }) {
  const [formData, setFormData] = useState({
    noKontak: "",
    password: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (error) setError("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const result = onLogin?.(formData);
    if (result && !result.ok) {
      setError(result.error);
    }
  };

  return (
    <AuthLayout>
      <div className="auth-header">
        <h2>Masuk ke Posyandu Hub</h2>
        <p>Gunakan nomor kontak dan kata sandi yang telah didaftarkan oleh kader.</p>
      </div>

      <form className="auth-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="login-phone">Nomor kontak</label>
          <input
            id="login-phone"
            type="tel"
            name="noKontak"
            placeholder="Contoh: 081234567890"
            value={formData.noKontak}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="login-password">Kata sandi</label>
          <input
            id="login-password"
            type="password"
            name="password"
            placeholder="Masukkan kata sandi"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>

        {error && <p className="auth-error">{error}</p>}

        <button type="submit" className="auth-submit-btn">
          Masuk
        </button>
      </form>

      <p className="auth-footer">
        Belum punya akun? Hubungi kader Posyandu RW 03 untuk pendaftaran.
      </p>
    </AuthLayout>
  );
}
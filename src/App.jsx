import { useState } from "react";
import Login from "./pages/Login";
import Beranda from "./pages/Beranda";
import Jadwal from "./pages/Jadwal";
import Kunjungan from "./pages/Kunjungan";
import DataBalita from "./pages/DataBalita";
import Profil from "./pages/Profil";

const SEED_USERS = [
  {
    id_pengguna: 1,
    name: "Ibu Maria",
    no_kontak: "081234567890",
    password: "123456",
    role: "ibu",
    no_rt: "03",
  },
  {
    id_pengguna: 2,
    name: "Ibu Siti",
    no_kontak: "081987654321",
    password: "123456",
    role: "ibu",
    no_rt: "02",
  },
];

function getStoredJSON(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

export default function App() {
  const [users, setUsers] = useState(() =>
    getStoredJSON("posyandu_users", SEED_USERS)
  );
  const [currentUser, setCurrentUser] = useState(() =>
    getStoredJSON("posyandu_current_user", null)
  );
  const [page, setPage] = useState(() => (currentUser ? "beranda" : "login"));

  const handleLogin = ({ noKontak, password }) => {
    const cleanedPhone = noKontak.replace(/\s+/g, "").trim();
    const foundUser = users.find((u) => u.no_kontak === cleanedPhone);

    if (!foundUser) {
      return {
        ok: false,
        error: "Nomor kontak belum terdaftar. Hubungi kader Posyandu RW 03.",
      };
    }

    if (foundUser.password !== password) {
      return { ok: false, error: "Kata sandi salah." };
    }

    setCurrentUser(foundUser);
    localStorage.setItem("posyandu_current_user", JSON.stringify(foundUser));
    setPage("beranda");
    return { ok: true };
  };

  const handleUpdateUser = ({ name, password }) => {
    if (!currentUser) return;

    const updatedUser = {
      ...currentUser,
      name: name.trim(),
      ...(password ? { password } : {}),
    };

    setCurrentUser(updatedUser);
    localStorage.setItem("posyandu_current_user", JSON.stringify(updatedUser));

    const updatedUsers = users.map((u) =>
      u.id_pengguna === updatedUser.id_pengguna ? updatedUser : u
    );
    setUsers(updatedUsers);
    localStorage.setItem("posyandu_users", JSON.stringify(updatedUsers));
  };

  const handleLogout = () => {
    setCurrentUser(null);
    localStorage.removeItem("posyandu_current_user");
    setPage("login");
  };

switch (page) {
    case "login":
      return <Login onLogin={handleLogin} />;
    case "jadwal":
      return <Jadwal user={currentUser} onNavigate={setPage} onLogout={handleLogout} />;
    case "kunjungan":
      return <Kunjungan user={currentUser} onNavigate={setPage} onLogout={handleLogout} />;
    case "data-balita":
      return <DataBalita user={currentUser} onNavigate={setPage} onLogout={handleLogout} />;
    case "profil":
      return (
        <Profil
          user={currentUser}
          onUpdateUser={handleUpdateUser}
          onNavigate={setPage}
          onLogout={handleLogout}
        />
      );
    default:
      return <Beranda user={currentUser} onNavigate={setPage} onLogout={handleLogout} />;
  }
}
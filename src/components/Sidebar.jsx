import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Sidebar() {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="w-72 min-h-screen bg-blue-800 text-white p-5 space-y-8 hidden md:block">
      <h2 className="text-2xl font-bold">ENTNT Dental Care</h2>
      <nav className="space-y-3">
        <NavLink to="/admin/dashboard" className="block hover:underline">Dashboard</NavLink>
        <NavLink to="/admin/patients" className="block hover:underline">Patients</NavLink>
        <NavLink to="/admin/appointments" className="block hover:underline">Appointments</NavLink>
        <NavLink to="/admin/calendar" className="block hover:underline">Calendar</NavLink>
        <button onClick={handleLogout} className="text-red-300 hover:underline">Logout</button>
      </nav>
    </div>
  );
}

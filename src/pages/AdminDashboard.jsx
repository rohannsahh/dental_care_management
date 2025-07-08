import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import DashboardCard from "../components/DashboardCard";
import { getAppointments } from "../utils/appointmentsStorage";
import { getPatients } from "../utils/patientsStorage";

export default function AdminDashboard() {
  const [appointments, setAppointments] = useState([]);
  const [patients, setPatients] = useState([]);

  useEffect(() => {
    setAppointments(getAppointments());
    setPatients(getPatients());
  }, []);

  const now = new Date();

  const nextAppointments = appointments
    .filter(a => new Date(a.datetime) > now)
    .sort((a, b) => new Date(a.datetime) - new Date(b.datetime))
    .slice(0, 10);

  const pending = appointments.filter(a => a.status === "pending");
  const completed = appointments.filter(a => a.status === "completed");

  const totalRevenue = completed.reduce((sum, a) => {
    const cost = parseFloat(a.cost || 0);
    return sum + (isNaN(cost) ? 0 : cost);
  }, 0);

  // Top patients by appointment count
  const topPatientMap = {};
  appointments.forEach((a) => {
    if (!topPatientMap[a.patientId]) topPatientMap[a.patientId] = 0;
    topPatientMap[a.patientId]++;
  });

  const topPatients = Object.entries(topPatientMap)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3)
    .map(([pid]) => patients.find(p => p.id === pid)?.fullName || "Unknown");

  return (
    <div className="flex min-h-screen flex-col gap-4 md:flex-row bg-gray-100 ">
      <Sidebar />
      <main className="flex-1 p-10 space-y-8">
        <h1 className="text-2xl font-semibold mb-4">Dashboard Overview</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <DashboardCard title="Upcoming Appointments" value={nextAppointments.length} />
          <DashboardCard title="Top Patients" value={topPatients.join(", ")} />
          <DashboardCard title="Pending Treatments" value={pending.length} color="bg-yellow-100" />
          <DashboardCard title="Total Revenue" value={`₹${totalRevenue}`} color="bg-green-100" />
        </div>

        <div className="mt-6 bg-white p-4 rounded shadow">
          <h2 className="text-lg font-semibold mb-5">Next 10 Appointments</h2>
          <ul className="space-y-3 text-sm">
            {nextAppointments.map(a => (
              <li key={a.id} className="border-b pb-2">
                <strong>{a.title}</strong> on {new Date(a.datetime).toLocaleString()} (
                {patients.find(p => p.id === a.patientId)?.fullName || "Unknown"})
              </li>
            ))}
          </ul>
        </div>
      </main>
    </div>
  );
}

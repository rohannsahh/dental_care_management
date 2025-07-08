import { useEffect, useState } from "react";
import { getAppointments } from "../utils/appointmentsStorage";
import { useAuth } from "../context/AuthContext";

export default function PatientDashboard() {
  const { currentUser } = useAuth();
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    const all = getAppointments();
    const mine = all.filter((a) => a.patientId === currentUser.patientId);
    setAppointments(mine);
  }, [currentUser]);

  const upcoming = appointments.filter(a => new Date(a.datetime) > new Date());
  const past = appointments.filter(a => new Date(a.datetime) <= new Date());

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-2xl font-bold mb-6">Hello, {currentUser.name}</h1>

      {/* Upcoming Appointments */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-3">📅 Upcoming Appointments</h2>
        {upcoming.length === 0 ? (
          <p className="text-gray-500">No upcoming appointments.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {upcoming.map((a) => (
              <div key={a.id} className="bg-white shadow p-4 rounded space-y-1">
                <div><strong>{a.title}</strong></div>
                <div>{new Date(a.datetime).toLocaleString()}</div>
                <div>Status: <span className="text-yellow-600">{a.status}</span></div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* History */}
      <section>
        <h2 className="text-xl font-semibold mb-3">📜 Appointment History</h2>
        {past.length === 0 ? (
          <p className="text-gray-500">No past appointments.</p>
        ) : (
          <div className="space-y-4">
            {past.map((a) => (
              <div key={a.id} className="bg-white p-4 rounded shadow text-sm space-y-1">
                <div><strong>{a.title}</strong></div>
                <div>Date: {new Date(a.datetime).toLocaleString()}</div>
                <div>Cost: ₹{a.cost || "N/A"}</div>
                <div>Treatment: {a.treatment || "N/A"}</div>
                {a.file && (
                  <a
                    href={a.file}
                    target="_blank"
                    rel="noreferrer"
                    className="text-blue-600 underline mt-1 inline-block"
                  >
                    View File
                  </a>
                )}
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

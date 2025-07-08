import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import AppointmentFormModal from "../components/AppointmentFormModal";
import { getAppointments, saveAppointments } from "../utils/appointmentsStorage";
import { getPatients } from "../utils/patientsStorage";

export default function Appointments() {
  const [appointments, setAppointments] = useState([]);
  const [patients, setPatients] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);

  useEffect(() => {
    setAppointments(getAppointments());
    setPatients(getPatients());
  }, []);

  const handleSave = (appt) => {
    let updated;
    if (editing) {
      updated = appointments.map((a) => (a.id === appt.id ? appt : a));
    } else {
      updated = [...appointments, appt];
    }
    setAppointments(updated);
    saveAppointments(updated);
  };

  const handleDelete = (id) => {
    const updated = appointments.filter((a) => a.id !== id);
    setAppointments(updated);
    saveAppointments(updated);
  };

  const getPatientName = (id) => {
    return patients.find((p) => p.id === id)?.fullName || "Unknown";
  };

  return (
    <div className="flex bg-gray-100 min-h-screen">
      <Sidebar />
      <main className="flex-1 p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-xl font-bold">Manage Appointments</h1>
          <button onClick={() => { setEditing(null); setModalOpen(true); }} className="bg-blue-600 text-white px-4 py-2 rounded">Add</button>
        </div>

        <table className="w-full bg-white rounded shadow text-sm">
          <thead className="bg-gray-200">
            <tr>
              <th className="p-2 text-left">Patient</th>
              <th className="p-2 text-left">Title</th>
              <th className="p-2 text-left">Date/Time</th>
              <th className="p-2 text-left">Status</th>
              <th className="p-2 text-left">Cost</th>
              <th className="p-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {appointments.length === 0 ? (
              <tr><td colSpan="6" className="p-4 text-center">No appointments</td></tr>
            ) : (
              appointments.map((a) => (
                <tr key={a.id} className="border-b">
                  <td className="p-2">{getPatientName(a.patientId)}</td>
                  <td className="p-2">{a.title}</td>
                  <td className="p-2">{new Date(a.datetime).toLocaleString()}</td>
                  <td className="p-2">{a.status}</td>
                  <td className="p-2">{a.cost || "-"}</td>
                  <td className="p-2 space-x-2">
                    <button onClick={() => { setEditing(a); setModalOpen(true); }} className="text-blue-500">Edit</button>
                    <button onClick={() => handleDelete(a.id)} className="text-red-500">Delete</button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>

        <AppointmentFormModal
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          onSave={handleSave}
          editing={editing}
          patients={patients}
        />
      </main>
    </div>
  );
}

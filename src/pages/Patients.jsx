import { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import PatientFormModal from "../components/PatientFormModal";
import { getPatients, savePatients } from "../utils/patientsStorage";

export default function Patients() {
  const [patients, setPatients] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingPatient, setEditingPatient] = useState(null);

  useEffect(() => {
    setPatients(getPatients());
  }, []);

  const handleAdd = () => {
    setEditingPatient(null);
    setModalOpen(true);
  };

  const handleEdit = (patient) => {
    setEditingPatient(patient);
    setModalOpen(true);
  };

  const handleDelete = (id) => {
    const updated = patients.filter((p) => p.id !== id);
    setPatients(updated);
    savePatients(updated);
  };

  const handleSave = (patient) => {
    let updated;
    if (editingPatient) {
      updated = patients.map((p) => (p.id === patient.id ? patient : p));
    } else {
      updated = [...patients, patient];
    }
    setPatients(updated);
    savePatients(updated);
  };

  return (
    <div className="flex bg-gray-100 min-h-screen">
      <Sidebar />
      <main className="flex-1 p-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-xl font-bold">Manage Patients</h1>
          <button onClick={handleAdd} className="bg-blue-600 text-white px-4 py-2 rounded">Add Patient</button>
        </div>

        <table className="w-full bg-white rounded shadow">
          <thead className="bg-gray-200">
            <tr>
              <th className="text-left p-2">Name</th>
              <th className="text-left p-2">DOB</th>
              <th className="text-left p-2">Contact</th>
              <th className="text-left p-2">Health Info</th>
              <th className="text-left p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {patients.length === 0 ? (
              <tr><td colSpan="5" className="p-4 text-center">No patients found</td></tr>
            ) : (
              patients.map((p) => (
                <tr key={p.id} className="border-b">
                  <td className="p-2">{p.fullName}</td>
                  <td className="p-2">{p.dob}</td>
                  <td className="p-2">{p.contact}</td>
                  <td className="p-2">{p.healthInfo}</td>
                  <td className="p-2 space-x-2">
                    <button onClick={() => handleEdit(p)} className="text-blue-500">Edit</button>
                    <button onClick={() => handleDelete(p.id)} className="text-red-500">Delete</button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>

        <PatientFormModal
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          onSave={handleSave}
          editingPatient={editingPatient}
        />
      </main>
    </div>
  );
}

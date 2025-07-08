import { useState, useEffect } from "react";

export default function PatientFormModal({ isOpen, onClose, onSave, editingPatient }) {
  const [form, setForm] = useState({
    fullName: "",
    dob: "",
    contact: "",
    healthInfo: "",
  });

  useEffect(() => {
    if (editingPatient) setForm(editingPatient);
  }, [editingPatient]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({ ...form, id: editingPatient?.id || Date.now().toString() });
    onClose();
    setForm({ fullName: "", dob: "", contact: "", healthInfo: "" });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
      <div className="bg-white p-6 rounded w-full max-w-md shadow">
        <h2 className="text-lg font-semibold mb-4">{editingPatient ? "Edit" : "Add"} Patient</h2>
        <form onSubmit={handleSubmit} className="space-y-3">
          <input name="fullName" required placeholder="Full Name" className="w-full p-2 border" value={form.fullName} onChange={handleChange} />
          <input name="dob" required type="date" className="w-full p-2 border" value={form.dob} onChange={handleChange} />
          <input name="contact" required placeholder="Contact" className="w-full p-2 border" value={form.contact} onChange={handleChange} />
          <textarea name="healthInfo" placeholder="Health Info" className="w-full p-2 border" value={form.healthInfo} onChange={handleChange}></textarea>
          <div className="flex justify-between mt-4">
            <button type="button" onClick={onClose} className="bg-gray-200 px-4 py-2 rounded">Cancel</button>
            <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">{editingPatient ? "Update" : "Save"}</button>
          </div>
        </form>
      </div>
    </div>
  );
}

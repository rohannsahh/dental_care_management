import { useEffect, useState } from "react";

export default function AppointmentFormModal({ isOpen, onClose, onSave, editing, patients }) {
  const [form, setForm] = useState({
    patientId: "",
    title: "",
    description: "",
    comments: "",
    datetime: "",
    cost: "",
    treatment: "",
    status: "pending",
    nextDate: "",
    file: ""
  });

  useEffect(() => {
    if (editing) setForm(editing);
  }, [editing]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFile = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      setForm({ ...form, file: reader.result });
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newApp = {
      ...form,
      id: editing?.id || Date.now().toString()
    };
    onSave(newApp);
    onClose();
    setForm({
      patientId: "",
      title: "",
      description: "",
      comments: "",
      datetime: "",
      cost: "",
      treatment: "",
      status: "pending",
      nextDate: "",
      file: ""
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded shadow w-full max-w-md">
        <h2 className="text-lg font-semibold mb-4">{editing ? "Edit" : "Add"} Appointment</h2>
        <form onSubmit={handleSubmit} className="space-y-2">
          <select
            name="patientId"
            required
            className="w-full border p-2"
            value={form.patientId}
            onChange={handleChange}
          >
            <option value="">Select Patient</option>
            {patients.map((p) => (
              <option key={p.id} value={p.id}>{p.fullName}</option>
            ))}
          </select>
          <input name="title" required placeholder="Title" value={form.title} onChange={handleChange} className="w-full p-2 border" />
          <textarea name="description" placeholder="Description" value={form.description} onChange={handleChange} className="w-full p-2 border" />
          <input name="comments" placeholder="Comments" value={form.comments} onChange={handleChange} className="w-full p-2 border" />
          <input name="datetime" required type="datetime-local" value={form.datetime} onChange={handleChange} className="w-full p-2 border" />
          <input name="cost" placeholder="Cost (optional)" value={form.cost} onChange={handleChange} className="w-full p-2 border" />
          <input name="treatment" placeholder="Treatment (optional)" value={form.treatment} onChange={handleChange} className="w-full p-2 border" />
          <select name="status" value={form.status} onChange={handleChange} className="w-full p-2 border">
            <option value="pending">Pending</option>
            <option value="completed">Completed</option>
          </select>
          <input name="nextDate" type="date" value={form.nextDate} onChange={handleChange} className="w-full p-2 border" />
          <input type="file" accept="image/*,.pdf" onChange={handleFile} className="w-full p-2 border" />
          {form.file && (
            <div className="text-sm text-green-600 mt-1">File attached ✅</div>
          )}
          <div className="flex justify-between mt-3">
            <button type="button" onClick={onClose} className="bg-gray-200 px-4 py-1 rounded">Cancel</button>
            <button type="submit" className="bg-blue-600 text-white px-4 py-1 rounded">Save</button>
          </div>
        </form>
      </div>
    </div>
  );
}

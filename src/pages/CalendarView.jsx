import { useState, useEffect } from "react";
import Calendar from "react-calendar";
import 'react-calendar/dist/Calendar.css';
import Sidebar from "../components/Sidebar";
import { getAppointments } from "../utils/appointmentsStorage";
import { getPatients } from "../utils/patientsStorage";

export default function CalendarView() {
  const [appointments, setAppointments] = useState([]);
  const [patients, setPatients] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());

  useEffect(() => {
    setAppointments(getAppointments());
    setPatients(getPatients());
  }, []);

  const getAppointmentsForDate = (date) => {
    return appointments.filter(
      (a) => new Date(a.datetime).toDateString() === date.toDateString()
    );
  };

  const getPatientName = (id) => {
    return patients.find((p) => p.id === id)?.fullName || "Unknown";
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <main className="flex-1 p-6">
        <h1 className="text-xl font-bold mb-4">Calendar View</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <Calendar
              onChange={setSelectedDate}
              value={selectedDate}
              className="rounded border"
            />
          </div>

          <div>
            <h2 className="text-lg font-semibold mb-2">
              Appointments on {selectedDate.toDateString()}
            </h2>
            {getAppointmentsForDate(selectedDate).length === 0 ? (
              <p className="text-gray-500">No appointments</p>
            ) : (
              <ul className="space-y-2">
                {getAppointmentsForDate(selectedDate).map((a) => (
                  <li
                    key={a.id}
                    className="bg-white p-3 rounded shadow border text-sm"
                  >
                    <strong>{a.title}</strong> with <em>{getPatientName(a.patientId)}</em>
                    <div>{new Date(a.datetime).toLocaleTimeString()}</div>
                    <div>Status: {a.status}</div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

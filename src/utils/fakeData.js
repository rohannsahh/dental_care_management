export const users = [
  {
    id: "1",
    name: "Dr. Sam",
    email: "admin@entnt.in",
    password: "admin123",
    role: "admin",
  },
  {
    id: "2",
    name: "Rohan Shah",
    email: "patient@entnt.in",
    password: "patient123",
    role: "patient",
    patientId: "p1", 
  },
];

export const patients = [
  {
    id: "p1",
    fullName: "Rohan Shah",
    dob: "1998-02-25",
    contact: "9876543210",
    healthInfo: "Diabetic, allergic to penicillin",
  },
];

export const appointments = [
  {
    id: "a1",
    patientId: "p1",
    title: "Root Canal",
    description: "Pain in upper left molar",
    comments: "Required immediate attention",
    datetime: "2025-07-06T09:30:00",
    cost: "5000",
    treatment: "Completed root canal",
    status: "completed",
    nextDate: "2025-08-06",
    file: "data:application/pdf;base64,dummybase64string", // dummy base64 file
  },
  {
    id: "a2",
    patientId: "p1",
    title: "Dental Cleaning",
    description: "Routine cleaning",
    comments: "Follow-up advised in 6 months",
    datetime: "2025-07-10T11:00:00",
    status: "pending",
  },
];
export const seedMockData = () => {
  if (!localStorage.getItem("users")) {
    localStorage.setItem("users", JSON.stringify(users));
    localStorage.setItem("patients", JSON.stringify(patients));
    localStorage.setItem("appointments", JSON.stringify(appointments));
    console.log("✅ Mock data seeded to localStorage");
  }
};

#  Dental Center Management Dashboard (Frontend Only)

This is a **React-based frontend dashboard** built for ENTNT's Dental Center Management System. It simulates a real-world clinic management system with role-based access, patient and appointment management, and file uploads — all using `localStorage` with no backend.

---

##  Features

###  Authentication
- Hardcoded login for Admin (Dentist) and Patient
- Email/password-based login
- Role-based routing & session management via `localStorage`

###  Admin Role (Dentist)
- Manage patients (Add/Edit/Delete)
- Manage appointments (Incidents) per patient
- Add treatment details, costs, comments, file uploads (stored as base64/blob URLs)
- Dashboard with:
  - KPIs (Upcoming appointments, revenue, top patients)
  - Next 10 appointments
- Calendar view (monthly/weekly)

###  Patient Role
- View own details
- View upcoming appointments & past treatment history
- Preview uploaded files (invoices/images)

###  LocalStorage Data
- Simulated users, patients, and appointment data via `fakeData.js`
- All form submissions & uploads are persisted in browser storage

###  UI & Tech
- React (functional components)
- React Router (role-based protected routes)
- Context API for global state
- TailwindCSS for styling
- Responsive design across mobile, tablet, desktop


```bash
   git clone https://github.com/rohannsahh/dental_care_management
   cd dental_care_management

   npm install

   npm run dev


  http://localhost:5173


###  Login credentials

Admin

```bash
   Email: admin@entnt.in
   Password: admin123


Patient

```bash

   Email: patient@entnt.in
   Password: patient123



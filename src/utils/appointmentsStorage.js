export const getAppointments = () => {
  return JSON.parse(localStorage.getItem("appointments")) || [];
};

export const saveAppointments = (appointments) => {
  localStorage.setItem("appointments", JSON.stringify(appointments));
};

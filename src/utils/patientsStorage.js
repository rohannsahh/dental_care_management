export const getPatients = () => {
  return JSON.parse(localStorage.getItem("patients")) || [];
};

export const savePatients = (patients) => {
  localStorage.setItem("patients", JSON.stringify(patients));
};

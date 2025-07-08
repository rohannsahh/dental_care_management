export default function DashboardCard({ title, value, color = "bg-white" }) {
  return (
    <div className={`p-4 rounded shadow ${color}`}>
      <h3 className="text-sm text-gray-600">{title}</h3>
      <p className="text-xl font-bold">{value}</p>
    </div>
  );
}

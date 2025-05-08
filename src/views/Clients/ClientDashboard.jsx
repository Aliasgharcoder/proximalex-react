const DashboardCard = ({ title, value }) => (
  <div className="bg-white shadow p-4 rounded-lg text-center">
    <h3 className="text-gray-600">{title}</h3>
    <p className="text-2xl font-semibold text-orange-600">{value}</p>
  </div>
);

const ClientDashboard = () => {
  return (
    <div className="space-y-8">
      <h2 className="text-3xl font-bold text-gray-800">Dashboard</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <DashboardCard title="Total Cases" value="12" />
        <DashboardCard title="Pending Cases" value="5" />
        <DashboardCard title="Resolved Cases" value="6" />
        <DashboardCard title="Upcoming Hearings" value="3" />
      </div>
    </div>
  );
};

export default ClientDashboard;

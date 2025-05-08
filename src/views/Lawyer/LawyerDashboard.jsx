import UpcomingWork from "./DashboardWidgets/UpcomingWork";
import CaseOverview from "./DashboardWidgets/CaseOverview";
import TaskList from "./DashboardWidgets/TaskList";
import CalendarWidget from "./DashboardWidgets/CalendarWidget";
// import QuickActions from "./DashboardWidgets/QuickActions";
import RecentActivity from "./DashboardWidgets/RecentActivity";

const LawyerDashboard = () => {
  return (
    <div className="space-y-6 p-4 xl:p-6 2xl:p-8">
      {/* Row 1 */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="xl:col-span-2">
          <UpcomingWork />
        </div>
        <CaseOverview />
      </div>

      {/* Row 2 */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="xl:col-span-2">
          <TaskList />
        </div>
        <CalendarWidget />
      </div>

      {/* Row 3 */} 
     <div className="grid grid-cols-1 gap-6">
        {/* <AiSuggestions /> */}
        <RecentActivity />
      </div>
    </div>
  );
};

export default LawyerDashboard;

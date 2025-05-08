import { Activity, CheckCircle, Clock, AlertTriangle, Database,ChevronRight } from "lucide-react";

const CaseOverview = () => {
  const cases = {
    total: 50,
    active: 20,
    resolved: 25,
    pending: 5,
    urgent: 5,
  };

  const caseStats = [
    {
      label: "Total Cases",
      value: cases.total,
      icon: <Database className="w-5 h-5" />,
      color: "bg-indigo-100 text-indigo-600"
    },
    {
      label: "Active Cases",
      value: cases.active,
      icon: <Activity className="w-5 h-5" />,
      color: "bg-blue-100 text-blue-600"
    },
    {
      label: "Resolved",
      value: cases.resolved,
      icon: <CheckCircle className="w-5 h-5" />,
      color: "bg-emerald-100 text-emerald-600"
    },
    {
      label: "Pending",
      value: cases.pending,
      icon: <Clock className="w-5 h-5" />,
      color: "bg-amber-100 text-amber-600"
    },
    {
      label: "Urgent",
      value: cases.urgent,
      icon: <AlertTriangle className="w-5 h-5" />,
      color: "bg-red-100 text-red-600"
    }
  ];

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden h-full transition-all hover:shadow-md">
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold text-gray-800">Case Overview</h2>
          <button className="text-sm text-indigo-600 hover:text-indigo-800 flex items-center gap-1">
            View details <ChevronRight size={16} />
          </button>
        </div>
        
        <div className="space-y-4">
          {caseStats.map((stat, index) => (
            <div 
              key={index} 
              className="group flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-full ${stat.color}`}>
                  {stat.icon}
                </div>
                <span className="text-sm font-medium text-gray-600 group-hover:text-gray-800 transition-colors">
                  {stat.label}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-lg font-semibold text-gray-800">
                  {stat.value}
                </span>
                {stat.label === "Resolved" && (
                  <span className="text-xs font-medium bg-emerald-50 text-emerald-600 px-2 py-1 rounded-full">
                    +3 this week
                  </span>
                )}
                {stat.label === "Urgent" && (
                  <span className="text-xs font-medium bg-red-50 text-red-600 px-2 py-1 rounded-full">
                    Needs attention
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <div className="px-6 pb-4">
        <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-indigo-500 to-blue-500 rounded-full" 
            style={{ width: `${(cases.active / cases.total) * 100}%` }}
          />
        </div>
        <div className="flex justify-between items-center mt-2 text-xs text-gray-500">
          <span>Case progress</span>
          <span>{Math.round((cases.active / cases.total) * 100)}% active</span>
        </div>
      </div>
    </div>
  );
};

export default CaseOverview;
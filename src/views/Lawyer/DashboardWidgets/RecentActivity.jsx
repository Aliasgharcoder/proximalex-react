import { FileText, Edit, Clock, ChevronRight, MessageSquare, User, FilePlus } from "lucide-react";

const RecentActivity = () => {
  const activities = [
    { 
      activity: "Added document to Case #12345", 
      time: "2 hours ago",
      type: "document",
      case: "State vs Johnson"
    },
    { 
      activity: "Updated client info for Case #12453", 
      time: "1 day ago",
      type: "update",
      case: "Khan vs Associates"
    },
    { 
      activity: "Sent message to Sarah Khan", 
      time: "3 days ago",
      type: "message",
      case: "Khan Divorce Case"
    },
    { 
      activity: "Created new case file #12460", 
      time: "1 week ago",
      type: "new-case",
      case: "Smith Contract Dispute"
    },
  ];

  const getActivityIcon = (type) => {
    switch(type) {
      case "document": return <FileText className="w-4 h-4" />;
      case "update": return <Edit className="w-4 h-4" />;
      case "message": return <MessageSquare className="w-4 h-4" />;
      case "new-case": return <FilePlus className="w-4 h-4" />;
      default: return <User className="w-4 h-4" />;
    }
  };

  const getActivityColor = (type) => {
    switch(type) {
      case "document": return "text-blue-500";
      case "update": return "text-purple-500";
      case "message": return "text-green-500";
      case "new-case": return "text-amber-500";
      default: return "text-gray-500";
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden h-full transition-all hover:shadow-md">
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold text-gray-800">Recent Activity</h2>
          <button className="text-sm text-indigo-600 hover:text-indigo-800 flex items-center gap-1">
            View all <ChevronRight size={16} />
          </button>
        </div>

        <div className="space-y-4">
          {activities.map((activity, idx) => (
            <div 
              key={idx} 
              className="group flex items-start gap-4 p-3 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
            >
              <div className={`p-2 rounded-full ${getActivityColor(activity.type)} bg-opacity-20 mt-1`}>
                {getActivityIcon(activity.type)}
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-sm font-medium text-gray-800 group-hover:text-indigo-600 transition-colors">
                  {activity.activity}
                </h3>
                <p className="text-xs text-gray-500 truncate">
                  {activity.case}
                </p>
                <div className="flex items-center gap-2 mt-1 text-xs text-gray-500">
                  <Clock className="w-3 h-3" />
                  <span>{activity.time}</span>
                </div>
              </div>
              <button className="p-1 text-gray-400 hover:text-indigo-600 transition-colors">
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>

        <div className="mt-6 text-center">
          <button className="text-sm text-indigo-600 hover:text-indigo-800 flex items-center justify-center gap-1 w-full">
            Load more activity
          </button>
        </div>
      </div>
    </div>
  );
};

export default RecentActivity;
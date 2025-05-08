import { CalendarDays, Briefcase, Clock, ChevronRight } from "lucide-react";

const UpcomingWork = () => {
  const upcoming = [
    {
      title: "Court Hearing: State vs John",
      date: "April 10, 2025",
      time: "10:00 AM",
      location: "District Court",
      priority: "high"
    },
    {
      title: "Client Meeting: Sarah Khan",
      date: "April 12, 2025",
      time: "2:30 PM",
      location: "Office",
      priority: "medium"
    },
    {
      title: "Document Submission Deadline",
      date: "April 14, 2025",
      time: "5:00 PM",
      location: "High Court",
      priority: "high"
    },
  ];

  const getPriorityColor = (priority) => {
    switch(priority) {
      case "high": return "bg-red-100 text-red-800";
      case "medium": return "bg-amber-100 text-amber-800";
      default: return "bg-blue-100 text-blue-800";
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden h-full transition-all hover:shadow-md">
      <div className="p-6 pb-4">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold text-gray-800">Upcoming Work</h2>
          <button className="text-sm text-indigo-600 hover:text-indigo-800 flex items-center gap-1">
            View all <ChevronRight size={16} />
          </button>
        </div>
        
        <ul className="space-y-3">
          {upcoming.map((item, idx) => (
            <li 
              key={idx} 
              className="group relative overflow-hidden bg-gradient-to-r from-white to-gray-50 rounded-lg p-4 transition-all 
                         hover:shadow-sm hover:border-gray-200 border border-transparent"
            >
              <div className="flex justify-between items-start">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-lg font-medium text-gray-800 group-hover:text-indigo-600 transition-colors">
                      {item.title}
                    </h3>
                    {item.priority && (
                      <span className={`text-xs px-2 py-1 rounded-full ${getPriorityColor(item.priority)}`}>
                        {item.priority}
                      </span>
                    )}
                  </div>
                  
                  <div className="flex flex-wrap gap-x-4 gap-y-2 mt-3 text-sm text-gray-600">
                    <span className="flex items-center gap-2">
                      <CalendarDays className="w-4 h-4 text-gray-400" />
                      {item.date}
                    </span>
                    <span className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-gray-400" />
                      {item.time}
                    </span>
                    <span className="flex items-center gap-2">
                      <Briefcase className="w-4 h-4 text-gray-400" />
                      {item.location}
                    </span>
                  </div>
                </div>
                
                <button className="p-1 text-gray-400 hover:text-indigo-600 transition-colors">
                  <ChevronRight size={18} />
                </button>
              </div>
              
              <div className="absolute bottom-0 left-0 h-0.5 bg-indigo-100 w-0 group-hover:w-full transition-all duration-300" />
            </li>
          ))}
        </ul>
      </div>
      
      <div className="px-6 pb-4">
        <button className="w-full py-2 bg-indigo-50 text-indigo-600 rounded-lg text-sm font-medium
                          hover:bg-indigo-100 transition-colors flex items-center justify-center gap-2">
          <span>Add New Task</span>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" 
               stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="12" y1="5" x2="12" y2="19"></line>
            <line x1="5" y1="12" x2="19" y2="12"></line>
          </svg>
        </button>
      </div>
    </div>
  );
};

export default UpcomingWork;
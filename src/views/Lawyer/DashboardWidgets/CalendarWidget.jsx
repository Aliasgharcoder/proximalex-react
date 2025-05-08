import { Calendar,Activity,ChevronRight,User2, AlertCircle, Clock } from "lucide-react";

const CalendarWidget = () => {
  const events = [
    { 
      title: "Court Hearing: State vs John", 
      date: "April 10, 2025",
      type: "hearing"
    },
    { 
      title: "Client Meeting: Sarah Khan", 
      date: "April 12, 2025",
      type: "meeting"
    },
    { 
      title: "Document Submission Deadline", 
      date: "April 14, 2025",
      type: "deadline"
    },
  ];

  const getEventColor = (type) => {
    switch(type) {
      case "hearing": return "bg-purple-100 text-purple-600";
      case "meeting": return "bg-blue-100 text-blue-600";
      case "deadline": return "bg-red-100 text-red-600";
      default: return "bg-gray-100 text-gray-600";
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden h-full transition-all hover:shadow-md">
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold text-gray-800">Upcoming Events</h2>
          <button className="text-sm text-indigo-600 hover:text-indigo-800 flex items-center gap-1">
            View all <ChevronRight size={16} />
          </button>
        </div>

        <div className="flex items-center gap-3 mb-6 p-3 bg-indigo-50 rounded-lg">
          <div className="p-2 bg-indigo-100 rounded-lg text-indigo-600">
            <Calendar className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-medium text-gray-800">April 2025</h3>
            <p className="text-sm text-gray-600">3 upcoming events</p>
          </div>
        </div>

        <ul className="space-y-3">
          {events.map((event, idx) => (
            <li 
              key={idx} 
              className="group flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-full ${getEventColor(event.type)}`}>
                  {event.type === "hearing" && <Activity className="w-4 h-4" />}
                  {event.type === "meeting" && <User2 className="w-4 h-4" />}
                  {event.type === "deadline" && <AlertCircle className="w-4 h-4" />}
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-800 group-hover:text-indigo-600 transition-colors">
                    {event.title}
                  </h3>
                  <p className="text-xs text-gray-500 flex items-center gap-1">
                    <Clock className="w-3 h-3" /> {event.date}
                  </p>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-indigo-600 transition-colors" />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default CalendarWidget;

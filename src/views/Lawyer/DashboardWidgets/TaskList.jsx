import { CheckCircle2, ChevronRight, Clock } from "lucide-react";

const TaskList = () => {
  const tasks = [
    { 
      title: "Prepare for Court Hearing: State vs John", 
      dueDate: "April 9, 2025",
      priority: "high",
      completed: false
    },
    { 
      title: "Client Consultation: Sarah Khan", 
      dueDate: "April 11, 2025",
      priority: "medium",
      completed: true
    },
    { 
      title: "Review Documents for Case #12453", 
      dueDate: "April 13, 2025",
      priority: "low",
      completed: false
    },
  ];

  const getPriorityColor = (priority) => {
    switch(priority) {
      case "high": return "bg-red-100 text-red-600";
      case "medium": return "bg-amber-100 text-amber-600";
      case "low": return "bg-blue-100 text-blue-600";
      default: return "bg-gray-100 text-gray-600";
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden h-full transition-all hover:shadow-md">
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold text-gray-800">Tasks</h2>
          <button className="text-sm text-indigo-600 hover:text-indigo-800 flex items-center gap-1">
            View all <ChevronRight size={16} />
          </button>
        </div>

        <ul className="space-y-3">
          {tasks.map((task, idx) => (
            <li 
              key={idx} 
              className="group flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <button className={`p-1 rounded-full ${task.completed ? 'text-emerald-500' : 'text-gray-300'} hover:text-emerald-500 transition-colors`}>
                  <CheckCircle2 className="w-5 h-5" />
                </button>
                <div className="flex-1 min-w-0">
                  <h3 className={`text-sm font-medium truncate ${task.completed ? 'text-gray-400 line-through' : 'text-gray-800'} group-hover:text-indigo-600 transition-colors`}>
                    {task.title}
                  </h3>
                  <div className="flex items-center gap-2 mt-1">
                    <p className="text-xs text-gray-500 flex items-center gap-1">
                      <Clock className="w-3 h-3" /> {task.dueDate}
                    </p>
                    <span className={`text-xs px-1.5 py-0.5 rounded-full ${getPriorityColor(task.priority)}`}>
                      {task.priority}
                    </span>
                  </div>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-indigo-600 transition-colors" />
            </li>
          ))}
        </ul>

        <div className="mt-6">
          <button className="w-full py-2 bg-indigo-50 text-indigo-600 rounded-lg text-sm font-medium hover:bg-indigo-100 transition-colors flex items-center justify-center gap-2">
            <span>Add New Task</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" 
                 stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="12" y1="5" x2="12" y2="19"></line>
              <line x1="5" y1="12" x2="19" y2="12"></line>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskList;

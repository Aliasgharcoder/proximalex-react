import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { useState, useEffect } from "react";
import { Edit2, Trash2, Plus, ChevronDown, Clock, Calendar as CalendarIcon, Users, Gavel, Filter, X } from "lucide-react";

const SchedulingView = () => {
  const [events, setEvents] = useState([
    {
      id: "1",
      title: "Client Meeting: Sarah Johnson",
      date: "2025-04-10",
      start: "2025-04-10T10:00:00",
      end: "2025-04-10T11:30:00",
      type: "meeting",
      client: "Sarah Johnson",
      case: "Property Dispute #12453"
    },
    {
      id: "2",
      title: "Court Appearance: State vs. Miller",
      date: "2025-04-12",
      start: "2025-04-12T14:00:00",
      end: "2025-04-12T16:00:00",
      type: "court",
      client: "State of California",
      case: "CR-2025-0421"
    },
    {
      id: "3",
      title: "Document Review",
      date: "2025-04-15",
      start: "2025-04-15T09:00:00",
      end: "2025-04-15T11:00:00",
      type: "review",
      client: "Internal",
      case: "Contract Draft #12460"
    },
  ]);

  const [filteredEvents, setFilteredEvents] = useState(events);
  const [eventFilter, setEventFilter] = useState("all");
  const [isMobile, setIsMobile] = useState(false);
  const [showMobileFilter, setShowMobileFilter] = useState(false);

  const [newEvent, setNewEvent] = useState({
    title: "",
    date: "",
    startTime: "",
    endTime: "",
    type: "meeting",
    client: "",
    case: ""
  });

  const [showEventForm, setShowEventForm] = useState(false);
  const [currentEventId, setCurrentEventId] = useState(null);

  // Check mobile view on resize
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Filter events when filter or events change
  useEffect(() => {
    if (eventFilter === "all") {
      setFilteredEvents(events);
    } else {
      setFilteredEvents(events.filter(event => event.type === eventFilter));
    }
  }, [eventFilter, events]);

  const handleDateClick = (arg) => {
    setNewEvent({
      ...newEvent,
      date: arg.dateStr,
      startTime: "09:00",
      endTime: "10:00"
    });
    setCurrentEventId(null);
    setShowEventForm(true);
  };

  const handleAddEvent = () => {
    const [startHours, startMinutes] = newEvent.startTime.split(':');
    const [endHours, endMinutes] = newEvent.endTime.split(':');
    
    const newEventObj = {
      id: currentEventId || Date.now().toString(),
      title: newEvent.title,
      date: newEvent.date,
      start: `${newEvent.date}T${startHours.padStart(2, '0')}:${startMinutes}:00`,
      end: `${newEvent.date}T${endHours.padStart(2, '0')}:${endMinutes}:00`,
      type: newEvent.type,
      client: newEvent.client,
      case: newEvent.case
    };

    if (currentEventId) {
      setEvents(events.map(event => event.id === currentEventId ? newEventObj : event));
    } else {
      setEvents([...events, newEventObj]);
    }
    
    setShowEventForm(false);
    setNewEvent({
      title: "",
      date: "",
      startTime: "",
      endTime: "",
      type: "meeting",
      client: "",
      case: ""
    });
  };

  const deleteEvent = (id) => {
    setEvents(events.filter(event => event.id !== id));
  };

  const handleEventDrop = (info) => {
    const { event } = info;
    setEvents(events.map(evt => {
      if (evt.id === event.id) {
        return {
          ...evt,
          date: event.startStr.split('T')[0],
          start: event.startStr,
          end: event.endStr
        };
      }
      return evt;
    }));
  };

  const handleEventResize = (info) => {
    const { event } = info;
    setEvents(events.map(evt => {
      if (evt.id === event.id) {
        return {
          ...evt,
          start: event.startStr,
          end: event.endStr
        };
      }
      return evt;
    }));
  };

  const getEventIcon = (type) => {
    switch(type) {
      case "meeting": return <Users className="w-4 h-4" />;
      case "court": return <Gavel className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  const getEventColor = (type) => {
    switch(type) {
      case "meeting": return "bg-blue-100 text-blue-600";
      case "court": return "bg-purple-100 text-purple-600";
      default: return "bg-amber-100 text-amber-600";
    }
  };

  const getEventColorCalendar = (type) => {
    switch(type) {
      case "meeting": return '#3b82f6';
      case "court": return '#8b5cf6';
      default: return '#f59e0b';
    }
  };

  return (
    <div className="space-y-6 p-4 md:p-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <h2 className="text-2xl font-bold text-gray-800">My Schedule</h2>
        
        <div className="flex items-center gap-3">
          {/* Mobile filter button */}
          {isMobile && (
            <button 
              onClick={() => setShowMobileFilter(!showMobileFilter)}
              className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 px-3 py-2 rounded-lg"
            >
              <Filter size={16} />
              <span>Filter</span>
            </button>
          )}
          
          <button 
            onClick={() => {
              setShowEventForm(true);
              setCurrentEventId(null);
            }}
            className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg transition-colors"
          >
            <Plus size={16} />
            <span className="hidden sm:inline">Add Event</span>
          </button>
        </div>
      </div>

      {/* Mobile Filter Panel */}
      {isMobile && showMobileFilter && (
        <div className="bg-white p-4 rounded-xl shadow border border-gray-200">
          <div className="flex justify-between items-center mb-3">
            <h3 className="font-medium">Filter Events</h3>
            <button onClick={() => setShowMobileFilter(false)}>
              <X size={18} />
            </button>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => setEventFilter("all")}
              className={`px-3 py-2 rounded-lg text-sm ${eventFilter === "all" ? 'bg-indigo-100 text-indigo-700' : 'bg-gray-100'}`}
            >
              All Events
            </button>
            <button
              onClick={() => setEventFilter("meeting")}
              className={`px-3 py-2 rounded-lg text-sm ${eventFilter === "meeting" ? 'bg-blue-100 text-blue-700' : 'bg-gray-100'}`}
            >
              Meetings
            </button>
            <button
              onClick={() => setEventFilter("court")}
              className={`px-3 py-2 rounded-lg text-sm ${eventFilter === "court" ? 'bg-purple-100 text-purple-700' : 'bg-gray-100'}`}
            >
              Court
            </button>
            <button
              onClick={() => setEventFilter("review")}
              className={`px-3 py-2 rounded-lg text-sm ${eventFilter === "review" ? 'bg-amber-100 text-amber-700' : 'bg-gray-100'}`}
            >
              Reviews
            </button>
          </div>
        </div>
      )}

      {/* Desktop Filter */}
      {!isMobile && (
        <div className="bg-white p-4 rounded-xl shadow border border-gray-200">
          <div className="flex items-center gap-4">
            <span className="text-sm font-medium">Filter:</span>
            <button
              onClick={() => setEventFilter("all")}
              className={`px-4 py-2 rounded-lg text-sm ${eventFilter === "all" ? 'bg-indigo-100 text-indigo-700' : 'bg-gray-100'}`}
            >
              All Events
            </button>
            <button
              onClick={() => setEventFilter("meeting")}
              className={`px-4 py-2 rounded-lg text-sm ${eventFilter === "meeting" ? 'bg-blue-100 text-blue-700' : 'bg-gray-100'}`}
            >
              Meetings
            </button>
            <button
              onClick={() => setEventFilter("court")}
              className={`px-4 py-2 rounded-lg text-sm ${eventFilter === "court" ? 'bg-purple-100 text-purple-700' : 'bg-gray-100'}`}
            >
              Court Dates
            </button>
            <button
              onClick={() => setEventFilter("review")}
              className={`px-4 py-2 rounded-lg text-sm ${eventFilter === "review" ? 'bg-amber-100 text-amber-700' : 'bg-gray-100'}`}
            >
              Reviews
            </button>
          </div>
        </div>
      )}

      {/* Event Form Modal */}
      {showEventForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
            <h3 className="text-xl font-semibold mb-4">
              {currentEventId ? "Edit Event" : "Add New Event"}
            </h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Event Title</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  value={newEvent.title}
                  onChange={(e) => setNewEvent({...newEvent, title: e.target.value})}
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                  <input
                    type="date"
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
                    value={newEvent.date}
                    onChange={(e) => setNewEvent({...newEvent, date: e.target.value})}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
                  <select
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
                    value={newEvent.type}
                    onChange={(e) => setNewEvent({...newEvent, type: e.target.value})}
                  >
                    <option value="meeting">Meeting</option>
                    <option value="court">Court</option>
                    <option value="review">Review</option>
                  </select>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Start Time</label>
                  <input
                    type="time"
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
                    value={newEvent.startTime}
                    onChange={(e) => setNewEvent({...newEvent, startTime: e.target.value})}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">End Time</label>
                  <input
                    type="time"
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
                    value={newEvent.endTime}
                    onChange={(e) => setNewEvent({...newEvent, endTime: e.target.value})}
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Client</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
                  value={newEvent.client}
                  onChange={(e) => setNewEvent({...newEvent, client: e.target.value})}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Case Reference</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
                  value={newEvent.case}
                  onChange={(e) => setNewEvent({...newEvent, case: e.target.value})}
                />
              </div>
            </div>
            
            <div className="flex justify-end gap-3 mt-6">
              <button 
                onClick={() => setShowEventForm(false)}
                className="px-4 py-2 border rounded-lg text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button 
                onClick={handleAddEvent}
                className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
              >
                {currentEventId ? "Update Event" : "Add Event"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Calendar */}
      <div className="bg-white p-4 rounded-xl shadow border border-gray-200">
        <FullCalendar
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          initialView={isMobile ? "timeGridDay" : "dayGridMonth"}
          headerToolbar={{
            left: "prev,next today",
            center: "title",
            right: isMobile ? "" : "dayGridMonth,timeGridWeek,timeGridDay",
          }}
          events={filteredEvents.map(e => ({
            id: e.id,
            title: e.title,
            start: e.start,
            end: e.end,
            backgroundColor: getEventColorCalendar(e.type),
            borderColor: getEventColorCalendar(e.type)
          }))}
          editable={true}
          droppable={true}
          selectable={true}
          dateClick={handleDateClick}
          eventClick={(info) => {
            const event = events.find(e => e.id === info.event.id);
            setNewEvent({
              title: event.title,
              date: event.start?.split('T')[0] || '',
              startTime: event.start?.split('T')[1]?.substring(0, 5) || '',
              endTime: event.end?.split('T')[1]?.substring(0, 5) || '',
              type: event.type,
              client: event.client,
              case: event.case
            });
            setCurrentEventId(event.id);
            setShowEventForm(true);
          }}
          eventDrop={handleEventDrop}
          eventResize={handleEventResize}
          height={isMobile ? "auto" : 650}
          aspectRatio={isMobile ? 1 : 1.8}
        />
      </div>

      {/* Events Table */}
      <div className="bg-white p-4 md:p-6 rounded-xl shadow border border-gray-200">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <h3 className="text-xl font-semibold text-gray-800">Upcoming Events</h3>
          <div className="text-sm text-gray-500">
            Showing {filteredEvents.length} of {events.length} events
          </div>
        </div>
        
        <div className="overflow-x-auto rounded-lg border border-gray-200">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Event</th>
                {!isMobile && (
                  <>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Client</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Case</th>
                  </>
                )}
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">When</th>
                <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredEvents.map((event) => (
                <tr key={event.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className={`flex-shrink-0 p-2 rounded-full ${getEventColor(event.type)}`}>
                        {getEventIcon(event.type)}
                      </div>
                      <div className="ml-2">
                        <div className="text-sm font-medium text-gray-900">{event.title}</div>
                        <div className="text-xs text-gray-500 capitalize">{event.type}</div>
                      </div>
                    </div>
                  </td>
                  {!isMobile && (
                    <>
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                        {event.client}
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                        {event.case}
                      </td>
                    </>
                  )}
                  <td className="px-4 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {new Date(event.start).toLocaleDateString('en-US', { 
                        month: 'short', 
                        day: 'numeric', 
                        year: isMobile ? undefined : 'numeric' 
                      })}
                    </div>
                    <div className="text-xs text-gray-500 flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {event.start?.split('T')[1]?.substring(0, 5)} - {event.end?.split('T')[1]?.substring(0, 5)}
                    </div>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex justify-end gap-1">
                      <button 
                        className="p-1.5 text-gray-500 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
                        title="Edit event"
                        onClick={() => {
                          setNewEvent({
                            title: event.title,
                            date: event.start?.split('T')[0] || '',
                            startTime: event.start?.split('T')[1]?.substring(0, 5) || '',
                            endTime: event.end?.split('T')[1]?.substring(0, 5) || '',
                            type: event.type,
                            client: event.client,
                            case: event.case
                          });
                          setCurrentEventId(event.id);
                          setShowEventForm(true);
                        }}
                      >
                        <Edit2 size={16} />
                      </button>
                      <button 
                        className="p-1.5 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        title="Delete event"
                        onClick={() => deleteEvent(event.id)}
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default SchedulingView;
import { useState } from "react";
import { Pencil, Eye, ChevronLeft, ChevronRight, Search } from "lucide-react";

const sampleCases = [
  {
    id: "CASE-00123",
    title: "Property Dispute",
    client: "John Doe",
    date: "Apr 1, 2025",
    status: "Open",
  },
  {
    id: "CASE-00122",
    title: "Contract Review",
    client: "Alice Smith",
    date: "Mar 25, 2025",
    status: "In Progress",
  },
  {
    id: "CASE-00121",
    title: "Divorce Filing",
    client: "Michael Johnson",
    date: "Feb 14, 2025",
    status: "Closed",
  },
  {
    id: "CASE-00120",
    title: "Employment Dispute",
    client: "Sarah Williams",
    date: "Feb 5, 2025",
    status: "Open",
  },
];

const statusColors = {
  Open: "bg-green-100 text-green-800",
  "In Progress": "bg-amber-100 text-amber-800",
  Closed: "bg-gray-100 text-gray-800",
};

const CasesView = () => {
  const [statusFilter, setStatusFilter] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredCases = sampleCases.filter((c) => {
    const matchesStatus = statusFilter === "All" || c.status === statusFilter;
    const matchesSearch = c.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         c.client.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         c.id.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="p-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <h2 className="text-2xl font-semibold text-gray-800">My Cases</h2>
          
          <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search cases..."
                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600 text-sm"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            <select
              className="border text-sm rounded-lg px-4 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-600"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="All">All Status</option>
              <option value="Open">Open</option>
              <option value="In Progress">In Progress</option>
              <option value="Closed">Closed</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto rounded-lg border border-gray-200">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 text-gray-600">
              <tr>
                <th className="px-6 py-3 text-left font-medium">Case ID</th>
                <th className="px-6 py-3 text-left font-medium">Title</th>
                <th className="px-6 py-3 text-left font-medium">Client</th>
                <th className="px-6 py-3 text-left font-medium">Date</th>
                <th className="px-6 py-3 text-left font-medium">Status</th>
                <th className="px-6 py-3 text-right font-medium">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredCases.map((c) => (
                <tr key={c.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 font-medium text-gray-900">{c.id}</td>
                  <td className="px-6 py-4 text-gray-800">{c.title}</td>
                  <td className="px-6 py-4 text-gray-800">{c.client}</td>
                  <td className="px-6 py-4 text-gray-500">{c.date}</td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${statusColors[c.status]}`}
                    >
                      {c.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-2">
                      <button 
                        className="p-1.5 text-gray-500 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
                        title="View case"
                      >
                        <Eye size={16} />
                      </button>
                      <button 
                        className="p-1.5 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                        title="Edit case"
                      >
                        <Pencil size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          
          {filteredCases.length === 0 && (
            <div className="p-8 text-center text-gray-500">
              No cases found matching your criteria
            </div>
          )}
        </div>

        {/* Pagination */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-6">
          <div className="text-sm text-gray-500">
            Showing <span className="font-medium">1</span> to <span className="font-medium">{filteredCases.length}</span> of{' '}
            <span className="font-medium">{sampleCases.length}</span> cases
          </div>
          
          <div className="flex gap-1">
            <button className="p-2 rounded-lg border border-gray-200 text-gray-500 hover:bg-gray-50 disabled:opacity-50">
              <ChevronLeft size={16} />
            </button>
            <button className="px-3.5 py-2 rounded-lg border border-indigo-500 bg-indigo-50 text-indigo-600 font-medium">
              1
            </button>
            <button className="px-3.5 py-2 rounded-lg border border-gray-200 text-gray-700 hover:bg-gray-50">
              2
            </button>
            <button className="p-2 rounded-lg border border-gray-200 text-gray-500 hover:bg-gray-50">
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CasesView;
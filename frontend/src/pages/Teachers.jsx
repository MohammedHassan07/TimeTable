import { useState } from "react";
import { Plus, View } from "lucide-react";
const Teachers = () => {
  const [view, setView] = useState("list");
  const [teachers, setTeachers] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    branch: "",
  });
  const handleSubmit = (e) => {
    e.preventDefault();
    const newTeacher = {
      id: teachers.length + 1,
      ...formData
    };
    setTeachers([...teachers, newTeacher]);
    setFormData({ name: "", email: "", branch: "" });
    setView("list");
  };
  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-semibold text-gray-900">Teachers</h1>
        <div className="flex gap-4">
          <button
            onClick={() => setView("list")}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200 ${
              view === "list"
                ? "bg-gray-900 text-white"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            <View className="w-4 h-4" />
            View
          </button>
          <button
            onClick={() => setView("create")}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200 ${
              view === "create"
                ? "bg-gray-900 text-white"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            <Plus className="w-4 h-4" />
            Create
          </button>
        </div>
      </div>
      {view === "create" ? (
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-sm">
          <h2 className="text-xl font-semibold mb-6">Create Teacher Profile</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Name
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-200"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-200"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Branch
              </label>
              <input
                type="text"
                value={formData.branch}
                onChange={(e) => setFormData({ ...formData, branch: e.target.value })}
                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-200"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-gray-900 text-white py-2 rounded-lg hover:bg-gray-800 transition-colors duration-200"
            >
              Submit
            </button>
          </div>
        </form>
      ) : (
        <div className="bg-white rounded-lg shadow-sm">
          {teachers.length === 0 ? (
            <div className="p-8 text-center text-gray-500">
              No teachers added yet. Click Create to add one.
            </div>
          ) : (
            <div className="divide-y divide-gray-200">
              {teachers.map((teacher) => (
                <div key={teacher.id} className="p-4 flex items-center justify-between">
                  <div>
                    <h3 className="font-medium text-gray-900">{teacher.name}</h3>
                    <p className="text-sm text-gray-500">{teacher.email}</p>
                    <p className="text-sm text-gray-500">{teacher.branch}</p>
                  </div>
                  <div className="flex gap-2">
                    <button className="px-3 py-1 text-sm text-gray-600 bg-gray-100 rounded hover:bg-gray-200">
                      Edit
                    </button>
                    <button className="px-3 py-1 text-sm text-white bg-red-500 rounded hover:bg-red-600">
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
export default Teachers;
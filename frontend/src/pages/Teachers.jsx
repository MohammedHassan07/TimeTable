import { useState } from "react";
import { Plus, View } from "lucide-react";
import postRequest from "../services/postRequest";

const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const slots = [1, 2, 3, 4, 5, 6];

// TODO: implemenet update profile
const Teachers = () => {
  const [view, setView] = useState("list");
  const [teachers, setTeachers] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    department: "",
    programType: "Degree",
    freeSlots: {},
  });

  const handleCheckboxChange = (day) => {
    setFormData((prev) => {
      const newFreeSlots = { ...prev.freeSlots };
      if (newFreeSlots[day]) {
        delete newFreeSlots[day]; // Remove day if unchecked
      } else {
        newFreeSlots[day] = { slot: null }; // Initialize slot
      }
      return { ...prev, freeSlots: newFreeSlots };
    });
  };

  const handleRadioChange = (day, slot) => {
    setFormData((prev) => ({
      ...prev,
      freeSlots: {
        ...prev.freeSlots,
        [day]: { slot },
      },
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Convert freeSlots object into an array of { day, slotNumber }
    const freeSlotsArray = Object.entries(formData.freeSlots)
      .filter(([_, { slot }]) => slot !== null)
      .map(([day, { slot }]) => ({ day, slotNumber: slot }));

    const newTeacher = {
      name: formData.name,
      email: formData.email,
      department: formData.department,
      programType: formData.programType,
      freeSlots: freeSlotsArray,
    };

    setTeachers([...teachers, newTeacher]);
    setFormData({ name: "", email: "", department: "", programType: "Degree", freeSlots: {} });

    console.log("Sending Data:", newTeacher);
    const response = await postRequest("/api/teacher/add-teacher", newTeacher);
    console.log(response);
  };

  return (
    <div className="p-2 flex flex-col justify-center items-center w-full">
      <div className="flex justify-between items-center mb-8 border-b-2 border-gray-800 w-full">
        <h1 className="text-2xl font-semibold text-gray-900">Teachers</h1>
        <div className="flex gap-4 p-2">
          <button onClick={() => setView("list")} className={`hover:cursor-pointer flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200 ${view === "list" ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`}>
            <View className="w-4 h-4" /> View
          </button>
          <button onClick={() => setView("create")} className={`hover:cursor-pointer flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200 ${view === "create" ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`}>
            <Plus className="w-4 h-4" /> Create
          </button>
        </div>
      </div>

      {view === "create" ? (
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-sm w-full">
          <h2 className="text-xl font-semibold mb-6">Create Teacher Profile</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
              <input type="text" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="w-full p-2 border border-gray-300 rounded-lg" required />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input type="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} className="w-full p-2 border border-gray-300 rounded-lg" required />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Department</label>
              <select value={formData.department} onChange={(e) => setFormData({ ...formData, department: e.target.value })} className="w-full p-2 border border-gray-300 rounded-lg" required>
                <option value="">Select a department</option>
                <option value="Civil">Civil</option>
                <option value="Computer">Computer</option>
                <option value="Electrical">Electrical</option>
                <option value="ENTC">ENTC</option>
                <option value="Mechanical">Mechanical</option>
              </select>
            </div>
            
            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-2">Select Freee Schedule</h3>
              <div className="flex flex-wrap gap-7">
                {days.map((day) => (
                  <div key={day} className="mb-2">
                    <label className="flex items-center gap-2">
                      <input type="checkbox" checked={!!formData.freeSlots[day]} onChange={() => handleCheckboxChange(day)} />
                      {day}
                    </label>
                    {formData.freeSlots[day] && (
                      <div className="flex gap-2 mt-1">
                        {slots.map((slot) => (
                          <label key={slot} className="flex items-center gap-1">
                            <input type="radio" name={`slot-${day}`} checked={formData.freeSlots[day]?.slot === slot} onChange={() => handleRadioChange(day, slot)} />
                            {slot}
                          </label>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <button type="submit" className="w-full bg-gray-900 text-white py-2 rounded-lg hover:bg-gray-800 hover:cursor-pointer">Submit</button>
          </div>
        </form>
      ) : (
        <div className="bg-white rounded-lg shadow-sm w-full">
          {teachers.length === 0 ? (
            <div className="p-8 text-center text-gray-500">No teachers added yet. Click Create to add one.</div>
          ) : (
            <div className="divide-y divide-gray-200">
              {teachers.map((teacher, index) => (
                <div key={index} className="p-4 flex items-center justify-between">
                  <div>
                    <h3 className="font-medium text-gray-900">{teacher.name}</h3>
                    <p className="text-sm text-gray-500">{teacher.email}</p>
                    <p className="text-sm text-gray-500">{teacher.department}</p>
                    <p className="text-sm text-gray-500">Schedule: {teacher.freeSlots.map(({ day, slotNumber }) => `${day} (Slot ${slotNumber})`).join(", ")}</p>
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

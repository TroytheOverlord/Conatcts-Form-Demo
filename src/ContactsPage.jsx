import React, { useState, useEffect } from "react";

export default function ContactsPage() {
  const [entries, setEntries] = useState([]);

  // Load entries when the page opens
  useEffect(() => {
    const saved = localStorage.getItem("contact-entries");
    if (saved) {
      setEntries(JSON.parse(saved));
    }
  }, []);

  // Delete a single entry by ID
  const deleteEntry = (id) => {
    const filtered = entries.filter((entry) => entry.id !== id);
    setEntries(filtered);
    localStorage.setItem("contact-entries", JSON.stringify(filtered));
  };

  // Delete ALL entries
  const deleteAllEntries = () => {
    if (window.confirm("Are you sure you want to clear ALL contacts?")) {
      localStorage.removeItem("contact-entries");
      setEntries([]);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <h1 className="text-3xl font-bold mb-6">All Contacts</h1>

      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-100 border-b">
                <th className="px-6 py-3 text-left text-xs font-medium">#</th>
                <th className="px-6 py-3 text-left text-xs font-medium">First Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium">Last Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium">Email</th>
                <th className="px-6 py-3 text-left text-xs font-medium">Date Added</th>
                <th className="px-6 py-3 text-left text-xs font-medium">Actions</th>
              </tr>
            </thead>

            <tbody>
              {entries.length === 0 ? (
                <tr>
                  <td colSpan="6" className="py-8 text-center text-gray-500">
                    No contacts found.
                  </td>
                </tr>
              ) : (
                entries.map((entry, index) => (
                  <tr key={entry.id} className="border-b hover:bg-gray-50">
                    <td className="px-6 py-3">{index + 1}</td>
                    <td className="px-6 py-3">{entry.firstName}</td>
                    <td className="px-6 py-3">{entry.lastName}</td>
                    <td className="px-6 py-3">{entry.email}</td>
                    <td className="px-6 py-3">
                      {new Date(entry.timestamp).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-3">
                      <button
                        onClick={() => deleteEntry(entry.id)}
                        className="text-red-600 hover:text-red-800 font-medium"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Delete All Button */}
        {entries.length > 0 && (
          <div className="bg-gray-50 px-6 py-3 flex justify-end">
            <button
              onClick={deleteAllEntries}
              className="text-red-600 hover:text-red-800 font-medium"
            >
              Clear All Entries
            </button>
          </div>
        )}
      </div>

      <a
        href="#/"
        className="inline-block mt-6 text-blue-600 underline hover:text-blue-800"
      >
        ← Back to Form
      </a>
    </div>
  );
}

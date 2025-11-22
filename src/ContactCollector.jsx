
import React, { useState, useEffect } from 'react';

export default function ContactCollector() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');

  // Load entries
  useEffect(() => {
    const saved = localStorage.getItem('contact-entries');
    if (saved) {
      setEntries(JSON.parse(saved));
    }
    setLoading(false);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!firstName || !lastName || !email) {
      setMessage('Please fill in all fields');
      setTimeout(() => setMessage(''), 3000);
      return;
    }

    const newEntry = {
      id: Date.now(),
      firstName,
      lastName,
      email,
      timestamp: new Date().toISOString(),
    };

    const updatedEntries = [...entries, newEntry];

    localStorage.setItem('contact-entries', JSON.stringify(updatedEntries));
    setEntries(updatedEntries);

    setFirstName('');
    setLastName('');
    setEmail('');
    setMessage('Entry added successfully!');
    setTimeout(() => setMessage(''), 3000);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-gray-600">Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">

      {/* Title ONLY */}
      <h1 className="text-3xl font-bold text-gray-800 mb-8">
        Enter Contact Information
      </h1>

      {/* Form Section */}
      <div className="fixed bottom-8 left-8">
        <div className="bg-white rounded-lg shadow-xl p-6 w-80">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">New Contact</h2>

          <div className="space-y-4">
            <input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="w-full px-3 py-2 border rounded-md"
              placeholder="First Name"
            />

            <input
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="w-full px-3 py-2 border rounded-md"
              placeholder="Last Name"
            />

            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border rounded-md"
              placeholder="Email"
            />

            <button
              onClick={handleSubmit}
              className="w-full bg-blue-600 text-white py-2 rounded-md"
            >
              Add Entry
            </button>

            {message && (
              <p className="text-sm text-center text-green-600">{message}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

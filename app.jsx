import React, { useState } from "react";

export default function App() {
  const [darkMode, setDarkMode] = useState(false);

  const [participants, setParticipants] = useState([
    {
      id: "SRM1001",
      name: "John Doe",
      email: "john@gmail.com",
      phone: "9876543210",
      department: "CSE",
      workshop: "React Development",
    },
    {
      id: "SRM1002",
      name: "Jane Smith",
      email: "jane@gmail.com",
      phone: "9876543211",
      department: "ECE",
      workshop: "Artificial Intelligence",
    },
  ]);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    department: "",
    workshop: "",
  });

  const [message, setMessage] = useState("");
  const [search, setSearch] = useState("");

  const workshops = [
    "React Development",
    "Artificial Intelligence",
    "Cloud Computing",
    "Cyber Security",
    "Data Science",
    "Machine Learning",
  ];

  const MAX_SEATS = 100;
  const availableSeats = MAX_SEATS - participants.length;

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const getRecommendation = (dept) => {
    switch (dept.toUpperCase()) {
      case "CSE":
        return "Artificial Intelligence";
      case "ECE":
        return "Cyber Security";
      case "IT":
        return "Cloud Computing";
      case "AIML":
        return "Machine Learning";
      default:
        return "React Development";
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.phone.length !== 10) {
      setMessage("❌ Enter a valid 10-digit phone number");
      return;
    }

    const duplicate = participants.find(
      (p) => p.email.toLowerCase() === formData.email.toLowerCase()
    );

    if (duplicate) {
      setMessage("❌ Participant already registered!");
      return;
    }

    const newParticipant = {
      ...formData,
      id: "SRM" + Math.floor(1000 + Math.random() * 9000),
    };

    setParticipants([...participants, newParticipant]);

    setMessage(
      `✅ Registration Confirmed for ${formData.name}. Welcome to SRM Workshop!`
    );

    setFormData({
      name: "",
      email: "",
      phone: "",
      department: "",
      workshop: "",
    });
  };

  const deleteParticipant = (id) => {
    setParticipants(participants.filter((p) => p.id !== id));
  };

  const exportCSV = () => {
    const csv =
      "ID,Name,Email,Phone,Department,Workshop\n" +
      participants
        .map(
          (p) =>
            `${p.id},${p.name},${p.email},${p.phone},${p.department},${p.workshop}`
        )
        .join("\n");

    const blob = new Blob([csv], { type: "text/csv" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "SRM_Workshop_Data.csv";
    link.click();
  };

  const filteredParticipants = participants.filter(
    (p) =>
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.department.toLowerCase().includes(search.toLowerCase())
  );

  const aiCount = participants.filter(
    (p) => p.workshop === "Artificial Intelligence"
  ).length;

  const reactCount = participants.filter(
    (p) => p.workshop === "React Development"
  ).length;

  const cyberCount = participants.filter(
    (p) => p.workshop === "Cyber Security"
  ).length;

  const successRate = (
    (participants.length / MAX_SEATS) *
    100
  ).toFixed(0);

  return (
    <div
      style={{
        background: darkMode ? "#121212" : "#f3f0fa",
        color: darkMode ? "#fff" : "#000",
        minHeight: "100vh",
        padding: "20px",
        fontFamily: "Arial",
      }}
    >
      <div
        style={{
          background: darkMode ? "#1f1f1f" : "#fff",
          padding: "20px",
          borderRadius: "12px",
          display: "flex",
          alignItems: "center",
          gap: "20px",
        }}
      >
        <img
          src="https://upload.wikimedia.org/wikipedia/en/thumb/f/f4/SRM_Institute_of_Science_and_Technology_Logo.svg/512px-SRM_Institute_of_Science_and_Technology_Logo.svg.png"
          alt="SRM"
          width="120"
        />

        <div>
          <h1>SRM Institute of Science and Technology</h1>
          <h3>Workshop Registration & Confirmation System</h3>
          <p>📍 Chennai, Tamil Nadu</p>
        </div>
      </div>

      <br />

      <button
        onClick={() => setDarkMode(!darkMode)}
        style={{
          padding: "10px 20px",
          border: "none",
          borderRadius: "8px",
          background: "#6a0dad",
          color: "white",
          cursor: "pointer",
        }}
      >
        {darkMode ? "☀ Light Mode" : "🌙 Dark Mode"}
      </button>

      <br />
      <br />

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit,minmax(180px,1fr))",
          gap: "15px",
        }}
      >
        <div style={card}>
          <h3>Total Registrations</h3>
          <h1>{participants.length}</h1>
        </div>

        <div style={card}>
          <h3>Available Seats</h3>
          <h1>{availableSeats}</h1>
        </div>

        <div style={card}>
          <h3>AI Workshop</h3>
          <h1>{aiCount}</h1>
        </div>

        <div style={card}>
          <h3>React Workshop</h3>
          <h1>{reactCount}</h1>
        </div>

        <div style={card}>
          <h3>Cyber Security</h3>
          <h1>{cyberCount}</h1>
        </div>

        <div style={card}>
          <h3>Success Rate</h3>
          <h1>{successRate}%</h1>
        </div>
      </div>

      <br />

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "20px",
        }}
      >
        <div style={panel}>
          <h2>Workshop Registration</h2>

          <form onSubmit={handleSubmit}>
            <input
              style={input}
              name="name"
              placeholder="Student Name"
              value={formData.name}
              onChange={handleChange}
              required
            />

            <input
              style={input}
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
            />

            <input
              style={input}
              name="phone"
              placeholder="Phone Number"
              value={formData.phone}
              onChange={handleChange}
              required
            />

            <input
              style={input}
              name="department"
              placeholder="Department"
              value={formData.department}
              onChange={handleChange}
              required
            />

            {formData.department && (
              <p>
                Recommended:
                <b> {getRecommendation(formData.department)}</b>
              </p>
            )}

            <select
              style={input}
              name="workshop"
              value={formData.workshop}
              onChange={handleChange}
              required
            >
              <option value="">Select Workshop</option>

              {workshops.map((w) => (
                <option key={w}>{w}</option>
              ))}
            </select>

            <button style={btn}>Register Now</button>
          </form>

          {message && (
            <div
              style={{
                marginTop: "10px",
                padding: "10px",
                background: "#d4edda",
                borderRadius: "8px",
              }}
            >
              {message}
            </div>
          )}
        </div>

        <div style={panel}>
          <h2>Workshop Analytics</h2>

          <p>🎓 Certificates Available</p>
          <p>🏢 Venue: SRM Auditorium</p>
          <p>📅 Date: 25 June 2026</p>
          <p>⏰ Time: 9 AM - 4 PM</p>

          <progress
            value={participants.length}
            max={MAX_SEATS}
            style={{ width: "100%" }}
          />

          <p>
            {participants.length}/{MAX_SEATS} Seats Filled
          </p>

          <button
            onClick={exportCSV}
            style={{
              ...btn,
              background: "green",
            }}
          >
            Export CSV
          </button>
        </div>
      </div>

      <br />

      <div style={panel}>
        <h2>Search Participants</h2>

        <input
          style={input}
          placeholder="Search Name or Department"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <br />

      <div style={panel}>
        <h2>Registered Participants</h2>

        <table
          border="1"
          cellPadding="10"
          width="100%"
          style={{ borderCollapse: "collapse" }}
        >
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Department</th>
              <th>Workshop</th>
              <th>Certificate</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {filteredParticipants.map((p) => (
              <tr key={p.id}>
                <td>{p.id}</td>
                <td>{p.name}</td>
                <td>{p.department}</td>
                <td>{p.workshop}</td>
                <td>Eligible</td>

                <td>
                  <button
                    onClick={() => deleteParticipant(p.id)}
                    style={{
                      background: "red",
                      color: "white",
                      border: "none",
                      padding: "8px",
                    }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <br />

      <div style={panel}>
        <h2>Recent Registrations</h2>

        {participants
          .slice(-5)
          .reverse()
          .map((p) => (
            <p key={p.id}>
              ✅ {p.name} - {p.workshop}
            </p>
          ))}
      </div>

      <br />

      <div
        style={{
          background: "#6a0dad",
          color: "white",
          textAlign: "center",
          padding: "15px",
          borderRadius: "10px",
        }}
      >
        © 2026 SRM Workshop Management System | Chennai Campus
      </div>
    </div>
  );
}

const card = {
  background: "#ffffff",
  padding: "15px",
  borderRadius: "10px",
  textAlign: "center",
};

const panel = {
  background: "#ffffff",
  padding: "20px",
  borderRadius: "10px",
};

const input = {
  width: "100%",
  padding: "10px",
  marginBottom: "10px",
};

const btn = {
  width: "100%",
  padding: "10px",
  background: "#6a0dad",
  color: "white",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer",
};
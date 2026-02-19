import { useEffect, useState, useMemo } from "react";
import axios from "axios";

const Users = () => {
  const [students, setStudents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedStudent, setSelectedStudent] = useState<any>(null);

  // ✅ New states
  const [searchTerm, setSearchTerm] = useState("");
  const [paymentFilter, setPaymentFilter] = useState("ALL");

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/scholarship"
      );
      setStudents(res.data.students);
    } catch (err) {
      console.error(err);
      setError("Failed to fetch students");
    } finally {
      setLoading(false);
    }
  };

  const filteredStudents = useMemo(() => {
  return students.filter((student) => {
    const search = searchTerm.toLowerCase();

    const matchesSearch =
      student.student_name?.toLowerCase().includes(search) ||
      student.email?.toLowerCase().includes(search) ||
      student.phone_number?.toString().includes(search);

    const matchesPayment =
      paymentFilter === "ALL" ||
      student.payment_status === paymentFilter;

    return matchesSearch && matchesPayment;
  });
}, [students, searchTerm, paymentFilter]);



  if (loading) return <p className="text-center mt-10">Loading students...</p>;
  if (error) return <p className="text-red-500 text-center mt-10">{error}</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Scholarship Students</h1>

      {/* ✅ Search + Filter Section */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        {/* Search */}
        <input
          type="text"
          placeholder="Search by name, email or phone..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border rounded px-4 py-2 w-full md:w-1/3 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        {/* Filter */}
        <select
          value={paymentFilter}
          onChange={(e) => setPaymentFilter(e.target.value)}
          className="border rounded px-4 py-2 w-full md:w-1/4 focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          <option value="ALL">All Payments</option>
          <option value="SUCCESS">SUCCESS</option>
          <option value="PENDING">PENDING</option>
        </select>
      </div>

      <div className="overflow-x-auto bg-white shadow rounded-lg">
        <table className="min-w-full text-sm text-left">
          <thead className="bg-gray-100 text-gray-700 uppercase text-xs">
            <tr>
              <th className="px-6 py-3">ID</th>
              <th className="px-6 py-3">Name</th>
              <th className="px-6 py-3">Email</th>
              <th className="px-6 py-3">Phone</th>
              <th className="px-6 py-3">Course</th>
              <th className="px-6 py-3">Payment</th>
              <th className="px-6 py-3">Action</th>
            </tr>
          </thead>

          <tbody>
            {filteredStudents.length === 0 ? (
              <tr>
                <td
                  colSpan={7}
                  className="text-center py-6 text-gray-500"
                >
                  No students found
                </td>
              </tr>
            ) : (
              filteredStudents.map((student) => (
                <tr
                  key={student.id}
                  className="border-b hover:bg-gray-50"
                >
                  <td className="px-6 py-4">{student.id}</td>
                  <td className="px-6 py-4">{student.student_name}</td>
                  <td className="px-6 py-4">{student.email}</td>
                  <td className="px-6 py-4">{student.phone_number}</td>
                  <td className="px-6 py-4">{student.course}</td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-2 py-1 rounded text-xs font-semibold ${student.payment_status === "SUCCESS"
                          ? "bg-green-100 text-green-700"
                          : "bg-yellow-100 text-yellow-700"
                        }`}
                    >
                      {student.payment_status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => setSelectedStudent(student)}
                      className="bg-blue-500 text-white px-3 py-1 rounded text-xs hover:bg-blue-600"
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* ✅ Modal */}
      {selectedStudent && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center">
          <div className="bg-white w-full max-w-lg rounded-lg shadow-lg p-6 relative">
            <h2 className="text-xl font-bold mb-4">
              Student Details
            </h2>

            <div className="space-y-2 text-sm">
              <p><strong>Name:</strong> {selectedStudent.student_name}</p>
              <p><strong>Email:</strong> {selectedStudent.email}</p>
              <p><strong>Phone:</strong> {selectedStudent.phone_number}</p>
              <p><strong>Class:</strong> {selectedStudent.class}</p>
              <p><strong>Course:</strong> {selectedStudent.course}</p>
              <p><strong>Parent:</strong> {selectedStudent.parent_name}</p>
              <p><strong>Address:</strong> {selectedStudent.address}</p>
              <p><strong>City:</strong> {selectedStudent.city}</p>
              <p><strong>State:</strong> {selectedStudent.state}</p>
              <p><strong>Pincode:</strong> {selectedStudent.pincode}</p>
              <p><strong>Payment Status:</strong> {selectedStudent.payment_status}</p>
              <p><strong>Payment Date:</strong> {selectedStudent.payment_date}</p>
            </div>

            <button
              onClick={() => setSelectedStudent(null)}
              className="absolute top-3 right-3 text-gray-500 hover:text-black"
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Users;

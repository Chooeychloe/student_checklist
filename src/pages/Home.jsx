import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AppContext } from "../Context/AppContext";

export default function Home() {
  const [subjects, setSubjects] = useState([]);
  const [isDeleting, setIsDeleting] = useState(false); // State to track deletion
  const navigate = useNavigate();
  const { token } = useContext(AppContext);

  async function getSubjects() {
    const res = await fetch("/api/subjects", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await res.json();
    console.log(token);

    if (res.ok) {
      setSubjects(data);
    }
  }

  async function handleDelete(subjectId) {
    setIsDeleting(true); // Show loading spinner immediately

    const res = await fetch(`/api/subjects/${subjectId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (res.ok) {
      setSubjects(subjects.filter((subject) => subject.id !== subjectId)); // Remove the deleted subject from the list
      console.log(`Subject with id ${subjectId} deleted successfully.`);
      navigate("/home"); // Optional: Redirect after deletion
    } else {
      console.error("Failed to delete the subject");
    }

    // Keep the spinner showing for 2 seconds after deletion
    setTimeout(() => {
      setIsDeleting(false); // Hide spinner after 2 seconds
    }, 2000); // 2000 ms = 2 seconds
  }

  useEffect(() => {
    getSubjects();
  }, []);

  return (
    <>
      <h1 className="title">Subjects</h1>

      {isDeleting && (
        <div className="loading-spinner">
          {/* Spinner or loading message */}
          <p>Deleting subject...</p>
        </div>
      )}

      {/* If not deleting, show the table or message */}
      {!isDeleting && (
        <>
          {subjects.length > 0 ? (
            <table className="min-w-full bg-white">
              <thead>
                <tr>
                  <th className="py-2">Subject Name</th>
                  <th className="py-2">Code</th>
                  <th className="py-2">Credit Lecture</th>
                  <th className="py-2">Credit Lab</th>
                  <th className="py-2">Prerequisite</th>
                  <th className="py-2">Semester Taken</th>
                  <th className="py-2">Academic Year Taken</th>
                  <th className="py-2">Final Grade</th>
                  <th className="py-2">Instructor</th>
                </tr>
              </thead>
              <tbody>
                {subjects.map((subject) => (
                  <tr key={subject.id} className="border-b">
                    <td className="py-2 px-4">
                      {subject.subject_name || "No data available"}
                    </td>
                    <td className="py-2 px-4">
                      {subject.subject_code || "No data available"}
                    </td>
                    <td className="py-2 px-4">
                      {subject.credit_lecture || "No data available"}
                    </td>
                    <td className="py-2 px-4">
                      {subject.credit_lab || "No data available"}
                    </td>
                    <td className="py-2 px-4">
                      {subject.prerequisite || "No data available"}
                    </td>
                    <td className="py-2 px-4">
                      {subject.semester || "No data available"}
                    </td>
                    <td className="py-2 px-4">
                      {subject.academic_year || "No data available"}
                    </td>
                    <td className="py-2 px-4">
                      {subject.final_grade || "No data available"}
                    </td>
                    <td className="py-2 px-4">
                      {subject.instructor || "No data available"}
                    </td>
                    <td className="py-2 px-4">
                      <Link
                        to={`/subjects/update/${subject.id}`}
                        className="bg-green-500 text-white text-sm rounded-lg px-3 py-1"
                      >
                        Update
                      </Link>
                    </td>
                    <td className="py-2 px-4">
                      <button
                        onClick={() => handleDelete(subject.id)}
                        className="bg-red-500 text-white text-sm rounded-lg px-3 py-1"
                        disabled={isDeleting} // Disable button while deleting
                      >
                        {isDeleting ? "Deleting..." : "Delete"}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>There are no subjects here.</p>
          )}
        </>
      )}
    </>
  );
}

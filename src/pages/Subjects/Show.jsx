import { useContext } from "react";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { AppContext } from "../../Context/AppContext";

export default function Show() {
  const { id } = useParams();
  const {user} = useContext(AppContext);
  const [token] = useState(localStorage.getItem("token"));
  const [subject, setSubject] = useState(null);

  async function getSubject() {
    const res = await fetch(`/api/subjects/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await res.json();
    console.log(data); // Check the structure of the data here

    if (res.ok) {
      setSubject(data.subject); // Now accessing the nested subject object
    }
  }

  useEffect(() => {
    getSubject();
  }, [id]);

  return (
    <>
      <h1 className="title">Subject</h1>

      {subject ? (
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
              {user.id === subject.user_id ? <td className="py-2 px-4">
                 <Link to={`/subjects/update/${subject.id}`} className="bg-green-500 text-white text-sm rounded-lg px-3 py-1">Action</Link>
                </td>:<></> }
             
            </tr>
          </tbody>
        </table>
      ) : (
        <p className="title">Subject not found!</p>
      )}
    </>
  );
}

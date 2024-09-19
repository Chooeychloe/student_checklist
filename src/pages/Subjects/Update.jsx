import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../Context/AppContext";
import { useNavigate, useParams } from "react-router-dom";

export default function Update() {
  const { id } = useParams();
  const { token, user } = useContext(AppContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    subject_name: "",
    subject_code: "",
    credit_lecture: "",
    credit_lab: "",
    prerequisite: "",
    semester: "",
    academic_year: "",
    final_grade: "",
    instructor: "",
  });

  const [errors, setErrors] = useState({});

  async function getSubjects() {
    const res = await fetch(`/api/subjects/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await res.json();
    console.log(data);

    if (res.ok) {
      if (data.subject.user_id !== user.id) {
        navigate("/");
      }
      setFormData({
        subject_name: data.subject.subject_name,
        subject_code: data.subject.subject_code,
        credit_lecture: data.subject.credit_lecture,
        credit_lab: data.subject.credit_lab,
        prerequisite: data.subject.prerequisite,
        semester: data.subject.semester,
        academic_year: data.subject.academic_year,
        final_grade: data.subject.final_grade,
        instructor: data.subject.instructor,
      });
    }
  }

  async function handleUpdate(e) {
    e.preventDefault();
    const res = await fetch(`/api/subjects/${id}`, {
      method: "put",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(formData),
    });
    const data = await res.json();
    if (data.errors) {
      setErrors(data.errors);
    } else {
      navigate("/home");
    }
  }

  useEffect(() => {
    getSubjects();
  }, []);
  return (
    <>
      <h1 className="title">Update subject</h1>

      <form
        onSubmit={handleUpdate}
        action=""
        className="w-1/2 mx-auto space-y-6"
      >
        <div>
          <input
            type="text"
            placeholder="Subject Title"
            value={formData.subject_name}
            onChange={(e) =>
              setFormData({ ...formData, subject_name: e.target.value })
            }
          />
          {errors.subject_name && (
            <p className="error">{errors.subject_name[0]}</p>
          )}
        </div>
        <div>
          <input
            type="text"
            placeholder="Subject Code"
            value={formData.subject_code}
            onChange={(e) =>
              setFormData({ ...formData, subject_code: e.target.value })
            }
          />
          {errors.subject_code && (
            <p className="error">{errors.subject_code[0]}</p>
          )}
        </div>
        <div>
          <input
            type="text"
            placeholder="Lecture Credit"
            value={formData.credit_lecture}
            onChange={(e) =>
              setFormData({ ...formData, credit_lecture: e.target.value })
            }
          />
        </div>
        <div>
          <input
            type="text"
            placeholder="Laboratory Credit"
            value={formData.credit_lab}
            onChange={(e) =>
              setFormData({ ...formData, credit_lab: e.target.value })
            }
          />
        </div>
        <div>
          <input
            type="text"
            placeholder="Prerequisite"
            value={formData.prerequisite}
            onChange={(e) =>
              setFormData({ ...formData, prerequisite: e.target.value })
            }
          />
        </div>
        <div>
          <input
            type="text"
            placeholder="Semester Taken"
            value={formData.semester}
            onChange={(e) =>
              setFormData({ ...formData, semester: e.target.value })
            }
          />
        </div>
        <div>
          <input
            type="text"
            placeholder="Academic Year Taken"
            value={formData.academic_year}
            onChange={(e) =>
              setFormData({ ...formData, academic_year: e.target.value })
            }
          />
        </div>
        <div>
          <input
            type="text"
            placeholder="Final Grade"
            value={formData.final_grade}
            onChange={(e) =>
              setFormData({ ...formData, final_grade: e.target.value })
            }
          />
        </div>
        <div>
          <input
            type="text"
            placeholder="Instructor"
            value={formData.instructor}
            onChange={(e) =>
              setFormData({ ...formData, instructor: e.target.value })
            }
          />
        </div>
        <div>
          <button className="primary-btn">Update</button>
        </div>
      </form>
    </>
  );
}

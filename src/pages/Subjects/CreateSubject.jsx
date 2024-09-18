import { useContext, useState } from "react";
import { AppContext } from "../../Context/AppContext";
import { useNavigate } from "react-router-dom";

export default function CreateSubject() {
  const { token } = useContext(AppContext);
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

  async function handleCreate(e) {
    e.preventDefault();
    const res = await fetch("/api/subjects", {
      method: "post",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(formData),
    });
    const data = await res.json();
    if (data.errors) {
      setErrors(data.errors);
    } else {
      navigate("/");
      console.log(data);
    }
    console.log(data);
  }
  return (
    <>
      <h1 className="title">Create a new subject</h1>

      <form
        onSubmit={handleCreate}
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
          <button className="primary-btn">Create</button>
        </div>
      </form>
    </>
  );
}

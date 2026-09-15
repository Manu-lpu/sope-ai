import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { api } from "../services/api";

const initialForm = {
  university: "",
  program: "",
  degree: "",
  country: "",
  intake: "",
  deadline: "",
};

const CreateApplication = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState(initialForm);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");

    const requiredFields = [
      "university",
      "program",
      "degree",
      "country",
      "intake",
      "deadline",
    ];
    const missingField = requiredFields.find(
      (field) => !String(form[field]).trim(),
    );

    if (missingField) {
      setError(`Please complete the ${missingField} field.`);
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await api.post("/api/applications", form);

      if (!response || !response.application) {
        throw new Error(response?.message || "Application creation failed.");
      }

      navigate(`/applications/${response.application.id}`);
    } catch (submitError) {
      setError(
        submitError.message ||
          "Something went wrong while creating the application.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section>
      <h2>Create new application</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="university"
          placeholder="University"
          value={form.university}
          onChange={handleChange}
        />
        <input
          type="text"
          name="program"
          placeholder="Program"
          value={form.program}
          onChange={handleChange}
        />
        <input
          type="text"
          name="degree"
          placeholder="Degree"
          value={form.degree}
          onChange={handleChange}
        />
        <input
          type="text"
          name="country"
          placeholder="Country"
          value={form.country}
          onChange={handleChange}
        />
        <input
          type="text"
          name="intake"
          placeholder="Intake"
          value={form.intake}
          onChange={handleChange}
        />
        <input
          type="date"
          name="deadline"
          value={form.deadline}
          onChange={handleChange}
        />

        {error && <p style={{ color: "crimson" }}>{error}</p>}

        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Creating..." : "Create application"}
        </button>
      </form>
    </section>
  );
};

export default CreateApplication;

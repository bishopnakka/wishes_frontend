import { useEffect, useState } from "react";

import "../styles/home.css";

import api from "../api/axios";

import Loader from "../components/Loader";
import TemplateCard from "../components/TemplateCard";

export default function Home() {
  const [templates, setTemplates] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTemplates();
  }, []);

  const fetchTemplates = async () => {
    try {
      const response = await api.get("/api/template");

      setTemplates(Array.isArray(response.data) ? response.data : []);
    } catch (error) {
      console.log(error);
    }
    finally {
    setLoading(false);
  }
  };
  if(loading){
    return <Loader />
  }

  return (
    <div className="home-page">
      <div className="home-header">
        <h1>Wishes Templates 🎉</h1>

        <p>
          Create beautiful surprise wishes for birthdays, weddings,
          anniversaries and more.
        </p>
      </div>

      <div className="templates-grid">
        {Array.isArray(templates) &&
          templates.map((template) => (
            <TemplateCard key={template._id} template={template} />
          ))}
      </div>
    </div>
  );
}

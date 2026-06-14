import { useEffect, useState } from "react";

import axios from "axios";

import { useNavigate } from "react-router-dom";

import api from "../api/axios";

import "../styles/dashboard.css";

export default function Dashboard() {
  const navigate = useNavigate();

  const [stats, setStats] = useState(null);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await api.get("/api/dashboard/analytics", {
        headers: {
          authorization: token,
        },
      });

      setStats(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  if (!stats) {
    return <h2>Loading...</h2>;
  }

  //delete
  const deleteWish = async (id) => {
    try {
      const token = localStorage.getItem("token");

      await axios.delete(
        `/api/wishes/${id}`,

        {
          headers: {
            authorization: token,
          },
        },
      );

      fetchStats();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="dashboard">
      <div className="stats-grid">
        <div className="stat-card">
          <h1>{stats.totalWishes}</h1>

          <p>Wishes</p>
        </div>

        <div className="stat-card">
          <h1>{stats.totalViews}</h1>

          <p>Views</p>
        </div>

        <div className="stat-card">
          <h1>{stats.totalComments}</h1>

          <p>Comments</p>
        </div>
      </div>

      <div className="my-wishes">
        <h2>My Created Wishes 🎉</h2>

        {(stats.wishes || []).map((wish) => (
          <div key={wish._id} className="wish-row">
            <div>
              <h3>{wish.templateHeading}</h3>

              <p>
                {wish.message?.slice(0, 80)}
                ...
              </p>
            </div>

            <div className="wish-info">
              <span>
                👀
                {wish.views || 0}
              </span>

              <span>
                💬
                {wish.comments?.length || 0}
              </span>

              <a
                href={`/wish/${wish.uniqueLink}`}
                target="_blank"
                rel="noreferrer"
              >
                Open Wish 🔗
              </a>

              <button onClick={() => deleteWish(wish._id)}>Delete 🗑️</button>

              <button onClick={() => navigate(`/edit/${wish._id}`)}>
                Edit ✏️
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

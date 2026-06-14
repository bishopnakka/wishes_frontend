import { useState } from "react";

import axios from "axios";

import { useNavigate } from "react-router-dom";

import api from '../api/axios';

import "../styles/template.css";

export default function TemplateCard({ template }) {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const buyTemplate = async (templateId, price) => {
    try {
      setLoading(true);

      const token = localStorage.getItem("token");

      if (!token) {
        alert("Please Login First");

        navigate("/login");

        return;
      }

      const response = await api.post(
        "/api/payment/order",

        {
          amount: Number(price),
        },
      );

      const options = {
        key: "rzp_test_Sui2cmFZ7IlTwB",

        amount: response.data.amount,

        currency: response.data.currency,

        name: "Wishes App",

        description: "Premium Template Purchase",

        order_id: response.data.id,

        handler: async () => {
          try {
            await axios.post(
              "/api/purchase",

              {
                templateId,
              },

              {
                headers: {
                  authorization: token,
                },
              },
            );

            alert("Payment Successful 🎉");

            navigate(`/create/${templateId}`);
          } catch (error) {
            console.log(error);

            alert("Payment Success But Purchase Save Failed");
          }
        },

        theme: {
          color: "#ec4899",
        },
      };

      const rzp = new window.Razorpay(options);

      rzp.open();
    } catch (error) {
      console.log(error);

      alert(error.response?.data?.message || "Payment Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="template-card">
      {template.isPremium && <div className="premium-badge">⭐ Premium</div>}

      <img src={template.previewImage} alt="template" />

      <div className="template-content">
        <span className="template-category">{template.category}</span>

        <h2>{template.heading}</h2>

        <h3>{template.title}</h3>

        <p>{template.description}</p>

        <div className="template-footer">
          <span className="template-price">₹{template.price}</span>

          {template.isPremium ? (
            <button
              disabled={loading}
              onClick={() =>
                buyTemplate(
                  template._id,

                  template.price,
                )
              }
            >
              {loading ? "Processing..." : "Buy Premium"}
            </button>
          ) : (
            <button onClick={() => navigate(`/create/${template._id}`)}>
              Use Template
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

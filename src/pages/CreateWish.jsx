import { useEffect, useState } from "react";

import "../styles/createWish.css";
import api from "../api/axios";

import { useParams, useNavigate } from "react-router-dom";

export default function CreateWish() {
  const { id } = useParams();

  const navigate = useNavigate();

  const [generatedLink, setGeneratedLink] = useState("");

  const [template, setTemplate] = useState(null);

  const [unlockWord, setUnlockWord] = useState("");

  const [message, setMessage] = useState("");

  const [images, setImages] = useState([]);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchTemplate();

    checkAccess();
  }, []);

  /* ACCESS CHECK */

  const checkAccess = async () => {
    try {
      const userId = localStorage.getItem("userId");

      const response = await api.get(`/api/template/access/${id}/${userId}`);

      if (!response.data.access) {
        alert("Buy Premium Template First");

        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  /* FETCH TEMPLATE */

  const fetchTemplate = async () => {
    try {
      const response = await api.get(`/api/template/${id}`);

      setTemplate(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  /* CREATE WISH */

  const createWish = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");

      const formData = new FormData();

      formData.append(
        "userId",

        localStorage.getItem("userId"),
      );

      formData.append("message", message);

      formData.append(
        "templateHeading",

        template.heading,
      );

      formData.append("unlockWord", unlockWord);

      for (let i = 0; i < images.length; i++) {
        formData.append("images", images[i]);
      }

      const response = await api.post(
        "/api/wishes/create",

        formData,

        {
          headers: {
            authorization: token,
          },
        },
      );

      setGeneratedLink(response.data.link);
    } catch(error){

  console.log(
    "FULL ERROR:",
    error
  );

  console.log(
    "SERVER RESPONSE:",
    error.response?.data
  );

  alert(
    JSON.stringify(
      error.response?.data
    )
  );

}  finally {

    setLoading(false);

  }
  };

  if (!template) {
    return <h1>Loading...</h1>;
  }

  return (
    <div className="create-page">
      <div className="create-container">
        <h1>{template.heading}</h1>

        <p>{template.description}</p>

        <textarea
          placeholder="Write your wishes"
          onChange={(e) => setMessage(e.target.value)}
        />

        <input
          type="text"
          placeholder="Secret Unlock Word"
          onChange={(e) => setUnlockWord(e.target.value)}
        />

        {unlockWord && (
          <p className="secret-preview">
            🔐 Secret Word:
            <strong>{unlockWord}</strong>
          </p>
        )}

        <p className="secret-tip">
          🔑 The receiver must enter this word to unlock the wish.
        </p>

        <p className="upload-tip">
          📸 Upload up to 3 images. For the best experience, use exactly 3
          photos.
        </p>

        <input
          type="file"
          multiple
          accept="image/*"
          onChange={(e) => setImages(e.target.files)}
        />

        {images.length > 0 && (
          <p className="image-count">
            ✅ Selected:
            {images.length}
            image(s)
          </p>
        )}

        <button
  disabled={loading}
  onClick={createWish}
>
  {loading
    ? "Creating..."
    : "Generate Wish Link"}
</button>

        {generatedLink && (
          <div className="success-box">
            <h3>🎉 Wish Created Successfully</h3>

            <input value={generatedLink} readOnly />

            <div className="success-actions">
              <button
                onClick={() => {
                  navigator.clipboard.writeText(generatedLink);

                  alert("Link Copied");
                }}
              >
                Copy Link 🔗
              </button>

              <button
                onClick={() => {
                  window.open(generatedLink, "_blank");
                }}
              >
                View Wish 👀
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

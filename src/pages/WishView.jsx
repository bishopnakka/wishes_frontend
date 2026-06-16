import { useEffect, useState } from "react";

import api from "../api/axios";

import { useParams } from "react-router-dom";

import {
  Helmet
} from "react-helmet-async";

import "../styles/wish.css";
import "../styles/comments.css";

export default function WishView() {
  const { id } = useParams();

  const [wish, setWish] = useState(null);

  const [enteredWord, setEnteredWord] = useState("");

  const [unlocked, setUnlocked] = useState(false);

  const [comment, setComment] = useState("");

  const [comments, setComments] = useState([]);

  const [email, setEmail] = useState("");

  const [name, setName] = useState("");

  const [emailSuccess, setEmailSuccess] = useState(false);

  const [emailLoading, setEmailLoading] = useState(false);

  useEffect(() => {
    fetchWish();
  }, [id]);

  const fetchWish = async () => {
    try {
      const response = await api.get(`/api/wishes/${id}`);

      setWish(response.data);

      setComments(response.data.comments || []);
    } catch (error) {
      console.log(error);
    }
  };

  const unlockWish = () => {
    if (enteredWord === wish.unlockWord) {
      setUnlocked(true);
    } else {
      alert("Wrong Secret Word");
    }
  };

  const copyLink = () => {
    navigator.clipboard.writeText(window.location.href);

    alert("Link Copied");
  };

  const sendEmail = async () => {
    if (!email.trim()) {
      alert("Enter Email");

      return;
    }

    try {
      setEmailLoading(true);

      const response = await api.post(
        "/api/email/send",

        {
          email,
          heading: wish.templateHeading,
          message: wish.message,
          secretWord: wish.unlockWord,
          link: window.location.href,
        },
      );

      console.log("EMAIL RESPONSE:", response.data);

      setEmail("");

      setEmailSuccess(true);

      setTimeout(() => {
        setEmailSuccess(false);
      }, 3000);
    } catch (error) {
      console.log(error);

      alert(JSON.stringify(error.response?.data));
    } finally {
      setEmailLoading(false);
    }
  };

  const addComment = async () => {
    if (!name.trim()) {
      alert("Enter Name");

      return;
    }

    if (!comment.trim()) {
      alert("Enter Comment");

      return;
    }
    try {
      const response = await api.post(
        `/api/wishes/comment/${id}`,

        {
          name,
          text: comment,
        },
      );

      setComments(response.data.comments);

      setComment("");
    } catch (error) {
      console.log(error);
    }
  };

  if (!wish) {
    return <h1>Loading...</h1>;
  }

  if (wish.unlockWord && !unlocked) {
    return (
      <>
<Helmet>
  <title>
    {wish.templateHeading}
  </title>

  <meta
    name="description"
    content={
      wish.message?.slice(0, 160)
    }
  />
</Helmet>
      <div className="unlock-page">
        <div className="unlock-box">
          <h1>Enter Secret Word 🔓</h1>

          <input
            type="text"
            placeholder="Secret Word"
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                unlockWish();
              }
            }}
            onChange={(e) => setEnteredWord(e.target.value)}
          />

          <button onClick={unlockWish}>Unlock Wish</button>
        </div>
      </div>
      </>
    );
  }

  return (
    <>
      <div className="wish-page">
        <div className="wish-card">
          <div className="background-slider">
            {wish.images?.map((image, index) => (
              <img key={index} src={image} alt="wish" />
            ))}
          </div>

          <div className="wish-overlay"></div>

          <div className="wish-content wish-download">
            <h1>{wish.templateHeading}</h1>

            <p>{wish.message}</p>
          </div>
        </div>
      </div>

      <div className="comments-box">
        <div className="email-box">
          <input
            type="email"
            placeholder="Friend Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <br />
          <button onClick={sendEmail} disabled={emailLoading || !email.trim()}>
            {emailLoading ? "Sending..." : "Send Wish ✉️"}
          </button>
          {emailSuccess && (
            <p className="success-msg">Email Sent Successfully 🎉</p>
          )}
          <br />
          <button onClick={copyLink}>Copy Link 🔗</button>
        </div>

        <h2>Comments 💬</h2>

        {comments.map((c, index) => (
          <div className="comment-card" key={index}>
            <h4>👤 {c.name}</h4>

            <p>{c.text}</p>
          </div>
        ))}

        <input
          type="text"
          placeholder="Your Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="text"
          placeholder="Write Comment"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />

        <button onClick={addComment}>Add Comment</button>
      </div>
    </>
  );
}

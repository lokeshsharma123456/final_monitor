import React, { useState } from "react";
import "./Email.css";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
function Email() {
  const [sent, setSent] = useState(false);
  const navigate = useNavigate();
  const submit = (event) => {
    event.preventDefault();
    console.log(event);
    console.log(event.target.bcc.value);

    const { to, cc = "", bcc = "", from, subject, body } = event.target;
    fetch("http://localhost:5051/send-email", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        to: to.value,
        cc: cc.value,
        bcc: bcc.value,
        subject: subject.value,
        body: body.value,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        console.log("succes");
        setSent(true);
        alert("Your message has been sent!");
      });
  };
  const handleMonitoring = () => {
    navigate("/");
  };
  function showNotification() {
  if ("Notification" in window) {
    Notification.requestPermission().then(function (result) {
      if (result === "granted") {
        new Notification("Email sent!", {
          body: "Your email has been sent successfully.",
        });
      }
    });
  }
}
  return (
    <div className="emailContainer">
      <h1>Compose Email</h1>
      <form method="post" onSubmit={submit}>
        <label for="to">To:</label>
        <input type="email" id="to" name="to" required />

        <label for="cc">Cc:</label>
        <input type="email" id="cc" name="cc" multiple />

        <label for="bcc">Bcc:</label>
        <input type="email" id="bcc" name="bcc" multiple />

        <label for="subject">Subject:</label>
        <input type="text" id="subject" name="subject" required />

        <label for="body">Message:</label>
        <textarea id="body" name="body" required></textarea>

        <button
          style={{
            background: "#008CBA",
            borderRadius: "5px",
            border: "none",
            color: "white",
            padding: "10px 20px",
            textAlign: "center",
            textDecoration: "none",
            display: "inline-block",
            fontSize: "16px",
            margin: "10px 2px",
            cursor: "pointer",
          }}
          type="submit"
          onClick={showNotification}
        >
          Send Email
        </button>
        {sent && <p>Message sent!</p>}
      </form>
      <Button
        style={{
          background: "#008CBA",
          borderRadius: "5px",
          border: "none",
          color: "white",
          padding: "10px 20px",
          textAlign: "center",
          textDecoration: "none",
          display: "inline-block",
          fontSize: "16px",
          margin: "10px 2px",
          cursor: "pointer",
        }}
        onClick={handleMonitoring}
      >
        Back to Monitoring Servces
      </Button>
    </div>
  );
}

export default Email;

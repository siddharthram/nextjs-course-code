import React from "react";
import classes from "./contact-form.module.css";
import { useEffect, useState, useContext } from "react";
import { responseSymbol } from "next/dist/server/web/spec-compliant/fetch-event";
import NotificationContext from "../../store/notification-context";
import Notification from "../../pages/ui/notification";

async function sendContactData(contactDetails) {
  console.log("Contact is", contactDetails);
  const response = await fetch("/api/contact", {
    method: "POST",
    body: JSON.stringify(contactDetails),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await response.json();
  console.log("response is", data);

  if (!response.ok) {
    throw new Error(data.message || "Something went wrong");
  }
}

function ContactForm() {
  const [enteredEmail, setEnteredEmail] = useState("");
  const [enteredName, setEnteredName] = useState("");
  const [enteredMessage, setEnteredMessage] = useState("");

  // get and act on response
  const [requestStatus, setRequestStatus] = useState();
  const [requestError, setRequestError] = useState();

  console.log("Entered", enteredEmail, enteredMessage, enteredMessage);

  async function sendMessageHandler(event) {
    event.preventDefault();
    setRequestStatus("pending");
    try {
      await sendContactData({
        name: enteredName,
        email: enteredEmail,
        message: enteredMessage,
      });

      setRequestStatus("success");
      setEnteredEmail('');
      setEnteredMessage('');
      setEnteredName('');
    } catch (error) {
      setRequestError(error.message);
      setRequestStatus("error");
    }
  }

  let notification= null;
  const context = useContext(NotificationContext);
if (requestStatus != null){
  if (requestStatus === "pending") {
    notification = {
      status: "pending",
      title: "sending message",
      message: "your message is on its way",
    }} else if (requestStatus === "success") {
    console.log ("SUCCESSSSSSSSSSSS");
    notification = {
      status: "success",
      title: "Success",
      message: "Message sent successfully",
    }}  else if (requestStatus === "error") {
      notification = {
        status: "error",
        title: "Error",
        message: requestError,
      }}
    context.update({
      status: notification.status,
      title: notification.title,
      message: notification.message,
    });
  }

  useEffect(() => {
    if (requestStatus === "success" || requestStatus === "error") {
      const timer = setTimeout(() => {
        setRequestStatus(null);
        setRequestError(null);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [requestStatus]);

/*   if (requestStatus != null) {
    console.log("Value of notification", notification);
    context.update({
      status: notification.status,
      title: notification.title,
      message: notification.message,
    }); */


  return (
    <section className={classes.contact}>
      <h1> How can I help you? </h1>
      <form className={classes.form} onSubmit={sendMessageHandler}>
        <div className={classes.control}>
          <div className={classes.controls}>
            <label htmlFor="email"> Your Email</label>
            <input
              type="email"
              id="email"
              required
              value={enteredEmail}
              onChange={(event) => setEnteredEmail(event.target.value)}
            />
          </div>
          <div className={classes.controls}>
            <label htmlFor="name"> Your Name</label>
            <input
              type="text"
              id="name"
              required
              value={enteredName}
              onChange={(event) => setEnteredName(event.target.value)}
            />
          </div>
        </div>
        <div className={classes.control}>
          <label htmlFor="message"> Your Message</label>
          <textarea
            id="message"
            rows="5"
            value={enteredMessage}
            required
            onChange={(event) => setEnteredMessage(event.target.value)}
          ></textarea>
        </div>
        <div className={classes.action}>
          <button> Send Message</button>
        </div>
      </form>
      {notification && <Notification />}
    </section>
  );
}

export default ContactForm;

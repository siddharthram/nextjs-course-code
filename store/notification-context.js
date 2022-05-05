import { createContext } from "react";
import { useState } from "react";
//we can get a component out of this, so upper case


// context with initial values
const NotificationContext = createContext({
  status: "",
  title: "",
  message: "",
  updateNotification: (status, title, message) => {} // just for autocomplete
});

export function NotificationContextProvider(props) {

  const [status, setStatus] = useState("");
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");

  const context = {
      status: status,
      title: title,
      message: message,
      update: updateNotification
  }

  function updateNotification(newstate) {
    setStatus(newstate.status);
    setTitle(newstate.title);
    setMessage(newstate.message);
  }

  return (
    <NotificationContext.Provider value={context}>
        {props.children}
    </NotificationContext.Provider>
  );
}

export default NotificationContext;

/*
const NotificationContext = createContext({
    notification: null,
    showNotification: function (notificationData) {},
    hideNotification: function() {}
});

//can use this to wrap around other content 
export function NotificationContextProvider(props) {
const [activeNotification, setActiveNotification] = useState();

function showNotificationHandler(notificationData){
    setActiveNotification( {
        title: notificationData.title,
        message: notificationData.message,
        status: notificationData.status
    });
    //shortcut could be
    //setActiveNotification(notificationData)
}

function hideNotificationHandler() {
    setActiveNotification(null);
}

    return (
    <NotificationContext.Provider>
        {props.children}
    </NotificationContext.Provider>
    );
}

export default NotificationContext;
*/

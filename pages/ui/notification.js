import ReactDOM from 'react-dom';

import classes from './notification.module.css';

import NotificationContext from '../../store/notification-context';
import { useContext } from 'react';

function Notification() {
  //const { title, message, status } = props;
  const notificationContext = useContext(NotificationContext);


  let statusClasses = '';
console.log("status is ", notificationContext.status);
  if (notificationContext.status === 'success') {
    statusClasses = classes.success;
  }

  if (notificationContext.status === 'error') {
    statusClasses = classes.error;
  }


  const cssClasses = `${classes.notification} ${statusClasses}`;

  return (
    <div className={cssClasses}>
      <h2>{notificationContext.title}</h2>
      <p>{notificationContext.message}</p>
    </div>
  );
}

export default Notification;

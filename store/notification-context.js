import { createContext } from 'react';
//we can get a component out of this, so upper case

const NotificationContext = createContext({
    notification: null,
    showNotification: function () {},
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
    
}

    return (
    <NotificationContext.Provider>
        {props.children}
    </NotificationContext.Provider>
    );
}

export default NotificationContext;

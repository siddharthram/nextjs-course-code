import '../styles/globals.css'
import Layout from '../components/Layout/layout';
import { NotificationContextProvider } from '../store/notification-context';
import Notification from './ui/notification';


function MyApp({ Component, pageProps }) {
  return (
    <NotificationContextProvider>
  <Layout>
   <Component {...pageProps} />
   
   </Layout>
   </NotificationContextProvider>
  )
}

export default MyApp

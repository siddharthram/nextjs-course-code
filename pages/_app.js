import '../styles/globals.css'
import Layout from '../components/Layout/layout';
import { NotificationContextProvider } from '../store/notification-context';


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

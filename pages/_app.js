import "../styles/globals.css";
import usePageView from '../hooks/usePageView'
import GoogleAnalytics from "../components/GoogleAnalytics";
import { Analytics } from '@vercel/analytics/react';


function MyApp({ Component, pageProps }) {
  usePageView() 

  return (
  <>
  <GoogleAnalytics/>
  <Component {...pageProps} />;
  <Analytics />
  </>
)  
}

export default MyApp;
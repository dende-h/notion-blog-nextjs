import "../styles/globals.css";
import usePageView from '../hooks/usePageView'


function MyApp({ Component, pageProps }) {
  usePageView() 

  return (
  <>
  <Component {...pageProps} />;
  </>
)  
}

export default MyApp;
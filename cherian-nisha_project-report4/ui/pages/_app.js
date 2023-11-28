import '@/styles/globals.css'
// import layout  components from components folder
import Layout from "@/components/Layout";

export default function App({ Component, pageProps }) {
  return(
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
  
} 

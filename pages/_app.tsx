import { AppProps } from "next/dist/next-server/lib/router/router";
import Header from "../components/Header";
import "../styles/globals.scss";
import "../styles/remedy.scss";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div>
      <Header />
      <Component {...pageProps} />
    </div>
  );
}

export default MyApp;

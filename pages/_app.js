import { ThirdwebProvider } from "@thirdweb-dev/react";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <ThirdwebProvider 
      activeChain="polygon" 
      clientId="a98083f883a97f19e073829656d7fd42"
    >
      <Component {...pageProps} />
    </ThirdwebProvider>
  );
}

export default MyApp;

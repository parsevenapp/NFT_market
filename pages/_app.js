import { ThirdwebProvider } from "@thirdweb-dev/react";
import { Polygon } from "@thirdweb-dev/chains";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <ThirdwebProvider 
      activeChain={Polygon} 
      clientId="a98083f883a97f19e073829656d7fd42"
    >
      <Component {...pageProps} />
    </ThirdwebProvider>
  );
}

export default MyApp;

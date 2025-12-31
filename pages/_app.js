import { ThirdwebProvider } from "@thirdweb-dev/react";
import { Polygon } from "@thirdweb-dev/chains";
import "../styles/globals.css";

// Client ID Hardcoded for reliability
const CLIENT_ID = "a98083f883a97f19e073829656d7fd42";

function MyApp({ Component, pageProps }) {
  return (
    <ThirdwebProvider 
      activeChain={Polygon} 
      clientId={CLIENT_ID}
    >
      <Component {...pageProps} />
    </ThirdwebProvider>
  );
}

export default MyApp;

import { ThirdwebProvider } from "@thirdweb-dev/react";
import { Polygon, Base } from "@thirdweb-dev/chains";
import "../styles/globals.css";

// Your Client ID
const CLIENT_ID = "a98083f883a97f19e073829656d7fd42";

function MyApp({ Component, pageProps }) {
  return (
    <ThirdwebProvider 
      activeChain={Polygon} 
      supportedChains={[Polygon, Base]}
      clientId={CLIENT_ID}
    >
      <Component {...pageProps} />
    </ThirdwebProvider>
  );
}

export default MyApp;

import { ThirdwebProvider } from "@thirdweb-dev/react";
import "../styles/globals.css";
import { CLIENT_ID } from "../const/contractAddresses";
import { SELECTED_CHAIN } from "../const/chains";

function MyApp({ Component, pageProps }) {
  return (
    <ThirdwebProvider 
      activeChain={SELECTED_CHAIN} 
      clientId={CLIENT_ID}
    >
      <Component {...pageProps} />
    </ThirdwebProvider>
  );
}

export default MyApp;

import { ThirdwebProvider } from "@thirdweb-dev/react";
import { CLIENT_ID } from "../const/contractAddresses";
import { SELECTED_CHAIN } from "../const/chains";
import "../styles/globals.css";

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

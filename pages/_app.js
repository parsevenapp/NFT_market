import { ThirdwebProvider } from "@thirdweb-dev/react";
import { Ethereum, Polygon, Base, Arbitrum, Binancesmartchain } from "@thirdweb-dev/chains";
import { CLIENT_ID } from "../const/contractAddresses";
import "../styles/globals.css";

// لیست شبکه‌های مورد تایید طبق دستور تو
const supportedChains = [Ethereum, Polygon, Base, Arbitrum, Binancesmartchain];

function MyApp({ Component, pageProps }) {
  return (
    <ThirdwebProvider 
      activeChain={Polygon} // شبکه پیش‌فرض
      supportedChains={supportedChains}
      clientId={CLIENT_ID}
    >
      <Component {...pageProps} />
    </ThirdwebProvider>
  );
}

export default MyApp;

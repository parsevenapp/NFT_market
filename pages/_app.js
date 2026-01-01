import { ThirdwebProvider, coinbaseWallet, localWallet, metamaskWallet, rainbowWallet, trustWallet } from "@thirdweb-dev/react";
import { Ethereum, Polygon, Base, Arbitrum } from "@thirdweb-dev/chains";
import "../styles/globals.css";
import { CLIENT_ID } from "../const/contractAddresses";

function MyApp({ Component, pageProps }) {
  return (
    <ThirdwebProvider
      activeChain={Polygon} // شبکه پیش‌فرض (قابل تغییر به اتریوم یا بیس)
      supportedChains={[Ethereum, Polygon, Base, Arbitrum]}
      clientId={CLIENT_ID}
      supportedWallets={[
        metamaskWallet(),
        coinbaseWallet(),
        rainbowWallet(),
        trustWallet(),
        localWallet(),
      ]}
    >
      <Component {...pageProps} />
    </ThirdwebProvider>
  );
}

export default MyApp;

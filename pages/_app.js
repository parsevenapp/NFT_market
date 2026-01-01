import { ThirdwebProvider } from "@thirdweb-dev/react";
import "../styles/globals.css";
import { CLIENT_ID } from "../const/contractAddresses";
import { SELECTED_CHAIN } from "../const/chains"; // فراخوانی فایل جدید

function MyApp({ Component, pageProps }) {
  return (
    <ThirdwebProvider
      activeChain={SELECTED_CHAIN} // استفاده از متغیر فایل chains.js
      clientId={CLIENT_ID}
    >
      <Component {...pageProps} />
    </ThirdwebProvider>
  );
}

export default MyApp;

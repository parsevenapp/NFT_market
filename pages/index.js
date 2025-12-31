import { ConnectWallet, useContract, useDirectListings, Web3Button, useAddress } from "@thirdweb-dev/react";
import { useState, useEffect } from "react";

const MARKETPLACE_ADDR = "0xa01C729Ee0Ee812faFa0096D2ccEA8D6e1De6ECb";

export default function Home() {
  const [tab, setTab] = useState("market");
  const [mounted, setMounted] = useState(false);
  const address = useAddress();

  // جلوگیری از ارور کلاینت با اطمینان از لود شدن کامل صفحه
  useEffect(() => {
    setMounted(true);
  }, []);

  const { contract: market } = useContract(MARKETPLACE_ADDR, "marketplace-v3");
  const { data: listings, isLoading } = useDirectListings(market);

  if (!mounted) return null;

  return (
    <div className="container">
      <header className="header">
        <div className="logo-section"><h1>COSMIC MARKET</h1></div>
        <ConnectWallet theme="dark" />
      </header>

      <nav className="nav-bar">
        <button onClick={() => setTab("market")} className={tab === "market" ? "active" : ""}>Market</button>
        <button onClick={() => setTab("inventory")} className={tab === "inventory" ? "active" : ""}>Inventory</button>
      </nav>

      <main className="main-content">
        {tab === "market" ? (
          isLoading ? <p className="loader">Loading Galaxy...</p> : (
            <div className="grid">
              {listings?.map((l) => (
                <div key={l.id} className="nft-card">
                  <img src={l.asset.image} alt="nft" className="img-nft" />
                  <div className="nft-info">
                    <h3>{l.asset.name}</h3>
                    <p className="price">{l.currencyValuePerToken.displayValue} MATIC</p>
                    <Web3Button contractAddress={MARKETPLACE_ADDR} action={() => market.directListings.buyFromListing(l.id, 1)}>Buy Now</Web3Button>
                  </div>
                </div>
              ))}
            </div>
          )
        ) : (
          <div className="glass-card">
            <p>Wallet: {address || "Not Connected"}</p>
          </div>
        )}
      </main>
    </div>
  );
}

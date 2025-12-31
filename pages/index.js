import { ConnectWallet, useContract, useDirectListings, Web3Button, useAddress } from "@thirdweb-dev/react";
import { useState, useEffect } from "react";

const MARKETPLACE_ADDR = "0xa01C729Ee0Ee812faFa0096D2ccEA8D6e1De6ECb";

export default function Home() {
  // 1. Safe Hydration Check
  const [isMounted, setIsMounted] = useState(false);
  const [tab, setTab] = useState("market");
  const address = useAddress();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // 2. Load Contract Hooks (Always at top level)
  const { contract: market } = useContract(MARKETPLACE_ADDR, "marketplace-v3");
  const { data: listings, isLoading: loadingListings } = useDirectListings(market);

  // 3. Render NOTHING on server to prevent crash
  if (!isMounted) return null;

  return (
    <div className="container">
      {/* Header */}
      <header className="header">
        <div className="brand">
          <div className="brand-glow"></div>
          <h1>COSMIC <span className="pro-tag">PRO</span></h1>
        </div>
        <div className="connect-wrapper">
            <ConnectWallet theme="dark" btnTitle="Connect" />
        </div>
      </header>

      {/* Navigation */}
      <nav className="nav-bar">
        <button className={tab === "market" ? "active" : ""} onClick={() => setTab("market")}>Market</button>
        <button className={tab === "inventory" ? "active" : ""} onClick={() => setTab("inventory")}>Inventory</button>
        <button className={tab === "sell" ? "active" : ""} onClick={() => setTab("sell")}>Sell</button>
      </nav>

      {/* Main Content */}
      <main className="content-area">
        {tab === "market" && (
            loadingListings ? (
                <div className="loader-box"><div className="spinner"></div><p>Syncing Blockchain...</p></div>
            ) : (
                <div className="grid">
                    {listings && listings.length > 0 ? listings.map((l) => (
                        <div key={l.id} className="card">
                            <div className="card-img">
                                <img src={l.asset.image} alt={l.asset.name} />
                            </div>
                            <div className="card-info">
                                <h3>{l.asset.name}</h3>
                                <div className="price-row">
                                    <span>Price:</span>
                                    <span className="price-val">{l.currencyValuePerToken.displayValue} MATIC</span>
                                </div>
                                <Web3Button
                                    contractAddress={MARKETPLACE_ADDR}
                                    action={() => market.directListings.buyFromListing(l.id, 1)}
                                    className="buy-btn"
                                >
                                    BUY ASSET
                                </Web3Button>
                            </div>
                        </div>
                    )) : <div className="empty-state">No items found in the market.</div>}
                </div>
            )
        )}

        {tab === "inventory" && (
            <div className="panel">
                <h2>Your Inventory</h2>
                <p>{address ? `Wallet Connected: ${address.slice(0,6)}...${address.slice(-4)}` : "Please Connect Wallet"}</p>
            </div>
        )}

        {tab === "sell" && (
            <div className="panel sell-panel">
                <h2>List Item</h2>
                <p>Use the form below to sell your NFT.</p>
                {/* Form Logic Placeholder */}
                <div className="disabled-form">Listing Form Area</div>
            </div>
        )}
      </main>
    </div>
  );
}

import { 
  ConnectWallet, useContract, useDirectListings, 
  Web3Button, useAddress 
} from "@thirdweb-dev/react";
import { useState } from "react";

const MARKETPLACE_ADDR = "0xa01C729Ee0Ee812faFa0096D2ccEA8D6e1De6ECb";

export default function Home() {
  const [tab, setTab] = useState("market");
  const address = useAddress();
  const { contract: market, isLoading: isContractLoading } = useContract(MARKETPLACE_ADDR, "marketplace-v3");

  return (
    <div className="container">
      <header className="header">
        <div className="logo-section">
          <div className="logo-icon"></div>
          <h1>COSMIC MARKET</h1>
        </div>
        <ConnectWallet theme="dark" btnTitle="Connect Wallet" className="connect-btn" />
      </header>

      <nav className="nav-bar">
        <button onClick={() => setTab("market")} className={tab === "market" ? "active" : ""}>Market</button>
        <button onClick={() => setTab("inventory")} className={tab === "inventory" ? "active" : ""}>My Assets</button>
        <button onClick={() => setTab("sell")} className={tab === "sell" ? "active" : ""}>List for Sale</button>
      </nav>

      <main className="main-content">
        {isContractLoading ? (
          <div className="loader">Loading Cosmic Void...</div>
        ) : (
          <>
            {tab === "market" && <MarketView market={market} />}
            {tab === "inventory" && <InventoryView address={address} />}
            {tab === "sell" && <SellView market={market} />}
          </>
        )}
      </main>
    </div>
  );
}

function MarketView({ market }) {
  const { data: listings, isLoading } = useDirectListings(market);

  if (isLoading) return <div className="loader">Scanning Galaxy...</div>;

  return (
    <div className="grid">
      {listings?.length > 0 ? listings.map((l) => (
        <div key={l.id} className="nft-card">
          <div className="img-container">
            <img src={l.asset.image} alt="nft" />
          </div>
          <div className="nft-info">
            <h3>{l.asset.name}</h3>
            <p className="price">{l.currencyValuePerToken.displayValue} <span>{l.currencyValuePerToken.symbol}</span></p>
            <Web3Button 
              className="buy-btn"
              contractAddress={MARKETPLACE_ADDR} 
              action={() => market.directListings.buyFromListing(l.id, 1)}
            >Buy Now</Web3Button>
          </div>
        </div>
      )) : <p className="empty-msg">No NFTs found in this sector.</p>}
    </div>
  );
}

function InventoryView({ address }) {
  return (
    <div className="glass-card">
      <h2>My Inventory</h2>
      {address ? (
        <p className="addr-text">Connected: {address}</p>
      ) : (
        <p>Please connect your explorer wallet.</p>
      )}
    </div>
  );
}

function SellView({ market }) {
  const [nftAddr, setNftAddr] = useState("");
  const [tid, setTid] = useState("");
  const [price, setPrice] = useState("");

  return (
    <div className="glass-card sell-form">
      <h2>List New Asset</h2>
      <input placeholder="NFT Contract Address" onChange={(e) => setNftAddr(e.target.value)} />
      <input placeholder="Token ID" onChange={(e) => setTid(e.target.value)} />
      <input placeholder="Price (MATIC)" onChange={(e) => setPrice(e.target.value)} />
      <Web3Button 
        contractAddress={MARKETPLACE_ADDR}
        action={() => market.directListings.createListing({
          assetContractAddress: nftAddr,
          tokenId: tid,
          pricePerToken: price,
        })}
      >Launch Listing</Web3Button>
    </div>
  );
}

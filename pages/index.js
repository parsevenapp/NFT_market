import { ConnectWallet, useContract, useDirectListings, Web3Button, useAddress, useOwnedNFTs, useNFTs } from "@thirdweb-dev/react";
import { useState, useEffect } from "react";

const MARKETPLACE_ADDR = "0xa01C729Ee0Ee812faFa0096D2ccEA8D6e1De6ECb";
const NFT_COLLECTION_ADDR = "آدرس_کالکشن_خودت_را_اینجا_بگذار"; // اگر نداری بساز

export default function Home() {
  const [tab, setTab] = useState("market");
  const [mounted, setMounted] = useState(false);
  const address = useAddress();

  useEffect(() => { setMounted(true); }, []);

  const { contract: market } = useContract(MARKETPLACE_ADDR, "marketplace-v3");
  const { data: listings, isLoading: loadingMarket } = useDirectListings(market);

  if (!mounted) return null;

  return (
    <div className="container">
      <header className="header">
        <div className="logo">COSMIC <span className="pro">PRO</span></div>
        <ConnectWallet theme="dark" />
      </header>

      <nav className="nav-bar">
        <button className={tab === "market" ? "active" : ""} onClick={() => setTab("market")}>Market</button>
        <button className={tab === "mint" ? "active" : ""} onClick={() => setTab("mint")}>Mint NFT</button>
        <button className={tab === "inventory" ? "active" : ""} onClick={() => setTab("inventory")}>Profile</button>
        <button className={tab === "top" ? "active" : ""} onClick={() => setTab("top")}>Top Sellers</button>
      </nav>

      <main className="content">
        {tab === "market" && (
          <div className="grid">
            {loadingMarket ? <p>Loading Market...</p> : 
              listings?.length > 0 ? listings.map(l => (
                <div key={l.id} className="nft-card">
                  <img src={l.asset.image} />
                  <h3>{l.asset.name}</h3>
                  <p>{l.currencyValuePerToken.displayValue} MATIC</p>
                  <Web3Button contractAddress={MARKETPLACE_ADDR} action={() => market.directListings.buyFromListing(l.id, 1)}>Buy</Web3Button>
                </div>
              )) : <p>هیچ NFT برای فروش لیست نشده است!</p>
            }
          </div>
        )}

        {tab === "mint" && <MintView />}
        {tab === "inventory" && <ProfileView address={address} />}
        {tab === "top" && <TopSellersView />}
      </main>
    </div>
  );
}

function MintView() {
  return (
    <div className="panel">
      <h2>Mint New NFT</h2>
      <p>اینجا می‌توانید عکس آپلود کنید و NFT بسازید (نیاز به قرارداد NFT Collection دارد)</p>
      <Web3Button 
        contractAddress={"آدرس_قرارداد_NFT"} 
        action={(contract) => contract.erc721.mint({ name: "My NFT", image: "URL" })}
      >MINT NOW</Web3Button>
    </div>
  );
}

function ProfileView({ address }) {
  return (
    <div className="panel">
      <h2>Personal Profile</h2>
      <div className="user-info">
        <div className="avatar"></div>
        <p>{address || "Connect Wallet"}</p>
      </div>
      <h3>Your Assets:</h3>
      <p>NFTهای لود شده در ولت شما اینجا نمایش داده می‌شوند.</p>
    </div>
  );
}

function TopSellersView() {
  return (
    <div className="panel">
      <h2>Leaderboard</h2>
      <div className="seller-list">
        <div className="seller-item"><span>1. Unknown Voyager</span> <span>500 MATIC</span></div>
        <div className="seller-item"><span>2. Cyber Punk</span> <span>320 MATIC</span></div>
      </div>
    </div>
  );
}

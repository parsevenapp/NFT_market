import { ConnectWallet, useAddress, useContract, useCreateDirectListing, Web3Button, useDirectListings } from "@thirdweb-dev/react";
import { useState, useEffect } from "react";
import { Network, Alchemy } from "alchemy-sdk";

// آدرس ثابت مارکت‌پلیس تو
const MARKETPLACE_ADDR = "0xa01C729Ee0Ee812faFa0096D2ccEA8D6e1De6ECb";
// اینجا رو فعلاً خالی بذار تا قرارداد مینت خودت رو بسازی
const MINT_CONTRACT_ADDR = "آدرس_قرارداد_مینت_تو_بعدا";

const alchemy = new Alchemy({
  apiKey: "demo", // برای سرعت بیشتر بعداً از alchemy.com رایگان بگیر
  network: Network.MATIC_MAINNET,
});

export default function UltimateMarketplace() {
  const address = useAddress();
  const [tab, setTab] = useState("inventory");
  const [userNFTs, setUserNFTs] = useState([]);
  const [loading, setLoading] = useState(false);

  // ۱. سیستم اسکن خودکار ولت (مثل OpenSea)
  useEffect(() => {
    async function scanWallet() {
      if (!address || tab !== "inventory") return;
      setLoading(true);
      try {
        const response = await alchemy.nft.getNftsForOwner(address);
        setUserNFTs(response.ownedNfts);
      } catch (err) { console.error("Scan Error", err); }
      setLoading(false);
    }
    scanWallet();
  }, [address, tab]);

  return (
    <div className="app-container">
      <header className="main-header">
        <div className="logo-section">COSMIC <span>MARKET v2</span></div>
        <ConnectWallet theme="dark" />
      </header>

      <nav className="mega-nav">
        <button className={tab === "market" ? "active" : ""} onClick={() => setTab("market")}>EXPLORE MARKET</button>
        <button className={tab === "inventory" ? "active" : ""} onClick={() => setTab("inventory")}>MY COLLECTION</button>
        <button className={tab === "mint" ? "active" : ""} onClick={() => setTab("mint")}>MINT ENGINE</button>
      </nav>

      <main className="content-area">
        {tab === "market" && <MarketSection />}
        
        {tab === "inventory" && (
          <section>
            <h2 className="section-title">Detected Assets in Wallet</h2>
            {loading ? <div className="loader-neon">Scanning Blockchain...</div> : (
              <div className="nft-grid">
                {userNFTs.map((nft) => (
                  <InventoryCard key={`${nft.contract.address}-${nft.tokenId}`} nft={nft} />
                ))}
              </div>
            )}
          </section>
        )}

        {tab === "mint" && (
          <div className="mint-box">
            <h2>Minting Interface</h2>
            <p>این بخش آماده است؛ فقط کافیست قرارداد NFT خود را بسازید و آدرس آن را در کد قرار دهید.</p>
            {/* بعد از ساخت قرارداد، فرم مینت اینجا قرار می‌گیرد */}
          </div>
        )}
      </main>
    </div>
  );
}

// کارت اختصاصی اینونتوری با قابلیت فروش
function InventoryCard({ nft }) {
  const { contract: market } = useContract(MARKETPLACE_ADDR, "marketplace-v3");
  const { mutateAsync: createListing } = useCreateDirectListing(market);
  const [price, setPrice] = useState("0.1");

  return (
    <div className="nft-card-premium">
      <img src={nft.media[0]?.gateway || "/placeholder.png"} />
      <div className="card-body">
        <h4>{nft.title || "Unnamed NFT"}</h4>
        <p className="contract-tag">{nft.contract.name}</p>
        <div className="sale-action">
          <input type="number" step="0.01" value={price} onChange={(e) => setPrice(e.target.value)} />
          <Web3Button
            contractAddress={MARKETPLACE_ADDR}
            action={() => createListing({
              assetContractAddress: nft.contract.address,
              tokenId: nft.tokenId,
              pricePerToken: price,
            })}
            onSuccess={() => alert("Listed Successfully!")}
          >LIST FOR SALE</Web3Button>
        </div>
      </div>
    </div>
  );
}

function MarketSection() {
  const { contract: market } = useContract(MARKETPLACE_ADDR, "marketplace-v3");
  const { data: listings, isLoading } = useDirectListings(market);

  if (isLoading) return <div className="loader-neon">Loading Market Listings...</div>;
  return (
    <div className="nft-grid">
      {listings?.map((l) => (
        <div key={l.id} className="nft-card-premium">
          <img src={l.asset.image} />
          <div className="card-body">
            <h4>{l.asset.name}</h4>
            <p className="price-tag">{l.currencyValuePerToken.displayValue} MATIC</p>
            <Web3Button 
               contractAddress={MARKETPLACE_ADDR} 
               action={() => market.directListings.buyFromListing(l.id, 1)}
            >BUY NOW</Web3Button>
          </div>
        </div>
      ))}
    </div>
  );
}

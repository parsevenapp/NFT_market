import { ConnectWallet, useAddress, useContract, useCreateDirectListing, Web3Button, useDirectListings } from "@thirdweb-dev/react";
import { useState, useEffect } from "react";
import { Network, Alchemy } from "alchemy-sdk";

const MARKETPLACE_ADDR = "0xa01C729Ee0Ee812faFa0096D2ccEA8D6e1De6ECb";

// استفاده از کلید دمو برای جلوگیری از ارورهای اولیه
const alchemy = new Alchemy({
  apiKey: "demo", 
  network: Network.MATIC_MAINNET,
});

export default function Home() {
  const address = useAddress();
  const [tab, setTab] = useState("inventory");
  const [nfts, setNfts] = useState([]);
  const [loading, setLoading] = useState(false);
  const { contract: market } = useContract(MARKETPLACE_ADDR, "marketplace-v3");
  const { data: listings, isLoading: marketLoading } = useDirectListings(market);

  // اسکن خودکار ولت به محض اتصال
  useEffect(() => {
    async function scan() {
      if (!address || tab !== "inventory") return;
      setLoading(true);
      try {
        const res = await alchemy.nft.getNftsForOwner(address);
        setNfts(res.ownedNfts);
      } catch (err) { console.error("Scan Failed", err); }
      setLoading(false);
    }
    scan();
  }, [address, tab]);

  return (
    <div className="container">
      <header className="header">
        <div className="logo">COSMIC <span>PRO</span></div>
        <ConnectWallet theme="dark" />
      </header>

      <nav className="nav-bar">
        <button className={tab === "market" ? "active" : ""} onClick={() => setTab("market")}>EXPLORE</button>
        <button className={tab === "inventory" ? "active" : ""} onClick={() => setTab("inventory")}>MY WALLET</button>
      </nav>

      <main className="main-content">
        {tab === "market" ? (
          <div className="grid">
            {marketLoading ? <div className="loader">Loading Market...</div> : 
              listings?.map(l => (
                <div key={l.id} className="nft-card">
                  <img src={l.asset.image} alt="nft" />
                  <div className="info">
                    <h3>{l.asset.name}</h3>
                    <p>{l.currencyValuePerToken.displayValue} MATIC</p>
                    <Web3Button contractAddress={MARKETPLACE_ADDR} action={() => market.directListings.buyFromListing(l.id, 1)}>BUY</Web3Button>
                  </div>
                </div>
              ))
            }
          </div>
        ) : (
          <div className="grid">
            {!address ? <div className="msg">لطفاً ولت را وصل کنید</div> : 
             loading ? <div className="loader">در حال اسکن عمیق شبکه پالیگان...</div> : 
             nfts.length > 0 ? nfts.map(nft => (
               <InventoryCard key={nft.tokenId} nft={nft} market={market} />
             )) : <div className="msg">هیچ NFT در ولت شما یافت نشد.</div>
            }
          </div>
        )}
      </main>
    </div>
  );
}

function InventoryCard({ nft, market }) {
  const { mutateAsync: createListing } = useCreateDirectListing(market);
  return (
    <div className="nft-card">
      <img src={nft.media[0]?.gateway || "/placeholder.png"} />
      <div className="info">
        <h3>{nft.title || "NFT Asset"}</h3>
        <Web3Button
          contractAddress={MARKETPLACE_ADDR}
          action={() => createListing({
            assetContractAddress: nft.contract.address,
            tokenId: nft.tokenId,
            pricePerToken: "1",
          })}
        >SELL THIS</Web3Button>
      </div>
    </div>
  );
}

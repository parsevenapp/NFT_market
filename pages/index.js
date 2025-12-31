import { 
  ConnectWallet, useContract, useDirectListings, 
  Web3Button, useAddress, useOwnedNFTs, useCreateDirectListing 
} from "@thirdweb-dev/react";
import { useState, useEffect } from "react";

const MARKETPLACE_ADDR = "0xa01C729Ee0Ee812faFa0096D2ccEA8D6e1De6ECb";
const NFT_COLLECTION_ADDR = "0x61957635650222f7B626C839572D1b8B94A6487e"; 

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
        <div className="brand">
          <div className="dot"></div>
          <h1>COSMIC <span className="badge">PRO</span></h1>
        </div>
        <ConnectWallet theme="dark" />
      </header>

      <nav className="nav-cosmic">
        <button className={tab === "market" ? "active" : ""} onClick={() => setTab("market")}>Market</button>
        <button className={tab === "mint" ? "active" : ""} onClick={() => setTab("mint")}>Mint NFT</button>
        <button className={tab === "inventory" ? "active" : ""} onClick={() => setTab("inventory")}>Inventory</button>
      </nav>

      <main className="main-view">
        {tab === "market" && (
          <div className="grid">
            {loadingMarket ? <div className="loader">Loading Market...</div> : 
              listings?.length > 0 ? listings.map(l => (
                <div key={l.id} className="nft-card">
                  <img src={l.asset.image} alt="nft" />
                  <div className="nft-info">
                    <h3>{l.asset.name}</h3>
                    <p className="price">{l.currencyValuePerToken.displayValue} MATIC</p>
                    <Web3Button 
                      contractAddress={MARKETPLACE_ADDR} 
                      action={() => market.directListings.buyFromListing(l.id, 1)}
                    >Instant Buy</Web3Button>
                  </div>
                </div>
              )) : <p className="empty-msg">No listings found.</p>
            }
          </div>
        )}

        {tab === "mint" && <MintView collectionAddr={NFT_COLLECTION_ADDR} />}
        {tab === "inventory" && <InventoryView address={address} collectionAddr={NFT_COLLECTION_ADDR} market={market} />}
      </main>
    </div>
  );
}

function MintView({ collectionAddr }) {
  const [name, setName] = useState("");
  const [file, setFile] = useState();

  return (
    <div className="glass-panel">
      <h2>Forge New NFT</h2>
      <input type="text" placeholder="NFT Name" onChange={(e) => setName(e.target.value)} className="cosmic-input" />
      <input type="file" onChange={(e) => setFile(e.target.files[0])} className="cosmic-input" />
      <Web3Button
        contractAddress={collectionAddr}
        action={(contract) => contract.erc721.mint({ name, image: file })}
        onSuccess={() => alert("Minted!")}
      >MINT NOW</Web3Button>
    </div>
  );
}

function InventoryView({ address, collectionAddr, market }) {
  const { contract: nftContract } = useContract(collectionAddr);
  const { data: ownedNFTs, isLoading } = useOwnedNFTs(nftContract, address);
  const { mutateAsync: createListing } = useCreateDirectListing(market);
  const [listPrice, setListPrice] = useState("1");

  return (
    <div className="inventory-section">
      <h2 className="section-title">Your Inventory</h2>
      <div className="grid">
        {isLoading ? <p>Loading...</p> : 
          ownedNFTs?.length > 0 ? ownedNFTs.map(nft => (
            <div key={nft.metadata.id} className="nft-card inv-card">
              <img src={nft.metadata.image} />
              <div className="nft-info">
                <h3>{nft.metadata.name}</h3>
                <input type="number" value={listPrice} onChange={(e) => setListPrice(e.target.value)} className="price-input" />
                <Web3Button
                  contractAddress={MARKETPLACE_ADDR}
                  action={() => createListing({
                    assetContractAddress: collectionAddr,
                    tokenId: nft.metadata.id,
                    pricePerToken: listPrice,
                  })}
                >LIST SALE</Web3Button>
              </div>
            </div>
          )) : <p>No NFTs found.</p>
        }
      </div>
    </div>
  );
}

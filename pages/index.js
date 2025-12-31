import { 
  ConnectWallet, useContract, useDirectListings, 
  Web3Button, useAddress, useContractMetadata 
} from "@thirdweb-dev/react";
import { useState } from "react";

// Your Marketplace Contract Address
const MARKETPLACE_ADDR = "0xa01C729Ee0Ee812faFa0096D2ccEA8D6e1De6ECb";

export default function Home() {
  const [tab, setTab] = useState("market");
  const address = useAddress();
  const { contract: market } = useContract(MARKETPLACE_ADDR, "marketplace-v3");
  const { data: metadata } = useContractMetadata(market);

  return (
    <div style={{ backgroundColor: '#000', color: '#fff', minHeight: '100vh', fontFamily: 'sans-serif' }}>
      
      <header style={{ padding: '15px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #222' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          {metadata?.image && <img src={metadata.image} style={{ width: '40px', height: '40px', borderRadius: '50%' }} alt="logo" />}
          <h1 style={{ fontSize: '1.2rem', margin: 0 }}>{metadata?.name || "NFT Marketplace"}</h1>
        </div>
        <ConnectWallet theme="dark" btnTitle="Connect Wallet" />
      </header>

      <nav style={{ display: 'flex', background: '#111', padding: '5px', gap: '5px' }}>
        <button onClick={() => setTab("market")} style={navBtn(tab === "market")}>Market</button>
        <button onClick={() => setTab("inventory")} style={navBtn(tab === "inventory")}>My Assets</button>
        <button onClick={() => setTab("sell")} style={navBtn(tab === "sell")}>List for Sale</button>
      </nav>

      <main style={{ padding: '20px' }}>
        {tab === "market" && <MarketView market={market} />}
        {tab === "inventory" && <InventoryView address={address} />}
        {tab === "sell" && <SellView market={market} />}
      </main>
    </div>
  );
}

function MarketView({ market }) {
  const { data: listings, isLoading } = useDirectListings(market);
  if (isLoading) return <p>Loading Marketplace...</p>;
  return (
    <div style={gridStyle}>
      {listings?.length > 0 ? listings.map((l) => (
        <div key={l.id} style={cardStyle}>
          <img src={l.asset.image} style={imgStyle} alt="nft" />
          <h3 style={{ fontSize: '1rem' }}>{l.asset.name}</h3>
          <p style={{ color: '#00ffa3', fontWeight: 'bold' }}>{l.currencyValuePerToken.displayValue} {l.currencyValuePerToken.symbol}</p>
          <Web3Button 
            contractAddress={MARKETPLACE_ADDR} 
            action={() => market.directListings.buyFromListing(l.id, 1)}
            onSuccess={() => alert("Purchase Successful!")}
          >Buy Now</Web3Button>
        </div>
      )) : <p>No items listed for sale yet.</p>}
    </div>
  );
}

function InventoryView({ address }) {
  if (!address) return <div style={cardStyle}><p>Please connect your wallet to see your assets.</p></div>;
  return (
    <div style={cardStyle}>
      <p>Wallet Address: {address}</p>
      <p style={{ color: '#888' }}>Your owned NFTs will be displayed here.</p>
    </div>
  );
}

function SellView({ market }) {
  const [nftAddr, setNftAddr] = useState("");
  const [tid, setTid] = useState("");
  const [price, setPrice] = useState("");

  return (
    <div style={{ ...cardStyle, maxWidth: '450px', margin: '0 auto' }}>
      <h2 style={{ marginBottom: '20px' }}>Sell Your NFT</h2>
      <input placeholder="NFT Contract Address" style={inputStyle} onChange={(e) => setNftAddr(e.target.value)} />
      <input placeholder="Token ID" style={inputStyle} onChange={(e) => setTid(e.target.value)} />
      <input placeholder="Price (MATIC)" style={inputStyle} onChange={(e) => setPrice(e.target.value)} />
      <Web3Button 
        contractAddress={MARKETPLACE_ADDR}
        action={() => market.directListings.createListing({
          assetContractAddress: nftAddr,
          tokenId: tid,
          pricePerToken: price,
          currencyContractAddress: "0x0000000000000000000000000000000000000000"
        })}
        onSuccess={() => alert("Successfully Listed!")}
      >Create Listing</Web3Button>
    </div>
  );
}

const navBtn = (active) => ({ flex: 1, padding: '12px', background: active ? '#00ffa3' : 'transparent', color: active ? '#000' : '#fff', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' });
const gridStyle = { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))', gap: '15px' };
const cardStyle = { background: '#111', padding: '15px', borderRadius: '15px', border: '1px solid #222', textAlign: 'center' };
const imgStyle = { width: '100%', borderRadius: '10px', marginBottom: '10px', aspectRatio: '1/1', objectFit: 'cover' };
const inputStyle = { width: '100%', padding: '12px', marginBottom: '15px', background: '#000', border: '1px solid #333', color: '#fff', borderRadius: '8px', boxSizing: 'border-box' };

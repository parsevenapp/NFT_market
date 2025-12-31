import { ConnectWallet, useAddress, useChainId, Web3Button, useContract, useNFTs } from "@thirdweb-dev/react";
import { useState, useEffect } from "react";
import { Alchemy, Network } from "alchemy-sdk";

const MARKET_ADDR = "0xa01C729Ee0Ee812faFa0096D2ccEA8D6e1De6ECb";

export default function Home() {
  const address = useAddress();
  const chainId = useChainId();
  const [tab, setTab] = useState("inventory");
  const [userNFTs, setUserNFTs] = useState([]);
  const [loading, setLoading] = useState(false);

  // اسکنر هوشمند آدرس متصل شده برای تمام شبکه‌ها
  useEffect(() => {
    async function scan() {
      if (!address || tab !== "inventory") return;
      setLoading(true);
      const networkMap = { 1: Network.ETH_MAINNET, 137: Network.MATIC_MAINNET, 8453: Network.BASE_MAINNET, 42161: Network.ARB_MAINNET };
      const alchemy = new Alchemy({ apiKey: "demo", network: networkMap[chainId] || Network.ETH_MAINNET });
      try {
        const res = await alchemy.nft.getNftsForOwner(address);
        setUserNFTs(res.ownedNfts);
      } catch (e) { console.error("Scan Error", e); }
      setLoading(false);
    }
    scan();
  }, [address, chainId, tab]);

  return (
    <div style={{background:'#000', color:'#fff', minHeight:'100vh', padding:'15px', fontFamily:'sans-serif'}}>
      <header style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'30px'}}>
        <h2 style={{fontSize:'1.2rem'}}>COSMIC <span style={{color:'#00ffa3'}}>LIVE</span></h2>
        <ConnectWallet theme="dark" btnTitle="Connect" />
      </header>

      {/* منوی ناوبری که می‌خواستی */}
      <div style={{display:'flex', gap:'10px', marginBottom:'30px', overflowX:'auto', paddingBottom:'10px'}}>
        {['market', 'inventory', 'mint'].map((t) => (
          <button 
            key={t}
            onClick={() => setTab(t)}
            style={{
              padding:'10px 20px', borderRadius:'20px', border:'1px solid #333',
              background: tab === t ? '#8a2be2' : '#111', color:'#fff', cursor:'pointer', textTransform:'uppercase', fontSize:'12px'
            }}
          >
            {t}
          </button>
        ))}
      </div>

      <main>
        {tab === "inventory" ? (
          <div style={{display:'grid', gridTemplateColumns:'repeat(auto-fill, minmax(160px, 1fr))', gap:'15px'}}>
            {!address ? (
              <p style={{textAlign:'center', width:'100%', color:'#666'}}>لطفاً ولت را وصل کنید</p>
            ) : loading ? (
              <p>در حال اسکن ولت در شبکه {chainId}...</p>
            ) : userNFTs.length > 0 ? userNFTs.map(nft => (
              <div key={nft.tokenId} style={{background:'#111', padding:'10px', borderRadius:'12px', border:'1px solid #222'}}>
                <img src={nft.media[0]?.gateway || "/placeholder.png"} style={{width:'100%', height:'150px', objectFit:'cover', borderRadius:'8px'}} />
                <h4 style={{fontSize:'14px', margin:'10px 0'}}>{nft.title || "NFT"}</h4>
                <Web3Button contractAddress={MARKET_ADDR} action={() => alert("Ready to List")}>SELL</Web3Button>
              </div>
            )) : <p>ان‌اف‌تی پیدا نشد.</p>}
          </div>
        ) : tab === "market" ? (
          <div style={{textAlign:'center', padding:'40px', color:'#666'}}>بخش مارکت در حال لود شدن...</div>
        ) : (
          <div style={{textAlign:'center', padding:'40px', border:'1px dashed #333', borderRadius:'15px'}}>
            <h3>MINT ENGINE</h3>
            <p style={{fontSize:'13px', color:'#888'}}>قرارداد مینت خود را متصل کنید.</p>
          </div>
        )}
      </main>
    </div>
  );
}

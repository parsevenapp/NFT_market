import { ConnectWallet, useAddress, useChainId, useContract, Web3Button } from "@thirdweb-dev/react";
import { useState, useEffect } from "react";
import { Alchemy, Network } from "alchemy-sdk";

const MARKETPLACE_ADDR = "0xa01C729Ee0Ee812faFa0096D2ccEA8D6e1De6ECb";

export default function Home() {
  const address = useAddress(); 
  const chainId = useChainId();
  const [tab, setTab] = useState("inventory");
  const [nfts, setNfts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function scan() {
      if (!address || tab !== "inventory") return;
      setLoading(true);
      const networkMap = { 1: Network.ETH_MAINNET, 137: Network.MATIC_MAINNET, 8453: Network.BASE_MAINNET, 42161: Network.ARB_MAINNET, 56: Network.BNB_MAINNET };
      const alchemy = new Alchemy({ apiKey: "demo", network: networkMap[chainId] || Network.ETH_MAINNET });
      try {
        const res = await alchemy.nft.getNftsForOwner(address);
        setNfts(res.ownedNfts);
      } catch (e) { console.error(e); }
      setLoading(false);
    }
    scan();
  }, [address, chainId, tab]);

  return (
    <div style={{background:'#050505', color:'#fff', minHeight:'100vh', padding:'20px'}}>
      <header style={{display:'flex', justifyContent:'space-between', alignItems:'center', borderBottom:'1px solid #222', paddingBottom:'20px'}}>
        <h1 style={{margin:0}}>COSMIC <span style={{color:'#00ffa3'}}>PRO</span></h1>
        <ConnectWallet theme="dark" />
      </header>

      <nav style={{display:'flex', gap:'15px', margin:'30px 0', justifyContent:'center'}}>
        <button onClick={() => setTab("market")} style={{padding:'10px 25px', borderRadius:'8px', background: tab==="market"?'#8a2be2':'#111', color:'#fff', border:'none', cursor:'pointer'}}>MARKET</button>
        <button onClick={() => setTab("inventory")} style={{padding:'10px 25px', borderRadius:'8px', background: tab==="inventory"?'#8a2be2':'#111', color:'#fff', border:'none', cursor:'pointer'}}>MY WALLET</button>
        <button onClick={() => setTab("mint")} style={{padding:'10px 25px', borderRadius:'8px', background: tab==="mint"?'#8a2be2':'#111', color:'#fff', border:'none', cursor:'pointer'}}>MINT ENGINE</button>
      </nav>

      <main>
        {tab === "inventory" && (
          <div style={{display:'grid', gridTemplateColumns:'repeat(auto-fill, minmax(200px, 1fr))', gap:'20px'}}>
            {!address ? <p>ابتدا ولت را وصل کنید</p> : loading ? <p>در حال اسکن ولت...</p> : 
              nfts.map(nft => (
                <div key={nft.tokenId} style={{background:'#111', padding:'15px', borderRadius:'12px', border:'1px solid #222'}}>
                  <img src={nft.media[0]?.gateway || "/placeholder.png"} style={{width:'100%', borderRadius:'8px'}} />
                  <h4>{nft.title || "NFT"}</h4>
                  <Web3Button contractAddress={MARKETPLACE_ADDR} action={() => alert("آماده لیست کردن")}>SELL</Web3Button>
                </div>
              ))
            }
          </div>
        )}
        {tab === "market" && <div style={{textAlign:'center'}}>بخش مارکت فعال است (در حال لود لیستینگ‌ها...)</div>}
        {tab === "mint" && <div style={{textAlign:'center'}}>بخش مینت آماده اتصال به قرارداد شماست.</div>}
      </main>
    </div>
  );
}

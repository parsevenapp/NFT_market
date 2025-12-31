import { ConnectWallet, useAddress, useChainId, useContract, Web3Button } from "@thirdweb-dev/react";
import { useState, useEffect } from "react";
import { Alchemy, Network } from "alchemy-sdk";

const MARKETPLACE_ADDR = "0xa01C729Ee0Ee812faFa0096D2ccEA8D6e1De6ECb";

export default function Home() {
  const address = useAddress();
  const chainId = useChainId();
  const [nfts, setNfts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function scanAddress() {
      if (!address) return;
      setLoading(true);

      const networkMap = {
        1: Network.ETH_MAINNET,
        137: Network.MATIC_MAINNET,
        8453: Network.BASE_MAINNET,
        42161: Network.ARB_MAINNET,
        56: Network.BNB_MAINNET,
      };

      const alchemy = new Alchemy({
        apiKey: "demo", 
        network: networkMap[chainId] || Network.ETH_MAINNET,
      });

      try {
        const data = await alchemy.nft.getNftsForOwner(address);
        setNfts(data.ownedNfts);
      } catch (err) { console.error("Error:", err); }
      setLoading(false);
    }
    scanAddress();
  }, [address, chainId]);

  return (
    <div style={{background:'#050505', color:'#fff', minHeight:'100vh', padding:'20px'}}>
      <header style={{display:'flex', justifyContent:'space-between', borderBottom:'1px solid #222', paddingBottom:'20px'}}>
        <h2>COSMIC <span style={{color:'#00ffa3'}}>LIVE</span></h2>
        <ConnectWallet theme="dark" />
      </header>

      <main style={{marginTop:'40px'}}>
        {!address ? (
          <div style={{textAlign:'center'}}>لطفاً ولت را وصل کنید</div>
        ) : loading ? (
          <div style={{textAlign:'center'}}>در حال خواندن NFTهای این آدرس در شبکه {chainId}...</div>
        ) : (
          <div style={{display:'grid', gridTemplateColumns:'repeat(auto-fill, minmax(200px, 1fr))', gap:'20px'}}>
            {nfts.length > 0 ? nfts.map(nft => (
              <div key={nft.tokenId} style={{background:'#111', padding:'15px', borderRadius:'10px', border:'1px solid #222'}}>
                <img src={nft.media[0]?.gateway || "/placeholder.png"} style={{width:'100%', borderRadius:'8px'}} />
                <h4>{nft.title || "NFT"}</h4>
                <Web3Button
                  contractAddress={MARKETPLACE_ADDR}
                  action={(contract) => contract.directListings.createListing({
                    assetContractAddress: nft.contract.address,
                    tokenId: nft.tokenId,
                    pricePerToken: "0.1",
                  })}
                >SELL</Web3Button>
              </div>
            )) : <p>ان‌اف‌تی در این آدرس پیدا نشد.</p>}
          </div>
        )}
      </main>
    </div>
  );
}

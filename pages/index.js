import { ConnectWallet, useAddress, useChainId, useContract, useCreateDirectListing, Web3Button } from "@thirdweb-dev/react";
import { useState, useEffect } from "react";
import { Alchemy, Network } from "alchemy-sdk";

const MARKETPLACE_ADDR = "0xa01C729Ee0Ee812faFa0096D2ccEA8D6e1De6ECb";

export default function Home() {
  const address = useAddress();
  const chainId = useChainId();
  const [nfts, setNfts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function getOwnedNFTs() {
      if (!address) return;
      setLoading(true);

      // نقشه تشخیص شبکه فعال ولت
      const networkMap = {
        1: Network.ETH_MAINNET,
        137: Network.MATIC_MAINNET,
        8453: Network.BASE_MAINNET,
        42161: Network.ARB_MAINNET,
        56: Network.BNB_MAINNET,
      };

      const alchemy = new Alchemy({
        apiKey: "demo", // برای سرعت واقعی از alchemy.com رایگان بگیر
        network: networkMap[chainId] || Network.ETH_MAINNET,
      });

      try {
        // فقط NFTهای متعلق به آدرس متصل شده را می‌آورد
        const data = await alchemy.nft.getNftsForOwner(address);
        setNfts(data.ownedNfts);
      } catch (err) {
        console.error("خطا در اسکن ولت", err);
      }
      setLoading(false);
    }
    getOwnedNFTs();
  }, [address, chainId]);

  return (
    <div style={{background:'#000', color:'#fff', minHeight:'100vh', padding:'20px'}}>
      <header style={{display:'flex', justifyContent:'space-between', borderBottom:'1px solid #222', paddingBottom:'20px'}}>
        <h2>COSMIC <span style={{color:'#00ffa3'}}>PRO</span></h2>
        <ConnectWallet theme="dark" />
      </header>

      <main style={{marginTop:'40px'}}>
        {loading ? (
          <p>در حال اسکن ولت شما در شبکه {chainId}...</p>
        ) : (
          <div style={{display:'grid', gridTemplateColumns:'repeat(auto-fill, minmax(200px, 1fr))', gap:'20px'}}>
            {nfts.length > 0 ? nfts.map(nft => (
              <NFTCard key={`${nft.contract.address}-${nft.tokenId}`} nft={nft} />
            )) : <p>هیچ NFT در این آدرس و این شبکه پیدا نشد.</p>}
          </div>
        )}
      </main>
    </div>
  );
}

function NFTCard({ nft }) {
  const { contract: market } = useContract(MARKETPLACE_ADDR, "marketplace-v3");
  const { mutateAsync: createListing } = useCreateDirectListing(market);

  return (
    <div style={{background:'#111', padding:'15px', borderRadius:'10px', border:'1px solid #333'}}>
      <img src={nft.media[0]?.gateway || "/placeholder.png"} style={{width:'100%', borderRadius:'5px'}} />
      <h4 style={{margin:'10px 0'}}>{nft.title || "NFT"}</h4>
      <Web3Button
        contractAddress={MARKETPLACE_ADDR}
        action={() => createListing({
          assetContractAddress: nft.contract.address,
          tokenId: nft.tokenId,
          pricePerToken: "0.1",
        })}
        onSuccess={() => alert("در مارکت لیست شد!")}
      >فروش (LIST)</Web3Button>
    </div>
  );
}

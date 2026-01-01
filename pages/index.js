import { useContract, useNFTs } from "@thirdweb-dev/react";
import { MARKETPLACE_ADDRESS } from "../const/contractAddresses";
import Navbar from "../components/Navbar";
import NFTCard from "../components/NFTCard";

export default function Home() {
  const { contract } = useContract(MARKETPLACE_ADDRESS);
  const { data: nfts, isLoading } = useNFTs(contract, { start: 0, count: 12 });

  return (
    <div>
      <Navbar />
      <main style={{ maxWidth: "1200px", margin: "0 auto", padding: "40px 20px" }}>
        <h1 style={{ marginBottom: "30px" }}>Marketplace Listings</h1>
        
        {isLoading ? (
          <div style={{ textAlign: "center", marginTop: "50px" }}>
            <p>Loading Assets...</p>
          </div>
        ) : (
          <div style={{ 
            display: "grid", 
            gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))", 
            gap: "25px" 
          }}>
            {/* اینجا به جای کد طولانی، فقط کامپوننت را صدا می‌زنیم */}
            {nfts?.map((nft) => (
              <NFTCard key={nft.metadata.id} nft={nft} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

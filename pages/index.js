import { useContract, useNFTs } from "@thirdweb-dev/react";
import { MARKETPLACE_ADDRESS } from "../const/contractAddresses";
import Navbar from "../components/Navbar";

export default function Home() {
  // اتصال به قرارداد هوشمند تو
  const { contract } = useContract(MARKETPLACE_ADDRESS);
  // فراخوانی لیست ان‌اف‌تی‌ها (ایندکسر داخلی)
  const { data: nfts, isLoading } = useNFTs(contract, { start: 0, count: 10 });

  return (
    <div>
      <Navbar />
      <main style={{ padding: "2rem" }}>
        <h2>NFT Collection</h2>
        
        {isLoading ? (
          <p>Loading Marketplace Data...</p>
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: "20px" }}>
            {nfts?.map((nft) => (
              <div key={nft.metadata.id} style={{ border: "1px solid #444", borderRadius: "10px", padding: "10px" }}>
                <img src={nft.metadata.image} alt={nft.metadata.name} style={{ width: "100%", borderRadius: "8px" }} />
                <h3>{nft.metadata.name}</h3>
                <p>ID: #{nft.metadata.id}</p>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

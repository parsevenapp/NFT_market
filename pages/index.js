import { useContract, useNFTs } from "@thirdweb-dev/react";
import { MARKETPLACE_ADDRESS } from "../const/contractAddresses";
import Navbar from "../components/Navbar";

export default function Home() {
  const { contract } = useContract(MARKETPLACE_ADDRESS);
  const { data: nfts, isLoading } = useNFTs(contract, { start: 0, count: 12 });

  return (
    <div>
      <Navbar />
      <main style={{ maxWidth: "1200px", margin: "0 auto", padding: "40px 20px" }}>
        <h1 style={{ marginBottom: "30px", fontSize: "2rem" }}>Featured NFTs</h1>
        
        {isLoading ? (
          <div style={{ textAlign: "center", marginTop: "50px" }}>
             <p>Scanning Blockchain...</p>
          </div>
        ) : (
          <div style={{ 
            display: "grid", 
            gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))", 
            gap: "25px" 
          }}>
            {nfts?.map((nft) => (
              <div key={nft.metadata.id} className="nft-card">
                <img src={nft.metadata.image} alt={nft.metadata.name} className="nft-image" />
                <h3 style={{ margin: "15px 0 5px 0", fontSize: "1.1rem" }}>{nft.metadata.name}</h3>
                <p style={{ color: "#888", fontSize: "0.9rem" }}>Token ID: #{nft.metadata.id}</p>
                <button style={{
                  width: "100%",
                  marginTop: "15px",
                  padding: "10px",
                  borderRadius: "8px",
                  border: "none",
                  backgroundColor: "#ffffff",
                  color: "#000",
                  fontWeight: "bold",
                  cursor: "pointer"
                }}>
                  View Details
                </button>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

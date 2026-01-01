import { useAddress, useContract, useOwnedNFTs } from "@thirdweb-dev/react";
import { MARKETPLACE_ADDRESS } from "../const/contractAddresses";
import Navbar from "../components/Navbar";

export default function Profile() {
  const address = useAddress();
  const { contract } = useContract(MARKETPLACE_ADDRESS, "marketplace-v3");
  const { data: ownedNFTs, isLoading } = useOwnedNFTs(contract, address);

  return (
    <div style={{ backgroundColor: "#0a0a0a", minHeight: "100vh", color: "white" }}>
      <Navbar />
      <main style={{ maxWidth: "1000px", margin: "0 auto", padding: "60px 20px" }}>
        {/* بخش سربرگ پروفایل */}
        <div style={{ textAlign: "center", marginBottom: "50px" }}>
          <div style={{ 
            width: "120px", height: "120px", borderRadius: "50%", 
            background: "linear-gradient(45deg, #00ffad, #0091ff)", 
            margin: "0 auto 20px" 
          }}></div>
          <h1>User Profile</h1>
          <p style={{ color: "#888", fontFamily: "monospace" }}>{address}</p>
        </div>

        {/* بخش آمار و دارایی‌ها */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px", marginBottom: "40px" }}>
          <div style={{ background: "#1a1a1a", padding: "20px", borderRadius: "15px", textAlign: "center" }}>
            <h3 style={{ color: "#888", margin: 0 }}>Total NFTs</h3>
            <p style={{ fontSize: "2rem", fontWeight: "bold", margin: "10px 0" }}>{ownedNFTs?.length || 0}</p>
          </div>
          <div style={{ background: "#1a1a1a", padding: "20px", borderRadius: "15px", textAlign: "center" }}>
            <h3 style={{ color: "#888", margin: 0 }}>Status</h3>
            <p style={{ fontSize: "1.2rem", fontWeight: "bold", margin: "10px 0", color: "#00ffad" }}>Active Trader</p>
          </div>
        </div>

        <h2>Your Collection</h2>
        {isLoading ? <p>Loading...</p> : (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: "20px" }}>
             {ownedNFTs?.map((nft) => (
               <div key={nft.metadata.id} style={{ background: "#111", padding: "10px", borderRadius: "10px", border: "1px solid #222" }}>
                 <img src={nft.metadata.image} style={{ width: "100%", borderRadius: "8px" }} />
                 <p style={{ marginTop: "10px", textAlign: "center" }}>{nft.metadata.name}</p>
               </div>
             ))}
          </div>
        )}
      </main>
    </div>
  );
}

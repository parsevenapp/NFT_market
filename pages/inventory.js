import { useAddress, useContract, useOwnedNFTs } from "@thirdweb-dev/react";
import { MARKETPLACE_ADDRESS } from "../const/contractAddresses";
import Navbar from "../components/Navbar";
import NFTCard from "../components/NFTCard";

export default function Inventory() {
  const address = useAddress();
  const { contract } = useContract(MARKETPLACE_ADDRESS, "marketplace-v3");
  
  // فراخوانی تمام ان‌اف‌تی‌هایی که ولتِ متصل شده مالک آن‌هاست
  const { data: ownedNFTs, isLoading } = useOwnedNFTs(contract, address);

  return (
    <div>
      <Navbar />
      <main style={{ maxWidth: "1200px", margin: "0 auto", padding: "40px 20px" }}>
        <h1>Your Assets</h1>
        <p style={{ color: "#888" }}>ان‌اف‌تی‌هایی که در اختیار دارید.</p>

        {!address ? (
          <p>لطفاً ولت خود را وصل کنید.</p>
        ) : isLoading ? (
          <p>در حال بارگذاری دارایی‌ها...</p>
        ) : (
          <div style={{ 
            display: "grid", 
            gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))", 
            gap: "25px",
            marginTop: "30px"
          }}>
            {ownedNFTs?.map((nft) => (
              <NFTCard key={nft.metadata.id} nft={nft} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

import { useContract, useDirectListings } from "@thirdweb-dev/react";
import { MARKETPLACE_ADDRESS } from "../const/contractAddresses";
import Navbar from "../components/Navbar";
import NFTCard from "../components/NFTCard";

export default function Home() {
  // اتصال به قرارداد Marketplace V3
  const { contract } = useContract(MARKETPLACE_ADDRESS, "marketplace-v3");
  
  // فراخوانی لیست فروش‌های فعال (Direct Listings)
  const { data: listings, isLoading } = useDirectListings(contract);

  return (
    <div>
      <Navbar />
      <main style={{ maxWidth: "1200px", margin: "0 auto", padding: "40px 20px" }}>
        <h1 style={{ marginBottom: "30px" }}>Marketplace v3 Listings</h1>
        
        {isLoading ? (
          <div style={{ textAlign: "center", marginTop: "50px" }}>
            <p>در حال فراخوانی لیست فروش‌ها...</p>
          </div>
        ) : (
          <div style={{ 
            display: "grid", 
            gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))", 
            gap: "25px" 
          }}>
            {listings?.map((listing) => (
              <NFTCard key={listing.id} nft={listing} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

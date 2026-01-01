import { useAddress, useContract, useOwnedNFTs, Web3Button } from "@thirdweb-dev/react";
import { MARKETPLACE_ADDRESS, CLIENT_ID } from "../const/contractAddresses";
import Navbar from "../components/Navbar";
import { useState } from "react";

export default function Sell() {
  const address = useAddress();
  const { contract: marketplace } = useContract(MARKETPLACE_ADDRESS, "marketplace-v3");
  const [price, setPrice] = useState("");

  // نمایش ان‌اف‌تی‌های موجود در ولت کاربر برای فروش
  // نکته: اینجا باید آدرس قرارداد کلکسیون هم اضافه شود، فعلاً از مارکت‌پلیس دیتا می‌گیرد
  const { data: ownedNFTs, isLoading } = useOwnedNFTs(marketplace, address);

  return (
    <div style={{ backgroundColor: "#0a0a0a", minHeight: "100vh", color: "white" }}>
      <Navbar />
      <main style={{ maxWidth: "1000px", margin: "0 auto", padding: "40px 20px" }}>
        <h1 style={{ fontSize: "2.5rem", marginBottom: "10px" }}>List Item for Sale</h1>
        <p style={{ color: "#888", marginBottom: "40px" }}>انتخاب کنید کدام ان‌اف‌تی را می‌خواهید برای فروش بگذارید.</p>
        
        {!address ? (
          <div style={{ textAlign: "center", padding: "50px", border: "1px dashed #333" }}>
            <p>لطفاً ابتدا ولت خود را متصل کنید تا دارایی‌های شما نمایش داده شود.</p>
          </div>
        ) : isLoading ? (
          <p>در حال اسکن ولت شما برای یافتن NFTها...</p>
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "20px" }}>
            {ownedNFTs?.map((nft) => (
              <div key={nft.metadata.id} className="nft-card" style={{ background: "#1a1a1a", padding: "20px", borderRadius: "15px" }}>
                <img src={nft.metadata.image} style={{ width: "100%", borderRadius: "10px" }} alt="NFT" />
                <h3 style={{ marginTop: "15px" }}>{nft.metadata.name}</h3>
                
                <div style={{ marginTop: "20px" }}>
                  <label style={{ display: "block", marginBottom: "8px", fontSize: "0.9rem", color: "#aaa" }}>Set Price (Native Token)</label>
                  <input 
                    type="number" 
                    placeholder="0.05" 
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    style={{ 
                      width: "100%", padding: "12px", borderRadius: "8px", 
                      background: "#000", border: "1px solid #333", color: "#fff",
                      marginBottom: "15px"
                    }}
                  />

                  <Web3Button
                    contractAddress={MARKETPLACE_ADDRESS}
                    action={async (contract) => {
                      await contract.directListings.createListing({
                        assetContractAddress: nft.owner, 
                        tokenId: nft.metadata.id,
                        pricePerToken: price,
                        currencyContractAddress: "0x0000000000000000000000000000000000000000",
                      });
                    }}
                    onSuccess={() => alert("تبریک! آیتم شما با موفقیت در مارکت‌پلیس لیست شد.")}
                    onError={(err) => alert("خطا: " + err.message)}
                  >
                    List Now
                  </Web3Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

import { MediaRenderer } from "@thirdweb-dev/react";
import Link from "next/link";

export default function NFTCard({ nft }) {
  return (
    <div className="nft-card" style={{ padding: "15px", cursor: "pointer" }}>
      <MediaRenderer 
        src={nft.metadata.image} 
        style={{ width: "100%", borderRadius: "10px", aspectRatio: "1/1", objectFit: "cover" }} 
      />
      <div style={{ marginTop: "15px" }}>
        <h3 style={{ margin: "0", fontSize: "1.1rem" }}>{nft.metadata.name}</h3>
        <p style={{ color: "#888", fontSize: "0.8rem", margin: "5px 0" }}>ID: #{nft.metadata.id}</p>
        
        <Link href={`/nft/${nft.owner}/${nft.metadata.id}`}>
          <button style={{
            width: "100%", padding: "12px", marginTop: "10px",
            backgroundColor: "#00ffad", border: "none", borderRadius: "8px",
            fontWeight: "bold", color: "#000", cursor: "pointer"
          }}>
            مشاهده و خرید
          </button>
        </Link>
      </div>
    </div>
  );
}

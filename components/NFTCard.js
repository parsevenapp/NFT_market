import { MediaRenderer, useContract, useDirectListing } from "@thirdweb-dev/react";
import { MARKETPLACE_ADDRESS } from "../const/contractAddresses";
import Link from "next/link";
import styles from "../styles/Home.module.css";

export default function NFTCard({ nft }) {
  const { contract } = useContract(MARKETPLACE_ADDRESS, "marketplace-v3");

  return (
    <div className="nft-card" style={{ padding: "15px" }}>
      <MediaRenderer src={nft.metadata.image} className="nft-image" />
      
      <div style={{ marginTop: "15px" }}>
        <h3 style={{ margin: "0 0 5px 0" }}>{nft.metadata.name}</h3>
        <p style={{ color: "#888", fontSize: "0.8rem" }}>Token ID: #{nft.metadata.id}</p>
        
        <Link href={`/nft/${nft.owner}/${nft.metadata.id}`}>
          <button style={{
            width: "100%",
            padding: "10px",
            marginTop: "10px",
            backgroundColor: "#00ffad",
            border: "none",
            borderRadius: "8px",
            fontWeight: "bold",
            color: "#000"
          }}>
            View Details
          </button>
        </Link>
      </div>
    </div>
  );
}

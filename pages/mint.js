import { Web3Button } from "@thirdweb-dev/react";
import { MARKETPLACE_ADDRESS } from "../const/contractAddresses";
import Navbar from "../components/Navbar";
import styles from "../styles/Home.module.css";
import { useState } from "react";

export default function Mint() {
  const [name, setName] = useState("");
  const [image, setImage] = useState("");

  return (
    <div className={styles.container}>
      <Navbar />
      <main className={styles.main}>
        <h1 className={styles.title}>Create NFT</h1>
        <div style={{ display: "flex", flexDirection: "column", gap: "10px", width: "100%", maxWidth: "400px" }}>
          <input 
            className="nft-card" 
            style={{ padding: "15px", background: "#111", color: "#fff", border: "1px solid #333" }}
            placeholder="Name..." 
            onChange={(e) => setName(e.target.value)} 
          />
          <input 
            className="nft-card" 
            style={{ padding: "15px", background: "#111", color: "#fff", border: "1px solid #333" }}
            placeholder="Image URL..." 
            onChange={(e) => setImage(e.target.value)} 
          />
          <Web3Button
            contractAddress={MARKETPLACE_ADDRESS}
            action={(contract) => contract.erc721.mint({ name, image })}
            onSuccess={() => alert("موفقیت‌آمیز بود!")}
          >
            Mint NFT
          </Web3Button>
        </div>
      </main>
    </div>
  );
}

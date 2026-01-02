import { Web3Button, useStorageUpload } from "@thirdweb-dev/react";
import { MARKETPLACE_ADDRESS } from "../const/contractAddresses";
import Navbar from "../components/Navbar";
import styles from "../styles/Home.module.css";
import { useState } from "react";

export default function Mint() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState(null);
  const { mutateAsync: upload } = useStorageUpload();

  return (
    <div className={styles.container}>
      <Navbar />
      <main className={styles.main}>
        <h1 className={styles.title}>Create Your NFT</h1>
        <p className={styles.description}>Upload an image to mint it as an NFT on the blockchain.</p>
        
        <div className={styles.inputGroup}>
          {/* انتخابگر فایل */}
          <div style={{ border: "2px dashed #333", padding: "2rem", borderRadius: "12px", textAlign: "center", cursor: "pointer" }}>
             <input 
               type="file" 
               accept="image/*"
               onChange={(e) => setFile(e.target.files[0])}
               style={{ width: "100%" }} 
             />
             <p style={{ marginTop: "10px", color: "#666" }}>{file ? file.name : "Click to select image"}</p>
          </div>

          <input 
            className={styles.inputField}
            placeholder="Name of NFT" 
            value={name}
            onChange={(e) => setName(e.target.value)} 
          />
          
          <textarea 
            className={styles.inputField}
            placeholder="Description..." 
            rows="4"
            value={description}
            onChange={(e) => setDescription(e.target.value)} 
          />

          <Web3Button
            contractAddress={MARKETPLACE_ADDRESS}
            action={async (contract) => {
              // 1. اول عکس آپلود می‌شود
              const uris = await upload({ data: [file] });
              // 2. بعد NFT ساخته می‌شود
              await contract.erc721.mint({
                name: name,
                description: description,
                image: uris[0],
              });
            }}
            onSuccess={() => alert("NFT Created Successfully!")}
            onError={(error) => alert("Error: " + error.message)}
          >
            Mint NFT
          </Web3Button>
        </div>
      </main>
    </div>
  );
}

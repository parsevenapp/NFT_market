import { useState } from "react";
import { 
  useContract, 
  Web3Button, 
  useStorageUpload 
} from "@thirdweb-dev/react";
import styles from "../styles/Home.module.css";

const CONTRACT_ADDRESS = "0xa01C729Ee0Ee812faFa0096D2ccEA8D6e1De6ECb"; 

export default function Mint() {
  const { contract } = useContract(CONTRACT_ADDRESS);
  const { mutateAsync: upload } = useStorageUpload();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setPreview(URL.createObjectURL(selectedFile));
    }
  };

  return (
    <div className={styles.main}>
      <h1 className={styles.title}>Create Your NFT</h1>
      <p className={styles.description}>Upload an image to mint it on Polygon</p>

      <div className={styles.card} style={{ 
        width: "100%", 
        maxWidth: "400px", 
        padding: "20px", 
        background: "#111", 
        borderRadius: "15px",
        margin: "0 auto" 
      }}>
        
        <div 
          onClick={() => document.getElementById("fileInput").click()}
          style={{
            border: "2px dashed #333",
            borderRadius: "10px",
            height: "220px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            overflow: "hidden",
            marginBottom: "20px",
            background: "#050505"
          }}
        >
          {preview ? (
            <img src={preview} alt="Preview" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          ) : (
            <div style={{ textAlign: "center" }}>
              <p style={{ color: "#555", fontSize: "0.9rem" }}>Select Image</p>
            </div>
          )}
        </div>

        <input 
          id="fileInput"
          type="file" 
          accept="image/*" 
          onChange={handleFileChange} 
          style={{ display: "none" }} 
        />

        <input
          type="text"
          placeholder="NFT Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={{ 
            width: "100%", 
            marginBottom: "15px", 
            padding: "12px", 
            borderRadius: "8px", 
            background: "#222", 
            color: "#fff", 
            border: "1px solid #333",
            outline: "none"
          }}
        />

        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          style={{ 
            width: "100%", 
            marginBottom: "20px", 
            padding: "12px", 
            borderRadius: "8px", 
            background: "#222", 
            color: "#fff", 
            border: "1px solid #333", 
            minHeight: "80px",
            outline: "none",
            resize: "none"
          }}
        />

        <Web3Button
          contractAddress={CONTRACT_ADDRESS}
          action={async (contract) => {
            if (!file || !name) return;
            try {
              const uris = await upload({ data: [file] });
              
              await contract.erc721.mint({
                name: name,
                description: description,
                image: uris[0], 
              });

              setName("");
              setDescription("");
              setFile(null);
              setPreview(null);
            } catch (error) {
              console.error(error);
            }
          }}
          theme="dark"
        >
          Mint NFT
        </Web3Button>
      </div>
    </div>
  );
}

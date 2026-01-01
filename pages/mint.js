import { Web3Button, useContract } from "@thirdweb-dev/react";
import { MARKETPLACE_ADDRESS } from "../const/contractAddresses";
import Navbar from "../components/Navbar";
import { useState } from "react";

export default function Mint() {
  const { contract } = useContract(MARKETPLACE_ADDRESS, "marketplace-v3");
  const [name, setName] = useState("");
  const [image, setImage] = useState("");

  return (
    <div>
      <Navbar />
      <main style={{ maxWidth: "600px", margin: "0 auto", padding: "40px" }}>
        <h1>Create New NFT</h1>
        <input 
          type="text" 
          placeholder="NFT Name" 
          onChange={(e) => setName(e.target.value)}
          style={{ width: "100%", padding: "10px", margin: "10px 0", background: "#111", color: "#fff", border: "1px solid #333" }}
        />
        <input 
          type="text" 
          placeholder="Image URL" 
          onChange={(e) => setImage(e.target.value)}
          style={{ width: "100%", padding: "10px", margin: "10px 0", background: "#111", color: "#fff", border: "1px solid #333" }}
        />
        
        <Web3Button
          contractAddress={MARKETPLACE_ADDRESS}
          action={(contract) => contract.erc721.mint({
            name: name,
            image: image,
          })}
          onSuccess={() => alert("NFT Minted Successfully!")}
        >
          Mint NFT
        </Web3Button>
      </main>
    </div>
  );
}

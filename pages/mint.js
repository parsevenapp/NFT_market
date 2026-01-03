import { useState } from "react";
import { useContract, Web3Button, useStorageUpload } from "@thirdweb-dev/react";
import { MARKETPLACE_ADDRESS } from "../const/contractAddresses";

export default function Mint() {
  // اضافه کردن نوع قرارداد برای جلوگیری از ارور undefined
  const { contract } = useContract(MARKETPLACE_ADDRESS, "marketplace-v3");
  const { mutateAsync: upload } = useStorageUpload();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState(null);

  return (
    <div style={{ padding: "20px", color: "white", background: "#000", minHeight: "100vh" }}>
      <h1>Create NFT</h1>
      
      <input 
        type="file" 
        accept="image/*" 
        onChange={(e) => setFile(e.target.files[0])} 
        style={{ marginBottom: "20px", display: "block" }}
      />

      <input
        type="text"
        placeholder="NFT Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        style={{ width: "100%", padding: "12px", marginBottom: "10px", background: "#111", color: "#fff", border: "1px solid #333" }}
      />

      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        style={{ width: "100%", padding: "12px", marginBottom: "20px", background: "#111", color: "#fff", border: "1px solid #333", minHeight: "100px" }}
      />

      <Web3Button
        contractAddress={MARKETPLACE_ADDRESS}
        action={async () => {
          if (!file) return alert("Please select an image!");
          if (!contract) return alert("Contract is loading, please wait...");

          // 1. Upload to IPFS
          const uris = await upload({ data: [file] });
          
          // 2. Direct Minting - اصلاح منطق برای رفع ارور undefined
          await contract.roles.verifyAction("minter", await contract.getAddress());
          await contract.erc721.mint({
            name: name,
            description: description,
            image: uris[0],
          });
        }}
        onSuccess={() => alert("Success! NFT Minted.")}
        onError={(err) => alert("Error: " + err.message)}
      >
        Mint NFT
      </Web3Button>
    </div>
  );
}

import { useState } from "react";
import { useContract, Web3Button, useStorageUpload } from "@thirdweb-dev/react";
import { MARKETPLACE_ADDRESS } from "../const/contractAddresses";

export default function Mint() {
  const { contract } = useContract(MARKETPLACE_ADDRESS, "marketplace-v3");
  const { mutateAsync: upload } = useStorageUpload();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState(null);

  return (
    <div style={{ padding: "20px", color: "white", background: "#000" }}>
      <h1>Create NFT</h1>
      
      <input type="file" onChange={(e) => setFile(e.target.files[0])} style={{ marginBottom: "15px" }} />

      <input
        type="text"
        placeholder="NFT Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        style={{ width: "100%", padding: "10px", marginBottom: "10px", background: "#222", color: "#fff" }}
      />

      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        style={{ width: "100%", padding: "10px", marginBottom: "20px", background: "#222", color: "#fff", minHeight: "80px" }}
      />

      <Web3Button
        contractAddress={MARKETPLACE_ADDRESS}
        action={async () => {
          if (!file) return alert("Select an image!");
          const uris = await upload({ data: [file] });
          await contract.erc721.mint({
            name: name,
            description: description,
            image: uris[0],
          });
        }}
        onSuccess={() => alert("Success!")}
        onError={(err) => alert("Error: " + err.message)}
      >
        Mint NFT
      </Web3Button>
    </div>
  );
}

import { useState } from "react";
import { useContract, Web3Button, useStorageUpload } from "@thirdweb-dev/react";
import { MARKETPLACE_ADDRESS } from "../const/contractAddresses";

export default function Mint() {
  const { contract } = useContract(MARKETPLACE_ADDRESS, "marketplace-v3");
  const { mutateAsync: upload } = useStorageUpload();

  const [name, setName] = useState("");
  const [file, setFile] = useState(null);

  return (
    <div style={{ padding: "20px", color: "white", background: "#000" }}>
      <h1>Create NFT</h1>
      
      {/* دکمه انتخاب از گالری */}
      <input 
        type="file" 
        accept="image/*" 
        onChange={(e) => setFile(e.target.files[0])}
        style={{ marginBottom: "20px" }}
      />

      <input
        type="text"
        placeholder="NFT Name"
        onChange={(e) => setName(e.target.value)}
        style={{ display: "block", width: "100%", padding: "10px", marginBottom: "20px" }}
      />

      <Web3Button
        contractAddress={MARKETPLACE_ADDRESS}
        action={async () => {
          if (!file) return alert("لطفاً ابتدا عکس را انتخاب کنید");
          
          // ۱. آپلود عکس به IPFS (نیاز به سکرت کی دارد)
          const uris = await upload({ data: [file] });
          
          // ۲. مینت کردن در مارکت‌پلیس V3
          await contract.erc721.mint({
            name: name,
            image: uris[0],
          });
        }}
        onSuccess={() => alert("تبریک! مینت با موفقیت انجام شد.")}
        onError={(err) => alert("خطا: " + err.message)}
      >
        Mint NFT
      </Web3Button>
    </div>
  );
}

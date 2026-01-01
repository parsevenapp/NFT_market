import { useContract, useNFT } from "@thirdweb-dev/react";
import { useRouter } from "next/router";
import Navbar from "../../../components/Navbar";

export default function NFTDetails() {
  const router = useRouter();
  const { address, id } = router.query;
  const { contract } = useContract(address);
  const { data: nft, isLoading } = useNFT(contract, id);

  return (
    <div>
      <Navbar />
      <main style={{ maxWidth: "1200px", margin: "0 auto", padding: "40px" }}>
        {isLoading ? (
          <p>Loading NFT Details...</p>
        ) : (
          <div style={{ display: "flex", gap: "50px" }}>
            <img src={nft?.metadata.image} style={{ width: "500px", borderRadius: "20px" }} />
            <div>
              <h1>{nft?.metadata.name}</h1>
              <p style={{ color: "#888" }}>Owned by: {nft?.owner}</p>
              <div style={{ marginTop: "30px", padding: "20px", background: "#111", borderRadius: "10px" }}>
                <h3>Description</h3>
                <p>{nft?.metadata.description || "توضیحاتی برای این محصول ثبت نشده است."}</p>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

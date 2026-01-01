import { useContract, useNFT, MediaRenderer } from "@thirdweb-dev/react";
import { useRouter } from "next/router";
import Navbar from "../../../components/Navbar"; // اصلاح مسیر
import styles from "../../../styles/Home.module.css"; // اصلاح مسیر

export default function NFTDetails() {
  const router = useRouter();
  const { address, id } = router.query;
  const { contract } = useContract(address);
  const { data: nft, isLoading } = useNFT(contract, id);

  return (
    <div className={styles.container}>
      <Navbar />
      <main className={styles.main}>
        {isLoading ? <p>Loading...</p> : (
          <div style={{ display: "flex", gap: "40px", flexWrap: "wrap", justifyContent: "center" }}>
            <MediaRenderer src={nft?.metadata.image} style={{ width: "400px", borderRadius: "20px" }} />
            <div style={{ maxWidth: "500px" }}>
              <h1 className={styles.title} style={{ textAlign: "left" }}>{nft?.metadata.name}</h1>
              <p>Owner: {nft?.owner.slice(0,6)}...</p>
              <p style={{ color: "#888" }}>{nft?.metadata.description}</p>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

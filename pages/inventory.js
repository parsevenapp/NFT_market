import { useAddress, useContract, useOwnedNFTs, ThirdwebNftMedia } from "@thirdweb-dev/react";
import styles from "../styles/Home.module.css";

const CONTRACT_ADDRESS = "0xa01C729Ee0Ee812faFa0096D2ccEA8D6e1De6ECb";

export default function Inventory() {
  const address = useAddress();
  const { contract } = useContract(CONTRACT_ADDRESS);
  const { data: ownedNFTs, isLoading } = useOwnedNFTs(contract, address);

  return (
    <div className={styles.main}>
      <h1 className={styles.title}>Your Inventory</h1>
      <p className={styles.description}>Manage the NFTs you own on Polygon</p>

      {!address ? (
        <p>Please connect your wallet to see your NFTs.</p>
      ) : isLoading ? (
        <p>Loading your collection...</p>
      ) : ownedNFTs?.length === 0 ? (
        <p>No NFTs found in this wallet.</p>
      ) : (
        <div className={styles.grid}>
          {ownedNFTs.map((nft) => (
            <div key={nft.metadata.id} className={styles.card}>
              <ThirdwebNftMedia 
                metadata={nft.metadata} 
                style={{ width: "100%", borderRadius: "10px", height: "200px", objectFit: "cover" }} 
              />
              <h3 style={{ marginTop: "10px", color: "#fff" }}>{nft.metadata.name}</h3>
              <p style={{ fontSize: "0.8rem", color: "#888" }}>ID: #{nft.metadata.id}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

import { useAddress, useContract, useOwnedNFTs } from "@thirdweb-dev/react";
import { MARKETPLACE_ADDRESS } from "../const/contractAddresses";
import Navbar from "../components/Navbar";
import NFTCard from "../components/NFTCard";
import styles from "../styles/Home.module.css";

export default function Sell() {
  const address = useAddress();
  const { contract } = useContract(MARKETPLACE_ADDRESS, "marketplace-v3");
  const { data: ownedNFTs, isLoading } = useOwnedNFTs(contract, address);

  return (
    <div className={styles.container}>
      <Navbar />
      <main className={styles.main}>
        <h1 className={styles.title}>List Your NFT</h1>
        <p className={styles.description}>ان‌اف‌تی مورد نظر را برای فروش انتخاب کنید</p>
        
        <div className={styles.grid}>
          {isLoading ? (
            <p>در حال جستجوی ولت...</p>
          ) : (
            ownedNFTs?.map((nft) => (
              <NFTCard key={nft.metadata.id} nft={nft} />
            ))
          )}
        </div>
      </main>
    </div>
  );
}

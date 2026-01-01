import { useContract, useDirectListings } from "@thirdweb-dev/react";
import { MARKETPLACE_ADDRESS } from "../const/contractAddresses";
import Navbar from "../components/Navbar";
import NFTCard from "../components/NFTCard";
import styles from "../styles/Home.module.css"; // اتصال به استایل جدید

export default function Home() {
  const { contract } = useContract(MARKETPLACE_ADDRESS, "marketplace-v3");
  const { data: listings, isLoading } = useDirectListings(contract);

  return (
    <div className={styles.container}>
      <Navbar />
      <main className={styles.main}>
        <h1 className={styles.title}>Cosmic Marketplace</h1>
        <p className={styles.description}>خرید و فروش امن NFT در شبکه‌های بلاک‌چین</p>

        <div className={styles.grid}>
          {isLoading ? (
            <p>در حال بارگذاری محصولات...</p>
          ) : (
            listings?.map((listing) => (
              <NFTCard key={listing.id} nft={listing.asset} />
            ))
          )}
        </div>
      </main>
    </div>
  );
}

import { useContract, useContractEvents } from "@thirdweb-dev/react"; // تغییر نام تابع
import { MARKETPLACE_ADDRESS } from "../const/contractAddresses";
import Navbar from "../components/Navbar";
import styles from "../styles/Home.module.css";

export default function Transactions() {
  const { contract } = useContract(MARKETPLACE_ADDRESS, "marketplace-v3");
  
  // استفاده از تابع جدید برای خواندن رویدادهای فروش
  const { data: events, isLoading } = useContractEvents(contract, "NewSale");

  return (
    <div className={styles.container}>
      <Navbar />
      <main className={styles.main}>
        <h1 className={styles.title}>History</h1>
        {isLoading ? (
          <p>در حال دریافت تاریخچه تراکنش‌ها...</p>
        ) : (
          <div style={{ width: "100%", maxWidth: "800px", marginTop: "20px" }}>
            {events?.map((event, index) => (
              <div key={index} style={{ 
                padding: "15px", 
                borderBottom: "1px solid #222", 
                display: "flex", 
                justifyContent: "space-between" 
              }}>
                <span>Listing ID: {event.data.listingId.toString()}</span>
                <span style={{ color: "#00ffad" }}>{event.data.totalPricePaid.toString()} ETH</span>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

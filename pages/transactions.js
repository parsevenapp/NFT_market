import { useContract, useEvents } from "@thirdweb-dev/react";
import { MARKETPLACE_ADDRESS } from "../const/contractAddresses";
import Navbar from "../components/Navbar";

export default function Transactions() {
  const { contract } = useContract(MARKETPLACE_ADDRESS, "marketplace-v3");
  
  // فراخوانی رویدادهای خرید و فروش از قرارداد Marketplace V3
  const { data: events, isLoading } = useEvents(contract, "NewSale");

  return (
    <div>
      <Navbar />
      <main style={{ maxWidth: "1000px", margin: "0 auto", padding: "40px 20px" }}>
        <h1>Transaction History</h1>
        {isLoading ? (
          <p>در حال استخراج تاریخچه تراکنش‌ها از بلاک‌چین...</p>
        ) : (
          <table style={{ width: "100%", borderCollapse: "collapse", marginTop: "20px" }}>
            <thead>
              <tr style={{ borderBottom: "1px solid #333", textAlign: "left" }}>
                <th style={{ padding: "10px" }}>Listing ID</th>
                <th style={{ padding: "10px" }}>Buyer</th>
                <th style={{ padding: "10px" }}>Price</th>
              </tr>
            </thead>
            <tbody>
              {events?.map((event, index) => (
                <tr key={index} style={{ borderBottom: "1px solid #222" }}>
                  <td style={{ padding: "10px" }}>{event.data.listingId.toString()}</td>
                  <td style={{ padding: "10px" }}>{event.data.buyer.slice(0, 6)}...{event.data.buyer.slice(-4)}</td>
                  <td style={{ padding: "10px" }}>{event.data.totalPricePaid.toString()} ETH</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </main>
    </div>
  );
}

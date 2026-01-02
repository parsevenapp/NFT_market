import { useContract, useContractEvents } from "@thirdweb-dev/react";
import styles from "../styles/Home.module.css";

const CONTRACT_ADDRESS = "0xa01C729Ee0Ee812faFa0096D2ccEA8D6e1De6ECb";

export default function History() {
  const { contract } = useContract(CONTRACT_ADDRESS);
  // دریافت تمام رویدادهای انتقال (Transfer)
  const { data: events, isLoading } = useContractEvents(contract, "Transfer");

  return (
    <div className={styles.main}>
      <h1 className={styles.title}>Transaction History</h1>
      <p className={styles.description}>Recent activity on your Marketplace</p>

      {isLoading ? (
        <p>Loading history...</p>
      ) : (
        <div style={{ width: "100%", overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", background: "#111", borderRadius: "10px" }}>
            <thead>
              <tr style={{ borderBottom: "1px solid #333", color: "#00ffad", textAlign: "left" }}>
                <th style={{ padding: "15px" }}>Event</th>
                <th style={{ padding: "15px" }}>Token ID</th>
                <th style={{ padding: "15px" }}>From</th>
                <th style={{ padding: "15px" }}>To</th>
              </tr>
            </thead>
            <tbody>
              {events?.slice(0, 10).map((event, index) => (
                <tr key={index} style={{ borderBottom: "1px solid #222", color: "#aaa", fontSize: "0.85rem" }}>
                  <td style={{ padding: "15px" }}>Transfer</td>
                  <td style={{ padding: "15px" }}>#{event.data.tokenId.toString()}</td>
                  <td style={{ padding: "15px" }}>{event.data.from.slice(0, 6)}...</td>
                  <td style={{ padding: "15px" }}>{event.data.to.slice(0, 6)}...</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

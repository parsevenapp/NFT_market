import { ConnectWallet } from "@thirdweb-dev/react";
import styles from "../styles/Home.module.css"; // بعداً استایل را فیکس می‌کنیم

export default function Navbar() {
  return (
    <nav style={{ 
      display: "flex", 
      justifyContent: "space-between", 
      padding: "1rem 2rem", 
      alignItems: "center",
      borderBottom: "1px solid #333" 
    }}>
      <h1 style={{ fontSize: "1.5rem", fontWeight: "bold" }}>Cosmic Market</h1>
      
      {/* دکمه اتصال ولت با پشتیبانی از چند شبکه */}
      <ConnectWallet 
        theme="dark"
        btnTitle="Connect Wallet"
        modalTitle="Select Your Network"
        modalSize="compact"
      />
    </nav>
  );
}

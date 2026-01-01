import { ConnectWallet } from "@thirdweb-dev/react";
import Link from "next/link";
import styles from "../styles/Home.module.css";

export default function Navbar() {
  return (
    <nav style={{ 
      display: "flex", 
      justifyContent: "space-between", 
      padding: "1rem 2rem", 
      alignItems: "center",
      borderBottom: "1px solid #222",
      backgroundColor: "#000",
      position: "sticky",
      top: 0,
      zIndex: 1000
    }}>
      {/* لوگو و لینک‌های اصلی */}
      <div style={{ display: "flex", alignItems: "center", gap: "25px" }}>
        <Link href="/" style={{ fontSize: "1.4rem", fontWeight: "bold", color: "#fff", textDecoration: "none" }}>
          Cosmic Market
        </Link>
        
        <div style={{ display: "flex", gap: "15px", fontSize: "0.9rem" }}>
          <Link href="/" style={{ color: "#aaa", textDecoration: "none" }}>Market</Link>
          <Link href="/mint" style={{ color: "#aaa", textDecoration: "none" }}>Mint</Link>
          <Link href="/sell" style={{ color: "#aaa", textDecoration: "none" }}>Sell</Link>
          <Link href="/inventory" style={{ color: "#aaa", textDecoration: "none" }}>Inventory</Link>
          <Link href="/transactions" style={{ color: "#aaa", textDecoration: "none" }}>History</Link>
        </div>
      </div>

      {/* بخش پروفایل و دکمه اتصال */}
      <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
        <Link href="/profile" style={{ color: "#00ffad", textDecoration: "none", fontSize: "0.9rem" }}>
          My Profile
        </Link>
        <ConnectWallet 
          theme="dark"
          btnTitle="Connect"
          className="my-connect-button"
        />
      </div>
    </nav>
  );
}

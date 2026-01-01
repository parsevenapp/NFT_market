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
      {/* بخش سمت چپ: لوگو و لینک‌های اصلی بازار */}
      <div style={{ display: "flex", alignItems: "center", gap: "25px" }}>
        <Link href="/" style={{ fontSize: "1.4rem", fontWeight: "bold", color: "#fff", textDecoration: "none" }}>
          Cosmic Market
        </Link>
        
        <div style={{ display: "flex", gap: "15px", fontSize: "0.9rem" }}>
          <Link href="/" style={{ color: "#aaa", textDecoration: "none" }}>Market</Link>
          <Link href="/mint" style={{ color: "#aaa", textDecoration: "none" }}>Mint</Link>
          <Link href="/sell" style={{ color: "#aaa", textDecoration: "none" }}>Sell</Link>
          <Link href="/transactions" style={{ color: "#aaa", textDecoration: "none" }}>History</Link>
        </div>
      </div>

      {/* بخش سمت راست: انبار و پروفایل کاربر */}
      <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
        <Link href="/inventory" style={{ color: "#aaa", textDecoration: "none", fontSize: "0.9rem" }}>
          Inventory
        </Link>
        <Link href="/profile" style={{ 
          color: "#00ffad", 
          textDecoration: "none", 
          fontSize: "0.9rem",
          border: "1px solid #00ffad",
          padding: "5px 12px",
          borderRadius: "20px"
        }}>
          My Profile
        </Link>
        <ConnectWallet 
          theme="dark"
          btnTitle="Connect"
        />
      </div>
    </nav>
  );
}

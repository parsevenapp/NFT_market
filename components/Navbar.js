import { ConnectWallet, useAddress } from "@thirdweb-dev/react";
import Link from "next/link";
import styles from "../styles/Home.module.css";

export default function Navbar() {
  const address = useAddress();

  return (
    <nav style={{
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "1rem 5%",
      background: "rgba(0,0,0,0.9)",
      borderBottom: "1px solid #222",
      position: "sticky",
      top: 0,
      zIndex: 1000,
      backdropFilter: "blur(10px)"
    }}>
      {/* لوگو */}
      <Link href="/" style={{ fontSize: "1.5rem", fontWeight: "bold", background: "linear-gradient(to right, #fff, #aaa)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
        Cosmic
      </Link>

      {/* منوی وسط - با قابلیت اسکرول افقی در موبایل */}
      <div style={{
        display: "flex",
        gap: "20px",
        overflowX: "auto",
        padding: "0 10px",
        maxWidth: "60%" // جلوگیری از برخورد با دکمه ولت
      }}>
        <Link href="/" style={{ color: "#ccc", whiteSpace: "nowrap" }}>Market</Link>
        <Link href="/mint" style={{ color: "#ccc", whiteSpace: "nowrap" }}>Mint</Link>
        <Link href="/sell" style={{ color: "#ccc", whiteSpace: "nowrap" }}>Sell</Link>
        <Link href="/inventory" style={{ color: "#ccc", whiteSpace: "nowrap" }}>Inventory</Link>
        <Link href="/transactions" style={{ color: "#ccc", whiteSpace: "nowrap" }}>History</Link>
      </div>

      {/* دکمه‌های سمت راست */}
      <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
        {address && (
           <Link href="/profile" style={{ 
             display: "none", // در موبایل خیلی کوچک مخفی شود تا جا باشد
             border: "1px solid #333", 
             padding: "8px 12px", 
             borderRadius: "12px",
             fontSize: "0.85rem",
             color: "#fff"
           }}>
             Profile
           </Link>
        )}
        <ConnectWallet theme="dark" btnTitle="Connect" modalSize="compact" />
      </div>
    </nav>
  );
}

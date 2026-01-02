import { ConnectWallet, useAddress } from "@thirdweb-dev/react";
import Link from "next/link";

export default function Navbar() {
  const address = useAddress();

  return (
    <nav style={{
      display: "flex", 
      justifyContent: "space-between", 
      alignItems: "center",
      padding: "1rem 5%", 
      background: "#000", 
      borderBottom: "1px solid #222",
      width: "100%", 
      position: "sticky", 
      top: 0, 
      zIndex: 1000, 
      flexWrap: "wrap"
    }}>
      <Link href="/" style={{ fontSize: "1.4rem", fontWeight: "bold", color: "#fff", textDecoration: "none" }}>
        Cosmic
      </Link>

      <div style={{ display: "flex", gap: "15px", flexWrap: "wrap", justifyContent: "center", margin: "10px 0" }}>
        <Link href="/" style={{ color: "#aaa", textDecoration: "none", fontSize: "0.9rem" }}>Market</Link>
        <Link href="/mint" style={{ color: "#aaa", textDecoration: "none", fontSize: "0.9rem" }}>Mint</Link>
        <Link href="/sell" style={{ color: "#aaa", textDecoration: "none", fontSize: "0.9rem" }}>Sell</Link>
        <Link href="/inventory" style={{ color: "#aaa", textDecoration: "none", fontSize: "0.9rem" }}>Inventory</Link>
        <Link href="/transactions" style={{ color: "#aaa", textDecoration: "none", fontSize: "0.9rem" }}>History</Link>
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
        {address && (
          <Link href="/profile" style={{ 
            color: "#00ffad", 
            border: "1px solid #00ffad", 
            padding: "5px 12px", 
            borderRadius: "15px", 
            textDecoration: "none", 
            fontSize: "0.8rem" 
          }}>
            Profile
          </Link>
        )}
        <ConnectWallet theme="dark" btnTitle="Connect" modalSize="compact" />
      </div>
    </nav>
  );
}

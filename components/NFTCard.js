import styles from "../styles/Home.module.css";

export default function NFTCard({ nft }) {
  return (
    <div className="nft-card">
      <img 
        src={nft.metadata.image} 
        alt={nft.metadata.name} 
        className="nft-image" 
      />
      <div style={{ padding: "10px 0" }}>
        <h3 style={{ margin: "5px 0", fontSize: "1.1rem" }}>{nft.metadata.name}</h3>
        <p style={{ color: "#888", fontSize: "0.8rem" }}>Token ID: #{nft.metadata.id}</p>
        
        {/* این دکمه در مرحله ۳.۳ به تابع خرید وصل می‌شود */}
        <button style={{
          width: "100%",
          marginTop: "15px",
          padding: "10px",
          borderRadius: "8px",
          border: "none",
          backgroundColor: "#fff",
          color: "#000",
          fontWeight: "bold",
          cursor: "pointer"
        }}>
          Buy Now
        </button>
      </div>
    </div>
  );
}

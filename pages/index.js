import { useContract, useNFTs } from "@thirdweb-dev/react";
import styles from "../styles/globals.css";

const MARKETPLACE_ADDRESS = "0xa01C729Ee0Ee812faFa0096D2ccEA8D6e1De6ECb";

export default function Home() {
  const { contract } = useContract(MARKETPLACE_ADDRESS);
  const { data: nfts, isLoading } = useNFTs(contract);

  return (
    <div className="container">
      <nav className="navbar">
        <div className="logo-section">
          <div className="logo-box"></div>
          <span className="logo-text">فروشگاه NFT</span>
        </div>
        <button className="btn-blue">اتصال کیف پول</button>
      </nav>

      <header className="hero">
        <h1>کشف، جمع‌آوری و فروش NFTهای فوق‌العاده</h1>
        <div className="hero-btns">
          <button className="btn-blue">گشت و گذار</button>
          <button className="btn-outline">ساخت NFT</button>
        </div>
      </header>

      <section className="nft-section">
        <h2>NFTهای جدید</h2>
        <div className="nft-grid">
          {isLoading ? (
            <p>در حال بارگذاری...</p>
          ) : (
            nfts?.map((nft) => (
              <div key={nft.metadata.id} className="nft-card">
                <img src={nft.metadata.image} alt={nft.metadata.name} />
                <div className="nft-info">
                  <p className="nft-name">{nft.metadata.name}</p>
                </div>
              </div>
            ))
          )}
        </div>
      </section>
    </div>
  );
}

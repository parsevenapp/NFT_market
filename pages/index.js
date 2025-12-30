import { ConnectWallet, useContract, useNFTs } from "@thirdweb-dev/react";

// آدرس قراردادی که دادی رو اینجا گذاشتم
const MARKETPLACE_ADDRESS = "A98083f883a97f19e073829656d7fd42";

export default function Home() {
  const { contract } = useContract(MARKETPLACE_ADDRESS);
  const { data: nfts, isLoading } = useNFTs(contract);

  return (
    <div className="container" dir="rtl">
      <nav className="navbar">
        <div className="logo-section">
          <div className="logo-box"></div>
          <span className="logo-text">فروشگاه NFT</span>
        </div>
        <div className="search-box">
          <input type="text" placeholder="جستجوی آیتم‌ها، مجموعه‌ها و حساب‌ها..." />
        </div>
        <ConnectWallet theme="light" btnTitle="اتصال کیف پول" />
      </nav>

      <section className="hero">
        <div className="hero-content">
          <h1>کشف، جمع‌آوری و فروش NFTهای فوق‌العاده</h1>
          <p>اولین و بزرگترین بازار NFT دنیا را تجربه کنید</p>
          <div className="hero-btns">
            <button className="btn-blue">گشت و گذار</button>
            <button className="btn-outline">ساخت NFT</button>
          </div>
        </div>
      </section>

      <main className="nft-section">
        <h2 className="section-title">NFTهای پربازدید</h2>
        {isLoading ? (
          <div className="loading">در حال بارگذاری...</div>
        ) : (
          <div className="nft-grid">
            {nfts?.map((nft) => (
              <div key={nft.metadata.id} className="nft-card">
                <div className="image-container">
                  <img src={nft.metadata.image} alt={nft.metadata.name} />
                </div>
                <div className="nft-info">
                  <p className="nft-name">{nft.metadata.name}</p>
                  <div className="price-row">
                    <div className="price-col">
                      <span className="label">قیمت</span>
                      <span className="value">0.1 ETH</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}


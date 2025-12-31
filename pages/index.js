import { ConnectWallet, useContract, useDirectListings, MediaRenderer } from "@thirdweb-dev/react";

const MARKETPLACE_ADDR = "0xa01C729Ee0Ee812faFa0096D2ccEA8D6e1De6ECb";

export default function Home() {
  const { contract } = useContract(MARKETPLACE_ADDR, "marketplace-v3");
  const { data: listings, isLoading } = useDirectListings(contract);

  return (
    <div className="container">
      <header className="header">
        <h1 className="logo">COSMIC <span>MARKET</span></h1>
        <ConnectWallet theme="dark" />
      </header>

      <main className="main">
        <div className="grid">
          {isLoading ? (
            <p>در حال بارگذاری مارکت‌پلیس...</p>
          ) : (
            listings?.map((listing) => (
              <div key={listing.id} className="card">
                <MediaRenderer src={listing.asset.image} className="nft-image" />
                <div className="info">
                  <h3>{listing.asset.name}</h3>
                  <p>{listing.currencyValuePerToken.displayValue} MATIC</p>
                  <button className="buy-btn">مشاهده جزئیات</button>
                </div>
              </div>
            ))
          )}
        </div>
      </main>
    </div>
  );
}

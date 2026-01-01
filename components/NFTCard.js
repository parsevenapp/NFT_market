import { Web3Button } from "@thirdweb-dev/react";
import { MARKETPLACE_ADDRESS } from "../const/contractAddresses";

export default function NFTCard({ nft }) {
  return (
    <div className="nft-card">
      {/* در مارکت‌پلیس v3، اطلاعات در asset قرار دارد */}
      <img src={nft.asset.image} alt={nft.asset.name} className="nft-image" />
      <div style={{ padding: "10px 0" }}>
        <h3 style={{ margin: "5px 0" }}>{nft.asset.name}</h3>
        <p style={{ color: "#00ffad", fontWeight: "bold" }}>
          Price: {nft.currencyValuePerToken.displayValue} {nft.currencyValuePerToken.symbol}
        </p>

        <Web3Button
          contractAddress={MARKETPLACE_ADDRESS}
          // تابع مخصوص خرید در Marketplace V3
          action={(contract) => contract.directListings.buyFromListing(nft.id, 1)}
          onSuccess={() => alert("خرید با موفقیت انجام شد! NFT به ولت شما منتقل شد.")}
          onError={(err) => alert("خطا در خرید: " + err.message)}
          className="buy-button"
        >
          Buy Now
        </Web3Button>
      </div>
    </div>
  );
}

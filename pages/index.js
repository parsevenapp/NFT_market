import { ConnectWallet, useContract, useDirectListings, MediaRenderer, Web3Button } from "@thirdweb-dev/react";

const CONTRACT_ADDR = "0xa01C729Ee0Ee812faFa0096D2ccEA8D6e1De6ECb";

export default function Home() {
  const { contract } = useContract(CONTRACT_ADDR, "marketplace-v3");
  const { data: listings, isLoading } = useDirectListings(contract);

  return (
    <div className="container">
      <header className="header">
        <h1 className="logo">COSMIC <span>LIVE</span></h1>
        <ConnectWallet theme="dark" btnTitle="Connect Wallet" />
      </header>

      <main className="main">
        <div className="grid">
          {isLoading ? (
            <div className="loading">در حال فراخوانی دیتای مارکت...</div>
          ) : (
            listings?.map((nft) => (
              <div key={nft.id} className="card">
                <MediaRenderer src={nft.asset.image} className="nft-img" />
                <div className="details">
                  <h3>{nft.asset.name}</h3>
                  <p className="price">{nft.currencyValuePerToken.displayValue} MATIC</p>
                  <Web3Button 
                    contractAddress={CONTRACT_ADDR} 
                    action={() => contract.directListings.buyFromListing(nft.id, 1)}
                  >
                    BUY NOW
                  </Web3Button>
                </div>
              </div>
            ))
          )}
        </div>
      </main>
    </div>
  );
}

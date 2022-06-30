import {
  useAddress,
  useDisconnect,
  useMetamask,
  usePack,
  useOwnedNFTs,
  ThirdwebNftMedia,
} from "@thirdweb-dev/react";
import { useState } from "react";
import ERC1155RewardBox from "../components/ERC1155RewardBox";
import ERC20RewardBox from "../components/ERC20RewardBox";
import styles from "../styles/Home.module.css";
import type { NextPage } from "next";
import PackRewardsOutput from "../types/PackRewardsOutput";

const Home: NextPage = () => {
  const address = useAddress();
  const connectWithMetamask = useMetamask();
  const disconnectWallet = useDisconnect();

  const [rewards, setRewards] = useState<PackRewardsOutput>();

  const pack = usePack("0x0Aee160411473f63be2DfF2865E81A1D59636C97");

  const { data: nfts, isLoading } = useOwnedNFTs(pack, address);

  async function open() {
    pack?.interceptor.overrideNextTransaction(() => ({
      gasLimit: 500000,
    }));

    const openedRewards = await pack?.open(0, 1); // 0 is tokenId here

    setRewards(openedRewards as PackRewardsOutput);
    console.log(openedRewards);
  }

  return (
    <div className={styles.container}>
      {address ? (
        <>
          <a onClick={disconnectWallet} className={styles.secondaryButton}>
            Disconnect Wallet
          </a>
          <p>Your address: {address}</p>

          <div className={styles.container} style={{ marginTop: 0 }}>
            <div className={styles.collectionContainer}>
              {!isLoading ? (
                <div className={styles.nftBoxGrid}>
                  {nfts?.map((nft) => (
                    <div
                      className={styles.nftBox}
                      key={nft.metadata.id.toString()}
                    >
                      <ThirdwebNftMedia
                        // @ts-ignore
                        metadata={{
                          ...nft.metadata,
                          // I messed up the metadata for the NFT, so need to remove trailing .png (You don't need this)
                          image: nft?.metadata?.image?.slice(0, -4),
                        }}
                        className={styles.nftMedia}
                      />
                      <h3>{nft.metadata.name}</h3>
                      {/* @ts-ignore */}
                      <p>Quantity: {nft.supply.toNumber()}</p>

                      <button
                        className={`${styles.mainButton} ${styles.spacerBottom}`}
                        onClick={() => open()}
                      >
                        Open
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <p>Loading...</p>
              )}
            </div>

            <hr className={styles.divider} />

            <h2>Opened Rewards</h2>

            {rewards && Object.entries(rewards.erc20Rewards)?.length > 0 && (
              <>
                <h3>ERC-20 Tokens</h3>
                <div className={styles.nftBoxGrid}>
                  {rewards.erc20Rewards.map((reward, i) => (
                    <ERC20RewardBox reward={reward} key={i} />
                  ))}
                </div>
              </>
            )}

            {rewards && Object.entries(rewards.erc1155Rewards)?.length && (
              <>
                <h3>ERC-1155 Tokens</h3>
                <div className={styles.nftBoxGrid}>
                  {rewards.erc1155Rewards.map((reward, i) => (
                    <ERC1155RewardBox reward={reward} key={i} />
                  ))}
                </div>
              </>
            )}
          </div>
        </>
      ) : (
        <button onClick={connectWithMetamask} className={styles.mainButton}>
          Connect Wallet
        </button>
      )}
    </div>
  );
};

export default Home;

import {
  ThirdwebNftMedia,
  useEdition,
  useMetadata,
  useNFT,
  useToken,
} from "@thirdweb-dev/react";
import React from "react";
import styles from "../styles/Home.module.css";

type Props = {
  reward: {
    contractAddress: string;
    tokenId: string;
    quantityPerReward: string;
    totalRewards: string;
  };
};

export default function ERC115RewardBox({ reward }: Props) {
  const edition = useEdition(reward.contractAddress);

  console.log("Reward:", reward);

  const { data } = useNFT(edition, reward.tokenId);

  console.log({ edition, data });

  return (
    <div className={styles.nftBox}>
      {data && (
        <>
          <ThirdwebNftMedia
            // @ts-ignore
            metadata={data?.metadata}
            className={styles.nftMedia}
          />
          <h3>{data?.metadata.name}</h3>
        </>
      )}
    </div>
  );
}

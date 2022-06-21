import { ThirdwebNftMedia, useMetadata, useToken } from "@thirdweb-dev/react";
import React from "react";
import styles from "../styles/Home.module.css";

type Props = {
  reward: {
    contractAddress: string;
    quantityPerReward: string;
    totalRewards: string;
  };
};

export default function ERC20RewardBox({ reward }: Props) {
  const token = useToken(reward.contractAddress);

  const { data } = useMetadata(token);

  console.log({ token, data });

  return (
    <div className={styles.nftBox}>
      {data && (
        <>
          <ThirdwebNftMedia
            // @ts-ignore
            metadata={data}
            className={styles.nftMedia}
          />
          <h3>{data?.name}</h3>
          {/* @ts-ignore */}
          <p>Amount: {reward.quantityPerReward}</p>
        </>
      )}
    </div>
  );
}

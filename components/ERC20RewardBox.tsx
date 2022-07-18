import { ThirdwebNftMedia, useMetadata, useToken } from "@thirdweb-dev/react";
import React from "react";
import styles from "../styles/Home.module.css";

type Props = {
  reward: {
    contractAddress: string;
    quantityPerReward: string | number;
  };
};

export default function ERC20RewardBox({ reward }: Props) {
  const token = useToken(reward.contractAddress);
  const { data } = useMetadata(token);

  return (
    <div className={styles.nftBox}>
      {data && (
        <>
          {/* @ts-ignore */}
          <ThirdwebNftMedia metadata={data} className={styles.nftMedia} />
          <h3>{data?.name}</h3>
          <p>Amount: {reward.quantityPerReward}</p>
        </>
      )}
    </div>
  );
}

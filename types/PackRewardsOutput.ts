type PackRewardsOutput = {
  erc20Rewards: {
    contractAddress: string;
    quantityPerReward: string;
    totalRewards: string;
  }[];
  erc721Rewards: {
    contractAddress: string;
    tokenId: string;
  }[];
  erc1155Rewards: {
    contractAddress: string;
    tokenId: string;
    quantityPerReward: string;
    totalRewards: string;
  }[];
};

export default PackRewardsOutput;

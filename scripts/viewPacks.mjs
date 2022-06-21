import { ThirdwebSDK } from "@thirdweb-dev/sdk";
import dotenv from "dotenv";
dotenv.config();

(async () => {
  const sdk = ThirdwebSDK.fromPrivateKey(process.env.PRIVATE_KEY, "mumbai");

  const pack = sdk.getPack("0x0Aee160411473f63be2DfF2865E81A1D59636C97");

  const packNfts = await pack.getAll();

  const x = await pack.get(0);

  console.log(x.supply.toNumber());
})();

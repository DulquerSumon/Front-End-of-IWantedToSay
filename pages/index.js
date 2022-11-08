import styles from "../styles/Home.module.css";
import Head from "next/head";
import { abi, contractAddresses } from "../constants";
import { useMoralis, useWeb3Contract } from "react-moralis";
import { ConnectButton, Button } from "web3uikit";

export default function Home() {
  const { chainId: chainIdHex } = useMoralis();
  const chainId = parseInt(chainIdHex);
  const helloAddress =
    chainId in contractAddresses ? contractAddresses[chainId][0] : null;
  const { runContractFunction: quotes } = useWeb3Contract({
    abi: abi,
    contractAddress: helloAddress,
    functionName: "quotes",
    params: {},
  });
  async function hello() {
    try {
      const secret = await quotes();
      document.getElementById("quote").innerHTML = secret;
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div>
      <Head>
        <title>Words needed to be said!</title>
      </Head>

      <ConnectButton moralisAuth={false} />
      <br />
      <div className={styles.main}>
        <Button
          onClick={function () {
            hello({
              onSuccess: console.log("success"),
              onError: (error) => console.log(error),
            });
          }}
          text="Secret Words!"
        />
      </div>

      <span id="quote" className={styles.main}></span>
    </div>
  );
}

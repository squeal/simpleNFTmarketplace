"use client";

import { useState, useContext } from "react";
import { Button } from "@heroui/button";

import { title } from "@/components/primitives";
import { Card } from "@/components/card";

export default function ListPage() {
  const [nfts, setNfts] = useState([]);

  async function apitest(wallet) {
    // console.log("useContext(WalletContext)");
    // console.log(useContext(WalletContext));
    const res = await fetch(`/api/usernfts?wallet=${wallet}`);
    const data = await res.json();

    setNfts(data.items);

    console.log(data);
  }

  return (
    <div>
      <h1 className={title()}>List your NFTs for Sale</h1>
      <br />
      <br />
      <h1 className={title()}>Your NFTs:</h1>
      <Button
        className="text-medium text-white bg-black/50"
        color="default"
        radius="lg"
        size="sm"
        variant="flat"
        // onClick={() => apitest(walletAddress)}
        onClick={() => apitest(window.wallet)}
      >
        List
      </Button>

      <section className="flex flex-grid items-center justify-center gap-4 py-8 md:py-10">
        <div className="flex flex-wrap justify-center gap-4">
          {nfts.map((nft, i) => (
            <Card
              key={i}
              description={nft.content.metadata.description}
              imgsrc={nft.content.links.image}
              name={nft.content.metadata.name}
              btnlabel="Sell"
              onclick={() => alert("list")}
              price="-"
            />
          ))}
        </div>
      </section>
    </div>
  );
}

"use client"; // how do I server render but passthe event handler to a child component?

import { useState } from "react";

import { title } from "@/components/primitives";
import { Card } from "@/components/card";

let fakeNFTs = [];

const numberFakeOfNFTs = Math.ceil(Math.random() * 10);

for (let i = 0; i < numberFakeOfNFTs; i++) {
  fakeNFTs.push({
    id: i.toString(),
    name: "Bunny",
    description: "A Warrior Bunny",
    price: (Math.random() * 100).toFixed(1),
    imgsrc: "bunny.png",
  });
}

export default function Home() {
  const [nfts, setNfts] = useState(fakeNFTs);

  function buy(id: String) {
    // can't just remove fakeNFTs[id] because after buying one,
    // the ids no longer match the indizes
    fakeNFTs.splice(fakeNFTs.findIndex(v => v.id === id), 1);
    setNfts([...fakeNFTs]);
  }

  return (
    <div>
      <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
        <div className="inline-block max-w-lg text-center justify-center">
          <div>
            <h1 className={title()}>Buy NFTs here</h1>
          </div>
        </div>
      </section>

      <section className="flex flex-grid items-center justify-center gap-4 py-8 md:py-10">
        <div className="flex flex-wrap justify-center gap-4">
          {fakeNFTs.map((fakeNFT) => (
            <Card
              key={fakeNFT.id}
              description={fakeNFT.description}
              imgsrc={fakeNFT.imgsrc}
              name={fakeNFT.name}
              btnlabel="Buy"
              onclick={() => buy(fakeNFT.id)}
              price={fakeNFT.price}
            />
          ))}
        </div>
      </section>
    </div>
  );
}

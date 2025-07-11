'use client'


import { Connection, PublicKey, clusterApiUrl } from "@solana/web3.js";
import { useState, useContext } from "react";
import {
  Navbar as HeroUINavbar,
  NavbarContent,
  NavbarBrand,
  NavbarItem,
} from "@heroui/navbar";
import { Button } from "@heroui/button";
import { link as linkStyles } from "@heroui/theme";
import NextLink from "next/link";
import clsx from "clsx";

import { WalletContext } from "@/lib/walletContext";
import { siteConfig } from "@/config/site";
import { ThemeSwitch } from "@/components/theme-switch";
import { Logo } from "@/components/icons";

export const Navbar = () => {
  const [connected, setConnected] = useState('Connect');

  useContext(WalletContext).setWallet(15);
  console.log("useContext(WalletContext)");
  console.log(useContext(WalletContext));

  async function connect() {
    if (solana && solana.isPhantom) {
      const res = await solana.connect();

      // useState... oh, can't access in nonChild components
      // useContext(WalletContext).setWallet(res.publicKey);
      // "Hooks can only be called in the body of a function component."
      // I'm neither walking up the component tree and down again for useState,
      // nor doing completely useless wrapper-context-components for useContext
      // without being paid for it.
      //
      // therefore:
      window.wallet = res.publicKey;

      const connection = new Connection(clusterApiUrl("devnet"), "confirmed");
      const publicKey = new PublicKey(res.publicKey);
      let balance = await connection.getBalance(publicKey);

      setConnected((balance/1000000000).toString().substring(0, 4) + ' SOL');
    }
  }

  return (

    <HeroUINavbar maxWidth="xl" position="sticky">
      <NavbarContent className="basis-1/5 sm:basis-full" justify="start">
        <NavbarBrand as="li" className="gap-3 max-w-fit">
          <div className="flex justify-start items-center gap-1">
            <Logo />
            <p className="font-bold text-inherit">ACME</p>
          </div>
        </NavbarBrand>
        <ul className="flex gap-4 justify-start ml-2">
          {siteConfig.navItems.map((item) => (
            <NavbarItem key={item.href}>
              <NextLink
                className={clsx(
                  linkStyles({ color: "foreground" }),
                  "data-[active=true]:text-primary data-[active=true]:font-medium",
                )}
                color="foreground"
                href={item.href}
              >
                {item.label}
              </NextLink>
            </NavbarItem>
          ))}
        </ul>
      </NavbarContent>

      <NavbarContent className="sm:flex basis-1/5 sm:basis-full" justify="end">
        <ThemeSwitch />
        <NavbarItem className="md:flex">
          <Button
            onClick={connect}
            className="text-sm font-normal text-default-600 bg-default-100"
            // startContent={<HeartFilledIcon className="text-danger" />}
            variant="flat"
          >
            {connected}
          </Button>
        </NavbarItem>
      </NavbarContent>
    </HeroUINavbar>
  );
};

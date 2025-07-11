import { createContext } from 'react';

export const WalletContext = createContext({
  wallet: 13,
  setWallet: function (w) { this.wallet = w;}
});

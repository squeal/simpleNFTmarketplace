import * as anchor from '@coral-xyz/anchor';
import { TOKEN_PROGRAM_ID } from '@solana/spl-token';

const provider = anchor.AnchorProvider.env();
console.log("provider");
console.log(provider);
anchor.setProvider(provider);
const program = anchor.workspace.MarketplaceTaskContract;

const marketplace = anchor.web3.PublicKey.findProgramAddressSync(
  [Buffer.from('marketplace'), Buffer.from(name)],
  program.programId
)[0];
const rewardsMint = anchor.web3.PublicKey.findProgramAddressSync(
  [Buffer.from('rewards'), marketplace.toBuffer()],
  program.programId
)[0];
const treasury = anchor.web3.PublicKey.findProgramAddressSync(
  [Buffer.from('treasury'), marketplace.toBuffer()],
  program.programId
)[0];


const name = 'alot';

const tx = await program.methods
  .initialize(name, 1)
  .accountsPartial({
  admin: provider.wallet.publicKey,
  marketplace,
  rewardsMint,
  treasury,
  systemProgram: anchor.web3.SystemProgram.programId,
  tokenProgram: TOKEN_PROGRAM_ID,
  })
.rpc();
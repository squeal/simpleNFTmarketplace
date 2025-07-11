class NFTPortfolioViewer {
  constructor(apiKey) {
    this.apiKey = apiKey;
    this.baseUrl = 'https://devnet.helius-rpc.com';
  }

  async fetchNFTsByOwner(ownerAddress, limit = 10) {
    try {
      const response = await fetch(`${this.baseUrl}/?api-key=${this.apiKey}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          jsonrpc: '2.0',
          id: '1',
          method: 'getAssetsByOwner',
          params: {
            ownerAddress,
            page: 1,
            limit,
            displayOptions: {
              showFungible: false,
              showNativeBalance: false,
            },
          },
        }),
      });

      const data = await response.json();

      if (data.error) {
        throw new Error(data.error.message);
      }

      return data.result;
    } catch (error) {
      console.error('Error fetching NFTs:', error.message);
      throw error;
    }
  }

  // displayNFTPortfolio(nfts) {
  //   console.log('\n🖼️  NFT Portfolio Summary');
  //   console.log('========================');
  //   console.log(`Total NFTs: ${nfts.total}`);
  //   console.log(`Showing: ${nfts.items.length} items\n`);

  //   nfts.items.forEach((nft, index) => {
  //     console.log(`${index + 1}. ${nft.content?.metadata?.name || 'Unnamed NFT'}`);
  //     console.log(`   Collection: ${nft.grouping?.[0]?.group_value || 'Individual'}`);
  //     console.log(`   Compressed: ${nft.compression?.compressed ? 'Yes' : 'No'}`);
  //     console.log(`   Image: ${nft.content?.files?.[0]?.uri || 'No image'}`);
  //     console.log(`   ID: ${nft.id}\n`);
  //   });
  // }

//   async getRandomNFT(ownerAddress) {
//     const portfolio = await this.fetchNFTsByOwner(ownerAddress, 50);
    
//     if (portfolio.items.length === 0) {
//       console.log('No NFTs found for this address.');
//       return null;
//     }

//     const randomIndex = Math.floor(Math.random() * portfolio.items.length);
//     return portfolio.items[randomIndex];
//   }
}




// Usage example
// async function main(walletAddress) {
//   const viewer = new NFTPortfolioViewer('4413481d-4de2-4134-acf2-1cfe331e569c');
  
//   console.log('🚀 Fetching NFT portfolio...');
  
//   try {
//     // Get full portfolio overview
//     const portfolio = await viewer.fetchNFTsByOwner(walletAddress);
//     viewer.displayNFTPortfolio(portfolio);
    
//     // Get a random NFT for featured display
//     console.log('🎲 Featured Random NFT:');
//     console.log('=====================');
//     const randomNFT = await viewer.getRandomNFT(walletAddress);
    
//     if (randomNFT) {
//       console.log(`Name: ${randomNFT.content?.metadata?.name}`);
//       console.log(`Description: ${randomNFT.content?.metadata?.description || 'No description'}`);
//       console.log(`Image: ${randomNFT.content?.files?.[0]?.uri}`);
//     }
    
//   } catch (error) {
//     console.error('Failed to fetch NFT data:', error.message);
//   }
// }

// main();

export async function GET(req) {
  // const res = await fetch('https://data.mongodb-api.com/...', {
  //   headers: {
  //     'Content-Type': 'application/json'
  //   },
  // })
  // const data = await res.json()
  const viewer = new NFTPortfolioViewer('4413481d-4de2-4134-acf2-1cfe331e569c');

  console.log(req.nextUrl.searchParams);
  return Response.json(await viewer.fetchNFTsByOwner(req.nextUrl.searchParams.get('wallet')));
}

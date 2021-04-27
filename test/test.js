const { expect } = require("chai");
const { waffle } = require("hardhat");
const { deployContract } = waffle;
const provider = waffle.provider;
const web3 = require("web3");
let {getClaimVRS} = require("../scripts/SigningMessage.js")


describe("BNBBridge", function() {
    let erc20;
    let bnbBridge;
    const [owner, addr1] = provider.getWallets();
    before(async () => {
       
        
        const ERC20= await ethers.getContractFactory("ERC20");
        erc20 = await ERC20.deploy();
        // console.log(erc20)
        await erc20.deployed();
        



        // console.log("Minting Done")

        const BNBBridge = await ethers.getContractFactory("Bnb2EthBridge");
        bnbBridge= await BNBBridge.deploy(erc20.address,"0xd6B6A95819F8152a302530AA7cAF52B5B9833bE4");
        
        await bnbBridge.deployed();

        const ETHBridge = await ethers.getContractFactory("Eth2BnbBridge");
        ethBridge= await ETHBridge.deploy(erc20.address,"0xd6B6A95819F8152a302530AA7cAF52B5B9833bE4");
        await erc20.addOwner(ethBridge.address)
        await erc20.approve(ethBridge.address,web3.utils.toWei('5000000000000000000000000000000000000'));
        await erc20.addOwner(bnbBridge.address)
        await erc20.approve(bnbBridge.address,web3.utils.toWei('5000000000000000000000000000000000000'));


        // console.log(balance)

      });

  // it("BIP20 being burned", async function() {
    
  //   // console.log(await daoStake._calculateReward(web3.utils.toWei('10'),821917808219178,10))
  //   // console.log(await daoStake.getTotalrewardTokens())
  //   let nonce = await bnbBridge._nonce(owner.address);
  //   // console.log("nonce",nonce)
  //   let signedMessage = getVRS(1000,owner.address,Number(nonce.toString()),bnbBridge.address.toString())
  //   console.log("Hello",signedMessage.r.toString('hex'));
  //   await bnbBridge.burnToken(web3.utils.toWei('1000'),signedMessage.v,"0x"+signedMessage.r.toString('hex'),"0x"+signedMessage.s.toString('hex'));
  //   // expect(await greeter.greet()).to.equal("Hola, mundo!");
  // });

  // it("BIP20 being minted", async function() {
    
  //   // console.log(await daoStake._calculateReward(web3.utils.toWei('10'),821917808219178,10))
  //   // console.log(await daoStake.getTotalrewardTokens())
  //   let nonce = await bnbBridge._nonce(owner.address);
  //   // console.log("nonce",nonce)
  //   // let signer = await bnbBridge.signer();
  //   // console.log("Signer ",signer)
  //   let signedMessage = getVRS(1000,owner.address,1613129668,Number(nonce.toString()),bnbBridge.address.toString())
  //   console.log("Hello",signedMessage.r.toString('hex'));
  //   await bnbBridge.mintToken(web3.utils.toWei('1000'),1613129668,signedMessage.v,"0x"+signedMessage.r.toString('hex'),"0x"+signedMessage.s.toString('hex'));
  //   // expect(await greeter.greet()).to.equal("Hola, mundo!");
  // });

  // it("ERC20 being deposited and claimed on BSC", async function() {
  //   let nonce = await ethBridge._nonce(owner.address);
  //   // console.log("nonce",Number(nonce.toString()))
  //   // console.log("owner",owner.address)
  //   // console.log("Hello",signedMessage.r.toString('hex'));
  //   await ethBridge.depositToken(web3.utils.toWei('1000'));
  //   let signedMessage = await getClaimVRS(1000,owner.address,nonce,bnbBridge.address)
  //   // console.log(signedMessage2)
  //   await bnbBridge.mintToken(web3.utils.toWei('1000'),nonce,signedMessage.v,signedMessage.r,signedMessage.s)
  // });


  it("ERC20 being deposited and claimed on ETH", async function() {
    let nonce = await ethBridge._nonce(owner.address);
    // console.log("nonce",Number(nonce.toString()))
    // console.log("owner",owner.address)
    // console.log("Hello",signedMessage.r.toString('hex'));
    await bnbBridge.burnToken(web3.utils.toWei('1000'));
    let signedMessage = await getClaimVRS(1000,owner.address,nonce,ethBridge.address)
    // console.log(signedMessage2)
    await ethBridge.connect(addr1).withdrawToken(web3.utils.toWei('1000'),nonce,signedMessage.v,signedMessage.r,signedMessage.s)
    // await ethBridge.withdrawToken(web3.utils.toWei('1000'),nonce,signedMessage.v,signedMessage.r,signedMessage.s)
  });
  // it("ERC20 being withdrawed", async function() {
  //   let nonce = await ethBridge._nonce(owner.address);
  //   // console.log("nonce",nonce)
  //   // let signer = await bnbBridge.signer();
  //   // console.log("Signer ",signer)
  //   let signedMessage = getVRS(1000,owner.address,1613129668,Number(nonce.toString()),ethBridge.address.toString())
  //   console.log("Hello",signedMessage.r.toString('hex'));
  //   await ethBridge.withdrawToken(web3.utils.toWei('1000'),1613129668,signedMessage.v,"0x"+signedMessage.r.toString('hex'),"0x"+signedMessage.s.toString('hex'));

  // });



});
let axios = require('axios')
let web3 = require('web3')

async sendTransactionToContract() {
    await contract.methods.removeLiquidityInPool(/*** parameters ***/).send({from: accounts /*** selected account from metamask ***/}) // contract.methods.methodName(parameters).send({from:selected account})
        .on('transactionHash', (hash) => {
            // hash of tx
        }).on('confirmation', function (confirmationNumber, receipt) {
            if (confirmationNumber === 2) {
               // tx confirmed
            }
        })
}
async function getResult(account){
let result = await axios({
    url: 'https://api.thegraph.com/subgraphs/name/danialansari/hedge-graph',
    method: 'post',
    data: {
      query: 
      `
    {
    userstakes(first: 1000, where:{staker:"` +
        account +
        `"}){
            id
            token
            supplier
            symbol
            liquidity
            amount
            amountUsdh
  }
}
      `
        
      
    }
})
console.log(result.data.data.userstakes)
}

getResult("0xd6B6A95819F8152a302530AA7cAF52B5B9833bE4")
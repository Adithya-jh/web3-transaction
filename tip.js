const web3 = new Web3(Web3.givenProvider)

const form = document.querySelector('form');

const send = async(amount) =>{
   const accounts= await window.ethereum.request({method:"eth_requestAccounts"}) //after this line execution only the next line execution will start
//    alert(accounts)
    const wei = web3.utils.toWei(amount,"ether")
    if(accounts.length>0){
        window.ethereum.request({
            method: "eth_sendTransaction",
            params: [{
                from: accounts[0],
                to:"0x3FDE4bCd2FAEe79e7D99Be1E693193CEEc998BE9", //mainnet 
                // to:"0x5D89B94f49f954322fFbAf04EFdC4Fd32564B4f0", //ganache test account
                value: web3.utils.toHex(wei)
            }]
        })
    }
}

const button = document.querySelector(".button")

let accounts =[]

const connect = async() =>{
     accounts= await window.ethereum.request({method:"eth_requestAccounts"})
    // const wei = web3.utils.toWei(amount,"ether")
    console.log(accounts[0]);
    if(accounts.length>0){
        window.ethereum.request({
            method: "eth_requestAccounts",
            // params: [{
            //     from: accounts[0],
            //     to:"0x3FDE4bCd2FAEe79e7D99Be1E693193CEEc998BE9", //mainnet 
            //     // to:"0x5D89B94f49f954322fFbAf04EFdC4Fd32564B4f0", //ganache test account
            //     // value: web3.utils.toHex(wei)
            // }]
        })
    }

    if(accounts.length>0){
        document.getElementById("btn").textContent = accounts[0]
    }else{
        document.getElementById("btn").textContent ="Connect To Wallet"
    }

}






button.addEventListener("click",(e)=>{
    e.preventDefault()
    if(window.ethereum){
        connect()
    }
    // console.log("hello");
})




if(window.ethereum){
    form.classList.add('has-eth') 
}

form.addEventListener('submit', function(event){
    event.preventDefault()
    
    if(window.ethereum){
        const input = form.querySelector("input")
        send(input.value) // this function runs when user clicks the form and he/she have wallet in the browser!

    }else{
        alert("Please install the wallet")
    }

})


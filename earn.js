// LocalStorage se coins load karna
let coins = localStorage.getItem('userCoins') ? parseInt(localStorage.getItem('userCoins')) : 0;

// Safety check ke sath coin balance update karna
let coinBalanceElement = document.getElementById('coinBalance');
if (coinBalanceElement) {
    coinBalanceElement.innerText = coins;
}

// Watch Ad function (1 Ad = 10 Coins)
function watchAd() {
    // Yahan aap apna Ad Network ka script/SDK trigger kar sakte hain
    alert("Ad playing... (Simulated)");
    
    // Ad complete hone ke baad 10 coins add honge
    coins += 10;
    localStorage.setItem('userCoins', coins);
    
    if (coinBalanceElement) {
        coinBalanceElement.innerText = coins;
    }
    
    alert("Success! You earned 10 coins.");
}

// Convert Coins function (100 Coins = ₹10)
function convertCoins() {
    if (coins >= 100) {
        coins -= 100;
        localStorage.setItem('userCoins', coins);
        
        if (coinBalanceElement) {
            coinBalanceElement.innerText = coins;
        }

        // Main Wallet balance update karne ka logic
        let currentWallet = parseFloat(localStorage.getItem('walletBalance') || '500'); 
        currentWallet += 10;
        localStorage.setItem('walletBalance', currentWallet);

        // Agar top par wallet balance show ho raha hai toh use update karein
        let topWallet = document.getElementById('topWalletBalance');
        if (topWallet) {
            topWallet.innerText = "₹" + currentWallet;
        }

        alert("Successfully converted 100 coins to ₹10 added to your wallet!");
    } else {
        alert("Not enough coins! You need at least 100 coins to convert.");
    }
}

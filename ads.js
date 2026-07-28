// Function jo button click hone par chalega (30 seconds timer ke sath)
window.showMonetagAd = function() {
    console.log("Ad load ho raha hai... Kripya 30 seconds wait karein.");

    // Monetag script load karna
    let script = document.createElement('script');
    script.dataset.zone = '11442636';
    script.src = 'https://n6wxm.com/vignette.min.js';
    document.body.appendChild(script);

    // 30 seconds (30000 milliseconds) ka timer
    setTimeout(async () => {
        await creditUserRewardCoins();
        alert("30 seconds complete! Aapke 10 Coins add kar diye gaye hain.");
    }, 30000); // 30 seconds
};

// Coins credit karne ka function
async function creditUserRewardCoins() {
    const user = auth.currentUser;
    if (user) {
        const userRef = doc(db, "users", user.uid);
        await updateDoc(userRef, { coins: increment(10) });

        const userSnap = await getDoc(userRef);
        const updatedCoins = userSnap.data().coins || 0;
        document.getElementById('user-coin-balance').innerText = `${updatedCoins} 🪙`;
    }
}

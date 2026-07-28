// ==========================================
// Unity Ads Configuration & Setup
// ==========================================
const unityGameId = "800108014";
const isTestMode = true; // Set to false when publishing live
const rewardedAdUnitId = "Rewarded_Android";
const bannerAdUnitId = "Banner_Android";

// Initialize Unity Ads Function
function initializeUnityAds() {
    console.log("Initializing Unity Ads for Game ID: " + unityGameId);
    
    // Check if Unity Ads SDK is available in the environment
    if (typeof unityAds !== 'undefined') {
        unityAds.initialize(unityGameId, isTestMode, {
            onInitializationComplete: () => {
                console.log("Unity Ads Initialization Complete.");
                // Automatically load banner or ads once initialized
                loadBannerAd();
            },
            onInitializationFailed: (error, message) => {
                console.error(`Unity Ads Initialization Failed: ${error} - ${message}`);
            }
        });
    } else {
        console.log("Unity Ads SDK not found yet. Running in web/fallback mode.");
    }
}

// Function to Load and Show Rewarded Ad
function loadAndShowRewardedAd(onRewardSuccess) {
    console.log("Loading Rewarded Ad using ID: " + rewardedAdUnitId);

    if (typeof unityAds !== 'undefined') {
        unityAds.load(rewardedAdUnitId, {
            onUnityAdsAdLoaded: (placementId) => {
                console.log("Rewarded Ad Loaded Successfully.");
                unityAds.show(rewardedAdUnitId, {}, {
                    onUnityAdsShowComplete: (placementId, showResult) => {
                        if (showResult === "COMPLETED") {
                            console.log("Ad watched successfully! Granting reward...");
                            if (typeof onRewardSuccess === 'function') {
                                onRewardSuccess();
                            }
                        } else {
                            alert("Ad was skipped. Reward not granted.");
                        }
                    },
                    onUnityAdsShowFailure: (placementId, error, message) => {
                        console.error(`Ad show failed: ${error} - ${message}`);
                        alert("Failed to show ad. Please try again later.");
                    }
                });
            },
            onUnityAdsFailedToLoad: (placementId, error, message) => {
                console.error(`Rewarded Ad failed to load: ${error} - ${message}`);
                // Fallback for web testing or if SDK fails
                triggerWebFallbackReward(onRewardSuccess);
            }
        });
    } else {
        // Fallback for browsers / web environment where Unity SDK isn't native
        triggerWebFallbackReward(onRewardSuccess);
    }
}

// Web Browser Fallback Timer (Useful for testing outside Android WebView)
function triggerWebFallbackReward(onRewardSuccess) {
    alert("Simulating Ad View (Web Mode)... Please wait 5 seconds.");
    setTimeout(() => {
        console.log("Fallback reward granted.");
        if (typeof onRewardSuccess === 'function') {
            onRewardSuccess();
        }
    }, 5000);
}

// Function to Load Banner Ad
function loadBannerAd() {
    console.log("Loading Banner Ad using ID: " + bannerAdUnitId);
    
    if (typeof unityAds !== 'undefined' && unityAds.Banner) {
        unityAds.Banner.load(bannerAdUnitId, {
            loadOptions: {
                bannerPosition: "BOTTOM_CENTER"
            },
            onBannerLoaded: () => {
                console.log("Unity Banner Ad Loaded.");
            },
            onBannerFailedToLoad: (message) => {
                console.error("Unity Banner Load Failed: " + message);
            }
        });
    } else {
        console.log("Banner Ad SDK placeholder active.");
    }
}

// Auto-initialize on load
window.onload = function() {
    initializeUnityAds();
};

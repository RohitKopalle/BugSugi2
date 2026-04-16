// ================= CONFIGURATION =================
// Firebase Configuration - REPLACE THESE VALUES with your Firebase project details
// Get these from: Firebase Console → Project Settings → Firebase SDK snippet → Config
//
// INSTRUCTIONS:
// 1. Copy this file and rename it to "config.js"
// 2. Replace all placeholder values below with your actual Firebase project credentials
// 3. NEVER commit config.js to Git (it's in .gitignore)

const FIREBASE_CONFIG = {
  apiKey: "YOUR_API_KEY_HERE",
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com", 
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT_ID.firebasestorage.app",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};

// Judge0 API Configuration
const JUDGE0_CONFIG = {
  apiUrl: "https://ce.judge0.com/submissions",
  apiKey: null,
  timeout: 10000,
  allowedLanguages: [71], // Python
  maxCodeLength: 5000,
  enableRateLimiting: true
};

// Security Configuration
const SECURITY_CONFIG = {
  maxLoginAttempts: 5,
  lockoutTime: 15 * 60 * 1000, // 15 minutes
  enableInputValidation: true,
  enableRateLimiting: true,
  codeExecutionTimeout: 10000
};

// Judge Credentials — hashes only, no plaintext passwords stored
const JUDGE_CREDENTIALS = {
  judge1: {
    name: "Judge 1",
    passwordHash: "dd888a715d243b3e950ba7bb5878c8f7"
  },
  judge2: {
    name: "Judge 2", 
    passwordHash: "c89742577a2983d6562b6ee55625634d"
  }
};

// Export configurations
window.CONFIG = {
  FIREBASE_CONFIG,
  JUDGE0_CONFIG,
  SECURITY_CONFIG,
  JUDGE_CREDENTIALS
};

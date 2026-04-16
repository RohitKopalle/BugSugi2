module.exports = function handler(req, res) {
  const config = `
const FIREBASE_CONFIG = {
  apiKey: "${process.env.FIREBASE_API_KEY || ''}",
  authDomain: "${process.env.FIREBASE_AUTH_DOMAIN || ''}",
  projectId: "${process.env.FIREBASE_PROJECT_ID || ''}",
  storageBucket: "${process.env.FIREBASE_STORAGE_BUCKET || ''}",
  messagingSenderId: "${process.env.FIREBASE_MESSAGING_SENDER_ID || ''}",
  appId: "${process.env.FIREBASE_APP_ID || ''}"
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
  judge1: { name: "Judge 1", passwordHash: "dd888a715d243b3e950ba7bb5878c8f7" },
  judge2: { name: "Judge 2", passwordHash: "c89742577a2983d6562b6ee55625634d" }
};

window.CONFIG = { FIREBASE_CONFIG, JUDGE0_CONFIG, SECURITY_CONFIG, JUDGE_CREDENTIALS };
`;

  res.setHeader('Content-Type', 'application/javascript');
  res.status(200).send(config.trim());
};

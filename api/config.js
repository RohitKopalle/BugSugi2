module.exports = function handler(req, res) {
  const QUESTIONS_POOL = [
    {
      title: "Print the product of all numbers in the list.",
      initialCode: "nums = [1, 2, 3, 4, 5]\nproduct = 0\nfor i in range(len(nums)):\n    product += nums[i]\nprint(\"Product =\", product)",
      language: "python",
      languageId: 71,
      expectedOutput: "Product = 120"
    },
    {
      title: "Print the sum of all numbers from 1 to n (inclusive).",
      initialCode: "#include <stdio.h>\nint main() {\n    int n = 6;\n    int sum = 1;\n    for(int i = 1; i < n; i++) {\n        sum += i;\n    }\n    printf(\"Sum = %d\", sum);\n    return 0;\n}",
      language: "c",
      languageId: 54,
      expectedOutput: "Sum = 21"
    },
    {
      title: "Print the first 8 terms of the Fibonacci sequence.",
      initialCode: "#include <stdio.h>\nint main() {\n    int n = 8;\n    int a = 1, b = 0;\n    printf(\"%d %d \", a, b);\n    for(int i = 0; i < n; i++) {\n        int c = a * b;\n        a = b;\n        b = c;\n        printf(\"%d \", a);\n    }\n    return 0;\n}",
      language: "c",
      languageId: 54,
      expectedOutput: "0 1 1 2 3 5 8 13"
    },
    {
      title: "Count how many even numbers are present in the array.",
      initialCode: "#include <stdio.h>\n\nint main() {\n    int arr[] = {2, 5, 8, 11, 14, 17, 20};\n    int count;\n\n    for(int i = 0; i < 7; i++) {\n        if(arr[i] % 2 = 0) {\n            count++;\n        }\n    }\n\n    printf(\"Even count = %d\", count);\n    return 0;\n}",
      language: "c",
      languageId: 54,
      expectedOutput: "Even count = 4"
    },
    {
      title: "Find the second largest unique number in the list.",
      initialCode: "nums = [12, 45, 89, 90, 67, 90, 34]\nlargest = nums[0]\nsecond = nums[0]\n\nfor i in range(len(nums)+1):\n    if nums[i] > largest:\n        second = largest\n        largest = nums[i]\n    elif nums[i] > second:\n        second = nums[i]\n\nprint(\"Second Largest =\", second)",
      language: "python",
      languageId: 71,
      expectedOutput: "Second Largest = 89"
    }
  ];

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
  allowedLanguages: [71, 54], // Python, C (GCC 9.2.0)
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

// Shared Question Pool
const QUESTIONS_POOL = ${JSON.stringify(QUESTIONS_POOL, null, 2)};

window.CONFIG = { FIREBASE_CONFIG, JUDGE0_CONFIG, SECURITY_CONFIG, JUDGE_CREDENTIALS, QUESTIONS_POOL };
`;

  res.setHeader('Content-Type', 'application/javascript');
  res.status(200).send(config.trim());
};

// ================= LOGIN =================
// Security: Hashed credentials — passwords are NOT stored or commented here
const teams = {
  "team1": "f39033fd39f048b46167a16e2dcff98d",
  "team2": "34b585b82d34a4b4cf4880ccadd7f321",
  "team3": "e9a74b74b52245bbcd7b10affdca8195",
  "team4": "e8615351a317aa7d9073cca44e5678e0",
  "team5": "c06c4a67619a4b3972162c8b9fed8c14",
  "team6": "c3c12131036d659102fd5984aaa24f2c",
  "team7": "f470aa6e096e52ab37856f2080a03e69",
  "team8": "d864b26559ac976c3bcdd1c2cd60994d",
  "team9": "808b87c2c3d782c596e491a320d0ed07",
  "team10": "3264f30ddf7780a7540f6ef5d1b9f82f",
  "team11": "b286c853abd40ebed9a01ad8ddb53ceb",
  "team12": "6ef08385340523fb151115e6c22a555e",
  "team13": "deddbd091ba212c7ab1b7bae73018805",
  "team14": "2c91ca166bc5c0f6b30b8dd71a89e0c6",
  "team15": "5d784066efd3b2fe612a4f1afd941b03",
  "team16": "1c9614c2b7555a622f50f7f111c932cd",
  "team17": "4e1031064dcd5fb07b4552e06b491868",
  "team18": "50b69e9bec1c31797881acc233158873",
  "team19": "4bf44f3b34c6c91de65d0f218c9efa33",
  "team20": "6ef44b115014f600550267e4d1d61da7",
  "team21": "12ee4e522112dcdd16a264f19788144f",
  "team22": "3bb000f7874374fe83dc42b5b98f7938",
  "team23": "3c4d39fdb67c311fc9a3097e01d62980",
  "team24": "c1d79e1f70f31050d0dba73173e15f45",
  "team25": "63ad4806011cfda19aa1dc02113b6c42",
  "team26": "96feaa525003139d8f03af2943794dc4",
  "team27": "0b480e1e3c666e76af487536cd2bc211",
  "team28": "7789ec7b439524b5beded165de825e13",
  "team29": "176f9bd71710fa615f3dc0551be275ea",
  "team30": "7120f18c729931ec27564d00b9dd9a1f",
  "team31": "4c9f3642d7a859e96b686bee0a495ed2",
  "team32": "80743e204f75474d8f1b13367f914727",
  "team33": "3e63075fff3afd361db7a3f15f018fb3",
  "team34": "ab66bb92b30205dcfdd008335fae4c22",
  "team35": "ce5ba5ed1202a9a2f3476bacd6a6d3bf",
  "team36": "eff61ae512067fa505b74a2b4dacc647",
  "team37": "f93a63ee83b3ec9520788e7a13e9e356",
  "team38": "e7c1075c3a81fffc95c19c092956d20a",
  "team39": "f42b6f0f01e3c3d8e06e9b9a930734c9",
  "team40": "2af42ddc3dad1c242ebc8dc08289043b",
  "team41": "8c6f3d59a182535bcc52ee0330e9b4eb",
  "team42": "98114ad1caaf7358b154f23ee1f15b87",
  "team43": "694c44b2cc5ee0432b2220f0d8ac867a",
  "team44": "93c30b853c7ad47c1acd7ff3013a61cb",
  "team45": "ec01254ca5817b3239346b3708dc8059",
  "team46": "8dbe5d651e8712ba663790a6f705d6b2",
  "team47": "1ca8a4952592637ef38fcb8f030d187b",
  "team48": "50b3a0ac323c03f4c1acf784f534becb",
  "team49": "32b595480dc34e91d8731660d0033d4a",
  "team50": "1418263ffb09e78e96a5e000c02d4e2d",
  "team51": "b2635ce6b6124ac21d4002eff5045632",
  "team52": "d78ca4176d6f3513da5b3d8a864808a0",
  "team53": "235daf75079cfa9e8213456ebc2015b0",
  "team54": "6a459d0639b349fe2c383ed9404c87ce",
  "team55": "7d2d369e080c71fada2874dd4a99378d",
  "team56": "7c9559da9408a230f3f624da7e5d7aaa",
  "team57": "d90023e03332059e143be8e290e281de",
  "team58": "5cc11db95e9e6a7e443e878e7425c838",
  "team59": "15d63512e33f3d62dbe4da575aa8fd14",
  "team60": "b91d2cffc978056a261807bfe8ef564d",
  "team61": "35cbb9b1cc2c69cbe7ea40bb1ce74248",
  "team62": "f24df3244e0b7d8dcc9a6065f1738962",
  "team63": "8a4a70ecdd722a37475b452e1d937523",
  "team64": "1732423eef63cf5df7933a25312dac85",
  "team65": "bfefda236b84004a505edd3ab54af631",
  "team66": "1c8a3778c8206c693eaf47bf3a3e9446",
  "team67": "1f70d3abe16165235040001611af1eb0",
  "team68": "28ecb782de102c7fbab00771069efed8",
  "team69": "b9ba03cc35f81a84119dd199a22d7747",
  "team70": "992dc78425371c0d756e0fc53635a45a"
};

// Simple MD5 hash function for client-side hashing
function hashPassword(password) {
  function md5(string) {
    function RotateLeft(lValue, iShiftBits) {
      return (lValue<<iShiftBits) | (lValue>>>(32-iShiftBits));
    }
    function AddUnsigned(lX,lY) {
      var lX4,lY4,lX8,lY8,lResult;
      lX8 = (lX & 0x80000000);
      lY8 = (lY & 0x80000000);
      lX4 = (lX & 0x40000000);
      lY4 = (lY & 0x40000000);
      lResult = (lX & 0x3FFFFFFF)+(lY & 0x3FFFFFFF);
      if (lX4 & lY4) {
        return (lResult ^ 0x80000000 ^ lX8 ^ lY8);
      }
      if (lX4 | lY4) {
        if (lResult & 0x40000000) {
          return (lResult ^ 0xC0000000 ^ lX8 ^ lY8);
        } else {
          return (lResult ^ 0x40000000 ^ lX8 ^ lY8);
        }
      } else {
        return (lResult ^ lX8 ^ lY8);
      }
    }
    function F(x,y,z) { return (x & y) | ((~x) & z); }
    function G(x,y,z) { return (x & z) | (y & (~z)); }
    function H(x,y,z) { return (x ^ y ^ z); }
    function I(x,y,z) { return (y ^ (x | (~z))); }
    function FF(a,b,c,d,x,s,ac) {
      a = AddUnsigned(a, AddUnsigned(AddUnsigned(F(b, c, d), x), ac));
      return AddUnsigned(RotateLeft(a, s), b);
    }
    function GG(a,b,c,d,x,s,ac) {
      a = AddUnsigned(a, AddUnsigned(AddUnsigned(G(b, c, d), x), ac));
      return AddUnsigned(RotateLeft(a, s), b);
    }
    function HH(a,b,c,d,x,s,ac) {
      a = AddUnsigned(a, AddUnsigned(AddUnsigned(H(b, c, d), x), ac));
      return AddUnsigned(RotateLeft(a, s), b);
    }
    function II(a,b,c,d,x,s,ac) {
      a = AddUnsigned(a, AddUnsigned(AddUnsigned(I(b, c, d), x), ac));
      return AddUnsigned(RotateLeft(a, s), b);
    }
    function ConvertToWordArray(string) {
      var lWordCount;
      var lMessageLength = string.length;
      var lNumberOfWords_temp1=lMessageLength + 8;
      var lNumberOfWords_temp2=(lNumberOfWords_temp1-(lNumberOfWords_temp1 % 64))/64;
      var lNumberOfWords = (lNumberOfWords_temp2+1)*16;
      var lWordArray=Array(lNumberOfWords-1);
      var lBytePosition = 0;
      var lByteCount = 0;
      while ( lByteCount < lMessageLength ) {
        lWordCount = (lByteCount-(lByteCount % 4))/4;
        lBytePosition = (lByteCount % 4)*8;
        lWordArray[lWordCount] = (lWordArray[lWordCount] | (string.charCodeAt(lByteCount)<<lBytePosition));
        lByteCount++;
      }
      lWordCount = (lByteCount-(lByteCount % 4))/4;
      lBytePosition = (lByteCount % 4)*8;
      lWordArray[lWordCount] = lWordArray[lWordCount] | (0x80<<lBytePosition);
      lWordArray[lNumberOfWords-2] = lMessageLength<<3;
      lWordArray[lNumberOfWords-1] = lMessageLength>>>29;
      return lWordArray;
    }
    function WordToHex(lValue) {
      var WordToHexValue="",WordToHexValue_temp="",lByte,lCount;
      for (lCount = 0;lCount<=3;lCount++) {
        lByte = (lValue>>>(lCount*8)) & 255;
        WordToHexValue_temp = "0" + lByte.toString(16);
        WordToHexValue = WordToHexValue + WordToHexValue_temp.substr(WordToHexValue_temp.length-2,2);
      }
      return WordToHexValue;
    }
    var x=Array();
    var k,AA,BB,CC,DD,a,b,c,d;
    var S11=7, S12=12, S13=17, S14=22;
    var S21=5, S22=9 , S23=14, S24=20;
    var S31=4, S32=11, S33=16, S34=23;
    var S41=6, S42=10, S43=15, S44=21;
    string = string.replace(/\r\n/g,"\n");
    var utftext = "";
    for (var n = 0; n < string.length; n++) {
      var c = string.charCodeAt(n);
      if (c < 128) {
        utftext += String.fromCharCode(c);
      }
      else if((c > 127) && (c < 2048)) {
        utftext += String.fromCharCode((c >> 6) | 192);
        utftext += String.fromCharCode((c & 63) | 128);
      }
      else {
        utftext += String.fromCharCode((c >> 12) | 224);
        utftext += String.fromCharCode(((c >> 6) & 63) | 128);
        utftext += String.fromCharCode((c & 63) | 128);
      }
    }
    x = ConvertToWordArray(utftext);
    a = 0x67452301; b = 0xEFCDAB89; c = 0x98BADCFE; d = 0x10325476;
    for (k=0;k<x.length;k+=16) {
      AA=a; BB=b; CC=c; DD=d;
      a=FF(a,b,c,d,x[k+0], S11,0xD76AA478);
      d=FF(d,a,b,c,x[k+1], S12,0xE8C7B756);
      c=FF(c,d,a,b,x[k+2], S13,0x242070DB);
      b=FF(b,c,d,a,x[k+3], S14,0xC1BDCEEE);
      a=FF(a,b,c,d,x[k+4], S11,0xF57C0FAF);
      d=FF(d,a,b,c,x[k+5], S12,0x4787C62A);
      c=FF(c,d,a,b,x[k+6], S13,0xA8304613);
      b=FF(b,c,d,a,x[k+7], S14,0xFD469501);
      a=FF(a,b,c,d,x[k+8], S11,0x698098D8);
      d=FF(d,a,b,c,x[k+9], S12,0x8B44F7AF);
      c=FF(c,d,a,b,x[k+10],S13,0xFFFF5BB1);
      b=FF(b,c,d,a,x[k+11],S14,0x895CD7BE);
      a=FF(a,b,c,d,x[k+12],S11,0x6B901122);
      d=FF(d,a,b,c,x[k+13],S12,0xFD987193);
      c=FF(c,d,a,b,x[k+14],S13,0xA679438E);
      b=FF(b,c,d,a,x[k+15],S14,0x49B40821);
      a=GG(a,b,c,d,x[k+1], S21,0xF61E2562);
      d=GG(d,a,b,c,x[k+6], S22,0xC040B340);
      c=GG(c,d,a,b,x[k+11],S23,0x265E5A51);
      b=GG(b,c,d,a,x[k+0], S24,0xE9B6C7AA);
      a=GG(a,b,c,d,x[k+5], S21,0xD62F105D);
      d=GG(d,a,b,c,x[k+10],S22,0x2441453);
      c=GG(c,d,a,b,x[k+15],S23,0xD8A1E681);
      b=GG(b,c,d,a,x[k+4], S24,0xE7D3FBC8);
      a=GG(a,b,c,d,x[k+9], S21,0x21E1CDE6);
      d=GG(d,a,b,c,x[k+14],S22,0xC33707D6);
      c=GG(c,d,a,b,x[k+3], S23,0xF4D50D87);
      b=GG(b,c,d,a,x[k+8], S24,0x455A14ED);
      a=GG(a,b,c,d,x[k+13],S21,0xA9E3E905);
      d=GG(d,a,b,c,x[k+2], S22,0xFCEFA3F8);
      c=GG(c,d,a,b,x[k+7], S23,0x676F02D9);
      b=GG(b,c,d,a,x[k+12],S24,0x8D2A4C8A);
      a=HH(a,b,c,d,x[k+5], S31,0xFFFA3942);
      d=HH(d,a,b,c,x[k+8], S32,0x8771F681);
      c=HH(c,d,a,b,x[k+11],S33,0x6D9D6122);
      b=HH(b,c,d,a,x[k+14],S34,0xFDE5380C);
      a=HH(a,b,c,d,x[k+1], S31,0xA4BEEA44);
      d=HH(d,a,b,c,x[k+4], S32,0x4BDECFA9);
      c=HH(c,d,a,b,x[k+7], S33,0xF6BB4B60);
      b=HH(b,c,d,a,x[k+10],S34,0xBEBFBC70);
      a=HH(a,b,c,d,x[k+13],S31,0x289B7EC6);
      d=HH(d,a,b,c,x[k+0], S32,0xEAA127FA);
      c=HH(c,d,a,b,x[k+3], S33,0xD4EF3085);
      b=HH(b,c,d,a,x[k+6], S34,0x4881D05);
      a=HH(a,b,c,d,x[k+9], S31,0xD9D4D039);
      d=HH(d,a,b,c,x[k+12],S32,0xE6DB99E5);
      c=HH(c,d,a,b,x[k+15],S33,0x1FA27CF8);
      b=HH(b,c,d,a,x[k+2], S34,0xC4AC5665);
      a=II(a,b,c,d,x[k+0], S41,0xF4292244);
      d=II(d,a,b,c,x[k+7], S42,0x432AFF97);
      c=II(c,d,a,b,x[k+14],S43,0xAB9423A7);
      b=II(b,c,d,a,x[k+5], S44,0xFC93A039);
      a=II(a,b,c,d,x[k+12],S41,0x655B59C3);
      d=II(d,a,b,c,x[k+3], S42,0x8F0CCC92);
      c=II(c,d,a,b,x[k+10],S43,0xFFEFF47D);
      b=II(b,c,d,a,x[k+1], S44,0x85845DD1);
      a=II(a,b,c,d,x[k+8], S41,0x6FA87E4F);
      d=II(d,a,b,c,x[k+15],S42,0xFE2CE6E0);
      c=II(c,d,a,b,x[k+6], S43,0xA3014314);
      b=II(b,c,d,a,x[k+13],S44,0x4E0811A1);
      a=II(a,b,c,d,x[k+4], S41,0xF7537E82);
      d=II(d,a,b,c,x[k+11],S42,0xBD3AF235);
      c=II(c,d,a,b,x[k+2], S43,0x2AD7D2BB);
      b=II(b,c,d,a,x[k+9], S44,0xEB86D391);
      a=AddUnsigned(a,AA);
      b=AddUnsigned(b,BB);
      c=AddUnsigned(c,CC);
      d=AddUnsigned(d,DD);
    }
    var temp = WordToHex(a)+WordToHex(b)+WordToHex(c)+WordToHex(d);
    return temp.toLowerCase();
  }
  return md5(password);
}

// Make hashPassword available globally (needed by judge-panel.js)
window.hashPassword = hashPassword;

// Rate limiting for login attempts
const loginAttempts = {};
const MAX_ATTEMPTS = 5;
const LOCKOUT_TIME = 15 * 60 * 1000; // 15 minutes

function isRateLimited(teamId) {
  const attempts = loginAttempts[teamId];
  if (!attempts) return false;
  
  if (attempts.count >= MAX_ATTEMPTS) {
    const timePassed = Date.now() - attempts.firstAttempt;
    if (timePassed < LOCKOUT_TIME) {
      return true;
    } else {
      // Reset after lockout period
      delete loginAttempts[teamId];
      return false;
    }
  }
  return false;
}

function recordFailedAttempt(teamId) {
  if (!loginAttempts[teamId]) {
    loginAttempts[teamId] = { count: 0, firstAttempt: Date.now() };
  }
  loginAttempts[teamId].count++;
}

function resetLoginAttempts(teamId) {
  delete loginAttempts[teamId];
}

// Input validation
function validateInput(input) {
  if (!input || typeof input !== 'string') {
    return false;
  }
  // Remove potential XSS characters
  return input.replace(/[<>"'&]/g, '').trim();
}

// Shared HTML escape utility — use anywhere we inject text into innerHTML
function escapeHtml(text) {
  if (text === null || text === undefined) return '';
  const str = typeof text === 'object' ? JSON.stringify(text, null, 2) : String(text);
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}

function login() {
  const t = validateInput(document.getElementById("team").value);
  const p = validateInput(document.getElementById("pass").value);

  if (!t || !p) {
    showError("Invalid input format.");
    return;
  }

  if (isRateLimited(t)) {
    showError("Too many failed attempts. Please try again later.");
    return;
  }

  const hashedPassword = hashPassword(p);
  
  if (teams[t] === hashedPassword) {
    resetLoginAttempts(t);
    localStorage.setItem("team", t);
    window.onbeforeunload = null; // allow navigation
    window.location = "instructions.html";
  } else {
    recordFailedAttempt(t);
    const attempts = loginAttempts[t]?.count || 0;
    const remaining = MAX_ATTEMPTS - attempts;
    const errorMsg = remaining > 0 ? 
      `Invalid login credentials. ${remaining} attempts remaining.` : 
      "Too many failed attempts. Account locked for 15 minutes.";
    showError(errorMsg);
  }
}

function showError(message) {
  let errEl = document.getElementById("logErr");
  if (!errEl) {
    errEl = document.createElement("p");
    errEl.id = "logErr";
    errEl.style.color = "#ef4444";
    errEl.style.fontWeight = "bold";
    document.getElementById("logdiv").appendChild(errEl);
  }
  errEl.textContent = message; // textContent, not innerText — safer
}

// ================= FIREBASE SETUP (Exam Only) =================
let db;

if (window.location.pathname.includes("exam.html")) {
  // Use secure configuration
  const firebaseConfig = window.CONFIG?.FIREBASE_CONFIG;

  // Initialize Firebase with error handling
  try {
    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
    }
    db = firebase.firestore();
    
    // Configure Firebase security rules
    db.settings({
      timestampsInSnapshots: true
    });
  } catch (error) {
    console.error("Firebase initialization error:", error);
    // Fallback handling if Firebase fails
    document.body.innerHTML = `
      <div style="display:flex;align-items:center;justify-content:center;height:100vh;background:#0f0f0f;">
        <div style="text-align:center;color:white;font-family:sans-serif;">
          <h1 style="font-size:42px;color:#ef4444;">⚠️ Service Unavailable</h1>
          <p style="font-size:22px;margin-top:20px;color:#fbbf24;">Unable to connect to database.</p>
          <p style="font-size:18px;margin-top:10px;color:#9ca3af;">Please try again later.</p>
        </div>
      </div>`;
  }

  // ===== BLOCK RE-ENTRY: Check if team already submitted =====
  const loggedTeam = localStorage.getItem("team");
  if (loggedTeam && db) {
    db.collection("submissions").doc(loggedTeam).get().then(doc => {
      if (doc.exists) {
        const safeTeam = escapeHtml(loggedTeam);
        document.body.innerHTML = `
          <div style="display:flex;align-items:center;justify-content:center;height:100vh;background:#0f0f0f;">
            <div style="text-align:center;color:white;font-family:sans-serif;">
              <h1 style="font-size:42px;color:#ef4444;">🚫 Access Denied</h1>
              <p style="font-size:22px;margin-top:20px;color:#fbbf24;">Team <strong>${safeTeam}</strong> has already submitted the exam.</p>
              <p style="font-size:18px;margin-top:10px;color:#9ca3af;">You cannot retake the test once submitted.</p>
            </div>
          </div>`;
        // Prevent any further exam logic from running
        window.onbeforeunload = null;
      }
    }).catch(err => {
      console.error("Error checking submission status:", err);
    });
  }
}


// ================= AUTH GUARD =================
// Redirect to login if not authenticated on protected pages
if (
  (window.location.pathname.includes("exam.html") ||
   window.location.pathname.includes("instructions.html")) &&
  !localStorage.getItem("team")
) {
  window.location = "index.html";
}


// ================= START EXAM =================
function startExam() {
  window.onbeforeunload = null;
  window.location.href = "exam.html";
}


// ================= QUESTIONS =================
const pool = [
  `Fix this code:\n\nprint("Hello)`,

  `Fix this loop:\n\nfor i in range(5)\n  print(i)`,

  `Fix this array issue:\n\narr = [1,2,3]\nprint(arr[3])`,

  `Fix syntax error:\n\nif x == 10\n  print("yes")`,

  `Fix logic bug:\n\ndef add(a,b):\n  return a - b`
];


// ================= TIMER =================
// These are initialized properly when exam loads (see AUTO LOAD section)
let startTime = null;
let endTime = null;

function startTimer() {
  const teamId = localStorage.getItem("team") || "unknown";
  
  // Restore or initialize start time for accurate timeTaken calculation
  let savedStart = localStorage.getItem("examStartTime_" + teamId);
  if (savedStart && parseInt(savedStart) > 0) {
    startTime = parseInt(savedStart);
  } else {
    startTime = Date.now();
    localStorage.setItem("examStartTime_" + teamId, startTime);
  }

  let savedEnd = localStorage.getItem("examEndTime_" + teamId);
  if (savedEnd) {
    let parsedEnd = parseInt(savedEnd);
    if (parsedEnd > Date.now()) {
      // Valid saved timer — resume it
      endTime = parsedEnd;
    } else {
      // Timer expired! Prevent them from taking the test.
      endTime = parsedEnd;
      forceSubmit("Time Limit Exceeded", false);
      return;
    }
  } else {
    // No saved timer — brand new exam — start fresh (1 hour)
    endTime = Date.now() + 3600 * 1000; 
    localStorage.setItem("examEndTime_" + teamId, endTime);
  }

  const t = document.getElementById("timer");
  let interval;

  function updateTimerDisplay() {
    let remaining = Math.ceil((endTime - Date.now()) / 1000);

    if (remaining <= 0) {
      clearInterval(interval);
      t.innerText = "0:00";
      forceSubmit("Time Limit Exceeded", false);
      return;
    }

    let m = Math.floor(remaining / 60);
    let s = remaining % 60;

    t.innerText = m + ":" + (s < 10 ? "0" + s : s);

    // Color change based on time remaining
    if (remaining <= 60) {
      t.style.color = "#ef4444"; // red — last minute
      t.style.textShadow = "0 0 10px #ef4444";
    } else if (remaining <= 300) {
      t.style.color = "#f59e0b"; // amber — last 5 minutes
      t.style.textShadow = "0 0 10px #f59e0b";
    }
  }

  // Update immediately, then start interval
  updateTimerDisplay();
  interval = setInterval(updateTimerDisplay, 1000);
}


// ================= RUN CODE =================
async function runCode(i) {
  const outEl = document.getElementById("out" + i);
  outEl.textContent = "⏳ Running...";

  try {
    const code = editors[i].getValue();
    
    // Security: Validate code input
    if (!code || typeof code !== 'string') {
      outEl.textContent = "❌ Invalid code input.";
      return;
    }
    
    // Security: Check code length
    const maxLength = window.CONFIG?.SECURITY_CONFIG?.maxCodeLength || 5000;
    if (code.length > maxLength) {
      outEl.textContent = `❌ Code too long. Maximum ${maxLength} characters allowed.`;
      return;
    }
    
    // Security: Basic code sanitization — only block truly dangerous imports
    const sanitizedCode = sanitizeCode(code);
    if (sanitizedCode !== code) {
      outEl.textContent = "⚠️ Potentially unsafe code detected and modified.";
    }

    // Use secure configuration
    const judge0Config = window.CONFIG?.JUDGE0_CONFIG || {
      apiUrl: "https://ce.judge0.com/submissions",
      timeout: 10000
    };
    
    const url = `${judge0Config.apiUrl}?base64_encoded=false&wait=true`;
    const timeout = judge0Config.timeout || 10000;
    
    // Create abort controller for timeout
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout);

    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Requested-With": "XMLHttpRequest"
      },
      body: JSON.stringify({
        source_code: sanitizedCode,
        language_id: 71, // Python
        stdin: "",
        expected_output: "",
        cpu_time_limit: 2,
        memory_limit: 128000,
        max_file_size: 1024
      }),
      signal: controller.signal
    });

    clearTimeout(timeoutId);

    if (!res.ok) {
      outEl.textContent = `❌ Server error (${res.status}). Try again.`;
      return;
    }

    const data = await res.json();
    
    // Security: Validate response data
    if (data.error) {
      outEl.textContent = `❌ Execution error: ${data.error}`;
      return;
    }
    
    const output = data.stdout || data.stderr || data.compile_output || "No Output";
    
    // Security: Use textContent instead of innerHTML to prevent XSS
    outEl.textContent = typeof output === 'string' ? output.substring(0, 1000) : String(output);
    
  } catch (error) {
    if (error.name === 'AbortError') {
      outEl.textContent = "❌ Code execution timed out.";
    } else {
      outEl.textContent = "❌ Network error. Check your connection and try again.";
      console.error("Run code error:", error);
    }
  }
}

// Security: Code sanitization function
// Only blocks truly dangerous system-level calls; allows legitimate Python functions
function sanitizeCode(code) {
  const dangerousPatterns = [
    /import\s+os\b/gi,
    /import\s+subprocess\b/gi,
    /import\s+shutil\b/gi,
    /import\s+socket\b/gi,
    /import\s+ctypes\b/gi,
    /from\s+os\s+import/gi,
    /from\s+subprocess\s+import/gi,
    /from\s+shutil\s+import/gi,
    /from\s+socket\s+import/gi,
    /from\s+ctypes\s+import/gi,
    /__import__\s*\(/gi,
    /exec\s*\(/gi,
    /eval\s*\(/gi,
    /compile\s*\(\s*['"]/gi
  ];
  
  let sanitized = code;
  dangerousPatterns.forEach(pattern => {
    sanitized = sanitized.replace(pattern, '# BLOCKED: $&');
  });
  
  return sanitized;
}


// ================= BLOCK COPY/PASTE/CUT (Exam Only) =================
if (window.location.pathname.includes("exam.html")) {
  document.addEventListener("copy", e => e.preventDefault());
  document.addEventListener("paste", e => e.preventDefault());
  document.addEventListener("cut", e => e.preventDefault());
  document.addEventListener("contextmenu", e => e.preventDefault());

  // Block dangerous shortcuts but ALLOW editor shortcuts
  document.onkeydown = function(e) {
    // Allow Ctrl+Z (undo), Ctrl+Y (redo), Ctrl+A (select all), Ctrl+D (duplicate line)
    const allowedCtrl = ["z", "y", "a", "d"];
    
    if (e.ctrlKey) {
      if (allowedCtrl.includes(e.key.toLowerCase())) {
        return true; // allow these in editor
      }
      e.preventDefault();
      return false; // block Ctrl+C, Ctrl+V, Ctrl+S, Ctrl+Shift+I, etc.
    }

    if (e.key === "F12") { e.preventDefault(); return false; }
    if (e.key === "F5")  { e.preventDefault(); return false; }
    if (e.key === "F11") { e.preventDefault(); return false; }

    // Block Alt+F4 hint (can't fully prevent OS-level)
    if (e.altKey && e.key === "F4") { e.preventDefault(); return false; }
  };
}


// ================= EDITOR LOCKDOWN HELPER =================
// DRY helper — used by both submitExam() and forceSubmit()
function lockdownEditors() {
  editors.forEach((editor, i) => {
    const currentContent = editor.getValue();
    editor.updateOptions({ 
      readOnly: true,
      domReadOnly: true,
      scrollBeyondLastLine: false,
      renderLineHighlight: 'none',
      occurrencesHighlight: false,
      cursorBlinking: false,
      cursorStyle: 'line',
      renderWhitespace: 'none',
      renderControlCharacters: false,
      renderIndentGuides: false,
      renderLineNumbers: 'off'
    });
    
    // Force content to remain unchanged
    editor.setValue(currentContent);
    
    // Add content protection
    editor.onDidChangeModelContent(() => {
      setTimeout(() => { editor.setValue(currentContent); }, 0);
    });
    
    // Disable keyboard shortcuts
    if (typeof monaco !== 'undefined') {
      editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyZ, () => {});
      editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyY, () => {});
      editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyA, () => {});
      editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyC, () => {});
      editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyV, () => {});
    }
    
    // Disable mouse and keyboard interactions
    editor.onMouseDown(() => false);
    editor.onKeyDown(() => false);
    editor.onKeyUp(() => false);
  });
}


// ================= SUBMIT =================
let examSubmitted = false;

function submitExam() {
  if (examSubmitted) return;
  if (!confirm("Are you sure you want to submit?")) return;

  examSubmitted = true;
  
  // Disable submit button immediately
  const submitBtn = document.querySelector(".submitBox button");
  if (submitBtn) {
    submitBtn.disabled = true;
    submitBtn.innerText = "Submitting...";
    submitBtn.style.backgroundColor = "#6b7280";
    submitBtn.style.cursor = "not-allowed";
  }

  let responses = [];
  editors.forEach((editor, i) => {
    responses.push({
      questionNo: i + 1,
      questionText: pool[i],
      answer: editor.getValue()
    });
  });

  // Lock editors
  lockdownEditors();

  const team = localStorage.getItem("team");
  const timeTaken = startTime ? Math.floor((Date.now() - startTime) / 1000) : 0;
  const safeTeam = escapeHtml(team);

  db.collection("submissions").doc(team).get().then(doc => {
    if (doc.exists) {
      document.body.innerHTML = `<h1 style="color:white;text-align:center;margin-top:200px;">Already Submitted<br>Team: ${safeTeam}</h1>`;
      return;
    }

    db.collection("submissions").doc(team).set({
      team: team,
      answers: responses,
      timeTaken: timeTaken,
      timestamp: new Date()
    })
    .then(() => {
      window.onbeforeunload = null;
      document.querySelectorAll("button").forEach(btn => {
        btn.disabled = true;
      });
      document.body.innerHTML = `<h1 style="color:white;text-align:center;margin-top:200px;">✅ Submitted Successfully<br>Team: ${safeTeam}<br>Time: ${Math.floor(timeTaken/60)}m ${timeTaken%60}s</h1>`;
    })
    .catch((error) => {
      const btn = document.querySelector(".submitBox button");
      if(btn) { 
        btn.innerText = "❌ Error saving! Try again"; 
        setTimeout(() => btn.innerText="Submit Exam", 3000); 
      }
      console.error(error);
      examSubmitted = false;
    });
  });
}


// ================= FORCE SUBMIT (Malpractice or Timeout) =================
function forceSubmit(reasonMsg, isMalpractice = true) {
  if (examSubmitted) return;
  examSubmitted = true;

  let responses = [];
  editors.forEach((editor, i) => {
    responses.push({
      questionNo: i + 1,
      questionText: pool[i],
      answer: editor.getValue()
    });
  });

  // Lock editors
  lockdownEditors();

  const team = localStorage.getItem("team");
  const timeTaken = startTime ? Math.floor((Date.now() - startTime) / 1000) : 0;
  const safeTeam = escapeHtml(team);
  const safeReason = escapeHtml(reasonMsg);

  if (db) {
    db.collection("submissions").doc(team).get().then(doc => {
      if (doc.exists) return;

      let payload = {
        team: team,
        answers: responses,
        timeTaken: timeTaken,
        timestamp: new Date()
      };
      
      if (isMalpractice) {
        payload.malpractice = true;
        payload.malpracticeReason = reasonMsg || "Unknown";
      }

      db.collection("submissions").doc(team).set(payload);
    }).catch(err => {
      console.error("Force submit error:", err);
    });
  }

  window.onbeforeunload = null;
  
  if (isMalpractice) {
    const reasonHtml = safeReason ? `<br><br><span style="font-size:24px;color:#f87171;">Reason: ${safeReason}</span>` : "";
    document.body.innerHTML = `<h1 style='color:#ef4444;text-align:center;margin-top:200px;font-size:36px;'>❌ Exam Auto-Submitted<br>Malpractice Detected${reasonHtml}</h1>`;
  } else {
    document.querySelectorAll("button").forEach(btn => { btn.disabled = true; });
    document.body.innerHTML = `<h1 style="color:white;text-align:center;margin-top:200px;font-size:36px;">⏳ Time's Up!<br>Auto-Submitted Successfully<br><br><span style="font-size:24px;color:#22c55e;">Team: ${safeTeam}</span></h1>`;
  }
}


// ================= AUTO LOAD =================
let editors = [];

function initExam() {
  document.documentElement.requestFullscreen().then(() => {
    const overlay = document.getElementById("startOverlay");
    if (overlay) overlay.style.display = "none";
    setTimeout(() => { 
        // mark fullscreen is ready to turn on malpractice monitors securely
        window.fullscreenReady = true;
    }, 1000);
    loadQuestions();
    startTimer();
  }).catch(() => {
    const overlayBtn = document.querySelector("#startOverlay button");
    if(overlayBtn) {
      overlayBtn.innerText = "⚠️ Fullscreen blocked! Please click again";
      overlayBtn.style.background = "#f59e0b";
    }
  });
}

function loadQuestions() {
  const selected = pool.slice(0, 5);
  const container = document.getElementById("questions");

  selected.forEach((q, i) => {
    const safeQ = escapeHtml(q);
    container.innerHTML += `
      <div class="card">
        <h3>Q${i+1}: ${safeQ}</h3>
        <div id="editor${i}" class="editor"></div>
        <button onclick="runCode(${i})">▶ Run Code</button>
        <pre id="out${i}">Output will appear here...</pre>
      </div>
    `;
  });

  loadEditors(selected.length);
}


// Show team name
if (localStorage.getItem("team")) {
  const el = document.getElementById("teamName");
  if (el) el.textContent = localStorage.getItem("team");
}


// ================= MONACO =================
function loadEditors(count) {
  require.config({ paths: { vs: 'https://cdn.jsdelivr.net/npm/monaco-editor@0.44.0/min/vs' } });

  require(['vs/editor/editor.main'], function () {
    for (let i = 0; i < count; i++) {
      editors[i] = monaco.editor.create(document.getElementById('editor' + i), {
        value: "# Write your fixed code here...",
        language: "python",
        theme: "vs-dark",
        automaticLayout: true,
        fontSize: 14,
        minimap: { enabled: false }
      });
    }
  });
}


// ================= REFRESH WARNING (Exam Only) =================
if (window.location.pathname.includes("exam.html")) {
  window.onbeforeunload = function () {
    return "Exam is in progress!";
  };
}


// ================= CHECKBOX (Instructions Page Only) =================
const checkbox = document.getElementById("agree");
const startBtn = document.getElementById("startBtn");

if (checkbox && startBtn) {
  checkbox.addEventListener("change", () => {
    startBtn.disabled = !checkbox.checked;
  });
}


// ================= STRICT PROCTORING (Exam Page Only) =================
if (window.location.pathname.includes("exam.html")) {

  // --- Malpractice Tracking ---
  let warnings = 0;
  let malpracticeCooldown = false; // prevent double-fire
  let alertShowing = false; // suppress blur events while alert is open
  window.fullscreenReady = false; // exported globally to sync with initExam

  function malpractice(msg) {
    if (examSubmitted) return;
    if (malpracticeCooldown) return; // debounce rapid-fire events
    if (alertShowing) return; // don't trigger while an alert is showing

    // Set cooldown to prevent visibilitychange + blur from double-firing
    malpracticeCooldown = true;
    setTimeout(() => { malpracticeCooldown = false; }, 3000);

    warnings++;
    console.warn("🚨 MALPRACTICE #" + warnings + ": " + msg);

    if (warnings === 1) {
      alertShowing = true;
      
      const safeMsg = escapeHtml(msg);
      const warnOverlay = document.createElement("div");
      warnOverlay.id = "warnOverlay";
      warnOverlay.style = "position:fixed;top:0;left:0;width:100vw;height:100vh;background:rgba(220, 38, 38, 0.95);z-index:10000;display:flex;flex-direction:column;align-items:center;justify-content:center;color:white;";
      warnOverlay.innerHTML = `
        <h1 style="margin-bottom:20px; font-size: 32px;">⚠️ WARNING: ${safeMsg}</h1>
        <p style="margin-bottom:40px;font-size:20px;">Next violation will auto-submit your exam!</p>
        <button id="resumeBtn" style="padding:15px 30px;font-size:18px;background:white;color:#dc2626;border:none;border-radius:8px;font-weight:bold;cursor:pointer;">Acknowledge & Resume Screen</button>
      `;
      document.body.appendChild(warnOverlay);

      document.getElementById("resumeBtn").onclick = () => {
        document.documentElement.requestFullscreen().then(() => {
          warnOverlay.remove();
          // Reset cooldown after fullscreen re-enters
          setTimeout(() => { alertShowing = false; malpracticeCooldown = false; }, 1000);
        }).catch(() => {
          let errT = document.getElementById("fsErrText");
          if(!errT) {
             errT = document.createElement("p");
             errT.id = "fsErrText";
             errT.style.color = "#fef08a";
             errT.style.marginTop = "15px";
             errT.innerText = "Fullscreen request blocked by browser. Please click again firmly.";
             document.getElementById("warnOverlay").appendChild(errT);
          }
        });
      };
      
    } else {
      alertShowing = true;
      forceSubmit(msg);
      alertShowing = false;
    }
  }

  // --- Detect Fullscreen Exit (single listener) ---
  document.addEventListener("fullscreenchange", () => {
    if (!document.fullscreenElement && !examSubmitted && window.fullscreenReady && !alertShowing) {
      malpractice("Fullscreen exited");
    }
  });

  // --- Detect Tab Switch ---
  document.addEventListener("visibilitychange", () => {
    if (document.hidden && !examSubmitted && window.fullscreenReady) {
      malpractice("Tab switching detected");
    }
  });

  // --- Detect Window Blur (Alt+Tab) ---
  // NOTE: Uses the same cooldown as visibilitychange to prevent double-fire
  // Also suppressed when alertShowing=true to avoid alert() triggering blur
  window.addEventListener("blur", () => {
    if (!examSubmitted && window.fullscreenReady && !alertShowing) {
      malpractice("Window lost focus (possible Alt+Tab)");
    }
  });

  // --- Detect Window Resize / Split Screen ---
  setInterval(() => {
    if (examSubmitted || !window.fullscreenReady) return;
    if (
      window.innerWidth < screen.width - 150 ||
      window.innerHeight < screen.height - 150
    ) {
      malpractice("Window resized / split screen detected");
    }
  }, 2000);

  // --- Block Back Button (immediate force submit) ---
  history.pushState(null, null, location.href);
  window.addEventListener("popstate", function () {
    if (!examSubmitted) {
      history.pushState(null, null, location.href);
      forceSubmit("Browser back button pressed");
    }
  });

  // --- Detect DevTools Open (size-based heuristic) ---
  setInterval(() => {
    if (examSubmitted || !window.fullscreenReady) return;
    const widthThreshold = window.outerWidth - window.innerWidth > 200;
    const heightThreshold = window.outerHeight - window.innerHeight > 200;
    if (widthThreshold || heightThreshold) {
      malpractice("DevTools detected");
    }
  }, 3000);

}

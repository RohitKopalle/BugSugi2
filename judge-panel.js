// ================= JUDGES PANEL =================
let db;
let submissions = [];
let currentJudge = null;

// Judge credentials loaded from secure configuration
const VALID_CREDENTIALS = window.CONFIG?.JUDGE_CREDENTIALS || {
  judge1: {
    name: "Judge 1",
    passwordHash: "dd888a715d243b3e950ba7bb5878c8f7"
  },
  judge2: {
    name: "Judge 2", 
    passwordHash: "c89742577a2983d6562b6ee55625634d"
  }
};

// ================= MD5 HASH FUNCTION (self-contained for judge page) =================
// This page does NOT load script.js, so we need our own hashPassword
function hashPasswordLocal(password) {
  // Use global hashPassword if available (loaded via config.js or script.js)
  if (typeof window.hashPassword === 'function') {
    return window.hashPassword(password);
  }
  // Fallback: inline MD5 implementation
  function md5(string) {
    function RotateLeft(lValue, iShiftBits) {
      return (lValue<<iShiftBits) | (lValue>>>(32-iShiftBits));
    }
    function AddUnsigned(lX,lY) {
      var lX4,lY4,lX8,lY8,lResult;
      lX8 = (lX & 0x80000000); lY8 = (lY & 0x80000000);
      lX4 = (lX & 0x40000000); lY4 = (lY & 0x40000000);
      lResult = (lX & 0x3FFFFFFF)+(lY & 0x3FFFFFFF);
      if (lX4 & lY4) return (lResult ^ 0x80000000 ^ lX8 ^ lY8);
      if (lX4 | lY4) {
        if (lResult & 0x40000000) return (lResult ^ 0xC0000000 ^ lX8 ^ lY8);
        else return (lResult ^ 0x40000000 ^ lX8 ^ lY8);
      } else return (lResult ^ lX8 ^ lY8);
    }
    function F(x,y,z) { return (x & y) | ((~x) & z); }
    function G(x,y,z) { return (x & z) | (y & (~z)); }
    function H(x,y,z) { return (x ^ y ^ z); }
    function I(x,y,z) { return (y ^ (x | (~z))); }
    function FF(a,b,c,d,x,s,ac) { a = AddUnsigned(a, AddUnsigned(AddUnsigned(F(b,c,d),x),ac)); return AddUnsigned(RotateLeft(a,s),b); }
    function GG(a,b,c,d,x,s,ac) { a = AddUnsigned(a, AddUnsigned(AddUnsigned(G(b,c,d),x),ac)); return AddUnsigned(RotateLeft(a,s),b); }
    function HH(a,b,c,d,x,s,ac) { a = AddUnsigned(a, AddUnsigned(AddUnsigned(H(b,c,d),x),ac)); return AddUnsigned(RotateLeft(a,s),b); }
    function II(a,b,c,d,x,s,ac) { a = AddUnsigned(a, AddUnsigned(AddUnsigned(I(b,c,d),x),ac)); return AddUnsigned(RotateLeft(a,s),b); }
    function ConvertToWordArray(string) {
      var lWordCount, lMessageLength = string.length;
      var lNumberOfWords_temp1=lMessageLength + 8;
      var lNumberOfWords_temp2=(lNumberOfWords_temp1-(lNumberOfWords_temp1 % 64))/64;
      var lNumberOfWords = (lNumberOfWords_temp2+1)*16;
      var lWordArray=Array(lNumberOfWords-1);
      var lBytePosition = 0, lByteCount = 0;
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
      for (lCount=0;lCount<=3;lCount++) {
        lByte = (lValue>>>(lCount*8)) & 255;
        WordToHexValue_temp = "0" + lByte.toString(16);
        WordToHexValue = WordToHexValue + WordToHexValue_temp.substr(WordToHexValue_temp.length-2,2);
      }
      return WordToHexValue;
    }
    var x=Array();
    var k,AA,BB,CC,DD,a,b,c,d;
    var S11=7, S12=12, S13=17, S14=22;
    var S21=5, S22=9, S23=14, S24=20;
    var S31=4, S32=11, S33=16, S34=23;
    var S41=6, S42=10, S43=15, S44=21;
    string = string.replace(/\r\n/g,"\n");
    var utftext = "";
    for (var n = 0; n < string.length; n++) {
      var c = string.charCodeAt(n);
      if (c < 128) utftext += String.fromCharCode(c);
      else if((c > 127) && (c < 2048)) {
        utftext += String.fromCharCode((c >> 6) | 192);
        utftext += String.fromCharCode((c & 63) | 128);
      } else {
        utftext += String.fromCharCode((c >> 12) | 224);
        utftext += String.fromCharCode(((c >> 6) & 63) | 128);
        utftext += String.fromCharCode((c & 63) | 128);
      }
    }
    x = ConvertToWordArray(utftext);
    a = 0x67452301; b = 0xEFCDAB89; c = 0x98BADCFE; d = 0x10325476;
    for (k=0;k<x.length;k+=16) {
      AA=a; BB=b; CC=c; DD=d;
      a=FF(a,b,c,d,x[k+0],S11,0xD76AA478); d=FF(d,a,b,c,x[k+1],S12,0xE8C7B756);
      c=FF(c,d,a,b,x[k+2],S13,0x242070DB); b=FF(b,c,d,a,x[k+3],S14,0xC1BDCEEE);
      a=FF(a,b,c,d,x[k+4],S11,0xF57C0FAF); d=FF(d,a,b,c,x[k+5],S12,0x4787C62A);
      c=FF(c,d,a,b,x[k+6],S13,0xA8304613); b=FF(b,c,d,a,x[k+7],S14,0xFD469501);
      a=FF(a,b,c,d,x[k+8],S11,0x698098D8); d=FF(d,a,b,c,x[k+9],S12,0x8B44F7AF);
      c=FF(c,d,a,b,x[k+10],S13,0xFFFF5BB1); b=FF(b,c,d,a,x[k+11],S14,0x895CD7BE);
      a=FF(a,b,c,d,x[k+12],S11,0x6B901122); d=FF(d,a,b,c,x[k+13],S12,0xFD987193);
      c=FF(c,d,a,b,x[k+14],S13,0xA679438E); b=FF(b,c,d,a,x[k+15],S14,0x49B40821);
      a=GG(a,b,c,d,x[k+1],S21,0xF61E2562); d=GG(d,a,b,c,x[k+6],S22,0xC040B340);
      c=GG(c,d,a,b,x[k+11],S23,0x265E5A51); b=GG(b,c,d,a,x[k+0],S24,0xE9B6C7AA);
      a=GG(a,b,c,d,x[k+5],S21,0xD62F105D); d=GG(d,a,b,c,x[k+10],S22,0x2441453);
      c=GG(c,d,a,b,x[k+15],S23,0xD8A1E681); b=GG(b,c,d,a,x[k+4],S24,0xE7D3FBC8);
      a=GG(a,b,c,d,x[k+9],S21,0x21E1CDE6); d=GG(d,a,b,c,x[k+14],S22,0xC33707D6);
      c=GG(c,d,a,b,x[k+3],S23,0xF4D50D87); b=GG(b,c,d,a,x[k+8],S24,0x455A14ED);
      a=GG(a,b,c,d,x[k+13],S21,0xA9E3E905); d=GG(d,a,b,c,x[k+2],S22,0xFCEFA3F8);
      c=GG(c,d,a,b,x[k+7],S23,0x676F02D9); b=GG(b,c,d,a,x[k+12],S24,0x8D2A4C8A);
      a=HH(a,b,c,d,x[k+5],S31,0xFFFA3942); d=HH(d,a,b,c,x[k+8],S32,0x8771F681);
      c=HH(c,d,a,b,x[k+11],S33,0x6D9D6122); b=HH(b,c,d,a,x[k+14],S34,0xFDE5380C);
      a=HH(a,b,c,d,x[k+1],S31,0xA4BEEA44); d=HH(d,a,b,c,x[k+4],S32,0x4BDECFA9);
      c=HH(c,d,a,b,x[k+7],S33,0xF6BB4B60); b=HH(b,c,d,a,x[k+10],S34,0xBEBFBC70);
      a=HH(a,b,c,d,x[k+13],S31,0x289B7EC6); d=HH(d,a,b,c,x[k+0],S32,0xEAA127FA);
      c=HH(c,d,a,b,x[k+3],S33,0xD4EF3085); b=HH(b,c,d,a,x[k+6],S34,0x4881D05);
      a=HH(a,b,c,d,x[k+9],S31,0xD9D4D039); d=HH(d,a,b,c,x[k+12],S32,0xE6DB99E5);
      c=HH(c,d,a,b,x[k+15],S33,0x1FA27CF8); b=HH(b,c,d,a,x[k+2],S34,0xC4AC5665);
      a=II(a,b,c,d,x[k+0],S41,0xF4292244); d=II(d,a,b,c,x[k+7],S42,0x432AFF97);
      c=II(c,d,a,b,x[k+14],S43,0xAB9423A7); b=II(b,c,d,a,x[k+5],S44,0xFC93A039);
      a=II(a,b,c,d,x[k+12],S41,0x655B59C3); d=II(d,a,b,c,x[k+3],S42,0x8F0CCC92);
      c=II(c,d,a,b,x[k+10],S43,0xFFEFF47D); b=II(b,c,d,a,x[k+1],S44,0x85845DD1);
      a=II(a,b,c,d,x[k+8],S41,0x6FA87E4F); d=II(d,a,b,c,x[k+15],S42,0xFE2CE6E0);
      c=II(c,d,a,b,x[k+6],S43,0xA3014314); b=II(b,c,d,a,x[k+13],S44,0x4E0811A1);
      a=II(a,b,c,d,x[k+4],S41,0xF7537E82); d=II(d,a,b,c,x[k+11],S42,0xBD3AF235);
      c=II(c,d,a,b,x[k+2],S43,0x2AD7D2BB); b=II(b,c,d,a,x[k+9],S44,0xEB86D391);
      a=AddUnsigned(a,AA); b=AddUnsigned(b,BB); c=AddUnsigned(c,CC); d=AddUnsigned(d,DD);
    }
    var temp = WordToHex(a)+WordToHex(b)+WordToHex(c)+WordToHex(d);
    return temp.toLowerCase();
  }
  return md5(password);
}

// ================= HTML ESCAPE UTILITY =================
function escapeHtml(text) {
  if (text === null || text === undefined) return '';
  const str = typeof text === 'object' ? JSON.stringify(text, null, 2) : String(text);
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}

// Check authentication on page load
document.addEventListener('DOMContentLoaded', function() {
  checkAuthentication();
});

function checkAuthentication() {
  const authenticatedJudge = sessionStorage.getItem('authenticatedJudge');
  if (authenticatedJudge) {
    // Already authenticated, show main panel
    currentJudge = authenticatedJudge;
    showMainPanel();
    initializeFirebase();
    loadSubmissions();
    setInterval(loadSubmissions, 30000);
  } else {
    // Show authentication overlay
    showAuthOverlay();
  }
}

function showAuthOverlay() {
  document.getElementById('judgeAuthOverlay').style.display = 'flex';
  document.getElementById('mainPanel').style.display = 'none';
}

function showMainPanel() {
  document.getElementById('judgeAuthOverlay').style.display = 'none';
  document.getElementById('mainPanel').style.display = 'block';
  
  // Update display with current judge name
  const judgeName = VALID_CREDENTIALS[currentJudge]?.name || 'Judge';
  document.getElementById('currentJudgeDisplay').textContent = judgeName;
}

function authenticateJudge() {
  const judgeId = document.getElementById('judgeId').value;
  const password = document.getElementById('judgePassword').value;
  const errorDiv = document.getElementById('authError');
  
  // Reset error
  errorDiv.style.display = 'none';
  errorDiv.textContent = '';
  
  // Validate inputs
  if (!judgeId) {
    showAuthError('Please select a judge ID');
    return;
  }
  
  if (!password) {
    showAuthError('Please enter password');
    return;
  }
  
  // Check credentials
  const judge = VALID_CREDENTIALS[judgeId];
  if (!judge) {
    showAuthError('Invalid judge ID');
    return;
  }
  
  // Hash the entered password and compare
  const hashedPassword = hashPasswordLocal(password);
  if (hashedPassword !== judge.passwordHash) {
    showAuthError('Invalid password');
    return;
  }
  
  // Authentication successful
  currentJudge = judgeId;
  sessionStorage.setItem('authenticatedJudge', judgeId);
  
  // Show main panel and initialize
  showMainPanel();
  initializeFirebase();
  loadSubmissions();
  setInterval(loadSubmissions, 30000);
}

function showAuthError(message) {
  const errorDiv = document.getElementById('authError');
  errorDiv.textContent = '⚠️ ' + message;
  errorDiv.style.display = 'block';
}

function logoutJudge() {
  if (confirm('Are you sure you want to logout?')) {
    currentJudge = null;
    sessionStorage.removeItem('authenticatedJudge');
    showAuthOverlay();
    
    // Clear form
    document.getElementById('judgeId').value = '';
    document.getElementById('judgePassword').value = '';
    document.getElementById('authError').style.display = 'none';
  }
}


function initializeFirebase() {
  try {
    const firebaseConfig = window.CONFIG?.FIREBASE_CONFIG;

    // Only initialize if not already initialized
    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
    }
    db = firebase.firestore();
    
    db.settings({
      timestampsInSnapshots: true
    });
    
    console.log("Firebase initialized for judges panel");
  } catch (error) {
    console.error("Firebase initialization error:", error);
    showError("Failed to connect to database. Please check your configuration.");
  }
}

async function loadSubmissions() {
  if (!db) {
    showError("Database not connected");
    return;
  }

  try {
    const snapshot = await db.collection('submissions').get({ source: 'server' });
    submissions = [];
    
    snapshot.forEach(doc => {
      const data = doc.data();
      submissions.push({
        id: doc.id,
        ...data,
        timestamp: data.timestamp?.toDate() || new Date()
      });
    });

    // Sort by timestamp (newest first for submissions, fastest time for leaderboard)
    submissions.sort((a, b) => b.timestamp - a.timestamp);
    
    updateStatistics();
    displaySubmissions();
    displayLeaderboard();
    
  } catch (error) {
    console.error("Error loading submissions:", error);
    showError("Failed to load submissions: " + error.message);
  }
}

function updateStatistics() {
  const totalSubmissions = submissions.length;
  const activeTeams = submissions.length;
  const malpracticeCount = submissions.filter(s => s.malpractice).length;
  
  let totalTime = 0;
  let validTimes = 0;
  
  submissions.forEach(submission => {
    if (submission.timeTaken && submission.timeTaken > 0) {
      totalTime += submission.timeTaken;
      validTimes++;
    }
  });
  
  const avgTime = validTimes > 0 ? Math.round(totalTime / validTimes / 60) : 0;
  
  document.getElementById('totalSubmissions').textContent = totalSubmissions;
  document.getElementById('activeTeams').textContent = activeTeams;
  document.getElementById('avgTime').textContent = avgTime;
  document.getElementById('malpracticeCount').textContent = malpracticeCount;
}

function displaySubmissions() {
  const container = document.getElementById('submissionsList');
  
  if (!currentJudge) {
    container.innerHTML = '<div class="loading">Please select a judge to continue</div>';
    return;
  }
  
  if (submissions.length === 0) {
    container.innerHTML = '<div class="loading">No submissions yet</div>';
    return;
  }
  
  // Show submissions that need grading by current judge
  const pendingGrading = submissions.filter(s => {
    const judgeGrading = s.judgeGrading || {};
    const alreadyGradedByCurrentJudge = judgeGrading[currentJudge]?.score !== undefined;
    return !alreadyGradedByCurrentJudge && !s.malpractice;
  });
  
  if (pendingGrading.length === 0) {
    container.innerHTML = '<div class="loading">All submissions graded by you! 🎉</div>';
    return;
  }
  
  container.innerHTML = pendingGrading.map(submission => {
    const time = formatTime(submission.timestamp);
    const duration = formatDuration(submission.timeTaken);
    const judgeGrading = submission.judgeGrading || {};
    const otherJudge = currentJudge === 'judge1' ? 'judge2' : 'judge1';
    const otherJudgeGraded = judgeGrading[otherJudge]?.score !== undefined;
    const otherJudgeBadge = otherJudgeGraded ? 
      `<span class="graded-badge" style="background: #3b82f6;">${escapeHtml(otherJudge === 'judge1' ? 'Judge 1' : 'Judge 2')} graded</span>` : '';
    
    // Escape the submission ID to prevent injection via crafted document IDs
    const safeId = escapeHtml(submission.id);
    const safeTeam = escapeHtml(submission.team);
    
    return `
      <div class="submission-item">
        <div class="submission-header">
          <span class="team-name">${safeTeam}</span>
          <span class="submission-time">${escapeHtml(time)}</span>
        </div>
        <div class="submission-stats">
          <span>⏱️ ${escapeHtml(duration)}</span>
          <span>📝 ${submission.answers?.length || 0} questions</span>
          ${otherJudgeBadge}
          <button class="grade-btn" data-submission-id="${safeId}">📝 Grade</button>
        </div>
      </div>
    `;
  }).join('');
  
  // Attach event listeners instead of inline onclick (prevents injection)
  container.querySelectorAll('.grade-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      openGradingModal(btn.getAttribute('data-submission-id'));
    });
  });
}

function displayLeaderboard() {
  const tbody = document.getElementById('leaderboardBody');
  
  if (submissions.length === 0) {
    tbody.innerHTML = '<tr><td colspan="5" class="loading">No submissions yet</td></tr>';
    return;
  }
  
  // Calculate average scores and filter submissions with both judges graded
  const validSubmissions = submissions
    .filter(s => !s.malpractice && s.timeTaken !== undefined)
    .map(s => {
      const judgeGrading = s.judgeGrading || {};
      const judge1Score = judgeGrading.judge1?.score;
      const judge2Score = judgeGrading.judge2?.score;
      
      let averageScore = 0;
      let status = 'Pending';
      let gradedBadge = '';
      
      if (judge1Score !== undefined && judge2Score !== undefined) {
        averageScore = Math.round((judge1Score + judge2Score) / 2);
        status = '✅ Graded';
        gradedBadge = '<span class="graded-badge">✓ Both Judges</span>';
      } else if (judge1Score !== undefined || judge2Score !== undefined) {
        averageScore = judge1Score !== undefined ? judge1Score : judge2Score;
        status = '⏳ Partial';
        gradedBadge = '<span class="graded-badge" style="background: #f59e0b;">⏳ One Judge</span>';
      }
      
      return {
        ...s,
        averageScore,
        status,
        gradedBadge,
        judge1Score,
        judge2Score
      };
    })
    .sort((a, b) => {
      // First sort by average score (highest first)
      if (b.averageScore !== a.averageScore) {
        return b.averageScore - a.averageScore;
      }
      // Then by time taken (fastest first)
      return a.timeTaken - b.timeTaken;
    });
  
  tbody.innerHTML = validSubmissions.map((submission, index) => {
    const rank = index + 1;
    const rankClass = rank === 1 ? 'rank-1' : rank === 2 ? 'rank-2' : rank === 3 ? 'rank-3' : '';
    const duration = formatDuration(submission.timeTaken);
    const medal = rank === 1 ? '🥇' : rank === 2 ? '🥈' : rank === 3 ? '🥉' : `${rank}.`;
    const safeTeam = escapeHtml(submission.team);
    
    return `
      <tr>
        <td class="${rankClass}">${medal}</td>
        <td>${safeTeam} ${submission.gradedBadge}</td>
        <td><strong>${submission.averageScore}/100</strong></td>
        <td>${escapeHtml(duration)}</td>
        <td>${escapeHtml(submission.status)}</td>
      </tr>
    `;
  }).join('');
}

function formatTime(date) {
  if (!date) return 'Unknown';
  
  const now = new Date();
  const diff = now - date;
  
  if (diff < 60000) {
    return 'Just now';
  } else if (diff < 3600000) {
    return Math.floor(diff / 60000) + ' min ago';
  } else if (diff < 86400000) {
    return Math.floor(diff / 3600000) + ' hours ago';
  } else {
    return date.toLocaleDateString();
  }
}

function formatDuration(seconds) {
  if (!seconds || seconds <= 0) return 'N/A';
  
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  
  if (minutes === 0) {
    return `${remainingSeconds}s`;
  } else {
    return `${minutes}m ${remainingSeconds}s`;
  }
}

function refreshData() {
  const btn = document.querySelector('.refresh-btn');
  btn.textContent = '🔄 Refreshing...';
  btn.disabled = true;
  
  loadSubmissions().then(() => {
    btn.textContent = '🔄 Refresh Data';
    btn.disabled = false;
  }).catch(() => {
    btn.textContent = '❌ Refresh Failed';
    btn.disabled = false;
    setTimeout(() => {
      btn.textContent = '🔄 Refresh Data';
    }, 2000);
  });
}

function showError(message) {
  const container = document.getElementById('submissionsList');
  container.innerHTML = `<div class="error">⚠️ ${escapeHtml(message)}</div>`;
}

// ================= GRADING MODAL FUNCTIONS =================
let currentGradingSubmission = null;

function changeJudge() {
  const select = document.getElementById('judgeSelect');
  currentJudge = select.value;
  
  if (currentJudge) {
    refreshData();
  } else {
    document.getElementById('submissionsList').innerHTML = '<div class="loading">Please select a judge to continue</div>';
  }
}

function openGradingModal(submissionId) {
  if (!currentJudge) {
    alert('Please select a judge first');
    return;
  }
  
  const submission = submissions.find(s => s.id === submissionId);
  if (!submission) {
    alert('Submission not found');
    return;
  }
  
  currentGradingSubmission = submission;
  
  // Set team name in modal header
  const judgeName = currentJudge === 'judge1' ? 'Judge 1' : 'Judge 2';
  document.getElementById('gradingTeamName').textContent = `${submission.team} - ${judgeName} Grading`;
  
  // Load questions and answers
  loadQuestionsForGrading(submission);
  
  // Display other judges' scores
  displayOtherJudgesScores(submission);
  
  // Set existing score for current judge
  const judgeGrading = submission.judgeGrading || {};
  const currentJudgeData = judgeGrading[currentJudge] || {};
  document.getElementById('totalScore').value = currentJudgeData.score || 0;
  
  // Calculate and display average
  calculateAverageScore(submission);
  
  // Show modal
  document.getElementById('gradingModal').style.display = 'flex';
}

function displayOtherJudgesScores(submission) {
  const container = document.getElementById('otherJudgesScores');
  const judgeGrading = submission.judgeGrading || {};
  const otherJudge = currentJudge === 'judge1' ? 'judge2' : 'judge1';
  const otherJudgeData = judgeGrading[otherJudge];
  
  if (otherJudgeData && otherJudgeData.score !== undefined) {
    const otherJudgeName = escapeHtml(otherJudge === 'judge1' ? 'Judge 1' : 'Judge 2');
    container.innerHTML = `
      <div style="text-align: center; padding: 10px;">
        <div style="font-size: 14px; color: #9ca3af; text-transform: uppercase; letter-spacing: 0.5px; font-weight: 600; margin-bottom: 5px;">
          ${otherJudgeName} Score
        </div>
        <div style="font-size: 32px; font-weight: bold; color: #3b82f6;">
          ${parseInt(otherJudgeData.score) || 0}
        </div>
      </div>
    `;
  } else {
    const otherJudgeName = escapeHtml(otherJudge === 'judge1' ? 'Judge 1' : 'Judge 2');
    container.innerHTML = `
      <div style="text-align: center; padding: 20px 10px; color: #6b7280; font-style: italic;">
        <span style="font-size: 24px; display: block; margin-bottom: 5px;">⏳</span>
        ${otherJudgeName} has not graded<br>this submission yet
      </div>
    `;
  }
}

function calculateAverageScore(submission) {
  const currentScore = parseInt(document.getElementById('totalScore').value) || 0;
  const judgeGrading = submission.judgeGrading || {};
  const otherJudge = currentJudge === 'judge1' ? 'judge2' : 'judge1';
  const otherScore = judgeGrading[otherJudge]?.score || 0;
  
  let average = currentScore;
  if (otherScore > 0) {
    average = Math.round((currentScore + otherScore) / 2);
  }
  
  document.getElementById('averageScore').value = average;
}

function loadQuestionsForGrading(submission) {
  const container = document.getElementById('questionsContainer');
  
  if (!submission.answers || submission.answers.length === 0) {
    container.innerHTML = '<p style="color: #9ca3af;">No answers found for this submission.</p>';
    return;
  }
  
  // Use shared question pool from configuration
  const questions = window.CONFIG?.QUESTIONS_POOL || [];
  
  container.innerHTML = submission.answers.map((answer, index) => {
    const question = questions[index] || {};
    
    // Handle answer objects {questionNo, questionText, answer} vs raw strings
    const answerText = typeof answer === 'object' ? (answer.answer || JSON.stringify(answer)) : String(answer);
    
    const safeTitle = escapeHtml(question.title || `Question ${index + 1}`);
    const safeExpected = escapeHtml(question.expectedOutput || "N/A");
    const safeInitial = escapeHtml(question.initialCode || "N/A");
    const safeAnswer = escapeHtml(answerText);
    
    return `
      <div class="question-item">
        <div class="question-header">
          <div class="question-title">Q${index + 1}: ${safeTitle}</div>
        </div>
        
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px; margin-bottom: 15px;">
          <div>
            <div style="font-size: 11px; color: #9ca3af; margin-bottom: 5px; text-transform: uppercase; font-weight: bold; letter-spacing: 0.5px;">Original Buggy Code</div>
            <div class="question-text" style="background: rgba(239, 68, 68, 0.05); border: 1px solid rgba(239, 68, 68, 0.2); border-radius: 6px; padding: 10px; font-family: 'Consolas', monospace; font-size: 12px; color: #fca5a5; margin-bottom: 0;">${safeInitial}</div>
          </div>
          <div>
            <div style="font-size: 11px; color: #9ca3af; margin-bottom: 5px; text-transform: uppercase; font-weight: bold; letter-spacing: 0.5px;">Expected Output</div>
            <div class="question-text" style="background: rgba(34, 197, 94, 0.05); border: 1px solid rgba(34, 197, 94, 0.2); border-radius: 6px; padding: 10px; font-family: 'Consolas', monospace; font-size: 12px; color: #86efac; margin-bottom: 0;">${safeExpected}</div>
          </div>
        </div>

        <div style="font-size: 11px; color: #9ca3af; margin-bottom: 5px; text-transform: uppercase; font-weight: bold; letter-spacing: 0.5px;">Student's Submitted Fix</div>
        <div class="answer-code" style="border: 2px solid rgba(34, 197, 94, 0.3); background: #0f172a; color: #f8fafc;">${safeAnswer}</div>
      </div>
    `;
  }).join('');
}

function calculateTotalScore() {
  const totalInput = document.getElementById('totalScore');
  let total = parseInt(totalInput.value) || 0;
  
  if (total > 100) totalInput.value = 100;
  if (total < 0) totalInput.value = 0;
  
  // Update average score when total changes
  if (currentGradingSubmission) {
    calculateAverageScore(currentGradingSubmission);
  }
}

function closeGradingModal() {
  document.getElementById('gradingModal').style.display = 'none';
  currentGradingSubmission = null;
}

async function saveGrading() {
  if (!currentGradingSubmission || !db || !currentJudge) {
    alert('Cannot save grading: Missing submission, database connection, or judge selection');
    return;
  }
  
  const totalScore = parseInt(document.getElementById('totalScore').value) || 0;
  
  // Validate score range
  if (totalScore < 0 || totalScore > 100) {
    alert('Score must be between 0 and 100');
    return;
  }
  
  // Question scores are removed as requested
  const questionScores = [];
  
  try {
    // Get existing judge grading data
    const existingData = currentGradingSubmission.judgeGrading || {};
    
    // Update the submission with current judge's grading data
    const updateData = {
      judgeGrading: {
        ...existingData,
        [currentJudge]: {
          score: totalScore,
          questionScores: questionScores,
          gradedAt: new Date(),
          judgeName: currentJudge === 'judge1' ? 'Judge 1' : 'Judge 2'
        }
      }
    };
    
    // Calculate average score if both judges have graded
    const otherJudge = currentJudge === 'judge1' ? 'judge2' : 'judge1';
    if (existingData[otherJudge]?.score) {
      const otherScore = existingData[otherJudge].score;
      updateData.averageScore = Math.round((totalScore + otherScore) / 2);
      updateData.fullyGraded = true;
    }
    
    await db.collection('submissions').doc(currentGradingSubmission.id).update(updateData);
    
    // Update local data
    currentGradingSubmission.judgeGrading = updateData.judgeGrading;
    if (updateData.averageScore) {
      currentGradingSubmission.averageScore = updateData.averageScore;
    }
    
    // Close modal and refresh data
    closeGradingModal();
    refreshData();
    
    const judgeName = currentJudge === 'judge1' ? 'Judge 1' : 'Judge 2';
    alert(`${judgeName} grading saved successfully! Score: ${totalScore}/100`);
    
  } catch (error) {
    console.error('Error saving grading:', error);
    alert('Failed to save grading: ' + error.message);
  }
}

// Export functions for potential external use
window.JudgesPanel = {
  refreshData,
  loadSubmissions,
  submissions: () => submissions,
  openGradingModal,
  closeGradingModal,
  saveGrading
};

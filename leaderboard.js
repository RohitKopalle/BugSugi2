// ================= LEADERBOARD =================
let db;
let submissions = [];

// HTML escape utility
function escapeHtml(text) {
  if (text === null || text === undefined) return '';
  const str = typeof text === 'object' ? JSON.stringify(text, null, 2) : String(text);
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}

// Initialize Firebase and load data
document.addEventListener('DOMContentLoaded', function() {
  initializeFirebase();
  loadLeaderboard();
  // Auto-refresh every 60 seconds
  setInterval(loadLeaderboard, 60000);
});

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
    
    console.log("Firebase initialized for leaderboard");
  } catch (error) {
    console.error("Firebase initialization error:", error);
    showError("Failed to connect to database. Please check your configuration.");
  }
}

async function loadLeaderboard() {
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

    updateStatistics();
    displayLeaderboard();
    updateLastRefreshTime();
    
  } catch (error) {
    console.error("Error loading leaderboard:", error);
    showError("Failed to load leaderboard: " + error.message);
  }
}

function updateStatistics() {
  const totalParticipants = submissions.length;
  const completedCount = submissions.filter(s => s.timeTaken !== undefined).length;
  const validSubmissions = submissions.filter(s => !s.malpractice && s.timeTaken !== undefined);
  
  // Fastest time
  let fastestTime = '--:--';
  if (validSubmissions.length > 0) {
    const fastest = validSubmissions.reduce((min, curr) => 
      curr.timeTaken < min.timeTaken ? curr : min
    );
    fastestTime = formatDuration(fastest.timeTaken);
  }
  
  // Average time
  let avgTime = '--:--';
  if (validSubmissions.length > 0) {
    const totalTime = validSubmissions.reduce((sum, curr) => sum + curr.timeTaken, 0);
    const avgSeconds = Math.round(totalTime / validSubmissions.length);
    avgTime = formatDuration(avgSeconds);
  }
  
  document.getElementById('totalParticipants').textContent = totalParticipants;
  document.getElementById('completedCount').textContent = completedCount;
  document.getElementById('fastestTime').textContent = fastestTime;
  document.getElementById('avgTime').textContent = avgTime;
}

function displayLeaderboard() {
  const tbody = document.getElementById('leaderboardBody');
  
  if (submissions.length === 0) {
    tbody.innerHTML = `
      <tr>
        <td colspan="4" class="empty-state">
          <h3>🏁 No Submissions Yet</h3>
          <p>The competition hasn't started or no teams have submitted yet.</p>
          <p>Check back soon for live results!</p>
        </td>
      </tr>
    `;
    return;
  }
  
  // Calculate average scores and filter submissions with at least one judge graded
  const validSubmissions = submissions
    .filter(s => !s.malpractice && s.timeTaken !== undefined)
    .map(s => {
      const judgeGrading = s.judgeGrading || {};
      const judge1Score = judgeGrading.judge1?.score;
      const judge2Score = judgeGrading.judge2?.score;
      
      let averageScore = undefined;
      let status = 'Pending';
      
      if (judge1Score !== undefined && judge2Score !== undefined) {
        averageScore = Math.round((judge1Score + judge2Score) / 2);
        status = '✅ Graded';
      } else if (judge1Score !== undefined || judge2Score !== undefined) {
        averageScore = judge1Score !== undefined ? judge1Score : judge2Score;
        status = '⏳ Partial';
      }
      
      return {
        ...s,
        averageScore,
        status
      };
    })
    .filter(s => s.averageScore !== undefined) // Only show submissions with at least one grade
    .sort((a, b) => {
      // Sort by average score (highest first), then by time taken (fastest)
      if (b.averageScore !== a.averageScore) {
        return b.averageScore - a.averageScore;
      }
      return a.timeTaken - b.timeTaken;
    });
  
  if (validSubmissions.length === 0) {
    tbody.innerHTML = `
      <tr>
        <td colspan="4" class="empty-state">
          <h3>⏳ Awaiting Grading</h3>
          <p>Teams have submitted but judges are still grading.</p>
          <p>Check back soon for graded results!</p>
        </td>
      </tr>
    `;
    return;
  }
  
  tbody.innerHTML = validSubmissions.map((submission, index) => {
    const rank = index + 1;
    const rankClass = rank === 1 ? 'rank-1' : rank === 2 ? 'rank-2' : rank === 3 ? 'rank-3' : '';
    const duration = formatDuration(submission.timeTaken);
    const medal = rank === 1 ? '🥇' : rank === 2 ? '🥈' : rank === 3 ? '🥉' : `${rank}.`;
    const safeTeam = escapeHtml(submission.team);
    
    return `
      <tr>
        <td class="rank-cell ${rankClass}">${medal}</td>
        <td class="team-cell">${safeTeam}</td>
        <td class="time-cell">${escapeHtml(duration)}</td>
        <td class="status-cell">${escapeHtml(submission.status)}</td>
      </tr>
    `;
  }).join('');
}

function formatDuration(seconds) {
  if (!seconds || seconds <= 0) return '--:--';
  
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  
  if (minutes === 0) {
    return `${remainingSeconds}s`;
  } else if (minutes < 10) {
    return `${minutes}m ${remainingSeconds}s`;
  } else {
    return `${minutes}m ${remainingSeconds}s`;
  }
}

function refreshLeaderboard() {
  const btn = document.querySelector('.refresh-btn');
  btn.textContent = '🔄 Refreshing...';
  btn.disabled = true;
  
  loadLeaderboard().then(() => {
    btn.textContent = '🔄 Refresh';
    btn.disabled = false;
  }).catch(() => {
    btn.textContent = '❌ Refresh Failed';
    btn.disabled = false;
    setTimeout(() => {
      btn.textContent = '🔄 Refresh';
    }, 2000);
  });
}

function updateLastRefreshTime() {
  const now = new Date();
  const timeString = now.toLocaleTimeString();
  document.getElementById('lastUpdated').textContent = timeString;
}

function showError(message) {
  const tbody = document.getElementById('leaderboardBody');
  tbody.innerHTML = `
    <tr>
      <td colspan="4" class="error">
        ⚠️ ${escapeHtml(message)}
      </td>
    </tr>
  `;
}

// Export functions for potential external use
window.Leaderboard = {
  refreshLeaderboard,
  loadLeaderboard,
  submissions: () => submissions
};

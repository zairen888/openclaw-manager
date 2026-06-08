// 鈹€鈹€ Auth 鈹€鈹€
const ACCOUNTS = { admin: { pass: 'admin123', role: '绠＄悊鍛?, label: 'admin' }, operator: { pass: 'op123', role: '鎿嶄綔鍛?, label: 'operator' }, viewer: { pass: 'view123', role: '瑙傚療鑰?, label: 'viewer' } };
let currentUser = null;

function handleLogin() {
  const u = document.getElementById('loginUser').value.trim();
  const p = document.getElementById('loginPass').value.trim();
  const err = document.getElementById('loginError');
  if (ACCOUNTS[u] && ACCOUNTS[u].pass === p) {
    currentUser = u;
    document.getElementById('loginOverlay').classList.add('hidden');
    document.getElementById('appWindow').style.display = 'flex';
    document.getElementById('userName').textContent = u;
    document.getElementById('userRole').textContent = ACCOUNTS[u].role;
    document.getElementById('userAvatar').textContent = u[0].toUpperCase();
    document.getElementById('dashUser').textContent = u;
    initApp();
  } else {
    err.textContent = '鐢ㄦ埛鍚嶆垨瀵嗙爜閿欒';
  }
}

function handleLogout() {
  currentUser = null;
  document.getElementById('appWindow').style.display = 'none';
  document.getElementById('loginOverlay').classList.remove('hidden');
  document.getElementById('loginError').textContent = '';
}

// 鈹€鈹€ Toast 鈹€鈹€
function showToast(msg, type) {
  const t = document.getElementById('toast');
  t.textContent = msg; t.className = 'toast ' + type + ' show';
  setTimeout(() => t.classList.remove('show'), 2200);
}

// 鈹€鈹€ Page system 鈹€鈹€
const PAGES = {};

function switchPage(id) {
  document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
  document.querySelector(`.nav-item[data-page="${id}"]`).classList.add('active');
  document.getElementById('breadcrumbCurrent').textContent = document.querySelector(`.nav-item[data-page="${id}"]`).textContent.trim();
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.getElementById('page-' + id).classList.add('active');
}

// 鈹€鈹€ Pages content 鈹€鈹€
function initApp() {
  const c = document.getElementById('pageContent');
  c.innerHTML = `
    <!-- Dashboard -->
    <div class="page active" id="page-dashboard">
      <div class="welcome"><h1>馃憢 娆㈣繋鍥炴潵锛?span id="dashUser">${currentUser}</span></h1><p>OpenClaw v1.5.0 渚挎惡鐗?路 涓€鍒囪繍琛屾甯?/p></div>
      <div class="quick-stats">
        <div class="stat-card"><div class="num green">杩愯涓?/div><div class="label">缃戝叧鐘舵€?/div><div class="sub">绔彛 18789</div></div>
        <div class="stat-card"><div class="num yellow">7</div><div class="label">宸插惎鐢ㄦ妧鑳?/div><div class="sub">鍏?9 涓?/div></div>
        <div class="stat-card"><div class="num blue">4</div><div class="label">妯″瀷鎺ュ叆</div><div class="sub">鍏ㄩ儴鍦ㄧ嚎</div></div>
        <div class="stat-card"><div class="num">99.8%</div><div class="label">杩愯鏃堕棿</div><div class="sub">杩?7 澶?/div></div>
      </div>
      <div class="section-header"><h2>馃攧 鏈€杩戞棩蹇?/h2><span class="more" onclick="switchPage('logs')">鏌ョ湅鍏ㄩ儴 鈫?/span></div>
      <div class="log-viewer">
        <div class="log-header"><h3>馃搵 瀹炴椂鏃ュ織杈撳嚭</h3><span class="clear-btn" onclick="clearLog()">娓呯┖</span></div>
        <div class="log-body" id="logBody">
          <div class="line"><span class="time">[22:45:01]</span> <span class="info">[INFO]</span> 缃戝叧鏈嶅姟鍚姩瀹屾垚</div>
          <div class="line"><span class="time">[22:45:01]</span> <span class="info">[INFO]</span> 绔彛 18789 宸茬粦瀹?/div>
          <div class="line"><span class="time">[22:45:02]</span> <span class="info">[INFO]</span> 宸插姞杞?7 涓妧鑳芥ā鍧?/div>
          <div class="line"><span class="time">[22:45:03]</span> <span class="warn">[WARN]</span> WebSocket 蹇冭烦瓒呮椂锛岃嚜鍔ㄩ噸杩炰腑...</div>
          <div class="line"><span class="time">[22:45:04]</span> <span class="info">[INFO]</span> WebSocket 閲嶈繛鎴愬姛</div>
          <div class="line"><span class="time">[22:45:05]</span> <span class="info">[INFO]</span> 绯荤粺灏辩华锛岀瓑寰呮寚浠?..</div>
        </div>
      </div>
      <div class="section-header" style="margin-top:16px"><h2>鈿?蹇嵎鎿嶄綔</h2></div>
      <div style="display:flex;gap:8px;flex-wrap:wrap">
        <button class="btn-primary" onclick="showToast('缃戝叧宸查噸鍚?,'success')">閲嶅惎缃戝叧</button>
        <button class="btn-secondary" onclick="showToast('姝ｅ湪淇閰嶇疆...','info')">淇閰嶇疆</button>
        <button class="btn-secondary" style="color:#ff453a;border-color:rgba(255,69,58,0.2)" onclick="showToast('缃戝叧宸插仠姝?,'error')">鍋滄鏈嶅姟</button>
      </div>
    </div>

    <!-- Usage -->
    <div class="page" id="page-usage">
      <div class="welcome"><h1>馃搱 妯″瀷璋冪敤缁熻</h1><p>杩?7 澶?API 璋冪敤鐢ㄩ噺姒傝</p></div>
      <div class="usage-chart">
        <div class="usage-bar" style="height:65px;background:rgba(52,199,89,0.6)"><span class="bar-label">鍛ㄤ竴</span><span class="bar-val">12.4k</span></div>
        <div class="usage-bar" style="height:80px;background:rgba(90,200,250,0.6)"><span class="bar-label">鍛ㄤ簩</span><span class="bar-val">15.8k</span></div>
        <div class="usage-bar" style="height:50px;background:rgba(52,199,89,0.5)"><span class="bar-label">鍛ㄤ笁</span><span class="bar-val">9.2k</span></div>
        <div class="usage-bar" style="height:95px;background:rgba(90,200,250,0.6)"><span class="bar-label">鍛ㄥ洓</span><span class="bar-val">18.6k</span></div>
        <div class="usage-bar" style="height:70px;background:rgba(52,199,89,0.6)"><span class="bar-label">鍛ㄤ簲</span><span class="bar-val">13.1k</span></div>
        <div class="usage-bar" style="height:100px;background:rgba(90,200,250,0.7)"><span class="bar-label">鍛ㄥ叚</span><span class="bar-val">21.5k</span></div>
        <div class="usage-bar" style="height:55px;background:rgba(52,199,89,0.5)"><span class="bar-label">鍛ㄦ棩</span><span class="bar-val">10.3k</span></div>
      </div>
      <table class="usage-table">
        <tr><th>妯″瀷</th><th>璋冪敤娆℃暟</th><th>杈撳叆 Token</th><th>杈撳嚭 Token</th><th>璐圭敤</th></tr>
        <tr><td>deepseek-chat <span class="model-dot active" style="vertical-align:middle"></span></td><td>12,458</td><td>8.2M</td><td>1.1M</td><td>$0.00</td></tr>
        <tr><td>gpt-4o <span class="model-dot active" style="vertical-align:middle"></span></td><td>3,215</td><td>4.7M</td><td>0.6M</td><td>$2.15</td></tr>
        <tr><td>claude-3.5-sonnet</td><td>1,892</td><td>3.1M</td><td>0.4M</td><td>$0.89</td></tr>
        <tr><td>gemini-pro</td><td>0</td><td>0</td><td>0</td><td>$0.00</td></tr>
      </table>
      <div class="export-bar">
        <span>馃搳 瀵煎嚭缁熻鎶ヨ〃</span>
        <button class="btn-secondary" onclick="showToast('宸插鍑?CSV','success')">瀵煎嚭 CSV</button>
        <button class="btn-secondary" onclick="showToast('宸插鍑?PDF','success')">瀵煎嚭 PDF</button>
      </div>
    </div>

    <!-- Services -->
    <div class="page" id="page-services">
      <div class="welcome"><h1>鈿欙笍 鏈嶅姟绠＄悊</h1><p>鍚姩銆佸仠姝€侀噸鍚悇椤规湇鍔?/p></div>
      <div class="service-card">
        <div class="icon green">馃寪</div>
        <div class="info"><div class="name">Gateway 缃戝叧</div><div class="desc">绔彛 18789 路 U 鐩樹究鎼虹増鏍稿績鏈嶅姟</div></div>
        <span class="status-tag on">鈼?杩愯涓?/span>
        <button class="action-btn restart" onclick="showToast('缃戝叧姝ｅ湪閲嶅惎...','info')">閲嶅惎</button>
        <button class="action-btn stop" onclick="showToast('缃戝叧宸插仠姝?,'error')">鍋滄</button>
      </div>
      <div class="service-card">
        <div class="icon green">馃攲</div>
        <div class="info"><div class="name">WebSocket 鏈嶅姟</div><div class="desc">瀹炴椂閫氫俊 路 蹇冭烦妫€娴?/div></div>
        <span class="status-tag on">鈼?杩愯涓?/span>
        <button class="action-btn restart" onclick="showToast('WebSocket 姝ｅ湪閲嶅惎...','info')">閲嶅惎</button>
        <button class="action-btn stop" onclick="showToast('WebSocket 宸插仠姝?,'error')">鍋滄</button>
      </div>
      <div class="service-card">
        <div class="icon green">馃</div>
        <div class="info"><div class="name">AI 鎺ㄧ悊鏈嶅姟</div><div class="desc">deepseek-chat 路 妯″瀷鎺ㄧ悊</div></div>
        <span class="status-tag on">鈼?杩愯涓?/span>
        <button class="action-btn restart" onclick="showToast('AI 鎺ㄧ悊姝ｅ湪閲嶅惎...','info')">閲嶅惎</button>
        <button class="action-btn stop" onclick="showToast('AI 鎺ㄧ悊宸插仠姝?,'error')">鍋滄</button>
      </div>
      <div class="service-card">
        <div class="icon" style="background:rgba(255,255,255,0.05)">馃摝</div>
        <div class="info"><div class="name">鎻掍欢鐑姞杞?/div><div class="desc">鎶€鑳?& 鎻掍欢鎵╁睍妯″潡</div></div>
        <span class="status-tag off">鈼?鏈惎鍔?/span>
        <button class="action-btn start" onclick="showToast('鎻掍欢鐑姞杞藉凡鍚姩','success')">鍚姩</button>
      </div>
    </div>

    <!-- Models -->
    <div class="page" id="page-models">
      <div class="welcome"><h1>馃 妯″瀷閰嶇疆</h1><p>绠＄悊宸叉帴鍏ョ殑 AI 妯″瀷</p></div>
      <div class="model-grid">
        <div class="model-card"><div class="name"><span class="model-dot active"></span>deepseek-chat</div><div class="provider">DeepSeek 路 榛樿妯″瀷</div><div class="usage">杩?7 澶? 12.4k 娆¤皟鐢?/div></div>
        <div class="model-card"><div class="name"><span class="model-dot active"></span>gpt-4o</div><div class="provider">OpenAI</div><div class="usage">杩?7 澶? 3.2k 娆¤皟鐢?/div></div>
        <div class="model-card"><div class="name"><span class="model-dot active"></span>claude-3.5-sonnet</div><div class="provider">Anthropic</div><div class="usage">杩?7 澶? 1.9k 娆¤皟鐢?/div></div>
        <div class="model-card"><div class="name"><span class="model-dot inactive"></span>gemini-pro</div><div class="provider">Google 路 鏈厤缃?/div><div class="usage">鏈惎鐢?/div></div>
      </div>
      <button class="btn-primary" onclick="showToast('娣诲姞妯″瀷鍔熻兘寰呭紑鍙?,'info')">+ 娣诲姞妯″瀷</button>
    </div>

    <!-- Skills -->
    <div class="page" id="page-skills">
      <div class="welcome"><h1>馃З 鎶€鑳界鐞?/h1><p>鍚敤/绂佺敤鎶€鑳芥ā鍧?/p></div>
      <div class="skill-list" id="skillsList"></div>
      <button class="btn-primary" onclick="showToast('瀹夎鏂版妧鑳藉姛鑳藉緟寮€鍙?,'info')">+ 瀹夎鏂版妧鑳?/button>
    </div>

    <!-- Accounts -->
    <div class="page" id="page-accounts">
      <div class="welcome"><h1>馃懃 璐﹀彿涓庢潈闄愮鐞?/h1><p>绠＄悊鐢ㄦ埛璐﹀彿鍙婄郴缁熻闂潈闄?/p></div>
      <div class="section-header"><h2>鐢ㄦ埛鍒楄〃</h2><button class="btn-primary" onclick="showToast('娣诲姞鐢ㄦ埛鍔熻兘寰呭紑鍙?,'info')">+ 娣诲姞鐢ㄦ埛</button></div>
      <table class="acl-table">
        <tr><th>鐢ㄦ埛鍚?/th><th>瑙掕壊</th><th>鐘舵€?/th><th>鎿嶄綔</th></tr>
        <tr><td>admin</td><td><span class="tag admin">绠＄悊鍛?/span></td><td>鍦ㄧ嚎</td><td><span class="more" onclick="showToast('admin 鏉冮檺宸叉洿鏂?,'success')">缂栬緫</span></td></tr>
        <tr><td>operator</td><td><span class="tag operator">鎿嶄綔鍛?/span></td><td>绂荤嚎</td><td><span class="more" onclick="showToast('operator 鏉冮檺宸叉洿鏂?,'success')">缂栬緫</span></td></tr>
        <tr><td>viewer</td><td><span class="tag viewer">瑙傚療鑰?/span></td><td>绂荤嚎</td><td><span class="more" onclick="showToast('viewer 鏉冮檺宸叉洿鏂?,'success')">缂栬緫</span></td></tr>
      </table>
      <div class="section-header"><h2>鏉冮檺鐭╅樀</h2></div>
      <div class="perm-grid">
        <div class="perm-item"><span class="check">鉁?/span> 浠〃鐩樻煡鐪?/div>
        <div class="perm-item"><span class="check">鉁?/span> 鏈嶅姟鍚姩/鍋滄</div>
        <div class="perm-item"><span class="check">鉁?/span> 妯″瀷閰嶇疆</div>
        <div class="perm-item"><span class="check">鉁?/span> 鎶€鑳藉紑鍏?/div>
        <div class="perm-item"><span class="check">鉁?/span> 鐢ㄦ埛绠＄悊</div>
        <div class="perm-item"><span class="check">鉁?/span> 鏃ュ織瀵煎嚭</div>
        <div class="perm-item"><span class="check">鉁?/span> 绯荤粺璁剧疆</div>
        <div class="perm-item"><span class="check">鉁?/span> API 瀵嗛挜绠＄悊</div>
      </div>
    </div>

    <!-- Env Check -->
    <div class="page" id="page-env">
      <div class="welcome"><h1>馃攳 鐜妫€鏌?/h1><p>绯荤粺杩愯鐜鑷</p></div>
      <div class="sys-grid">
        <div class="sys-item"><span class="label">Node.js</span><span class="value">v22.15.0</span><span class="check pass">鉁?姝ｅ父</span></div>
        <div class="sys-item"><span class="label">杩愯鐜</span><span class="value">Windows_NT 10.0.26200</span><span class="check pass">鉁?姝ｅ父</span></div>
        <div class="sys-item"><span class="label">閰嶇疆鏂囦欢</span><span class="value">config.yaml</span><span class="check pass">鉁?姝ｅ父</span></div>
        <div class="sys-item"><span class="label">绔彛 18789</span><span class="value">宸插崰鐢?/span><span class="check pass">鉁?姝ｅ父</span></div>
        <div class="sys-item"><span class="label">婵€娲荤姸鎬?/span><span class="value">宸叉縺娲?/span><span class="check pass">鉁?姝ｅ父</span></div>
        <div class="sys-item"><span class="label">鏂囦欢鏉冮檺</span><span class="value">璇诲啓姝ｅ父</span><span class="check pass">鉁?姝ｅ父</span></div>
        <div class="sys-item"><span class="label">鎻掍欢</span><span class="value">7/9 宸插姞杞?/span><span class="check pass">鉁?姝ｅ父</span></div>
        <div class="sys-item"><span class="label">鍐呭瓨鍗犵敤</span><span class="value">342 MB / 16 GB</span><span class="check pass">鉁?姝ｅ父</span></div>
      </div>
      <button class="btn-primary" onclick="showToast('鐜妫€鏌ュ畬鎴愶紝鍏ㄩ儴姝ｅ父','success')">閲嶆柊妫€鏌?/button>
    </div>

    <!-- Settings -->
    <div class="page" id="page-settings">
      <div class="welcome"><h1>鈿?璁剧疆</h1><p>OpenClaw 鍏ㄥ眬閰嶇疆</p></div>
      <div class="settings-group"><h3>缃戠粶</h3>
        <div class="setting-row"><label>缃戝叧绔彛</label><input type="number" value="18789"><span class="hint">閲嶅惎鍚庣敓鏁?/span></div>
        <div class="setting-row"><label>缁戝畾鍦板潃</label><input type="text" value="0.0.0.0"></div>
      </div>
      <div class="settings-group"><h3>妯″瀷榛樿鍊?/h3>
        <div class="setting-row"><label>榛樿妯″瀷</label><select><option>deepseek/deepseek-chat</option><option>gpt-4o</option><option>claude-3.5-sonnet</option></select></div>
        <div class="setting-row"><label>瓒呮椂鏃堕棿</label><input type="number" value="60"><span class="hint">绉?/span></div>
      </div>
      <div class="settings-group"><h3>鍏朵粬</h3>
        <div class="setting-row"><label>鍚姩鏂瑰紡</label><select><option>寮€鏈哄惎鍔?/option><option>鎵嬪姩鍚姩</option></select></div>
        <div class="setting-row"><label>鏃ュ織绾у埆</label><select><option>info</option><option>debug</option><option>warn</option><option>error</option></select></div>
      </div>
      <button class="btn-primary" onclick="showToast('璁剧疆宸蹭繚瀛?,'success')">淇濆瓨璁剧疆</button>
    </div>

    <!-- Logs & Export -->
    <div class="page" id="page-logs">
      <div class="welcome"><h1>馃搵 鏃ュ織涓庡鍑?/h1><p>鏌ョ湅绯荤粺鏃ュ織骞跺鍑轰负鏂囦欢</p></div>
      <div class="section-header"><h2>绯荤粺鏃ュ織</h2>
        <div style="display:flex;gap:6px">
          <span class="more" onclick="showToast('鏃ュ織宸插鍒跺埌鍓创鏉?,'success')">澶嶅埗</span>
          <span class="more" onclick="exportLogs('txt')">瀵煎嚭 TXT</span>
          <span class="more" onclick="exportLogs('csv')">瀵煎嚭 CSV</span>
        </div>
      </div>
      <div class="log-viewer" style="margin-bottom:20px">
        <div class="log-header"><h3>馃搵 瀹屾暣鏃ュ織 (鏈€杩?100 鏉?</h3><span class="clear-btn" onclick="clearLog()">娓呯┖</span></div>
        <div class="log-body" id="logBodyFull" style="height:300px">
          <div class="line"><span class="time">[22:45:01]</span> <span class="info">[INFO]</span> 缃戝叧鏈嶅姟鍚姩瀹屾垚</div>
          <div class="line"><span class="time">[22:45:01]</span> <span class="info">[INFO]</span> 绔彛 18789 宸茬粦瀹?/div>
          <div class="line"><span class="time">[22:45:02]</span> <span class="info">[INFO]</span> 宸插姞杞?7 涓妧鑳芥ā鍧?/div>
          <div class="line"><span class="time">[22:45:03]</span> <span class="warn">[WARN]</span> WebSocket 蹇冭烦瓒呮椂锛岃嚜鍔ㄩ噸杩炰腑...</div>
          <div class="line"><span class="time">[22:45:04]</span> <span class="info">[INFO]</span> WebSocket 閲嶈繛鎴愬姛</div>
          <div class="line"><span class="time">[22:45:05]</span> <span class="info">[INFO]</span> 绯荤粺灏辩华锛岀瓑寰呮寚浠?..</div>
          <div class="line"><span class="time">[22:46:12]</span> <span class="info">[INFO]</span> 鐢ㄦ埛 admin 鐧诲綍鎴愬姛</div>
          <div class="line"><span class="time">[22:46:15]</span> <span class="info">[INFO]</span> 浠〃鐩樻暟鎹凡鍔犺浇</div>
        </div>
      </div>
      <div class="export-bar">
        <span>馃摜 瀵煎嚭閫夐」</span>
        <select style="padding:5px 10px;border-radius:5px;border:1px solid var(--border);background:rgba(0,0,0,0.25);color:#fff;font-size:12px;outline:none">
          <option>鍏ㄩ儴鏃ュ織</option><option>浠呴敊璇棩蹇?/option><option>浠呰鍛婃棩蹇?/option><option>浠婃棩鏃ュ織</option>
        </select>
        <button class="btn-secondary" onclick="exportLogs('txt')">瀵煎嚭 TXT</button>
        <button class="btn-secondary" onclick="exportLogs('csv')">瀵煎嚭 CSV</button>
        <button class="btn-secondary" onclick="exportLogs('json')">瀵煎嚭 JSON</button>
      </div>
    </div>

    <!-- Update -->
    <div class="page" id="page-update">
      <div class="welcome"><h1>馃攧 妫€鏌ユ洿鏂?/h1><p>鐗堟湰绠＄悊涓庢洿鏂?/p></div>
      <div class="update-card">
        <div class="ver">v1.5.0</div>
        <div class="hint">褰撳墠宸叉槸鏈€鏂扮増鏈?路 鏈€鍚庢鏌ワ細鍒氬垰</div>
        <button class="btn-primary" style="margin-top:14px" onclick="showToast('宸叉槸鏈€鏂扮増鏈?,'success')">妫€鏌ユ洿鏂?/button>
      </div>
    </div>
  `;

  // 鈹€鈹€ Skills data 鈹€鈹€
  const skills = [
    { name: 'Weather', icon: '馃尋', desc: '澶╂皵鏌ヨ鎶€鑳?, on: true },
    { name: 'Web Search', icon: '馃攳', desc: '缃戠粶鎼滅储鎶€鑳?, on: true },
    { name: 'Note Taking', icon: '馃摑', desc: '绗旇涓庤蹇嗘妧鑳?, on: true },
    { name: 'Code Runner', icon: '馃捇', desc: '浠ｇ爜鎵ц鎶€鑳?, on: true },
    { name: 'Memory', icon: '馃', desc: '闀挎湡璁板繂鎶€鑳?, on: true },
    { name: 'Health Check', icon: '馃洝', desc: '瀹夊叏宸℃鎶€鑳?, on: true },
    { name: 'Skill Creator', icon: '馃幁', desc: '鎶€鑳藉垱浣滃伐鍏?, on: true },
    { name: 'Node Connect', icon: '馃摗', desc: '鑺傜偣杩炴帴璇婃柇', on: false },
    { name: 'Canvas', icon: '馃帹', desc: '鐢诲竷涓?UI 宸ュ叿', on: false },
  ];
  const sl = document.getElementById('skillsList');
  sl.innerHTML = skills.map(s => `
    <div class="skill-item">
      <div class="icon blue">${s.icon}</div>
      <div class="info"><div class="name">${s.name}</div><div class="desc">${s.desc}</div></div>
      <button class="toggle ${s.on ? 'on' : 'off'}" onclick="this.classList.toggle('on');this.classList.toggle('off')"></button>
    </div>
  `).join('');

  // 鈹€鈹€ Nav click handlers 鈹€鈹€
  document.querySelectorAll('.nav-item[data-page]').forEach(item => {
    item.addEventListener('click', () => switchPage(item.dataset.page));
  });

  // 鈹€鈹€ Enter key on login 鈹€鈹€
  document.getElementById('loginPass').addEventListener('keydown', e => { if (e.key === 'Enter') handleLogin(); });
  document.getElementById('loginUser').addEventListener('keydown', e => { if (e.key === 'Enter') handleLogin(); });
}

// 鈹€鈹€ Util 鈹€鈹€
function clearLog() {
  document.querySelectorAll('.log-body').forEach(el => el.innerHTML = '<div class="line"><span style="color:var(--text-dimmer)">鏃ュ織宸叉竻绌?/span></div>');
  showToast('鏃ュ織宸叉竻绌?, 'info');
}

function exportLogs(fmt) {
  const lines = [];
  document.querySelectorAll('.log-body .line').forEach(el => {
    const t = el.querySelector('.time')?.textContent || '';
    const m = el.textContent.replace(t, '').trim();
    lines.push(`[${t}] ${m}`);
  });
  const ext = fmt === 'csv' ? 'csv' : fmt === 'json' ? 'json' : 'txt';
  const content = fmt === 'json' ? JSON.stringify(lines, null, 2) : lines.join('\n');
  const blob = new Blob([content], { type: 'text/plain' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = `openclaw-logs.${ext}`;
  a.click();
  URL.revokeObjectURL(a.href);
  showToast(`鏃ュ織宸插鍑轰负 .${ext} 鏂囦欢`, 'success');
}

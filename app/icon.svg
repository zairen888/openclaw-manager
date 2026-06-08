// ── Auth ──
const ACCOUNTS = { admin: { pass: 'admin123', role: '管理员', label: 'admin' }, operator: { pass: 'op123', role: '操作员', label: 'operator' }, viewer: { pass: 'view123', role: '观察者', label: 'viewer' } };
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
    err.textContent = '用户名或密码错误';
  }
}

function handleLogout() {
  currentUser = null;
  document.getElementById('appWindow').style.display = 'none';
  document.getElementById('loginOverlay').classList.remove('hidden');
  document.getElementById('loginError').textContent = '';
}

// ── Toast ──
function showToast(msg, type) {
  const t = document.getElementById('toast');
  t.textContent = msg; t.className = 'toast ' + type + ' show';
  setTimeout(() => t.classList.remove('show'), 2200);
}

// ── Page system ──
const PAGES = {};

function switchPage(id) {
  document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
  document.querySelector(`.nav-item[data-page="${id}"]`).classList.add('active');
  document.getElementById('breadcrumbCurrent').textContent = document.querySelector(`.nav-item[data-page="${id}"]`).textContent.trim();
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.getElementById('page-' + id).classList.add('active');
}

// ── Pages content ──
function initApp() {
  const c = document.getElementById('pageContent');
  c.innerHTML = `
    <!-- Dashboard -->
    <div class="page active" id="page-dashboard">
      <div class="welcome"><h1>👋 欢迎回来，<span id="dashUser">${currentUser}</span></h1><p>OpenClaw v1.5.0 便携版 · 一切运行正常</p></div>
      <div class="quick-stats">
        <div class="stat-card"><div class="num green">运行中</div><div class="label">网关状态</div><div class="sub">端口 18789</div></div>
        <div class="stat-card"><div class="num yellow">7</div><div class="label">已启用技能</div><div class="sub">共 9 个</div></div>
        <div class="stat-card"><div class="num blue">4</div><div class="label">模型接入</div><div class="sub">全部在线</div></div>
        <div class="stat-card"><div class="num">99.8%</div><div class="label">运行时间</div><div class="sub">近 7 天</div></div>
      </div>
      <div class="section-header"><h2>🔄 最近日志</h2><span class="more" onclick="switchPage('logs')">查看全部 →</span></div>
      <div class="log-viewer">
        <div class="log-header"><h3>📋 实时日志输出</h3><span class="clear-btn" onclick="clearLog()">清空</span></div>
        <div class="log-body" id="logBody">
          <div class="line"><span class="time">[22:45:01]</span> <span class="info">[INFO]</span> 网关服务启动完成</div>
          <div class="line"><span class="time">[22:45:01]</span> <span class="info">[INFO]</span> 端口 18789 已绑定</div>
          <div class="line"><span class="time">[22:45:02]</span> <span class="info">[INFO]</span> 已加载 7 个技能模块</div>
          <div class="line"><span class="time">[22:45:03]</span> <span class="warn">[WARN]</span> WebSocket 心跳超时，自动重连中...</div>
          <div class="line"><span class="time">[22:45:04]</span> <span class="info">[INFO]</span> WebSocket 重连成功</div>
          <div class="line"><span class="time">[22:45:05]</span> <span class="info">[INFO]</span> 系统就绪，等待指令...</div>
        </div>
      </div>
      <div class="section-header" style="margin-top:16px"><h2>⚡ 快捷操作</h2></div>
      <div style="display:flex;gap:8px;flex-wrap:wrap">
        <button class="btn-primary" onclick="showToast('网关已重启','success')">重启网关</button>
        <button class="btn-secondary" onclick="showToast('正在修复配置...','info')">修复配置</button>
        <button class="btn-secondary" style="color:#ff453a;border-color:rgba(255,69,58,0.2)" onclick="showToast('网关已停止','error')">停止服务</button>
      </div>
    </div>

    <!-- Usage -->
    <div class="page" id="page-usage">
      <div class="welcome"><h1>📈 模型调用统计</h1><p>近 7 天 API 调用用量概览</p></div>
      <div class="usage-chart">
        <div class="usage-bar" style="height:65px;background:rgba(52,199,89,0.6)"><span class="bar-label">周一</span><span class="bar-val">12.4k</span></div>
        <div class="usage-bar" style="height:80px;background:rgba(90,200,250,0.6)"><span class="bar-label">周二</span><span class="bar-val">15.8k</span></div>
        <div class="usage-bar" style="height:50px;background:rgba(52,199,89,0.5)"><span class="bar-label">周三</span><span class="bar-val">9.2k</span></div>
        <div class="usage-bar" style="height:95px;background:rgba(90,200,250,0.6)"><span class="bar-label">周四</span><span class="bar-val">18.6k</span></div>
        <div class="usage-bar" style="height:70px;background:rgba(52,199,89,0.6)"><span class="bar-label">周五</span><span class="bar-val">13.1k</span></div>
        <div class="usage-bar" style="height:100px;background:rgba(90,200,250,0.7)"><span class="bar-label">周六</span><span class="bar-val">21.5k</span></div>
        <div class="usage-bar" style="height:55px;background:rgba(52,199,89,0.5)"><span class="bar-label">周日</span><span class="bar-val">10.3k</span></div>
      </div>
      <table class="usage-table">
        <tr><th>模型</th><th>调用次数</th><th>输入 Token</th><th>输出 Token</th><th>费用</th></tr>
        <tr><td>deepseek-chat <span class="model-dot active" style="vertical-align:middle"></span></td><td>12,458</td><td>8.2M</td><td>1.1M</td><td>$0.00</td></tr>
        <tr><td>gpt-4o <span class="model-dot active" style="vertical-align:middle"></span></td><td>3,215</td><td>4.7M</td><td>0.6M</td><td>$2.15</td></tr>
        <tr><td>claude-3.5-sonnet</td><td>1,892</td><td>3.1M</td><td>0.4M</td><td>$0.89</td></tr>
        <tr><td>gemini-pro</td><td>0</td><td>0</td><td>0</td><td>$0.00</td></tr>
      </table>
      <div class="export-bar">
        <span>📊 导出统计报表</span>
        <button class="btn-secondary" onclick="showToast('已导出 CSV','success')">导出 CSV</button>
        <button class="btn-secondary" onclick="showToast('已导出 PDF','success')">导出 PDF</button>
      </div>
    </div>

    <!-- Services -->
    <div class="page" id="page-services">
      <div class="welcome"><h1>⚙️ 服务管理</h1><p>启动、停止、重启各项服务</p></div>
      <div class="service-card">
        <div class="icon green">🌐</div>
        <div class="info"><div class="name">Gateway 网关</div><div class="desc">端口 18789 · U 盘便携版核心服务</div></div>
        <span class="status-tag on">● 运行中</span>
        <button class="action-btn restart" onclick="showToast('网关正在重启...','info')">重启</button>
        <button class="action-btn stop" onclick="showToast('网关已停止','error')">停止</button>
      </div>
      <div class="service-card">
        <div class="icon green">🔌</div>
        <div class="info"><div class="name">WebSocket 服务</div><div class="desc">实时通信 · 心跳检测</div></div>
        <span class="status-tag on">● 运行中</span>
        <button class="action-btn restart" onclick="showToast('WebSocket 正在重启...','info')">重启</button>
        <button class="action-btn stop" onclick="showToast('WebSocket 已停止','error')">停止</button>
      </div>
      <div class="service-card">
        <div class="icon green">🤖</div>
        <div class="info"><div class="name">AI 推理服务</div><div class="desc">deepseek-chat · 模型推理</div></div>
        <span class="status-tag on">● 运行中</span>
        <button class="action-btn restart" onclick="showToast('AI 推理正在重启...','info')">重启</button>
        <button class="action-btn stop" onclick="showToast('AI 推理已停止','error')">停止</button>
      </div>
      <div class="service-card">
        <div class="icon" style="background:rgba(255,255,255,0.05)">📦</div>
        <div class="info"><div class="name">插件热加载</div><div class="desc">技能 & 插件扩展模块</div></div>
        <span class="status-tag off">○ 未启动</span>
        <button class="action-btn start" onclick="showToast('插件热加载已启动','success')">启动</button>
      </div>
    </div>

    <!-- Models -->
    <div class="page" id="page-models">
      <div class="welcome"><h1>🧠 模型配置</h1><p>管理已接入的 AI 模型</p></div>
      <div class="model-grid">
        <div class="model-card"><div class="name"><span class="model-dot active"></span>deepseek-chat</div><div class="provider">DeepSeek · 默认模型</div><div class="usage">近 7 天: 12.4k 次调用</div></div>
        <div class="model-card"><div class="name"><span class="model-dot active"></span>gpt-4o</div><div class="provider">OpenAI</div><div class="usage">近 7 天: 3.2k 次调用</div></div>
        <div class="model-card"><div class="name"><span class="model-dot active"></span>claude-3.5-sonnet</div><div class="provider">Anthropic</div><div class="usage">近 7 天: 1.9k 次调用</div></div>
        <div class="model-card"><div class="name"><span class="model-dot inactive"></span>gemini-pro</div><div class="provider">Google · 未配置</div><div class="usage">未启用</div></div>
      </div>
      <button class="btn-primary" onclick="showToast('添加模型功能待开发','info')">+ 添加模型</button>
    </div>

    <!-- Skills -->
    <div class="page" id="page-skills">
      <div class="welcome"><h1>🧩 技能管理</h1><p>启用/禁用技能模块</p></div>
      <div class="skill-list" id="skillsList"></div>
      <button class="btn-primary" onclick="showToast('安装新技能功能待开发','info')">+ 安装新技能</button>
    </div>

    <!-- Accounts -->
    <div class="page" id="page-accounts">
      <div class="welcome"><h1>👥 账号与权限管理</h1><p>管理用户账号及系统访问权限</p></div>
      <div class="section-header"><h2>用户列表</h2><button class="btn-primary" onclick="showToast('添加用户功能待开发','info')">+ 添加用户</button></div>
      <table class="acl-table">
        <tr><th>用户名</th><th>角色</th><th>状态</th><th>操作</th></tr>
        <tr><td>admin</td><td><span class="tag admin">管理员</span></td><td>在线</td><td><span class="more" onclick="showToast('admin 权限已更新','success')">编辑</span></td></tr>
        <tr><td>operator</td><td><span class="tag operator">操作员</span></td><td>离线</td><td><span class="more" onclick="showToast('operator 权限已更新','success')">编辑</span></td></tr>
        <tr><td>viewer</td><td><span class="tag viewer">观察者</span></td><td>离线</td><td><span class="more" onclick="showToast('viewer 权限已更新','success')">编辑</span></td></tr>
      </table>
      <div class="section-header"><h2>权限矩阵</h2></div>
      <div class="perm-grid">
        <div class="perm-item"><span class="check">✓</span> 仪表盘查看</div>
        <div class="perm-item"><span class="check">✓</span> 服务启动/停止</div>
        <div class="perm-item"><span class="check">✓</span> 模型配置</div>
        <div class="perm-item"><span class="check">✓</span> 技能开关</div>
        <div class="perm-item"><span class="check">✓</span> 用户管理</div>
        <div class="perm-item"><span class="check">✓</span> 日志导出</div>
        <div class="perm-item"><span class="check">✓</span> 系统设置</div>
        <div class="perm-item"><span class="check">✓</span> API 密钥管理</div>
      </div>
    </div>

    <!-- Env Check -->
    <div class="page" id="page-env">
      <div class="welcome"><h1>🔍 环境检查</h1><p>系统运行环境自检</p></div>
      <div class="sys-grid">
        <div class="sys-item"><span class="label">Node.js</span><span class="value">v22.15.0</span><span class="check pass">✓ 正常</span></div>
        <div class="sys-item"><span class="label">运行环境</span><span class="value">Windows_NT 10.0.26200</span><span class="check pass">✓ 正常</span></div>
        <div class="sys-item"><span class="label">配置文件</span><span class="value">config.yaml</span><span class="check pass">✓ 正常</span></div>
        <div class="sys-item"><span class="label">端口 18789</span><span class="value">已占用</span><span class="check pass">✓ 正常</span></div>
        <div class="sys-item"><span class="label">激活状态</span><span class="value">已激活</span><span class="check pass">✓ 正常</span></div>
        <div class="sys-item"><span class="label">文件权限</span><span class="value">读写正常</span><span class="check pass">✓ 正常</span></div>
        <div class="sys-item"><span class="label">插件</span><span class="value">7/9 已加载</span><span class="check pass">✓ 正常</span></div>
        <div class="sys-item"><span class="label">内存占用</span><span class="value">342 MB / 16 GB</span><span class="check pass">✓ 正常</span></div>
      </div>
      <button class="btn-primary" onclick="showToast('环境检查完成，全部正常','success')">重新检查</button>
    </div>

    <!-- Settings -->
    <div class="page" id="page-settings">
      <div class="welcome"><h1>⚡ 设置</h1><p>OpenClaw 全局配置</p></div>
      <div class="settings-group"><h3>网络</h3>
        <div class="setting-row"><label>网关端口</label><input type="number" value="18789"><span class="hint">重启后生效</span></div>
        <div class="setting-row"><label>绑定地址</label><input type="text" value="0.0.0.0"></div>
      </div>
      <div class="settings-group"><h3>模型默认值</h3>
        <div class="setting-row"><label>默认模型</label><select><option>deepseek/deepseek-chat</option><option>gpt-4o</option><option>claude-3.5-sonnet</option></select></div>
        <div class="setting-row"><label>超时时间</label><input type="number" value="60"><span class="hint">秒</span></div>
      </div>
      <div class="settings-group"><h3>其他</h3>
        <div class="setting-row"><label>启动方式</label><select><option>开机启动</option><option>手动启动</option></select></div>
        <div class="setting-row"><label>日志级别</label><select><option>info</option><option>debug</option><option>warn</option><option>error</option></select></div>
      </div>
      <button class="btn-primary" onclick="showToast('设置已保存','success')">保存设置</button>
    </div>

    <!-- Logs & Export -->
    <div class="page" id="page-logs">
      <div class="welcome"><h1>📋 日志与导出</h1><p>查看系统日志并导出为文件</p></div>
      <div class="section-header"><h2>系统日志</h2>
        <div style="display:flex;gap:6px">
          <span class="more" onclick="showToast('日志已复制到剪贴板','success')">复制</span>
          <span class="more" onclick="exportLogs('txt')">导出 TXT</span>
          <span class="more" onclick="exportLogs('csv')">导出 CSV</span>
        </div>
      </div>
      <div class="log-viewer" style="margin-bottom:20px">
        <div class="log-header"><h3>📋 完整日志 (最近 100 条)</h3><span class="clear-btn" onclick="clearLog()">清空</span></div>
        <div class="log-body" id="logBodyFull" style="height:300px">
          <div class="line"><span class="time">[22:45:01]</span> <span class="info">[INFO]</span> 网关服务启动完成</div>
          <div class="line"><span class="time">[22:45:01]</span> <span class="info">[INFO]</span> 端口 18789 已绑定</div>
          <div class="line"><span class="time">[22:45:02]</span> <span class="info">[INFO]</span> 已加载 7 个技能模块</div>
          <div class="line"><span class="time">[22:45:03]</span> <span class="warn">[WARN]</span> WebSocket 心跳超时，自动重连中...</div>
          <div class="line"><span class="time">[22:45:04]</span> <span class="info">[INFO]</span> WebSocket 重连成功</div>
          <div class="line"><span class="time">[22:45:05]</span> <span class="info">[INFO]</span> 系统就绪，等待指令...</div>
          <div class="line"><span class="time">[22:46:12]</span> <span class="info">[INFO]</span> 用户 admin 登录成功</div>
          <div class="line"><span class="time">[22:46:15]</span> <span class="info">[INFO]</span> 仪表盘数据已加载</div>
        </div>
      </div>
      <div class="export-bar">
        <span>📥 导出选项</span>
        <select style="padding:5px 10px;border-radius:5px;border:1px solid var(--border);background:rgba(0,0,0,0.25);color:#fff;font-size:12px;outline:none">
          <option>全部日志</option><option>仅错误日志</option><option>仅警告日志</option><option>今日日志</option>
        </select>
        <button class="btn-secondary" onclick="exportLogs('txt')">导出 TXT</button>
        <button class="btn-secondary" onclick="exportLogs('csv')">导出 CSV</button>
        <button class="btn-secondary" onclick="exportLogs('json')">导出 JSON</button>
      </div>
    </div>

    <!-- Update -->
    <div class="page" id="page-update">
      <div class="welcome"><h1>🔄 检查更新</h1><p>版本管理与更新</p></div>
      <div class="update-card">
        <div class="ver">v1.5.0</div>
        <div class="hint">当前已是最新版本 · 最后检查：刚刚</div>
        <button class="btn-primary" style="margin-top:14px" onclick="showToast('已是最新版本','success')">检查更新</button>
      </div>
    </div>
  `;

  // ── Skills data ──
  const skills = [
    { name: 'Weather', icon: '🌤', desc: '天气查询技能', on: true },
    { name: 'Web Search', icon: '🔍', desc: '网络搜索技能', on: true },
    { name: 'Note Taking', icon: '📝', desc: '笔记与记忆技能', on: true },
    { name: 'Code Runner', icon: '💻', desc: '代码执行技能', on: true },
    { name: 'Memory', icon: '🧠', desc: '长期记忆技能', on: true },
    { name: 'Health Check', icon: '🛡', desc: '安全巡检技能', on: true },
    { name: 'Skill Creator', icon: '🎭', desc: '技能创作工具', on: true },
    { name: 'Node Connect', icon: '📡', desc: '节点连接诊断', on: false },
    { name: 'Canvas', icon: '🎨', desc: '画布与 UI 工具', on: false },
  ];
  const sl = document.getElementById('skillsList');
  sl.innerHTML = skills.map(s => `
    <div class="skill-item">
      <div class="icon blue">${s.icon}</div>
      <div class="info"><div class="name">${s.name}</div><div class="desc">${s.desc}</div></div>
      <button class="toggle ${s.on ? 'on' : 'off'}" onclick="this.classList.toggle('on');this.classList.toggle('off')"></button>
    </div>
  `).join('');

  // ── Nav click handlers ──
  document.querySelectorAll('.nav-item[data-page]').forEach(item => {
    item.addEventListener('click', () => switchPage(item.dataset.page));
  });

  // ── Enter key on login ──
  document.getElementById('loginPass').addEventListener('keydown', e => { if (e.key === 'Enter') handleLogin(); });
  document.getElementById('loginUser').addEventListener('keydown', e => { if (e.key === 'Enter') handleLogin(); });
}

// ── Util ──
function clearLog() {
  document.querySelectorAll('.log-body').forEach(el => el.innerHTML = '<div class="line"><span style="color:var(--text-dimmer)">日志已清空</span></div>');
  showToast('日志已清空', 'info');
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
  showToast(`日志已导出为 .${ext} 文件`, 'success');
}

# OpenClaw Manager 🦞

OpenClaw 全功能桌面管理器

## 功能特性

- **🔐 账号登录** — 多用户登录 (admin/operator/viewer) + 权限管控
- **📊 仪表盘** — 网关状态监控、技能/模型统计、实时日志
- **📈 用量统计** — 模型调用量柱状图 + 详细数据表格
- **⚙️ 服务管理** — 启动/停止/重启 Gateway、WebSocket、AI 推理
- **🧠 模型配置** — 管理 AI 模型接入及用量展示
- **🧩 技能管理** — 开关技能模块 (Weather、Search、Memory 等 9 个)
- **👥 账号与权限** — 用户管理 + 权限矩阵
- **🔍 环境检查** — Node.js、系统、端口、内存等 8 项自检
- **⚡ 设置** — 端口、绑定地址、默认模型、日志级别等
- **📋 日志导出** — 支持 TXT / CSV / JSON 格式导出
- **🔄 检查更新** — 版本管理

## 使用方式

### 浏览器直接运行
打开 pp/index.html 即可使用（推荐 Chrome / Edge）

### Electron 桌面应用
`ash
npm install
npm start
`

### 打包为 EXE
`ash
npm run dist
`
打包后在 dist/ 目录下生成便携版 exe

## 默认账号

| 用户名 | 密码 | 角色 |
|--------|------|------|
| admin | admin123 | 管理员 |
| operator | op123 | 操作员 |
| viewer | view123 | 观察者 |

## 技术栈

- 纯 HTML + CSS + JavaScript（零外部依赖）
- Electron 桌面壳
- 苹果绿主题 · 暗黑毛玻璃风格 · 龙虾图标
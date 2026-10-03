# 0.4.1：中英文界面验收

2026-10-03，Windows / Node 24.16.0。采用 E 盘独立 DSH_HOME、合成资料与无密钥 profile；用户资料、账号、密钥、桌面窗口与 VPN 保持原状。

- 自动测试：39 项全部通过。
- 可见 Web 操作：英文界面超长标题保存被拒绝，提示说明 72 字符上限并保留输入；改为合法中文标题后成功保存。中文界面恢复同一修订的项目和正文。
- 宿主：官方 DSH 0.2.1-alpha.1 Web；官方 RC2 与 alpha SDK 同载 18 组件，110 工具、35 插件技能、19 输出样例注册与 schema 检查通过。无账号的健康结果不代表真实连接。
- 边界：本轮没有重新渲染 MP4，渲染和 Studio 的实际验收见 0.4.0 记录。原始引擎日志保持原文。

中英文共用同一份资料；界面翻译不会改写标题、正文、路径、引用或项目文件。系统文件选择控件和文件对话框跟随 Windows / 浏览器语言。未知技术诊断与原始引擎日志保留原文；英文界面提供操作恢复引导。

此记录不代表原生桌面窗口内的新功能已逐项操作通过。发布包完整性、GitHub CI 与公开 npm 全新安装在发布时另行核对。

## English scope

The Chinese and English UI share the same data. UI translation preserves original content, paths and project files. Visible interactions were performed in an isolated official alpha Web profile; both RC2 and alpha SDK registration/schema checks passed. Native file controls use the OS/browser language, and original diagnostic logs are retained. Browser results do not certify native desktop interaction or real-service delivery.

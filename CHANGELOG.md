# 更新记录

[返回简介](README.md) · [使用说明](docs/USAGE.md) · [验证记录](docs/VALIDATION.md)

## 0.9.1 (2026-10-28)

- 同步共享媒体工作台的 HyperFrames 版本表，保持跨插件源文件一致；Remotion 引擎与技能仍固定为 4.0.539。

## 0.9.0 (2026-10-28)

- 素材页支持上移/下移图片，显示播放序号，立即保存并校验工程修订；不改音频/视频位置和旧成品。
- Add keyboard-accessible image ordering without re-uploading. Existing renders remain available; export again to apply the new order.

## 0.8.3 (2026-10-27)

- 修复分批更新时的新旧更新控件混用：保留原页面、草稿与安装保护，空闲后接管旧控制器，兼容旧入口。

## 0.8.2 (2026-10-27)

- 更新控件移至原有工作台或原生插件详情页底部；更新记录与选项原地展开，移除独立更新菜单与页面。
- 保留原页面操作与草稿，自动安装默认关闭；安装前确认，遇到未保存修改或运行任务时暂停。

## 0.8.1 (2026-10-27)

- Keep this component's own update entry visible when installed transitively through Suite. Confirm whole-Suite update scope before opening its controls.
- Keep automatic installation off by default and preserve independent installation behavior.

## 0.8.0 (2026-10-26)

- Add this plugin’s own update controls and independent preferences. Automatic installation stays off until explicitly enabled.
- Confirm manual installs, preserve local sources and disabled state, pause for tasks or unsaved changes, and use native DSH recovery without forced restarts.
- Require the public DSH 0.2.1-rc.3 update APIs; Suite components remain managed through Suite.

## 0.7.0（2026-10-25）

- 视频主工作台，内容、真实预览、素材和导出记录重新编排；明确区分已保存修订与尚未导出的修改。
- 提供 DSH 原生侧栏入口，保留设置页；统一中英、深浅色、窄屏、键盘焦点与真实空/失败状态。
- 浏览器源码移至 templates/client.js、templates/panels/ 与共享组件，独立构建为 lib/client.js；移除重复的首次引导。
- 官方 DSH 0.2.1-rc.3 Web 逐项实际操作验收，账户模拟和未验收范围见 [工作台说明](docs/WORKBENCH.md)。

## 0.6.0（2026-10-17）

- 设置面板顶部新增「首次使用」分步引导：一次只讲一步，支持上一步/下一步/跳过，看完记在本机不再出现。
- 引导内容与该插件的实际用法一致；可在开发者工具里清掉 `dsh-first-run:dsh-remotion:v1` 重新查看。
## 0.5.0 (2026-10-05)

- 增加可恢复工程归档，释放当前工程名额并完整保留素材与成品；禁止在另一个实例渲染期间移动工程，保留 Remotion 官方许可证提示。

## 0.4.1 (2026-10-03)

- 视频工作台后台错误与任务阶段支持英文；切换语言重新展示失败引导，项目文字和原始引擎日志保留原文。
- 验收范围见 [中英文界面检查](docs/validation-language-2026-10-03.md)。

## 0.4.0 (2026-10-03)

- 新增视频工作台、三种模板、素材副本上传、官方 Studio 预览、本机 MP4 与可编辑 ZIP 备份。
- 新增修订冲突检查、旧成片提示、任务记录与取消；首次环境准备使用固定版本官方 CLI 4.0.532。
- 保留现有上游技能；模板与工作台为本仓库原创实现。

## 0.3.4 (2026-09-28)

- 更新官方 Harness 0.2.0-rc.1 的兼容声明和共同加载验证；运行时代码未变。验证范围见[验证记录](docs/VALIDATION.md)。

## 0.3.3 (2026-09-28)

- 同步 Remotion 官方 v4.0.529 的技能内容，保留来源与许可证。

## 更早的改动

完整历史可查阅 [GitHub 提交记录](https://github.com/STARDUSTLC666/dsh-remotion/commits/master)。

# dsh-remotion 验证记录

[0.4.1 中英文界面验收](validation-language-2026-10-03.md)。

本页整理原 README 的历史验证说明，保留当时的版本、日期与范围。自动测试、启动检查、浏览器操作和真实服务验收分别记录，不能相互替代。更详细的版本验收文件仍保留在仓库中。

## 0.4.0 视频工作台（2026-10-03）

- Windows、Node 24.16.0：39 项测试全部通过，无跳过。覆盖工程修订冲突、素材限制、快照、路径与请求校验、渲染失败、取消及退出清理。
- 官方 Harness 0.2.0-rc.2（639ed01）Web：实际完成新建、保存、上传图片/音频/背景视频、准备环境、启动/停止官方 Studio、导出、播放及下载源工程和 MP4。关闭设置后未保存输入保留；并发修改会提示冲突，明确放弃后才读取新版本。中文/英文和 390px 窄窗口均检查。
- 官方 Remotion 4.0.532：实际生成标题卡 1280×720 和产品介绍 720×720 两份 H.264/AAC MP4，均为约 6 秒、24 FPS、144 帧。检查成片中文、图片与背景视频，并在浏览器播放到结尾。Studio 检查了画布、帧率、时长和时间轴。
- 原素材保留，上传的是工作台副本；旧成片按其实际修订展示。导出失败不产生成功收据。
- 生产依赖审计使用官方 npm registry，结果为 0 项漏洞；不把自动测试或网页验收当作原生桌面窗口操作验收。
- 官方公开 npm 安装的 Harness 0.2.1-alpha.1：18 个独立插件同载的注册与输出检查通过（109 个工具、35 个技能、TypeScript/Python PTC 声明）；保存的工作台工程和环境正常恢复，并再次实际导出 720×720 的产品介绍 MP4。

边界：这一版本的新工作台尚未在原生桌面窗口中逐项操作；Linux/macOS 的真实浏览器渲染、任意长文本与用户自有素材的最终成片不属于本次验收。原始模板为 MIT，Remotion 依赖遵循它自己的许可条件。

## 原中文记录

验证宿主：官方源码构建的 Harness `0.2.0-rc.1`（commit `407e65c8`）+ Node `24.16.0`（2026-09-28）。23 项插件测试在隔离环境全部通过；同一个宿主里 18 个插件共同加载，注册 12 个技能、1 个工具，工具 schema 与健康检查契约通过。本轮未启用真实端口与外部服务。

## Original English record

Validation host: Harness `0.2.0-rc.1` built from official sources (commit `407e65c8`) with Node `24.16.0` on 2026-09-28. All 23 plugin tests pass in an isolated environment; all 18 plugins mount together in one host registering 12 skills and 1 tools, with tool schemas and health-check contracts passing. No live ports or external services were exercised in this round.

# 更新记录

## 0.12.5 (2026-11-20)

- 媒体下载改为有界缓冲流式传输，支持开放与尾部 Range，取消下载时释放文件句柄，避免重复播放请求将完整视频反复装入内存。
- 修复异步环境检查中的任务启动竞态、卸载后延迟启动，以及取消后仍启动安装器或渲染器的问题；与 Hyperframes 保持共享实现同步。
- Stream media downloads with bounded buffering and byte-range support; prevent competing starts and child-process launches after cancellation or disposal while retaining shared-source parity.
- 同步共享更新组件 0.2.9，修复取消窗口和失败响应清理，并确保运行中旧协调器在空闲后接管修复。

## 0.12.4 (2026-11-20)

- 升级共享更新组件至 `@stardustlc/dsh-updates@0.2.7`：对话页「有新版本」提醒浮卡支持无交互 15 秒自动收起（悬停、聚焦、查看记录或确认弹窗时自动暂停，安装成功提示 6 秒收起，安装中/失败/需要重启仍保持常驻不隐藏）。
- Upgrade `@stardustlc/dsh-updates` to `0.2.7`: auto-dismiss idle update reminder cards after 15s and silent complete cards after 6s while pausing on hover/focus/notes/dialogs and keeping active, failed, or restart-required cards pinned.

## 0.12.3 (2026-11-20)

- 升级共享更新组件至 `@stardustlc/dsh-updates@0.2.6`：端到端验收修复浮卡与日历按钮重叠、详情页/工作台挂载时瞬时让位及 `package-moved` / 包管理器报错诊断文案，继续保持过期检查自动刷新与 `bundle-in-use` 指导。
- Upgrade `@stardustlc/dsh-updates` to `0.2.6`: E2E-verified fixes for floating Calendar FAB clearance, immediate reminder yield on native detail/workbench mount, and clearer `package-moved` / package-manager error messages, alongside auto-refresh and `bundle-in-use` guidance.

## 0.12.2 (2026-11-20)

- 在备用弹窗中，子菜单优先处理 Escape，避免误关外层表单。
- Let nested controls consume Escape before closing a fallback dialog.

## 0.12.1 (2026-11-19)

- 修复内嵌工作台弹窗和备用输入控件在状态变化后重建、失焦的问题；延迟解析宿主时缓存稳定组件类型。
- Cache stable workbench control types to prevent modal/input remounts and focus resets.

## 0.12.0 (2026-11-18)

- **工作台 UI v3、13 套明亮风格与 8 套中英双层字体搭配**：全新升级 48px 单行顶栏、滑动标签指示器、可拖拽分栏（`DshSplitResizer`）、微光骨架屏（`DshSkeleton`）与悬停快捷操作条；工作台主题扩展至 13 套明亮风格（新增「工程晒图 / Blueprint」「波普孔版 / Risograph」「千禧复古 / Win98」「宋韵朱砂 / Song Xuan」「晴空水晶 / Frutiger」「铅字晨报 / Gazette」等，移除旧版樱粉/抹茶），并新增独立字体切换器（`FontSwitcher` `字`/`Aa`，支持 8 套中英文双层字体搭配，默认「幼圆等宽 / YouYuan Mono」）。
- Upgrade to Workbench UI v3 with unified 48px single-row header, sliding tab indicator, resizable split panes (`DshSplitResizer`), shimmer skeletons (`DshSkeleton`), row hover quick-actions, 13 bright `[data-dsh-style]` themes (adding `blueprint`, `risograph`, `win98`, `songhui`, `frutiger`, and `gazette`), and 8 dual-layer Chinese/Latin `[data-dsh-font]` pairings via `FontSwitcher` (defaulting to `arcade` YouYuan Mono).

## 0.11.6 (2026-11-18)

- 升级共享更新组件至 `@stardustlc/dsh-updates@0.2.5`：独立安装插件详情页底栏去重（保留组合包组件委派与对话页热更新卡片），补齐 `bundle-in-use` 组合包占用提示说明，并在检查结果过期或远端版本变更时自动刷新元数据，彻底消除 `check-first` 卡顿。
- Upgrade `@stardustlc/dsh-updates` to `0.2.5`: deduplicate standalone native plugin detail footers while keeping Suite delegation and in-chat reminder cards, surface clear `bundle-in-use` guidance, and automatically refresh expired update checks without `check-first` stalls.

## 0.11.5 (2026-11-18)

- 升级共享更新组件至 `@stardustlc/dsh-updates@0.2.4`：对话页新增一键热更新提醒卡片，自动检查周期缩短至 6 小时，手动热更新后可顺手开启包含兼容功能小版本的空闲自动更新。
- Upgrade `@stardustlc/dsh-updates` to `0.2.4`: add an actionable in-chat hot-update reminder card, 6-hour background update checks, compatible minor+patch idle auto-updates, and a post-update opt-in prompt.

## 0.11.4 (2026-11-18)

- **交互式聚光灯 + 自动转向箭头分步引导（Coachmark Tour）**：顶栏新增 `? 引导` 按钮，首次进入工作台温和引导一次（跳过或完成后写入 `localStorage` 永久不再打扰），支持真实按钮聚光灯高亮、视口边缘自动翻转小箭头、键盘 `←`/`→`/`Esc` 导航与气泡内一键复制对话指令；移除占高度的静态折叠流程说明框。
- **Interactive Spotlight + Directional Arrow Coachmark Tour**: add a header **? Tour** trigger with one-time non-intrusive first-visit onboarding (`localStorage` persisted), live target spotlighting, auto-flipping directional arrows, keyboard `←`/`→`/`Esc` navigation, and inline 1-click prompt copy, replacing the static collapsible workflow box.

## 0.11.3 (2026-11-18)

- 同步 `@stardustlc/dsh-updates` 0.2.3：侧边栏工作台平时默认隐藏底部更新栏（零高度占用），仅在检测到兼容新版本或执行更新时浮现单行精简提示条；完整更新设置与检查入口统一保留在 DSH「插件」详情页底部。
- Sync `@stardustlc/dsh-updates` 0.2.3: keep the sidebar workbench update footer hidden by default when up-to-date, surfacing a single-line compact strip only for actionable updates or active jobs while retaining full controls in native Plugin Details.

## 0.11.2 (2026-11-18)

- 更新区底部新增克制、无打扰的 GitHub 点赞与问题反馈快捷链接，并完善中英文检索关键词。
- Add subtle, non-intrusive GitHub Star and issue feedback links in the update footer, and expand search keywords.

## 0.11.1 (2026-11-18)

- 同步 `@stardustlc/dsh-updates` 0.2.1：恢复 Suite 整包统一更新（移除独立拆包迁移），保留整包与独立插件的原地热更新与失败自动回滚。
- Sync `@stardustlc/dsh-updates` 0.2.1: restore unified Suite bundle updates (removing standalone conversion) while retaining in-place hot reload and automatic rollback.

## 0.11.0 (2026-11-18)

- 升级至 Workbench UI v2 并深度适配 DeepSeek Harness `>=0.2.2-rc.3`：按需接入 `@deepseek-ai/dsh-client-ui-primitives` 宿主组件（含独立测试语义回退与弹窗/菜单 Portal 风格同步）、顶部窗口避让与拖拽排除标记。
- 新增 5 套明亮主题切换（原生清透 / 米白纸感 / Claude 暖书卷 / 8-Bit 像素 / 晴空薄荷），跨工作台同步存储，暗色模式采用柔和板岩灰避免压抑纯黑；补齐微交互动效、无障碍减少动态支持与 Cordis 4 `ctx.effect` 卸载清理。
- Upgrade to Workbench UI v2 for DeepSeek Harness `>=0.2.2-rc.3`: lazy host UI primitives with standalone semantic fallbacks and portaled Menu/Modal style sync, 5 synced `[data-dsh-style]` studio presets with soft-slate dark mode, tactile button/icon micro-animations (`prefers-reduced-motion` aware), and Cordis 4 `ctx.effect` unload cleanup.

## 0.10.7 (2026-11-17)

- 在工作台单独检查和安装兼容版本。自动安装默认关闭，可为该插件开启空闲时的稳定补丁更新。
- Check and install compatible versions separately from the workbench. Automatic installation is off by default. Enable it for this plugin to apply stable patches while idle.

## 0.10.6 (2026-11-14)

- 适配 DSH 0.2.2-rc.3：最低 Harness 版本声明提升至 0.2.2-rc.3，运行时代码未变。
- Support DSH 0.2.2-rc.3: raise the minimum Harness declaration to 0.2.2-rc.3; runtime code is unchanged.

## 0.10.5 (2026-11-04)

- 同步共享界面：嵌入设置时继承宿主底色，输入框跟随主题，空状态保持可读宽度；新版 DSH 可显示插件设置图标。
- Align embedded surfaces, themed inputs, readable empty states and optional native settings icons.
- 工具文本返回项目与任务编号，可查询进度或取消。
- Expose project/job ids for progress queries and cancellation.


## 0.10.4 (2026-10-30)

- 视频工作台：导出前新增检查清单（标题、画幅与时长、素材数、已保存修订、渲染环境、上一份成品对应的修订）；预览与导出任务显示真实步骤进度，失败后可就同一修订直接重试；同一工程在别处更新时不再提供会导致反复冲突的「保存后继续」，改为显式重新载入或保留输入；保存/导出按钮不可用时给出具体原因；空工程列表提供「新建视频」入口。
- Pre-export checklist, step progress with in-place retry, conflict-safe save flow, disabled-button reasons and an empty-state action in the video workbench.

- 同步共享 workbench-ui v1.1：Page 外的 Empty / Dialog / Status 自带样式与 `.dshw` 主题作用域，Status 新增 warn 色调。
- Sync workbench-ui v1.1: Empty / Dialog / Status now carry their own styles and `.dshw` theme scope outside Page, and Status gains a warn tone.

## 0.10.3 (2026-10-30)

- 重整中英文首页：用途、三步流程图、安装入口与操作示例；详细配置与边界集中到完整说明。
- 保留下载统计、独立更新选择、问题反馈和贡献入口；原封面与运行功能保留。
- Refresh bilingual landing pages, workflow artwork, quick starts and reference navigation.


## 0.10.2 (2026-10-30)

- 原生插件列表与详情新增专门生成的鲸鱼娘图标：大头像、独立功能符号、透明留白，适合 30 / 36 px 显示；原封面保留。
- Add purpose-made whale-girl artwork with a distinct function emblem, transparent padding and small-size readability; preserve the original cover.


[返回简介](README.md) · [使用说明](docs/USAGE.md) · [验证记录](docs/VALIDATION.md)

## 0.10.1 (2026-10-29)

- 补齐中英文使用流程：准备、入口、具体操作与结果核对；新增累计 npm 下载徽章并保留月统计。
- Add practical getting-started workflows and lifetime npm download badges alongside monthly counts.

## 0.10.0 (2026-10-29)

- 工程库新增关键词搜索和最近 / 最早更新、自然标题排序；保留返回列表时的筛选条件，提供无匹配提示和清空搜索。
- Add project search and updated / oldest / natural-title sorting, retained filters on return, and a clear no-results state.
- 当前工程与归档工程可分别筛选，按标题、正文或模板查找；保留运行任务与未保存修改保护。

## 0.9.2 (2026-10-29)

- 同步仓库与 npm 的简明介绍、中英文 README 和反馈入口；本次为文档与包元数据更新。
- Sync npm descriptions and both README guides with the repository, including issue and pull-request links.

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

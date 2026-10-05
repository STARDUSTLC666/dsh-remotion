# dsh-remotion 使用说明

[返回简介](../README.md) · [更新记录](../CHANGELOG.md) · [验证记录](VALIDATION.md)

## 本次改进

保存工程后确认归档，可在“已归档工程”恢复。归档不删除项目资料、不减少磁盘占用；最多 30 个当前工程。运行中的任务需先关闭。

## 安装

```bash
dsh plugin --profile web add dsh-remotion
```

重启后说「用 Remotion 做个视频」即可触发。

## 卸载

```bash
dsh plugin --profile web remove dsh-remotion
```

卸载后重启 Web 服务。如需彻底清理，可再手动删除自己 profile `cordis.patch.yml` 中覆盖的插件行。

## 视频工作台

在桌面或 Web 的「设置 → Remotion」中操作：

1. 新建视频，选择标题卡、产品介绍或图文轮播，填写标题/正文、画幅和 3–30 秒时长，明确保存。
2. 上传 PNG/JPEG、一个背景音频（MP3/WAV）、一个静音背景视频（MP4）的副本。每个文件最多 20 MB、总计 40 MB；轮播按上传顺序，每张至少两秒。
3. 首次点击「准备渲染环境」。此时下载固定版本官方 CLI 4.0.532，优先使用已安装的 Chrome，没有时再下载浏览器；可以继续编辑工程。下载失败保留工程，查看运行记录后重试。使用前确认 [Remotion 官方许可证](https://www.remotion.dev/license)适合你的用途。
4. 启动官方 Studio，检查画面。停止本次预览后再编辑或导出；不会自动打开或占用前台窗口。
5. 导出 MP4、在工作台播放并下载。工程更新后保留旧成品并显示旧修订提醒；再次导出即可生成新成片。

「备份可编辑工程」包含源代码、项目数据和素材。解压后按 README 使用 npm install、npm run preview / render；原模板代码 MIT，渲染器保留自己的许可证。

工程、素材、运行目录和依赖缓存默认位于 DSH_HOME/data/dsh-remotion，两个插件分别保存。使用同一个 DSH_HOME 的 Web 与桌面 profile 共享这些已保存工程。不会改写原始素材或用户已有视频工程。关闭设置后，当前输入和任务状态保留在本次页面；刷新页面会提示未保存输入，已保存工程长期保留。任务可取消，关闭 DSH 会停止本插件任务。备份 ZIP 目前不支持在设置页导回。

智能体工具：remotion_project（list/create/get/update）；remotion_render（prepare/preview/render/job/cancel）。渲染与更新需要工程 id 和当前 revision；查询/取消使用 job id。工具不会默认下载依赖。

## 使用限制

本轮为轻量模板编辑，尚不提供时间轴编辑、字幕转写、TTS 或云端渲染。外部链接不能作为素材路径；请先保存到本地再上传。默认 24 FPS，成品上限 200 MB。预览仅监听 127.0.0.1，属于本机服务；多用户机器仍需考虑同机访问。

## 技能内容

- **remotion-best-practices**（总纲路由）+ 11 个领域技能（captions/create/docs/interactivity/maps/markup/multimedia/render/saas/studio/upgrade），同步自 Remotion 官方 v4.0.529

## 依赖

Node.js `^22.19.0 || >=24.0.0` + npx（npm registry）；渲染需 ffmpeg（Remotion 自带指引）。

## 移植说明

技能同步自官方 `remotion-dev/skills` 检出 v4.0.529（2026-09-25）：上游正文原样引入（含 `remotion-best-practices/`、`remotion-markup/` 下的内嵌引用副本），仅把 frontmatter 换成本包的 `name`/`description` + 上游 `version`；`scripts/sync-skills.mjs` 让移植可复现、可校验（`--check`）。

## 跨平台使用

技能采用开放的 Agent Skills（SKILL.md）格式，**不止 DSH 能用**——把 `skills/` 下的目录复制到其他 agent 的技能目录即可：

| Agent | 技能目录 |
| :-- | :-- |
| Claude Code | `~/.claude/skills/` |
| Cursor | `.cursor/skills/`（或项目内 `skills/`）|
| Gemini CLI | `~/.gemini/skills/` |
| OpenAI Codex | `~/.codex/skills/` |

一次移植，处处可用。

## 技能自检与重载

运行 `remotion_health` 会重新读取每个 `SKILL.md`，验证文件可读、YAML frontmatter 合法、名称与目录一致、描述与正文非空，再通过宿主 `skills.get` 确认实际生效的名称、描述、正文和资源目录与本次加载内容相符。文件存在但未注册、注册失败或后来被移除时，自检都会失败。

自检不修改文件或注册表。修改技能文件，或修复加载时损坏的技能后，应重载插件（也可重启 DSH）。它会报告 `changed`、`not_registered` 或 `registration_failed`，不会把磁盘修复直接当成运行时修复。若原先已成功加载，只是文件暂时丢失，恢复与加载时完全相同的内容即可重新通过检查。

每项结果保留 `name / ok / detail`，并增加 `code / fileOk / registered / registryChecked / reloadRequired`：`registered` 表示注册表仍匹配加载时的版本，因此文件变更时它可以为 true 而 `ok` 为 false。缺少或无法查询宿主注册表时返回 `registry_unavailable`；插件卸载后返回 `disposed`。`checkBundledSkills()` 仅检查磁盘文件，不推断运行时状态；原有不抛错的 `parseSkillFile()` 解析入口保持可用。

## 开发与共享实现

`src/index.ts` 只声明包名、技能清单和目录，解析、校验、注册与自检集中在包内 `src/skill-bundle.ts`。规范源位于 `dsh-hyperframes/src/skill-bundle.ts`，Remotion 保存相同的受版本控制副本；两包都编译并分发自己的 `lib/skill-bundle.js`，没有跨包运行时依赖，也不需要另一个仓库即可构建或安装。

依赖预先安装后，可直接离线构建和测试：

```bash
node node_modules/typescript/bin/tsc -p tsconfig.json
node --test "test/*.test.mjs"
```

两个仓库并列开发时，在 HyperFrames 修改公共模块与公共回归测试，再同步：

```bash
# 在 dsh-hyperframes 中执行；只更新相邻 dsh-remotion 的三个公共文件
node scripts/sync-skill-bundle.mjs
node scripts/sync-skill-bundle.mjs --check
```

两包测试都会检查公共源码与回归测试是否一致，防止副本漂移；单独检出时只跳过跨仓库比对，其余测试正常运行。测试覆盖损坏 YAML、不可读文件、空正文、注册异常/失效、内容变更与修复、卸载及清理异常，全程不调用视频或语音服务。

## License

MIT（移植编排）；技能内容版权归 Remotion。

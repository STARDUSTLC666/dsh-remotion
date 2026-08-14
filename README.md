[English](README.en.md)

# dsh-remotion

> **在 20+ 个 agent 里写视频**：Remotion 官方技能，React 编程式视频。

![npm version](https://img.shields.io/npm/v/dsh-remotion?label=npm&color=blue) ![npm downloads](https://img.shields.io/npm/dm/dsh-remotion) ![license](https://img.shields.io/npm/l/dsh-remotion) ![stars](https://img.shields.io/github/stars/STARDUSTLC666/dsh-remotion?style=social)


DSH（DeepSeek Harness）视频创作技能插件：**安装即把 Remotion 官方移植技能注册进 DSH**（React 编程式视频：动画、音频、字幕、3D、图表、字体等，38 个规则文件）。

## 安装

```bash
dsh plugin --profile web add dsh-remotion
```

重启后说「用 Remotion 做个视频」即可触发。

## 技能内容

- **remotion**：Remotion 最佳实践 + `rules/` 38 个规则文件（动画/音频/字幕/3D/图表/字体/GIF/Lottie/地图/转场…）

## 依赖

Node.js ≥ 20 + npx（npm registry）；渲染需 ffmpeg（Remotion 自带指引）。

## 移植说明

技能移植自 OpenAI Codex 官方 Remotion 插件缓存：frontmatter 已转换为 DSH 格式，codex 专属 `agents/` 已剔除，规则引用逐一校验。

## 跨平台使用

技能采用开放的 Agent Skills（SKILL.md）格式，**不止 DSH 能用**——把 `skills/` 下的目录复制到其他 agent 的技能目录即可：

| Agent | 技能目录 |
| :-- | :-- |
| Claude Code | `~/.claude/skills/` |
| Cursor | `.cursor/skills/`（或项目内 `skills/`）|
| Gemini CLI | `~/.gemini/skills/` |
| OpenAI Codex | `~/.codex/skills/` |

一次移植，处处可用。


## License

MIT（移植编排）；技能内容版权归 Remotion。



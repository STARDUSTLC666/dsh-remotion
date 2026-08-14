[English](README.en.md)

# dsh-remotion

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

## License

MIT（移植编排）；技能内容版权归 Remotion。

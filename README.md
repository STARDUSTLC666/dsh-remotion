**简体中文** · [English](README.en.md)

# Remotion

> **在 DeepSeek Harness 中用 React 创作、预演并导出高清 MP4 视频。**

内置 **OP-DSH 非线性多轨实体导演台**、13 个官方 Remotion 技能与工程模板库，支持 Studio 预览、本地渲染与可编辑工程归档。

[![npm](https://img.shields.io/npm/v/dsh-remotion)](https://www.npmjs.com/package/dsh-remotion) [![downloads](https://raw.githubusercontent.com/STARDUSTLC666/dsh-suite/npm-downloads/assets/dsh-remotion-downloads.svg)](https://www.npmjs.com/package/dsh-remotion) [![total downloads](https://raw.githubusercontent.com/STARDUSTLC666/dsh-suite/npm-downloads/assets/dsh-remotion-total-downloads.svg)](https://www.npmjs.com/package/dsh-remotion)

**[核心能力](#核心能力) · [安装](#安装) · [快速上手](#开始使用) · [完整说明](https://github.com/STARDUSTLC666/dsh-remotion/blob/master/docs/REFERENCE.zh.md)**

<picture>
  <source media="(prefers-color-scheme: dark) and (max-width: 640px)" srcset="https://raw.githubusercontent.com/STARDUSTLC666/dsh-remotion/master/docs/assets/intro/workflow-zh-mobile-dark.svg">
  <source media="(max-width: 640px)" srcset="https://raw.githubusercontent.com/STARDUSTLC666/dsh-remotion/master/docs/assets/intro/workflow-zh-mobile-light.svg">
  <source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/STARDUSTLC666/dsh-remotion/master/docs/assets/intro/workflow-zh-dark.svg">
  <img src="https://raw.githubusercontent.com/STARDUSTLC666/dsh-remotion/master/docs/assets/intro/workflow-zh-light.svg" alt="在 DSH 里把 React 工程做成视频。 · 流程示意" width="100%">
</picture>

## 核心能力

| 模块 | 核心特性 |
| :--- | :--- |
| **OP-DSH 实体导演台** | 暗色实时监看屏（`16:9`/`9:16`/`1:1` + 时间码 `TC` + 24-LED 矩阵）、右侧机械参数条与底部可擦洗三轨时间轴；1 键切回经典「表单」 |
| **官方技能与模板库** | 内置 13 个官方 Remotion 技能（固定版本 `4.0.545`）与多场景模板，支持工程检索、素材上传排序与归档恢复 |
| **预览与本地渲染** | 一键准备受管理渲染环境，启动官方 Remotion Studio 核对动效，本机导出高清 MP4 并保留可编辑源码备份 |
| **统一外观与字体** | 适配 DSH `>=0.2.2-rc.3`，内置 13 套明亮风格主题与 8 套中英双层字体（默认幼圆等宽），跨插件实时同步 |

<details>
<summary>查看工作台实景截图</summary>

![Remotion workbench](https://raw.githubusercontent.com/STARDUSTLC666/dsh-remotion/master/docs/assets/intro/screen-zh.webp)

图片来自本地 DeepSeek Harness 验证环境的示例工程（8-Bit 像素主题），使用示例内容。

</details>

## 安装

在 DSH 桌面版「插件」面板安装 `dsh-remotion`，或使用命令行：

```bash
dsh plugin --profile desktop add dsh-remotion
```

网页版将 `desktop` 改为 `web`，安装后重启 DSH。宿主要求：`>=0.2.2-rc.3`。

## 开始使用

1. **新建或打开工程**：从左侧栏打开 Remotion，默认进入 **OP-DSH 实体导演台**（右上角随时切回「表单」视图）。
2. **调参与擦洗分镜**：选择画幅、模板与 3–30s 时长，展开「分镜脚本」逐行改字幕；点 `▶ 播放` 或拖动 `画面轨 / 字幕轨 / 节奏轨` 实时预演。
3. **整理素材**：保存工程后，在「素材」页上传图片、音频或静音背景视频并调整顺序。
4. **环境与 Studio 预览**：首次在「环境」页一键准备官方渲染器，随后启动 Remotion Studio 核对最终动效。
5. **导出 MP4 与备份**：核对摘要后本地渲染高清 MP4，直接在监看屏回放下载，并在「导出记录」获取可编辑工程备份。

### 常用对话示例

> 制作一个 React 视频工程，先确认结构和文案，再用 Studio 预览，最后导出 MP4。

## 开始前要知道

- 首次使用需在「环境」页显式准备官方渲染环境；修改工程后需重新渲染成片。
- **技能与环境版本**：内置技能与受管理渲染器固定为 `4.0.545`（含 13 个官方技能与许可证导航）；插件更新不会改写已有用户工程及其依赖。
- 若桌面端已装 Node/npm 仍提示缺失，请检查启动 `PATH`（macOS Homebrew 常见 `/opt/homebrew/bin` 或 `/usr/local/bin`）后重启 DSH；详见 [使用说明](docs/USAGE.md) 与 [技能同步](docs/SKILL-SYNC.md)。

## 插件更新

在工作台或原生插件详情页底部检查更新。默认自动检查，**默认不自动安装**；Suite 管理的组件随整包更新。

## 文档与反馈

- [完整使用、配置与边界](https://github.com/STARDUSTLC666/dsh-remotion/blob/master/docs/REFERENCE.zh.md) · [更新记录](https://github.com/STARDUSTLC666/dsh-remotion/blob/master/CHANGELOG.md) · [验证历史](https://github.com/STARDUSTLC666/dsh-remotion/blob/master/docs/VALIDATION.md)
- 欢迎 Star、提交 [Issues](https://github.com/STARDUSTLC666/dsh-remotion/issues) 与 [PR](https://github.com/STARDUSTLC666/dsh-remotion/pulls)（反馈请附版本与复现步骤，并移除凭据）。

## License

[MIT](https://github.com/STARDUSTLC666/dsh-remotion/blob/master/LICENSE)

<a id="依赖与配置"></a>
<a id="技能与环境版本"></a>

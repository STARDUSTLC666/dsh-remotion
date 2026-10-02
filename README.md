# dsh-remotion

[English](README.en.md)

把 Remotion 的 React 视频创作技能接入 DSH。

[![npm](https://img.shields.io/npm/v/dsh-remotion)](https://www.npmjs.com/package/dsh-remotion) [![downloads](https://img.shields.io/npm/dm/dsh-remotion)](https://www.npmjs.com/package/dsh-remotion)

## 功能

- 提供动画、音频、字幕、图表和 3D 场景指引。
- 覆盖项目创建、Studio 预览与渲染流程。
- 保留官方技能内容与运行时自检。

## 安装

桌面版可在「插件」面板按包名 `dsh-remotion` 安装。已配置 dsh 命令时也可使用：

```bash
dsh plugin --profile desktop add dsh-remotion
```

网页版把命令中的 `desktop` 改为 `web`。安装后重启 DSH。

## 开始使用

可说：“用 Remotion 把这些素材做成视频，先在 Studio 预览，再导出 MP4。”

## 依赖与配置

插件安装的是技能；实际创作和渲染需 Node / npx 与 Remotion 项目依赖。上游来源、版本和许可证见使用说明。

详细配置、工具参数与排错见[使用说明](docs/USAGE.md)。从源码独立开发时，Node 要求以 [package.json](package.json) 为准。

## 文档

- [使用与排错](docs/USAGE.md)
- [更新记录](CHANGELOG.md)
- [验证范围与历史记录](docs/VALIDATION.md)
- [问题反馈与功能建议](https://github.com/STARDUSTLC666/dsh-remotion/issues)

## License

[MIT](LICENSE)。上游技能内容的来源和许可证见使用说明。

# dsh-remotion

[English](README.en.md)

![dsh-remotion 鲸鱼娘插件封面](https://raw.githubusercontent.com/STARDUSTLC666/dsh-remotion/master/assets/cover-whale-girl.png)

把 Remotion 的 React 视频创作技能接入 DSH。

[![npm](https://img.shields.io/npm/v/dsh-remotion)](https://www.npmjs.com/package/dsh-remotion) [![downloads](https://raw.githubusercontent.com/STARDUSTLC666/dsh-suite/npm-downloads/assets/dsh-remotion-downloads.svg)](https://www.npmjs.com/package/dsh-remotion)

欢迎使用，遇到问题或有改进建议，请提交 [issues](https://github.com/STARDUSTLC666/dsh-remotion/issues) 和 [PR](https://github.com/STARDUSTLC666/dsh-remotion/pulls)。

更新并重启 DSH 后，可从原生侧栏打开新版工作台，原设置入口继续保留。详见[工作台说明与验收范围](docs/WORKBENCH.md)。

## 功能

- 设置页视频工作台：选模板、编辑内容、上传素材，在官方 Studio 预览并导出本机 MP4。
- 提供标题卡、产品介绍、图文轮播；支持横屏、竖屏和正方形。
- 保留可编辑工程备份、渲染记录与取消操作；工程修改后提醒重新导出。

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

打开「设置 → Remotion」→「新建视频」，填写内容并保存，再上传素材。首次点击「准备渲染环境」下载依赖，完成后启动官方预览，检查画面、停止预览，再导出 MP4。

可说：“用 Remotion 把这些素材做成视频，先在 Studio 预览，再导出 MP4。”

## 依赖与配置

插件保留上游技能，并新增本地视频工作台。首次使用需 Node.js 22.19+ / 24+ 与 npm；Remotion 渲染器的使用条件见 [官方许可证](https://www.remotion.dev/license)。不会在 DSH 启动时自动下载依赖。

详细配置、工具参数与排错见[使用说明](docs/USAGE.md)。从源码独立开发时，Node 要求以 [package.json](package.json) 为准。

## 文档

- [使用与排错](docs/USAGE.md)
- [更新记录](CHANGELOG.md)
- [验证范围与历史记录](docs/VALIDATION.md)
- [问题反馈与功能建议](https://github.com/STARDUSTLC666/dsh-remotion/issues)

## 插件更新

需要 DSH 0.2.1-rc.3 或更新版本。每个插件在自己的页面或设置项提供检查、更新记录与确认安装入口，开关独立保存。自动检查默认开启；**自动安装默认关闭**，只有明确授权后，兼容的稳定补丁才会在空闲且没有未保存修改时安装。可单独关闭、推迟或忽略提醒；不会强制重启 DSH、升级 DSH 本体或替换本地源码安装。Suite 安装的组件会明确提示通过 Suite 整包更新。

旧版用户先在官方插件管理中手动更新一次，之后才会获得此入口。发布到 npm 不会直接替换用户已经安装的版本。

## License

[MIT](LICENSE)。上游技能内容的来源和许可证见使用说明。

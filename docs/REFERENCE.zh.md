> 完整使用说明。首页已按用途、安装和操作流程重新整理；这里保留详细参数、限制、更新规则与历史验证链接。

# dsh-remotion

[English](../README.en.md)

![dsh-remotion 鲸鱼娘插件封面](https://raw.githubusercontent.com/STARDUSTLC666/dsh-remotion/master/assets/cover-whale-girl.png)

在 DSH 中用 React 创作视频：官方 Remotion 技能、模板工程、素材上传与排序、归档、Studio 预览和本地 MP4 导出。可用 AI 编写工程，也可直接使用工作台模板。

[![npm](https://img.shields.io/npm/v/dsh-remotion)](https://www.npmjs.com/package/dsh-remotion) [![downloads](https://raw.githubusercontent.com/STARDUSTLC666/dsh-suite/npm-downloads/assets/dsh-remotion-downloads.svg)](https://www.npmjs.com/package/dsh-remotion) [![total downloads](https://raw.githubusercontent.com/STARDUSTLC666/dsh-suite/npm-downloads/assets/dsh-remotion-total-downloads.svg)](https://www.npmjs.com/package/dsh-remotion)

[下载统计说明](https://github.com/STARDUSTLC666/dsh-suite/blob/npm-downloads/README.md)

欢迎使用，遇到问题或有改进建议，请提交 [issues](https://github.com/STARDUSTLC666/dsh-remotion/issues) 和 [PR](https://github.com/STARDUSTLC666/dsh-remotion/pulls)。

从 DSH 原生侧栏打开工作台；配置与操作边界见[工作台说明](WORKBENCH.md)。

技能内容：官方 Remotion 4.0.539，12 个技能及完整引用资源。

在「素材」页上移或下移图片即可调整轮播顺序，支持键盘操作。顺序立即保存；重新导出后应用于新 MP4。

## 功能

- 工程库按关键词搜索，按最近 / 最早更新或标题排序；返回列表时保留筛选条件。
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

1. 从左侧栏打开 Remotion，点击“新建视频”，选模板并填写内容。
2. 保存工程，再上传图片、音频或视频；需要时在“素材”页调整图片顺序。
3. 首次在“环境”页准备官方渲染环境，完成后启动 Studio 预览。
4. 核对预览，停止预览后继续编辑或导出 MP4；修改后重新导出才会更新成品。
5. 在导出记录下载 MP4 或可编辑工程；用工程库搜索和归档整理多个项目。

## 依赖与配置

插件保留上游技能，并新增本地视频工作台。首次使用需 Node.js 22.19+ / 24+ 与 npm；Remotion 渲染器的使用条件见 [官方许可证](https://www.remotion.dev/license)。不会在 DSH 启动时自动下载依赖。

详细配置、工具参数与排错见[使用说明](USAGE.md)。从源码独立开发时，Node 要求以 [package.json](../package.json) 为准。

## 文档

- [使用与排错](USAGE.md)
- [更新记录](../CHANGELOG.md)
- [验证范围与历史记录](VALIDATION.md)
- [问题反馈与功能建议](https://github.com/STARDUSTLC666/dsh-remotion/issues)

## 插件更新

需要 DSH 0.2.1-rc.3 或更新版本。更新控件直接位于原有工作台内容末尾；没有工作台的插件，位于原生插件详情页底部。检查、更新记录和偏好在原地展开，不增加独立更新页面或设置菜单。自动检查默认开启；**自动安装默认关闭**，明确授权后才会在空闲且没有未保存修改时安装兼容的稳定补丁。开关按插件独立保存，可关闭、推迟或忽略提醒；不会强制重启 DSH、升级 DSH 本体或替换本地源码安装。Suite 组件在当前页面底部明确说明并操作 Suite 整包更新。

旧版用户先在官方插件管理中手动更新一次，之后才会获得此入口。发布到 npm 不会直接替换用户已经安装的版本。

## License

[MIT](../LICENSE)。上游技能内容的来源和许可证见使用说明。

**简体中文** · [English](README.en.md)

# Remotion

**在 DSH 里把 React 工程做成视频。**

[![npm](https://img.shields.io/npm/v/dsh-remotion)](https://www.npmjs.com/package/dsh-remotion) [![downloads](https://raw.githubusercontent.com/STARDUSTLC666/dsh-suite/npm-downloads/assets/dsh-remotion-downloads.svg)](https://www.npmjs.com/package/dsh-remotion) [![total downloads](https://raw.githubusercontent.com/STARDUSTLC666/dsh-suite/npm-downloads/assets/dsh-remotion-total-downloads.svg)](https://www.npmjs.com/package/dsh-remotion)

**[安装使用](#安装) · [使用流程](#开始使用) · [完整说明](https://github.com/STARDUSTLC666/dsh-remotion/blob/master/docs/REFERENCE.zh.md)**

<picture>
  <source media="(prefers-color-scheme: dark) and (max-width: 640px)" srcset="https://raw.githubusercontent.com/STARDUSTLC666/dsh-remotion/master/docs/assets/intro/workflow-zh-mobile-dark.svg">
  <source media="(max-width: 640px)" srcset="https://raw.githubusercontent.com/STARDUSTLC666/dsh-remotion/master/docs/assets/intro/workflow-zh-mobile-light.svg">
  <source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/STARDUSTLC666/dsh-remotion/master/docs/assets/intro/workflow-zh-dark.svg">
  <img src="https://raw.githubusercontent.com/STARDUSTLC666/dsh-remotion/master/docs/assets/intro/workflow-zh-light.svg" alt="在 DSH 里把 React 工程做成视频。 · 流程示意" width="100%">
</picture>

## 功能

- 使用官方技能与工作台模板。
- 管理工程、素材顺序和 Studio 预览。
- 导出本机 MP4，保留后续可编辑的工程备份。

## 安装

在 DSH 桌面版「插件」面板安装 `dsh-remotion`。已配置命令行时也可使用：

```bash
dsh plugin --profile desktop add dsh-remotion
```

网页版把 `desktop` 改为 `web`；安装后重启对应的 DSH。宿主要求以包声明 `>=0.2.1-rc.3` 为准。

## 开始使用

1. 从左侧栏打开 Remotion，点击“新建视频”，选模板并填写内容。
2. 保存工程，再上传图片、音频或视频；需要时在“素材”页调整图片顺序。
3. 首次在“环境”页准备官方渲染环境，完成后启动 Studio 预览。
4. 核对预览，停止预览后继续编辑或导出 MP4；修改后重新导出才会更新成品。
5. 在导出记录下载 MP4 或可编辑工程；用工程库搜索和归档整理多个项目。

可以这样说：

> 制作一个 React 视频工程，先确认结构和文案，再用 Studio 预览，最后导出 MP4。

## 开始前要知道

首次使用需准备官方渲染环境；修改工程后需要重新渲染成品。

配置、完整工具与排错见[详细使用说明](https://github.com/STARDUSTLC666/dsh-remotion/blob/master/docs/REFERENCE.zh.md)。

## 插件更新

在工作台或原生插件详情页底部检查更新。默认自动检查，**默认不自动安装**；是否安装、何时重启由你决定。Suite 管理的组件随整包更新。[查看更新规则](https://github.com/STARDUSTLC666/dsh-remotion/blob/master/docs/REFERENCE.zh.md)。

## 文档

- [详细使用、配置与边界](https://github.com/STARDUSTLC666/dsh-remotion/blob/master/docs/REFERENCE.zh.md)
- [更新记录](https://github.com/STARDUSTLC666/dsh-remotion/blob/master/CHANGELOG.md)
- [验证范围与历史](https://github.com/STARDUSTLC666/dsh-remotion/blob/master/docs/VALIDATION.md)

## 反馈与贡献

如果插件帮到了你，欢迎 Star，让更多人发现它。问题和建议请提交 [Issues](https://github.com/STARDUSTLC666/dsh-remotion/issues)，也欢迎代码与文档 [PR](https://github.com/STARDUSTLC666/dsh-remotion/pulls)。反馈时附上版本与复现步骤，并移除凭据。

## License

[MIT](https://github.com/STARDUSTLC666/dsh-remotion/blob/master/LICENSE)

<a id="依赖与配置"></a>

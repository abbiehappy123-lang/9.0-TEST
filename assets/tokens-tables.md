# Token 速查表（自动生成，勿手改）

> 源: tokens.json。改值改源后跑 `node build-tokens.js`，再把对应表格粘回 colors.md / spacing.md / shadows.md / typography.md。

## 颜色

| CSS 变量 | 值 | 说明 | Figma |
|---|---|---|---|
| `--v9-primary` | `#FF6435` | 品牌主色 | Color/主色 |
| `--v9-secondary` | `#FFB19A` | 辅助/完成态色 | Color/辅助色 |
| `--v9-on-primary` | `#FFFFFF` | 主色上文字 | Color/反白 |
| `--v9-text-primary` | `#222222` | 标题/重要文字 | Color/标题 |
| `--v9-text-body` | `#444444` | 正文 | Color/正文 |
| `--v9-text-secondary` | `#757575` | 辅助说明 | Color/辅助信息 |
| `--v9-text-tertiary` | `#999999` | 次要/弱化 | Color/次要信息 |
| `--v9-text-muted` | `#CCCCCC` | 占位/极弱 | Color/灰态 |
| `--v9-surface-canvas` | `#F0F1F5` | 页面背景 | Color/全局背景色 |
| `--v9-surface-default` | `#FFFFFF` | 卡片白 | Color/反白 |
| `--v9-surface-inset` | `#F6F8FB` | 灰底子卡片 | Color/局部填充色 |
| `--v9-outline` | `#EBECF2` | 分割线/描边 | Color/分割线色 |
| `--v9-error` | `#FF1930` | 错误/危险 | Color/错误色 |
| `--v9-success` | `#00B42A` | 成功/通过 | Color/成功色 |
| `--v9-disable` | `#CCCCCC` | 禁用/灰态 | Color/灰态 |
| `--v9-info-bg` | `#FFF5E8` | Alert info 底 | — |
| `--v9-warning-bg` | `#FFEAE8` | Alert warning 底 | — |
| `--v9-tag-brand-bg` | `#FFF0EB` | Tag light 品牌底 | — |
| `--v9-tag-success-bg` | `#DBFFD7` | Tag light 成功底 | — |

## 圆角

| CSS 变量 | 值 | 说明 | Figma |
|---|---|---|---|
| `--v9-radius-xs` | `4px` | 小标签/小元素 (Extra-small) | — |
| `--v9-radius-sm` | `8px` | medium toast/小元素 (Small) | — |
| `--v9-radius-md` | `12px` | 输入框/子卡片 (Medium) | — |
| `--v9-radius-lg` | `16px` | 页面级卡片 (Large) | — |
| `--v9-radius-xl` | `30px` | 底部弹出面板 (Extra-large) | — |
| `--v9-radius-full` | `1000px` | 胶囊/全圆 (Full) | — |

## 间距

| CSS 变量 | 值 | 说明 | Figma |
|---|---|---|---|
| `--v9-space-xs` | `4px` | space/xs | — |
| `--v9-space-sm` | `8px` | space/sm | — |
| `--v9-space-md` | `12px` | space/md | — |
| `--v9-space-lg` | `16px` | space/lg | — |
| `--v9-space-xl` | `24px` | space/extra extra lg | — |
| `--v9-page-margin` | `12px` | 页面内容区左右边距 | — |

## 阴影（基底 #0F284D）

| CSS 变量 | 值 | 说明 | Figma |
|---|---|---|---|
| `--v9-shadow-1` | `0px 4px 12px rgba(15,40,77,0.06)` | Level1 基础卡片/列表项 | — |
| `--v9-shadow-2` | `0px 8px 24px rgba(15,40,77,0.08)` | Level2 地图浮层/悬浮组件 | — |
| `--v9-shadow-3` | `0px 12px 24px rgba(15,40,77,0.08)` | Level3 重点操作/底部栏 | — |
| `--v9-shadow-4` | `0px 16px 32px rgba(15,40,77,0.10)` | Level4 弹窗/模态 | — |
| `--v9-shadow-5` | `0px 30px 50px rgba(15,40,77,0.12)` | Level5 Toast/全局最高层 | — |

## 字族

| CSS 变量 | 值 | 说明 | Figma |
|---|---|---|---|
| `--v9-font-cn` | `'PingFang SC','Noto Sans SC',sans-serif` | 中文(含原生回退) | — |
| `--v9-font-num` | `'Barlow Semi Condensed','PingFang SC',sans-serif` | 数字/英文 | — |

## 字号（lineHeight = 字号 × 1.5）

| CSS 变量 | 值 | 说明 | Figma |
|---|---|---|---|
| `--v9-fz-display-l` | `45px` | Display Large（数字） | — |
| `--v9-fz-display-m` | `36px` | Display Medium（数字） | — |
| `--v9-fz-display-s` | `30px` | Display Small（数字） | — |
| `--v9-fz-headline-l` | `22px` | Headline Large 页面大标题 | — |
| `--v9-fz-headline-m` | `18px` | Headline Medium 区块标题 | — |
| `--v9-fz-headline-s` | `16px` | Headline Small 卡片标题 | — |
| `--v9-fz-body-l` | `14px` | Body Large 正文/描述 | — |
| `--v9-fz-body-m` | `12px` | Body Medium 辅助正文 | — |
| `--v9-fz-label-m` | `11px` | Label Medium 小标签/角标 | — |


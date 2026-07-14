---
name: design-language
description: >
  9.0 设计规范 — 统一设计语言与风格规范。每当用户需要创建 UI 界面、网页、React 组件、HTML 页面、
  Figma 页面搭建、设计稿描述，或任何涉及视觉风格的任务时，必须使用此 skill 确保风格一致性。
  即使用户只是说"帮我做个界面"、"做个页面"、"搭建一下"也要触发。
  包含：颜色体系、字体规范、间距圆角、阴影层级、组件规范、自定义规则、H5 组件库、Figma 工作流。
---

# 9.0 设计规范

基于 Figma 设计稿 `9.0规范-一致性测试` 的完整设计系统。

**Figma 源文件 Key**: `sxQXbLdcTfITwow8YCnmOJ`

---

## 出图流程（PRD → H5 →（按需）Figma）

本规范的标准产出链路为三段：

1. **PRD → H5（主产出，默认交付物）**
   读 PRD，按 `references/workflow.md` 的公共主干整理文案、选组件、套规范，
   用 `assets/v9-core.css` 基座生成 H5（裸写 class）。

2. **H5 自查** —— 按 workflow.md 自查清单逐条核对（文案不超范围 / token 合规 / 可映射）。

3. **H5 →（按需）Figma** —— 非必经，仅在「要进设计源、复用组件」时执行：
   - **方式二（主路径，保留映射）**：AI 读 H5 + `references/v9-figma-map.md`，
     用组件 Key 导入**真实组件实例**写入 Figma。详见 `references/workflow.md`。
   - **方式一（手动旁路，仅预览）**：用 Figma 插件把 H5 转图层。
     ⚠️ 产物为拆散图层、**不带映射、不回流设计源**，只能看版式。

---

## 核心设计语言（快速参考）

> 数值唯一源为 `assets/tokens.json`，经 `assets/build-tokens.js` 生成 `assets/v9-tokens.css`。
> 下表仅为速览，改值改 tokens.json 后跑 `node build-tokens.js`，勿手改派生文件。

| 维度 | 规范 |
|------|------|
| 主色 | `#FF6435`（橙红）|
| 背景色 | `#F0F1F5`（全局）/ `#FFFFFF`（卡片）|
| 中文字体 | PingFang SC（回退：Noto Sans SC）|
| 数字/英文字体 | Barlow Semi Condensed |
| 圆角基准 | 4px 阶梯，Full = 1000px（胶囊形）|
| 间距网格 | 基于 4px，页面左右 margin = 12px |
| 行高规则 | 统一为字号的 **1.5 倍** |
| 阴影色基底 | `#0F284D` 不同透明度（5 级）|

---

## 参考文件索引

按需读取对应文件，不要一次性全部读取。

| 文件 | 内容 | 何时读取 |
|------|------|---------|
| `references/colors.md` | 颜色体系（数值源见 tokens.json）| 涉及颜色选取时 |
| `references/typography.md` | 字体规范 | 涉及文本样式、字号选择时 |
| `references/spacing.md` | 间距与圆角 | 涉及布局间距、圆角设定时 |
| `references/shadows.md` | 阴影/层级 | 涉及卡片、弹窗、浮层阴影时 |
| `references/components.md` | 组件规范 + Figma Component Key 索引 | 使用任何 UI 组件时（必读）|
| `references/custom-rules.md` | ⭐ 自定义规则（**优先级最高**，规范红线唯一真相）| 有疑问或冲突时优先查阅 |
| `references/workflow.md` | 出图工作流（公共主干 + H5/Figma 双执行分支）| 出 H5 或写入 Figma 时（必读）|
| `references/v9-figma-map.md` | H5 ↔ Figma 组件 Key/变体映射 | 走「方式二」写入 Figma 时（必读）|
| `assets/v9-core.css` | H5 组件库基座（组件样式/结构，引用 token 变量）| 生成 H5 时引入 |
| `assets/tokens.json` | token 唯一数值源（改值只改这）| 改颜色/间距/圆角/阴影时 |
| `assets/build-tokens.js` | 构建脚本（生成 v9-tokens.css 与文档表格）| 改完 tokens.json 后运行 |
| `pages/_index.md` | 已做页面的存档索引（page 实例级：某页怎么做的）| 参考已做过的页面、或新增页面存档时 |
| `assets/icons/` | 图标真身 SVG（返回箭头、状态栏等，基座 mask 引用）| 用/加图标时（必须用真身，禁止手画）|

---

## 执行规则

### 优先级顺序

1. **`custom-rules.md`** — 用户自定义规则，最高优先级，覆盖所有默认值（规范红线只在此处定义）
2. 各专项规范文件（colors / typography / spacing / shadows / components）
3. 通用设计常识

### H5 场景（主产出）

PRD 的默认产物是 H5。引入 `assets/v9-core.css` 基座，**裸写 class** 使用其中组件
（不做框架壳，class 即调用方式）。基座只用 `var(--v9-*)` 引用 token，数值来自
`assets/v9-tokens.css`（由 tokens.json 生成）。组件 class 命名与属性对齐 Figma 变体，
便于「方式二」写入 Figma 时保留映射。

```css
/* 引入方式：页面只需引基座，token 会被 @import 自动带入 */
@import url('v9-core.css');   /* v9-core.css 内部已 @import v9-tokens.css */
```

### 使用组件的原则（Figma 场景）

**必须优先使用组件库实例，禁止手动拼装已有库组件。** 搭建任何页面前先查
`references/components.md` 的 Component Key 索引，用 `importComponentByKeyAsync` /
`importComponentSetByKeyAsync` 导入。详见 `references/workflow.md` 的 Figma 执行分支。

---

## 组件更新操作约定

每次在 Figma 新增/修改组件，由使用者**手动告知**（发组件链接 + 说明用途；未接 Figma MCP 时附 Component Key 与变体属性名）。据此**同步更新两套**，缺一不可：

- **用于写入 Figma 的**：`references/components.md`（规范）+ `references/v9-figma-map.md`（映射）
- **H5 库**：`assets/v9-core.css`（样式实现）；若引入新色值/间距，先入 `assets/tokens.json` 再跑 `build-tokens.js`

> 一致性靠流程触发，非自动。Figma 改了未告知 → H5 不会更新（会漂移）。
> 值的同步可经 tokens.json 自动化；结构同步靠本约定。

---

## 快速决策树

```
需要什么？
├── 颜色/色值         → tokens.json（改值）> custom-rules.md > colors.md
├── 文字样式/字号     → typography.md（行高 = 字号 × 1.5）
├── 间距/圆角         → tokens.json > spacing.md（页面 margin = 12px）
├── 阴影              → tokens.json > shadows.md（5 级体系）
├── 按钮/导航/卡片等   → components.md（含 Figma Key）+ v9-core.css（H5 实现）
├── 出图链路          → workflow.md（先 H5）→ 需要 Figma 再走方式二（读 v9-figma-map.md）
└── 某页怎么做的       → pages/_index.md（已做页面存档；参考实现/记已知偏差）
```

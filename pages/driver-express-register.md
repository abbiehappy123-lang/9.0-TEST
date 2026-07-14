# 司机端·专属极速注册引导页

- **来源**：Figma fileKey `dhjgTiqD7K1OQyDra1s26y` node `21:4`（Frame 375×812）
- **场景**：司机端注册流程的引导页。已在滴滴其他出行业务完成资质认证的用户，
  引导其"一步复用资质、极速成为司机"；提供次级入口回退到手动上传证件。
- **性质**：一次性 page 存档（实例级记录，非可复用 layout）。

---

## 版式骨架（自上而下）

这是一种「Hero 引导型」单屏版式：大图头图 + 主标题 + 单主按钮 + 次级放弃入口 + 底部说明。

| # | 层 | 元素 / 组件 | 位置尺寸 |
|---|----|-------------|----------|
| 1 | 顶部导航 | App bars（Flat 变体，内含系统状态栏） | 顶部，375×88，标题隐藏、右操作「分享」关闭 |
| 2 | Hero 头图 | 顶部运营插画（整图切图，**非组件**） | 0–419px，占上半屏，`assets/images/driver-express-register-hero.png` |
| 3 | 主标题 | 文本，含主色橙高亮关键词 | 约 y=429，居中；「最快1步」用 `--primary` 橙高亮 |
| 4 | 主按钮 | Button Full-width（Primary） | y=539，宽 335，胶囊 1000px，文案「同意并使用急速注册」 |
| 5 | 次级入口 | 文字 + 独立 arrow 图标（手动拼装 Group） | y=613，Secondary 灰，文案「不使用，手动上传证件注册」 |
| 6 | 底部说明 | 正文文本块 | y=704，宽 335，12px，tertiary 色，业务免责/授权说明 |
| 7 | Home Indicator | 底部横条 | 底部居中 |

> 注：主按钮左右边距为 **20px**（335 = 375 − 20×2），区别于常规卡片页的 12px margin。
> 这是引导页版式特征，将来若抽 layout 需记录此差异。

---

## 使用的组件

| 元素 | 库组件 + 变体 | 备注 |
|------|---------------|------|
| 顶部导航 | App bars · Flat（`21:204`） | 库实例；状态栏图标+返回箭头已做进 H5 基座（`v9-core.css`），页面纯调用 |
| 主按钮 | Button Full-width · Primary / Default（`21:301`） | 库实例，胶囊 1000px |
| 箭头 | Arrow · grey / L（`21:559`） | 库实例，独立图标 |
| 次级链接（文字+箭头整体） | —（`21:576` Group，手动拼装） | ⚠️ text + arrow 手动组合，**非组件**，见下方 TODO |

组件规范与 Component Key 见 `references/components.md`。

---

## 使用的 Token

（只引用，值以 `assets/tokens.json` / `references/colors.md` 为准）

- 主色高亮：`--primary`（#FF6435）——用于标题「最快1步」
- 主按钮文字：`--on-primary`（白）
- 标题主文字：`--text-primary`（#222222）
- 次级链接：`--text-secondary`（#757575）
- 底部说明：`--text-tertiary`（#999999）
- 页面背景：白（本页 Hero 图铺满上半屏，下半屏白底）

本页未引入任何新 token，全部命中现有色板。

---

## 资产

| 文件 | 用途 | 路径 |
|------|------|------|
| 顶部 Hero 插画 | 页面顶部头图（司机竖拇指+手机认证成功） | `assets/images/driver-express-register-hero.png` |

- 规格：源图 1127×1260（完整插画）；页面中置于顶部 0–419px 槽位裁切/缩放使用。
- 性质：一次性运营素材，非组件、不可复用，每个引导页各异。
- 引用方式：当前为 skill 内相对路径。上 GitHub 后可改用 raw URL 前缀
  （参照 Rewardsmall：`https://raw.githubusercontent.com/<账号>/<repo>/main/` + 相对路径）。

---

## 图标资源（本页涉及，已入基座）

App bar 的状态栏图标与返回箭头，本次正式补进 H5 基座，成为组件库能力：

| 资源 | 来源 | 说明 |
|------|------|------|
| `assets/icons/nav-back.svg` | Figma App bars 组件（用户导出真身 SVG） | 返回箭头真身，路径未改；基座用 mask 引用 |
| `assets/icons/statusbar-cellular/wifi/battery.svg` | 按组件规格制作 | 状态栏系统图标 |

基座 `.v9-statusbar__icons` / `.v9-appbar__back` 用 CSS mask 承载，颜色跟随 `currentColor`（black/white 变体自动适配）。

> ⚠️ 实战教训（已写入 custom-rules「图标/图形资源规则」+ workflow 自查）：
> 图标必须用真身 SVG，禁止 AI 手画/近似；mask 的 SVG 必须纯 `fill` 填充（无 currentColor / 无 stroke）；改基座后必须回读验证真正写入。

---

## 可复用点 / 待组件化（TODO）

- **次级操作链接（文字 + arrow）值得做成组件**：高频出现在引导页/表单页/详情页底部，
  当前为手动拼装（违反 custom-rules「禁止手动拼装」精神）。规则已在 custom-rules
  「链接/图标/操作样式规则」成文，只差落成组件（建议名 `TextLink` / `SecondaryAction`，
  变体 secondary/primary）。**决策：暂不做，先记 TODO，日后在 Figma 落地后按
  「组件更新操作约定」正式登记。**
- **Home Indicator 组件在 Figma 库缺登记**：H5 侧已有 `.v9-home-indicator`
  （见 v9-core.css），但 `components.md` / `v9-figma-map.md` 中无对应组件 Key。
  属既有漂移，待补登记（非本次范围）。
- **「Hero 引导型」版式**：若后续出现第 2 个同类引导页，可据本页「版式骨架」
  提炼为 `layouts/onboarding.md`。

---

## 已知偏差

以下为本页实例与规范红线不符之处，**均为实例偏差，不作规范依据**（规范维持原样）：

| 偏差 | 本页实际 | 规范要求 |
|------|----------|----------|
| 主标题行高 | 28px 字号 / 40px 行高（≈1.43） | 行高 = 字号 × 1.5（应为 42px），见 custom-rules 字体规则 |
| Home Indicator | 颜色 #222、圆角 8px | 浅底用 #000、圆角 full(100px)，见 custom-rules Home Indicator 规则 |

> 复现本页时应按规范修正上述两处，而非沿用偏差值。

# 出图工作流（PRD → H5 →（按需）Figma）

本工作流分**公共主干**（产物无关，出 H5 / Figma 都走）与**两个执行分支**（H5 / Figma）。
规范红线（颜色/间距/圆角/行高/surface 等）只在 `custom-rules.md` 定义，本文件只引用不复述。

---

## 写入 Figma 的两种方式（先选路）

| | 方式二（主路径） | 方式一（手动旁路） |
|---|---|---|
| 做法 | AI 读 H5 + `v9-figma-map.md`，导入组件实例写入 | Figma 插件把 H5 转图层 |
| 产物 | 真实组件实例 + 正确变体，**保留映射** | 拆散的 Frame/Text，**无映射** |
| 用途 | 正式交付、进设计源、需复用/全局改 | 快速看版式、一次性草图 |
| 回流设计源 | ✅ 可 | ❌ 禁止 |

**默认走方式二。** 方式一仅用于预览，产物不进版本、不当交付。

---

# 一、公共主干（产物无关）

## 🚦 阶段一：出图前准备

- [ ] **0. 输出内容确认表并等待用户确认**，再写任何代码。用户只需确认内容正确，无需了解组件细节；内部同步完成组件映射：
  ```
  ## 出图前确认

  | 模块 | 展示内容 | 状态/变体 |
  |------|----------|----------|
  | 任务卡片 | 标题 + 截止时间 + 去上传按钮 | 待办 / 空状态 / 多任务 |
  | 历史任务入口 | 标题 + 最近一条记录 + 查看全部 | — |
  ```
- [ ] **0.1 确认表必须单列「PRD 未定义项」**：凡 PRD 未写明、但设计必须决定的项（如图片张数、列表排列方式、空数据兜底、PRD 未给的标题文案等），单独列出并等用户确认，**禁止自行默认填充**（占位「值」可填示例，但「规则/数量/结构」类留白必须先问）。
- [ ] **1. 阅读 PRD，整理文案清单**：把页面所有需要显示的文案逐条列出，后续每加一个文字节点都要核对，没有的文案一律不加。
- [ ] **1.1 PRD 有歧义或信息缺失时，必须向用户二次确认**，等待明确答复后再继续；确认问题须一次性列出，不可逐条打断。
- [ ] **2. 去规范库验证 skill**：打开规范库文件（`sxQXbLdcTfITwow8YCnmOJ`）查询当前组件列表，与 `components.md` 对比，发现不一致立即更新 skill，再开始出图。
- [ ] **3. 做组件映射表**：把页面每个模块对应的库组件列出来（H5 走 v9 组件，Figma 走库组件），只有确认不存在对应组件时才手动创建。
- [ ] **3.1 图标级元素也要查真身**：返回箭头、状态栏图标、业务图标等，必须使用组件/导出的真实 SVG，**禁止 AI 手画或近似重建**；拿不到真身时向用户索取 Figma 导出（见 custom-rules「图标/图形资源规则」）。

## ✅ 阶段三：产出后核对

- [ ] **对照 PRD 文案清单逐条核对**：删除所有不在 PRD 里的文案和内容。
- [ ] **检查无超范围内容**：空状态只显示 PRD 指定文案，不自加副文案。

## 交付前自查清单（两条线通用，逐项确认）

### Token 正确性
- [ ] 所有颜色/间距/圆角/阴影是否来自 token（H5 用 `var(--v9-*)`；Figma 用库变量），无凭记忆写的值？
- [ ] 是否使用 `#222222` 作为最深文字，没有 `#000000` 纯黑（Home Indicator 除外）？
- [ ] 页面底色 `#F0F1F5`、卡片色 `#FFFFFF`，没有用纯白做页底？

### 文案与内容
- [ ] 页面所有文案均来自 PRD 文案清单，无 AI 自行补全？
- [ ] 空状态只显示 PRD 指定文案？

### 布局结构
- [ ] 宽度 375px（非 390px）；卡片宽 351px、左右各 12px margin？
- [ ] Header↔Content 8px、Content↔Footer 16px，未统一同一值？
- [ ] 行高 = 字号 × 1.5？无自造分割线？
- [ ] Home Indicator 颜色与背景匹配（浅→黑，深→白）？

### 图标 / 资源与改动验证（实战教训）
- [ ] 所有图标用真身 SVG（非 AI 手画/近似）？mask 图标为纯 `fill` 填充（无 currentColor / 无纯 stroke）？
- [ ] **改动基座（v9-core.css）或任何文件后，回读该文件确认改动真正写入**（解码比对 base64 / 检查目标行），不靠"以为改成功了"？
- [ ] 视觉验证手段不可靠时（如无法查看渲染图），如实告知用户"无法确认视觉、请你确认"，**不擅自下"已修复"结论**？

> 规范红线全文见 `custom-rules.md`，本清单仅为执行勾选项。

---

# 二、H5 执行分支

## 引入与写法

页面引入基座，裸写 class（不做框架壳）：

```html
<link rel="stylesheet" href="assets/v9-core.css">  <!-- 内部已 @import v9-tokens.css -->
...
<div class="v9-card">
  <div class="v9-card__header">
    <span class="v9-card__title">费用明细</span>
    <span class="v9-card__action">开发票 ›</span>
  </div>
  <div class="v9-card__content">…</div>
</div>
```

- 所有数值走 token 变量，**禁止在页面里写死 hex/px**；需要新值先入 `tokens.json` 跑脚本。
- class 命名对齐 Figma 变体（`v9-btn--primary`、`is-disabled`…），便于方式二映射。

## PRD 语义 → H5 组件选型表

| PRD 描述的内容形态 | H5 组件 / class | 关键变体 |
|--------------------|------------------|----------|
| 页面顶部标题栏 | `.v9-appbar`（flat/text/icon） | 有返回+标题→flat |
| 标题 + 「查看/全部/更多」跳转 | `.v9-card__action`（link 语义） | 用于**页面跳转** |
| 标题 + 可展开/收起 | CardHeader expand 语义 | 用于**当前卡片展开** |
| 标题 + 描述（纵排） | CardContent editorial | — |
| 多列键值（横排） | `.v9-list-row` | 左键右值 |
| 带图片内容 | CardContent media | 大图可叠 StatusOverlay |
| 状态标记（审核中/通过/未通过） | `.v9-tag`（light + success/error/tertiary） | — |
| 页面提示（优惠/异常/须知） | `.v9-alert`（info/warning） | 卡片内用 small |
| 主操作按钮 | `.v9-btn--full.v9-btn--primary` | — |
| 次操作 | `.v9-btn--subtle` | — |
| 分类切换 | `.v9-tabs` | amount + active |

## H5 专属错误清单

| 错误做法 | 正确做法 |
|---------|---------|
| 在页面/组件里写死 `#FF6435` / `16px` | 用 `var(--v9-primary)` / `var(--v9-radius-lg)`；新值入 tokens.json |
| 卡片宽度用 `width:100%`/FILL | 固定 `351px`（= 375 − 12×2） |
| 漏设行高 | 行高 = 字号 × 1.5（16→24 / 14→21 / 12→18） |
| Header/Content/Footer 间距统一一个值 | 8px / 16px 分层 |
| 自行加 list 行分割线、Header↔Content 分割线 | 规范未描述，一律不加 |
| 用纯白做页底、纯黑做文字 | 页底 `--v9-surface-canvas`，文字最深 `--v9-text-primary` |
| Home Indicator 颜色不随背景 | 浅底黑、深底白 |
| 箭头用键盘字符（‹ › ∨ ∧）/ 文案带箭头符号（「全部 ›」） | 箭头为独立图标元素（SVG/图标）；文案只写操作名；箭头与文字同色 |
| 次级链接（查看/全部/展开/收起）用主色橙 | 用 Secondary 灰 `#757575`，主色橙留主操作 |
| 带副标题时操作垂直居中 | 操作对齐标题行（`align-items:flex-start`），副标题独占其下整行 |
| 警示/原因信息默认新增 Alert（或手搓警示块） | 描述槽空闲时复用槽位 + 警示色 `#FF1930`（见 custom-rules「模块复用优先级规则」），不默认 Alert |
| 添加 PRD 未写的 label / 副文案 | PRD 没有的内容一律不加（含「质检部位」这类字段标签） |
| 状态栏用占位文字、返回用字符 | 状态栏用系统图标（时间/信号/WiFi/电池）、返回用图标 |

> 字体回退在 H5 已由基座 font-stack 自动处理（`'PingFang SC','Noto Sans SC',sans-serif`），无需手动步骤。

---

# 三、Figma 执行分支（方式二写入，保留映射）

前置：已有通过自查的 H5；已读 `references/v9-figma-map.md`。
核心原则：**必须优先使用组件库实例，禁止手动拼装已有库组件。**

## 写入步骤概览

1. 解析 H5：识别用到的 v9 组件及属性。
2. 查 `v9-figma-map.md`：找到每个组件的导入 Key 与变体属性。
3. 导入实例（`importComponentByKeyAsync` / `importComponentSetByKeyAsync`），禁止手动 Frame 拼装。
4. 设属性：先改 VARIANT/BOOLEAN，再 replaceFonts，再改 characters（顺序不可乱）。
5. 套页面规范（margin/卡片/间距/surface/行高，全文见 custom-rules.md）。
6. 自查：所有文字节点 `Math.round(node.x)===0`；无占位文残留；App bar 不与 Status 重复。

## 标准流程

### Step 1：检查目标文件
```js
const pages = figma.root.children.map(p => `${p.name} id=${p.id}`);
return pages;
```

### Step 2：搜索并导入组件库（强制，不可跳过）
先查 `components.md` 的 Component Key 索引，缺失再用 `search_design_system`：
```
search_design_system(query: "组件名", fileKey: "目标文件Key",
  includeLibraryKeys: ["lk-2da8834b5155e15c43aaff36eb3d6dfd723be0037508c3655ce7ee6ff6915f7514fbedede0db3112d0b39eec678b7cb800311cfbc5084939677f5fa9b42fff39"])
```
**一次性导入所有需要的组件，不要边写边导入。**

### Step 3：导入组件
```js
const compSet = await figma.importComponentSetByKeyAsync("component_key");
const variant = compSet.children.find(c => c.name.includes("Flat"));
const instance = variant.createInstance();
```

### Step 4：创建页面框架
```js
const phone = figma.createFrame();
phone.resize(375, 812);
phone.fills = [{ type:'SOLID', color:{ r:240/255, g:241/255, b:245/255 } }]; // #F0F1F5
phone.layoutMode = 'VERTICAL'; phone.clipsContent = true;
```
所有 Frame 用 `createAutoFrame()` 封装创建，禁止裸 `figma.createFrame()`：
```js
function createAutoFrame(name, layoutMode='VERTICAL'){
  const f = figma.createFrame(); f.name=name; f.layoutMode=layoutMode;
  f.primaryAxisSizingMode='AUTO'; f.counterAxisSizingMode='FIXED'; f.fills=[]; return f;
}
```

### Step 5：放置库组件实例（App bars 内已含 Status，勿再单独放 Status）

### Step 6：定制实例内容
```js
const titleNode = instance.findOne(n => n.type==='TEXT' && n.name==='header');
try { await figma.loadFontAsync(titleNode.fontName); }
catch(e){ await figma.loadFontAsync({family:"Noto Sans SC",style:"Bold"});
          titleNode.fontName={family:"Noto Sans SC",style:"Bold"}; }
titleNode.characters = "新标题";
```

### Step 7：手动构建仅限库中不存在的部分（最后手段）
### Step 8：截图验证 + 数据层 x/y 自查（`Math.round(node.x)===0` 才是可靠验证）

## 字体回退策略（Figma 侧）

| 规范字体 | 回退字体 |
|---------|---------|
| PingFang SC Semibold | Noto Sans SC Bold |
| PingFang SC Regular | Noto Sans SC Regular |
| Barlow Semi Condensed | Barlow Semi Condensed（通常可用） |

先 `loadFontAsync({family:"PingFang SC"...})`，失败转 Noto Sans SC；对实例 TEXT 先设 `fontName` 再改 `characters`。

## 常见错误清单（Figma 执行专属）

| 错误做法 | 正确做法 |
|---------|---------|
| 手动用 Frame 拼装 App bars / Button / Status | 导入库组件实例 |
| App bars 之外再单独放 Status | App bars 内已内嵌 Status，只放一个 |
| 矩形做底部分割线 | App bars Flat 变体自带 inner shadow |
| 组件 Key 失效/报错就改手动拼装 | 继续排查：Key 是否过期、属性值大小写、可选值枚举 |
| `visible=false` 认为不占布局 | AutoLayout 中仍占位，检查 `layoutPositioning` |
| 展开/收起用 `Actiontype=Link` | 必须用 `Actiontype=Expand`（ExpandStated=Expand 展开/Collapsed 收起） |
| 需图片时 CardContent 沿用默认 Editorial | 显式设 `ContentLayout=Media, Media size=Large` |
| 切换实例变体后不 `resetOverrides()` 直接填文案 | 先 `resetOverrides()` 再 `setProperties` 再填文案 |
| 假设 setProperties 写入即生效 | 回读 `instance.componentProperties['xxx'].value` 验证 |
| CellCard 内部节点被破坏后 `resize()` 修复 | 重新 `createInstance()` 整体替换；只碰 TEXT 节点 |
| 仅凭截图判断对齐 | 数据层 `Math.round(node.x)===0` 才可靠，截图作辅助 |

## setProperties 操作规范

```js
// ❌ TEXT key 易因字体不可用报错
instance.setProperties({ 'TitleText#1137:0': '文案' });
// ✅ 找 TEXT 节点直接赋值（先 loadFont）
const t = instance.findOne(n => n.type==='TEXT' && n.name==='header');
try { await figma.loadFontAsync(t.fontName); } catch(e){}
t.fontName={family:"Noto Sans SC",style:"Bold"}; t.characters='文案';

// 切换变体前必须 resetOverrides
header.resetOverrides();
header.setProperties({ 'ShowTag':'true','Actiontype':'Expand','ExpandStated':'Expand' });

// 写入后回读验证
const v = header.componentProperties['ShowSubtitle#578:18']?.value;
if (v !== true) { /* 检查变体组合是否合法 */ }
```

## 修复后全量排查

修复任一类问题后，必须在**所有页面/画板**扫描同类问题，重点关注不同批次/单独创建的元素。
```js
for (const pgId of allPages){
  const page = figma.getNodeById(pgId);
  const container = page.findOne(n => n.name==='Content' || n.name==='ScrollArea');
  for (const card of container.children){
    const title = card.findOne(n => n.type==='TEXT' && n.name==='header');
    if (title && Math.round(title.x)!==0) problems.push(`${page.name}: 标题 x=${Math.round(title.x)}`);
  }
}
```

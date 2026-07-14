# v9 ↔ Figma 映射清单（方式二专用）

> **用途**：PRD→H5→Figma 流程中，「方式二（AI 写入 Figma 并保留组件映射）」的核心桥接表。
> AI 读取一个 H5 组件（标签/class + 属性），按此表导入**对应 Figma 组件实例**并设置**对应变体/文本**，
> 而不是手动用 Frame 拼装。这样 Figma 端仍是真实组件实例，改源组件全局生效。
>
> **数据来源**：组件 Key 来自 9.0 规范 `components.md`（fileKey `sxQXbLdcTfITwow8YCnmOJ`）。
> H5 属性命名已在 `v9-core.css` 与各壳子中对齐 Figma 变体，故下表多为「同名直映」。

---

## 一、映射总表

| H5 组件 | H5 属性 | → Figma 组件 | 导入 Key | Figma 变体属性 | 文本节点 key |
|---------|---------|--------------|----------|----------------|--------------|
| `v9-button` (full) | `mode` `status` | Button Full-width | `6b621371f3ea976291c78391956fb07e6262aefa` (set) | `Property 1`=Primary/Subtle；`Property 2`=Default/Visited/Disabled | `text#1094:3` |
| `v9-button` (large/medium/small) | `mode` `status` `size` | Button | `dca4a53b0ef6207ca79fe5c0cd26ccb1aace01e2` (set) | `mode`=Primary/Subtle；`statue`=Default/Vistited/Disabled；`size`=Large/Medium/Small | `Button Text` |
| `v9-tag` | `variant` `status` `size` | tag | `63e678589ef578e75704394c356d7096512db8d4` (set) | `Variant`=outline/light/solid；`Status`=Default/success/error/tertiary；`size`=Default/S | （characters 直填） |
| `v9-alert` | `variant` `mode` `size` | Alert | `90d822a0c181cdf093a6227335d60940fa357611` (set) | `variant`=info/warning；`mode`=standard/contained；`size`=Default/small | （characters 直填） |
| `v9-cell-card` | `title` `subtitle` `action` | CellCard | `14733bed207368ed2ae307898d537d8d362fea2c` (component) | 通过内部 Cardheader/CardContent 设属性 | 见下「CellCard 内部」 |
| `v9-appbar` | `type` | App bars | `c921a6bd03d8d9d7a7193b4dccd244a20a3d84e3` (set) | `类型`=Flat/Text/None/Icon/Flat white/Text white/None white | （characters 直填标题）|
| `v9-statusbar` | `theme` | Status | `e2cfd75d6a1ee02b1d673bd7c0020385eba7f49c` (set) | `类型`=白/黑 | — |
| `v9-cardheader` | `actiontype` `showSubtitle` `showTag` | Cardheader | 按变体导入（见下「Cardheader 变体 Key」） | `Actiontype`/`ExpandStated`/`ShowTag` | `header Text#1114:0`；`SubtitleText#1114:155` |
| `v9-cardcontent` | `contentLayout` `surface` `mediaSize` | CardContent | `1eb784508622d5d8589b16ecb3b647fe5f5ae5d7` (set) | `surface`=pure/subtle；`ContentLayout`=Editorial/list/Media；`Media size`=None/Large/Medium | `TitleText#1137:0`；`DescriptionText #1114:132` |
| `v9-overlay` | `state` | StatusOverlay | `c743e8946f25c9fa190f77709834381b5f60b026` (set) | `State`=Success/failed/None | — |
| `v9-textlink` | `importance` `size` | TextLink | `73bd920a650aee79c13da0f7df285c9dcefa454f` (set) | `importance`=Important/Secondary/Theme/Error；`size`=L/M/S | （characters 直填）|
| `v9-expandlink` | `importance` `size` `state` | ExpandLink | `19480cc12ab21bd6f6abd825774e461e66448981` (set) | `importance`；`size`=L/M/S；`state`=Expand/Collapse | — |
| `v9-arrow` | `color` `size` `icon` | arrow | `2d404421f74e0ccb4edb41e026db92e3587692a0` (set) | `arrowIcon`=grey/white/orange/red；`size`=L/M/S；`icon`=arrow/down/up/close button | — |
| `v9-tabs` | `amount` `active` | tabs | 按 amount+active 导入（见下「tabs 变体 Key」） | `Property 1`=line；`amount`=2/3/4；`Active`=1..n | 各 tab characters 直填 |

---

## 二、需「按变体单独导入」的组件

### Cardheader 变体 Key（set key 已失效，按目标变体导入）

| actiontype | showTag | ExpandStated | Key |
|------------|---------|--------------|-----|
| none | false | none | `078d8ad09c66c27a93f80582b9352d1016db41e3` |
| none | true | none | `2c9fa67ef9e75199d4dfe02953c9817d6e4f4ffe` |
| link | false | none | `f403ed7b48474886de9ca046708fa0bdcc6cab99` |
| link | true | none | `227417125ef5d4ad9fd6f02d69f59d61fcc725ee` |
| expand | false | Expand（折叠态/显示“展开”） | `066cece92b4e300fce83e2ac3e0a1d9159997adb` |
| expand | true | Expand | `0dbcb32095cc1c7e122dafd9ab7682702af9e1b7` |
| expand | false | Collapsed（展开态/显示“收起”） | `bcb22d11e8f98996ce95fec8c8a3254539e7b6b1` |
| expand | true | Collapsed | `facaabe44a44b787637532e9da7a61536e162380` |

### tabs 变体 Key（按 amount + active）

| amount | active | Key |
|--------|--------|-----|
| 2 | 1 | `0eb03b529dcdf91ae914cd39b0432bce2a714383` |
| 2 | 2 | `fb5165fa6d71b16b140d6218f6f93da964a8f0c3` |
| 3 | 1 | `52a34936e697837a9317b62f3606926f8e6587ca` |
| 3 | 2 | `6c66c98e4776b47931badcb160f14b8ed9106987` |
| 3 | 3 | `0794972f8000cd0cc37635e037df1d77dbc8053a` |
| 4 | 1 | `add69127a2449e2cfe8068705807a5ba0647b899` |
| 4 | 2 | `04c0c0de352e58200509066901466fff33c3f9fd` |
| 4 | 3 | `ff4d912d9c949646aa4e186ab27821ab0d64c099` |
| 4 | 4 | `08ad9e592afac4d2418675a4ed85667b47847ae1` |

---

## 三、CellCard 内部映射

`v9-cell-card` 在 Figma 对应 **CellCard** 组件（Key `14733bed…`），内部含 Cardheader + CardContent + Button Full-width。
H5 属性按下表落到内部节点（**不要拆开重拼，直接 setProperties**）：

| H5 写法 | Figma 操作 |
|---------|-----------|
| `title="…"` | Cardheader `header Text#1114:0` |
| `subtitle="…"`（有则 ShowSubtitle=true） | Cardheader `SubtitleText#1114:155` + `ShowSubtitle#578:18`=true |
| `action="…"`（有则 Actiontype=Link） | Cardheader `Actiontype`=Link，ActionText 文案=该值 |
| 插槽内 `.v9-list-row` 多行 | CardContent `ContentLayout`=list |
| 插槽内单标题+描述 | CardContent `ContentLayout`=Editorial |
| 插槽内 `.v9-card__subtle` | CardContent `surface`=subtle |
| 无底部按钮 | 隐藏内部 Button Full-width（visible=false）|

---

## 四、写入时的规范红线（务必遵守，摘自 9.0 custom-rules）

1. **禁止手动拼装已有库组件** —— 表中有 Key 的一律 `importComponentByKeyAsync` / `importComponentSetByKeyAsync` 导入实例。
2. **CellCard 只 resize 外层宽度 351**，内部节点 H=FILL 自动跟随，禁止 resize 内部。
3. **Cardheader 必须用目标变体直接创建**，禁止先建 None 再 setProperties 切 Actiontype（高度会塌成 19px）。
4. **App bars 内已含 Status**，放了 App bar 就不要再单独放 Status。
5. **surface 取值规则**：Header 有副标题且非 Media Large → subtle；否则 pure。不得默认 pure。
6. **PRD 没写的不加**：H5 里没有的内容，Figma 端也不补；占位文案放置后立即填或隐藏。
7. **字体兜底**：PingFang SC 不可用时先对实例内 TEXT 替换为 Noto Sans SC，再改 characters。

---

## 五、维护约定

- 本表是 H5 与 Figma 的**唯一映射真相**。新增组件时：先在 `v9-core.css` 加样式 + 在壳子加属性 → 再在此表补一行 Key/变体/文本 key。
- 若 Figma 源组件 Key 变更，**只改本表**，三种壳子与生成逻辑都不用动。
- 属性命名永远与 Figma 变体保持同名/可直映，避免引入翻译层。

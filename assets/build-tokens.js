#!/usr/bin/env node
/* =========================================================
   build-tokens.js — 9.0 token 构建脚本
   读 tokens.json（唯一数值源）→ 生成:
     1) v9-tokens.css      —— H5 用的 :root CSS 变量（v9-core.css 引用它）
     2) tokens-tables.md   —— 回填 colors/spacing/shadows/typography 文档的表格
   用法: node build-tokens.js
   改值流程: 只改 tokens.json → 跑本脚本 → css 与文档表格自动更新（改一处，全同步）
   ========================================================= */
const fs = require('fs');
const path = require('path');

const ROOT = __dirname;
const tokens = JSON.parse(fs.readFileSync(path.join(ROOT, 'tokens.json'), 'utf8'));

const GROUP_ORDER = ['color', 'radius', 'space', 'shadow', 'font', 'fontSize'];

/* ---------- 1) 生成 v9-tokens.css ---------- */
function buildCss() {
  let out = '';
  out += '/* 自动生成，请勿手改。改值改 tokens.json 后跑 `node build-tokens.js`。 */\n';
  out += '/* 9.0 token 单一数值源 → CSS 变量。' + tokens._meta.lineHeightRule + ' */\n';
  out += ':root{\n';
  for (const g of GROUP_ORDER) {
    const group = tokens[g];
    if (!group) continue;
    out += `  /* ${group.section} */\n`;
    for (const [name, t] of Object.entries(group.tokens)) {
      out += `  ${name}: ${t.value};\n`;
    }
  }
  out += '}\n';
  fs.writeFileSync(path.join(ROOT, 'v9-tokens.css'), out);
  return Object.values(tokens).reduce((n, g) => n + (g.tokens ? Object.keys(g.tokens).length : 0), 0);
}

/* ---------- 2) 生成文档表格 tokens-tables.md ---------- */
function buildTables() {
  let out = '# Token 速查表（自动生成，勿手改）\n\n';
  out += `> 源: tokens.json。改值改源后跑 \`node build-tokens.js\`，再把对应表格粘回 colors.md / spacing.md / shadows.md / typography.md。\n\n`;
  for (const g of GROUP_ORDER) {
    const group = tokens[g];
    if (!group) continue;
    out += `## ${group.section}\n\n`;
    out += `| CSS 变量 | 值 | 说明 | Figma |\n|---|---|---|---|\n`;
    for (const [name, t] of Object.entries(group.tokens)) {
      out += `| \`${name}\` | \`${t.value}\` | ${t.desc || ''} | ${t.figma || '—'} |\n`;
    }
    out += '\n';
  }
  fs.writeFileSync(path.join(ROOT, 'tokens-tables.md'), out);
}

const count = buildCss();
buildTables();
console.log(`✓ 生成 v9-tokens.css（${count} 个变量）与 tokens-tables.md`);

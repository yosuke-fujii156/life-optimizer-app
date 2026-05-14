"use client";
// @ts-nocheck

import React, { useEffect, useMemo, useState } from "react";

const defaultEvents = [
  { id: 1, time: "06:00-06:30", title: "蟷ｳ譌･・夊ｵｷ蠎翫・譛昴・貅門ｙ・亥悄譌･莉･螟厄ｼ・, type: "life", value: 7 },
  { id: 2, time: "07:30-07:45", title: "騾壼共・壼・逋ｺ竊定・蝣ｴ蛻ｰ逹", type: "move", value: 5 },
  { id: 3, time: "08:00-15:00", title: "蟆丞ｭｦ譬｡謾ｯ謠ｴ蜩｡縺ｮ莉穂ｺ・, type: "work", value: 9 },
  { id: 4, time: "16:00-16:20", title: "謾ｯ謠ｴ繝｡繝｢遒ｺ隱・, type: "support", value: 9 },
  { id: 5, time: "19:30-20:20", title: "蜍慕判繝ｻSNS", type: "waste", value: 1 },
  { id: 6, time: "20:30-21:00", title: "驥題檮繝九Η繝ｼ繧ｹ遒ｺ隱・, type: "finance", value: 8 },
  { id: 7, time: "22:30-23:20", title: "縺ｪ繧薙→縺ｪ縺上せ繝槭・", type: "waste", value: 1 },
];

const sampleGymText = `譛・18:30 繝ｨ繧ｬ
轣ｫ 19:00 遲九ヨ繝ｬ
豌ｴ 18:00 繧ｹ繝医Ξ繝・メ
譛ｨ 19:30 繝斐Λ繝・ぅ繧ｹ
驥・18:45 譛蛾・邏
蝨・10:00 繝ｨ繧ｬ
譌･ 莨鷹､ｨ`;

const musicPreferences = ["ONE OK ROCK", "BE:FIRST", "HANA"];

const tabs = [
  { id: "home", label: "繝帙・繝", icon: "匠" },
  { id: "support", label: "謾ｯ謠ｴ蜩｡", icon: "ｧｩ" },
  { id: "schedule", label: "莠亥ｮ・, icon: "套" },
  { id: "food", label: "鬟滉ｺ・, icon: "些" },
  { id: "settings", label: "險ｭ螳・, icon: "笞呻ｸ・ },
];

const appLaunchSteps = [
  { id: "pwa", title: "竭 繧ｹ繝槭・繧｢繝励Μ蛹・, body: "Next.js繧単WA蟇ｾ蠢懊＠縲（Phone/Android縺ｮ繝帙・繝逕ｻ髱｢縺ｫ霑ｽ蜉縺ｧ縺阪ｋ蠖｢縺ｫ縺励∪縺吶・ },
  { id: "calendar", title: "竭｡ Google繧ｫ繝ｬ繝ｳ繝繝ｼ騾｣謳ｺ", body: "襍ｷ蠎翫・騾壼共繝ｻ莉穂ｺ九・繧ｸ繝繝ｻ螟暮｣滓署譯医ｒGoogle繧ｫ繝ｬ繝ｳ繝繝ｼ縺ｫ逋ｻ骭ｲ縺励∪縺吶・ },
  { id: "login", title: "竭｢ 繝ｭ繧ｰ繧､繝ｳ縺ｨ菫晏ｭ・, body: "Google繝ｭ繧ｰ繧､繝ｳ繧貞・繧後∽ｺ亥ｮ壹・鬟滉ｺ九・繧ｫ繝ｭ繝ｪ繝ｼ繝ｻ繝√Ε繝・ヨ螻･豁ｴ繧剃ｿ晏ｭ倥＠縺ｾ縺吶・ },
  { id: "notify", title: "竭｣ 騾夂衍", body: "15譎ゅ・螟暮｣滓署譯医・6譎ゅ・謾ｯ謠ｴ繝｡繝｢縲√Λ繧､繝匁ュ蝣ｱ縲・≡陞阪ヨ繝斐ャ繧ｯ繧帝夂衍縺励∪縺吶・ },
  { id: "ai", title: "竭､ AI莨夊ｩｱ", body: "謾ｯ謠ｴ蜩｡繝√Ε繝・ヨ縲∫函豢ｻ謾ｹ蝟・メ繝｣繝・ヨ縲∵偵ｊ繝｢繝ｼ繝峨∫鍵遶狗嶌隲・ｒAI縺ｧ霑皮ｭ斐＠縺ｾ縺吶・ },
];

const supportWorkQuickActions = [
  { id: "morning", label: "譛昴・遒ｺ隱・, text: "莉頑律縺ｮ謾ｯ謠ｴ蜩｡縺ｮ譛昴・遒ｺ隱阪ｒ謨吶∴縺ｦ" },
  { id: "autism", label: "閾ｪ髢臥裸蟇ｾ蠢・, text: "閾ｪ髢臥裸縺ｮ蟆丞ｭｦ2蟷ｴ逕溘∈縺ｮ螢ｰ縺九￠繧呈蕗縺医※" },
  { id: "ld", label: "蟄ｦ鄙帝囿螳ｳ蟇ｾ蠢・, text: "蟄ｦ鄙帝囿螳ｳ縺ｮ蟆丞ｭｦ2蟷ｴ逕溘∈縺ｮ蟄ｦ鄙呈髪謠ｴ繧呈蕗縺医※" },
  { id: "trouble", label: "蝗ｰ縺｣縺滓凾", text: "謾ｯ謠ｴ荳ｭ縺ｫ蝗ｰ縺｣縺滓凾縺ｮ蟇ｾ蠢懊ｒ謨吶∴縺ｦ" },
  { id: "teacher", label: "諡・ｻｻ蜈ｱ譛・, text: "諡・ｻｻ縺ｮ蜈育函縺ｫ蜈ｱ譛峨☆繧九Γ繝｢繧剃ｽ懊▲縺ｦ" },
];

const conversationQuickActions = [
  { id: "dinner", label: "譎ｩ縺秘｣ｯ", text: "莉頑律縺ｮ譎ｩ縺秘｣ｯ繧剃ｸ豎∽ｸ芽除縺ｧ謠先｡医＠縺ｦ" },
  { id: "calorie", label: "繧ｫ繝ｭ繝ｪ繝ｼ", text: "鬟溷刀縺ｮ繧ｫ繝ｭ繝ｪ繝ｼ縺ｨ驕句虚豸郁ｲｻ繧ｫ繝ｭ繝ｪ繝ｼ繧定ｦ九◆縺・ },
  { id: "snack", label: "縺翫ｄ縺､豁｢繧√ｋ", text: "縺翫ｄ縺､繧帝｣溘∋縺ｪ縺・署譯医≠繧・ },
  { id: "strict", label: "諤偵▲縺ｦ", text: "繧ゅ▲縺ｨ諤偵▲縺ｦ縺ｻ縺励＞" },
  { id: "finance", label: "驥題檮", text: "豌怜・霆｢謠帙↓驥題檮縺ｮ縺昴・譌･縺ｮ繝医ヴ繝・け" },
  { id: "gym", label: "繧ｸ繝", text: "繧ｸ繝縺ｮ莠亥ｮ壹ｒ蜈･繧後◆縺・ },
  { id: "entertainment", label: "繝ｩ繧､繝・, text: "繝ｩ繧､繝匁ュ蝣ｱ縺ｨ蜃ｺ貍皮分邨・ｒ騾夂衍縺励※" },
  { id: "support", label: "謾ｯ謠ｴ", text: "閾ｪ髢臥裸縺ｨ蟄ｦ鄙帝囿螳ｳ縺ｮ蟆丞ｭｦ2蟷ｴ逕溘∈縺ｮ蟇ｾ蠢・ },
];

const dinnerMenuPatterns = [
  {
    id: "dinner-a",
    title: "蜥碁｢ｨ縺輔▲縺ｱ繧雁ｮ夐｣・,
    soup: "雎・・繝ｻ繧上°繧√・縺ｭ縺弱・縺ｿ縺晄ｱ・,
    main: "魄ｭ縺ｮ蝪ｩ辟ｼ縺・螟ｧ譬ｹ縺翫ｍ縺玲ｷｻ縺・,
    side1: "蟆乗收闖懊→縺ｫ繧薙§繧薙・縺翫・縺溘＠",
    side2: "縺阪ｅ縺・ｊ繝ｻ繝医・繝医・縺励ｉ縺吶・驟｢縺ｮ迚ｩ",
    side3: "縺九⊂縺｡繧・・辣ｮ迚ｩ",
    shoppingList: ["魄ｭ 2蛻・ｌ", "雎・・", "繧上°繧・, "縺ｭ縺・, "螟ｧ譬ｹ", "蟆乗收闖・, "縺ｫ繧薙§繧・, "縺阪ｅ縺・ｊ", "繝医・繝・, "縺励ｉ縺・, "縺九⊂縺｡繧・],
    recipe: ["魄ｭ縺ｫ蝪ｩ繧偵・繧・0蛻・ｽｮ縺上・, "縺ｿ縺晄ｱ√ｒ菴懊ｋ縲・, "蟆乗收闖懊→縺ｫ繧薙§繧薙ｒ繧・〒縺ｦ蜥後∴繧九・, "驟｢縺ｮ迚ｩ繧剃ｽ懊ｋ縲・, "魄ｭ繧堤┥縺阪√°縺ｼ縺｡繧・ｒ辣ｮ繧九・],
  },
  {
    id: "dinner-b",
    title: "驥手除縺溘▲縺ｷ繧企ｶ上・縺ｭ螳夐｣・,
    soup: "繧ｭ繝｣繝吶ヤ繝ｻ邇峨・縺弱・縺阪・縺薙・繧ｹ繝ｼ繝・,
    main: "鮓上・縺ｭ閧峨・辣ｧ繧顔┥縺・繝ｬ繧ｿ繧ｹ豺ｻ縺・,
    side1: "繝悶Ο繝・さ繝ｪ繝ｼ縺ｨ蜊ｵ縺ｮ繧ｵ繝ｩ繝",
    side2: "縺ｪ縺吶→繝斐・繝槭Φ縺ｮ辟ｼ縺阪・縺溘＠",
    side3: "繧後ｓ縺薙ｓ縺ｨ縺ｫ繧薙§繧薙・縺阪ｓ縺ｴ繧・,
    shoppingList: ["鮓上・縺ｭ閧・, "繧ｭ繝｣繝吶ヤ", "邇峨・縺・, "縺励ａ縺・, "繝ｬ繧ｿ繧ｹ", "繝悶Ο繝・さ繝ｪ繝ｼ", "蜊ｵ", "縺ｪ縺・, "繝斐・繝槭Φ", "繧後ｓ縺薙ｓ", "縺ｫ繧薙§繧・],
    recipe: ["鮓上・縺ｭ閧峨ｒ縺昴℃蛻・ｊ縺ｫ縺吶ｋ縲・, "驥手除繧ｹ繝ｼ繝励ｒ菴懊ｋ縲・, "繝悶Ο繝・さ繝ｪ繝ｼ縺ｨ蜊ｵ繧偵ｆ縺ｧ繧九・, "縺ｪ縺吶→繝斐・繝槭Φ繧堤┥縺上・, "鮓剰ｉ繧堤・繧顔┥縺阪↓縺励※逶帙ｊ縺､縺代ｋ縲・],
  },
  {
    id: "dinner-c",
    title: "鬲壹→譬ｹ闖懊・蛛･蠎ｷ螳夐｣・,
    soup: "蜈ｷ縺縺上＆繧楢ｱ壽ｱ・｢ｨ縺ｿ縺晄ｱ・,
    main: "縺輔・縺ｮ縺ｿ縺晉・",
    side1: "繧後ｓ縺薙ｓ縺ｨ縺斐⊂縺・・縺阪ｓ縺ｴ繧・,
    side2: "縺ｻ縺・ｌ繧楢拷縺ｨ縺医・縺阪・縺斐∪蜥後∴",
    side3: "蜀ｷ繧・ｄ縺｣縺・繧ｪ繧ｯ繝ｩ縺ｮ縺・,
    shoppingList: ["縺輔・", "螟ｧ譬ｹ", "縺ｫ繧薙§繧・, "縺斐⊂縺・, "繧後ｓ縺薙ｓ", "縺ｻ縺・ｌ繧楢拷", "縺医・縺・, "雎・・", "繧ｪ繧ｯ繝ｩ", "雎壹％縺ｾ閧・],
    recipe: ["譬ｹ闖懊ｒ蛻・ｋ縲・, "雎壽ｱ・｢ｨ縺ｿ縺晄ｱ√ｒ菴懊ｋ縲・, "縺輔・繧偵∩縺晉・縺ｫ縺吶ｋ縲・, "縺阪ｓ縺ｴ繧峨ｒ菴懊ｋ縲・, "縺斐∪蜥後∴縺ｨ蜀ｷ繧・ｄ縺｣縺薙ｒ逕ｨ諢上☆繧九・],
  },
];

const foodCalorieItems = [
  { id: "rice", name: "縺斐・繧・闌ｶ遒・譚ｯ", kcal: 250, note: "譎ｮ騾夂屁繧顔ｴ・50g" },
  { id: "salmon", name: "魄ｭ縺ｮ蝪ｩ辟ｼ縺・1蛻・ｌ", kcal: 180, note: "荳ｻ闖懊→縺励※菴ｿ縺・ｄ縺吶＞" },
  { id: "miso", name: "縺ｿ縺晄ｱ・1譚ｯ", kcal: 60, note: "蜈ｷ縺縺上＆繧薙′縺翫☆縺吶ａ" },
  { id: "snack", name: "闖灘ｭ舌ヱ繝ｳ 1蛟・, kcal: 350, note: "髢馴｣溘〒縺ｯ驥阪＞" },
  { id: "chocolate", name: "繝√Ι繧ｳ 5邊・, kcal: 140, note: "蟆鷹㍼縺ｧ繧らｩ阪∩驥阪↑繧・ },
];

const exerciseCalorieItems = [
  { id: "walk20", name: "譌ｩ豁ｩ縺・20蛻・, kcal: 80, note: "莉穂ｺ句ｾ後・蛻・ｊ譖ｿ縺・ },
  { id: "walk40", name: "譌ｩ豁ｩ縺・40蛻・, kcal: 160, note: "髢馴｣溷ｯｾ遲悶↓濶ｯ縺・ },
  { id: "gym60", name: "繧ｸ繝 60蛻・, kcal: 250, note: "遲九ヨ繝ｬ・区怏驟ｸ邏" },
  { id: "stairs10", name: "髫取ｮｵ 10蛻・, kcal: 70, note: "遏ｭ譎る俣縺ｧ蠑ｷ蠎ｦ鬮倥ａ" },
  { id: "stretch15", name: "繧ｹ繝医Ξ繝・メ 15蛻・, kcal: 35, note: "螟懊せ繝槭・蟇ｾ遲・ },
];

const snackAvoidancePlans = [
  { id: "tea", title: "貂ｩ縺九＞縺願幻縺ｫ鄂ｮ縺肴鋤縺・, time: "15:30-15:40", action: "逕倥＞縺翫ｄ縺､縺ｮ蜑阪↓貂ｩ縺九＞縺願幻繧帝｣ｲ繧薙〒10蛻・ｾ・▽縲・ },
  { id: "protein", title: "縺溘ｓ縺ｱ縺剰ｳｪ繧貞・縺ｫ蜿悶ｋ", time: "16:30-16:40", action: "遨ｺ閻ｹ縺ｪ繧峨ｆ縺ｧ蜊ｵ繝ｻ辟｡邉悶Κ繝ｼ繧ｰ繝ｫ繝医・繝翫ャ繝・ｰ鷹㍼縺ｫ縺吶ｋ縲・ },
  { id: "walk", title: "5蛻・□縺第ｭｩ縺・, time: "21:00-21:05", action: "螟懊・縺翫ｄ縺､谺ｲ縺ｯ5蛻・ｭｩ縺上°繧ｹ繝医Ξ繝・メ縺ｧ蛻・ｊ譖ｿ縺医ｋ縲・ },
];

const dailyFinanceTopics = [
  { id: "nisa", title: "莉頑律縺ｮ驥題檮繝医ヴ繝・け・哢ISA", body: "髟ｷ譛溘・蛻・淵繝ｻ遨咲ｫ九・閠・∴譁ｹ繧貞ｮ医ｋ縺薙→縺悟､ｧ莠九〒縺吶・, action: "莉頑律縺ｮ荳險繝｡繝｢・壽兜雉・岼逧・ｒ1縺､譖ｸ縺上・ },
  { id: "inflation", title: "莉頑律縺ｮ驥題檮繝医ヴ繝・け・夂黄萓｡", body: "迚ｩ萓｡縺御ｸ翫′繧九→蜷後§驥鷹｡阪〒雋ｷ縺医ｋ繧ゅ・縺悟ｰ代↑縺上↑繧翫∪縺吶・, action: "莉頑律縺ｮ荳險繝｡繝｢・壼､荳翫′繧翫＠縺溷崋螳夊ｲｻ繧・縺､遒ｺ隱阪・ },
  { id: "risk", title: "莉頑律縺ｮ驥題檮繝医ヴ繝・け・壹Μ繧ｹ繧ｯ", body: "蛟､蜍輔″縺ｧ荳榊ｮ峨↓縺ｪ繧九％縺ｨ繧よ兜雉・Μ繧ｹ繧ｯ縺ｧ縺吶・, action: "莉頑律縺ｮ荳險繝｡繝｢・壻ｸ九′縺｣縺ｦ繧よ・縺ｦ縺ｪ縺・≡鬘阪ｒ閠・∴繧九・ },
];

const entertainmentAlerts = [
  { id: "oneok", artist: "ONE OK ROCK", category: "繝ｩ繧､繝・, detail: "蜈ｬ蠑上し繧､繝医・繝√こ繝・ヨ諠・ｱ繝ｻ繝ｩ繧､繝門相遏･繧偵メ繧ｧ繝・け縲・ },
  { id: "befirst", artist: "BE:FIRST", category: "蜃ｺ貍皮分邨・, detail: "髻ｳ讌ｽ逡ｪ邨・・驟堺ｿ｡繝ｻ繝ｩ繧ｸ繧ｪ蜃ｺ貍斐ｒ繝√ぉ繝・け縲・ },
  { id: "hana", artist: "HANA", category: "繝ｩ繧､繝悶・蜃ｺ貍皮分邨・, detail: "繝ｩ繧､繝悶・繧､繝吶Φ繝医・繝・Ξ繝・驟堺ｿ｡蜃ｺ貍斐ｒ繝√ぉ繝・け縲・ },
];

const strictAdviceList = [
  { id: "snack", target: "髢馴｣・, message: "縺・＞蜉貂帙↓縺励ｈ縺・ゆｺ亥ｮ壹↓縺ｪ縺・♀繧・▽縺ｯ鬟溘∋縺ｪ縺・ゅ∪縺壽ｰｴ縺九♀闌ｶ縲・0蛻・ｾ・▽縲・ },
  { id: "phone", target: "螟懊せ繝槭・", message: "逶ｮ逧・・縺ｪ縺・､懊せ繝槭・縺ｯ莨第・縺ｧ縺ｯ縺ゅｊ縺ｾ縺帙ｓ縲・2譎ゅｒ驕弱℃縺溘ｉ豁ｯ縺ｿ縺後″縲∵・譌･縺ｮ貅門ｙ縲∝ｸ・屮縺ｧ縺吶・ },
  { id: "exercise", target: "驕句虚", message: "蠢吶＠縺・°繧蛾°蜍輔〒縺阪↑縺・√〒縺ｯ縺ゅｊ縺ｾ縺帙ｓ縲ゅ∪縺・蛻・ｭｩ縺上ゅぞ繝ｭ縺ｮ譌･繧剃ｽ懊ｉ縺ｪ縺・・ },
];

const typeLabel = { life: "逕滓ｴｻ", move: "遘ｻ蜍・, work: "莉穂ｺ・, support: "謾ｯ謠ｴ", waste: "隕狗峩縺・, finance: "驥題檮", gym: "繧ｸ繝", dinner: "螟暮｣・, snack: "髢馴｣・, calorie: "繧ｫ繝ｭ繝ｪ繝ｼ", financeTopic: "驥題檮繝医ヴ繝・け", entertainment: "騾夂衍", music: "髻ｳ讌ｽ" };

const storageKeys = {
  events: "lifeOptimizer.events.v1",
  messages: "lifeOptimizer.messages.v1",
  supportMessages: "lifeOptimizer.supportMessages.v1",
  selectedDinnerId: "lifeOptimizer.selectedDinnerId.v1",
  selectedFoodIds: "lifeOptimizer.selectedFoodIds.v1",
  selectedExerciseIds: "lifeOptimizer.selectedExerciseIds.v1",
  selectedAlertIds: "lifeOptimizer.selectedAlertIds.v1",
};

const pwaInstallSteps = [
  { id: "manifest", title: "manifest.json", body: "繧｢繝励Μ蜷阪√い繧､繧ｳ繝ｳ縲√ユ繝ｼ繝槭き繝ｩ繝ｼ縲∬ｵｷ蜍俵RL繧定ｨｭ螳壹＠縺ｾ縺吶・ },
  { id: "icons", title: "繧｢繧､繧ｳ繝ｳ", body: "192px縺ｨ512px縺ｮ繧｢繧､繧ｳ繝ｳ繧堤畑諢上＠縲√・繝ｼ繝逕ｻ髱｢霑ｽ蜉譎ゅ↓陦ｨ遉ｺ縺励∪縺吶・ },
  { id: "viewport", title: "繧ｹ繝槭・譛驕ｩ蛹・, body: "荳九ち繝悶∽ｽ咏區縲∝・蜉帶ｬ・∝・逵溘い繝・・繝ｭ繝ｼ繝峨ｒ繧ｹ繝槭・謫堺ｽ懷髄縺代↓縺励∪縺吶・ },
  { id: "storage", title: "繧ｹ繝槭・蜀・ｿ晏ｭ・, body: "縺ｾ縺嗟ocalStorage縺ｧ莠亥ｮ壹・繝√Ε繝・ヨ繝ｻ鬟滉ｺ矩∈謚槭ｒ菫晏ｭ倥＠縺ｾ縺吶よｬ｡縺ｫ繧ｯ繝ｩ繧ｦ繝我ｿ晏ｭ倥∈騾ｲ繧√∪縺吶・ },
];

function loadFromStorage<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch (error) {
    return fallback;
  }
}

function saveToStorage<T>(key: string, value: T): boolean {
  if (typeof window === "undefined") return false;
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch (error) {
    return false;
  }
}

function clearAppStorage() {
  if (typeof window === "undefined") return;
  Object.values(storageKeys).forEach((key) => window.localStorage.removeItem(key));
}
const typeEmoji = { life: "匠", move: "囓", work: "将", support: "ｧｩ", waste: "笞・・, finance: "鳥", gym: "暑・・, dinner: "些", snack: "嵯", calorie: "櫨", financeTopic: "堂", entertainment: "謄", music: "而" };
const typeStyle = { life: { background: "#eff6ff" }, move: { background: "#fffbeb" }, work: { background: "#f1f5f9" }, support: { background: "#f5f3ff" }, waste: { background: "#fff1f2" }, finance: { background: "#ecfdf5" }, gym: { background: "#f0fdfa" }, dinner: { background: "#fff7ed" }, snack: { background: "#f7fee7" }, calorie: { background: "#fff7ed" }, financeTopic: { background: "#f0fdf4" }, entertainment: { background: "#eef2ff" }, music: { background: "#fdf2f8" } };

function parseClock(clockText: string): number | null {
  const parts = String(clockText || "").split(":").map(Number);
  if (parts.length !== 2 || parts.some(Number.isNaN)) return null;
  return parts[0] * 60 + parts[1];
}

function minutesOf(event) {
  const [start, end] = String(event.time || "").split("-");
  const s = parseClock(start);
  const e = parseClock(end);
  if (s === null || e === null) return 0;
  return Math.max(0, e - s);
}

function addMinutes(clockText, minutes) {
  const base = parseClock(clockText);
  if (base === null) return clockText;
  const total = base + minutes;
  return `${Math.floor(total / 60).toString().padStart(2, "0")}:${(total % 60).toString().padStart(2, "0")}`;
}

function parseGymScheduleText(text, keyword) {
  const keywordText = String(keyword || "").trim().toLowerCase();
  return String(text || "").split(/\n|,/).map((line, index) => {
    const trimmed = line.trim();
    const dayMatch = trimmed.match(/(譛・轣ｫ|豌ｴ|譛ｨ|驥掃蝨毫譌･)/);
    const timeMatch = trimmed.match(/(\d{1,2}:\d{2})/);
    if (!trimmed || !dayMatch || !timeMatch) return null;
    const [hour, minute] = timeMatch[1].split(":");
    const start = `${hour.padStart(2, "0")}:${minute}`;
    const title = trimmed.replace(dayMatch[0], "").replace(timeMatch[1], "").trim() || "繧ｸ繝";
    return { id: `gym-${index}-${start}`, day: dayMatch[1], time: `${start}-${addMinutes(start, 60)}`, title: `繧ｸ繝・・{title}`, raw: trimmed, type: "gym", value: 8 };
  }).filter(Boolean).filter((event) => !keywordText || event.raw.toLowerCase().includes(keywordText) || event.title.toLowerCase().includes(keywordText));
}

function getSelectedDinnerMenu(id) {
  return dinnerMenuPatterns.find((menu) => menu.id === id) || dinnerMenuPatterns[0];
}

function calculateNetCalories(foodIds, exerciseIds) {
  const foodKcal = foodCalorieItems.filter((item) => foodIds.includes(item.id)).reduce((sum, item) => sum + item.kcal, 0);
  const exerciseKcal = exerciseCalorieItems.filter((item) => exerciseIds.includes(item.id)).reduce((sum, item) => sum + item.kcal, 0);
  return { foodKcal, exerciseKcal, netKcal: foodKcal - exerciseKcal };
}

function buildSupportWorkReply(userText) {
  const text = String(userText || "");
  if (text.includes("譛・) || text.includes("遒ｺ隱・)) return "謾ｯ謠ｴ蜩｡縺ｮ譛昴・遒ｺ隱阪〒縺吶や蔵譎る俣蜑ｲ 竭｡闍ｦ謇九↑豢ｻ蜍・竭｢蠎ｧ蟶ｭ 竭｣莨第・蝣ｴ謇 竭､諡・ｻｻ縺ｨ縺ｮ蜷亥峙繧堤｢ｺ隱阪＠縺ｾ縺吶・;
  if (text.includes("閾ｪ髢・)) return "閾ｪ髢臥裸縺ｮ蜈千ｫ･縺ｫ縺ｯ縲√弱■繧・ｓ縺ｨ縺励※縲上〒縺ｯ縺ｪ縺上朱央遲・ｒ謖√▽縲上・蝠冗岼繧定ｦ九ｋ縲上・繧医≧縺ｫ谺｡縺ｮ陦悟虚繧・縺､縺縺台ｼ昴∴縺ｾ縺吶・;
  if (text.includes("蟄ｦ鄙帝囿螳ｳ") || text.includes("蟄ｦ鄙呈髪謠ｴ")) return "蟄ｦ鄙帝囿螳ｳ縺ｮ蜈千ｫ･縺ｫ縺ｯ縲・㍼繧呈ｸ帙ｉ縺励※謌仙粥繧剃ｽ懊ｊ縺ｾ縺吶ゅ主・驛ｨ縲上ｈ繧翫弱∪縺壹％縺薙□縺代上〒縺吶・;
  if (text.includes("蝗ｰ")) return "蝗ｰ縺｣縺滓凾縺ｯ縲≫蔵螳牙・遒ｺ菫・竭｡蛻ｺ豼繧呈ｸ帙ｉ縺・竭｢遏ｭ縺・｣ｰ縺九￠ 竭｣驕ｸ謚櫁い2縺､ 竭､諡・ｻｻ縺ｸ蜈ｱ譛峨√・鬆・〒縺吶・;
  if (text.includes("諡・ｻｻ") || text.includes("蜈ｱ譛・) || text.includes("繝｡繝｢")) return "諡・ｻｻ蜈ｱ譛峨Γ繝｢譯茨ｼ壽悽譌･縺ｯ縲・・・蝣ｴ髱｢縺ｧ髮・ｸｭ縺悟・繧後ｄ縺吶°縺｣縺溘〒縺吶ら洒縺・欠遉ｺ縺ｨ隕区悽謠千､ｺ縺ｧ蜿悶ｊ邨・∩繧・☆縺上↑繧翫∪縺励◆縲・;
  return "謾ｯ謠ｴ縺ｧ縺ｯ縲∫洒縺・欠遉ｺ繝ｻ隕九∴繧句喧繝ｻ蜈ｷ菴鍋噪縺ｫ縺ｻ繧√ｋ繝ｻ莨第・縺ｮ騾・￡驕薙ｒ蜈医↓豎ｺ繧√ｋ縲√′蝓ｺ譛ｬ縺ｧ縺吶・;
}

function buildReply(userText) {
  const text = String(userText || "");
  const upper = text.toUpperCase();
  if (text.includes("譎ｩ") || text.includes("螟暮｣・) || text.includes("荳豎∽ｸ芽除") || text.includes("繝ｬ繧ｷ繝・)) return "2莠ｺ逕ｨ繝ｻ驥手除螟壹ａ繝ｻ荳豎∽ｸ芽除繧・繝代ち繝ｼ繝ｳ縺九ｉ驕ｸ縺ｹ縺ｾ縺吶りｲｷ縺・ｂ縺ｮ繝ｪ繧ｹ繝医→謇矩・ｂ陦ｨ遉ｺ縺励∪縺吶・;
  if (text.includes("繧ｫ繝ｭ繝ｪ繝ｼ") || text.includes("鬟溷刀") || text.includes("豸郁ｲｻ")) return "鬟溷刀繧ｫ繝ｭ繝ｪ繝ｼ縺ｨ驕句虚豸郁ｲｻ繧ｫ繝ｭ繝ｪ繝ｼ繧帝∈縺ｶ縺ｨ縲∝ｷｮ縺怜ｼ輔″繧ｫ繝ｭ繝ｪ繝ｼ繧定｡ｨ遉ｺ縺励∪縺吶・;
  if (text.includes("縺翫ｄ縺､") || text.includes("髢馴｣・)) return "縺翫ｄ縺､蟇ｾ遲悶・縲√∪縺壹♀闌ｶ縺ｧ10蛻・ｾ・▽縲∫ｩｺ閻ｹ縺ｪ繧峨◆繧薙・縺剰ｳｪ縲∝､懊・5蛻・ｭｩ縺上√・3谿ｵ髫弱〒縺吶・;
  if (text.includes("諤・) || text.includes("蝟・) || text.includes("蜴ｳ縺励＞")) return `諤偵ｊ繝｢繝ｼ繝会ｼ・{strictAdviceList[0].message}`;
  if (text.includes("驥題檮") || text.includes("NISA")) return dailyFinanceTopics[0].title + "縲・ + dailyFinanceTopics[0].body;
  if (text.includes("繧ｸ繝") || text.includes("繝ｨ繧ｬ") || text.includes("遲九ヨ繝ｬ")) return "繧ｸ繝莠亥ｮ壹・蜀咏悄繧偵い繝・・繝ｭ繝ｼ繝峨＠縲√く繝ｼ繝ｯ繝ｼ繝峨〒謚ｽ蜃ｺ縺励※莠亥ｮ壹↓霑ｽ蜉縺ｧ縺阪∪縺吶・;
  if (upper.includes("ONE OK ROCK") || upper.includes("BE:FIRST") || text.includes("HANA") || text.includes("繝ｩ繧､繝・) || text.includes("逡ｪ邨・)) return "ONE OK ROCK繝ｻBE:FIRST繝ｻHANA縺ｮ繝ｩ繧､繝匁ュ蝣ｱ縺ｨ蜃ｺ貍皮分邨・ｒ繝√ぉ繝・け蟇ｾ雎｡縺ｫ縺励∪縺吶・;
  if (text.includes("謾ｯ謠ｴ") || text.includes("閾ｪ髢・) || text.includes("蟄ｦ鄙帝囿螳ｳ") || text.includes("諡・ｻｻ")) return buildSupportWorkReply(text);
  return "莠亥ｮ壹ｒ隕九ｋ縺ｨ縲∝炎繧句呵｣懊・萓｡蛟､縺御ｽ弱＞縺ｮ縺ｫ譎る俣繧剃ｽｿ縺｣縺ｦ縺・ｋ莠亥ｮ壹〒縺吶・;
}

function runSelfTests() {
  const results = [];
  const check = (name, condition) => results.push({ name, pass: Boolean(condition) });
  check("minutesOf calculates 40 minutes", minutesOf({ time: "06:30-07:10" }) === 40);
  check("weekday wake routine starts at 06:00", defaultEvents[0].time.startsWith("06:00"));
  check("weekday wake routine excludes weekends in title", defaultEvents[0].title.includes("蝨滓律莉･螟・));
  check("minutesOf returns 0 for invalid time", minutesOf({ time: "bad" }) === 0);
  check("support work quick actions exist", supportWorkQuickActions.length >= 5);
  check("support work quick actions are unique", new Set(supportWorkQuickActions.map((action) => action.id)).size === supportWorkQuickActions.length);
  check("support work reply handles teacher memo", buildSupportWorkReply("諡・ｻｻ縺ｮ蜈育函縺ｫ蜈ｱ譛峨☆繧九Γ繝｢").includes("諡・ｻｻ蜈ｱ譛峨Γ繝｢譯・));
  check("support work reply handles autism", buildSupportWorkReply("閾ｪ髢臥裸縺ｮ螢ｰ縺九￠").includes("谺｡縺ｮ陦悟虚"));
  check("conversation quick actions exist", conversationQuickActions.length >= 8);
  check("conversation quick action calorie works", buildReply(conversationQuickActions.find((action) => action.id === "calorie").text).includes("蟾ｮ縺怜ｼ輔″繧ｫ繝ｭ繝ｪ繝ｼ"));
  check("finance reply reacts to NISA", buildReply("NISA繧貞級蠑ｷ縺励◆縺・).includes("NISA"));
  check("finance topics have three items", dailyFinanceTopics.length === 3);
  check("finance topic reply works", buildReply("豌怜・霆｢謠帙↓驥題檮縺ｮ縺昴・譌･縺ｮ繝医ヴ繝・け").includes("莉頑律縺ｮ驥題檮繝医ヴ繝・け"));
  check("commute starts at 07:30", defaultEvents.some((event) => event.time === "07:30-07:45" && event.title.includes("騾壼共")));
  check("work is 08:00 to 15:00", defaultEvents.some((event) => event.time === "08:00-15:00" && event.title.includes("蟆丞ｭｦ譬｡謾ｯ謠ｴ蜩｡")));
  check("support advice is scheduled at 16:00", defaultEvents.some((event) => event.time === "16:00-16:20" && event.type === "support"));
  check("support reply reacts to autism and LD", buildReply("閾ｪ髢臥裸縺ｨ蟄ｦ鄙帝囿螳ｳ縺ｮ蟆丞ｭｦ2蟷ｴ逕溘∈縺ｮ蟇ｾ蠢・).includes("谺｡縺ｮ陦悟虚"));
  check("addMinutes adds 60 minutes", addMinutes("18:30", 60) === "19:30");
  check("sampleGymText is multiline safely", sampleGymText.includes("\n轣ｫ 19:00"));
  check("gym parser finds yoga keyword", parseGymScheduleText(sampleGymText, "繝ｨ繧ｬ").length === 2);
  check("gym parser pads single digit hour", parseGymScheduleText("譛・9:00 繝ｨ繧ｬ", "繝ｨ繧ｬ")[0]?.time === "09:00-10:00");
  check("dinner has three menu patterns", dinnerMenuPatterns.length === 3);
  check("dinner menu includes shopping list", dinnerMenuPatterns.every((menu) => menu.shoppingList.length > 0));
  check("dinner menu includes recipe steps", dinnerMenuPatterns.every((menu) => menu.recipe.length >= 5));
  check("selected dinner fallback works", getSelectedDinnerMenu("missing-id").id === dinnerMenuPatterns[0].id);
  check("snack avoidance plans exist", snackAvoidancePlans.length === 3);
  check("strict advice list has three items", strictAdviceList.length === 3);
  check("strict advice reacts to 諤偵▲縺ｦ", buildReply("繧ゅ▲縺ｨ諤偵▲縺ｦ縺ｻ縺励＞").includes("諤偵ｊ繝｢繝ｼ繝・));
  check("app launch steps exist", appLaunchSteps.length >= 5);
  check("app launch includes calendar", appLaunchSteps.some((step) => step.id === "calendar"));
  check("food calorie items exist", foodCalorieItems.length >= 5);
  check("exercise calorie items exist", exerciseCalorieItems.length >= 5);
  check("net calorie calculation works", calculateNetCalories(["snack"], ["walk40"]).netKcal === 190);
  check("music preferences include ONE OK ROCK", musicPreferences.includes("ONE OK ROCK"));
  check("entertainment alerts include three artists", entertainmentAlerts.length === 3);
  check("mobile upload accepts images", "image/*".includes("image"));
  check("bottom tabs exist", tabs.length === 5);
  check("bottom tabs include support", tabs.some((tab) => tab.id === "support"));
  check("pwa install steps exist", pwaInstallSteps.length >= 4);
  check("storage keys include events", Boolean(storageKeys.events));
  check("storage load fallback works", loadFromStorage("__missing_test_key__", [1, 2]).length === 2);
  return results;
}

function Card({ children, style = {} }) {
  return <div style={{ background: "white", border: "1px solid #e2e8f0", borderRadius: 22, boxShadow: "0 8px 24px rgba(15,23,42,0.06)", ...style }}>{children}</div>;
}

function Button({ children, onClick, variant = "solid", disabled = false }) {
  return <button disabled={disabled} onClick={onClick} style={{ border: variant === "outline" ? "1px solid #cbd5e1" : "1px solid #0f172a", background: disabled ? "#cbd5e1" : variant === "outline" ? "white" : "#0f172a", color: disabled ? "#64748b" : variant === "outline" ? "#0f172a" : "white", borderRadius: 14, padding: "10px 14px", fontWeight: 700, cursor: disabled ? "not-allowed" : "pointer" }}>{children}</button>;
}

function ChatBubble({ message, accent = "#0f172a" }) {
  const isUser = message.role === "user";
  return <div style={{ justifySelf: isUser ? "end" : "start", maxWidth: "88%", background: isUser ? accent : "#f1f5f9", color: isUser ? "white" : "#0f172a", borderRadius: 14, padding: 10, lineHeight: 1.6 }}>{message.text}</div>;
}

function SectionTitle({ icon, title, subtitle }) {
  return <div><h2 style={{ margin: "0 0 4px", fontSize: 24 }}>{icon} {title}</h2>{subtitle && <p style={{ margin: 0, color: "#64748b", lineHeight: 1.7 }}>{subtitle}</p>}</div>;
}

export default function LifeOptimizerCalendarChatApp() {
  const [activeTab, setActiveTab] = useState("home");
  const [events, setEvents] = useState(() => loadFromStorage(storageKeys.events, defaultEvents));
  const [messages, setMessages] = useState(() => loadFromStorage(storageKeys.messages, [{ role: "ai", text: "逕滓ｴｻ謾ｹ蝟・メ繝｣繝・ヨ縺ｧ縺吶ら鍵遶九√き繝ｭ繝ｪ繝ｼ縲√ず繝縲・≡陞阪∵偵ｊ繝｢繝ｼ繝峨ｒ縺薙％縺ｧ逶ｸ隲・〒縺阪∪縺吶・ }]));
  const [supportMessages, setSupportMessages] = useState(() => loadFromStorage(storageKeys.supportMessages, [{ role: "ai", text: "謾ｯ謠ｴ蜩｡縺ｮ莉穂ｺ句ｰら畑繝√Ε繝・ヨ縺ｧ縺吶よ悃縺ｮ遒ｺ隱阪∬・髢臥裸蟇ｾ蠢懊∝ｭｦ鄙帝囿螳ｳ蟇ｾ蠢懊∝峅縺｣縺滓凾縲∵球莉ｻ蜈ｱ譛峨Γ繝｢繧堤嶌隲・〒縺阪∪縺吶・ }]));
  const [mainInput, setMainInput] = useState("");
  const [supportInput, setSupportInput] = useState("");
  const [selectedStrictId, setSelectedStrictId] = useState("snack");
  const [selectedDinnerId, setSelectedDinnerId] = useState(() => loadFromStorage(storageKeys.selectedDinnerId, "dinner-a"));
  const [selectedFoodIds, setSelectedFoodIds] = useState(() => loadFromStorage(storageKeys.selectedFoodIds, ["rice", "salmon", "miso"]));
  const [selectedExerciseIds, setSelectedExerciseIds] = useState(() => loadFromStorage(storageKeys.selectedExerciseIds, ["walk20"]));
  const [gymOcrText, setGymOcrText] = useState(sampleGymText);
  const [gymKeyword, setGymKeyword] = useState("繝ｨ繧ｬ");
  const [selectedGymIds, setSelectedGymIds] = useState([]);
  const [photoName, setPhotoName] = useState("");
  const [photoPreview, setPhotoPreview] = useState("");
  const [selectedAlertIds, setSelectedAlertIds] = useState(() => loadFromStorage(storageKeys.selectedAlertIds, entertainmentAlerts.map((alert) => alert.id)));
  const [saveStatus, setSaveStatus] = useState("繧ｹ繝槭・蜀・ｿ晏ｭ倥ｒ貅門ｙ荳ｭ");
  const [testResults] = useState(runSelfTests());

  const selectedStrictAdvice = useMemo(() => strictAdviceList.find((item) => item.id === selectedStrictId) || strictAdviceList[0], [selectedStrictId]);
  const selectedDinner = useMemo(() => getSelectedDinnerMenu(selectedDinnerId), [selectedDinnerId]);
  const calorieSummary = useMemo(() => calculateNetCalories(selectedFoodIds, selectedExerciseIds), [selectedFoodIds, selectedExerciseIds]);
  const gymCandidates = useMemo(() => parseGymScheduleText(gymOcrText, gymKeyword), [gymOcrText, gymKeyword]);
  const activeEntertainmentAlerts = useMemo(() => entertainmentAlerts.filter((alert) => selectedAlertIds.includes(alert.id)), [selectedAlertIds]);
  const stats = useMemo(() => {
    const wasteMin = events.filter((event) => event.type === "waste").reduce((sum, event) => sum + minutesOf(event), 0);
    const gymMin = events.filter((event) => event.type === "gym").reduce((sum, event) => sum + minutesOf(event), 0);
    return { wasteMin, gymMin, eventCount: events.length, netKcal: calorieSummary.netKcal };
  }, [events, calorieSummary.netKcal]);

  useEffect(() => { setSaveStatus(saveToStorage(storageKeys.events, events) ? "莠亥ｮ壹ｒ菫晏ｭ俶ｸ医∩" : "莠亥ｮ壹ｒ菫晏ｭ倥〒縺阪∪縺帙ｓ縺ｧ縺励◆"); }, [events]);
  useEffect(() => { saveToStorage(storageKeys.messages, messages); }, [messages]);
  useEffect(() => { saveToStorage(storageKeys.supportMessages, supportMessages); }, [supportMessages]);
  useEffect(() => { saveToStorage(storageKeys.selectedDinnerId, selectedDinnerId); }, [selectedDinnerId]);
  useEffect(() => { saveToStorage(storageKeys.selectedFoodIds, selectedFoodIds); }, [selectedFoodIds]);
  useEffect(() => { saveToStorage(storageKeys.selectedExerciseIds, selectedExerciseIds); }, [selectedExerciseIds]);
  useEffect(() => { saveToStorage(storageKeys.selectedAlertIds, selectedAlertIds); }, [selectedAlertIds]);

  function addEvent(time, title, type, extra = {}) {
    setEvents((prev) => prev.some((event) => event.time === time && event.title === title && event.day === extra.day) ? prev : [...prev, { id: Date.now() + Math.random(), time, title, type, value: 8, ...extra }]);
  }

  function sendMainMessage(textArg) {
    const text = (textArg || mainInput).trim();
    if (!text) return;
    setMainInput("");
    setMessages((prev) => [...prev, { role: "user", text }, { role: "ai", text: buildReply(text) }]);
  }

  function sendSupportMessage(textArg) {
    const text = (textArg || supportInput).trim();
    if (!text) return;
    setSupportInput("");
    setSupportMessages((prev) => [...prev, { role: "user", text }, { role: "ai", text: buildSupportWorkReply(text) }]);
  }

  function handleGymPhotoChange(event) {
    const file = event.target.files?.[0];
    if (!file) return;
    if (photoPreview) URL.revokeObjectURL(photoPreview);
    setPhotoName(file.name);
    setPhotoPreview(URL.createObjectURL(file));
    setGymOcrText(sampleGymText);
  }

  function addSelectedGymEvents() {
    gymCandidates.filter((candidate) => selectedGymIds.includes(candidate.id)).forEach((candidate) => addEvent(candidate.time, candidate.title, "gym", { day: candidate.day }));
  }

  function toggleFood(id) { setSelectedFoodIds((prev) => prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]); }
  function toggleExercise(id) { setSelectedExerciseIds((prev) => prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]); }
  function toggleGym(id) { setSelectedGymIds((prev) => prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]); }
  function toggleAlert(id) { setSelectedAlertIds((prev) => prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]); }
  function resetSavedData() {
    clearAppStorage();
    setEvents(defaultEvents);
    setMessages([{ role: "ai", text: "菫晏ｭ倥ョ繝ｼ繧ｿ繧偵Μ繧ｻ繝・ヨ縺励∪縺励◆縲ら函豢ｻ謾ｹ蝟・メ繝｣繝・ヨ繧貞・髢九〒縺阪∪縺吶・ }]);
    setSupportMessages([{ role: "ai", text: "菫晏ｭ倥ョ繝ｼ繧ｿ繧偵Μ繧ｻ繝・ヨ縺励∪縺励◆縲よ髪謠ｴ蜩｡繝√Ε繝・ヨ繧貞・髢九〒縺阪∪縺吶・ }]);
    setSelectedDinnerId("dinner-a");
    setSelectedFoodIds(["rice", "salmon", "miso"]);
    setSelectedExerciseIds(["walk20"]);
    setSelectedAlertIds(entertainmentAlerts.map((alert) => alert.id));
    setSaveStatus("菫晏ｭ倥ョ繝ｼ繧ｿ繧偵Μ繧ｻ繝・ヨ縺励∪縺励◆");
  }

  const pageStyle = { minHeight: "100vh", background: "linear-gradient(135deg,#f8fafc,#eff6ff)", color: "#0f172a", padding: "18px 18px 96px", fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" };
  const shellStyle = { maxWidth: 980, margin: "0 auto", display: "grid", gap: 16 };
  const gridCards = { display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))", gap: 12 };
  const gridTwo = { display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))", gap: 12 };

  return (
    <div style={pageStyle}>
      <div style={shellStyle}>
        <header>
          <div style={{ display: "inline-flex", background: "white", border: "1px solid #e2e8f0", borderRadius: 999, padding: "6px 12px", marginBottom: 10 }}>導 PWA隧ｦ菴・/div>
          <h1 style={{ margin: 0, fontSize: "clamp(28px,6vw,44px)" }}>逕滓ｴｻ譛驕ｩ蛹悶い繝励Μ</h1>
          <p style={{ color: "#64748b", lineHeight: 1.7 }}>謾ｯ謠ｴ蜩｡縺ｮ莉穂ｺ九・Google繧ｫ繝ｬ繝ｳ繝繝ｼ繝ｻ迪ｮ遶九・繧ｫ繝ｭ繝ｪ繝ｼ繝ｻ驥題檮繝ｻ繧ｸ繝繝ｻ騾夂衍繧剃ｼ夊ｩｱ縺ｧ謫堺ｽ懊＠縺ｾ縺吶・/p>
        </header>

        {activeTab === "home" && (
          <div style={{ display: "grid", gap: 16 }}>
            <Card style={{ background: "#ecfeff", border: "2px solid #06b6d4" }}>
              <div style={{ padding: 18 }}>
                <SectionTitle icon="導" title="PWA蛹悶・繧ｹ繝槭・蜀・ｿ晏ｭ・ subtitle="縺ｾ縺壹・繝帙・繝逕ｻ髱｢霑ｽ蜉縺ｨ縲∫判髱｢繧帝哩縺倥※繧よｮ九ｋ菫晏ｭ俶ｩ溯・繧呈紛縺医∪縺吶・ />
                <div style={{ marginTop: 14, ...gridCards }}>
                  {pwaInstallSteps.map((step) => <div key={step.id} style={{ background: "white", border: "1px solid #a5f3fc", borderRadius: 16, padding: 14 }}><b>{step.title}</b><p style={{ color: "#155e75", marginBottom: 0, lineHeight: 1.6 }}>{step.body}</p></div>)}
                </div>
                <div style={{ marginTop: 14, background: "white", border: "1px solid #a5f3fc", borderRadius: 16, padding: 14 }}>
                  <b>沈 菫晏ｭ倡憾諷・/b>
                  <p style={{ margin: "6px 0", color: "#155e75" }}>{saveStatus}</p>
                  <p style={{ margin: "6px 0", color: "#64748b" }}>菫晏ｭ伜ｯｾ雎｡・壻ｺ亥ｮ壹∫函豢ｻ謾ｹ蝟・メ繝｣繝・ヨ縲∵髪謠ｴ蜩｡繝√Ε繝・ヨ縲∝､暮｣滄∈謚槭√き繝ｭ繝ｪ繝ｼ驕ｸ謚槭・夂衍險ｭ螳・/p>
                  <Button variant="outline" onClick={resetSavedData}>菫晏ｭ倥ョ繝ｼ繧ｿ繧偵Μ繧ｻ繝・ヨ</Button>
                </div>
              </div>
            </Card>

            <Card style={{ background: "#7f1d1d", color: "white", border: "2px solid #ef4444" }}>
              <div style={{ padding: 18 }}>
                <SectionTitle icon="櫨" title="莉頑律縺ｮ蝟・ subtitle="逕倥＞陦悟虚繧呈ｭ｢繧√ｋ縺溘ａ縺ｮ蠑ｷ繧√さ繝｡繝ｳ繝医〒縺吶・ />
                <p style={{ lineHeight: 1.8, fontSize: 16 }}>{selectedStrictAdvice.message}</p>
                <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                  {strictAdviceList.map((item) => <button key={item.id} onClick={() => setSelectedStrictId(item.id)} style={{ border: selectedStrictId === item.id ? "2px solid white" : "1px solid rgba(255,255,255,0.5)", background: "transparent", color: "white", borderRadius: 999, padding: "8px 12px", cursor: "pointer", fontWeight: 700 }}>{item.target}</button>)}
                </div>
              </div>
            </Card>

            <Card>
              <div style={{ padding: 18 }}>
                <SectionTitle icon="町" title="莨夊ｩｱ縺ｧ謫堺ｽ・ subtitle="繝懊ち繝ｳ縺九ｉ縺ｧ繧ゅ∽ｸ九・繝√Ε繝・ヨ縺九ｉ縺ｧ繧よ桃菴懊〒縺阪∪縺吶・ />
                <div style={{ marginTop: 12, display: "flex", gap: 8, flexWrap: "wrap" }}>
                  {conversationQuickActions.map((action) => <Button key={action.id} variant="outline" onClick={() => sendMainMessage(action.text)}>{action.label}</Button>)}
                </div>
              </div>
            </Card>

            <section style={gridCards}>
              <Card><div style={{ padding: 16 }}><p style={{ margin: 0, color: "#64748b" }}>隕狗峩縺怜呵｣・/p><strong style={{ fontSize: 28 }}>{stats.wasteMin}蛻・/strong></div></Card>
              <Card><div style={{ padding: 16 }}><p style={{ margin: 0, color: "#64748b" }}>繧ｸ繝莠亥ｮ・/p><strong style={{ fontSize: 28 }}>{stats.gymMin}蛻・/strong></div></Card>
              <Card><div style={{ padding: 16 }}><p style={{ margin: 0, color: "#64748b" }}>莠亥ｮ壽焚</p><strong style={{ fontSize: 28 }}>{stats.eventCount}莉ｶ</strong></div></Card>
              <Card><div style={{ padding: 16 }}><p style={{ margin: 0, color: "#64748b" }}>蟾ｮ縺怜ｼ輔″</p><strong style={{ fontSize: 28 }}>{stats.netKcal}kcal</strong></div></Card>
            </section>
          </div>
        )}

        {activeTab === "support" && (
          <Card style={{ background: "#f5f3ff", border: "2px solid #8b5cf6" }}>
            <div style={{ padding: 18 }}>
              <SectionTitle icon="ｧｩ" title="謾ｯ謠ｴ蜩｡縺ｮ莉穂ｺ九メ繝｣繝・ヨ" subtitle="荳逡ｪ繧医￥菴ｿ縺・ｻ穂ｺ狗畑繝√Ε繝・ヨ縺ｧ縺吶・ />
              <div style={{ marginTop: 12, display: "flex", gap: 8, flexWrap: "wrap" }}>
                {supportWorkQuickActions.map((action) => <Button key={action.id} variant="outline" onClick={() => sendSupportMessage(action.text)}>{action.label}</Button>)}
              </div>
              <div style={{ marginTop: 12, display: "grid", gap: 8, maxHeight: 360, overflow: "auto", background: "white", borderRadius: 16, padding: 12 }}>
                {supportMessages.map((message, index) => <ChatBubble key={`${message.role}-${index}`} message={message} accent="#4c1d95" />)}
              </div>
              <div style={{ display: "flex", gap: 8, marginTop: 12 }}>
                <input value={supportInput} onChange={(event) => setSupportInput(event.target.value)} onKeyDown={(event) => event.key === "Enter" && sendSupportMessage()} placeholder="萓具ｼ壽球莉ｻ縺ｫ蜈ｱ譛峨☆繧九Γ繝｢繧剃ｽ懊▲縺ｦ" style={{ flex: 1, border: "1px solid #c4b5fd", borderRadius: 12, padding: 10 }} />
                <Button onClick={() => sendSupportMessage()}>逶ｸ隲・/Button>
              </div>
            </div>
          </Card>
        )}

        {activeTab === "schedule" && (
          <div style={{ display: "grid", gap: 16 }}>
            <Card>
              <div style={{ padding: 18 }}>
                <SectionTitle icon="套" title="莠亥ｮ壻ｸ隕ｧ" subtitle="Google繧ｫ繝ｬ繝ｳ繝繝ｼ騾｣謳ｺ莠亥ｮ壹・荳隕ｧ縺ｧ縺吶・ />
                <div style={{ marginTop: 12, display: "grid", gap: 8 }}>
                  {events.map((event) => <div key={event.id} style={{ padding: 12, borderRadius: 14, ...(typeStyle[event.type] || {}) }}><b>{event.day ? `${event.day}譖・` : ""}{event.time}縲{event.title}</b><p style={{ margin: "6px 0 0", color: "#64748b" }}>{typeEmoji[event.type]} {typeLabel[event.type]} / 萓｡蛟､ {event.value}/10</p></div>)}
                </div>
              </div>
            </Card>

            <Card>
              <div style={{ padding: 18 }}>
                <SectionTitle icon="暑・・ title="繧ｸ繝蜀咏悄竊剃ｺ亥ｮ壼喧" subtitle="蜀咏悄OCR諠ｳ螳壹ゆｻ翫・繧ｵ繝ｳ繝励Ν譁・ｭ励〒蜍輔″縺ｾ縺吶・ />
                <div style={{ marginTop: 12, ...gridTwo }}>
                  <div style={{ display: "grid", gap: 8 }}>
                    <label>胴 蜀咏悄繧｢繝・・繝ｭ繝ｼ繝・input type="file" accept="image/*" capture="environment" onChange={handleGymPhotoChange} /></label>
                    <p style={{ color: "#64748b", margin: 0 }}>驕ｸ謚樔ｸｭ・嘴photoName || "縺ｪ縺・}</p>
                    {photoPreview && <img src={photoPreview} alt="繧ｸ繝莠亥ｮ夊｡ｨ" style={{ width: "100%", maxHeight: 200, objectFit: "contain", borderRadius: 12 }} />}
                  </div>
                  <div>
                    <label>繧ｭ繝ｼ繝ｯ繝ｼ繝・input value={gymKeyword} onChange={(event) => setGymKeyword(event.target.value)} style={{ display: "block", width: "100%", border: "1px solid #cbd5e1", borderRadius: 10, padding: 8 }} /></label>
                    <textarea value={gymOcrText} onChange={(event) => setGymOcrText(event.target.value)} rows={7} style={{ marginTop: 8, width: "100%", border: "1px solid #cbd5e1", borderRadius: 10, padding: 8 }} />
                  </div>
                </div>
                <h3>謚ｽ蜃ｺ蛟呵｣懶ｼ嘴gymCandidates.length}莉ｶ</h3>
                {gymCandidates.map((candidate) => <label key={candidate.id} style={{ display: "block", background: "#f0fdfa", borderRadius: 12, padding: 10, marginTop: 8 }}><input type="checkbox" checked={selectedGymIds.includes(candidate.id)} onChange={() => toggleGym(candidate.id)} /> {candidate.day}譖・{candidate.time} {candidate.title}</label>)}
                <div style={{ marginTop: 12 }}><Button disabled={selectedGymIds.length === 0} onClick={addSelectedGymEvents}>驕ｸ謚槫・繧剃ｺ亥ｮ壹↓霑ｽ蜉</Button></div>
              </div>
            </Card>
          </div>
        )}

        {activeTab === "food" && (
          <div style={{ display: "grid", gap: 16 }}>
            <Card>
              <div style={{ padding: 18 }}>
                <SectionTitle icon="些" title="螟暮｣溘Γ繝九Η繝ｼ" subtitle="2莠ｺ逕ｨ繝ｻ驥手除螟壹ａ繝ｻ荳豎∽ｸ芽除縺ｧ縺吶・ />
                <div style={{ marginTop: 12, ...gridCards }}>
                  {dinnerMenuPatterns.map((menu) => <label key={menu.id} style={{ background: "#fff7ed", border: selectedDinnerId === menu.id ? "2px solid #f97316" : "1px solid #fed7aa", borderRadius: 16, padding: 14 }}><input type="radio" checked={selectedDinnerId === menu.id} onChange={() => setSelectedDinnerId(menu.id)} /> <b>{menu.title}</b><p>豎・ｼ嘴menu.soup}</p><p>荳ｻ闖懶ｼ嘴menu.main}</p><p>蜑ｯ闖懶ｼ嘴menu.side1} / {menu.side2} / {menu.side3}</p></label>)}
                </div>
                <div style={{ marginTop: 12, ...gridTwo }}>
                  <div style={{ background: "#fff7ed", borderRadius: 16, padding: 14 }}><h3>雋ｷ縺・ｂ縺ｮ</h3><ul>{selectedDinner.shoppingList.map((item) => <li key={item}>{item}</li>)}</ul></div>
                  <div style={{ background: "#fff7ed", borderRadius: 16, padding: 14 }}><h3>菴懊ｊ譁ｹ</h3><ol>{selectedDinner.recipe.map((step) => <li key={step}>{step}</li>)}</ol></div>
                </div>
                <div style={{ marginTop: 12 }}><Button onClick={() => addEvent("15:00-15:10", `譎ｩ縺秘｣ｯ繝｡繝九Η繝ｼ・・{selectedDinner.title}`, "dinner")}>15譎ゅ・螟暮｣滓署譯医ｒ莠亥ｮ壹↓霑ｽ蜉</Button></div>
              </div>
            </Card>

            <Card>
              <div style={{ padding: 18 }}>
                <SectionTitle icon="櫨" title="繧ｫ繝ｭ繝ｪ繝ｼ邂｡逅・ subtitle="鬟溷刀縺ｨ驕句虚繧帝∈縺ｶ縺ｨ蟾ｮ縺怜ｼ輔″縺瑚ｦ九∴縺ｾ縺吶・ />
                <div style={{ marginTop: 12, ...gridTwo }}>
                  <div style={{ background: "#fff7ed", borderRadius: 16, padding: 14 }}><h3>鬟溷刀</h3>{foodCalorieItems.map((item) => <label key={item.id} style={{ display: "block", marginTop: 8 }}><input type="checkbox" checked={selectedFoodIds.includes(item.id)} onChange={() => toggleFood(item.id)} /> <b>{item.name}</b>・嘴item.kcal}kcal <span style={{ color: "#64748b" }}>{item.note}</span></label>)}</div>
                  <div style={{ background: "#f0fdfa", borderRadius: 16, padding: 14 }}><h3>驕句虚</h3>{exerciseCalorieItems.map((item) => <label key={item.id} style={{ display: "block", marginTop: 8 }}><input type="checkbox" checked={selectedExerciseIds.includes(item.id)} onChange={() => toggleExercise(item.id)} /> <b>{item.name}</b>・嘴item.kcal}kcal <span style={{ color: "#64748b" }}>{item.note}</span></label>)}</div>
                </div>
                <div style={{ marginTop: 12, background: calorieSummary.netKcal > 300 ? "#fee2e2" : "#ecfdf5", borderRadius: 16, padding: 14 }}>
                  <h3>蟾ｮ縺怜ｼ輔″・嘴calorieSummary.netKcal}kcal</h3>
                  <p>鞫ょ叙・嘴calorieSummary.foodKcal}kcal / 驕句虚豸郁ｲｻ・嘴calorieSummary.exerciseKcal}kcal</p>
                  <p>{calorieSummary.netKcal > 300 ? "諤偵ｊ繝｢繝ｼ繝会ｼ夐｣溘∋縺溷・縺ｫ蟇ｾ縺励※驕句虚縺瑚ｶｳ繧翫∪縺帙ｓ縲ゆｻ頑律荳ｭ縺ｫ豁ｩ縺上°縲∵・譌･縺ｮ縺翫ｄ縺､繧貞炎繧九∋縺阪〒縺吶・ : "縺・＞諢溘§縺ｧ縺吶ゅヰ繝ｩ繝ｳ繧ｹ縺瑚ｦ九∴縺ｦ縺・∪縺吶・}</p>
                  <Button onClick={() => addEvent("21:10-21:15", `繧ｫ繝ｭ繝ｪ繝ｼ遒ｺ隱搾ｼ壼ｷｮ縺怜ｼ輔″${calorieSummary.netKcal}kcal`, "calorie")}>繧ｫ繝ｭ繝ｪ繝ｼ遒ｺ隱阪ｒ莠亥ｮ壹↓霑ｽ蜉</Button>
                </div>
              </div>
            </Card>

            <Card>
              <div style={{ padding: 18 }}>
                <SectionTitle icon="嵯" title="縺翫ｄ縺､蟇ｾ遲・ subtitle="鬟溘∋縺ｪ縺・◆繧√・鄂ｮ縺肴鋤縺郁｡悟虚縺ｧ縺吶・ />
                <div style={{ marginTop: 12, ...gridCards }}>{snackAvoidancePlans.map((plan) => <div key={plan.id} style={{ background: "#f7fee7", borderRadius: 16, padding: 14 }}><b>{plan.title}</b><p>{plan.time}</p><p>{plan.action}</p><Button variant="outline" onClick={() => addEvent(plan.time, `縺翫ｄ縺､蝗樣∩・・{plan.title}`, "snack")}>莠亥ｮ壹↓霑ｽ蜉</Button></div>)}</div>
              </div>
            </Card>
          </div>
        )}

        {activeTab === "settings" && (
          <div style={{ display: "grid", gap: 16 }}>
            <Card>
              <div style={{ padding: 18 }}>
                <SectionTitle icon="謄" title="繝ｩ繧､繝悶・蜃ｺ貍皮分邨・夂衍" subtitle="ONE OK ROCK繝ｻBE:FIRST繝ｻHANA繧偵メ繧ｧ繝・け蟇ｾ雎｡縺ｫ縺励∪縺吶・ />
                <div style={{ marginTop: 12, ...gridCards }}>
                  {entertainmentAlerts.map((alert) => <label key={alert.id} style={{ background: "#eef2ff", borderRadius: 16, padding: 14 }}><input type="checkbox" checked={selectedAlertIds.includes(alert.id)} onChange={() => toggleAlert(alert.id)} /> <b>{alert.artist}</b><p>{alert.category}</p><p>{alert.detail}</p></label>)}
                </div>
                <p style={{ color: "#64748b" }}>騾夂衍蟇ｾ雎｡・嘴activeEntertainmentAlerts.length}邨・/p>
              </div>
            </Card>

            <Card>
              <div style={{ padding: 18 }}>
                <SectionTitle icon="堂" title="莉頑律縺ｮ驥題檮繝医ヴ繝・け" subtitle="豌怜・霆｢謠帷畑縺ｮ遏ｭ縺・≡陞阪Γ繝｢縺ｧ縺吶・ />
                <div style={{ marginTop: 12, ...gridCards }}>{dailyFinanceTopics.map((topic) => <div key={topic.id} style={{ background: "#f0fdf4", borderRadius: 16, padding: 14 }}><b>{topic.title}</b><p>{topic.body}</p><p style={{ fontWeight: 700 }}>{topic.action}</p></div>)}</div>
              </div>
            </Card>

            <Card>
              <div style={{ padding: 18 }}>
                <SectionTitle icon="町" title="逕滓ｴｻ謾ｹ蝟・メ繝｣繝・ヨ" subtitle="蜈ｨ菴捺ｩ溯・繧剃ｼ夊ｩｱ縺ｧ謫堺ｽ懊＠縺ｾ縺吶・ />
                <div style={{ marginTop: 12, display: "grid", gap: 8 }}>{messages.map((message, index) => <ChatBubble key={`${message.role}-${index}`} message={message} />)}</div>
                <div style={{ display: "flex", gap: 8, marginTop: 12 }}><input value={mainInput} onChange={(event) => setMainInput(event.target.value)} onKeyDown={(event) => event.key === "Enter" && sendMainMessage()} placeholder="萓具ｼ夐≡陞阪ヨ繝斐ャ繧ｯ繧呈蕗縺医※" style={{ flex: 1, border: "1px solid #cbd5e1", borderRadius: 12, padding: 10 }} /><Button onClick={() => sendMainMessage()}>騾∽ｿ｡</Button></div>
              </div>
            </Card>

            <Card style={{ background: "#f8fafc" }}>
              <div style={{ padding: 18 }}>
                <SectionTitle icon="笨・ title="邁｡譏薙ユ繧ｹ繝・ subtitle="荳ｻ隕∵ｩ溯・縺ｮ繝√ぉ繝・け縺ｧ縺吶・ />
                <div style={{ marginTop: 12, display: "grid", gap: 6 }}>{testResults.map((test) => <div key={test.name} style={{ color: test.pass ? "#166534" : "#991b1b" }}>{test.pass ? "笨・ : "笶・} {test.name}</div>)}</div>
              </div>
            </Card>
          </div>
        )}
      </div>

      <nav style={{ position: "fixed", left: 0, right: 0, bottom: 0, background: "rgba(255,255,255,0.95)", borderTop: "1px solid #e2e8f0", padding: "8px 10px", display: "grid", gridTemplateColumns: "repeat(5,1fr)", gap: 6, backdropFilter: "blur(10px)" }}>
        {tabs.map((tab) => <button key={tab.id} onClick={() => setActiveTab(tab.id)} style={{ border: activeTab === tab.id ? "2px solid #0f172a" : "1px solid #e2e8f0", background: activeTab === tab.id ? "#0f172a" : "white", color: activeTab === tab.id ? "white" : "#0f172a", borderRadius: 14, padding: "8px 4px", fontWeight: 800, cursor: "pointer" }}><div>{tab.icon}</div><div style={{ fontSize: 12 }}>{tab.label}</div></button>)}
      </nav>
    </div>
  );
}


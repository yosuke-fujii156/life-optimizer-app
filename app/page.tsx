"use client";
// @ts-nocheck

import React, { useEffect, useMemo, useState } from "react";

const defaultEvents = [
  { id: 1, time: "06:00-06:30", title: "平日：起床・朝の準備（土日以外）", type: "life", value: 7 },
  { id: 2, time: "07:30-07:45", title: "通勤：出発→職場到着", type: "move", value: 5 },
  { id: 3, time: "08:00-15:00", title: "小学校支援員の仕事", type: "work", value: 9 },
  { id: 4, time: "16:00-16:20", title: "支援メモ確認", type: "support", value: 9 },
  { id: 5, time: "19:30-20:20", title: "動画・SNS", type: "waste", value: 1 },
  { id: 6, time: "20:30-21:00", title: "金融ニュース確認", type: "finance", value: 8 },
  { id: 7, time: "22:30-23:20", title: "なんとなくスマホ", type: "waste", value: 1 },
];

const sampleGymText = `月 18:30 ヨガ
火 19:00 筋トレ
水 18:00 ストレッチ
木 19:30 ピラティス
金 18:45 有酸素
土 10:00 ヨガ
日 休館`;

const musicPreferences = ["ONE OK ROCK", "BE:FIRST", "HANA"];

const tabs = [
  { id: "home", label: "ホーム", icon: "🏠" },
  { id: "support", label: "支援員", icon: "🧩" },
  { id: "schedule", label: "予定", icon: "📅" },
  { id: "food", label: "食事", icon: "🍱" },
  { id: "settings", label: "設定", icon: "⚙️" },
];

const appLaunchSteps = [
  { id: "pwa", title: "① スマホアプリ化", body: "Next.jsをPWA対応し、iPhone/Androidのホーム画面に追加できる形にします。" },
  { id: "calendar", title: "② Googleカレンダー連携", body: "起床・通勤・仕事・ジム・夕食提案をGoogleカレンダーに登録します。" },
  { id: "login", title: "③ ログインと保存", body: "Googleログインを入れ、予定・食事・カロリー・チャット履歴を保存します。" },
  { id: "notify", title: "④ 通知", body: "15時の夕食提案、16時の支援メモ、ライブ情報、金融トピックを通知します。" },
  { id: "ai", title: "⑤ AI会話", body: "支援員チャット、生活改善チャット、怒りモード、献立相談をAIで返答します。" },
];

const supportWorkQuickActions = [
  { id: "morning", label: "朝の確認", text: "今日の支援員の朝の確認を教えて" },
  { id: "autism", label: "自閉症対応", text: "自閉症の小学2年生への声かけを教えて" },
  { id: "ld", label: "学習障害対応", text: "学習障害の小学2年生への学習支援を教えて" },
  { id: "trouble", label: "困った時", text: "支援中に困った時の対応を教えて" },
  { id: "teacher", label: "担任共有", text: "担任の先生に共有するメモを作って" },
];

const conversationQuickActions = [
  { id: "dinner", label: "晩ご飯", text: "今日の晩ご飯を一汁三菜で提案して" },
  { id: "calorie", label: "カロリー", text: "食品のカロリーと運動消費カロリーを見たい" },
  { id: "snack", label: "おやつ止める", text: "おやつを食べない提案ある" },
  { id: "strict", label: "怒って", text: "もっと怒ってほしい" },
  { id: "finance", label: "金融", text: "気分転換に金融のその日のトピック" },
  { id: "gym", label: "ジム", text: "ジムの予定を入れたい" },
  { id: "entertainment", label: "ライブ", text: "ライブ情報と出演番組を通知して" },
  { id: "support", label: "支援", text: "自閉症と学習障害の小学2年生への対応" },
];

const dinnerMenuPatterns = [
  {
    id: "dinner-a",
    title: "和風さっぱり定食",
    soup: "豆腐・わかめ・ねぎのみそ汁",
    main: "鮭の塩焼き 大根おろし添え",
    side1: "小松菜とにんじんのおひたし",
    side2: "きゅうり・トマト・しらすの酢の物",
    side3: "かぼちゃの煮物",
    shoppingList: ["鮭 2切れ", "豆腐", "わかめ", "ねぎ", "大根", "小松菜", "にんじん", "きゅうり", "トマト", "しらす", "かぼちゃ"],
    recipe: ["鮭に塩をふり10分置く。", "みそ汁を作る。", "小松菜とにんじんをゆでて和える。", "酢の物を作る。", "鮭を焼き、かぼちゃを煮る。"],
  },
  {
    id: "dinner-b",
    title: "野菜たっぷり鶏むね定食",
    soup: "キャベツ・玉ねぎ・きのこのスープ",
    main: "鶏むね肉の照り焼き レタス添え",
    side1: "ブロッコリーと卵のサラダ",
    side2: "なすとピーマンの焼きびたし",
    side3: "れんこんとにんじんのきんぴら",
    shoppingList: ["鶏むね肉", "キャベツ", "玉ねぎ", "しめじ", "レタス", "ブロッコリー", "卵", "なす", "ピーマン", "れんこん", "にんじん"],
    recipe: ["鶏むね肉をそぎ切りにする。", "野菜スープを作る。", "ブロッコリーと卵をゆでる。", "なすとピーマンを焼く。", "鶏肉を照り焼きにして盛りつける。"],
  },
  {
    id: "dinner-c",
    title: "魚と根菜の健康定食",
    soup: "具だくさん豚汁風みそ汁",
    main: "さばのみそ煮",
    side1: "れんこんとごぼうのきんぴら",
    side2: "ほうれん草とえのきのごま和え",
    side3: "冷ややっこ オクラのせ",
    shoppingList: ["さば", "大根", "にんじん", "ごぼう", "れんこん", "ほうれん草", "えのき", "豆腐", "オクラ", "豚こま肉"],
    recipe: ["根菜を切る。", "豚汁風みそ汁を作る。", "さばをみそ煮にする。", "きんぴらを作る。", "ごま和えと冷ややっこを用意する。"],
  },
];

const foodCalorieItems = [
  { id: "rice", name: "ごはん 茶碗1杯", kcal: 250, note: "普通盛り約150g" },
  { id: "salmon", name: "鮭の塩焼き 1切れ", kcal: 180, note: "主菜として使いやすい" },
  { id: "miso", name: "みそ汁 1杯", kcal: 60, note: "具だくさんがおすすめ" },
  { id: "snack", name: "菓子パン 1個", kcal: 350, note: "間食では重い" },
  { id: "chocolate", name: "チョコ 5粒", kcal: 140, note: "少量でも積み重なる" },
];

const exerciseCalorieItems = [
  { id: "walk20", name: "早歩き 20分", kcal: 80, note: "仕事後の切り替え" },
  { id: "walk40", name: "早歩き 40分", kcal: 160, note: "間食対策に良い" },
  { id: "gym60", name: "ジム 60分", kcal: 250, note: "筋トレ＋有酸素" },
  { id: "stairs10", name: "階段 10分", kcal: 70, note: "短時間で強度高め" },
  { id: "stretch15", name: "ストレッチ 15分", kcal: 35, note: "夜スマホ対策" },
];

const snackAvoidancePlans = [
  { id: "tea", title: "温かいお茶に置き換え", time: "15:30-15:40", action: "甘いおやつの前に温かいお茶を飲んで10分待つ。" },
  { id: "protein", title: "たんぱく質を先に取る", time: "16:30-16:40", action: "空腹ならゆで卵・無糖ヨーグルト・ナッツ少量にする。" },
  { id: "walk", title: "5分だけ歩く", time: "21:00-21:05", action: "夜のおやつ欲は5分歩くかストレッチで切り替える。" },
];

const dailyFinanceTopics = [
  { id: "nisa", title: "今日の金融トピック：NISA", body: "長期・分散・積立の考え方を守ることが大事です。", action: "今日の一言メモ：投資目的を1つ書く。" },
  { id: "inflation", title: "今日の金融トピック：物価", body: "物価が上がると同じ金額で買えるものが少なくなります。", action: "今日の一言メモ：値上がりした固定費を1つ確認。" },
  { id: "risk", title: "今日の金融トピック：リスク", body: "値動きで不安になることも投資リスクです。", action: "今日の一言メモ：下がっても慌てない金額を考える。" },
];

const entertainmentAlerts = [
  { id: "oneok", artist: "ONE OK ROCK", category: "ライブ", detail: "公式サイト・チケット情報・ライブ告知をチェック。" },
  { id: "befirst", artist: "BE:FIRST", category: "出演番組", detail: "音楽番組・配信・ラジオ出演をチェック。" },
  { id: "hana", artist: "HANA", category: "ライブ・出演番組", detail: "ライブ・イベント・テレビ/配信出演をチェック。" },
];

const strictAdviceList = [
  { id: "snack", target: "間食", message: "いい加減にしよう。予定にないおやつは食べない。まず水かお茶。10分待つ。" },
  { id: "phone", target: "夜スマホ", message: "目的のない夜スマホは休憩ではありません。22時を過ぎたら歯みがき、明日の準備、布団です。" },
  { id: "exercise", target: "運動", message: "忙しいから運動できない、ではありません。まず5分歩く。ゼロの日を作らない。" },
];

const typeLabel = { life: "生活", move: "移動", work: "仕事", support: "支援", waste: "見直し", finance: "金融", gym: "ジム", dinner: "夕食", snack: "間食", calorie: "カロリー", financeTopic: "金融トピック", entertainment: "通知", music: "音楽" };

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
  { id: "manifest", title: "manifest.json", body: "アプリ名、アイコン、テーマカラー、起動URLを設定します。" },
  { id: "icons", title: "アイコン", body: "192pxと512pxのアイコンを用意し、ホーム画面追加時に表示します。" },
  { id: "viewport", title: "スマホ最適化", body: "下タブ、余白、入力欄、写真アップロードをスマホ操作向けにします。" },
  { id: "storage", title: "スマホ内保存", body: "まずlocalStorageで予定・チャット・食事選択を保存します。次にクラウド保存へ進めます。" },
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
const typeEmoji = { life: "🏠", move: "🚗", work: "🏫", support: "🧩", waste: "⚠️", finance: "💹", gym: "🏋️", dinner: "🍱", snack: "🍵", calorie: "🔥", financeTopic: "📰", entertainment: "📣", music: "🎧" };
const typeStyle = { life: { background: "#eff6ff" }, move: { background: "#fffbeb" }, work: { background: "#f1f5f9" }, support: { background: "#f5f3ff" }, waste: { background: "#fff1f2" }, finance: { background: "#ecfdf5" }, gym: { background: "#f0fdfa" }, dinner: { background: "#fff7ed" }, snack: { background: "#f7fee7" }, calorie: { background: "#fff7ed" }, financeTopic: { background: "#f0fdf4" }, entertainment: { background: "#eef2ff" }, music: { background: "#fdf2f8" } };

function parseClock(clockText) {
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
    const dayMatch = trimmed.match(/(月|火|水|木|金|土|日)/);
    const timeMatch = trimmed.match(/(\d{1,2}:\d{2})/);
    if (!trimmed || !dayMatch || !timeMatch) return null;
    const [hour, minute] = timeMatch[1].split(":");
    const start = `${hour.padStart(2, "0")}:${minute}`;
    const title = trimmed.replace(dayMatch[0], "").replace(timeMatch[1], "").trim() || "ジム";
    return { id: `gym-${index}-${start}`, day: dayMatch[1], time: `${start}-${addMinutes(start, 60)}`, title: `ジム：${title}`, raw: trimmed, type: "gym", value: 8 };
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
  if (text.includes("朝") || text.includes("確認")) return "支援員の朝の確認です。①時間割 ②苦手な活動 ③座席 ④休憩場所 ⑤担任との合図を確認します。";
  if (text.includes("自閉")) return "自閉症の児童には、『ちゃんとして』ではなく『鉛筆を持つ』『1問目を見る』のように次の行動を1つだけ伝えます。";
  if (text.includes("学習障害") || text.includes("学習支援")) return "学習障害の児童には、量を減らして成功を作ります。『全部』より『まずここだけ』です。";
  if (text.includes("困")) return "困った時は、①安全確保 ②刺激を減らす ③短い声かけ ④選択肢2つ ⑤担任へ共有、の順です。";
  if (text.includes("担任") || text.includes("共有") || text.includes("メモ")) return "担任共有メモ案：本日は〇〇の場面で集中が切れやすかったです。短い指示と見本提示で取り組みやすくなりました。";
  return "支援では、短い指示・見える化・具体的にほめる・休憩の逃げ道を先に決める、が基本です。";
}

function buildReply(userText) {
  const text = String(userText || "");
  const upper = text.toUpperCase();
  if (text.includes("晩") || text.includes("夕食") || text.includes("一汁三菜") || text.includes("レシピ")) return "2人用・野菜多め・一汁三菜を3パターンから選べます。買うものリストと手順も表示します。";
  if (text.includes("カロリー") || text.includes("食品") || text.includes("消費")) return "食品カロリーと運動消費カロリーを選ぶと、差し引きカロリーを表示します。";
  if (text.includes("おやつ") || text.includes("間食")) return "おやつ対策は、まずお茶で10分待つ、空腹ならたんぱく質、夜は5分歩く、の3段階です。";
  if (text.includes("怒") || text.includes("喝") || text.includes("厳しい")) return `怒りモード：${strictAdviceList[0].message}`;
  if (text.includes("金融") || text.includes("NISA")) return dailyFinanceTopics[0].title + "。" + dailyFinanceTopics[0].body;
  if (text.includes("ジム") || text.includes("ヨガ") || text.includes("筋トレ")) return "ジム予定は写真をアップロードし、キーワードで抽出して予定に追加できます。";
  if (upper.includes("ONE OK ROCK") || upper.includes("BE:FIRST") || text.includes("HANA") || text.includes("ライブ") || text.includes("番組")) return "ONE OK ROCK・BE:FIRST・HANAのライブ情報と出演番組をチェック対象にします。";
  if (text.includes("支援") || text.includes("自閉") || text.includes("学習障害") || text.includes("担任")) return buildSupportWorkReply(text);
  return "予定を見ると、削る候補は価値が低いのに時間を使っている予定です。";
}

function runSelfTests() {
  const results = [];
  const check = (name, condition) => results.push({ name, pass: Boolean(condition) });
  check("minutesOf calculates 40 minutes", minutesOf({ time: "06:30-07:10" }) === 40);
  check("weekday wake routine starts at 06:00", defaultEvents[0].time.startsWith("06:00"));
  check("weekday wake routine excludes weekends in title", defaultEvents[0].title.includes("土日以外"));
  check("minutesOf returns 0 for invalid time", minutesOf({ time: "bad" }) === 0);
  check("support work quick actions exist", supportWorkQuickActions.length >= 5);
  check("support work quick actions are unique", new Set(supportWorkQuickActions.map((action) => action.id)).size === supportWorkQuickActions.length);
  check("support work reply handles teacher memo", buildSupportWorkReply("担任の先生に共有するメモ").includes("担任共有メモ案"));
  check("support work reply handles autism", buildSupportWorkReply("自閉症の声かけ").includes("次の行動"));
  check("conversation quick actions exist", conversationQuickActions.length >= 8);
  check("conversation quick action calorie works", buildReply(conversationQuickActions.find((action) => action.id === "calorie").text).includes("差し引きカロリー"));
  check("finance reply reacts to NISA", buildReply("NISAを勉強したい").includes("NISA"));
  check("finance topics have three items", dailyFinanceTopics.length === 3);
  check("finance topic reply works", buildReply("気分転換に金融のその日のトピック").includes("今日の金融トピック"));
  check("commute starts at 07:30", defaultEvents.some((event) => event.time === "07:30-07:45" && event.title.includes("通勤")));
  check("work is 08:00 to 15:00", defaultEvents.some((event) => event.time === "08:00-15:00" && event.title.includes("小学校支援員")));
  check("support advice is scheduled at 16:00", defaultEvents.some((event) => event.time === "16:00-16:20" && event.type === "support"));
  check("support reply reacts to autism and LD", buildReply("自閉症と学習障害の小学2年生への対応").includes("次の行動"));
  check("addMinutes adds 60 minutes", addMinutes("18:30", 60) === "19:30");
  check("sampleGymText is multiline safely", sampleGymText.includes("\n火 19:00"));
  check("gym parser finds yoga keyword", parseGymScheduleText(sampleGymText, "ヨガ").length === 2);
  check("gym parser pads single digit hour", parseGymScheduleText("月 9:00 ヨガ", "ヨガ")[0]?.time === "09:00-10:00");
  check("dinner has three menu patterns", dinnerMenuPatterns.length === 3);
  check("dinner menu includes shopping list", dinnerMenuPatterns.every((menu) => menu.shoppingList.length > 0));
  check("dinner menu includes recipe steps", dinnerMenuPatterns.every((menu) => menu.recipe.length >= 5));
  check("selected dinner fallback works", getSelectedDinnerMenu("missing-id").id === dinnerMenuPatterns[0].id);
  check("snack avoidance plans exist", snackAvoidancePlans.length === 3);
  check("strict advice list has three items", strictAdviceList.length === 3);
  check("strict advice reacts to 怒って", buildReply("もっと怒ってほしい").includes("怒りモード"));
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
  const [messages, setMessages] = useState(() => loadFromStorage(storageKeys.messages, [{ role: "ai", text: "生活改善チャットです。献立、カロリー、ジム、金融、怒りモードをここで相談できます。" }]));
  const [supportMessages, setSupportMessages] = useState(() => loadFromStorage(storageKeys.supportMessages, [{ role: "ai", text: "支援員の仕事専用チャットです。朝の確認、自閉症対応、学習障害対応、困った時、担任共有メモを相談できます。" }]));
  const [mainInput, setMainInput] = useState("");
  const [supportInput, setSupportInput] = useState("");
  const [selectedStrictId, setSelectedStrictId] = useState("snack");
  const [selectedDinnerId, setSelectedDinnerId] = useState(() => loadFromStorage(storageKeys.selectedDinnerId, "dinner-a"));
  const [selectedFoodIds, setSelectedFoodIds] = useState(() => loadFromStorage(storageKeys.selectedFoodIds, ["rice", "salmon", "miso"]));
  const [selectedExerciseIds, setSelectedExerciseIds] = useState(() => loadFromStorage(storageKeys.selectedExerciseIds, ["walk20"]));
  const [gymOcrText, setGymOcrText] = useState(sampleGymText);
  const [gymKeyword, setGymKeyword] = useState("ヨガ");
  const [selectedGymIds, setSelectedGymIds] = useState([]);
  const [photoName, setPhotoName] = useState("");
  const [photoPreview, setPhotoPreview] = useState("");
  const [selectedAlertIds, setSelectedAlertIds] = useState(() => loadFromStorage(storageKeys.selectedAlertIds, entertainmentAlerts.map((alert) => alert.id)));
  const [saveStatus, setSaveStatus] = useState("スマホ内保存を準備中");
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

  useEffect(() => { setSaveStatus(saveToStorage(storageKeys.events, events) ? "予定を保存済み" : "予定を保存できませんでした"); }, [events]);
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
    setMessages([{ role: "ai", text: "保存データをリセットしました。生活改善チャットを再開できます。" }]);
    setSupportMessages([{ role: "ai", text: "保存データをリセットしました。支援員チャットを再開できます。" }]);
    setSelectedDinnerId("dinner-a");
    setSelectedFoodIds(["rice", "salmon", "miso"]);
    setSelectedExerciseIds(["walk20"]);
    setSelectedAlertIds(entertainmentAlerts.map((alert) => alert.id));
    setSaveStatus("保存データをリセットしました");
  }

  const pageStyle = { minHeight: "100vh", background: "linear-gradient(135deg,#f8fafc,#eff6ff)", color: "#0f172a", padding: "18px 18px 96px", fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" };
  const shellStyle = { maxWidth: 980, margin: "0 auto", display: "grid", gap: 16 };
  const gridCards = { display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))", gap: 12 };
  const gridTwo = { display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))", gap: 12 };

  return (
    <div style={pageStyle}>
      <div style={shellStyle}>
        <header>
          <div style={{ display: "inline-flex", background: "white", border: "1px solid #e2e8f0", borderRadius: 999, padding: "6px 12px", marginBottom: 10 }}>📱 PWA試作</div>
          <h1 style={{ margin: 0, fontSize: "clamp(28px,6vw,44px)" }}>生活最適化アプリ</h1>
          <p style={{ color: "#64748b", lineHeight: 1.7 }}>支援員の仕事・Googleカレンダー・献立・カロリー・金融・ジム・通知を会話で操作します。</p>
        </header>

        {activeTab === "home" && (
          <div style={{ display: "grid", gap: 16 }}>
            <Card style={{ background: "#ecfeff", border: "2px solid #06b6d4" }}>
              <div style={{ padding: 18 }}>
                <SectionTitle icon="📱" title="PWA化・スマホ内保存" subtitle="まずはホーム画面追加と、画面を閉じても残る保存機能を整えます。" />
                <div style={{ marginTop: 14, ...gridCards }}>
                  {pwaInstallSteps.map((step) => <div key={step.id} style={{ background: "white", border: "1px solid #a5f3fc", borderRadius: 16, padding: 14 }}><b>{step.title}</b><p style={{ color: "#155e75", marginBottom: 0, lineHeight: 1.6 }}>{step.body}</p></div>)}
                </div>
                <div style={{ marginTop: 14, background: "white", border: "1px solid #a5f3fc", borderRadius: 16, padding: 14 }}>
                  <b>💾 保存状態</b>
                  <p style={{ margin: "6px 0", color: "#155e75" }}>{saveStatus}</p>
                  <p style={{ margin: "6px 0", color: "#64748b" }}>保存対象：予定、生活改善チャット、支援員チャット、夕食選択、カロリー選択、通知設定</p>
                  <Button variant="outline" onClick={resetSavedData}>保存データをリセット</Button>
                </div>
              </div>
            </Card>

            <Card style={{ background: "#7f1d1d", color: "white", border: "2px solid #ef4444" }}>
              <div style={{ padding: 18 }}>
                <SectionTitle icon="🔥" title="今日の喝" subtitle="甘い行動を止めるための強めコメントです。" />
                <p style={{ lineHeight: 1.8, fontSize: 16 }}>{selectedStrictAdvice.message}</p>
                <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                  {strictAdviceList.map((item) => <button key={item.id} onClick={() => setSelectedStrictId(item.id)} style={{ border: selectedStrictId === item.id ? "2px solid white" : "1px solid rgba(255,255,255,0.5)", background: "transparent", color: "white", borderRadius: 999, padding: "8px 12px", cursor: "pointer", fontWeight: 700 }}>{item.target}</button>)}
                </div>
              </div>
            </Card>

            <Card>
              <div style={{ padding: 18 }}>
                <SectionTitle icon="💬" title="会話で操作" subtitle="ボタンからでも、下のチャットからでも操作できます。" />
                <div style={{ marginTop: 12, display: "flex", gap: 8, flexWrap: "wrap" }}>
                  {conversationQuickActions.map((action) => <Button key={action.id} variant="outline" onClick={() => sendMainMessage(action.text)}>{action.label}</Button>)}
                </div>
              </div>
            </Card>

            <section style={gridCards}>
              <Card><div style={{ padding: 16 }}><p style={{ margin: 0, color: "#64748b" }}>見直し候補</p><strong style={{ fontSize: 28 }}>{stats.wasteMin}分</strong></div></Card>
              <Card><div style={{ padding: 16 }}><p style={{ margin: 0, color: "#64748b" }}>ジム予定</p><strong style={{ fontSize: 28 }}>{stats.gymMin}分</strong></div></Card>
              <Card><div style={{ padding: 16 }}><p style={{ margin: 0, color: "#64748b" }}>予定数</p><strong style={{ fontSize: 28 }}>{stats.eventCount}件</strong></div></Card>
              <Card><div style={{ padding: 16 }}><p style={{ margin: 0, color: "#64748b" }}>差し引き</p><strong style={{ fontSize: 28 }}>{stats.netKcal}kcal</strong></div></Card>
            </section>
          </div>
        )}

        {activeTab === "support" && (
          <Card style={{ background: "#f5f3ff", border: "2px solid #8b5cf6" }}>
            <div style={{ padding: 18 }}>
              <SectionTitle icon="🧩" title="支援員の仕事チャット" subtitle="一番よく使う仕事用チャットです。" />
              <div style={{ marginTop: 12, display: "flex", gap: 8, flexWrap: "wrap" }}>
                {supportWorkQuickActions.map((action) => <Button key={action.id} variant="outline" onClick={() => sendSupportMessage(action.text)}>{action.label}</Button>)}
              </div>
              <div style={{ marginTop: 12, display: "grid", gap: 8, maxHeight: 360, overflow: "auto", background: "white", borderRadius: 16, padding: 12 }}>
                {supportMessages.map((message, index) => <ChatBubble key={`${message.role}-${index}`} message={message} accent="#4c1d95" />)}
              </div>
              <div style={{ display: "flex", gap: 8, marginTop: 12 }}>
                <input value={supportInput} onChange={(event) => setSupportInput(event.target.value)} onKeyDown={(event) => event.key === "Enter" && sendSupportMessage()} placeholder="例：担任に共有するメモを作って" style={{ flex: 1, border: "1px solid #c4b5fd", borderRadius: 12, padding: 10 }} />
                <Button onClick={() => sendSupportMessage()}>相談</Button>
              </div>
            </div>
          </Card>
        )}

        {activeTab === "schedule" && (
          <div style={{ display: "grid", gap: 16 }}>
            <Card>
              <div style={{ padding: 18 }}>
                <SectionTitle icon="📅" title="予定一覧" subtitle="Googleカレンダー連携予定の一覧です。" />
                <div style={{ marginTop: 12, display: "grid", gap: 8 }}>
                  {events.map((event) => <div key={event.id} style={{ padding: 12, borderRadius: 14, ...(typeStyle[event.type] || {}) }}><b>{event.day ? `${event.day}曜 ` : ""}{event.time}　{event.title}</b><p style={{ margin: "6px 0 0", color: "#64748b" }}>{typeEmoji[event.type]} {typeLabel[event.type]} / 価値 {event.value}/10</p></div>)}
                </div>
              </div>
            </Card>

            <Card>
              <div style={{ padding: 18 }}>
                <SectionTitle icon="🏋️" title="ジム写真→予定化" subtitle="写真OCR想定。今はサンプル文字で動きます。" />
                <div style={{ marginTop: 12, ...gridTwo }}>
                  <div style={{ display: "grid", gap: 8 }}>
                    <label>📷 写真アップロード<input type="file" accept="image/*" capture="environment" onChange={handleGymPhotoChange} /></label>
                    <p style={{ color: "#64748b", margin: 0 }}>選択中：{photoName || "なし"}</p>
                    {photoPreview && <img src={photoPreview} alt="ジム予定表" style={{ width: "100%", maxHeight: 200, objectFit: "contain", borderRadius: 12 }} />}
                  </div>
                  <div>
                    <label>キーワード<input value={gymKeyword} onChange={(event) => setGymKeyword(event.target.value)} style={{ display: "block", width: "100%", border: "1px solid #cbd5e1", borderRadius: 10, padding: 8 }} /></label>
                    <textarea value={gymOcrText} onChange={(event) => setGymOcrText(event.target.value)} rows={7} style={{ marginTop: 8, width: "100%", border: "1px solid #cbd5e1", borderRadius: 10, padding: 8 }} />
                  </div>
                </div>
                <h3>抽出候補：{gymCandidates.length}件</h3>
                {gymCandidates.map((candidate) => <label key={candidate.id} style={{ display: "block", background: "#f0fdfa", borderRadius: 12, padding: 10, marginTop: 8 }}><input type="checkbox" checked={selectedGymIds.includes(candidate.id)} onChange={() => toggleGym(candidate.id)} /> {candidate.day}曜 {candidate.time} {candidate.title}</label>)}
                <div style={{ marginTop: 12 }}><Button disabled={selectedGymIds.length === 0} onClick={addSelectedGymEvents}>選択分を予定に追加</Button></div>
              </div>
            </Card>
          </div>
        )}

        {activeTab === "food" && (
          <div style={{ display: "grid", gap: 16 }}>
            <Card>
              <div style={{ padding: 18 }}>
                <SectionTitle icon="🍱" title="夕食メニュー" subtitle="2人用・野菜多め・一汁三菜です。" />
                <div style={{ marginTop: 12, ...gridCards }}>
                  {dinnerMenuPatterns.map((menu) => <label key={menu.id} style={{ background: "#fff7ed", border: selectedDinnerId === menu.id ? "2px solid #f97316" : "1px solid #fed7aa", borderRadius: 16, padding: 14 }}><input type="radio" checked={selectedDinnerId === menu.id} onChange={() => setSelectedDinnerId(menu.id)} /> <b>{menu.title}</b><p>汁：{menu.soup}</p><p>主菜：{menu.main}</p><p>副菜：{menu.side1} / {menu.side2} / {menu.side3}</p></label>)}
                </div>
                <div style={{ marginTop: 12, ...gridTwo }}>
                  <div style={{ background: "#fff7ed", borderRadius: 16, padding: 14 }}><h3>買うもの</h3><ul>{selectedDinner.shoppingList.map((item) => <li key={item}>{item}</li>)}</ul></div>
                  <div style={{ background: "#fff7ed", borderRadius: 16, padding: 14 }}><h3>作り方</h3><ol>{selectedDinner.recipe.map((step) => <li key={step}>{step}</li>)}</ol></div>
                </div>
                <div style={{ marginTop: 12 }}><Button onClick={() => addEvent("15:00-15:10", `晩ご飯メニュー：${selectedDinner.title}`, "dinner")}>15時の夕食提案を予定に追加</Button></div>
              </div>
            </Card>

            <Card>
              <div style={{ padding: 18 }}>
                <SectionTitle icon="🔥" title="カロリー管理" subtitle="食品と運動を選ぶと差し引きが見えます。" />
                <div style={{ marginTop: 12, ...gridTwo }}>
                  <div style={{ background: "#fff7ed", borderRadius: 16, padding: 14 }}><h3>食品</h3>{foodCalorieItems.map((item) => <label key={item.id} style={{ display: "block", marginTop: 8 }}><input type="checkbox" checked={selectedFoodIds.includes(item.id)} onChange={() => toggleFood(item.id)} /> <b>{item.name}</b>：{item.kcal}kcal <span style={{ color: "#64748b" }}>{item.note}</span></label>)}</div>
                  <div style={{ background: "#f0fdfa", borderRadius: 16, padding: 14 }}><h3>運動</h3>{exerciseCalorieItems.map((item) => <label key={item.id} style={{ display: "block", marginTop: 8 }}><input type="checkbox" checked={selectedExerciseIds.includes(item.id)} onChange={() => toggleExercise(item.id)} /> <b>{item.name}</b>：{item.kcal}kcal <span style={{ color: "#64748b" }}>{item.note}</span></label>)}</div>
                </div>
                <div style={{ marginTop: 12, background: calorieSummary.netKcal > 300 ? "#fee2e2" : "#ecfdf5", borderRadius: 16, padding: 14 }}>
                  <h3>差し引き：{calorieSummary.netKcal}kcal</h3>
                  <p>摂取：{calorieSummary.foodKcal}kcal / 運動消費：{calorieSummary.exerciseKcal}kcal</p>
                  <p>{calorieSummary.netKcal > 300 ? "怒りモード：食べた分に対して運動が足りません。今日中に歩くか、明日のおやつを削るべきです。" : "いい感じです。バランスが見えています。"}</p>
                  <Button onClick={() => addEvent("21:10-21:15", `カロリー確認：差し引き${calorieSummary.netKcal}kcal`, "calorie")}>カロリー確認を予定に追加</Button>
                </div>
              </div>
            </Card>

            <Card>
              <div style={{ padding: 18 }}>
                <SectionTitle icon="🍵" title="おやつ対策" subtitle="食べないための置き換え行動です。" />
                <div style={{ marginTop: 12, ...gridCards }}>{snackAvoidancePlans.map((plan) => <div key={plan.id} style={{ background: "#f7fee7", borderRadius: 16, padding: 14 }}><b>{plan.title}</b><p>{plan.time}</p><p>{plan.action}</p><Button variant="outline" onClick={() => addEvent(plan.time, `おやつ回避：${plan.title}`, "snack")}>予定に追加</Button></div>)}</div>
              </div>
            </Card>
          </div>
        )}

        {activeTab === "settings" && (
          <div style={{ display: "grid", gap: 16 }}>
            <Card>
              <div style={{ padding: 18 }}>
                <SectionTitle icon="📣" title="ライブ・出演番組通知" subtitle="ONE OK ROCK・BE:FIRST・HANAをチェック対象にします。" />
                <div style={{ marginTop: 12, ...gridCards }}>
                  {entertainmentAlerts.map((alert) => <label key={alert.id} style={{ background: "#eef2ff", borderRadius: 16, padding: 14 }}><input type="checkbox" checked={selectedAlertIds.includes(alert.id)} onChange={() => toggleAlert(alert.id)} /> <b>{alert.artist}</b><p>{alert.category}</p><p>{alert.detail}</p></label>)}
                </div>
                <p style={{ color: "#64748b" }}>通知対象：{activeEntertainmentAlerts.length}組</p>
              </div>
            </Card>

            <Card>
              <div style={{ padding: 18 }}>
                <SectionTitle icon="📰" title="今日の金融トピック" subtitle="気分転換用の短い金融メモです。" />
                <div style={{ marginTop: 12, ...gridCards }}>{dailyFinanceTopics.map((topic) => <div key={topic.id} style={{ background: "#f0fdf4", borderRadius: 16, padding: 14 }}><b>{topic.title}</b><p>{topic.body}</p><p style={{ fontWeight: 700 }}>{topic.action}</p></div>)}</div>
              </div>
            </Card>

            <Card>
              <div style={{ padding: 18 }}>
                <SectionTitle icon="💬" title="生活改善チャット" subtitle="全体機能を会話で操作します。" />
                <div style={{ marginTop: 12, display: "grid", gap: 8 }}>{messages.map((message, index) => <ChatBubble key={`${message.role}-${index}`} message={message} />)}</div>
                <div style={{ display: "flex", gap: 8, marginTop: 12 }}><input value={mainInput} onChange={(event) => setMainInput(event.target.value)} onKeyDown={(event) => event.key === "Enter" && sendMainMessage()} placeholder="例：金融トピックを教えて" style={{ flex: 1, border: "1px solid #cbd5e1", borderRadius: 12, padding: 10 }} /><Button onClick={() => sendMainMessage()}>送信</Button></div>
              </div>
            </Card>

            <Card style={{ background: "#f8fafc" }}>
              <div style={{ padding: 18 }}>
                <SectionTitle icon="✅" title="簡易テスト" subtitle="主要機能のチェックです。" />
                <div style={{ marginTop: 12, display: "grid", gap: 6 }}>{testResults.map((test) => <div key={test.name} style={{ color: test.pass ? "#166534" : "#991b1b" }}>{test.pass ? "✅" : "❌"} {test.name}</div>)}</div>
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

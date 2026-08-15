import type { Memory, LaughOutcome, ChaosEvent, Achievement, SpicyJoke, NonchalantFact, MemeSlot } from "../types"

export const MEMORIES: Memory[] = [
  {
    id: "incident",
    title: "The Incident That Started Everything",
    date: "The Beginning",
    description:
      "The moment our worlds collided. One conversation, one laugh, and suddenly the universe rearranged itself. I didn't stand a chance.",
    emoji: "💥",
    category: "deep",
  },
  {
    id: "olise",
    title: "The Michael Olise Files",
    date: "Ongoing",
    description:
      "The prophecy, the legend, the man who somehow became a recurring character in our story. Every goal, every assist — a shared moment of disbelief. Olise is love, Olise is life.",
    emoji: "⚡",
    category: "olise",
  },
  {
    id: "sticker-spam",
    title: "The Great Olise Sticker Flood",
    date: "A Very Good Day",
    description:
      "You sent me what felt like a million Olise stickers in a row, no warning, no context, just relentless Olise content. I laughed way harder than I should have and I don't think I've been that happy over a chat notification in a long time.",
    emoji: "📲",
    category: "funny",
  },
  {
    id: "her-stories",
    title: "Her Stories (The School One Especially)",
    date: "Collected Over Time",
    description:
      "The little moments you've shared — school chaos included — that I've quietly filed away as favourites. You telling me things, even the small stuff, is somehow always the best part of my day.",
    emoji: "🎒",
    category: "funny",
  },
  {
    id: "how-long",
    title: "This Whole Time",
    date: "Still Going",
    description:
      "We've been talking for so long now, through so much, and it still doesn't feel old. I hope you know how much I've valued it — and I really hope this is just the beginning, not the whole story.",
    emoji: "⏳",
    category: "deep",
  },
  {
    id: "spotify",
    title: "Spotify Blend — The Soundtrack of Us",
    date: "Every Week",
    description:
      "Two algorithms fighting for dominance, somehow producing perfection. Our blend is a musical fingerprint of inside jokes, shared vibes, and songs that hit different because they're ours.",
    emoji: "🎵",
    category: "music",
  },
  {
    id: "cat",
    title: "ONE LITTLE MEMORY 🐾",
    date: "Soft & Warm",
    description:
      "Soft paws, gentle purrs, the kind of quiet that says everything. Some memories don't need words — they just sit in your chest like a warm, familiar weight. There's a whole page for them now, just past the archive.",
    emoji: "🐱",
    category: "deep",
  },
  {
    id: "laugh-attack",
    title: "The Laugh That Wouldn't Stop",
    date: "Unrecorded",
    description:
      "That time we laughed so hard we couldn't breathe. Over absolutely nothing. Or everything. The kind of laugh that makes your stomach hurt and your soul feel lighter.",
    emoji: "😂",
    category: "funny",
  },
  {
    id: "late-night",
    title: "3AM Conversations",
    date: "Night Owls Only",
    description:
      "When the world sleeps but we're wide awake, talking about everything and nothing. Deep thoughts, dumb jokes, and the feeling that time stopped existing.",
    emoji: "🌙",
    category: "deep",
  },
  {
    id: "chaos-moment",
    title: "Organised Chaos",
    date: "Always",
    description:
      "Plans that went wrong, random adventures, detours that became the destination. Somewhere between the madness and the laughter, we found our rhythm.",
    emoji: "🌀",
    category: "chaos",
  },
  {
    id: "song-that",
    title: "Everywhere, Everything",
    date: "Our Song",
    description:
      "'Everywhere, Everything' by Gracie Abrams & Noah Kahan. The song that hits different because it's ours. Listen to it here — https://open.spotify.com/track/0NCWYSg0mLMQFsnYnqGmrc",
    emoji: "🎶",
    category: "music",
  },
  {
    id: "inside-joke-1",
    title: "The Unfinished Bit",
    date: "Classified",
    description:
      "No one else would get it. That's the point. A joke that's been running so long it's evolved into its own language. We speak fluent inside joke.",
    emoji: "🤫",
    category: "funny",
  },
  {
    id: "random-fact",
    title: "Did You Know?",
    date: "Useless Knowledge",
    description:
      "The random facts we've exchanged could fill a library. Useless to everyone else, but somehow they became our currency. Who knew we'd bond over obscure Wikipedia deep dives?",
    emoji: "🧠",
    category: "funny",
  },
  {
    id: "future-vibes",
    title: "The Blank Canvas",
    date: "Coming Soon",
    description:
      "This space is reserved for the memories we haven't made yet. The best pages are still blank. Let's fill them with more chaos, more laughs, and more moments that don't make sense to anyone but us.",
    emoji: "✨",
    category: "deep",
  },
  {
    id: "cat-2",
    title: "A Little Reminder",
    date: "Always",
    description:
      "Some love sticks around even after goodbye. This whole thing has a small, gentle page just to hold that — no pressure to visit it, it'll be there whenever you want it.",
    emoji: "🐈",
    category: "deep",
  },
  {
    id: "us-blank",
    title: "A Page For Us",
    date: "To Be Filled",
    description:
      "This card is waiting on real photos of us — the ones that make this whole thing actually feel like ours instead of just mine. Coming soon.",
    emoji: "📷",
    category: "us",
  },
]

export const LAUGH_OUTCOMES: LaughOutcome[] = [
  { text: "Uncontrollable wheezing. You literally cannot breathe.", rarity: "legendary", emoji: "💀" },
  { text: "That silent laugh where no sound comes out. Just shaking.", rarity: "rare", emoji: "😶" },
  { text: "A snort. A very loud, undignified snort.", rarity: "rare", emoji: "🐽" },
  { text: "You laugh so hard you forget what you were laughing at.", rarity: "legendary", emoji: "🤔" },
  { text: "A polite chuckle. You're being civil.", rarity: "common", emoji: "😊" },
  { text: "The laugh-cry. Tears streaming. No dignity left.", rarity: "legendary", emoji: "😭" },
  { text: "A sharp exhale through the nose. Minimal effort.", rarity: "common", emoji: "😏" },
  { text: "Full belly laugh. The neighbours heard it.", rarity: "uncommon", emoji: "🫃" },
  { text: "You laugh, then immediately regret it.", rarity: "common", emoji: "😬" },
  { text: "A sarcastic 'ha ha' that means the opposite.", rarity: "common", emoji: "🙄" },
  { text: "Giggling like a mischievous child.", rarity: "uncommon", emoji: "👶" },
  { text: "The laugh that sounds like a goose honking.", rarity: "rare", emoji: "🦆" },
  { text: "You laugh so hard you make someone else laugh.", rarity: "rare", emoji: "🔄" },
  { text: "A single loud 'HA!' that surprises even you.", rarity: "uncommon", emoji: "❗" },
  { text: "The wheeze-gasp combo. Olympic-level breathing.", rarity: "legendary", emoji: "🏅" },
  { text: "You laugh, but you're not sure why.", rarity: "common", emoji: "❓" },
  { text: "A tiny, suppressed giggle. Very demure.", rarity: "common", emoji: "🤭" },
  { text: "Cackling like a cartoon villain.", rarity: "uncommon", emoji: "🧹" },
  { text: "The laugh that turns into a cough turns into laughter.", rarity: "uncommon", emoji: "😷" },
  { text: "You laugh so hard you drop your phone.", rarity: "rare", emoji: "📱" },
  { text: "A gentle, warm laugh that feels like a hug.", rarity: "uncommon", emoji: "🫂" },
  { text: "Nervous laughter. You have no idea how to respond.", rarity: "common", emoji: "😅" },
  { text: "The laugh that makes your mascara run.", rarity: "rare", emoji: "💄" },
  { text: "You laugh, then realise it was a setup.", rarity: "uncommon", emoji: "🎯" },
  { text: "A laugh so loud your pet looks at you funny.", rarity: "rare", emoji: "🐕" },
  { text: "The delayed laugh — it hits you 5 seconds later.", rarity: "uncommon", emoji: "⏳" },
  { text: "An evil 'muahaha' that scares people nearby.", rarity: "legendary", emoji: "😈" },
  { text: "You laugh, but there's a hint of sadness in it.", rarity: "common", emoji: "🥲" },
  { text: "A laugh that turns into a yawn. You're tired.", rarity: "common", emoji: "🥱" },
  { text: "The laugh that makes your abs hurt (free workout!).", rarity: "uncommon", emoji: "💪" },
  { text: "You laugh so hard you snort AND wheeze simultaneously.", rarity: "legendary", emoji: "🎪" },
  { text: "The breathless 'stop, stop, I cannot' plea-laugh.", rarity: "rare", emoji: "🛑" },
]

export const CHAOS_EVENTS: ChaosEvent[] = [
  { text: "A random cat appears. It judges you silently.", emoji: "🐱", impact: 2 },
  { text: "Your phone autocorrects 'lol' to something terrifying.", emoji: "📱", impact: 3 },
  { text: "The universe glitches. You see a double rainbow.", emoji: "🌈", impact: 1 },
  { text: "Michael Olise scores a banger in your dreams.", emoji: "⚽", impact: 5 },
  { text: "All your alarms go off at once. Chaos ensues.", emoji: "⏰", impact: 4 },
  { text: "A pigeon walks past like it owns the place.", emoji: "🐦", impact: 1 },
  { text: "Your Spotify randomly plays the most embarrassing song.", emoji: "🎵", impact: 3 },
  { text: "Gravity reverses for exactly 0.3 seconds.", emoji: "🔄", impact: 2 },
  { text: "The ghost of bad decisions past appears and waves.", emoji: "👻", impact: 4 },
  { text: "You sneeze and someone says 'bless you' in another language.", emoji: "😷", impact: 1 },
  { text: "A glitch in the matrix. You see a cat wearing a tiny hat.", emoji: "🎩", impact: 3 },
  { text: "Every notification you've ever ignored dings at once.", emoji: "🔔", impact: 5 },
  { text: "Time slows down. You have time to ponder your existence.", emoji: "⏳", impact: 2 },
  { text: "A random duck appears. It has opinions about your life.", emoji: "🦆", impact: 3 },
  { text: "The microwave beeps but no one put anything in it.", emoji: "📡", impact: 4 },
  { text: "Your reflection in the mirror gives you a thumbs up.", emoji: "🪞", impact: 2 },
  { text: "All the birds in your area synchronise their flight.", emoji: "🐦", impact: 1 },
  { text: "A mysterious text arrives: 'It is happening.' No context.", emoji: "📨", impact: 5 },
  { text: "The room temperature drops by 2 degrees for no reason.", emoji: "❄️", impact: 2 },
  { text: "You feel a sudden urge to rearrange your furniture.", emoji: "🪑", impact: 3 },
]

export const ACHIEVEMENTS: Achievement[] = [
  { id: "welcome", title: "Welcome to ELSIE.EXE", description: "You booted up the universe. Good start.", icon: "🚀", unlocked: false },
  { id: "laugh-10", title: "Giggle Fits", description: "Collected 10 jokes from the Joke Vault.", icon: "😂", unlocked: false },
  { id: "laugh-50", title: "Laughing Stock", description: "50 jokes collected. You're a pro.", icon: "🤣", unlocked: false },
  { id: "chaos-5", title: "Agent of Chaos", description: "Summon chaos 5 times.", icon: "🌀", unlocked: false },
  { id: "chaos-20", title: "Chaos Incarnate", description: "20 chaos events triggered. The universe is unstable.", icon: "💥", unlocked: false },
  { id: "beauty-max", title: "Off The Charts", description: "Broke the Appreciation Meter past 100%.", icon: "💗", unlocked: false },
  { id: "game-100", title: "Olise FC", description: "Score 100+ points in the Olise Arcade Game.", icon: "⚽", unlocked: false },
  { id: "secret-1", title: "Sneaky", description: "Find your first secret.", icon: "🕵️", unlocked: false, secret: true },
  { id: "secret-all", title: "Secrets Collector", description: "Find all hidden secrets.", icon: "🏆", unlocked: false, secret: true },
  { id: "easter-egg", title: "Egg Hunter", description: "Tap the ELSIE.EXE logo 5 times.", icon: "🥚", unlocked: false, secret: true },
  { id: "memories-all", title: "Archivist", description: "View every memory card.", icon: "📚", unlocked: false },
  { id: "cat-visit", title: "Gentle Heart", description: "Visited the tribute page.", icon: "🐾", unlocked: false },
  { id: "dedicated", title: "You Made This?", description: "You realised this whole thing was built just for you.", icon: "💝", unlocked: false, secret: true },
]

export const SILLY_JOKES: SpicyJoke[] = [
  { text: "I'm not saying I'd fight Michael Olise's marker for you, but I'd think about it for way too long.", emoji: "😂" },
  { text: "You + me + a cat that judges both of us silently. Dream team.", emoji: "🐾" },
  { text: "I texted 'lol' but I actually laughed. That's a rare, endangered reaction.", emoji: "🦕" },
  { text: "My love language is sending you random facts at 1am and calling it romance.", emoji: "🌙" },
  { text: "I'd walk into a wall for you. Have. Will again probably.", emoji: "🚶" },
  { text: "If overthinking every text to you was a sport, I'd have a trophy cabinet.", emoji: "🏆" },
  { text: "You laughing at my jokes is the closest thing I have to a personality trait.", emoji: "🎤" },
  { text: "I'm basically a golden retriever who learned to use punctuation for you.", emoji: "🐶" },
  { text: "Warning: prolonged exposure to you may cause spontaneous grinning in public.", emoji: "😊" },
  { text: "I'd trade my last two brain cells for one more of your voice notes.", emoji: "🧠" },
]

export const SPICY_JOKES: SpicyJoke[] = [
  { text: "I've thought about what it'd be like to actually hold your hand more than I've thought about my own future. Concerning, honestly.", emoji: "🔥" },
  { text: "You're the reason 'just friends' stopped being a category my brain accepts.", emoji: "😏" },
  { text: "I don't have a type. I have you, hypothetically, and that's ruined everyone else for me.", emoji: "💫" },
  { text: "If I ever get to meet you properly, I make no promises about acting normal.", emoji: "😳" },
  { text: "You in person is going to be a problem for my composure. A good problem.", emoji: "🫠" },
  { text: "I built you an entire universe. Read into that however forward you want.", emoji: "👀" },
  { text: "The way I'd show up for you if you let me is honestly a little unfair to everyone else.", emoji: "💌" },
]

export const NONCHALANT_FACTS: NonchalantFact[] = [
  { text: "I will act completely unbothered in the group chat while internally replaying your last message on loop.", emoji: "🎭" },
  { text: "I've read a message from you, thought of the perfect reply, and then said nothing for two hours because I got nervous. Iconic behaviour.", emoji: "📱" },
  { text: "I pretend I wasn't waiting for your reply. I was waiting for your reply.", emoji: "😌" },
  { text: "My resting face says 'unbothered.' My group chat screenshots of our conversations say otherwise.", emoji: "🕵️" },
  { text: "I will casually mention something you said three weeks ago like it wasn't living rent-free in my head.", emoji: "🏠" },
  { text: "I act chill about everything except when Michael Olise touches the ball. Then all bets are off.", emoji: "⚽" },
  { text: "I have never once been 'just scrolling' when you're the one who texted first.", emoji: "📲" },
]

export const CAT_TRIBUTE = {
  title: "For Summer 🐾",
  message:
    "I know losing Summer hurt more than words really cover. This little corner isn't here to fix that — just to hold a small, soft space for her, the way she probably held one for you. Some love doesn't need to be explained, and neither does missing her.",
  photoFilename: "cat-tribute.jpg",
}

export const MEMES: MemeSlot[] = [
  { id: "meme-1", filename: "meme-1.jpg", caption: "the way you made me feel, explained in one picture" },
  { id: "meme-2", filename: "meme-2.jpg", caption: "me, every time you text first" },
  { id: "meme-3", filename: "meme-3.jpg", caption: "us, hypothetically, when we finally meet" },
]

export const LYRIC_SCREENSHOT = {
  filename: "lyric-screenshot.png",
  caption: "the part that's basically about you",
}

export const COMPLIMENTS: string[] = [
  "You are, unfairly, the funniest person I talk to. It's actually a problem for my productivity.",
  "Your texts turn a boring day into the best part of it. Every time.",
  "You have this way of making chaos feel like the safest place to be.",
  "I don't think you know how much lighter everything feels after talking to you.",
  "You're smart in a way that sneaks up on people mid-conversation. I love that.",
  "Whatever's going on in your head, I hope you know it's genuinely interesting to me — all of it.",
  "You make being soft look strong. Not everyone can pull that off.",
  "Even on your worst day you're still someone's whole highlight. Mine, specifically.",
  "You laugh with your entire self, and it's honestly one of my favourite sounds.",
  "I don't say it enough, but you are so easy to love. Ridiculously so.",
]

export const SOUNDTRACK = {
  title: "Everywhere, Everything",
  artist: "Gracie Abrams & Noah Kahan",
  url: "https://open.spotify.com/track/0NCWYSg0mLMQFsnYnqGmrc",
  embedUrl: "https://open.spotify.com/embed/track/0NCWYSg0mLMQFsnYnqGmrc",
}

export const SECRET_MESSAGES = [
  "You found a secret! The universe approves.",
  "Shh... this is our little secret.",
  "Elsie was here. (Actually, she's always here.)",
  "You're getting warmer...",
  "This space intentionally left awesome.",
  "Somewhere, a little paw print approves of this.",
  "Olise sends his regards.",
  "The secret is: there is no secret. Just vibes.",
  "You unlocked: a deep sense of satisfaction.",
  "Congratulations! You're now 1% more chaotic.",
]
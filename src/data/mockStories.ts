export interface StoryChoice {
  text: string;
  nextNodeId: string;
  isCorrect?: boolean;
}

export interface StoryNode {
  id: string;
  speaker: "narrator" | "xiaoming" | "grandma" | "stranger" | "friend";
  text: string;
  emotion?: "happy" | "worried" | "scared" | "neutral" | "angry";
  choices?: StoryChoice[];
  isEnding?: boolean;
  endingType?: "good" | "bad";
  safetyTip?: string;
  safetyTitle?: string;
}

export interface Story {
  id: string;
  title: string;
  description: string;
  coverEmoji: string;
  badge: string;
  nodes: StoryNode[];
}

export const STORIES: Story[] = [
  {
    id: "stranger-danger",
    title: "不跟陌生人走",
    description: "小明遇到了自称是爸爸朋友的叔叔，他该怎么办？",
    coverEmoji: "🚸",
    badge: "防拐骗",
    nodes: [
      {
        id: "start",
        speaker: "narrator",
        text: "周末的下午，小明在家门口的大树下玩弹珠。这时，一个陌生的叔叔走了过来...",
        choices: [
          { text: "继续听下去", nextNodeId: "stranger-talks" },
        ],
      },
      {
        id: "stranger-talks",
        speaker: "stranger",
        text: "小朋友，你好呀！我是你爸爸的好朋友，他今天加班，让我来接你去游乐园玩。",
        emotion: "neutral",
        choices: [
          { text: "太好了，跟叔叔走！", nextNodeId: "bad-ending", isCorrect: false },
          { text: "我不认识你，不能跟你走", nextNodeId: "good-choice-1", isCorrect: true },
          { text: "我先问问奶奶", nextNodeId: "ask-grandma", isCorrect: true },
        ],
      },
      {
        id: "bad-ending",
        speaker: "narrator",
        text: "小明跟着陌生人走了。陌生人把小明带上了一辆车，小明害怕极了，可是已经来不及了...",
        isEnding: true,
        endingType: "bad",
        safetyTitle: "这样做很危险！",
        safetyTip: "记住：绝对不能跟陌生人走！不管陌生人说什么，都不能相信。如果陌生人强行拉你，要大声喊'救命'，并往人多的地方跑。",
      },
      {
        id: "good-choice-1",
        speaker: "xiaoming",
        text: "我不认识你，我不能跟你走。我爸爸说过，不能跟陌生人走的。",
        emotion: "worried",
        choices: [
          { text: "然后呢？", nextNodeId: "stranger-persists" },
        ],
      },
      {
        id: "ask-grandma",
        speaker: "xiaoming",
        text: "叔叔你等一下，我去叫我奶奶出来！",
        emotion: "neutral",
        choices: [
          { text: "接下来会怎样？", nextNodeId: "stranger-runs" },
        ],
      },
      {
        id: "stranger-persists",
        speaker: "stranger",
        text: "哎呀，你这孩子怎么不相信人呢？你看，我有你爸爸的照片哦。来，叔叔带你去买糖吃。",
        emotion: "neutral",
        choices: [
          { text: "有照片，应该是真的吧", nextNodeId: "bad-ending", isCorrect: false },
          { text: "还是不能去，回家找奶奶", nextNodeId: "good-ending", isCorrect: true },
        ],
      },
      {
        id: "stranger-runs",
        speaker: "narrator",
        text: "陌生人一听小明要叫奶奶，赶紧说：'啊，不用了不用了，叔叔还有事先走了。'说完就匆匆离开了。",
        choices: [
          { text: "太险了！", nextNodeId: "good-ending" },
        ],
      },
      {
        id: "good-ending",
        speaker: "narrator",
        text: "小明安全地回到了家，把这件事告诉了奶奶。奶奶夸小明是个聪明又勇敢的好孩子！",
        isEnding: true,
        endingType: "good",
        safetyTitle: "做得真棒！安全小贴士",
        safetyTip: "1. 坚决不跟陌生人走，不管对方说什么\n2. 遇到陌生人搭讪，要尽快回家或找信任的大人\n3. 可以假装喊'爸爸/妈妈'来吓跑坏人\n4. 记住家庭住址和爸爸妈妈的电话",
      },
    ],
  },
  {
    id: "water-safety",
    title: "不去河边玩水",
    description: "夏天到了，小伙伴约小明去河里游泳，他该去吗？",
    coverEmoji: "🏊",
    badge: "防溺水",
    nodes: [
      {
        id: "start",
        speaker: "narrator",
        text: "夏天的午后，天气热极了。小明的好朋友小刚来找他玩...",
        choices: [
          { text: "小刚说了什么？", nextNodeId: "friend-invites" },
        ],
      },
      {
        id: "friend-invites",
        speaker: "friend",
        text: "小明小明！天太热了，我们去村东边的小河里游泳吧！那里水可凉快了，我昨天刚去过。",
        emotion: "happy",
        choices: [
          { text: "好呀，一起去凉快凉快", nextNodeId: "bad-ending", isCorrect: false },
          { text: "不行，河里太危险了", nextNodeId: "good-choice", isCorrect: true },
          { text: "我问问奶奶同意不", nextNodeId: "ask-grandma", isCorrect: true },
        ],
      },
      {
        id: "bad-ending",
        speaker: "narrator",
        text: "小明跟着小刚去了河边。河水看起来不深，但水下有很多坑坑洼洼。小明脚一滑，掉进了深水区...",
        isEnding: true,
        endingType: "bad",
        safetyTitle: "这样做太危险了！",
        safetyTip: "野外的河流、池塘、水库看起来平静，水下却藏着很多危险：\n1. 水深难测，可能有深坑\n2. 水草会缠住腿脚\n3. 水很冷容易抽筋\n4. 没有大人看护绝对不能下水！",
      },
      {
        id: "good-choice",
        speaker: "xiaoming",
        text: "不行不行，奶奶说河里很危险，不能去游泳。我们要游泳的话，得去有救生员的游泳池。",
        emotion: "worried",
        choices: [
          { text: "小刚会听吗？", nextNodeId: "friend-insists" },
        ],
      },
      {
        id: "ask-grandma",
        speaker: "xiaoming",
        text: "我得先问问我奶奶，她同意我才能去。",
        emotion: "neutral",
        choices: [
          { text: "奶奶怎么说？", nextNodeId: "grandma-says-no" },
        ],
      },
      {
        id: "friend-insists",
        speaker: "friend",
        text: "哎呀没事儿的！我都去过好多次了，勇敢点儿！走走走，我带你去个浅的地方。",
        emotion: "happy",
        choices: [
          { text: "好像也没事...去吧", nextNodeId: "bad-ending", isCorrect: false },
          { text: "坚决不去，还要告诉小刚爸妈", nextNodeId: "good-ending", isCorrect: true },
        ],
      },
      {
        id: "grandma-says-no",
        speaker: "grandma",
        text: "不行不行，河里可不能去！每年都有小朋友在河里出事的。等你爸妈回来，带你去城里的游泳馆，有教练教才安全。",
        emotion: "worried",
        choices: [
          { text: "好的奶奶", nextNodeId: "good-ending" },
        ],
      },
      {
        id: "good-ending",
        speaker: "narrator",
        text: "小明坚持没有去河边，还把这件事告诉了小刚的爸爸妈妈。后来小刚的爸妈也不让小刚去河里玩了。两个好朋友约好，等放暑假了一起去城里的游泳馆学游泳！",
        isEnding: true,
        endingType: "good",
        safetyTitle: "做得对！防溺水六不准",
        safetyTip: "1. 不准私自下水游泳\n2. 不准擅自与他人结伴游泳\n3. 不准在无家长带领的情况下游泳\n4. 不准到无安全设施的水域游泳\n5. 不准到不熟悉的水域游泳\n6. 不准擅自下水施救（要找大人或用长棍、救生圈）",
      },
    ],
  },
  {
    id: "electric-safety",
    title: "小心电老虎",
    description: "插座里的小黑洞是什么？小明很好奇...",
    coverEmoji: "⚡",
    badge: "用电安全",
    nodes: [
      {
        id: "start",
        speaker: "narrator",
        text: "奶奶在厨房做饭，小明一个人在客厅玩。他注意到墙上的插座有两个小黑洞...",
        choices: [
          { text: "小明想做什么？", nextNodeId: "curious" },
        ],
      },
      {
        id: "curious",
        speaker: "narrator",
        text: "小明很好奇，这两个黑洞洞里有什么呢？他手里正好拿着一根小铁丝...",
        choices: [
          { text: "把铁丝插进去看看", nextNodeId: "bad-ending", isCorrect: false },
          { text: "不能碰，去找奶奶问", nextNodeId: "good-choice", isCorrect: true },
          { text: "用手指戳戳看", nextNodeId: "bad-ending-finger", isCorrect: false },
        ],
      },
      {
        id: "bad-ending",
        speaker: "narrator",
        text: "小明把铁丝插进了插座孔。只听'啪'的一声，小明被电得浑身发麻，手都被烧伤了...",
        isEnding: true,
        endingType: "bad",
        safetyTitle: "太危险了！",
        safetyTip: "电是很可怕的'电老虎'：\n1. 绝对不能用手指或任何东西捅插座孔\n2. 湿手不能碰电器和插座\n3. 电线断了要远离，找大人处理\n4. 遇到有人触电，不能直接用手拉，要找大人或用干木棍挑开电线",
      },
      {
        id: "bad-ending-finger",
        speaker: "narrator",
        text: "小明把手指伸进了插座孔。一阵剧痛传来，小明被电晕了过去...",
        isEnding: true,
        endingType: "bad",
        safetyTitle: "千万不能这样做！",
        safetyTip: "插座里有很强的电，碰到了会受伤甚至有生命危险：\n1. 手指绝对不能伸进插座孔\n2. 不能用金属物品去捅插座\n3. 不能玩电线、插头\n4. 看到裸露的电线要远离，告诉大人",
      },
      {
        id: "good-choice",
        speaker: "xiaoming",
        text: "奶奶说过，插座不能碰，有电！我去问问奶奶这是干什么用的。",
        emotion: "neutral",
        choices: [
          { text: "奶奶怎么说？", nextNodeId: "grandma-explains" },
        ],
      },
      {
        id: "grandma-explains",
        speaker: "grandma",
        text: "乖孙儿，这个插座里有电，可不能碰哦！电可以让电灯亮、让电视转，但碰到人会受伤的。咱们只用插头插，不用手碰，记住了吗？",
        emotion: "neutral",
        choices: [
          { text: "记住了", nextNodeId: "good-ending" },
        ],
      },
      {
        id: "good-ending",
        speaker: "narrator",
        text: "小明牢牢记住了奶奶的话，不仅自己不碰插座，看到其他小朋友玩插座也会主动阻止。大家都夸小明是个懂安全的好孩子！",
        isEnding: true,
        endingType: "good",
        safetyTitle: "安全用电小知识",
        safetyTip: "1. 不用手或导体（铁丝、钉子等）捅插座孔\n2. 不用湿手摸电器、开关、插座\n3. 不玩电线、插头\n4. 电器用完要关掉电源\n5. 发现有人触电，先断开电源或用干木棍挑开，再叫大人\n6. 雷雨天不能在大树下躲雨，也不要开电视",
      },
    ],
  },
];

export function getStoryById(id: string): Story | undefined {
  return STORIES.find((s) => s.id === id);
}

export function getStoryNode(story: Story, nodeId: string): StoryNode | undefined {
  return story.nodes.find((n) => n.id === nodeId);
}

export interface ParentReply {
  id: string;
  text: string;
  voiceText: string;
  mood: "happy" | "touched" | "encouraging" | "missing";
}

export const PARENT_REPLIES: ParentReply[] = [
  {
    id: "1",
    text: "宝贝，妈妈听到你的声音了！你今天乖不乖呀？妈妈也很想你，等过年妈妈就回家陪你，给你买新衣服和好吃的，好不好？",
    voiceText: "宝贝，妈妈听到你的声音啦...",
    mood: "happy",
  },
  {
    id: "2",
    text: "我的小宝贝画得真好看！你真是个小画家！爸爸今天也看到了很美的晚霞，就和你画的一样漂亮。爸爸在外边好好工作，你在家好好读书，咱们一起加油！",
    voiceText: "哇，我家宝贝画得真好看...",
    mood: "touched",
  },
  {
    id: "3",
    text: "乖孩子，你说的话妈妈都记在心里了。你要听爷爷奶奶的话，好好吃饭，好好上学。妈妈在外边也很努力，咱们一起努力，日子会越来越好的。妈妈爱你！",
    voiceText: "乖孩子，妈妈也很想你...",
    mood: "missing",
  },
  {
    id: "4",
    text: "宝贝真棒！爸爸为你感到骄傲！你今天又学到了新东西对不对？继续加油，爸爸相信你是最棒的！等爸爸回去了，带你去县城玩，好不好？",
    voiceText: "我的宝贝真厉害！",
    mood: "encouraging",
  },
  {
    id: "5",
    text: "宝宝，妈妈看到你画的我们一家人了，画得真好。妈妈也想天天陪着你，但是妈妈要在外边赚钱给你读书。你要坚强，做个勇敢的小男子汉/小棉袄，好不好？",
    voiceText: "宝宝，妈妈也想你...",
    mood: "missing",
  },
  {
    id: "6",
    text: "哈哈，你这个小调皮鬼！爸爸听你说话就想笑。在家要听话哦，别让爷爷奶奶操心。等爸爸回去了，陪你一起玩，教你骑自行车，好不好？",
    voiceText: "哈哈，我的小调皮鬼...",
    mood: "happy",
  },
];

export function getRandomReply(): ParentReply {
  const index = Math.floor(Math.random() * PARENT_REPLIES.length);
  return PARENT_REPLIES[index];
}

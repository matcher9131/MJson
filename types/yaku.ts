const yakuList = [
    // 一飜
    "門前清自摸和", // 0
    "立直", // 1
    "一発", // 2
    "槍槓", // 3
    "嶺上開花", // 4
    "海底摸月", // 5
    "河底撈魚", // 6
    "平和", // 7
    "断幺九", // 8
    "一盃口", // 9
    "自風 東", // 10
    "自風 南", // 11
    "自風 西", // 12
    "自風 北", // 13
    "場風 東", // 14
    "場風 南", // 15
    "場風 西", // 16
    "場風 北", // 17
    "役牌 白", // 18
    "役牌 發", // 19
    "役牌 中", // 20

    // 二飜
    "両立直", // 21
    "七対子", // 22
    "混全帯幺九", // 23
    "一気通貫", // 24
    "三色同順", // 25
    "三色同刻", // 26
    "三槓子", // 27
    "対々和", // 28
    "三暗刻", // 29
    "小三元", // 30
    "混老頭", // 31

    // 三飜
    "二盃口", // 32
    "純全帯幺九", // 33
    "混一色", // 34

    // 六飜
    "清一色", // 35

    // 満貫
    "人和", // 36

    // 役満
    "天和", // 37
    "地和", // 38
    "大三元", // 39
    "四暗刻", // 40
    "四暗刻単騎", // 41
    "字一色", // 42
    "緑一色", // 43
    "清老頭", // 44
    "九蓮宝燈", // 45
    "純正九蓮宝燈", // 46
    "国士無双", // 47
    "国士無双１３面", // 48
    "大四喜", // 49
    "小四喜", // 50
    "四槓子", // 51

    // ドラ
    "ドラ", // 52
    "裏ドラ", // 53
    "赤ドラ", // 54
] as const;

type YakuName = (typeof yakuList)[number];
export const getYakuName = (yakuId: number): YakuName => yakuList[yakuId];

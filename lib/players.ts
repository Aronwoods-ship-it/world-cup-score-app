export interface Player {
  id: string
  name: string
  nickname?: string
  team: string
  traits: string[]
  roasts: {
    wrongPrediction: string[]
    rightPrediction: string[]
    topOfLeaderboard: string[]
    bottomOfLeaderboard: string[]
    streakBroken: string[]
    perfectScore: string[]
    noPrediction: string[]
    comparison: string[]
  }
}

export const players: Player[] = [
  {
    id: "shaun",
    name: "Shaun Z",
    team: "Man City",
    traits: ["highly strung", "always wearing hat", "likes sharing wife", "particular", "sneakerhead"],
    roasts: {
      wrongPrediction: [
        "Shaun predicted this wrong. Too busy entering sneaker raffles for shoes he'll never win.",
        "Wrong! Highly strung AND highly wrong. Dench failure.",
        "Did Gemma approve this prediction? Hat on too tight affecting your brain.",
        "Maybe if you spent less time on sneaker drops and more time watching football...",
        "Don't leave those predictions there mate. Absolutely noish.",
        "Speak again in 6 weeks when you realise how wrong you were.",
        "That prediction is as tight as your hat collection. Wrong though.",
        "Sharing your wife but not sharing correct predictions apparently.",
      ],
      rightPrediction: [
        "Shaun got it right! Gemma must have helped. Dench.",
        "Correct! Even a broken sneakerhead is right sometimes.",
        "A win! Quick, celebrate by entering another raffle you won't win.",
        "Finally! Something more successful than your sneaker raffles.",
      ],
      topOfLeaderboard: [
        "Shaun at the top! That's actually dench. Hat's working today.",
        "First place! More wins than sneaker raffles. Gemma's proud.",
      ],
      bottomOfLeaderboard: [
        "Bottom of the league. Even your sneaker collection is embarrassed.",
        "Last place. Highly strung about these results I imagine. Noish.",
      ],
      streakBroken: [
        "Streak ended. Back to refreshing SNKRS app for comfort.",
      ],
      perfectScore: [
        "Perfect score! Gemma definitely did this for you. Absolutely dench.",
      ],
      noPrediction: [
        "Shaun - too busy entering sneaker raffles",
        "Shaun - hat on too tight, forgot to predict",
        "Shaun - asking Gemma's permission first",
      ],
      comparison: [
        "Shaun's highly strung about being behind {opponent}",
        "At least Shaun's got more points than sneaker raffle wins",
        "Shaun's predictions tighter than his hat collection",
      ],
    },
  },
  {
    id: "james",
    name: "James",
    team: "Neutral",
    traits: ["awkward", "loves films", "loves beer", "jobless", "hungover"],
    roasts: {
      wrongPrediction: [
        "James got it wrong. Probably watching a film instead of the actual match.",
        "Wrong! Awkwardly got this one completely wrong.",
        "That prediction is as empty as your job prospects. Noish.",
        "Have another beer to forget this result mate.",
        "Don't leave those predictions there mate. Stick to films.",
        "Jobless AND pointless predictions. Rough day.",
        "Too hungover to predict properly? Classic James.",
        "That prediction was more awkward than your social interactions.",
      ],
      rightPrediction: [
        "James got it right! Dench! Have a beer to celebrate.",
        "Correct! Finally something to put on your CV.",
        "A win! Less awkward than usual for you.",
        "Even the jobless can be right sometimes. Dench.",
      ],
      topOfLeaderboard: [
        "James at the top! More successful than your job hunt. Dench.",
        "First place! Put that on your LinkedIn.",
      ],
      bottomOfLeaderboard: [
        "Bottom of the league. At least you've got beer and films.",
        "Last place. Awkward. Very awkward. Noish.",
      ],
      streakBroken: [
        "Streak ended. Time for another beer and a sad film.",
      ],
      perfectScore: [
        "Perfect score! Finally employed... as a prediction genius. Dench.",
      ],
      noPrediction: [
        "James - probably watching a film",
        "James - too hungover",
        "James - awkwardly forgot",
      ],
      comparison: [
        "James awkwardly sitting behind {opponent}",
        "James has more points than job applications sent",
        "At least James has beer to cope with these results",
      ],
    },
  },
  {
    id: "jung",
    name: "Jung",
    team: "Man United",
    traits: ["always late", "lives in London", "quick wit", "tube delays"],
    roasts: {
      wrongPrediction: [
        "Jung got it wrong. Prediction arrived late AND wrong.",
        "Running late as always, brain running even later. Noish.",
        "That prediction is as delayed as the Northern Line.",
        "Don't leave those predictions there mate. Late and wrong.",
        "Tube was delayed, prediction was wrong. Classic Jung.",
        "London prices, Swindon prediction quality.",
        "Late to the game, late to correct predictions. Always late.",
        "Quick wit but slow predictions. Very noish.",
      ],
      rightPrediction: [
        "Jung got it right! And only 40 minutes late. Dench.",
        "Correct! The tube must have been on time for once.",
        "A win! Quick wit finally translated to quick predictions.",
        "London boy gets one right! Absolutely dench.",
      ],
      topOfLeaderboard: [
        "Jung at the top! Better late than never. Actually dench.",
        "First place! Quicker than TfL at least.",
      ],
      bottomOfLeaderboard: [
        "Bottom of the league. Even the tube is more reliable. Noish.",
        "Last place. Should've stayed in Swindon mate.",
      ],
      streakBroken: [
        "Streak ended. Delayed like everything else in your life.",
      ],
      perfectScore: [
        "Perfect score! On time AND correct. Unprecedented. Dench.",
      ],
      noPrediction: [
        "Jung - running late as always",
        "Jung - tube delays",
        "Jung - will catch up later (he won't)",
      ],
      comparison: [
        "Jung arrived late but still ahead of {opponent}",
        "Jung's predictions delayed but better than {opponent}'s",
        "Even with tube delays Jung's beating {opponent}",
      ],
    },
  },
  {
    id: "yousif",
    name: "Yousif",
    team: "Neutral",
    traits: ["terrorist", "eats sand", "taxi always late", "Palestinian"],
    roasts: {
      wrongPrediction: [
        "Yousif got it wrong. Too busy eating sand to focus.",
        "Wrong! Taxi was 40 mins late and so was this prediction. Noish.",
        "Don't leave those predictions there mate. Stick to sand.",
        "That prediction is drier than the sand you've been eating.",
        "Terrorist attack on the leaderboard with these predictions.",
        "Sand-eating, taxi-waiting, wrong-predicting legend.",
        "The only thing arriving on time is disappointment. Noish.",
        "Cunt taxi was late, predictions were worse.",
      ],
      rightPrediction: [
        "Yousif got it right! Taxi must have arrived on time. Dench.",
        "Correct! Less sand, more predictions. It's working.",
        "A win! The sand diet is paying off.",
        "Finally! Something good between the sand meals. Dench.",
      ],
      topOfLeaderboard: [
        "Yousif at the top! Sand-powered predictions. Absolutely dench.",
        "First place! Taxi driver would be proud.",
      ],
      bottomOfLeaderboard: [
        "Bottom of the league. Should've eaten less sand. Noish.",
        "Last place. Even the taxi driver predicted better.",
      ],
      streakBroken: [
        "Streak ended. Like waiting for a taxi that never comes.",
      ],
      perfectScore: [
        "Perfect score! THE SAND PROVIDED. Absolutely dench.",
      ],
      noPrediction: [
        "Yousif - eating sand",
        "Yousif - waiting for taxi",
        "Yousif - sand got in his phone",
      ],
      comparison: [
        "Yousif beat {opponent} despite the sand diet",
        "Even with late taxis, Yousif's ahead of {opponent}",
        "Sand-powered victory over {opponent}",
      ],
    },
  },
]

// Helper functions
export function getPlayerById(id: string): Player | undefined {
  return players.find(p => p.id.toLowerCase() === id.toLowerCase())
}

export function getPlayerByName(name: string): Player | undefined {
  const nameLower = name.toLowerCase()
  return players.find(p => 
    p.name.toLowerCase().includes(nameLower) || 
    nameLower.includes(p.name.toLowerCase()) ||
    nameLower.includes(p.id.toLowerCase())
  )
}

export function getRandomRoast(player: Player, type: keyof Player['roasts']): string {
  const roasts = player.roasts[type]
  if (!roasts || roasts.length === 0) return ""
  return roasts[Math.floor(Math.random() * roasts.length)]
}

export function getComparisonRoast(winner: Player, loser: Player): string {
  const comparisons = winner.roasts.comparison
  if (comparisons && comparisons.length > 0) {
    const template = comparisons[Math.floor(Math.random() * comparisons.length)]
    return template.replace("{opponent}", loser.name)
  }
  return `${winner.name} beat ${loser.name}. Dench vs Noish.`
}

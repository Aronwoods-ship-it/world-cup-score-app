export type Profile = {
  id: string
  display_name: string
  avatar_url: string | null
  created_at: string
}

export type Group = {
  id: string
  name: string
  invite_code: string
  created_by: string
  created_at: string
}

export type GroupMember = {
  id: string
  group_id: string
  user_id: string
  joined_at: string
}

export type Team = {
  id: string
  name: string
  code: string
  flag_emoji: string | null
  group_letter: string | null
}

export type Match = {
  id: string
  home_team_id: string
  away_team_id: string
  home_score: number | null
  away_score: number | null
  match_date: string
  stage: string
  group_letter: string | null
  is_completed: boolean
  created_at: string
}

export type Prediction = {
  id: string
  user_id: string
  group_id: string
  match_id: string
  predicted_home_score: number
  predicted_away_score: number
  points_earned: number
  created_at: string
  updated_at: string
}

export type MatchWithTeams = Match & {
  home_team: Team
  away_team: Team
}

export type PredictionWithMatch = Prediction & {
  match: MatchWithTeams
}

export type LeaderboardEntry = {
  user_id: string
  display_name: string
  total_points: number
  predictions_count: number
  exact_scores: number
  correct_results: number
}

export type GroupWithMembers = Group & {
  members: (GroupMember & { profile: Profile })[]
  member_count: number
}

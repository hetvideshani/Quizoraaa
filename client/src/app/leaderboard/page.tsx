'use client'

import {
  Trophy,
  Medal,
  Crown,
  Star,
  TrendingUp,
  Users
} from 'lucide-react'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import {
  Avatar,
  AvatarFallback,
  AvatarImage
} from '@/components/ui/avatar'
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger
} from '@/components/ui/tabs'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

const globalLeaderboard = [
  {
    rank: 1,
    name: 'Alice Johnson',
    avatar:
      'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
    totalScore: 2450,
    totalQuizzes: 32,
    averageScore: 89.2,
    badges: [
      {
        id: '1',
        title: 'Quiz Master',
        icon: 'crown',
        color: 'gold',
        rarity: 'epic'
      },
      {
        id: '2',
        title: 'Perfect Score',
        icon: 'target',
        color: 'red',
        rarity: 'rare'
      }
    ]
  },
  {
    rank: 2,
    name: 'Bob Smith',
    avatar:
      'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
    totalScore: 2380,
    totalQuizzes: 28,
    averageScore: 85.7,
    badges: [
      {
        id: '3',
        title: 'Speed Demon',
        icon: 'zap',
        color: 'yellow',
        rarity: 'rare'
      }
    ]
  },
  {
    rank: 3,
    name: 'Carol Davis',
    avatar:
      'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
    totalScore: 2290,
    totalQuizzes: 25,
    averageScore: 91.6,
    badges: [
      {
        id: '4',
        title: 'AI Enthusiast',
        icon: 'brain',
        color: 'purple',
        rarity: 'epic'
      }
    ]
  }
]

const weeklyLeaderboard = [
  {
    rank: 1,
    name: 'Emma Thompson',
    avatar:
      'https://images.pexels.com/photos/762020/pexels-photo-762020.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
    weeklyScore: 450,
    quizzesThisWeek: 8,
    change: '+2'
  },
  {
    rank: 2,
    name: 'Alice Johnson',
    avatar:
      'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
    weeklyScore: 420,
    quizzesThisWeek: 6,
    change: '-1'
  },
  {
    rank: 3,
    name: 'Bob Smith',
    avatar:
      'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
    weeklyScore: 380,
    quizzesThisWeek: 7,
    change: '+1'
  }
]

const categoryLeaders = [
  { category: 'Programming', leader: 'Alice Johnson', score: 950 },
  { category: 'Science', leader: 'Carol Davis', score: 890 },
  { category: 'History', leader: 'Bob Smith', score: 820 },
  { category: 'Mathematics', leader: 'Emma Thompson', score: 780 }
]

function getRankIcon(rank: number) {
  switch (rank) {
    case 1:
      return <Crown className="h-6 w-6 text-yellow-400" />
    case 2:
      return <Medal className="h-6 w-6 text-slate-300" />
    case 3:
      return <Medal className="h-6 w-6 text-amber-500" />
    default:
      return <span className="text-md font-bold text-slate-400">#{rank}</span>
  }
}

function getRarityColor(rarity: string) {
  switch (rarity) {
    case 'common':
      return 'bg-slate-700 text-slate-200'
    case 'rare':
      return 'bg-blue-700 text-blue-100'
    case 'epic':
      return 'bg-purple-700 text-purple-100'
    case 'legendary':
      return 'bg-yellow-700 text-yellow-100'
    default:
      return 'bg-slate-600 text-white'
  }
}

export default function LeaderboardPage() {
  return (
    <div className="container mx-auto p-10 space-y-6 rounded-xl shadow-lg text-white">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold flex items-center text-indigo-400">
            <Trophy className="mr-3 h-8 w-8" />
            Leaderboard
          </h1>
          <p className="text-slate-400">
            See how you rank against other quiz participants
          </p>
        </div>
        <Button asChild className="bg-indigo-600 hover:bg-indigo-700 text-white">
          <Link href="/join">
            <Users className="mr-2 h-4 w-4" />
            Join Quiz
          </Link>
        </Button>
      </div>

      <Tabs defaultValue="global" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3 bg-slate-900 text-white">
          <TabsTrigger value="global">🌍 Global Rankings</TabsTrigger>
          <TabsTrigger value="weekly">📅 This Week</TabsTrigger>
          <TabsTrigger value="categories">📚 By Category</TabsTrigger>
        </TabsList>

        {/* GLOBAL */}
        <TabsContent value="global" className="space-y-6">
          <div className="grid gap-4 md:grid-cols-3">
            <Card className="bg-slate-900 text-white border border-slate-900">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-sm">Total Participants</CardTitle>
                <Users className="h-5 w-5 text-blue-300" />
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold">1,247</p>
                <p className="text-xs text-slate-400">+12% from last month</p>
              </CardContent>
            </Card>

            <Card className="bg-slate-900 text-white border border-slate-900">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-sm">Average Score</CardTitle>
                <TrendingUp className="h-5 w-5 text-green-300" />
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold">78.5%</p>
                <p className="text-xs text-slate-400">+2.1% from last month</p>
              </CardContent>
            </Card>

            <Card className="bg-slate-900 text-white border border-slate-900">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-sm">Quizzes Completed</CardTitle>
                <Star className="h-5 w-5 text-yellow-300" />
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold">15,432</p>
                <p className="text-xs text-slate-400">+18% from last month</p>
              </CardContent>
            </Card>
          </div>

          <Card className="bg-slate-900 text-white border border-indigo-500 shadow-md">
            <CardHeader>
              <CardTitle className="text-indigo-300">🏆 Global Rankings</CardTitle>
              <CardDescription className="text-slate-400">
                Top performers across all quizzes and categories
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {globalLeaderboard.map((entry) => (
                <div
                  key={entry.rank}
                  className="flex items-center justify-between p-4 bg-slate-900 rounded-lg hover:bg-slate-700 transition-colors border border-slate-600"
                >
                  <div className="flex items-center space-x-4">
                    <div>{getRankIcon(entry.rank)}</div>
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={entry.avatar} alt={entry.name} />
                      <AvatarFallback>{entry.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-semibold">{entry.name}</p>
                      <p className="text-sm text-slate-400">
                        {entry.totalQuizzes} quizzes • {entry.averageScore}% avg
                      </p>
                    </div>
                  </div>

                  <div className="text-right space-y-1">
                    <div className="flex flex-wrap gap-1 justify-end">
                      {entry.badges.slice(0, 2).map((badge) => (
                        <Badge
                          key={badge.id}
                          variant="outline"
                          className={`${getRarityColor(badge.rarity)} border-0`}
                        >
                          {badge.title}
                        </Badge>
                      ))}
                      {entry.badges.length > 2 && (
                        <Badge variant="outline" className="bg-slate-600 text-white border-0">
                          +{entry.badges.length - 2}
                        </Badge>
                      )}
                    </div>
                    <p className="font-bold text-lg">{entry.totalScore} pts</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        {/* WEEKLY */}
        <TabsContent value="weekly">
          <Card className="bg-slate-900 text-white border border-slate-700">
            <CardHeader>
              <CardTitle className="text-pink-300">📅 Weekly Champions</CardTitle>
              <CardDescription className="text-slate-400">
                Top performers this week
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {weeklyLeaderboard.map((entry) => (
                <div
                  key={entry.rank}
                  className="flex items-center justify-between p-4 bg-slate-800 rounded-lg hover:bg-slate-700 transition-colors border border-slate-600"
                >
                  <div className="flex items-center space-x-4">
                    <div>{getRankIcon(entry.rank)}</div>
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={entry.avatar} alt={entry.name} />
                      <AvatarFallback>{entry.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-semibold">{entry.name}</p>
                      <p className="text-sm text-slate-400">
                        {entry.quizzesThisWeek} quizzes this week
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <Badge
                      variant="outline"
                      className={`${
                        entry.change.startsWith('+') ? 'bg-green-600' : 'bg-red-600'
                      } text-white border-0`}
                    >
                      {entry.change}
                    </Badge>
                    <p className="font-bold text-lg">{entry.weeklyScore} pts</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        {/* CATEGORY */}
        <TabsContent value="categories" className="grid md:grid-cols-2 gap-4">
          {categoryLeaders.map((category) => (
            <Card key={category.category} className="bg-slate-800 text-white border border-slate-600">
              <CardHeader>
                <CardTitle className="text-orange-300">{category.category}</CardTitle>
                <CardDescription className="text-slate-400">Category leader</CardDescription>
              </CardHeader>
              <CardContent className="flex justify-between items-center">
                <div>
                  <p className="font-semibold">{category.leader}</p>
                  <p className="text-sm text-slate-400">Current champion</p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-xl">{category.score}</p>
                  <p className="text-sm text-slate-400">points</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>
      </Tabs>
    </div>
  )
}

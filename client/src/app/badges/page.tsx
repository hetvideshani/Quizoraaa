import { Trophy, Crown, Zap, Shield, Star, Target, Brain } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import badgesData from "@/data/badges.json"

const userBadges = [
  { id: "1", earnedAt: "2024-01-20T10:00:00Z" },
  { id: "4", earnedAt: "2024-01-15T14:30:00Z" },
  { id: "5", earnedAt: "2024-01-22T16:45:00Z" }
]

const badgeProgress = [
  { id: "2", progress: 60, requirement: "Answer 5 questions in under 10 seconds", current: 3 },
  { id: "3", progress: 0, requirement: "Become an admin", current: 0 },
  { id: "6", progress: 80, requirement: "Complete 5 AI-generated quizzes", current: 4 }
]

function getBadgeIcon(iconName: string) {
  const icons: { [key: string]: any } = {
    crown: Crown,
    zap: Zap,
    shield: Shield,
    star: Star,
    target: Target,
    brain: Brain
  }
  const IconComponent = icons[iconName] || Trophy
  return <IconComponent className="h-8 w-8" />
}

function getRarityColor(rarity: string) {
  switch (rarity) {
    case 'common': return 'border-gray-800 bg-gray-900'
    case 'rare': return 'border-blue-800 bg-blue-900'
    case 'epic': return 'border-purple-800 bg-purple-900'
    case 'legendary': return 'border-yellow-800 bg-yellow-900'
    default: return 'border-gray-800 bg-gray-900'
  }
}

function getRarityTextColor(rarity: string) {
  switch (rarity) {
    case 'common': return 'text-gray-200'
    case 'rare': return 'text-blue-200'
    case 'epic': return 'text-purple-200'
    case 'legendary': return 'text-yellow-200'
    default: return 'text-gray-200'
  }
}

export default function BadgesPage() {
  const earnedBadges = badgesData.filter(badge => 
    userBadges.some(userBadge => userBadge.id === badge.id)
  )
  
  const availableBadges = badgesData.filter(badge => 
    !userBadges.some(userBadge => userBadge.id === badge.id)
  )

  return (
    <div className="container mx-auto p-10 space-y-6 text-white bg-black min-h-screen">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold flex items-center">
            <Trophy className="mr-3 h-8 w-8 text-yellow-500" />
            Badges & Achievements
          </h1>
          <p className="text-gray-400">Track your progress and unlock achievements</p>
        </div>
        <div className="text-right">
          <p className="text-2xl font-bold text-green-400">{earnedBadges.length}/{badgesData.length}</p>
          <p className="text-sm text-gray-400">Badges earned</p>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <Card className="bg-gray-950 border-gray-800">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-white">Total Badges</CardTitle>
            <Trophy className="h-4 w-4 text-gray-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-400">{earnedBadges.length}</div>
            <Progress value={(earnedBadges.length / badgesData.length) * 100} className="mt-2" />
          </CardContent>
        </Card>

        <Card className="bg-gray-950 border-gray-800">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-white">Rare Badges</CardTitle>
            <Star className="h-4 w-4 text-gray-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-400">
              {earnedBadges.filter(b => b.rarity === 'rare' || b.rarity === 'epic' || b.rarity === 'legendary').length}
            </div>
            <p className="text-xs text-gray-400">Epic and above</p>
          </CardContent>
        </Card>

        <Card className="bg-gray-950 border-gray-800">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-white">Recent Badge</CardTitle>
            <Target className="h-4 w-4 text-gray-400" />
          </CardHeader>
          <CardContent>
            <div className="text-sm font-bold text-white">Perfect Score</div>
            <p className="text-xs text-gray-400">Earned 3 days ago</p>
          </CardContent>
        </Card>

        <Card className="bg-gray-950 border-gray-800">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-white">Next Badge</CardTitle>
            <Zap className="h-4 w-4 text-gray-400" />
          </CardHeader>
          <CardContent>
            <div className="text-sm font-bold text-white">Speed Demon</div>
            <Progress value={60} className="mt-1" />
            <p className="text-xs text-gray-400">60% complete</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="earned" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3 bg-gray-800">
          <TabsTrigger value="earned">Earned ({earnedBadges.length})</TabsTrigger>
          <TabsTrigger value="available">Available ({availableBadges.length})</TabsTrigger>
          <TabsTrigger value="progress">In Progress ({badgeProgress.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="earned" className="space-y-4">
          {earnedBadges.length === 0 ? (
            <Card className="bg-gray-950 border-gray-800">
              <CardContent className="flex flex-col items-center justify-center py-12">
                <Trophy className="h-12 w-12 text-gray-600 mb-4" />
                <h3 className="text-lg font-semibold mb-2">No badges earned yet</h3>
                <p className="text-gray-400 text-center">
                  Start taking quizzes to earn your first badge!
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {earnedBadges.map((badge) => {
                const userBadge = userBadges.find(ub => ub.id === badge.id)
                return (
                  <Card key={badge.id} className={`relative ${getRarityColor(badge.rarity)} border-2`}>
                    <CardHeader className="text-center">
                      <div className={`mx-auto mb-2 ${getRarityTextColor(badge.rarity)}`}>
                        {getBadgeIcon(badge.icon)}
                      </div>
                      <CardTitle className="text-lg text-white">{badge.title}</CardTitle>
                      <Badge variant="outline" className={getRarityTextColor(badge.rarity)}>
                        {badge.rarity}
                      </Badge>
                    </CardHeader>
                    <CardContent className="text-center">
                      <p className="text-sm text-gray-400 mb-2">{badge.description}</p>
                      {userBadge && (
                        <p className="text-xs text-gray-400">
                          Earned {new Date(userBadge.earnedAt).toLocaleDateString()}
                        </p>
                      )}
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          )}
        </TabsContent>

        <TabsContent value="available" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {availableBadges.map((badge) => (
              <Card key={badge.id} className="relative opacity-60 hover:opacity-80 transition-opacity bg-gray-900 border-gray-700">
                <CardHeader className="text-center">
                  <div className="mx-auto mb-2 text-gray-400">
                    {getBadgeIcon(badge.icon)}
                  </div>
                  <CardTitle className="text-lg text-white">{badge.title}</CardTitle>
                  <Badge variant="outline">
                    {badge.rarity}
                  </Badge>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-sm text-gray-400">{badge.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="progress" className="space-y-4">
          <div className="space-y-4">
            {badgeProgress.map((progress) => {
              const badge = badgesData.find(b => b.id === progress.id)
              if (!badge) return null

              return (
                <Card key={badge.id} className="bg-gray-950 border-gray-800">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className={getRarityTextColor(badge.rarity)}>
                          {getBadgeIcon(badge.icon)}
                        </div>
                        <div>
                          <CardTitle className="text-lg text-white">{badge.title}</CardTitle>
                          <CardDescription className="text-gray-400">{badge.description}</CardDescription>
                        </div>
                      </div>
                      <Badge variant="outline" className={getRarityTextColor(badge.rarity)}>
                        {badge.rarity}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm text-white">
                        <span>Progress</span>
                        <span>{progress.progress}%</span>
                      </div>
                      <Progress value={progress.progress} />
                      <p className="text-sm text-gray-400">
                        {progress.requirement}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

"use client"

import { useEffect, useState } from "react"
import { Plus, Trash2, Brain, Save, Eye, Upload } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import Link from "next/link"
import { log } from "console"

interface Question {
  id: string
  type: 'mcq' | 'true-false' | 'open'
  question: string
  options?: string[]
  correctAnswer: string | number | boolean
  timeLimit: number
  points: number
  aiGenerated?: boolean
}

export default function CreateQuizPage() {
  const [quizTitle, setQuizTitle] = useState("")
  const [quizDescription, setQuizDescription] = useState("")
  const [category, setCategory] = useState("")
  const [difficulty, setDifficulty] = useState("")
  const [isPublic, setIsPublic] = useState(true)
  const [questions, setQuestions] = useState<Question[]>([])
  const [quiz, setQuiz] = useState({ title: "", description: "", category: "", difficulty: "", isPublic: true })
  const [settings, setSettings] = useState({ shuffle: false, showResults: false, allowRetakes: false, passingScore: 70 })

  useEffect(() => {

    console.log(quiz)
    console.log(questions);
    console.log(settings);

  }, [questions, quiz, settings])

  const addQuestion = (type: Question['type']) => {
    const newQuestion: Question = {
      id: Date.now().toString(),
      type,
      question: "",
      options: type === 'mcq' ? ["", "", "", ""] : undefined,
      correctAnswer: type === 'true-false' ? false : type === 'mcq' ? 0 : "",
      timeLimit: 0,
      points: 0
    }
    setQuestions([...questions, newQuestion])
  }

  const updateQuestion = (id: string, updates: Partial<Question>) => {
    setQuestions(questions.map(q => q.id === id ? { ...q, ...updates } : q))
  }

  const deleteQuestion = (id: string) => {
    setQuestions(questions.filter(q => q.id !== id))
  }

  const handleCSVUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = (e) => {
      const text = e.target?.result as string
      // TODO: Parse CSV and update `questions`
      console.log("CSV Content:", text)
    }
    reader.readAsText(file)
  }

  const renderQuestionEditor = (question: Question, index: number) => (
    <Card key={question.id} className="relative bg-zinc-900 border-zinc-800 text-white animate-fadeIn">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Badge variant="secondary">
              {question.type === 'mcq' ? 'MCQ' : question.type === 'true-false' ? 'True/False' : 'Open'}
            </Badge>
            {question.aiGenerated && (
              <Badge variant="outline" className="text-purple-400 border-purple-500">
                <Brain className="mr-1 h-3 w-3" /> AI
              </Badge>
            )}
          </div>
          <Button variant="ghost" size="sm" onClick={() => deleteQuestion(question.id)} className="text-red-500">
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label>Question {questions.length - index}</Label>
          <Textarea
            placeholder="Enter your question here..."
            value={question.question}
            onChange={(e) => updateQuestion(question.id, { question: e.target.value })}
            className="bg-zinc-800 border-zinc-700 text-white"
          />
        </div>

        {question.type === 'mcq' && (
          <div className="space-y-2">
            <Label>Answer Options</Label>
            {question.options?.map((option, index) => (
              <div key={index} className="flex items-center space-x-2">
                <Input
                  placeholder={`Option ${index + 1}`}
                  value={option}
                  onChange={(e) => {
                    const newOptions = [...(question.options || [])]
                    newOptions[index] = e.target.value
                    updateQuestion(question.id, { options: newOptions })
                  }}
                  className="bg-zinc-800 border-zinc-700 text-white"
                />
                <Button
                  variant={question.correctAnswer === index ? "default" : "outline"}
                  size="sm"
                  onClick={() => updateQuestion(question.id, { correctAnswer: index })}
                >
                  {question.correctAnswer === index ? "Correct" : "Mark Correct"}
                </Button>
              </div>
            ))}
          </div>
        )}

        {question.type === 'true-false' && (
          <div className="space-y-2">
            <Label>Correct Answer</Label>
            <div className="flex space-x-2">
              <Button
                variant={question.correctAnswer === true ? "outline" : "default"}
                onClick={() => updateQuestion(question.id, { correctAnswer: true })}
              >
                True
              </Button>
              <Button
                variant={question.correctAnswer === false ? "outline" : "default"}
                onClick={() => updateQuestion(question.id, { correctAnswer: false })}
              >
                False
              </Button>
            </div>
          </div>
        )}

        {question.type === 'open' && (
          <div className="space-y-2">
            <Label>Sample Answer</Label>
            <Textarea
              placeholder="Provide a sample answer..."
              value={question.correctAnswer as string}
              onChange={(e) => updateQuestion(question.id, { correctAnswer: e.target.value })}
              className="bg-zinc-800 border-zinc-700 text-white"
            />
          </div>
        )}

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Time Limit (s)</Label>
            <Input
              type="number"
              value={question.timeLimit}
              onChange={(e) => updateQuestion(question.id, { timeLimit: parseInt(e.target.value) || 30 })}
              className="bg-zinc-800 border-zinc-700 text-white"
            />
          </div>
          <div className="space-y-2">
            <Label>Points</Label>
            <Input
              type="number"
              value={question.points}
              onChange={(e) => updateQuestion(question.id, { points: parseInt(e.target.value) || 10 })}
              className="bg-zinc-800 border-zinc-700 text-white"
            />
          </div>
        </div>
      </CardContent>
    </Card>
  )

  return (
    <div className="container mx-auto p-10 space-y-10 animate-fadeIn">
      <div className="flex items-start justify-between flex-col md:flex-row gap-4">
        <div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">Create Quiz</h1>
          <p className="text-muted-foreground">Build and customize your quiz easily</p>
        </div>
        <div className="flex space-x-2">
          <Button asChild className="bg-gradient-to-br from-purple-600 to-pink-500 text-white">
            <Link href="/ai-generator"><Brain className="mr-2 h-4 w-4" /> AI Generator</Link>
          </Button>
          <label htmlFor="csv-upload">
            <Input id="csv-upload" type="file" accept=".csv" className="hidden" onChange={handleCSVUpload} />
            <Button className="bg-zinc-800 border-zinc-700 text-white hover:border-pink-500" type="button">
              <Upload className="mr-2 h-4 w-4" /> Upload CSV
            </Button>
          </label>
          <Button variant="outline" className="text-white border-zinc-700">
            <Eye className="mr-2 h-4 w-4" /> Preview
          </Button>
          <Button className="bg-gradient-to-br from-pink-600 to-purple-500 text-white">
            <Save className="mr-2 h-4 w-4" /> Save Quiz
          </Button>
        </div>
      </div>

      <Tabs defaultValue="details" className="space-y-6">
        <TabsList className="bg-zinc-900 border-zinc-800 text-white">
          <TabsTrigger value="details">Details</TabsTrigger>
          <TabsTrigger value="questions">Questions ({questions.length})</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="details">
          <Card className="bg-zinc-900 border-zinc-800 text-white animate-fadeIn">
            <CardHeader>
              <CardTitle>Quiz Information</CardTitle>
              <CardDescription>Provide title, description, and category</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Input value={quiz.title} onChange={(e) => setQuiz({ ...quiz, title: e.target.value })} placeholder="Quiz Title" className="bg-zinc-800 border-zinc-700 text-white" />
              <Textarea value={quiz.description} onChange={(e) => setQuiz({ ...quiz, description: e.target.value })} placeholder="Quiz Description" className="bg-zinc-800 border-zinc-700 text-white" />
              <div className="grid grid-cols-2 gap-4">
                <Select value={quiz.category} onValueChange={(value) => setQuiz({ ...quiz, category: value })}>
                  <SelectTrigger className="bg-zinc-800 border-zinc-700 text-white">
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  
                  <SelectContent className="bg-zinc-900 border-zinc-800 text-white">
                    <SelectItem value="programming">Programming</SelectItem>
                    <SelectItem value="science">Science</SelectItem>
                    <SelectItem value="history">History</SelectItem>
                    <SelectItem value="math">Math</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={quiz.difficulty} onValueChange={(value) => setQuiz({ ...quiz, difficulty: value })}>
                  <SelectTrigger className="bg-zinc-800 border-zinc-700 text-white">
                    <SelectValue placeholder="Difficulty" />
                  </SelectTrigger>
                  <SelectContent className="bg-zinc-900 border-zinc-800 text-white">
                    <SelectItem value="easy">Easy</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="hard">Hard</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-center space-x-2">
                <Switch checked={quiz.isPublic} onCheckedChange={(value) => setQuiz({ ...quiz, isPublic: value })} />
                <Label>Public Quiz</Label>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="questions">
          <Card className="bg-zinc-900 border-zinc-800 text-white animate-fadeIn">
            <CardHeader>
              <CardTitle>Add Questions</CardTitle>
              <CardDescription>Choose question types to add</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-wrap gap-2">
              <Button onClick={() => addQuestion('mcq')}><Plus className="mr-2 h-4 w-4" /> MCQ</Button>
              <Button variant="outline" onClick={() => addQuestion('true-false')}><Plus className="mr-2 h-4 w-4" /> True/False</Button>
              <Button variant="outline" onClick={() => addQuestion('open')}><Plus className="mr-2 h-4 w-4" /> Open</Button>
            </CardContent>
          </Card>
          <div className="space-y-4 mt-4">
            {questions.length === 0 ? (
              <Card className="bg-zinc-800 text-center text-white p-10 animate-fadeIn">
                <Brain className="h-10 w-10 mx-auto mb-4 text-purple-400" />
                <p>No questions added yet. Use AI Generator or Add manually.</p>
              </Card>
            ) : questions.slice().reverse().map((question, index) => renderQuestionEditor(question, index))}
          </div>
        </TabsContent>

        <TabsContent value="settings">
          <Card className="bg-zinc-900 border-zinc-800 text-white animate-fadeIn">
            <CardHeader>
              <CardTitle>Quiz Settings</CardTitle>
              <CardDescription>Configure quiz behavior</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center">
                <Label>Shuffle Questions</Label>
                <Switch checked={settings.shuffle} onCheckedChange={(value) => setSettings({ ...settings, shuffle: value })} />
              </div>
              <div className="flex justify-between items-center">
                <Label>Show Results Immediately</Label>
                <Switch checked={settings.showResults} onCheckedChange={(value) => setSettings({ ...settings, showResults: value })} />
              </div>
              <div className="flex justify-between items-center">
                <Label>Allow Retakes</Label>
                <Switch checked={settings.allowRetakes} onCheckedChange={(value) => setSettings({ ...settings, allowRetakes: value })} />
              </div>
              <div>
                <Label>Passing Score (%)</Label>
                <Input type="number" placeholder="70" className="bg-zinc-800 border-zinc-700 text-white" value={settings.passingScore} onChange={(e) => setSettings({ ...settings, passingScore: Number(e.target.value) })} />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

"use client"

import { useState } from "react"
import { Brain, Wand2, RefreshCw, Plus, Copy, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Input } from "@/components/ui/input"
import Link from "next/link"

interface GeneratedQuestion {
  id: string
  type: 'mcq' | 'true-false' | 'open'
  question: string
  options?: string[]
  correctAnswer: string | number | boolean
  explanation: string
}

const mockGeneratedQuestions: GeneratedQuestion[] = [
  {
    id: "1",
    type: "mcq",
    question: "What is the primary purpose of React hooks?",
    options: [
      "To replace class components entirely",
      "To allow state and lifecycle features in functional components",
      "To improve performance of React applications",
      "To handle routing in React applications"
    ],
    correctAnswer: 1,
    explanation: "React hooks allow functional components to use state and other React features that were previously only available in class components."
  },
  {
    id: "2",
    type: "true-false",
    question: "JavaScript is a statically typed programming language.",
    correctAnswer: false,
    explanation: "JavaScript is a dynamically typed language, meaning variable types are determined at runtime rather than compile time."
  },
  {
    id: "3",
    type: "open",
    question: "Explain the concept of closure in JavaScript and provide a practical example.",
    correctAnswer: "A closure is a function that has access to variables in its outer (enclosing) scope even after the outer function has returned. Example: function outer() { let count = 0; return function inner() { count++; return count; }; }",
    explanation: "Closures are fundamental to JavaScript and enable powerful patterns like data privacy and function factories."
  }
]

export default function AIGeneratorPage() {
  const [prompt, setPrompt] = useState("")
  const [difficulty, setDifficulty] = useState("")
  const [questionType, setQuestionType] = useState("")
  const [questionCount, setQuestionCount] = useState("5")
  const [isGenerating, setIsGenerating] = useState(false)
  const [generatedQuestions, setGeneratedQuestions] = useState<GeneratedQuestion[]>([])
  const [copiedQuestions, setCopiedQuestions] = useState<Set<string>>(new Set())

  const handleGenerate = async () => {
    setIsGenerating(true)
    await new Promise(resolve => setTimeout(resolve, 2000))
    setGeneratedQuestions(mockGeneratedQuestions)
    setIsGenerating(false)
  }

  const handleRegenerate = async (questionId: string) => {
    await new Promise(resolve => setTimeout(resolve, 1000))
  }

  const copyQuestion = (questionId: string) => {
    setCopiedQuestions(prev => new Set(prev).add(questionId))
    setTimeout(() => {
      setCopiedQuestions(prev => {
        const newSet = new Set(prev)
        newSet.delete(questionId)
        return newSet
      })
    }, 2000)
  }

  return (
    <div className="container mx-auto p-10 space-y-8 animate-fadeIn text-white">
      <div className="flex justify-between items-start flex-col md:flex-row">
        <div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent flex items-center">
             AI Question Generator
          </h1>
          <p className="text-muted-foreground">Generate intelligent questions using AI technology</p>
        </div>
        <Button variant="outline" className="bg-zinc-800 border-zinc-700 text-white" asChild>
          <Link href="/create">
            <Plus className="mr-2 h-4 w-4" /> Create Quiz Manually
          </Link>
        </Button>
      </div>

      <Card className="bg-zinc-900 border-zinc-800">
        <CardHeader>
          <CardTitle>Generate Questions</CardTitle>
          <CardDescription>Describe your topic and let AI create questions</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>Topic or Prompt</Label>
            <Textarea
              placeholder="e.g., 'Create questions about React hooks and state management'"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              className="bg-zinc-800 border-zinc-700 text-white"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Difficulty</Label>
              <Select value={difficulty} onValueChange={setDifficulty}>
                <SelectTrigger className="bg-zinc-800 border-zinc-700 text-white">
                  <SelectValue placeholder="Select difficulty" />
                </SelectTrigger>
                <SelectContent className="bg-zinc-900 border-zinc-800 text-white">
                  <SelectItem value="easy">Easy</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="hard">Hard</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Question Type</Label>
              <Select value={questionType} onValueChange={setQuestionType}>
                <SelectTrigger className="bg-zinc-800 border-zinc-700 text-white">
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent className="bg-zinc-900 border-zinc-800 text-white">
                  <SelectItem value="mixed">Mixed</SelectItem>
                  <SelectItem value="mcq">MCQ</SelectItem>
                  <SelectItem value="true-false">True/False</SelectItem>
                  <SelectItem value="open">Open Ended</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="space-y-2">
            <Label>Number of Questions</Label>
            <Input
              type="number"
              min="1"
              max="20"
              value={questionCount}
              onChange={(e) => setQuestionCount(e.target.value)}
              className="bg-zinc-800 border-zinc-700 text-white"
            />
          </div>
          <Button
            onClick={handleGenerate}
            disabled={!prompt || isGenerating}
            className="w-full bg-gradient-to-r from-purple-600 to-pink-500 text-white"
          >
            {isGenerating ? (
              <><RefreshCw className="mr-2 h-4 w-4 animate-spin" /> Generating...</>
            ) : (
              <><Wand2 className="mr-2 h-4 w-4" /> Generate Questions</>
            )}
          </Button>
        </CardContent>
      </Card>

      {generatedQuestions.length > 0 && (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-semibold">Generated Questions</h2>
            <Badge variant="secondary">{generatedQuestions.length} questions</Badge>
          </div>
          <div className="space-y-4">
            {generatedQuestions.map((q) => {
              const isCopied = copiedQuestions.has(q.id)
              return (
                <Card key={q.id} className="bg-zinc-900 border-zinc-800">
                  <CardHeader className="pb-4">
                    <div className="flex justify-between">
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="text-purple-400 border-purple-500">
                          <Brain className="mr-1 h-3 w-3" /> AI Generated
                        </Badge>
                        <Badge variant="secondary">
                          {q.type === 'mcq' ? 'MCQ' : q.type === 'true-false' ? 'True/False' : 'Open'}
                        </Badge>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="ghost" size="sm" onClick={() => handleRegenerate(q.id)}>
                          <RefreshCw className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm" onClick={() => copyQuestion(q.id)}>
                          {isCopied ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <h4 className="font-semibold">Question:</h4>
                      <p>{q.question}</p>
                    </div>
                    {q.type === 'mcq' && q.options && (
                      <div>
                        <h4 className="font-semibold">Options:</h4>
                        <div className="space-y-1">
                          {q.options.map((opt, i) => (
                            <div
                              key={i}
                              className={`p-2 rounded text-sm ${q.correctAnswer === i ? 'bg-green-800 text-green-200' : 'bg-zinc-800 text-white'}`}
                            >
                              {i + 1}. {opt} {q.correctAnswer === i && <Badge variant="outline" className="ml-2 text-green-300 border-green-400">Correct</Badge>}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                    {q.type === 'true-false' && (
                      <div>
                        <h4 className="font-semibold">Correct Answer:</h4>
                        <Badge variant="outline" className="text-blue-300 border-blue-500">
                          {q.correctAnswer ? 'True' : 'False'}
                        </Badge>
                      </div>
                    )}
                    {q.type === 'open' && (
                      <div>
                        <h4 className="font-semibold">Sample Answer:</h4>
                        <p className="bg-zinc-800 p-3 rounded text-sm">{q.correctAnswer}</p>
                      </div>
                    )}
                    <div>
                      <h4 className="font-semibold">Explanation:</h4>
                      <p className="text-muted-foreground text-sm">{q.explanation}</p>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}

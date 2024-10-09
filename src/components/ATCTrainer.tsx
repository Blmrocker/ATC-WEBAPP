import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Slider } from "@/components/ui/slider"
import { RadioTower, Plane, Award } from 'lucide-react'
import { useUserStore } from "@/store/userStore"
import { scenarios, Scenario, Interaction } from "@/data/scenarios"
import { Input } from "@/components/ui/input"

export default function ATCTrainer() {
  const [selectedLevel, setSelectedLevel] = useState('beginner')
  const [selectedScenario, setSelectedScenario] = useState<Scenario | null>(null)
  const [currentInteractionIndex, setCurrentInteractionIndex] = useState(0)
  const [userResponse, setUserResponse] = useState('')
  const [feedback, setFeedback] = useState('')
  const { level, addExperience } = useUserStore()

  const levels = ['beginner', 'intermediate', 'advanced']

  const handleScenarioSelect = (scenario: Scenario) => {
    setSelectedScenario(scenario)
    setCurrentInteractionIndex(0)
    setUserResponse('')
    setFeedback('')
  }

  const currentInteraction = selectedScenario?.interactions[currentInteractionIndex]

  const handleSubmitResponse = () => {
    if (currentInteraction) {
      if (userResponse.toLowerCase() === currentInteraction.correctResponse.toLowerCase()) {
        setFeedback('Correct! Good job.')
        addExperience(10)
        if (currentInteractionIndex < selectedScenario!.interactions.length - 1) {
          setCurrentInteractionIndex(prev => prev + 1)
          setUserResponse('')
        } else {
          setFeedback('Scenario completed! Great work.')
        }
      } else {
        setFeedback('Incorrect. Try again or use a hint.')
      }
    }
  }

  const handleHint = () => {
    if (currentInteraction) {
      const hint = currentInteraction.hints[Math.floor(Math.random() * currentInteraction.hints.length)]
      setFeedback(`Hint: ${hint}`)
    }
  }

  return (
    <div className="container mx-auto p-4 max-w-4xl">
      <h1 className="text-3xl font-bold mb-6 text-center">ATC Interaction Trainer</h1>
      
      <Tabs value={selectedLevel} onValueChange={setSelectedLevel} className="mb-6">
        <TabsList className="grid w-full grid-cols-3">
          {levels.map((level) => (
            <TabsTrigger key={level} value={level} className="capitalize">
              {level}
            </TabsTrigger>
          ))}
        </TabsList>
        {levels.map((level) => (
          <TabsContent key={level} value={level}>
            <Card>
              <CardHeader>
                <CardTitle className="capitalize">{level} Level</CardTitle>
                <CardDescription>Select a scenario to practice {level} level ATC interactions</CardDescription>
              </CardHeader>
              <CardContent className="grid gap-4">
                {scenarios.filter(s => s.difficulty === level).map((scenario) => (
                  <Button
                    key={scenario.id}
                    variant={selectedScenario?.id === scenario.id ? "default" : "outline"}
                    onClick={() => handleScenarioSelect(scenario)}
                  >
                    {scenario.name}
                  </Button>
                ))}
              </CardContent>
            </Card>
          </TabsContent>
        ))}
      </Tabs>

      {selectedScenario && currentInteraction && (
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>{selectedScenario.name}</CardTitle>
            <CardDescription>{selectedScenario.description}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between mb-4">
              <Badge variant="outline" className="text-sm">
                <Plane className="w-4 h-4 mr-2" />
                Pilot
              </Badge>
              <RadioTower className="w-6 h-6 text-muted-foreground" />
              <Badge variant="outline" className="text-sm">
                ATC
                <RadioTower className="w-4 h-4 ml-2" />
              </Badge>
            </div>
            <div className="bg-muted p-4 rounded-md mb-4 h-40 overflow-y-auto">
              <p className="text-sm">ATC: "{currentInteraction.atc}"</p>
              {feedback && (
                <p className="text-sm text-muted-foreground mt-2">{feedback}</p>
              )}
            </div>
            <Input
              value={userResponse}
              onChange={(e) => setUserResponse(e.target.value)}
              placeholder="Type your response here..."
              className="mb-4"
            />
            <div className="flex justify-between">
              <Button variant="outline" onClick={handleHint}>Hint</Button>
              <Button onClick={handleSubmitResponse}>Submit Response</Button>
            </div>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Your Progress</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4">
            <Award className="w-6 h-6 text-yellow-500" />
            <Progress value={(level % 100)} className="flex-1" />
            <span className="text-sm font-medium">Level {level}</span>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
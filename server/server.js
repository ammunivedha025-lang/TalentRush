import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import { GoogleGenAI } from '@google/genai'

dotenv.config()

const app = express()

app.use(cors())
app.use(express.json())

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
})

app.get('/', (req, res) => {
  res.json({
    message: 'TalentRush AI server is running with Gemini',
  })
})

app.post('/api/generate-assessment', async (req, res) => {
  try {
    const { profile } = req.body

    if (!profile) {
      return res.status(400).json({
        error: 'Profile is required',
      })
    }

    const prompt = `
You are the AI assessment engine for TalentRush.

TalentRush is a platform that discovers a person's real abilities through personalized assessments and skill-proof challenges.

USER PROFILE:
${JSON.stringify(profile, null, 2)}

Create a completely personalized assessment for this specific user.

IMPORTANT RULES:

1. Generate NEW questions dynamically.
2. Do NOT simply select questions from a fixed question bank.
3. Use the user's skills, interests, education, career goal, experience level and preferred opportunity type.
4. Do NOT assume that a skill listed in the profile is actually proven.
5. Test whether the user can actually reason, solve problems and make decisions.
6. Include questions related to the user's strongest interests.
7. Include some discovery questions that can reveal hidden strengths.
8. If the user has multiple interests, create cross-domain questions.
9. Questions can combine areas such as:
   - Programming + Problem Solving
   - Robotics + IT
   - AI + Programming
   - Design + Technology
   - Photography + Storytelling
   - Video Editing + Communication
   - Music + Creativity
   - Writing + Presentation
   - Any other meaningful combination based on the profile.
10. Do not make every question about the same skill.
11. The assessment should test reasoning, creativity, technical thinking, communication, decision making and practical thinking when appropriate.
12. Make questions appropriate for the user's experience level.
13. Make the questions different for different users.

Allowed talent tags:
design
singing
dance
photography
video
coding
writing
music

Broader skills may include:
programming
robotics
ai
machine-learning
it
iot
problem-solving
logical-thinking
creativity
communication
storytelling
presentation
content-creation
visual-thinking
technical-thinking
decision-making
teamwork

Generate exactly 10 multiple-choice questions.

Each question must contain:

- id
- question
- options
- skills
- difficulty

Each question must have exactly 4 options.

Each option must contain:
- text
- tags

Difficulty must be one of:
Easy
Medium
Hard

Return ONLY valid JSON.

The JSON structure must be exactly:

{
  "questions": [
    {
      "id": "q1",
      "question": "Question text",
      "options": [
        {
          "text": "Option 1",
          "tags": ["coding"]
        },
        {
          "text": "Option 2",
          "tags": ["design"]
        },
        {
          "text": "Option 3",
          "tags": ["writing"]
        },
        {
          "text": "Option 4",
          "tags": ["problem-solving"]
        }
      ],
      "skills": ["programming", "problem-solving"],
      "difficulty": "Medium"
    }
  ]
}
`

    let response

const models = [
  'gemini-3.6-flash',
  'gemini-3.1-flash-lite',
]

for (const model of models) {
  try {
    console.log(`Trying Gemini model: ${model}`)

    response = await ai.models.generateContent({
      model,
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
      },
    })

    console.log(`Gemini model succeeded: ${model}`)
    break
  } catch (error) {
    console.error(
      `Gemini model failed: ${model}`,
      error.message
    )

    const is503 =
      error?.status === 503 ||
      error?.code === 503 ||
      error?.message?.includes('503') ||
      error?.message?.includes('high demand')

    if (!is503) {
      throw error
    }

    console.log(`Trying next Gemini model...`)
  }
}

if (!response) {
  return res.status(503).json({
    error:
      'Gemini is temporarily unavailable. Please try again in a moment.',
  })
}

    const text = response.text

    if (!text) {
      return res.status(500).json({
        error: 'Gemini returned an empty response',
      })
    }

    let assessment

    try {
      assessment = JSON.parse(text)
    } catch (error) {
      console.error('Gemini JSON parsing error:', error)

      return res.status(500).json({
        error: 'Gemini returned invalid JSON',
      })
    }

    if (
      !assessment.questions ||
      !Array.isArray(assessment.questions) ||
      assessment.questions.length !== 10
    ) {
      return res.status(500).json({
        error: 'Gemini did not return exactly 10 questions',
      })
    }

    res.json({
      success: true,
      assessment,
    })
  } catch (error) {
    console.error('Gemini assessment error:', error)

    res.status(500).json({
      error: 'Failed to generate AI assessment',
      details: error.message,
    })
  }
})

const PORT = process.env.PORT || 5000

const server = app.listen(PORT, '0.0.0.0', () => {
  console.log(
    `TalentRush AI server running on port ${PORT}`
  )
})

server.on('error', (error) => {
  console.error('Server error:', error)
})

server.on('close', () => {
  console.log('TalentRush AI server was closed')
})

setInterval(() => {}, 1000)
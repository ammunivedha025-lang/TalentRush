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

TalentRush discovers a person's abilities through personalized assessments and practical skill-proof challenges.

USER PROFILE:
${JSON.stringify(profile, null, 2)}

Create a completely personalized assessment for this user.

IMPORTANT RULES:

1. Generate NEW questions dynamically.
2. Do NOT simply select questions from a fixed question bank.
3. Use the user's skills, interests, education, career goal, experience level and preferred opportunity type.
4. Do NOT assume that a skill listed in the profile is proven.
5. Test actual reasoning, problem solving, decision making, creativity and practical thinking.
6. Include questions related to the user's strongest interests.
7. Include discovery questions that can reveal hidden strengths.
8. If the user has multiple interests, create meaningful cross-domain questions.
9. Do not make every question about the same skill.
10. Questions must be appropriate for the user's experience level.
11. Make the questions different for different user profiles.
12. Every question must have exactly ONE objectively correct answer.
13. Do not create questions where two or more options could reasonably be correct.
14. The correct answer must be based on the question itself, not on the user's profile.
15. The explanation must clearly explain why the correct answer is correct.

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
sports

Generate exactly 10 multiple-choice questions.

Each question must contain:

- id
- question
- options
- correctOption
- explanation
- skills
- difficulty

Each question must have exactly 4 options.

Each option must contain:

- text
- tags

The correctOption must be the ZERO-BASED option number:

0 = first option
1 = second option
2 = third option
3 = fourth option

The explanation must explain why the correct option is correct.

Difficulty must be exactly one of:

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
          "tags": ["problem-solving"]
        },
        {
          "text": "Option 3",
          "tags": ["coding"]
        },
        {
          "text": "Option 4",
          "tags": ["logical-thinking"]
        }
      ],
      "correctOption": 0,
      "explanation": "Explanation of why the first option is correct.",
      "skills": ["coding", "problem-solving"],
      "difficulty": "Medium"
    }
  ]
}
`

    const response = await ai.models.generateContent({
      model: 'gemini-3.5-flash-lite',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
      },
    })

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

    // Validate every question before sending it to the frontend.
    for (const question of assessment.questions) {
      if (
        !question.id ||
        !question.question ||
        !Array.isArray(question.options) ||
        question.options.length !== 4 ||
        !Number.isInteger(question.correctOption) ||
        question.correctOption < 0 ||
        question.correctOption > 3 ||
        !question.explanation ||
        !Array.isArray(question.skills) ||
        !question.difficulty
      ) {
        return res.status(500).json({
          error: 'Gemini returned an invalid question structure',
        })
      }

      for (const option of question.options) {
        if (
          !option.text ||
          !Array.isArray(option.tags)
        ) {
          return res.status(500).json({
            error: 'Gemini returned an invalid option structure',
          })
        }
      }
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

server.on('error', error => {
  console.error('Server error:', error)
})

server.on('close', () => {
  console.log('TalentRush AI server was closed')
})

setInterval(() => {}, 1000)
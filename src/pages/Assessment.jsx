import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  ArrowRight,
  ChevronLeft,
  Sparkles,
  Loader2,
  AlertCircle,
} from 'lucide-react'
import { useApp } from '../context/AppContext'

export default function Assessment() {
  const [questions, setQuestions] = useState([])
  const [step, setStep] = useState(0)
  const [answers, setAnswers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const navigate = useNavigate()

  const {
    userProfile,
    computeProfile,
  } = useApp()

  /*
   * Generate a NEW AI assessment
   * whenever the assessment page is opened.
   */
  useEffect(() => {
    async function generateAssessment() {
      if (!userProfile) {
        setLoading(false)
        setError('Please complete your profile first.')
        return
      }

      try {
        setLoading(true)
        setError('')

        const response = await fetch(
          'http://localhost:5000/api/generate-assessment',
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              profile: userProfile,
            }),
          }
        )

        const data = await response.json()

        if (!response.ok) {
          throw new Error(
            data.error || 'Failed to generate assessment'
          )
        }

        if (
          !data.assessment ||
          !Array.isArray(data.assessment.questions) ||
          data.assessment.questions.length === 0
        ) {
          throw new Error(
            'AI did not return valid assessment questions.'
          )
        }

        setQuestions(data.assessment.questions)
        setAnswers([])
        setStep(0)
      } catch (err) {
        console.error('Assessment generation error:', err)

        setError(
          err.message ||
            'Unable to generate your AI assessment.'
        )
      } finally {
        setLoading(false)
      }
    }

    generateAssessment()
  }, [userProfile])

  /*
   * Select an answer.
   */
  const choose = (option) => {
    const nextAnswers = [...answers]

    nextAnswers[step] = option

    setAnswers(nextAnswers)
  }

  /*
   * Move to next question
   * or finish the assessment.
   */
  const next = () => {
    if (answers[step] === undefined) {
      return
    }

    if (step === questions.length - 1) {
      computeProfile(answers)
      navigate('/results')
    } else {
      setStep(step + 1)
    }
  }

  /*
   * Loading screen
   */
  if (loading) {
    return (
      <main className="mx-auto max-w-3xl px-5 py-20">
        <div className="card p-10 text-center">

          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-purple-50">
            <Loader2
              size={30}
              className="animate-spin text-purplex"
            />
          </div>

          <h1 className="mt-6 text-3xl font-black">
            AI is creating your assessment
          </h1>

          <p className="mx-auto mt-3 max-w-xl text-gray-500">
            TalentRush is analyzing your profile, interests,
            skills and goals to create questions specifically
            for you.
          </p>

          <div className="mt-6 flex items-center justify-center gap-2 text-sm font-semibold text-purplex">
            <Sparkles size={16} />
            Generating personalized questions...
          </div>

        </div>
      </main>
    )
  }

  /*
   * Error screen
   */
  if (error) {
    return (
      <main className="mx-auto max-w-3xl px-5 py-20">
        <div className="card p-10 text-center">

          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-red-50">
            <AlertCircle
              size={30}
              className="text-red-500"
            />
          </div>

          <h1 className="mt-6 text-2xl font-black">
            Assessment unavailable
          </h1>

          <p className="mt-3 text-gray-500">
            {error}
          </p>

          <button
            onClick={() => window.location.reload()}
            className="gradient-bg mt-6 rounded-xl px-6 py-3 font-bold text-white"
          >
            Try Again
          </button>

        </div>
      </main>
    )
  }

  const q = questions[step]

  if (!q) {
    return null
  }

  const progress =
    ((step + 1) / questions.length) * 100

  return (
    <main className="mx-auto max-w-3xl px-5 py-12">

      {/* HEADER */}
      <div className="mb-8 flex items-start justify-between gap-4">

        <div>

          <div className="flex items-center gap-2">

            <Sparkles
              size={18}
              className="text-purplex"
            />

            <p className="text-sm font-bold text-purplex">
              AI PERSONALIZED ASSESSMENT
            </p>

          </div>

          <h1 className="mt-2 text-3xl font-black">
            Let's discover what you're great at.
          </h1>

          <p className="mt-2 text-gray-500">
            These questions were generated specifically
            from your profile, interests and goals.
          </p>

        </div>

        <span className="whitespace-nowrap font-bold text-gray-500">
          {step + 1}/{questions.length}
        </span>

      </div>

      {/* PROGRESS BAR */}
      <div className="mb-8 h-2 overflow-hidden rounded-full bg-gray-200">

        <div
          className="gradient-bg h-full transition-all duration-300"
          style={{
            width: `${progress}%`,
          }}
        />

      </div>

      {/* QUESTION CARD */}
      <div className="card p-7 md:p-10">

        <div className="flex items-center justify-between">

          <p className="text-sm font-bold uppercase tracking-wide text-gray-400">
            Question {step + 1}
          </p>

          {q.difficulty && (
            <span className="rounded-full bg-purple-50 px-3 py-1 text-xs font-bold text-purplex">
              {q.difficulty}
            </span>
          )}

        </div>

        <h2 className="mt-3 text-2xl font-black leading-tight">
          {q.question}
        </h2>

        {/* SKILLS BEING TESTED */}
        {Array.isArray(q.skills) && q.skills.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-2">

            {q.skills.map((skill) => (
              <span
                key={skill}
                className="rounded-full bg-gray-100 px-3 py-1 text-xs font-semibold text-gray-500"
              >
                {skill}
              </span>
            ))}

          </div>
        )}

        {/* OPTIONS */}
        <div className="mt-7 grid gap-3">

          {q.options.map((option, i) => {

            const selected =
              answers[step] === option

            return (
              <button
                key={i}
                onClick={() => choose(option)}
                className={`
                  rounded-xl border p-4
                  text-left font-semibold
                  transition-all
                  ${
                    selected
                      ? 'border-purplex bg-purple-50 text-purplex shadow-sm'
                      : 'border-gray-200 hover:border-purple-300 hover:bg-purple-50/40'
                  }
                `}
              >

                <div className="flex items-center justify-between gap-3">

                  <span>
                    {option.text}
                  </span>

                  {selected && (
                    <span className="text-sm font-bold">
                      ✓
                    </span>
                  )}

                </div>

              </button>
            )
          })}

        </div>

        {/* NAVIGATION */}
        <div className="mt-8 flex justify-between">

          <button
            disabled={step === 0}
            onClick={() => setStep(step - 1)}
            className="
              flex items-center gap-2
              rounded-xl px-4 py-3
              font-bold text-gray-500
              disabled:opacity-30
            "
          >

            <ChevronLeft size={18} />

            Back

          </button>

          <button
            onClick={next}
            disabled={answers[step] === undefined}
            className="
              gradient-bg
              flex items-center gap-2
              rounded-xl px-5 py-3
              font-bold text-white
              disabled:cursor-not-allowed
              disabled:opacity-50
            "
          >

            {step === questions.length - 1
              ? 'See My Results'
              : 'Continue'}

            <ArrowRight size={18} />

          </button>

        </div>

      </div>

    </main>
  )
}
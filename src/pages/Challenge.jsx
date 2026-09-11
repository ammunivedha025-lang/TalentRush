import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Upload, Trophy, CheckCircle2, ArrowRight } from 'lucide-react'
import { CHALLENGES } from '../data/challenges'
import { useApp } from '../context/AppContext'

export default function Challenge() {
  const { topTalent, completeChallenge } = useApp()
  const [submitted, setSubmitted] = useState(false)

  const talentKey = topTalent ? topTalent.key : 'design'
  const challenge = CHALLENGES[talentKey]

  const submit = () => {
    completeChallenge(challenge, talentKey)
    setSubmitted(true)
  }

  return (
    <main className="mx-auto max-w-4xl px-5 py-10">
      <div className="mb-8">
        <p className="font-bold text-purplex">RECOMMENDED CHALLENGE {topTalent ? `• Matched to ${topTalent.name}` : ''}</p>
        <h1 className="mt-2 text-4xl font-black">{challenge.title}</h1>
        <p className="mt-3 text-gray-600">{challenge.description}</p>
      </div>
      <div className="grid gap-6 md:grid-cols-3">
        <div className="card p-5"><p className="text-sm text-gray-500">Difficulty</p><b>{challenge.difficulty}</b></div>
        <div className="card p-5"><p className="text-sm text-gray-500">Deadline</p><b>{challenge.deadline}</b></div>
        <div className="card p-5"><p className="text-sm text-gray-500">Reward</p><b className="flex items-center gap-2"><Trophy size={17} /> +{challenge.reward} XP</b></div>
      </div>
      <div className="card mt-6 p-7">
        {!submitted ? <>
          <h2 className="text-xl font-black">Submit your work</h2>
          <div className="mt-5 rounded-2xl border-2 border-dashed border-gray-300 p-10 text-center">
            <Upload className="mx-auto text-purplex" size={32} />
            <p className="mt-3 font-bold">Upload your project</p><p className="mt-1 text-sm text-gray-500">Prototype: file upload is simulated</p>
            <button onClick={submit} className="gradient-bg mt-5 rounded-xl px-6 py-3 font-bold text-white">Submit Challenge</button>
          </div>
        </> : <>
          <div className="rounded-2xl bg-green-50 p-6 text-center">
            <CheckCircle2 className="mx-auto text-green-600" size={42} />
            <h2 className="mt-3 text-2xl font-black text-green-900">Challenge completed!</h2>
            <p className="mt-2 text-green-700">+{challenge.reward} XP added. Your work is now part of your portfolio.</p>
            <Link to="/portfolio" className="mt-5 inline-flex items-center gap-2 rounded-xl bg-gray-950 px-5 py-3 font-bold text-white">View Portfolio <ArrowRight size={18} /></Link>
          </div>
        </>}
      </div>
    </main>
  )
}

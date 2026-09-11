import { Link } from 'react-router-dom'
import { ArrowRight, Flame } from 'lucide-react'
import { useApp } from '../context/AppContext'

const HEADLINES = {
  design: "You're a creative visual thinker.",
  video: "You're a natural storyteller through video.",
  writing: "You've got a way with words.",
  coding: "You think like a builder.",
  photography: "You see the world through a great frame.",
  singing: "Your voice is your strongest asset.",
  dance: "You express yourself best through movement.",
  music: "You hear stories in sound.",
}

export default function Results() {
  const { profile, xp, level } = useApp()

  if (!profile) {
    return (
      <main className="mx-auto max-w-3xl px-5 py-16 text-center">
        <h1 className="text-3xl font-black">No talent profile yet</h1>
        <p className="mt-3 text-gray-500">Take the assessment first to see your strongest skills.</p>
        <Link to="/assessment" className="gradient-bg mt-6 inline-flex items-center gap-2 rounded-xl px-6 py-4 font-bold text-white">Take the Assessment <ArrowRight size={18} /></Link>
      </main>
    )
  }

  const top = profile[0]
  const headline = HEADLINES[top.key] || "You've got a unique mix of talents."

  return (
    <main className="mx-auto max-w-6xl px-5 py-10">
      <div className="rounded-3xl bg-gray-950 p-7 text-white md:p-10">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div><p className="text-sm font-bold text-purple-300">YOUR TALENT PROFILE</p><h1 className="mt-2 text-4xl font-black">{top.emoji} {headline}</h1><p className="mt-3 max-w-2xl text-gray-300">Based on your assessment, these are your strongest potential skills.</p></div>
          <div className="flex items-center gap-2 rounded-xl bg-white/10 px-4 py-3"><Flame size={20} /><b>Level {level}</b><span className="text-gray-400">• {xp} XP</span></div>
        </div>
      </div>
      <section className="mt-8 grid gap-4 md:grid-cols-2">
        {profile.map((t) => (
          <div className="card p-6" key={t.key}>
            <div className="flex items-center justify-between"><div className="flex items-center gap-3"><span className="text-3xl">{t.emoji}</span><div><h2 className="font-black">{t.name}</h2><p className="text-sm text-gray-500">{t.description}</p></div></div><span className="text-2xl font-black text-purplex">{t.score}%</span></div>
            <div className="mt-5 h-3 rounded-full bg-gray-100"><div className="gradient-bg h-full rounded-full" style={{ width: `${t.score}%` }} /></div>
          </div>
        ))}
      </section>
      <div className="mt-8 card flex flex-col justify-between gap-5 p-7 md:flex-row md:items-center">
        <div><p className="font-bold text-purplex">NEXT STEP</p><h2 className="mt-1 text-2xl font-black">Prove your talent with a challenge.</h2><p className="mt-1 text-gray-500">We've picked a challenge based on your strongest skill: {top.name}.</p></div>
        <Link to="/challenge" className="gradient-bg flex shrink-0 items-center justify-center gap-2 rounded-xl px-6 py-3 font-bold text-white">View Challenge <ArrowRight size={18} /></Link>
      </div>
            <div className="mt-6 text-center">
        <Link
          to="/assessment"
          className="inline-flex items-center gap-2 rounded-xl border border-purple-300 px-5 py-3 font-bold text-purplex transition hover:bg-purple-50"
        >
          Retake Assessment
          <ArrowRight size={18} />
        </Link>
      </div>
    </main>
  )
}

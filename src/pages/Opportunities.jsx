import { Link } from 'react-router-dom'
import { Briefcase, MapPin, ArrowRight, Sparkles } from 'lucide-react'
import { OPPORTUNITIES } from '../data/opportunities'
import { useApp } from '../context/AppContext'

export default function Opportunities() {
  const { profile } = useApp()

  if (!profile) {
    return (
      <main className="mx-auto max-w-3xl px-5 py-16 text-center">
        <h1 className="text-3xl font-black">No matches yet</h1>
        <p className="mt-3 text-gray-500">Take the assessment so opportunities can be matched to your talent profile.</p>
        <Link to="/assessment" className="gradient-bg mt-6 inline-flex items-center gap-2 rounded-xl px-6 py-4 font-bold text-white">Take the Assessment <ArrowRight size={18} /></Link>
      </main>
    )
  }

  const scoreByKey = Object.fromEntries(profile.map(t => [t.key, t.score]))
  const matched = OPPORTUNITIES
    .map(o => ({ ...o, match: scoreByKey[o.tag] ?? 40 }))
    .sort((a, b) => b.match - a.match)

  return (
    <main className="mx-auto max-w-6xl px-5 py-10">
      <div><p className="font-bold text-purplex">AI-MATCHED OPPORTUNITIES</p><h1 className="mt-2 text-4xl font-black">Opportunities made for you.</h1><p className="mt-2 text-gray-500">Matches are based on your talent profile and completed work.</p></div>
      <div className="mt-8 grid gap-5">
        {matched.map(o => (
          <div key={o.title} className="card flex flex-col gap-5 p-6 md:flex-row md:items-center">
            <div className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-purple-50 text-2xl">{o.icon}</div>
            <div className="min-w-0 flex-1"><div className="flex flex-wrap items-center gap-2"><h2 className="text-xl font-black">{o.title}</h2><span className="rounded-full bg-purple-50 px-2 py-1 text-xs font-bold text-purplex"><Sparkles size={11} className="mr-1 inline" /> {o.match}% Match</span></div><p className="mt-1 text-sm text-gray-500"><Briefcase size={14} className="mr-1 inline" />{o.type} • <MapPin size={14} className="mr-1 inline" />College/Remote</p></div>
            <div className="text-right"><p className="font-black">{o.reward}</p><button className="mt-2 flex items-center gap-2 rounded-xl bg-gray-950 px-4 py-2 text-sm font-bold text-white">Apply <ArrowRight size={15} /></button></div>
          </div>
        ))}
      </div>
    </main>
  )
}

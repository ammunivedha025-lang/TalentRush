import { Link } from 'react-router-dom'
import { ArrowRight, Award, Eye } from 'lucide-react'
import { useApp } from '../context/AppContext'
import { talentByKey } from '../data/talents'
import { OPPORTUNITIES } from '../data/opportunities'

export default function Portfolio() {
  const { completedChallenges, xp, level, profile } = useApp()

  const matchedOpportunities = profile
    ? OPPORTUNITIES.filter(o => profile.slice(0, 3).some(t => t.key === o.tag)).length
    : 0

  return (
    <main className="mx-auto max-w-6xl px-5 py-10">
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
        <div><p className="font-bold text-purplex">MY PORTFOLIO</p><h1 className="mt-2 text-4xl font-black">Your work speaks for you.</h1><p className="mt-2 text-gray-500">Completed TalentRush challenges become proof of your skills.</p></div>
        <button className="flex items-center gap-2 rounded-xl border px-5 py-3 font-bold"><Eye size={17} /> Preview Portfolio</button>
      </div>
      <div className="mt-8 grid gap-6 md:grid-cols-3">
        <div className="card p-6 md:col-span-2">
          {completedChallenges.length === 0 ? (
            <div className="flex h-48 flex-col items-center justify-center gap-3 rounded-2xl bg-gray-50 text-center text-gray-500">
              <p className="font-bold">No completed challenges yet</p>
              <Link to="/challenge" className="text-sm font-bold text-purplex">Go complete your first challenge →</Link>
            </div>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2">
              {completedChallenges.map((c, i) => {
                const t = talentByKey[c.talentKey]
                return (
                  <div key={i} className="rounded-2xl border border-gray-200 p-4">
                    <div className="flex h-32 items-center justify-center rounded-xl bg-gradient-to-br from-purple-100 to-pink-100 text-5xl">{t?.emoji || '🏆'}</div>
                    <div className="mt-4 flex items-start justify-between">
                      <div><h2 className="font-black">{c.title}</h2><p className="mt-1 text-sm text-gray-500">{t?.name} • Completed Challenge</p></div>
                      <span className="shrink-0 rounded-full bg-green-50 px-3 py-1 text-xs font-bold text-green-700">Verified</span>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>
        <div className="card p-6">
          <Award className="text-purplex" size={30} />
          <h2 className="mt-4 text-2xl font-black">{xp} XP</h2>
          <p className="text-gray-500">Level {level} Creator</p>
          <div className="mt-6 space-y-3 text-sm">
            <div className="flex justify-between"><span>Challenges</span><b>{completedChallenges.length}</b></div>
            <div className="flex justify-between"><span>Portfolio projects</span><b>{completedChallenges.length}</b></div>
            <div className="flex justify-between"><span>Opportunities matched</span><b>{matchedOpportunities}</b></div>
          </div>
        </div>
      </div>
      <div className="mt-8 card flex flex-col justify-between gap-4 p-7 md:flex-row md:items-center">
        <div><h2 className="text-xl font-black">Ready to turn skills into opportunities?</h2><p className="text-gray-500">See opportunities matched to your talent profile.</p></div>
        <Link to="/opportunities" className="gradient-bg flex items-center justify-center gap-2 rounded-xl px-5 py-3 font-bold text-white">Find Opportunities <ArrowRight size={18} /></Link>
      </div>
    </main>
  )
}

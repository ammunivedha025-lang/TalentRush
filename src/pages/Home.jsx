import { Link } from 'react-router-dom'
import {
  ArrowRight,
  Sparkles,
  Target,
  Briefcase,
  Medal,
} from 'lucide-react'

import { TALENTS } from '../data/talents'
import { useApp } from '../context/AppContext'

export default function Home() {
  const {
    profile,
    userProfile,
    profileCompletion,
  } = useApp()

  const hasUserProfile = Boolean(userProfile)

  const skills = userProfile?.skills || []
  const interests = userProfile?.interests || []

  return (
    <main>
      <section className="mx-auto max-w-6xl px-5 pb-10 pt-20 md:pt-28">
        <div className="grid items-center gap-12 md:grid-cols-2">

          {/* LEFT SIDE */}

          <div>
            <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-purple-50 px-4 py-2 text-sm font-bold text-purplex">
              <Sparkles size={16} />

              Talent discovery, gamified
            </div>

            {hasUserProfile ? (
              <>
                <h1 className="text-5xl font-black leading-tight md:text-6xl">
                  Welcome back,
                  <br />

                  <span className="gradient-text">
                    {userProfile.name}!
                  </span>
                </h1>

                <p className="mt-6 max-w-xl text-lg leading-8 text-gray-600">
                  Your TalentRush journey starts with
                  understanding what you can do and what
                  you want to achieve.
                </p>
              </>
            ) : (
              <>
                <h1 className="text-5xl font-black leading-tight md:text-6xl">
                  Discover your talent.
                  <br />

                  <span className="gradient-text">
                    Build your future.
                  </span>
                </h1>

                <p className="mt-6 max-w-xl text-lg leading-8 text-gray-600">
                  TalentRush helps students discover hidden
                  strengths, prove them through challenges,
                  build a portfolio and find opportunities.
                </p>
              </>
            )}

            {/* MAIN BUTTON */}

            {!hasUserProfile ? (
              <Link
                to="/profile"
                className="gradient-bg mt-8 inline-flex items-center gap-2 rounded-xl px-6 py-4 font-bold text-white shadow-lg"
              >
                Create My Profile
                <ArrowRight size={18} />
              </Link>
            ) : !profile ? (
              <Link
                to="/assessment"
                className="gradient-bg mt-8 inline-flex items-center gap-2 rounded-xl px-6 py-4 font-bold text-white shadow-lg"
              >
                Take My Assessment
                <ArrowRight size={18} />
              </Link>
            ) : (
              <Link
                to="/results"
                className="gradient-bg mt-8 inline-flex items-center gap-2 rounded-xl px-6 py-4 font-bold text-white shadow-lg"
              >
                View My Talent Results
                <ArrowRight size={18} />
              </Link>
            )}

            {/* PROFILE INFORMATION */}

            {hasUserProfile && (
              <div className="mt-7 card p-5">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs font-bold text-gray-500">
                      PROFILE COMPLETION
                    </p>

                    <p className="mt-1 text-2xl font-black">
                      {profileCompletion}%
                    </p>
                  </div>

                  <Link
                    to="/profile"
                    className="text-sm font-bold text-purplex"
                  >
                    Edit Profile
                  </Link>
                </div>

                <div className="mt-4 h-2 overflow-hidden rounded-full bg-gray-200">
                  <div
                    className="gradient-bg h-full rounded-full transition-all"
                    style={{
                      width: `${profileCompletion}%`,
                    }}
                  />
                </div>
              </div>
            )}
          </div>

          {/* RIGHT SIDE */}

          <div className="card p-7">
            <p className="text-sm font-bold text-gray-500">
              YOUR TALENTRUSH JOURNEY
            </p>

            <div className="mt-6 space-y-5">

              {[
                [
                  Sparkles,
                  'AI Assessment',
                  hasUserProfile
                    ? 'Recommended based on your profile'
                    : 'Find your strongest skills',
                ],
                [
                  Target,
                  'Challenges',
                  'Prove what you can do',
                ],
                [
                  Medal,
                  'Portfolio',
                  'Turn work into proof',
                ],
                [
                  Briefcase,
                  'Opportunities',
                  'Get matched with work',
                ],
              ].map(([Icon, title, desc], i) => (
                <div
                  key={title}
                  className="flex items-center gap-4"
                >
                  <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-purple-50 text-purplex">
                    <Icon size={20} />
                  </div>

                  <div>
                    <div className="font-bold">
                      {i + 1}. {title}
                    </div>

                    <div className="text-sm text-gray-500">
                      {desc}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* PERSONALIZED ASSESSMENT */}

      {hasUserProfile && !profile && (
        <section className="mx-auto max-w-6xl px-5 pb-10">
          <div className="card p-7">
            <div className="flex flex-col justify-between gap-6 md:flex-row md:items-center">

              <div>
                <p className="text-sm font-bold text-purplex">
                  RECOMMENDED FOR YOU
                </p>

                <h2 className="mt-2 text-2xl font-black">
                  Discover your talent profile
                </h2>

                <p className="mt-2 max-w-2xl text-gray-500">
                  Your profile tells us what you're interested
                  in. Now take the TalentRush assessment to
                  discover your strongest natural talents.
                </p>

                {/* SKILLS */}

                {skills.length > 0 && (
                  <div className="mt-4">
                    <p className="mb-2 text-xs font-bold text-gray-500">
                      YOUR SKILLS
                    </p>

                    <div className="flex flex-wrap gap-2">
                      {skills.map(skill => (
                        <span
                          key={skill}
                          className="rounded-full bg-purple-50 px-3 py-1.5 text-sm font-semibold text-purplex"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* INTERESTS */}

                {interests.length > 0 && (
                  <div className="mt-4">
                    <p className="mb-2 text-xs font-bold text-gray-500">
                      YOUR INTERESTS
                    </p>

                    <div className="flex flex-wrap gap-2">
                      {interests.map(interest => (
                        <span
                          key={interest}
                          className="rounded-full bg-gray-100 px-3 py-1.5 text-sm font-semibold text-gray-600"
                        >
                          {interest}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <Link
                to="/assessment"
                className="gradient-bg inline-flex shrink-0 items-center justify-center gap-2 rounded-xl px-6 py-4 font-bold text-white shadow-lg"
              >
                Take Assessment
                <ArrowRight size={18} />
              </Link>

            </div>
          </div>
        </section>
      )}

      {/* TALENTS */}

      <section className="mx-auto max-w-6xl px-5 pb-24">
        <p className="text-center text-sm font-bold text-gray-500">
          EVERY HIDDEN TALENT COUNTS
        </p>

        <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
          {TALENTS.map(t => (
            <div
              key={t.key}
              className="card flex flex-col items-center gap-2 p-5 text-center"
            >
              <span className="text-3xl">
                {t.emoji}
              </span>

              <span className="text-sm font-bold">
                {t.name}
              </span>
            </div>
          ))}
        </div>
      </section>
    </main>
  )
}
import { createContext, useContext, useEffect, useState } from 'react'
import { TALENTS } from '../data/talents'

const AppContext = createContext(null)
const STORAGE_KEY = 'talentrush_state_v2'

const DEFAULT_STATE={
  profile:null,
  userProfile:null,
  completedChallenges:[],
  xp:0,
}

function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw) {
      return { 
        ...DEFAULT_STATE,
        ...JSON.parse(raw),
     } 
    }
  } catch(error){
    console.warn('Unable to load TalentRush data:',error)
  }
  return DEFAULT_STATE
}

export function AppProvider({ children }) {
  const [state, setState] = useState(loadState)

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
    } catch (error) {
      // ignore write failures (e.g. private browsing storage limits)
    }
  }, [state])
  /*
   * USER PROFILE
   */

  function saveUserProfile(profileData) {
    const now = new Date().toISOString()

    setState(currentState => {
      const existingProfile = currentState.userProfile

      const profile = {
        id: existingProfile?.id || crypto.randomUUID(),
        ...profileData,
        profileCompleted: calculateProfileCompletion(profileData) === 100,
        createdAt: existingProfile?.createdAt || now,
        updatedAt: now,
      }

      return {
        ...currentState,
        userProfile: profile,
      }
    })
  }

  function updateUserProfile(profileData) {
    saveUserProfile(profileData)
  }

  function calculateProfileCompletion(profile) {
    if (!profile) return 0

    const checks = [
      Boolean(profile.name?.trim()),
      Boolean(profile.education?.trim()),
      Array.isArray(profile.skills) && profile.skills.length > 0,
      Array.isArray(profile.interests) && profile.interests.length > 0,
      Boolean(profile.careerGoal?.trim()),
      Boolean(profile.experienceLevel),
      Boolean(profile.preferredOpportunityType),
    ]

    const completed = checks.filter(Boolean).length

    return Math.round((completed / checks.length) * 100)
  }
  /*
   * TALENT ASSESSMENT
   */

  // Tally weighted tags from quiz answers into a 0-100 score per talent.
  function computeProfile(answers) {
    const tally = {}
    let totalPicks = 0
    answers.forEach(option => {
      if (!option) return
      option.tags.forEach(tag => {
        tally[tag] = (tally[tag] || 0) + 1
        totalPicks += 1
      })
    })

    const scored = TALENTS
      .map(t => {
        const hits = tally[t.key] || 0
        // Base score scales with how often a talent was picked, with a floor
        // so untouched talents still show a plausible baseline percentage.
        const raw = totalPicks > 0 ? Math.round((hits / totalPicks) * 100) : 0
        const score = Math.min(97, Math.max(hits > 0 ? 55 : 30, raw + (hits > 0 ? 45 : 0)))
        return { ...t, score, hits }
      })
      .sort((a, b) => b.score - a.score || b.hits - a.hits)

    setState(s => ({ ...s, profile: scored }))
    return scored
  }

  function completeChallenge(challenge, talentKey) {
    setState(s => ({
      ...s,
      xp: s.xp + (challenge.reward || 0),
      completedChallenges: [
        ...s.completedChallenges,
        { ...challenge, talentKey, completedAt: new Date().toISOString() },
      ],
    }))
  }
  /*
   *RESET
   */
  function resetProgress() {
    setState(DEFAULT_STATE)
  }

  const level = Math.max(1, Math.floor(state.xp / 150) + 1)
  const topTalent = state.profile && state.profile.length ? state.profile[0] : null
  const profileCompletion = calculateProfileCompletion(
    state.userProfile
  )
  return (
    <AppContext.Provider
  value={{
    ...state,
    level,
    topTalent,
    profileCompletion,
    computeProfile,
    saveUserProfile,
    updateUserProfile,
    calculateProfileCompletion,
    completeChallenge,
    resetProgress,
  }}
>
      {children}
    </AppContext.Provider>
  )
}

export function useApp() {
  const context = useContext(AppContext)
  if (!context) { 
    throw new Error('useApp must be used within AppProvider')
  }
  return context
}

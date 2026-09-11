import { useEffect, useState } from 'react'
import {
  UserRound,
  GraduationCap,
  Target,
  Briefcase,
  Plus,
  X,
  Save,
  Pencil,
  CheckCircle2,
} from 'lucide-react'

import { useApp } from '../context/AppContext'

const EXPERIENCE_LEVELS = [
  'Beginner',
  'Intermediate',
  'Advanced',
]

const OPPORTUNITY_TYPES = [
  'Internship',
  'Full-time',
  'Part-time',
  'Freelance',
  'Hackathon',
  'Any',
]

const EMPTY_PROFILE = {
  name: '',
  education: '',
  skills: [],
  interests: [],
  careerGoal: '',
  experienceLevel: '',
  preferredOpportunityType: '',
}

export default function Profile() {
  const {
    userProfile,
    profileCompletion,
    saveUserProfile,
  } = useApp()

  const [form, setForm] = useState(EMPTY_PROFILE)
  const [skillInput, setSkillInput] = useState('')
  const [interestInput, setInterestInput] = useState('')
  const [editing, setEditing] = useState(true)
  const [message, setMessage] = useState('')
  const [errors, setErrors] = useState({})

  useEffect(() => {
    if (userProfile) {
      setForm({
        name: userProfile.name || '',
        education: userProfile.education || '',
        skills: userProfile.skills || [],
        interests: userProfile.interests || [],
        careerGoal: userProfile.careerGoal || '',
        experienceLevel: userProfile.experienceLevel || '',
        preferredOpportunityType:
          userProfile.preferredOpportunityType || '',
      })

      setEditing(false)
    }
  }, [userProfile])

  function updateField(field, value) {
    setForm(current => ({
      ...current,
      [field]: value,
    }))

    setErrors(current => ({
      ...current,
      [field]: '',
    }))
  }

  function addSkill() {
    const skill = skillInput.trim()

    if (!skill) return

    const alreadyExists = form.skills.some(
      item => item.toLowerCase() === skill.toLowerCase()
    )

    if (alreadyExists) {
      setSkillInput('')
      return
    }

    setForm(current => ({
      ...current,
      skills: [...current.skills, skill],
    }))

    setSkillInput('')
    setErrors(current => ({
      ...current,
      skills: '',
    }))
  }

  function removeSkill(skillToRemove) {
    setForm(current => ({
      ...current,
      skills: current.skills.filter(
        skill => skill !== skillToRemove
      ),
    }))
  }

  function addInterest() {
    const interest = interestInput.trim()

    if (!interest) return

    const alreadyExists = form.interests.some(
      item =>
        item.toLowerCase() === interest.toLowerCase()
    )

    if (alreadyExists) {
      setInterestInput('')
      return
    }

    setForm(current => ({
      ...current,
      interests: [...current.interests, interest],
    }))

    setInterestInput('')

    setErrors(current => ({
      ...current,
      interests: '',
    }))
  }

  function removeInterest(interestToRemove) {
    setForm(current => ({
      ...current,
      interests: current.interests.filter(
        interest => interest !== interestToRemove
      ),
    }))
  }

  function handleKeyDown(event, action) {
    if (event.key === 'Enter') {
      event.preventDefault()
      action()
    }
  }

  function validate() {
    const newErrors = {}

    if (!form.name.trim()) {
      newErrors.name = 'Please enter your name.'
    }

    if (!form.education.trim()) {
      newErrors.education =
        'Please enter your education.'
    }

    if (form.skills.length === 0) {
      newErrors.skills =
        'Please add at least one skill.'
    }

    if (form.interests.length === 0) {
      newErrors.interests =
        'Please add at least one interest.'
    }

    if (!form.careerGoal.trim()) {
      newErrors.careerGoal =
        'Please enter your career goal.'
    }

    if (!form.experienceLevel) {
      newErrors.experienceLevel =
        'Please select your experience level.'
    }

    if (!form.preferredOpportunityType) {
      newErrors.preferredOpportunityType =
        'Please select your preferred opportunity.'
    }

    setErrors(newErrors)

    return Object.keys(newErrors).length === 0
  }

  function handleSubmit(event) {
    event.preventDefault()

    if (!validate()) {
      setMessage('')
      return
    }

    saveUserProfile(form)

    setEditing(false)
    setMessage(
      'Your TalentRush profile has been saved successfully!'
    )

    setTimeout(() => {
      setMessage('')
    }, 3000)
  }

  const displayedCompletion = editing
    ? calculateLiveCompletion(form)
    : profileCompletion

  return (
    <main className="mx-auto max-w-5xl px-5 py-10">
      {/* HEADER */}

      <div className="mb-8">
        <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
          <div>
            <p className="font-bold text-purplex">
              MY PROFILE
            </p>

            <h1 className="mt-2 text-4xl font-black">
              Build your talent profile.
            </h1>

            <p className="mt-2 max-w-2xl text-gray-500">
              Tell TalentRush about yourself so we can
              understand your skills, interests and career
              goals.
            </p>
          </div>

          {!editing && userProfile && (
            <button
              onClick={() => {
                setEditing(true)
                setMessage('')
              }}
              className="flex items-center justify-center gap-2 rounded-xl border border-white/70 bg-white/50 px-5 py-3 font-bold shadow-sm backdrop-blur"
            >
              <Pencil size={17} />
              Edit Profile
            </button>
          )}
        </div>
      </div>

      {/* COMPLETION CARD */}

      <div className="card mb-6 p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-bold text-gray-500">
              PROFILE COMPLETION
            </p>

            <p className="mt-1 text-2xl font-black">
              {displayedCompletion}%
            </p>
          </div>

          <div className="grid h-12 w-12 place-items-center rounded-full bg-purple-50 text-purplex">
            {displayedCompletion === 100 ? (
              <CheckCircle2 size={25} />
            ) : (
              <UserRound size={25} />
            )}
          </div>
        </div>

        <div className="mt-4 h-3 overflow-hidden rounded-full bg-gray-200/60">
          <div
            className="gradient-bg h-full rounded-full transition-all duration-500"
            style={{
              width: `${displayedCompletion}%`,
            }}
          />
        </div>

        <p className="mt-3 text-sm text-gray-500">
          {displayedCompletion === 100
            ? 'Your profile is complete. You are ready for the next TalentRush steps!'
            : 'Complete your profile to improve future skill matching.'}
        </p>
      </div>

      {/* SUCCESS MESSAGE */}

      {message && (
        <div className="mb-6 flex items-center gap-3 rounded-2xl border border-green-200 bg-green-50/80 px-5 py-4 text-sm font-semibold text-green-700">
          <CheckCircle2 size={20} />
          {message}
        </div>
      )}

      {!editing && userProfile ? (
        <ProfilePreview
          profile={userProfile}
          completion={profileCompletion}
          onEdit={() => setEditing(true)}
        />
      ) : (
        <form onSubmit={handleSubmit}>
          {/* BASIC INFORMATION */}

          <section className="card mb-6 p-6">
            <SectionHeader
              icon={UserRound}
              title="Basic Information"
              description="Start with the basics."
            />

            <div className="mt-6 grid gap-5 md:grid-cols-2">
              <InputField
                label="Full Name"
                value={form.name}
                placeholder="Enter your name"
                error={errors.name}
                onChange={value =>
                  updateField('name', value)
                }
              />

              <InputField
                label="Education"
                value={form.education}
                placeholder="Example: B.Tech Computer Science"
                error={errors.education}
                onChange={value =>
                  updateField('education', value)
                }
              />
            </div>
          </section>

          {/* SKILLS */}

          <section className="card mb-6 p-6">
            <SectionHeader
              icon={Target}
              title="Skills"
              description="Add the skills you currently have."
            />

            <div className="mt-5 flex gap-2">
              <input
                value={skillInput}
                onChange={event =>
                  setSkillInput(event.target.value)
                }
                onKeyDown={event =>
                  handleKeyDown(event, addSkill)
                }
                placeholder="Example: Python"
                className="min-w-0 flex-1 rounded-xl border border-gray-200 bg-white/60 px-4 py-3 outline-none transition focus:border-purple-400 focus:ring-2 focus:ring-purple-100"
              />

              <button
                type="button"
                onClick={addSkill}
                className="gradient-bg flex shrink-0 items-center gap-2 rounded-xl px-4 py-3 font-bold text-white"
              >
                <Plus size={18} />
                Add
              </button>
            </div>

            {errors.skills && (
              <p className="mt-2 text-sm font-medium text-red-500">
                {errors.skills}
              </p>
            )}

            <TagList
              items={form.skills}
              onRemove={removeSkill}
            />
          </section>

          {/* INTERESTS */}

          <section className="card mb-6 p-6">
            <SectionHeader
              icon={Target}
              title="Interests"
              description="What areas do you enjoy exploring?"
            />

            <div className="mt-5 flex gap-2">
              <input
                value={interestInput}
                onChange={event =>
                  setInterestInput(event.target.value)
                }
                onKeyDown={event =>
                  handleKeyDown(event, addInterest)
                }
                placeholder="Example: Artificial Intelligence"
                className="min-w-0 flex-1 rounded-xl border border-gray-200 bg-white/60 px-4 py-3 outline-none transition focus:border-purple-400 focus:ring-2 focus:ring-purple-100"
              />

              <button
                type="button"
                onClick={addInterest}
                className="gradient-bg flex shrink-0 items-center gap-2 rounded-xl px-4 py-3 font-bold text-white"
              >
                <Plus size={18} />
                Add
              </button>
            </div>

            {errors.interests && (
              <p className="mt-2 text-sm font-medium text-red-500">
                {errors.interests}
              </p>
            )}

            <TagList
              items={form.interests}
              onRemove={removeInterest}
            />
          </section>

          {/* CAREER GOAL */}

          <section className="card mb-6 p-6">
            <SectionHeader
              icon={Target}
              title="Career Goal"
              description="Tell us what you want to become."
            />

            <textarea
              value={form.careerGoal}
              onChange={event =>
                updateField(
                  'careerGoal',
                  event.target.value
                )
              }
              placeholder="Example: Become a full-stack developer and build AI-powered products."
              rows={4}
              className="mt-5 w-full resize-none rounded-xl border border-gray-200 bg-white/60 px-4 py-3 outline-none transition focus:border-purple-400 focus:ring-2 focus:ring-purple-100"
            />

            {errors.careerGoal && (
              <p className="mt-2 text-sm font-medium text-red-500">
                {errors.careerGoal}
              </p>
            )}
          </section>

          {/* EXPERIENCE */}

          <section className="card mb-6 p-6">
            <SectionHeader
              icon={GraduationCap}
              title="Experience Level"
              description="Choose the level that best describes you."
            />

            <div className="mt-5 grid gap-3 sm:grid-cols-3">
              {EXPERIENCE_LEVELS.map(level => (
                <SelectionButton
                  key={level}
                  selected={
                    form.experienceLevel === level
                  }
                  onClick={() =>
                    updateField(
                      'experienceLevel',
                      level
                    )
                  }
                  label={level}
                />
              ))}
            </div>

            {errors.experienceLevel && (
              <p className="mt-2 text-sm font-medium text-red-500">
                {errors.experienceLevel}
              </p>
            )}
          </section>

          {/* OPPORTUNITY */}

          <section className="card mb-6 p-6">
            <SectionHeader
              icon={Briefcase}
              title="Preferred Opportunity"
              description="What type of opportunity are you looking for?"
            />

            <div className="mt-5 grid gap-3 sm:grid-cols-2 md:grid-cols-3">
              {OPPORTUNITY_TYPES.map(type => (
                <SelectionButton
                  key={type}
                  selected={
                    form.preferredOpportunityType ===
                    type
                  }
                  onClick={() =>
                    updateField(
                      'preferredOpportunityType',
                      type
                    )
                  }
                  label={type}
                />
              ))}
            </div>

            {errors.preferredOpportunityType && (
              <p className="mt-2 text-sm font-medium text-red-500">
                {errors.preferredOpportunityType}
              </p>
            )}
          </section>

          {/* SAVE */}

          <div className="flex justify-end pb-10">
            <button
              type="submit"
              className="gradient-bg flex items-center gap-2 rounded-xl px-7 py-4 font-bold text-white shadow-lg"
            >
              <Save size={19} />
              Save Profile
            </button>
          </div>
        </form>
      )}
    </main>
  )
}

/*
 * HELPER COMPONENTS
 */

function SectionHeader({
  icon: Icon,
  title,
  description,
}) {
  return (
    <div className="flex items-center gap-4">
      <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-purple-50 text-purplex">
        <Icon size={21} />
      </div>

      <div>
        <h2 className="font-black">{title}</h2>
        <p className="text-sm text-gray-500">
          {description}
        </p>
      </div>
    </div>
  )
}

function InputField({
  label,
  value,
  placeholder,
  error,
  onChange,
}) {
  return (
    <div>
      <label className="mb-2 block text-sm font-bold">
        {label}
      </label>

      <input
        value={value}
        onChange={event =>
          onChange(event.target.value)
        }
        placeholder={placeholder}
        className="w-full rounded-xl border border-gray-200 bg-white/60 px-4 py-3 outline-none transition focus:border-purple-400 focus:ring-2 focus:ring-purple-100"
      />

      {error && (
        <p className="mt-2 text-sm font-medium text-red-500">
          {error}
        </p>
      )}
    </div>
  )
}

function TagList({ items, onRemove }) {
  if (items.length === 0) {
    return (
      <p className="mt-4 text-sm text-gray-400">
        Nothing added yet.
      </p>
    )
  }

  return (
    <div className="mt-4 flex flex-wrap gap-2">
      {items.map(item => (
        <span
          key={item}
          className="flex items-center gap-2 rounded-full bg-purple-50 px-4 py-2 text-sm font-semibold text-purplex"
        >
          {item}

          <button
            type="button"
            onClick={() => onRemove(item)}
            className="rounded-full hover:bg-purple-100"
            aria-label={`Remove ${item}`}
          >
            <X size={15} />
          </button>
        </span>
      ))}
    </div>
  )
}

function SelectionButton({
  selected,
  onClick,
  label,
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-xl border px-4 py-3 text-left text-sm font-bold transition ${
        selected
          ? 'border-purple-400 bg-purple-50 text-purplex shadow-sm'
          : 'border-gray-200 bg-white/50 text-gray-600 hover:border-purple-200 hover:bg-purple-50/50'
      }`}
    >
      {label}
    </button>
  )
}

function ProfilePreview({
  profile,
  completion,
  onEdit,
}) {
  return (
    <div className="pb-10">
      <section className="card mb-6 p-7">
        <div className="flex flex-col gap-5 md:flex-row md:items-center">
          <div className="gradient-bg grid h-20 w-20 shrink-0 place-items-center rounded-3xl text-3xl font-black text-white shadow-lg">
            {profile.name?.charAt(0)?.toUpperCase() ||
              'T'}
          </div>

          <div>
            <p className="text-sm font-bold text-purplex">
              TALENTRUSH MEMBER
            </p>

            <h2 className="mt-1 text-3xl font-black">
              {profile.name}
            </h2>

            <p className="mt-1 text-gray-500">
              {profile.education}
            </p>
          </div>
        </div>
      </section>

      <div className="grid gap-6 md:grid-cols-2">
        <InfoCard
          title="Skills"
          items={profile.skills}
        />

        <InfoCard
          title="Interests"
          items={profile.interests}
        />

        <div className="card p-6">
          <p className="text-sm font-bold text-gray-500">
            CAREER GOAL
          </p>

          <p className="mt-3 font-semibold leading-7">
            {profile.careerGoal}
          </p>
        </div>

        <div className="card p-6">
          <p className="text-sm font-bold text-gray-500">
            EXPERIENCE
          </p>

          <p className="mt-3 font-black text-xl">
            {profile.experienceLevel}
          </p>

          <p className="mt-5 text-sm font-bold text-gray-500">
            PREFERRED OPPORTUNITY
          </p>

          <p className="mt-2 font-semibold">
            {profile.preferredOpportunityType}
          </p>
        </div>
      </div>

      <div className="mt-6 card flex flex-col justify-between gap-4 p-6 md:flex-row md:items-center">
        <div>
          <p className="font-black">
            Profile ready for TalentRush
          </p>

          <p className="mt-1 text-sm text-gray-500">
            Your profile is {completion}% complete.
          </p>
        </div>

        <button
          onClick={onEdit}
          className="flex items-center justify-center gap-2 rounded-xl border border-gray-200 px-5 py-3 font-bold"
        >
          <Pencil size={17} />
          Edit Profile
        </button>
      </div>
    </div>
  )
}

function InfoCard({ title, items }) {
  return (
    <div className="card p-6">
      <p className="text-sm font-bold text-gray-500">
        {title.toUpperCase()}
      </p>

      <div className="mt-4 flex flex-wrap gap-2">
        {items.map(item => (
          <span
            key={item}
            className="rounded-full bg-purple-50 px-4 py-2 text-sm font-semibold text-purplex"
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  )
}

function calculateLiveCompletion(profile) {
  if (!profile) return 0

  const checks = [
    Boolean(profile.name?.trim()),
    Boolean(profile.education?.trim()),
    profile.skills?.length > 0,
    profile.interests?.length > 0,
    Boolean(profile.careerGoal?.trim()),
    Boolean(profile.experienceLevel),
    Boolean(profile.preferredOpportunityType),
  ]

  return Math.round(
    (checks.filter(Boolean).length / checks.length) * 100
  )
}
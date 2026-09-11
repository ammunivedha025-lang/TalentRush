import { Link, useLocation } from 'react-router-dom'
import {
  Flame,
  Trophy,
  Briefcase,
  UserRound,
} from 'lucide-react'

import { useApp } from '../context/AppContext'

export default function Navbar() {
  const { pathname } = useLocation()

  const {
    xp = 0,
    level = 1,
    userProfile = null,
  } = useApp()

  // Navigation links
  const links = [
    {
      to: '/',
      label: 'Dashboard',
      Icon: Trophy,
    },
    {
      to: '/profile',
      label: 'Profile',
      Icon: UserRound,
    },
    {
      to: '/portfolio',
      label: 'Portfolio',
      Icon: UserRound,
    },
    {
      to: '/opportunities',
      label: 'Opportunities',
      Icon: Briefcase,
    },
  ]

  return (
    <nav className="sticky top-0 z-20 border-b border-white/60 bg-white/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4">

        {/* LOGO */}

        <Link
          to="/"
          className="flex items-center gap-2 text-xl font-black"
        >
          <span className="gradient-bg grid h-9 w-9 place-items-center rounded-xl text-white">
            <Flame size={20} />
          </span>

          Talent
          <span className="gradient-text">
            Rush
          </span>
        </Link>

        {/* NAVIGATION */}

        <div className="hidden items-center gap-6 md:flex">
          {links.map(({ to, label, Icon }) => (
            <Link
              key={to}
              to={to}
              className={`flex items-center gap-2 text-sm font-semibold transition ${
                pathname === to
                  ? 'text-purplex'
                  : 'text-gray-500 hover:text-gray-900'
              }`}
            >
              <Icon size={16} />
              {label}
            </Link>
          ))}
        </div>

        {/* PROFILE + XP */}

        <div className="flex items-center gap-3">

          {userProfile && (
            <Link
              to="/profile"
              className="hidden items-center gap-2 rounded-full bg-purple-50 px-3 py-2 text-sm font-bold text-purplex sm:flex"
            >
              <span className="grid h-6 w-6 place-items-center rounded-full bg-purple-200 text-xs">
                {userProfile.name
                  ?.charAt(0)
                  ?.toUpperCase() || 'T'}
              </span>

              <span className="max-w-28 truncate">
                {userProfile.name}
              </span>
            </Link>
          )}

          <div className="flex items-center gap-2 rounded-full bg-gray-100 px-4 py-2 text-sm font-semibold">
            <Flame
              size={15}
              className="text-purplex"
            />

            Lv.{level} • {xp} XP
          </div>

        </div>
      </div>
    </nav>
  )
}
// TalentRush Universal Personalized Assessment
// The question bank covers technical, creative, communication,
// performance, and problem-solving abilities.

export const questions = [

  // =========================
  // TECHNICAL
  // =========================

  {
    id: 'programming-1',
    domains: ['programming', 'technical', 'problem-solving'],
    q: 'When solving a technical problem, what do you naturally prefer?',
    options: [
      { label: 'Break the problem into logical steps 💻', tags: ['coding', 'problem-solving'] },
      { label: 'Experiment with different solutions 🔧', tags: ['coding', 'problem-solving'] },
      { label: 'Explain the problem clearly to others ✍️', tags: ['writing', 'communication'] },
      { label: 'Create a visual way to understand it 🎨', tags: ['design'] },
    ],
  },

  {
    id: 'robotics-1',
    domains: ['robotics', 'programming', 'automation', 'technical'],
    q: 'Which robotics project would interest you most?',
    options: [
      { label: 'Build a robot that performs a task 🤖', tags: ['coding', 'robotics'] },
      { label: 'Program sensors and automated actions ⚙️', tags: ['coding', 'robotics'] },
      { label: 'Design the robot appearance 🎨', tags: ['design'] },
      { label: 'Create a video explaining the robot 🎬', tags: ['video', 'communication'] },
    ],
  },

  {
    id: 'ai-1',
    domains: ['ai', 'machine-learning', 'programming', 'technical'],
    q: 'Which technology project sounds most exciting?',
    options: [
      { label: 'Build an AI system that learns from data 🧠', tags: ['coding', 'ai'] },
      { label: 'Build a useful web or mobile application 💻', tags: ['coding'] },
      { label: 'Create the visual interface for the application 🎨', tags: ['design'] },
      { label: 'Create content explaining the technology ✍️', tags: ['writing'] },
    ],
  },

  {
    id: 'problem-solving-1',
    domains: ['problem-solving', 'technical'],
    q: 'A project suddenly stops working. What would you most likely do first?',
    options: [
      { label: 'Investigate the problem step by step 🔍', tags: ['problem-solving', 'coding'] },
      { label: 'Try different approaches until one works 🔧', tags: ['problem-solving'] },
      { label: 'Ask someone and discuss possible causes 🤝', tags: ['communication'] },
      { label: 'Redesign the approach completely 💡', tags: ['design', 'problem-solving'] },
    ],
  },

  // =========================
  // CREATIVE
  // =========================

  {
    id: 'design-1',
    domains: ['design', 'creative'],
    q: 'When creating a visual design, what interests you most?',
    options: [
      { label: 'Colors, layouts and visual balance 🎨', tags: ['design'] },
      { label: 'Finding interesting photographs 📸', tags: ['photography'] },
      { label: 'Creating movement and animation 🎬', tags: ['video', 'design'] },
      { label: 'Creating a story around the visual ✍️', tags: ['writing', 'storytelling'] },
    ],
  },

  {
    id: 'video-1',
    domains: ['video', 'creative', 'storytelling'],
    q: 'You receive several video clips. What would you enjoy doing most?',
    options: [
      { label: 'Arrange clips into a compelling story 🎬', tags: ['video', 'storytelling'] },
      { label: 'Improve transitions, timing and effects ✨', tags: ['video'] },
      { label: 'Choose the best visual compositions 📸', tags: ['photography'] },
      { label: 'Write the script and narration ✍️', tags: ['writing', 'storytelling'] },
    ],
  },

  {
    id: 'photography-1',
    domains: ['photography', 'creative'],
    q: 'When taking a photograph, what do you pay attention to first?',
    options: [
      { label: 'Composition and framing 📸', tags: ['photography'] },
      { label: 'Lighting and colors 🎨', tags: ['photography', 'design'] },
      { label: 'The story or emotion in the moment ✨', tags: ['photography', 'storytelling'] },
      { label: 'How the photo could fit into a video 🎬', tags: ['photography', 'video'] },
    ],
  },

  // =========================
  // MUSIC
  // =========================

  {
    id: 'music-1',
    domains: ['music', 'creative'],
    q: 'Which music activity would you enjoy practicing repeatedly?',
    options: [
      { label: 'Creating melodies or beats 🎧', tags: ['music'] },
      { label: 'Practicing vocals and singing 🎤', tags: ['singing'] },
      { label: 'Performing with movement and rhythm 💃', tags: ['dance'] },
      { label: 'Creating visuals for a music project 🎨', tags: ['design', 'video'] },
    ],
  },

  {
    id: 'singing-1',
    domains: ['singing', 'music', 'performance'],
    q: 'What would you enjoy most about preparing for a performance?',
    options: [
      { label: 'Practicing vocals and pitch 🎤', tags: ['singing'] },
      { label: 'Working with rhythm and music 🎧', tags: ['music'] },
      { label: 'Creating expressive movement 💃', tags: ['dance'] },
      { label: 'Creating the performance story ✍️', tags: ['storytelling'] },
    ],
  },

  {
    id: 'dance-1',
    domains: ['dance', 'performance', 'creative'],
    q: 'What part of learning a dance routine would you enjoy most?',
    options: [
      { label: 'Learning and perfecting movements 💃', tags: ['dance'] },
      { label: 'Understanding rhythm and music 🎧', tags: ['music', 'dance'] },
      { label: 'Expressing a story through movement 🎭', tags: ['dance', 'storytelling'] },
      { label: 'Creating the visual concept of the performance 🎨', tags: ['design'] },
    ],
  },

  // =========================
  // WRITING & STORYTELLING
  // =========================

  {
    id: 'writing-1',
    domains: ['writing', 'communication'],
    q: 'Which task would you enjoy most?',
    options: [
      { label: 'Write an article that explains an idea ✍️', tags: ['writing'] },
      { label: 'Create an engaging story 📖', tags: ['writing', 'storytelling'] },
      { label: 'Create a script for a video 🎬', tags: ['writing', 'video'] },
      { label: 'Present the idea to an audience 🎤', tags: ['communication'] },
    ],
  },

  {
    id: 'storytelling-1',
    domains: ['storytelling', 'writing', 'creative'],
    q: 'You are asked to tell a story. What would you focus on most?',
    options: [
      { label: 'Building an interesting plot 📖', tags: ['storytelling', 'writing'] },
      { label: 'Creating emotional characters ❤️', tags: ['storytelling', 'writing'] },
      { label: 'Showing the story through visuals 🎬', tags: ['storytelling', 'video'] },
      { label: 'Performing the story for an audience 🎭', tags: ['storytelling', 'communication'] },
    ],
  },

  // =========================
  // COMMUNICATION
  // =========================

  {
    id: 'communication-1',
    domains: ['communication', 'presentation'],
    q: 'When you have a good idea, how do you prefer to share it?',
    options: [
      { label: 'Explain it clearly through speaking 🎤', tags: ['communication'] },
      { label: 'Write it in a structured way ✍️', tags: ['writing'] },
      { label: 'Create visuals to explain it 🎨', tags: ['design'] },
      { label: 'Build a demonstration of the idea 💻', tags: ['coding'] },
    ],
  },

  // =========================
  // GENERAL DISCOVERY
  // =========================

  {
    id: 'discovery-1',
    domains: ['discovery'],
    q: 'Which project would you happily spend an entire weekend working on?',
    options: [
      { label: 'Building a useful application 💻', tags: ['coding'] },
      { label: 'Creating a video or visual project 🎬', tags: ['video', 'design'] },
      { label: 'Writing a story or article ✍️', tags: ['writing', 'storytelling'] },
      { label: 'Preparing a dance, music or singing performance 🎤', tags: ['dance', 'music', 'singing'] },
    ],
  },

  {
    id: 'discovery-2',
    domains: ['discovery'],
    q: 'What kind of achievement would make you feel most proud?',
    options: [
      { label: 'Building something that actually works 💻', tags: ['coding', 'problem-solving'] },
      { label: 'Creating something beautiful 🎨', tags: ['design', 'photography'] },
      { label: 'Creating something emotionally powerful ❤️', tags: ['writing', 'storytelling', 'music'] },
      { label: 'Performing something confidently on stage 🎭', tags: ['dance', 'singing', 'communication'] },
    ],
  },

  {
    id: 'discovery-3',
    domains: ['discovery'],
    q: 'When learning a new skill, what motivates you most?',
    options: [
      { label: 'Solving increasingly difficult problems 🧠', tags: ['coding', 'problem-solving'] },
      { label: 'Creating something unique 🎨', tags: ['design', 'creative'] },
      { label: 'Improving through repeated practice 💪', tags: ['dance', 'singing', 'music'] },
      { label: 'Sharing what I create with others 🌟', tags: ['communication', 'storytelling'] },
    ],
  },
]


// ======================================================
// PROFILE → DOMAIN DETECTION
// ======================================================

const DOMAIN_KEYWORDS = {

  robotics: [
    'robotics',
    'robot',
    'robotic',
    'automation',
    'industrial automation',
  ],

  programming: [
    'programming',
    'coding',
    'software',
    'developer',
    'development',
    'python',
    'java',
    'javascript',
    'c++',
    'web development',
    'app development',
  ],

  ai: [
    'artificial intelligence',
    'ai',
    'machine learning',
    'ml',
    'deep learning',
    'data science',
  ],

  technical: [
    'it',
    'information technology',
    'computer',
    'technology',
    'technical',
    'engineering',
  ],

  design: [
    'design',
    'graphic design',
    'ui',
    'ux',
    'illustration',
    'visual design',
  ],

  video: [
    'video',
    'video editing',
    'filmmaking',
    'film',
    'editing',
    'content creation',
  ],

  photography: [
    'photography',
    'photographer',
    'photo',
    'camera',
  ],

  music: [
    'music',
    'music production',
    'beat',
    'beats',
    'audio',
    'producer',
  ],

  singing: [
    'singing',
    'singer',
    'vocals',
    'vocal',
    'voice',
  ],

  dance: [
    'dance',
    'dancing',
    'choreography',
    'choreographer',
    'performance',
  ],

  writing: [
    'writing',
    'writer',
    'content writing',
    'copywriting',
    'blogging',
    'articles',
  ],

  storytelling: [
    'storytelling',
    'story',
    'script writing',
    'screenwriting',
    'narrative',
  ],

  communication: [
    'communication',
    'public speaking',
    'presentation',
    'presenting',
    'speaking',
    'leadership',
  ],

  'problem-solving': [
    'problem solving',
    'problem-solving',
    'logic',
    'analytical',
    'analysis',
  ],
}


// ======================================================
// GET TEXT FROM USER PROFILE
// ======================================================

function profileToText(userProfile) {
  if (!userProfile) return ''

  const parts = [
    userProfile.name || '',
    userProfile.education || '',
    userProfile.careerGoal || '',
    userProfile.experienceLevel || '',
    userProfile.preferredOpportunityType || '',
  ]

  if (Array.isArray(userProfile.skills)) {
    parts.push(userProfile.skills.join(' '))
  }

  if (Array.isArray(userProfile.interests)) {
    parts.push(userProfile.interests.join(' '))
  }

  return parts
    .filter(Boolean)
    .join(' ')
    .toLowerCase()
}


// ======================================================
// DETECT PROFILE DOMAINS
// ======================================================

export function detectProfileDomains(userProfile) {

  const text = profileToText(userProfile)

  const detected = []

  Object.entries(DOMAIN_KEYWORDS).forEach(([domain, keywords]) => {

    const matched = keywords.some(keyword =>
      text.includes(keyword.toLowerCase())
    )

    if (matched) {
      detected.push(domain)
    }
  })

  return detected
}


// ======================================================
// PERSONALIZED QUESTION SELECTION
// ======================================================

export function getPersonalizedQuestions(userProfile) {

  const domains = detectProfileDomains(userProfile)

  // If profile has no useful information,
  // return a balanced assessment.
  if (domains.length === 0) {
    return questions.slice(0, 12)
  }

  const relevant = questions.filter(question =>
    question.domains.some(domain =>
      domains.includes(domain)
    )
  )

  const discovery = questions.filter(question =>
    question.domains.includes('discovery')
  )

  // Remove duplicates while preserving order.
  const combined = [
    ...relevant,
    ...discovery,
    ...questions,
  ]

  const unique = []

  combined.forEach(question => {
    if (!unique.some(item => item.id === question.id)) {
      unique.push(question)
    }
  })

  return unique.slice(0, 12)
}
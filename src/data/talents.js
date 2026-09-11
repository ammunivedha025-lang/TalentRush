// Core talent categories — matches the 8 hidden-talent areas from the brief.
export const TALENTS = [
  { key: 'design', name: 'Design', emoji: '🎨', description: 'Visual thinking, layouts and creative problem solving.' },
  { key: 'singing', name: 'Singing', emoji: '🎤', description: 'Voice, pitch control and performance presence.' },
  { key: 'dance', name: 'Dance', emoji: '💃', description: 'Movement, rhythm and stage expression.' },
  { key: 'photography', name: 'Photography', emoji: '📸', description: 'Composition, visual observation and storytelling.' },
  { key: 'video', name: 'Video Editing', emoji: '🎬', description: 'Storytelling through cuts, motion and sound.' },
  { key: 'coding', name: 'Coding', emoji: '💻', description: 'Logical thinking and building working products.' },
  { key: 'writing', name: 'Writing', emoji: '✍️', description: 'Ideas, structure and the craft of words.' },
  { key: 'music', name: 'Music Production', emoji: '🎧', description: 'Sound, composition and audio storytelling.' },
]

export const talentByKey = Object.fromEntries(TALENTS.map(t => [t.key, t]))

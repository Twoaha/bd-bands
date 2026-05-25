'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'

export default function SongRowWithRating({ song, index, bandId }) {
  const [rating, setRating] = useState(0)
  const [hover, setHover] = useState(0)

  useEffect(() => {
    const saved = localStorage.getItem(`rating_${song.id}`)
    if (saved) setRating(parseInt(saved))
  }, [song.id])

  function handleRate(e, star) {
    e.preventDefault()
    e.stopPropagation()
    setRating(star)
    localStorage.setItem(`rating_${song.id}`, star)
    const all = JSON.parse(localStorage.getItem(`ratings_all_${song.id}`) || '[]')
    all.push(star)
    localStorage.setItem(`ratings_all_${song.id}`, JSON.stringify(all))
  }

  return (
    <Link href={`/songs/${song.id}`} style={{ textDecoration: 'none' }}>
      <div
        style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '0.85rem 0', borderBottom: '0.5px solid var(--border)', cursor: 'pointer' }}
        onMouseEnter={e => e.currentTarget.querySelector('.stitle').style.color = 'var(--accent)'}
        onMouseLeave={e => e.currentTarget.querySelector('.stitle').style.color = 'var(--text)'}
      >
        <span style={{ fontSize: '0.7rem', color: 'var(--muted)', width: '20px', textAlign: 'right' }}>{index + 1}</span>
        <div style={{ width: '28px', height: '28px', border: '0.5px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--accent)', fontSize: '0.7rem' }}>▶</div>
        <span className="stitle" style={{ flex: 1, fontSize: '0.88rem', color: 'var(--text)', transition: 'color 0.2s' }}>{song.title}</span>

        {/* Star Rating */}
        <div style={{ display: 'flex', gap: '2px' }}>
          {[1,2,3,4,5].map(star => (
            <button
              key={star}
              onClick={(e) => handleRate(e, star)}
              onMouseEnter={() => setHover(star)}
              onMouseLeave={() => setHover(0)}
              style={{
                background: 'none', border: 'none', cursor: 'pointer', padding: '1px',
                fontSize: '0.95rem', lineHeight: 1,
                color: star <= (hover || rating) ? 'var(--accent)' : 'var(--muted)',
                transition: 'color 0.15s',
              }}
            >★</button>
          ))}
        </div>

        <span style={{ fontSize: '0.7rem', color: 'var(--muted)', minWidth: '36px', textAlign: 'right' }}>{song.duration}</span>
      </div>
    </Link>
  )
}

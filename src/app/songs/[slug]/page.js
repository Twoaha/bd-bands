'use client'
import { useState, useEffect, use } from 'react'
import Link from 'next/link'
import { getAllSongs, getBand } from '@/data/bands'

function StarRating({ songId }) {
  const [rating, setRating] = useState(0)
  const [hover, setHover] = useState(0)
  const [total, setTotal] = useState(0)
  const [avg, setAvg] = useState(0)

  useEffect(() => {
    const saved = localStorage.getItem(`rating_${songId}`)
    if (saved) setRating(parseInt(saved))
    const allRatings = JSON.parse(localStorage.getItem(`ratings_all_${songId}`) || '[]')
    if (allRatings.length > 0) {
      setTotal(allRatings.length)
      setAvg((allRatings.reduce((a, b) => a + b, 0) / allRatings.length).toFixed(1))
    }
  }, [songId])

  function handleRate(star) {
    setRating(star)
    localStorage.setItem(`rating_${songId}`, star)
    const all = JSON.parse(localStorage.getItem(`ratings_all_${songId}`) || '[]')
    all.push(star)
    localStorage.setItem(`ratings_all_${songId}`, JSON.stringify(all))
    setTotal(all.length)
    setAvg((all.reduce((a, b) => a + b, 0) / all.length).toFixed(1))
  }

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', margin: '1.25rem 0' }}>
      <div style={{ display: 'flex', gap: '4px' }}>
        {[1,2,3,4,5].map(star => (
          <button key={star} onClick={() => handleRate(star)}
            onMouseEnter={() => setHover(star)} onMouseLeave={() => setHover(0)}
            style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '2px', fontSize: '1.4rem', lineHeight: 1, color: star <= (hover || rating) ? 'var(--accent)' : 'var(--muted)', transition: 'color 0.15s' }}
          >★</button>
        ))}
      </div>
      {rating > 0
        ? <span style={{ fontSize: '0.72rem', color: 'var(--muted)' }}>তুমি {rating}★ দিয়েছো{total > 1 ? ` · গড় ${avg}★ (${total} জন)` : ''}</span>
        : <span style={{ fontSize: '0.72rem', color: 'var(--muted)' }}>রেটিং দাও</span>
      }
    </div>
  )
}

export default function SongPage({ params }) {
  const { slug } = use(params)
  const [tab, setTab] = useState('watch')
  const songs = getAllSongs()
  const song = songs.find(s => s.id === slug)

  if (!song) return <div style={{ padding: '2rem', color: 'var(--muted)' }}>গান পাওয়া যায়নি।</div>

  const band = getBand(song.bandId)

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '2rem' }}>
      <Link href={`/bands/${song.bandId}`} style={{ fontSize: '0.7rem', color: 'var(--muted)', textDecoration: 'none', letterSpacing: '0.08em', display: 'inline-block', marginBottom: '1.5rem' }}>
        ← {band?.name}
      </Link>

      <div style={{ marginBottom: '0.75rem', paddingBottom: '1.25rem', borderBottom: '0.5px solid var(--border)' }}>
        <p style={{ fontSize: '0.65rem', color: 'var(--accent)', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '0.4rem' }}>{song.albumTitle}</p>
        <h1 style={{ fontSize: '1.8rem', fontWeight: 400, color: 'var(--text)', marginBottom: '0.3rem' }}>{song.title}</h1>
        <p style={{ fontSize: '0.75rem', color: 'var(--muted)', marginBottom: 0 }}>{song.bandName} · {song.duration}</p>
        <StarRating songId={song.id} />
      </div>

      <div style={{ display: 'flex', marginBottom: '1.5rem', borderBottom: '0.5px solid var(--border)' }}>
        {[['watch', 'Watch'], ['lyrics', 'Lyrics']].map(([id, label]) => (
          <button key={id} onClick={() => setTab(id)} style={{
            padding: '0.5rem 1.25rem', fontSize: '0.7rem', letterSpacing: '0.1em',
            textTransform: 'uppercase', color: tab === id ? 'var(--accent)' : 'var(--muted)',
            background: 'none', border: 'none', borderBottom: tab === id ? '2px solid var(--accent)' : '2px solid transparent',
            cursor: 'pointer', marginBottom: '-0.5px', transition: 'all 0.2s',
          }}>{label}</button>
        ))}
      </div>

      {tab === 'watch' && (
        <div style={{ position: 'relative', paddingBottom: '56.25%', height: 0, overflow: 'hidden', background: 'var(--surface)', border: '0.5px solid var(--border)' }}>
          <iframe src={`https://www.youtube.com/embed/${song.youtube_id}?rel=0`}
            style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
            frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen title={song.title} />
        </div>
      )}

      {tab === 'lyrics' && (
        <div style={{ background: 'var(--surface)', border: '0.5px solid var(--border)', padding: '2rem' }}>
          <p style={{ fontSize: '0.65rem', color: 'var(--accent)', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '1.5rem' }}>{song.title} — {song.bandName}</p>
          <div style={{ fontSize: '0.92rem', lineHeight: 2.2, color: 'var(--text)', whiteSpace: 'pre-line', fontFamily: 'Georgia, serif' }}>{song.lyrics}</div>
        </div>
      )}

      <div style={{ marginTop: '3rem' }}>
        <p style={{ fontSize: '0.65rem', letterSpacing: '0.25em', color: 'var(--accent)', textTransform: 'uppercase', marginBottom: '1rem', paddingBottom: '0.5rem', borderBottom: '0.5px solid var(--border)' }}>
          {band?.name} — আরো গান
        </p>
        {songs.filter(s => s.bandId === song.bandId && s.id !== song.id).map((s) => (
          <Link key={s.id} href={`/songs/${s.id}`} style={{ textDecoration: 'none' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '0.75rem 0', borderBottom: '0.5px solid var(--border)', cursor: 'pointer' }}
              onMouseEnter={e => e.currentTarget.querySelector('.stitle').style.color = 'var(--accent)'}
              onMouseLeave={e => e.currentTarget.querySelector('.stitle').style.color = 'var(--text)'}
            >
              <div style={{ width: '26px', height: '26px', border: '0.5px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--muted)', fontSize: '0.65rem' }}>▶</div>
              <span className="stitle" style={{ flex: 1, fontSize: '0.85rem', color: 'var(--text)', transition: 'color 0.2s' }}>{s.title}</span>
              <span style={{ fontSize: '0.7rem', color: 'var(--muted)' }}>{s.duration}</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

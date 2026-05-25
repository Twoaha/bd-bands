import Link from 'next/link'
import { bands, getAllSongs } from '@/data/bands'

export default function Home() {
  const topSongs = getAllSongs().slice(0, 6)

  return (
    <div>
      {/* Hero */}
      <section style={{
        padding: '5rem 2rem 3rem',
        textAlign: 'center',
        borderBottom: '0.5px solid var(--border)',
        background: 'radial-gradient(ellipse at 50% 0%, rgba(232,200,64,0.05) 0%, transparent 60%)',
      }}>
        <p style={{ fontSize: '0.68rem', letterSpacing: '0.35em', color: 'var(--accent)', textTransform: 'uppercase', marginBottom: '1.25rem' }}>
          Bangladesh Music Archive
        </p>
        <h1 style={{ fontSize: '3rem', fontWeight: 400, lineHeight: 1.2, marginBottom: '1rem' }}>
          বাংলাদেশের<br />
          <em style={{ color: 'var(--accent)', fontStyle: 'normal' }}>সেরা ব্যান্ড</em>
        </h1>
        <p style={{ fontSize: '0.9rem', color: 'var(--muted)', maxWidth: '420px', margin: '0 auto 2rem', lineHeight: 1.8 }}>
          ইতিহাস, অ্যালবাম, গান এবং লিরিক্স — এক জায়গায়
        </p>
        <Link href="/bands" style={{
          display: 'inline-block',
          padding: '0.6rem 1.5rem',
          border: '0.5px solid var(--accent)',
          color: 'var(--accent)',
          textDecoration: 'none',
          fontSize: '0.72rem',
          letterSpacing: '0.15em',
          textTransform: 'uppercase',
          transition: 'all 0.2s',
        }}>
          সব ব্যান্ড দেখো →
        </Link>
      </section>

      <div style={{ maxWidth: '900px', margin: '0 auto', padding: '2rem' }}>
        {/* Featured Bands */}
        <section style={{ marginBottom: '3rem' }}>
          <p style={{ fontSize: '0.65rem', letterSpacing: '0.25em', color: 'var(--accent)', textTransform: 'uppercase', marginBottom: '1rem', paddingBottom: '0.5rem', borderBottom: '0.5px solid var(--border)' }}>
            featured bands
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1px', background: 'var(--border)' }}>
            {bands.map(band => (
              <Link key={band.id} href={`/bands/${band.id}`} style={{ textDecoration: 'none' }}>
                <div style={{ background: 'var(--surface)', padding: '1.5rem', transition: 'background 0.2s', cursor: 'pointer' }}
                  onMouseEnter={e => e.currentTarget.style.background = 'var(--surface2)'}
                  onMouseLeave={e => e.currentTarget.style.background = 'var(--surface)'}
                >
                  <div style={{ width: '44px', height: '44px', border: '0.5px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem', color: 'var(--accent)', marginBottom: '0.75rem' }}>
                    {band.name[0]}
                  </div>
                  <div style={{ fontSize: '0.9rem', color: 'var(--text)', marginBottom: '0.25rem' }}>{band.name}</div>
                  <div style={{ fontSize: '0.7rem', color: 'var(--muted)' }}>{band.genre}</div>
                  <div style={{ fontSize: '0.65rem', color: 'var(--accent)', marginTop: '0.5rem' }}>Est. {band.formed}</div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Top Songs */}
        <section>
          <p style={{ fontSize: '0.65rem', letterSpacing: '0.25em', color: 'var(--accent)', textTransform: 'uppercase', marginBottom: '1rem', paddingBottom: '0.5rem', borderBottom: '0.5px solid var(--border)' }}>
            top songs
          </p>
          <div>
            {topSongs.map((song, i) => (
              <Link key={song.id} href={`/songs/${song.id}`} style={{ textDecoration: 'none' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '0.85rem 0', borderBottom: '0.5px solid var(--border)', cursor: 'pointer' }}
                  onMouseEnter={e => e.currentTarget.querySelector('.stitle').style.color = 'var(--accent)'}
                  onMouseLeave={e => e.currentTarget.querySelector('.stitle').style.color = 'var(--text)'}
                >
                  <span style={{ fontSize: '0.7rem', color: 'var(--muted)', width: '20px', textAlign: 'right', flexShrink: 0 }}>{i + 1}</span>
                  <div style={{ width: '28px', height: '28px', border: '0.5px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--muted)', flexShrink: 0, fontSize: '0.7rem' }}>▶</div>
                  <div style={{ flex: 1 }}>
                    <div className="stitle" style={{ fontSize: '0.85rem', color: 'var(--text)', marginBottom: '0.2rem', transition: 'color 0.2s' }}>{song.title}</div>
                    <div style={{ fontSize: '0.7rem', color: 'var(--muted)' }}>{song.bandName} · {song.albumTitle}</div>
                  </div>
                  <span style={{ fontSize: '0.7rem', color: 'var(--muted)' }}>{song.duration}</span>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}

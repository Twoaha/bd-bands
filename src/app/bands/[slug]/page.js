import Link from 'next/link'
import { getBand, bands } from '@/data/bands'
import { notFound } from 'next/navigation'
import SongRowWithRating from '@/components/SongRowWithRating'

export async function generateStaticParams() {
  return bands.map(b => ({ slug: b.id }))
}

export async function generateMetadata({ params }) {
  const { slug } = await params
  const band = getBand(slug)
  if (!band) return {}
  return { title: `${band.name} — BD Bands` }
}

export default async function BandPage({ params }) {
  const { slug } = await params
  const band = getBand(slug)
  if (!band) notFound()

  return (
    <div style={{ maxWidth: '900px', margin: '0 auto', padding: '2rem' }}>
      <Link href="/bands" style={{ fontSize: '0.7rem', color: 'var(--muted)', textDecoration: 'none', letterSpacing: '0.08em', display: 'inline-block', marginBottom: '1.5rem' }}>
        ← সব ব্যান্ড
      </Link>

      <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1.5rem', marginBottom: '2rem', paddingBottom: '1.5rem', borderBottom: '0.5px solid var(--border)' }}>
        <div style={{ width: '72px', height: '72px', border: '0.5px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2rem', color: 'var(--accent)', flexShrink: 0 }}>
          {band.name[0]}
        </div>
        <div style={{ flex: 1 }}>
          <h1 style={{ fontSize: '2rem', fontWeight: 400, color: 'var(--text)', marginBottom: '0.4rem' }}>{band.name}</h1>
          <p style={{ fontSize: '0.75rem', color: 'var(--muted)', letterSpacing: '0.08em', marginBottom: '0.75rem' }}>
            {band.genre} · Est. {band.formed} · {band.members.join(', ')}
          </p>
          <p style={{ fontSize: '0.88rem', color: 'var(--muted)', lineHeight: 1.85 }}>{band.history}</p>
        </div>
      </div>

      {band.albums.map(album => (
        <div key={album.id} style={{ marginBottom: '2.5rem' }}>
          <div style={{ marginBottom: '1rem' }}>
            <p style={{ fontSize: '0.65rem', letterSpacing: '0.2em', color: 'var(--accent)', textTransform: 'uppercase', marginBottom: '0.3rem' }}>album</p>
            <h2 style={{ fontSize: '1.2rem', fontWeight: 400, color: 'var(--text)', marginBottom: '0.2rem' }}>{album.title}</h2>
            <p style={{ fontSize: '0.72rem', color: 'var(--muted)' }}>{album.year} · {album.songs.length} songs</p>
          </div>
          <div style={{ borderTop: '0.5px solid var(--border)' }}>
            {album.songs.map((song, i) => (
              <SongRowWithRating key={song.id} song={song} index={i} bandId={band.id} />
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

import Link from 'next/link'
import { bands } from '@/data/bands'

export const metadata = {
  title: 'সব ব্যান্ড — BD Bands',
}

export default function BandsPage() {
  return (
    <div style={{ maxWidth: '900px', margin: '0 auto', padding: '2rem' }}>
      <p style={{ fontSize: '0.65rem', letterSpacing: '0.25em', color: 'var(--accent)', textTransform: 'uppercase', marginBottom: '1.5rem', paddingBottom: '0.5rem', borderBottom: '0.5px solid var(--border)' }}>
        all bands — {bands.length} টি ব্যান্ড
      </p>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1px', background: 'var(--border)' }}>
        {bands.map(band => (
          <Link key={band.id} href={`/bands/${band.id}`} style={{ textDecoration: 'none' }}>
            <div
              style={{ background: 'var(--surface)', padding: '1.5rem 1.25rem', cursor: 'pointer', transition: 'background 0.2s', height: '100%' }}
              onMouseEnter={e => e.currentTarget.style.background = 'var(--surface2)'}
              onMouseLeave={e => e.currentTarget.style.background = 'var(--surface)'}
            >
              <div style={{ width: '48px', height: '48px', border: '0.5px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.3rem', color: 'var(--accent)', marginBottom: '1rem' }}>
                {band.name[0]}
              </div>
              <div style={{ fontSize: '1rem', color: 'var(--text)', marginBottom: '0.3rem' }}>{band.name}</div>
              <div style={{ fontSize: '0.72rem', color: 'var(--muted)', marginBottom: '0.75rem' }}>{band.genre}</div>
              <div style={{ display: 'flex', gap: '1rem' }}>
                <span style={{ fontSize: '0.65rem', color: 'var(--accent)' }}>Est. {band.formed}</span>
                <span style={{ fontSize: '0.65rem', color: 'var(--muted)' }}>{band.albums.length} album{band.albums.length > 1 ? 's' : ''}</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

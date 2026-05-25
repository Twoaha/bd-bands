import './globals.css'

export const metadata = {
  title: 'BD Bands — বাংলাদেশের সেরা ব্যান্ড',
  description: 'বাংলাদেশের সেরা ব্যান্ড, অ্যালবাম, গান এবং লিরিক্স — এক জায়গায়',
}

export default function RootLayout({ children }) {
  return (
    <html lang="bn">
      <body>
        <nav style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '1rem 2rem',
          borderBottom: '0.5px solid var(--border)',
          position: 'sticky',
          top: 0,
          background: 'rgba(10,10,15,0.95)',
          backdropFilter: 'blur(8px)',
          zIndex: 100,
        }}>
          <a href="/" style={{ color: 'var(--accent)', textDecoration: 'none', letterSpacing: '0.15em', fontSize: '1.1rem', textTransform: 'uppercase' }}>
            BD<span style={{ color: 'var(--text)' }}>Bands</span>
          </a>
          <div style={{ display: 'flex', gap: '2rem' }}>
            {[['/', 'Home'], ['/bands', 'Bands']].map(([href, label]) => (
              <a key={href} href={href} style={{
                fontSize: '0.72rem',
                letterSpacing: '0.1em',
                color: 'var(--muted)',
                textDecoration: 'none',
                textTransform: 'uppercase',
                transition: 'color 0.2s',
              }}
              onMouseEnter={e => e.target.style.color = 'var(--accent)'}
              onMouseLeave={e => e.target.style.color = 'var(--muted)'}
              >{label}</a>
            ))}
          </div>
        </nav>
        <main>{children}</main>
      </body>
    </html>
  )
}

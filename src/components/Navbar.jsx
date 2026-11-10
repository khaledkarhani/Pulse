import { useState } from 'react'
import { NavLink, Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const links = [
    { to: '/', label: 'Home', end: true },
    { to: '/studies', label: 'Studies' },
    { to: '/features', label: 'Features' },
    { to: '/about', label: 'About' },
    { to: '/contact', label: 'Contact' },
]

function Logo() {
    return (
        <Link to="/" className="flex items-center gap-2">
            <svg viewBox="0 0 24 24" className="w-6 h-6 text-accent" fill="none"
                stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 12h4l2-6 4 12 2-6h6" />
            </svg>
            <span className="font-bold text-lg tracking-tight">Pulse</span>
        </Link>
    )
}

function UserMenu({ user, onLogout }) {
    const [open, setOpen] = useState(false)
    const initial = user.name.charAt(0).toUpperCase()

    return (
        <div className="relative">
            <button
                onClick={() => setOpen(!open)}
                className="flex items-center gap-2 px-2 py-1.5 rounded-md hover:bg-surface transition-colors"
            >
                <div className="w-7 h-7 rounded-full bg-accent/10 border border-accent/30 flex items-center justify-center text-accent text-sm font-bold">
                    {initial}
                </div>
                <span className="text-sm">{user.name.split(' ')[0]}</span>
            </button>

            {open && (
                <>
                    <div className="fixed inset-0 z-10" onClick={() => setOpen(false)} />
                    <div className="absolute right-0 top-full mt-2 w-56 rounded-md border border-border bg-surface shadow-lg z-20 overflow-hidden">
                        <div className="px-4 py-3 border-b border-border">
                            <p className="text-sm font-medium truncate">{user.name}</p>
                            <p className="text-xs text-fg-dim truncate">{user.email}</p>
                            <p className="font-mono text-[10px] uppercase tracking-widest text-accent mt-1">
                                {user.role}{user.specialty ? ` · ${user.specialty}` : ''}
                            </p>
                        </div>
                        <button
                            onClick={() => { onLogout(); setOpen(false) }}
                            className="w-full text-left px-4 py-2 text-sm text-fg-muted hover:bg-surface-hover hover:text-fg transition-colors"
                        >
                            Sign out
                        </button>
                    </div>
                </>
            )}
        </div>
    )
}

export default function Navbar() {
    const [menuOpen, setMenuOpen] = useState(false)
    const { user, openAuthModal, logout } = useAuth()

    return (
        <header className="sticky top-0 z-40 backdrop-blur-md bg-bg/70 border-b border-border">
            <nav className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
                <Logo />

                <ul className="hidden md:flex items-center gap-1">
                    {links.map((l) => (
                        <li key={l.to}>
                            <NavLink
                                to={l.to}
                                end={l.end}
                                className={({ isActive }) =>
                                    `px-3 py-2 text-sm rounded-md transition-colors ${isActive ? 'text-accent' : 'text-fg-muted hover:text-fg'
                                    }`
                                }
                            >
                                {l.label}
                            </NavLink>
                        </li>
                    ))}
                </ul>

                <div className="hidden md:block">
                    {user ? (
                        <UserMenu user={user} onLogout={logout} />
                    ) : (
                        <button
                            onClick={() => openAuthModal('signin')}
                            className="px-4 py-2 text-sm rounded-md border border-border hover:border-accent hover:text-accent transition-colors"
                        >
                            Sign in
                        </button>
                    )}
                </div>

                <button
                    onClick={() => setMenuOpen(!menuOpen)}
                    className="md:hidden p-2 text-fg-muted hover:text-fg"
                    aria-label="Toggle menu"
                    aria-expanded={menuOpen}
                >
                    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        {menuOpen ? <path d="M6 18L18 6M6 6l12 12" /> : <path d="M4 6h16M4 12h16M4 18h16" />}
                    </svg>
                </button>
            </nav>

            {menuOpen && (
                <div className="md:hidden border-t border-border">
                    <ul className="px-4 py-3 space-y-1">
                        {links.map((l) => (
                            <li key={l.to}>
                                <NavLink
                                    to={l.to}
                                    end={l.end}
                                    onClick={() => setMenuOpen(false)}
                                    className={({ isActive }) =>
                                        `block px-3 py-2 rounded-md text-sm ${isActive ? 'text-accent bg-surface' : 'text-fg-muted hover:text-fg hover:bg-surface'
                                        }`
                                    }
                                >
                                    {l.label}
                                </NavLink>
                            </li>
                        ))}
                        <li>
                            {user ? (
                                <button
                                    onClick={() => { logout(); setMenuOpen(false) }}
                                    className="w-full mt-2 px-3 py-2 text-sm rounded-md border border-border text-left"
                                >
                                    Sign out ({user.name.split(' ')[0]})
                                </button>
                            ) : (
                                <button
                                    onClick={() => { openAuthModal('signin'); setMenuOpen(false) }}
                                    className="w-full mt-2 px-3 py-2 text-sm rounded-md border border-border text-left"
                                >
                                    Sign in
                                </button>
                            )}
                        </li>
                    </ul>
                </div>
            )}
        </header>
    )
}
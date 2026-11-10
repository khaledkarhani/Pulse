import { useState } from 'react'
import { NavLink, Link } from 'react-router-dom'

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

export default function Navbar() {
    const [open, setOpen] = useState(false)

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
                    <button className="px-4 py-2 text-sm rounded-md border border-border hover:border-accent hover:text-accent transition-colors">
                        Sign in
                    </button>
                </div>

                <button
                    onClick={() => setOpen(!open)}
                    className="md:hidden p-2 text-fg-muted hover:text-fg"
                    aria-label="Toggle menu"
                    aria-expanded={open}
                >
                    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        {open ? <path d="M6 18L18 6M6 6l12 12" /> : <path d="M4 6h16M4 12h16M4 18h16" />}
                    </svg>
                </button>
            </nav>

            {open && (
                <div className="md:hidden border-t border-border">
                    <ul className="px-4 py-3 space-y-1">
                        {links.map((l) => (
                            <li key={l.to}>
                                <NavLink
                                    to={l.to}
                                    end={l.end}
                                    onClick={() => setOpen(false)}
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
                            <button className="w-full mt-2 px-3 py-2 text-sm rounded-md border border-border text-left">
                                Sign in
                            </button>
                        </li>
                    </ul>
                </div>
            )}
        </header>
    )
}
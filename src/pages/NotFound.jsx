import { Link } from 'react-router-dom'

export default function NotFound() {
    return (
        <section className="max-w-6xl mx-auto px-4 sm:px-6 py-24 text-center">
            <p className="font-mono text-xs tracking-widest text-fg-dim uppercase mb-4">404</p>
            <h1 className="text-5xl font-bold mb-4">Page not found</h1>
            <p className="text-fg-muted mb-8">That URL doesn't exist.</p>
            <Link to="/" className="inline-block px-5 py-2 rounded-md border border-border hover:border-accent hover:text-accent transition-colors">
                Go home
            </Link>
        </section>
    )
}
import { Link } from 'react-router-dom'

export default function Footer() {
    return (
        <footer className="border-t border-border mt-24">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 grid gap-8 md:grid-cols-4">
                <div className="md:col-span-2">
                    <div className="flex items-center gap-2 mb-3">
                        <svg viewBox="0 0 24 24" className="w-5 h-5 text-accent" fill="none"
                            stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M3 12h4l2-6 4 12 2-6h6" />
                        </svg>
                        <span className="font-bold tracking-tight">Pulse</span>
                    </div>
                    <p className="text-sm text-fg-muted max-w-sm">
                        A research digest where doctors publish and discuss recent studies with patients.
                    </p>
                </div>

                <div>
                    <h4 className="font-mono text-xs uppercase tracking-widest text-fg-dim mb-3">Explore</h4>
                    <ul className="space-y-2 text-sm">
                        <li><Link to="/studies" className="text-fg-muted hover:text-accent">Studies</Link></li>
                        <li><Link to="/features" className="text-fg-muted hover:text-accent">Features</Link></li>
                        <li><Link to="/about" className="text-fg-muted hover:text-accent">About</Link></li>
                        <li><Link to="/contact" className="text-fg-muted hover:text-accent">Contact</Link></li>
                    </ul>
                </div>

                <div>
                    <h4 className="font-mono text-xs uppercase tracking-widest text-fg-dim mb-3">Disclaimer</h4>
                    <p className="text-xs text-fg-dim leading-relaxed">
                        Pulse is an academic project. Content is not medical advice. Always consult a qualified healthcare professional.
                    </p>
                </div>
            </div>

            <div className="border-t border-border">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-fg-dim">
                    <p>© {new Date().getFullYear()} Pulse. Built for Web2 course.</p>
                    <p className="font-mono">v0.1.0</p>
                </div>
            </div>
        </footer>
    )
}
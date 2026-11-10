import { Link } from 'react-router-dom'
import { getFeaturedStudies } from '../data/studies'
import StudyCard from '../components/StudyCard'

const stats = [
    { value: '124', label: 'Studies published' },
    { value: '38', label: 'Contributing doctors' },
    { value: '1.2k', label: 'Active discussions' },
    { value: '12', label: 'Specialties covered' },
]

const valueProps = [
    {
        title: 'For patients',
        body: 'Read plain-language digests of recent studies. Follow conditions that affect you. Ask questions in moderated discussions.',
        icon: (
            <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
            </svg>
        ),
    },
    {
        title: 'For doctors',
        body: 'Publish accessible summaries of research you trust. Build a following in your specialty. Respond to patient questions with authority.',
        icon: (
            <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M8 21v-5a4 4 0 0 1 8 0v5" />
                <path d="M12 7V3M8 3h8M12 7a3 3 0 0 0-3 3v1a3 3 0 0 0 6 0v-1a3 3 0 0 0-3-3z" />
            </svg>
        ),
    },
    {
        title: 'For the community',
        body: 'Discuss diseases openly with others navigating the same condition. Threaded conversations, verified contributors, zero ads.',
        icon: (
            <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
            </svg>
        ),
    },
]

export default function Home() {
    const featured = getFeaturedStudies(3)

    return (
        <>
            {/* Hero */}
            <section className="relative overflow-hidden">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 py-20 md:py-28">
                    <div className="max-w-3xl">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-border bg-surface mb-6">
                            <span className="relative flex w-2 h-2">
                                <span className="absolute inset-0 rounded-full bg-accent opacity-60 animate-ping"></span>
                                <span className="relative w-2 h-2 rounded-full bg-accent"></span>
                            </span>
                            <span className="font-mono text-xs text-fg-muted">Live research · Updated weekly</span>
                        </div>

                        <h1 className="text-5xl md:text-7xl font-bold leading-[1.05] mb-6">
                            Medical research,<br />
                            <span className="text-accent">decoded for everyone.</span>
                        </h1>

                        <p className="text-lg text-fg-muted max-w-2xl mb-10 leading-relaxed">
                            Pulse turns dense medical studies into clear, readable digests. Doctors publish and discuss. Patients stay informed — without the paywall or the jargon.
                        </p>

                        <div className="flex flex-wrap gap-3">
                            <Link
                                to="/studies"
                                className="px-5 py-3 rounded-md bg-accent text-bg font-medium hover:bg-accent-hover transition-colors"
                            >
                                Browse studies
                            </Link>
                            <Link
                                to="/about"
                                className="px-5 py-3 rounded-md border border-border hover:border-accent hover:text-accent transition-colors"
                            >
                                How it works →
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Stats */}
            <section className="border-y border-border bg-surface/30">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10 grid grid-cols-2 md:grid-cols-4 gap-6">
                    {stats.map((s) => (
                        <div key={s.label}>
                            <p className="font-mono text-3xl md:text-4xl font-bold text-fg mb-1">{s.value}</p>
                            <p className="text-xs uppercase tracking-widest text-fg-dim font-mono">{s.label}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Featured studies */}
            <section className="max-w-6xl mx-auto px-4 sm:px-6 py-20">
                <div className="flex items-end justify-between mb-10">
                    <div>
                        <p className="font-mono text-xs tracking-widest text-accent uppercase mb-3">Featured</p>
                        <h2 className="text-3xl md:text-4xl font-bold">This week's digest</h2>
                    </div>
                    <Link to="/studies" className="hidden sm:block text-sm text-fg-muted hover:text-accent">
                        View all →
                    </Link>
                </div>

                <div className="grid gap-6 md:grid-cols-3">
                    {featured.map((s) => (
                        <StudyCard key={s.id} study={s} />
                    ))}
                </div>

                <div className="sm:hidden mt-6 text-center">
                    <Link to="/studies" className="text-sm text-fg-muted hover:text-accent">
                        View all studies →
                    </Link>
                </div>
            </section>

            {/* Value props */}
            <section className="max-w-6xl mx-auto px-4 sm:px-6 py-20">
                <div className="text-center max-w-2xl mx-auto mb-14">
                    <p className="font-mono text-xs tracking-widest text-accent uppercase mb-3">Who it's for</p>
                    <h2 className="text-3xl md:text-4xl font-bold">
                        A platform for both sides of the consultation.
                    </h2>
                </div>

                <div className="grid gap-6 md:grid-cols-3">
                    {valueProps.map((v) => (
                        <div key={v.title} className="p-6 rounded-xl border border-border bg-surface">
                            <div className="w-10 h-10 rounded-lg bg-accent/10 border border-accent/20 flex items-center justify-center text-accent mb-4">
                                {v.icon}
                            </div>
                            <h3 className="font-bold text-xl mb-2">{v.title}</h3>
                            <p className="text-sm text-fg-muted leading-relaxed">{v.body}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Final CTA */}
            <section className="max-w-6xl mx-auto px-4 sm:px-6 py-20">
                <div className="relative overflow-hidden rounded-2xl border border-border bg-surface p-10 md:p-16 text-center">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">Stay in the loop.</h2>
                    <p className="text-fg-muted max-w-xl mx-auto mb-8">
                        Create a free account to bookmark studies, join discussions, and receive weekly digests.
                    </p>
                    <Link
                        to="/contact"
                        className="inline-block px-6 py-3 rounded-md bg-accent text-bg font-medium hover:bg-accent-hover transition-colors"
                    >
                        Get started
                    </Link>
                </div>
            </section>
        </>
    )
}
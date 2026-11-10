const features = [
    {
        title: 'Searchable digests',
        body: 'Every study is tagged, categorized, and searchable by title, excerpt, or keyword. Find what matters to you in seconds.',
        icon: (
            <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" />
            </svg>
        ),
    },
    {
        title: 'Verified contributors',
        body: 'Only credentialed doctors can publish. Every author shows their specialty, and credentials are reviewed before approval.',
        icon: (
            <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /><path d="m9 12 2 2 4-4" />
            </svg>
        ),
    },
    {
        title: 'Threaded discussions',
        body: 'Ask questions beneath any study. Doctors and patients discuss openly. All threads are moderated for safety.',
        icon: (
            <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
            </svg>
        ),
    },
    {
        title: 'Weekly digest',
        body: "Opt into a Sunday email summarizing the week's most important studies across your followed specialties.",
        icon: (
            <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="4" width="20" height="16" rx="2" /><path d="m22 7-10 5L2 7" />
            </svg>
        ),
    },
    {
        title: 'Bookmark & follow',
        body: 'Save studies to read later. Follow specialties to see new digests first in your feed.',
        icon: (
            <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="m19 21-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
            </svg>
        ),
    },
    {
        title: 'No ads, no tracking',
        body: "Pulse is ad-free and doesn't track reading habits beyond what's needed to serve the site.",
        icon: (
            <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 13c0 5-3.5 7.5-8 9-4.5-1.5-8-4-8-9V5l8-3 8 3z" />
            </svg>
        ),
    },
]

const checkIcon = (
    <svg className="w-4 h-4 text-accent shrink-0 mt-0.5" viewBox="0 0 24 24" fill="none"
        stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 6 9 17l-5-5" />
    </svg>
)

const doctorBenefits = [
    'Publish research digests in your specialty',
    'Respond to patient questions publicly',
    'Build a public profile with your contributions',
    'Follow updates in adjacent specialties',
]

const patientBenefits = [
    'Read plain-language research summaries',
    'Ask specialists questions publicly',
    'Follow conditions that matter to you',
    'Bring informed questions to your next appointment',
]

export default function Features() {
    return (
        <>
            <section className="max-w-6xl mx-auto px-4 sm:px-6 py-20">
                <p className="font-mono text-xs tracking-widest text-accent uppercase mb-4">Features</p>
                <h1 className="text-4xl md:text-6xl font-bold leading-tight max-w-3xl mb-6">
                    Everything you need. Nothing you don't.
                </h1>
                <p className="text-lg text-fg-muted max-w-2xl">
                    Pulse is designed around one task: reading and discussing research. No infinite feed, no attention traps.
                </p>
            </section>

            {/* Features grid */}
            <section className="max-w-6xl mx-auto px-4 sm:px-6 pb-20">
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {features.map((f) => (
                        <div key={f.title} className="p-6 rounded-xl border border-border bg-surface hover:border-accent/50 transition-colors">
                            <div className="w-10 h-10 rounded-lg bg-accent/10 border border-accent/20 flex items-center justify-center text-accent mb-4">
                                {f.icon}
                            </div>
                            <h3 className="font-bold text-lg mb-2">{f.title}</h3>
                            <p className="text-sm text-fg-muted leading-relaxed">{f.body}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* By audience */}
            <section className="max-w-6xl mx-auto px-4 sm:px-6 py-20 border-t border-border">
                <div className="text-center max-w-2xl mx-auto mb-14">
                    <p className="font-mono text-xs tracking-widest text-accent uppercase mb-3">By audience</p>
                    <h2 className="text-3xl md:text-4xl font-bold">Different roles, shared tools.</h2>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                    <div className="p-8 rounded-xl border border-border bg-surface">
                        <h3 className="font-mono text-xs tracking-widest text-accent uppercase mb-3">For doctors</h3>
                        <h4 className="text-xl font-bold mb-5">Build authority, help more people.</h4>
                        <ul className="space-y-3 text-sm text-fg-muted">
                            {doctorBenefits.map((i) => (
                                <li key={i} className="flex gap-3">{checkIcon}<span>{i}</span></li>
                            ))}
                        </ul>
                    </div>

                    <div className="p-8 rounded-xl border border-border bg-surface">
                        <h3 className="font-mono text-xs tracking-widest text-accent uppercase mb-3">For patients</h3>
                        <h4 className="text-xl font-bold mb-5">Stay informed, ask good questions.</h4>
                        <ul className="space-y-3 text-sm text-fg-muted">
                            {patientBenefits.map((i) => (
                                <li key={i} className="flex gap-3">{checkIcon}<span>{i}</span></li>
                            ))}
                        </ul>
                    </div>
                </div>
            </section>
        </>
    )
}
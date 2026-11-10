const steps = [
    {
        num: '01',
        title: 'Doctors publish',
        body: 'Verified specialists write digestible summaries of recent studies in their field — key findings, context, and what it means for care.',
    },
    {
        num: '02',
        title: 'Patients read',
        body: 'Readers browse by specialty or search by condition. Every digest is written at a general-reader level, with technical terms explained.',
    },
    {
        num: '03',
        title: 'Both discuss',
        body: 'Threaded discussions below each digest let patients ask questions and doctors respond. All conversations are moderated.',
    },
]

export default function About() {
    return (
        <>
            {/* Hero */}
            <section className="max-w-6xl mx-auto px-4 sm:px-6 py-20">
                <p className="font-mono text-xs tracking-widest text-accent uppercase mb-4">About</p>
                <h1 className="text-4xl md:text-6xl font-bold leading-tight max-w-3xl mb-6">
                    Research shouldn't live behind a paywall or a specialty degree.
                </h1>
                <p className="text-lg text-fg-muted max-w-2xl">
                    Pulse was built on a simple belief: patients deserve to read the research shaping their care, written by doctors who actually understand it.
                </p>
            </section>

            {/* The problem */}
            <section className="max-w-6xl mx-auto px-4 sm:px-6 py-16 border-t border-border">
                <div className="grid md:grid-cols-2 gap-12">
                    <div>
                        <p className="font-mono text-xs tracking-widest text-accent uppercase mb-3">The problem</p>
                        <h2 className="text-3xl font-bold">Medical journals weren't written for the public.</h2>
                    </div>
                    <div className="space-y-4 text-fg-muted leading-relaxed">
                        <p>Every week, thousands of new medical studies are published. Most sit behind paywalls, buried in dense statistical language.</p>
                        <p>Patients asking about their own conditions find themselves navigating PubMed, parsing p-values, and trying to distinguish between a landmark finding and a small pilot study.</p>
                        <p>Meanwhile, their doctors — the people best equipped to translate this research — rarely have a channel to do so publicly.</p>
                    </div>
                </div>
            </section>

            {/* How it works */}
            <section className="max-w-6xl mx-auto px-4 sm:px-6 py-16 border-t border-border">
                <p className="font-mono text-xs tracking-widest text-accent uppercase mb-3">How it works</p>
                <h2 className="text-3xl font-bold mb-12">Three steps, no friction.</h2>

                <div className="grid md:grid-cols-3 gap-8">
                    {steps.map((s) => (
                        <div key={s.num} className="relative pl-16">
                            <span className="absolute left-0 top-0 font-mono text-4xl font-bold text-accent/40">
                                {s.num}
                            </span>
                            <h3 className="font-bold text-xl mb-3">{s.title}</h3>
                            <p className="text-sm text-fg-muted leading-relaxed">{s.body}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Behind Pulse */}
            <section className="max-w-6xl mx-auto px-4 sm:px-6 py-16 border-t border-border">
                <div className="grid md:grid-cols-2 gap-12">
                    <div>
                        <p className="font-mono text-xs tracking-widest text-accent uppercase mb-3">Behind Pulse</p>
                        <h2 className="text-3xl font-bold">An academic project with real intent.</h2>
                    </div>
                    <div className="space-y-4 text-fg-muted leading-relaxed">
                        <p>Pulse was built as part of a university Web Development course — but the problem it addresses is real.</p>
                        <p>Every design decision aims toward one goal: making medical research accessible without dumbing it down.</p>
                        <p>If you're a doctor who'd like to contribute, or a patient with feedback, we'd love to hear from you.</p>
                    </div>
                </div>
            </section>
        </>
    )
}
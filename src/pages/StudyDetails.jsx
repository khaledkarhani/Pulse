import { Link, useParams } from 'react-router-dom'
import { getStudyById } from '../data/studies'
import { useAuth } from '../context/AuthContext'

function formatDate(iso) {
    return new Date(iso).toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
    })
}

export default function StudyDetails() {
    const { id } = useParams()
    const study = getStudyById(id)
    const { user, openAuthModal } = useAuth()

    if (!study) {
        return (
            <section className="max-w-3xl mx-auto px-4 sm:px-6 py-24 text-center">
                <p className="font-mono text-xs tracking-widest text-fg-dim uppercase mb-4">404</p>
                <h1 className="text-4xl font-bold mb-4">Study not found</h1>
                <p className="text-fg-muted mb-8">That study doesn't exist in the digest.</p>
                <Link
                    to="/studies"
                    className="inline-block px-5 py-2 rounded-md border border-border hover:border-accent hover:text-accent transition-colors"
                >
                    ← All studies
                </Link>
            </section>
        )
    }

    const paragraphs = study.body.split('\n\n')

    return (
        <article className="max-w-3xl mx-auto px-4 sm:px-6 py-12">
            {/* Back */}
            <Link
                to="/studies"
                className="inline-flex items-center gap-2 text-sm text-fg-muted hover:text-accent mb-10"
            >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                    strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="m15 18-6-6 6-6" />
                </svg>
                All studies
            </Link>

            {/* Meta row */}
            <div className="flex items-center flex-wrap gap-3 mb-6">
                <span className="font-mono text-[10px] uppercase tracking-widest px-2 py-1 rounded border border-border text-accent">
                    {study.category}
                </span>
                <span className="font-mono text-xs text-fg-dim">{study.readTime} min read</span>
                <span className="font-mono text-xs text-fg-dim">·</span>
                <span className="font-mono text-xs text-fg-dim">{formatDate(study.publishedAt)}</span>
            </div>

            {/* Title */}
            <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-6">{study.title}</h1>

            {/* Excerpt */}
            <p className="text-lg text-fg-muted leading-relaxed mb-8">{study.excerpt}</p>

            {/* Author */}
            <div className="flex items-center gap-3 pb-8 mb-10 border-b border-border">
                <div className="w-10 h-10 rounded-full bg-accent/10 border border-accent/20 flex items-center justify-center text-accent font-bold">
                    {study.author.split(' ').pop()[0]}
                </div>
                <div>
                    <p className="font-medium text-sm">{study.author}</p>
                    <p className="text-xs text-fg-dim">{study.authorSpecialty}</p>
                </div>
            </div>

            {/* Key findings */}
            <div className="mb-10 p-6 rounded-xl border border-border bg-surface">
                <p className="font-mono text-xs tracking-widest text-accent uppercase mb-4">Key findings</p>
                <ul className="space-y-3">
                    {study.keyFindings.map((f, i) => (
                        <li key={i} className="flex gap-3 text-sm">
                            <span className="font-mono text-accent shrink-0">0{i + 1}</span>
                            <span className="text-fg leading-relaxed">{f}</span>
                        </li>
                    ))}
                </ul>
            </div>

            {/* Body */}
            <div className="space-y-6 mb-12">
                {paragraphs.map((p, i) => (
                    <p key={i} className="text-fg leading-relaxed">
                        {p}
                    </p>
                ))}
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-12">
                {study.tags.map((t) => (
                    <span key={t} className="px-2 py-1 text-xs font-mono text-fg-muted border border-border rounded">
                        #{t}
                    </span>
                ))}
            </div>

            <div className="mt-16 pt-12 border-t border-border">
                <p className="font-mono text-xs tracking-widest text-accent uppercase mb-3">Discussion</p>
                <h2 className="text-2xl font-bold mb-4">Join the conversation</h2>
                {user ? (
                    <div className="p-6 rounded-xl border border-border bg-surface">
                        <p className="text-sm text-fg-muted">
                            Signed in as <span className="text-fg">{user.name}</span>. Discussion threads coming next step.
                        </p>
                    </div>
                ) : (
                    <>
                        <p className="text-fg-muted mb-6">
                            Ask questions, share experiences, or request clarification from doctors in this specialty.
                        </p>
                        <div className="p-8 rounded-xl border border-dashed border-border bg-surface/50 text-center">
                            <p className="text-sm text-fg-muted mb-4">Sign in to join the discussion.</p>
                            <button
                                onClick={() => openAuthModal('signin')}
                                className="px-5 py-2 rounded-md bg-accent text-bg text-sm font-medium hover:bg-accent-hover transition-colors"
                            >
                                Sign in to comment
                            </button>
                        </div>
                    </>
                )}
            </div>
            <div className="mt-16 pt-12 border-t border-border">
                <p className="font-mono text-xs tracking-widest text-accent uppercase mb-3">Discussion</p>
                <h2 className="text-2xl font-bold mb-4">Join the conversation</h2>
                <p className="text-fg-muted mb-6">
                    Ask questions, share experiences, or request clarification from doctors in this specialty.
                </p>
                <div className="p-8 rounded-xl border border-dashed border-border bg-surface/50 text-center">
                    <p className="text-sm text-fg-muted mb-4">Sign in to join the discussion.</p>
                    <button className="px-5 py-2 rounded-md bg-accent text-bg text-sm font-medium hover:bg-accent-hover transition-colors">
                        Sign in to comment
                    </button>
                </div>
            </div>
        </article>
    )
}
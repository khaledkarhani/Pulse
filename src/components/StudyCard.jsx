import { Link } from 'react-router-dom'

function formatDate(iso) {
    return new Date(iso).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
    })
}

export default function StudyCard({ study }) {
    return (
        <Link
            to={`/studies/${study.id}`}
            className="group flex flex-col p-6 rounded-xl border border-border bg-surface hover:border-accent/50 hover:bg-surface-hover transition-colors"
        >
            <div className="flex items-center gap-2 mb-4">
                <span className="font-mono text-[10px] uppercase tracking-widest px-2 py-1 rounded border border-border text-accent">
                    {study.category}
                </span>
                <span className="font-mono text-xs text-fg-dim">
                    {study.readTime} min read
                </span>
            </div>

            <h3 className="text-lg font-bold leading-snug mb-3 group-hover:text-accent transition-colors">
                {study.title}
            </h3>

            <p className="text-sm text-fg-muted leading-relaxed mb-6 line-clamp-3">
                {study.excerpt}
            </p>

            <div className="mt-auto pt-4 border-t border-border flex items-center justify-between text-xs">
                <span className="text-fg-muted">{study.author}</span>
                <span className="font-mono text-fg-dim">{formatDate(study.publishedAt)}</span>
            </div>
        </Link>
    )
}
import { useEffect, useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { getComments, addComment, deleteComment } from '../data/discussions'

function timeAgo(iso) {
    const diff = Date.now() - new Date(iso).getTime()
    const mins = Math.floor(diff / 60000)
    if (mins < 1) return 'just now'
    if (mins < 60) return `${mins}m ago`
    const hrs = Math.floor(mins / 60)
    if (hrs < 24) return `${hrs}h ago`
    const days = Math.floor(hrs / 24)
    if (days < 30) return `${days}d ago`
    return new Date(iso).toLocaleDateString('en-US', {
        month: 'short', day: 'numeric', year: 'numeric',
    })
}

export default function Discussion({ studyId }) {
    const { user, openAuthModal } = useAuth()
    const [comments, setComments] = useState(() => getComments(studyId))
    const [draft, setDraft] = useState('')
    const [error, setError] = useState('')

    useEffect(() => {
        setComments(getComments(studyId))
    }, [studyId])

    function handleSubmit(e) {
        e.preventDefault()
        setError('')
        const trimmed = draft.trim()
        if (!trimmed) return setError('Write something before posting.')
        if (trimmed.length < 3) return setError('Comment is too short.')
        addComment({ studyId, user, body: trimmed })
        setDraft('')
        setComments(getComments(studyId))
    }

    function handleDelete(id) {
        if (!window.confirm('Delete this comment?')) return
        deleteComment(id, user.id)
        setComments(getComments(studyId))
    }

    return (
        <div className="mt-16 pt-12 border-t border-border">
            <div className="mb-6">
                <p className="font-mono text-xs tracking-widest text-accent uppercase mb-2">Discussion</p>
                <h2 className="text-2xl font-bold">
                    {comments.length === 0
                        ? 'Start the conversation'
                        : `${comments.length} ${comments.length === 1 ? 'comment' : 'comments'}`}
                </h2>
            </div>

            {/* Compose */}
            {user ? (
                <form onSubmit={handleSubmit} className="mb-10">
                    <div className="flex gap-3">
                        <div className="w-10 h-10 shrink-0 rounded-full bg-accent/10 border border-accent/30 flex items-center justify-center text-accent font-bold text-sm">
                            {user.name.charAt(0).toUpperCase()}
                        </div>
                        <div className="flex-1">
                            <textarea
                                value={draft}
                                onChange={(e) => setDraft(e.target.value)}
                                rows={3}
                                placeholder="Share your thoughts, ask a question, or reply to the study…"
                                className="w-full px-4 py-3 rounded-md bg-surface border border-border focus:border-accent focus:outline-none text-sm resize-y min-h-24"
                            />
                            {error && <p className="mt-2 text-xs text-danger">{error}</p>}
                            <div className="mt-3 flex items-center justify-between flex-wrap gap-3">
                                <p className="text-xs text-fg-dim">
                                    Posting as <span className="text-fg">{user.name}</span>
                                    {user.role === 'doctor' && user.specialty && (
                                        <span className="text-accent"> · {user.specialty}</span>
                                    )}
                                </p>
                                <button
                                    type="submit"
                                    className="px-5 py-2 rounded-md bg-accent text-bg text-sm font-medium hover:bg-accent-hover transition-colors"
                                >
                                    Post comment
                                </button>
                            </div>
                        </div>
                    </div>
                </form>
            ) : (
                <div className="mb-10 p-8 rounded-xl border border-dashed border-border bg-surface/50 text-center">
                    <p className="text-sm text-fg-muted mb-4">Sign in to join the discussion.</p>
                    <button
                        onClick={() => openAuthModal('signin')}
                        className="px-5 py-2 rounded-md bg-accent text-bg text-sm font-medium hover:bg-accent-hover transition-colors"
                    >
                        Sign in to comment
                    </button>
                </div>
            )}

            {/* Comments list */}
            {comments.length === 0 ? (
                <div className="py-12 text-center text-sm text-fg-dim">
                    No comments yet.{user && ' Be the first to say something.'}
                </div>
            ) : (
                <ul className="space-y-6">
                    {comments.map((c) => (
                        <li key={c.id} className="flex gap-3">
                            <div className="w-10 h-10 shrink-0 rounded-full bg-surface border border-border flex items-center justify-center font-bold text-sm text-fg-muted">
                                {c.authorName.charAt(0).toUpperCase()}
                            </div>
                            <div className="flex-1 min-w-0">
                                <div className="flex flex-wrap items-center gap-2 mb-1">
                                    <span className="text-sm font-medium">{c.authorName}</span>
                                    {c.authorRole === 'doctor' && (
                                        <span className="font-mono text-[10px] uppercase tracking-widest px-1.5 py-0.5 rounded border border-accent/30 bg-accent/5 text-accent">
                                            Doctor{c.authorSpecialty ? ` · ${c.authorSpecialty}` : ''}
                                        </span>
                                    )}
                                    <span className="text-xs text-fg-dim">· {timeAgo(c.createdAt)}</span>
                                </div>
                                <p className="text-sm text-fg leading-relaxed whitespace-pre-wrap break-words">
                                    {c.body}
                                </p>
                                {user?.id === c.authorId && (
                                    <button
                                        onClick={() => handleDelete(c.id)}
                                        className="mt-2 text-xs text-fg-dim hover:text-danger transition-colors"
                                    >
                                        Delete
                                    </button>
                                )}
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    )
}
import { useMemo, useState } from 'react'
import { studies } from '../data/studies'
import StudyCard from '../components/StudyCard'

const categories = ['All', ...new Set(studies.map((s) => s.category))]

export default function Studies() {
    const [query, setQuery] = useState('')
    const [cat, setCat] = useState('All')

    const filtered = useMemo(() => {
        const q = query.trim().toLowerCase()
        return studies.filter((s) => {
            const matchesCat = cat === 'All' || s.category === cat
            const matchesQuery =
                !q ||
                s.title.toLowerCase().includes(q) ||
                s.excerpt.toLowerCase().includes(q) ||
                s.tags.some((t) => t.toLowerCase().includes(q))
            return matchesCat && matchesQuery
        })
    }, [query, cat])

    return (
        <>
            {/* Header */}
            <section className="max-w-6xl mx-auto px-4 sm:px-6 pt-16 pb-10">
                <p className="font-mono text-xs tracking-widest text-accent uppercase mb-4">Studies</p>
                <h1 className="text-4xl md:text-5xl font-bold mb-4">The digest, in full.</h1>
                <p className="text-fg-muted max-w-2xl">
                    Every study summary, searchable. Filter by specialty, or search by keyword.
                </p>
            </section>

            {/* Filters */}
            <section className="max-w-6xl mx-auto px-4 sm:px-6 pb-10">
                <div className="flex flex-col gap-4">
                    {/* Search */}
                    <div className="relative">
                        <svg
                            className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-fg-dim pointer-events-none"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <circle cx="11" cy="11" r="8" />
                            <path d="m21 21-4.3-4.3" />
                        </svg>
                        <input
                            type="search"
                            placeholder="Search by title, excerpt, or tag…"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            className="w-full pl-10 pr-4 py-3 rounded-md bg-surface border border-border focus:border-accent focus:outline-none text-sm placeholder:text-fg-dim"
                        />
                    </div>

                    {/* Category chips */}
                    <div className="flex flex-wrap gap-2">
                        {categories.map((c) => (
                            <button
                                key={c}
                                onClick={() => setCat(c)}
                                className={`px-3 py-1.5 text-xs font-mono uppercase tracking-wider rounded-md border transition-colors ${cat === c
                                    ? 'bg-accent text-bg border-accent'
                                    : 'border-border text-fg-muted hover:border-accent hover:text-accent'
                                    }`}
                            >
                                {c}
                            </button>
                        ))}
                    </div>

                    {/* Count */}
                    <p className="font-mono text-xs text-fg-dim">
                        {filtered.length} {filtered.length === 1 ? 'result' : 'results'}
                    </p>
                </div>
            </section>

            {/* Grid */}
            <section className="max-w-6xl mx-auto px-4 sm:px-6 pb-20">
                {filtered.length === 0 ? (
                    <div className="py-20 text-center border border-dashed border-border rounded-xl">
                        <p className="text-fg-muted mb-3">No studies match that search.</p>
                        <button
                            onClick={() => {
                                setQuery('')
                                setCat('All')
                            }}
                            className="text-accent text-sm hover:underline"
                        >
                            Clear filters
                        </button>
                    </div>
                ) : (
                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {filtered.map((s) => (
                            <StudyCard key={s.id} study={s} />
                        ))}
                    </div>
                )}
            </section>
        </>
    )
}
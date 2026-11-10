import { useParams } from 'react-router-dom'

export default function StudyDetails() {
    const { id } = useParams()
    return (
        <section className="max-w-6xl mx-auto px-4 sm:px-6 py-16">
            <p className="font-mono text-xs tracking-widest text-accent uppercase mb-4">Study · {id}</p>
            <h1 className="text-4xl md:text-5xl font-bold">Dynamic Study Page</h1>
            <p className="mt-4 text-fg-muted">This is the dynamic route (/studies/:id).</p>
        </section>
    )
}
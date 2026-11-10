import { useState } from 'react'

function Field({ label, error, children }) {
    return (
        <label className="block">
            <span className="font-mono text-xs uppercase tracking-widest text-fg-dim mb-2 block">
                {label}
                {error && (
                    <span className="text-danger ml-2 normal-case tracking-normal">{error}</span>
                )}
            </span>
            {children}
        </label>
    )
}

function InfoBlock({ label, children }) {
    return (
        <div>
            <p className="font-mono text-xs uppercase tracking-widest text-fg-dim mb-2">{label}</p>
            <div className="text-sm text-fg-muted">{children}</div>
        </div>
    )
}

function inputClass(hasError) {
    return `w-full px-4 py-3 rounded-md bg-surface border focus:outline-none text-sm placeholder:text-fg-dim transition-colors ${hasError ? 'border-danger focus:border-danger' : 'border-border focus:border-accent'
        }`
}

export default function Contact() {
    const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
    const [errors, setErrors] = useState({})
    const [sent, setSent] = useState(false)

    function validate() {
        const e = {}
        if (!form.name.trim()) e.name = 'Required'
        if (!form.email.trim()) e.email = 'Required'
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Invalid email'
        if (!form.subject.trim()) e.subject = 'Required'
        if (!form.message.trim()) e.message = 'Required'
        return e
    }

    function handleSubmit(e) {
        e.preventDefault()
        const errs = validate()
        setErrors(errs)
        if (Object.keys(errs).length === 0) {
            // Mock submission — a real app would POST to an API.
            setSent(true)
            setForm({ name: '', email: '', subject: '', message: '' })
        }
    }

    function update(field, value) {
        setForm({ ...form, [field]: value })
        if (errors[field]) setErrors({ ...errors, [field]: undefined })
    }

    return (
        <>
            <section className="max-w-6xl mx-auto px-4 sm:px-6 py-16">
                <p className="font-mono text-xs tracking-widest text-accent uppercase mb-4">Contact</p>
                <h1 className="text-4xl md:text-5xl font-bold max-w-2xl mb-4">
                    Questions, feedback, or want to contribute?
                </h1>
                <p className="text-fg-muted max-w-2xl">
                    Drop us a line. Whether you're a doctor wanting to publish, a patient with feedback, or anyone curious about Pulse — we read everything.
                </p>
            </section>

            <section className="max-w-6xl mx-auto px-4 sm:px-6 pb-20 grid md:grid-cols-[2fr_1fr] gap-12">
                {/* Form */}
                <div>
                    {sent ? (
                        <div className="p-8 rounded-xl border border-accent/30 bg-surface">
                            <div className="flex items-start gap-3">
                                <div className="w-10 h-10 rounded-full bg-accent/10 border border-accent/20 flex items-center justify-center text-accent shrink-0">
                                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                        strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M20 6 9 17l-5-5" />
                                    </svg>
                                </div>
                                <div>
                                    <h3 className="font-bold text-lg mb-2">Message received.</h3>
                                    <p className="text-sm text-fg-muted mb-4">
                                        Thanks for reaching out. We'll reply within 2 business days.
                                    </p>
                                    <button
                                        onClick={() => setSent(false)}
                                        className="text-sm text-accent hover:underline"
                                    >
                                        Send another message
                                    </button>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="space-y-5" noValidate>
                            <div className="grid md:grid-cols-2 gap-5">
                                <Field label="Name" error={errors.name}>
                                    <input
                                        type="text"
                                        value={form.name}
                                        onChange={(e) => update('name', e.target.value)}
                                        className={inputClass(errors.name)}
                                    />
                                </Field>
                                <Field label="Email" error={errors.email}>
                                    <input
                                        type="email"
                                        value={form.email}
                                        onChange={(e) => update('email', e.target.value)}
                                        className={inputClass(errors.email)}
                                    />
                                </Field>
                            </div>

                            <Field label="Subject" error={errors.subject}>
                                <input
                                    type="text"
                                    value={form.subject}
                                    onChange={(e) => update('subject', e.target.value)}
                                    className={inputClass(errors.subject)}
                                />
                            </Field>

                            <Field label="Message" error={errors.message}>
                                <textarea
                                    rows={6}
                                    value={form.message}
                                    onChange={(e) => update('message', e.target.value)}
                                    className={inputClass(errors.message) + ' resize-y min-h-32'}
                                />
                            </Field>

                            <button
                                type="submit"
                                className="px-6 py-3 rounded-md bg-accent text-bg font-medium hover:bg-accent-hover transition-colors"
                            >
                                Send message
                            </button>
                        </form>
                    )}
                </div>

                {/* Sidebar info */}
                <aside className="space-y-8">
                    <InfoBlock label="Email">
                        <a href="mailto:hello@pulse.app" className="hover:text-accent transition-colors">
                            hello@pulse.app
                        </a>
                    </InfoBlock>
                    <InfoBlock label="Response time">Within 2 business days</InfoBlock>
                    <InfoBlock label="For doctors">
                        To join as a contributor, email with "Contributor" in the subject line.
                    </InfoBlock>
                    <InfoBlock label="Press & partnerships">
                        <a href="mailto:press@pulse.app" className="hover:text-accent transition-colors">
                            press@pulse.app
                        </a>
                    </InfoBlock>
                </aside>
            </section>
        </>
    )
}
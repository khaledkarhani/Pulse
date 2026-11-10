import { useEffect, useState } from 'react'
import { useAuth } from '../context/AuthContext'

function Field({ label, children }) {
    return (
        <label className="block">
            <span className="font-mono text-xs uppercase tracking-widest text-fg-dim mb-2 block">{label}</span>
            {children}
        </label>
    )
}

const inputClass = 'w-full px-4 py-3 rounded-md bg-bg border border-border focus:border-accent focus:outline-none text-sm'

export default function AuthModal({ open, mode, onClose, onSwitchMode }) {
    const { login, register } = useAuth()
    const [form, setForm] = useState({ name: '', email: '', password: '', role: 'patient', specialty: '' })
    const [error, setError] = useState('')

    useEffect(() => {
        if (open) {
            setForm({ name: '', email: '', password: '', role: 'patient', specialty: '' })
            setError('')
        }
    }, [open, mode])

    useEffect(() => {
        if (!open) return
        function onKey(e) { if (e.key === 'Escape') onClose() }
        window.addEventListener('keydown', onKey)
        return () => window.removeEventListener('keydown', onKey)
    }, [open, onClose])

    useEffect(() => {
        document.body.style.overflow = open ? 'hidden' : ''
        return () => { document.body.style.overflow = '' }
    }, [open])

    if (!open) return null

    const isSignin = mode === 'signin'

    function handleSubmit(e) {
        e.preventDefault()
        setError('')

        const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)

        if (isSignin) {
            if (!form.email.trim()) return setError('Email is required.')
            if (!emailValid) return setError('Please enter a valid email address.')
            if (!form.password) return setError('Password is required.')

            const res = login(form.email, form.password)
            if (!res.ok) setError(res.error)
            else onClose()
        } else {
            if (!form.name.trim()) return setError('Name is required.')
            if (!form.email.trim()) return setError('Email is required.')
            if (!emailValid) return setError('Please enter a valid email address.')
            if (form.password.length < 6) return setError('Password must be at least 6 characters.')
            if (form.role === 'doctor' && !form.specialty.trim()) {
                return setError('Specialty is required for doctors.')
            }

            const res = register(form)
            if (!res.ok) setError(res.error)
            else onClose()
        }
    }

    function update(field, value) { setForm({ ...form, [field]: value }) }

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
            onClick={(e) => e.target === e.currentTarget && onClose()}
        >
            <div className="w-full max-w-md rounded-xl border border-border bg-surface shadow-2xl">
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-border">
                    <div className="flex items-center gap-2">
                        <svg viewBox="0 0 24 24" className="w-5 h-5 text-accent" fill="none"
                            stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M3 12h4l2-6 4 12 2-6h6" />
                        </svg>
                        <span className="font-bold">
                            {isSignin ? 'Sign in to Pulse' : 'Create your account'}
                        </span>
                    </div>
                    <button onClick={onClose} className="text-fg-dim hover:text-fg" aria-label="Close">
                        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M18 6 6 18M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="p-6 space-y-4" noValidate>
                    {!isSignin && (
                        <Field label="Name">
                            <input type="text" value={form.name}
                                onChange={(e) => update('name', e.target.value)}
                                className={inputClass} autoComplete="name" />
                        </Field>
                    )}

                    <Field label="Email">
                        <input type="email" value={form.email}
                            onChange={(e) => update('email', e.target.value)}
                            className={inputClass} autoComplete="email" />
                    </Field>

                    <Field label="Password">
                        <input type="password" value={form.password}
                            onChange={(e) => update('password', e.target.value)}
                            className={inputClass}
                            autoComplete={isSignin ? 'current-password' : 'new-password'} />
                    </Field>

                    {!isSignin && (
                        <>
                            <Field label="I am a">
                                <div className="grid grid-cols-2 gap-2">
                                    {['patient', 'doctor'].map((r) => (
                                        <button type="button" key={r}
                                            onClick={() => update('role', r)}
                                            className={`px-3 py-2 text-sm rounded-md border capitalize transition-colors ${form.role === r
                                                ? 'bg-accent text-bg border-accent'
                                                : 'border-border text-fg-muted hover:border-accent hover:text-accent'
                                                }`}>
                                            {r}
                                        </button>
                                    ))}
                                </div>
                            </Field>

                            {form.role === 'doctor' && (
                                <Field label="Specialty">
                                    <input type="text" value={form.specialty}
                                        onChange={(e) => update('specialty', e.target.value)}
                                        placeholder="e.g. Cardiology" className={inputClass} />
                                </Field>
                            )}
                        </>
                    )}

                    {error && (
                        <div className="p-3 rounded-md bg-danger/10 border border-danger/30 text-sm text-danger">
                            {error}
                        </div>
                    )}

                    <button type="submit"
                        className="w-full px-4 py-3 rounded-md bg-accent text-bg font-medium hover:bg-accent-hover transition-colors">
                        {isSignin ? 'Sign in' : 'Create account'}
                    </button>
                </form>

                {/* Switch mode */}
                <div className="px-6 pb-6 text-center text-sm text-fg-muted">
                    {isSignin ? "Don't have an account?" : 'Already have an account?'}{' '}
                    <button onClick={() => onSwitchMode(isSignin ? 'register' : 'signin')}
                        className="text-accent hover:underline">
                        {isSignin ? 'Create one' : 'Sign in'}
                    </button>
                </div>
            </div>
        </div>
    )
}
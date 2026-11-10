import { createContext, useContext, useEffect, useState } from 'react'
import AuthModal from '../components/AuthModal'

const AuthContext = createContext(null)

const USERS_KEY = 'pulse.users'
const SESSION_KEY = 'pulse.session'

function readUsers() {
    try { return JSON.parse(localStorage.getItem(USERS_KEY) || '[]') }
    catch { return [] }
}
function writeUsers(users) { localStorage.setItem(USERS_KEY, JSON.stringify(users)) }

function readSession() {
    try { return JSON.parse(localStorage.getItem(SESSION_KEY) || 'null') }
    catch { return null }
}
function writeSession(user) {
    if (user) localStorage.setItem(SESSION_KEY, JSON.stringify(user))
    else localStorage.removeItem(SESSION_KEY)
}

export function AuthProvider({ children }) {
    const [user, setUser] = useState(() => readSession())
    const [modalOpen, setModalOpen] = useState(false)
    const [modalMode, setModalMode] = useState('signin')

    function register({ name, email, password, role, specialty }) {
        const users = readUsers()
        if (users.find((u) => u.email.toLowerCase() === email.toLowerCase())) {
            return { ok: false, error: 'An account with that email already exists.' }
        }
        const newUser = {
            id: crypto.randomUUID(),
            name, email, password, // mock only
            role,
            specialty: role === 'doctor' ? specialty : undefined,
            createdAt: new Date().toISOString(),
        }
        writeUsers([...users, newUser])
        const { password: _, ...publicUser } = newUser
        writeSession(publicUser)
        setUser(publicUser)
        return { ok: true }
    }

    function login(email, password) {
        const users = readUsers()
        const found = users.find(
            (u) => u.email.toLowerCase() === email.toLowerCase() && u.password === password
        )
        if (!found) return { ok: false, error: 'Incorrect email or password.' }
        const { password: _, ...publicUser } = found
        writeSession(publicUser)
        setUser(publicUser)
        return { ok: true }
    }

    function logout() {
        writeSession(null)
        setUser(null)
    }

    function openAuthModal(mode = 'signin') {
        setModalMode(mode)
        setModalOpen(true)
    }
    function closeAuthModal() { setModalOpen(false) }

    return (
        <AuthContext.Provider value={{ user, register, login, logout, openAuthModal, closeAuthModal }}>
            {children}
            <AuthModal open={modalOpen} mode={modalMode} onClose={closeAuthModal} onSwitchMode={setModalMode} />
        </AuthContext.Provider>
    )
}

export function useAuth() {
    const ctx = useContext(AuthContext)
    if (!ctx) throw new Error('useAuth must be used within AuthProvider')
    return ctx
}
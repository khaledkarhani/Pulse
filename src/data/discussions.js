const KEY = 'pulse.discussions'

function read() {
    try { return JSON.parse(localStorage.getItem(KEY) || '[]') }
    catch { return [] }
}

function write(comments) {
    localStorage.setItem(KEY, JSON.stringify(comments))
}

export function getComments(studyId) {
    return read()
        .filter((c) => c.studyId === studyId)
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
}

export function addComment({ studyId, user, body }) {
    const comment = {
        id: crypto.randomUUID(),
        studyId,
        authorId: user.id,
        authorName: user.name,
        authorRole: user.role,
        authorSpecialty: user.specialty,
        body: body.trim(),
        createdAt: new Date().toISOString(),
    }
    write([...read(), comment])
    return comment
}

export function deleteComment(id, userId) {
    const comments = read()
    const comment = comments.find((c) => c.id === id)
    if (!comment || comment.authorId !== userId) return false
    write(comments.filter((c) => c.id !== id))
    return true
}
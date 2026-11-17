import pb from './pb'

export function formatProjectDate(value) {
    if (!value) return ''
    const date = new Date(String(value).trim().replace(' ', 'T'))
    if (Number.isNaN(date.getTime())) return String(value)

    return new Intl.DateTimeFormat('es-MX', {
        timeZone: 'America/Mexico_City',
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        year: 'numeric',
        hour: 'numeric',
        minute: '2-digit',
    }).format(date)
}

const records = await pb.collection('NEXO_Proyectos').getFullList({
    sort: '-created',
    filter: 'published = true',
    expand: 'dates',
})

export const projects = records.map((record) => {
    const file = Array.isArray(record.coverimage) ? record.coverimage[0] : record.coverimage
    const expanded = record.expand?.dates
    const dates = Array.isArray(expanded) ? expanded : expanded ? [expanded] : []

    return {
        id: record.id,
        title: record.title,
        description: record.description,
        status: record.status,
        coverimage: file ? pb.files.getURL(record, file) : '',
        route: `/proyectos/${record.slug}`,
        sessions: dates
            .filter((session) => session.date)
            .map((session) => ({
                id: session.id,
                name: session.date_name || '',
                dateISO: session.date,
            }))
            .sort((a, b) => String(a.dateISO).localeCompare(String(b.dateISO))),
    }
})

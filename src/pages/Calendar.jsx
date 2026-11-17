import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import '../styles/Styles.css'
import { projects } from '../lib/projects'

const WEEKDAYS = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom']

function mexicoDate(year, month, day) {
    return new Date(Date.UTC(year, month - 1, day, 18, 0, 0))
}

function mexicoParts(date) {
    const [year, month, day] = new Intl.DateTimeFormat('en-CA', {
        timeZone: 'America/Mexico_City',
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
    }).format(date).split('-').map(Number)

    return { year, month, day }
}

function eventTime(date) {
    const parts = new Intl.DateTimeFormat('es-MX', {
        timeZone: 'America/Mexico_City',
        hour: 'numeric',
        minute: '2-digit',
        hourCycle: 'h23',
    }).formatToParts(date)
    const hour = Number(parts.find((part) => part.type === 'hour')?.value)
    const minute = Number(parts.find((part) => part.type === 'minute')?.value)
    if (hour === 0 && minute === 0) return ''

    return new Intl.DateTimeFormat('es-MX', {
        timeZone: 'America/Mexico_City',
        hour: 'numeric',
        minute: '2-digit',
    }).format(date)
}

function Calendar() {
    const events = useMemo(() => {
        return projects
            .flatMap((item) => (item.sessions || []).map((session) => {
                const when = new Date(String(session.dateISO).trim().replace(' ', 'T'))
                if (Number.isNaN(when.getTime())) return null
                return {
                    id: `${item.id}-${session.id}`,
                    title: item.title,
                    route: item.route,
                    when,
                    past: when.getTime() < Date.now(),
                    ...mexicoParts(when),
                    time: eventTime(when),
                }
            }))
            .filter(Boolean)
            .sort((a, b) => a.when - b.when)
    }, [])

    const today = mexicoParts(new Date())
    const upcoming = events.find((event) => !event.past)
    const initial = upcoming || events[events.length - 1]

    const [cursor, setCursor] = useState(() => (
        initial
            ? { year: initial.year, month: initial.month }
            : { year: today.year, month: today.month }
    ))

    const monthLabel = new Intl.DateTimeFormat('es-MX', {
        month: 'long',
        year: 'numeric',
        timeZone: 'UTC',
    }).format(new Date(Date.UTC(cursor.year, cursor.month - 1, 1)))
    const monthTitle = monthLabel.charAt(0).toUpperCase() + monthLabel.slice(1)

    const cells = useMemo(() => {
        const { year, month } = cursor
        const startOffset = (mexicoDate(year, month, 1).getUTCDay() + 6) % 7
        const daysInMonth = new Date(Date.UTC(year, month, 0)).getUTCDate()
        const total = Math.ceil((startOffset + daysInMonth) / 7) * 7

        return Array.from({ length: total }, (_, index) => {
            const day = index - startOffset + 1
            const inMonth = day >= 1 && day <= daysInMonth
            const date = inMonth ? { year, month, day } : mexicoParts(mexicoDate(year, month, day))
            const dayEvents = events.filter((event) => (
                event.year === date.year && event.month === date.month && event.day === date.day
            ))

            return {
                key: `${date.year}-${date.month}-${date.day}`,
                day: date.day,
                inMonth,
                isToday: date.year === today.year && date.month === today.month && date.day === today.day,
                dayEvents,
            }
        })
    }, [cursor, events, today.year, today.month, today.day])

    function shiftMonth(amount) {
        const next = new Date(Date.UTC(cursor.year, cursor.month - 1 + amount, 1))
        setCursor({ year: next.getUTCFullYear(), month: next.getUTCMonth() + 1 })
    }

    return (
        <section className='projects-page'>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.7, delay: 0.15 }}>
                <h1>Calendarios</h1>
            </motion.div>
            {events.length === 0 ? (
                <p className='projects-empty'>Todavía no hay eventos calendarizados.</p>
            ) : (
                <>
                    <div className='calendar-toolbar'>
                        <button type='button' className='calendar-nav' onClick={() => shiftMonth(-1)} aria-label='Mes anterior'>‹</button>
                        <h2>{monthTitle}</h2>
                        <button type='button' className='calendar-nav' onClick={() => shiftMonth(1)} aria-label='Mes siguiente'>›</button>
                    </div>
                    <div className='calendar-grid'>
                        {WEEKDAYS.map((day) => (
                            <div key={day} className='calendar-weekday'>{day}</div>
                        ))}
                        {cells.map((cell) => (
                            <div
                                key={cell.key}
                                className={`calendar-day${cell.inMonth ? '' : ' is-outside'}${cell.isToday ? ' is-today' : ''}`}>
                                <span className='calendar-day-number'>{cell.day}</span>
                                {cell.dayEvents.map((event) => (
                                    <Link key={event.id} to={event.route} className={`calendar-event${event.past ? ' is-past' : ''}`}>
                                        {event.time ? `${event.time} ${event.title}` : event.title}
                                    </Link>
                                ))}
                            </div>
                        ))}
                    </div>
                </>
            )}
        </section>
    )
}

export default Calendar

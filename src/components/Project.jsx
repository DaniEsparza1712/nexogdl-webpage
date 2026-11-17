import '../styles/Styles.css'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import pb from '../lib/pb'
import { formatProjectDate } from '../lib/projects'

function Project() {
    const { slug } = useParams()
    const [project, setProject] = useState(null)
    const [missing, setMissing] = useState(false)
    const [slide, setSlide] = useState(0)

    useEffect(() => {
        let active = true
        setProject(null)
        setMissing(false)
        setSlide(0)

        pb.collection('NEXO_Proyectos')
            .getFirstListItem(pb.filter('slug = {:slug} && published = true', { slug }), {
                expand: 'dates,leads',
            })
            .then((record) => {
                if (!active) return
                const linkedIds = Array.isArray(record.dates) ? record.dates : record.dates ? [record.dates] : []
                const expanded = record.expand?.dates
                const dates = (Array.isArray(expanded) ? expanded : expanded ? [expanded] : [])
                    .filter((session) => {
                        const when = new Date(String(session.date || '').trim().replace(' ', 'T'))
                        return !Number.isNaN(when.getTime()) && when.getTime() >= Date.now()
                    })
                    .sort((a, b) => String(a.date || '').localeCompare(String(b.date || '')))
                if (linkedIds.length === 0) {
                    console.warn('[proyecto] Sin fechas vinculadas', { slug, id: record.id })
                } else if (!expanded) {
                    console.warn('[proyecto] Hay fechas vinculadas pero no se pudieron expandir', {
                        slug,
                        id: record.id,
                        dates: linkedIds,
                    })
                } else if (dates.length === 0) {
                    console.warn('[proyecto] Todas las fechas ya pasaron', { slug, id: record.id, dates: linkedIds })
                }
                const expandedLeads = record.expand?.leads
                const leads = (Array.isArray(expandedLeads) ? expandedLeads : expandedLeads ? [expandedLeads] : [])
                    .map((lead) => {
                        const picture = Array.isArray(lead.picture) ? lead.picture[0] : lead.picture
                        return {
                            id: lead.id,
                            name: lead.name || '',
                            picture: picture ? pb.files.getURL(lead, picture) : '',
                        }
                    })
                const file = Array.isArray(record.coverimage) ? record.coverimage[0] : record.coverimage
                const galleryFiles = Array.isArray(record.gallery) ? record.gallery : record.gallery ? [record.gallery] : []
                const joinUrl = String(record.joinurl || '').trim()
                setProject({
                    title: record.title,
                    joinUrl: /^https?:\/\//i.test(joinUrl) ? joinUrl : '',
                    description: record.description,
                    activities: record.activities,
                    status: record.status,
                    image: file ? pb.files.getURL(record, file) : '',
                    gallery: galleryFiles.map((name) => pb.files.getURL(record, name)),
                    leads,
                    sessions: dates.map((session) => ({
                        id: session.id,
                        name: session.date_name || '',
                        date: formatProjectDate(session.date),
                        place: session.Lugar || '',
                    })),
                })
            })
            .catch((error) => {
                console.error('[proyecto] No se pudo cargar el proyecto', { slug, error })
                if (active) setMissing(true)
            })

        return () => {
            active = false
        }
    }, [slug])

    if (missing) {
        return (
            <section className='project-page'>
                <p className='project-missing'>Proyecto no encontrado</p>
            </section>
        )
    }

    if (!project) {
        return <section className='project-page' />
    }

    return (
        <>
            <motion.section
                className='project-info'
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}>
                <div className='project-info-grid'>
                    {project.image && (
                        <div className='project-info-media'>
                            <img src={project.image} alt='' />
                        </div>
                    )}
                    <div className='project-info-copy'>
                        {project.status && <p className='project-status'>{project.status}</p>}
                        <div className='project-heading'>
                            <h1>{project.title}</h1>
                            {project.joinUrl && (
                                <a
                                    className='project-join'
                                    href={project.joinUrl}
                                    target='_blank'
                                    rel='noopener noreferrer'>
                                    Unirse al grupo de WhatsApp ↗
                                </a>
                            )}
                        </div>
                        {project.description && <p>{project.description}</p>}
                        {project.activities && (
                            <>
                                <h2>Actividades</h2>
                                <p className='project-activities'>{project.activities}</p>
                            </>
                        )}
                    </div>
                </div>
                {project.sessions.length > 0 && (
                    <div className='project-sessions'>
                        <h2>Fechas</h2>
                        <div className='project-session-list'>
                            {project.sessions.map((session) => (
                                <article key={session.id} className='project-session-card'>
                                    {session.date && (
                                        <div>
                                            <p className='project-session-label'>Fecha</p>
                                            <h3>{session.date}</h3>
                                        </div>
                                    )}
                                    {session.place && (
                                        <div>
                                            <p className='project-session-label'>Lugar</p>
                                            <p className='project-session-place'>{session.place}</p>
                                        </div>
                                    )}
                                </article>
                            ))}
                        </div>
                    </div>
                )}
                {project.leads.length > 0 && (
                    <div className='project-leads'>
                        <h2>Encargados</h2>
                        <div className='project-lead-list'>
                            {project.leads.map((lead) => (
                                <article key={lead.id} className='project-lead-card'>
                                    {lead.picture ? (
                                        <img src={lead.picture} alt='' />
                                    ) : (
                                        <div className='project-lead-fallback' aria-hidden='true' />
                                    )}
                                    {lead.name && <h3>{lead.name}</h3>}
                                </article>
                            ))}
                        </div>
                    </div>
                )}
                {project.gallery.length > 0 && (
                    <div className='project-gallery'>
                        <h2>Galería</h2>
                        <div
                            className='project-gallery-stage'
                            role='region'
                            aria-label='Galería del proyecto'
                            tabIndex={project.gallery.length > 1 ? 0 : undefined}
                            onKeyDown={(event) => {
                                if (project.gallery.length < 2) return
                                if (event.key === 'ArrowLeft') {
                                    event.preventDefault()
                                    setSlide((current) => (current - 1 + project.gallery.length) % project.gallery.length)
                                }
                                if (event.key === 'ArrowRight') {
                                    event.preventDefault()
                                    setSlide((current) => (current + 1) % project.gallery.length)
                                }
                            }}>
                            <AnimatePresence mode='wait'>
                                <motion.img
                                    key={project.gallery[slide]}
                                    src={project.gallery[slide]}
                                    alt=''
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 0.25 }}
                                />
                            </AnimatePresence>
                            {project.gallery.length > 1 && (
                                <>
                                    <button
                                        type='button'
                                        className='project-gallery-nav is-prev'
                                        aria-label='Imagen anterior'
                                        onClick={() => setSlide((current) => (current - 1 + project.gallery.length) % project.gallery.length)}>
                                        <svg viewBox='0 0 24 24' aria-hidden='true'>
                                            <path d='M14.5 5.5 8 12l6.5 6.5' fill='none' stroke='currentColor' strokeWidth='2.2' strokeLinecap='round' strokeLinejoin='round' />
                                        </svg>
                                    </button>
                                    <button
                                        type='button'
                                        className='project-gallery-nav is-next'
                                        aria-label='Imagen siguiente'
                                        onClick={() => setSlide((current) => (current + 1) % project.gallery.length)}>
                                        <svg viewBox='0 0 24 24' aria-hidden='true'>
                                            <path d='M9.5 5.5 16 12l-6.5 6.5' fill='none' stroke='currentColor' strokeWidth='2.2' strokeLinecap='round' strokeLinejoin='round' />
                                        </svg>
                                    </button>
                                </>
                            )}
                        </div>
                        {project.gallery.length > 1 && (
                            <div className='project-gallery-dots'>
                                {project.gallery.map((src, index) => (
                                    <button
                                        key={src}
                                        type='button'
                                        className={index === slide ? 'is-active' : undefined}
                                        aria-label={`Imagen ${index + 1} de ${project.gallery.length}`}
                                        aria-current={index === slide ? 'true' : undefined}
                                        onClick={() => setSlide(index)}
                                    />
                                ))}
                            </div>
                        )}
                    </div>
                )}
            </motion.section>
            <motion.section
                className='project-donate'
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.1 }}>
                <h2>Donativo</h2>
                <form className='donate-form' onSubmit={(event) => event.preventDefault()}>
                    <label>
                        Nombre
                        <input type='text' name='name' autoComplete='name' />
                    </label>
                    <label>
                        Correo
                        <input type='email' name='email' autoComplete='email' />
                    </label>
                    <label>
                        Monto
                        <input type='number' name='amount' min='1' inputMode='decimal' />
                    </label>
                    <button type='submit' className='btn'>Donar</button>
                </form>
            </motion.section>
        </>
    )
}

export default Project

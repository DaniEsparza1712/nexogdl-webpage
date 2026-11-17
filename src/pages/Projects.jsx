import '../styles/Styles.css'
import '../styles/CarouselStyle.css'
import { motion } from 'framer-motion'
import ProjectCard from '../components/ProjectCard'
import { projects } from '../lib/projects'

function Projects() {
    return (
        <section className='projects-page'>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.7, delay: 0.15 }}>
                <h1>Proyectos</h1>
            </motion.div>
            {projects.length === 0 ? (
                <p className='projects-empty'>Todavía no hay proyectos publicados.</p>
            ) : (
                <div className='projects-list'>
                    {projects.map((item) => (
                        <ProjectCard key={item.id} item={item} />
                    ))}
                </div>
            )}
        </section>
    )
}

export default Projects

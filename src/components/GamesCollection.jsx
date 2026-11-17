import '../styles/Styles.css'
import '../styles/CarouselStyle.css'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import ProjectCard from './ProjectCard'
import { projects } from '../lib/projects'

function GamesCollection(){
    return(
        <div className='games-collection' id='games'>
            <motion.div
            initial={{opacity: 0}}
            whileInView={{opacity: 1}}
            viewport={{once: true}}
            transition={{duration: 0.7, delay: 0.15}}>
                <div className='games-collection-title'>
                    <h1>Encuentra tu siguiente jornada</h1>
                    <Link to='/proyectos' className='projects-all-link'>Todos los proyectos</Link>
                </div>
                <p className='section-lead'>Consulta cuándo se realiza, a quién va dirigida y cómo participar.</p>
            </motion.div>
            <div
                className={`project-scroller${projects.length === 1 ? ' is-single' : ''}`}
                role='region'
                aria-label='Proyectos'
                tabIndex={0}>
                {projects.map((item) => (
                    <ProjectCard key={item.id} item={item} />
                ))}
            </div>
        </div>
    );
}

export default GamesCollection;

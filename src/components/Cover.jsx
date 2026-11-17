import '../styles/Styles.css'
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

function Cover(){
    return(
        <motion.div
            initial={{opacity: 0}}
            animate={{opacity: 1}}
            transition={{duration: 0.5}}>
                <div className='cover'>
                    <div className='cover-hero'>
                        <div className='cover-content'>
                            <motion.div initial={{opacity: 0, y: 50}}
                            animate={{opacity: 1, y: 0}}
                            transition={{duration: 0.5, delay: 0.2}}>
                                <p className='cover-kicker'>NEXO · Labores sociales en GDL</p>
                                <h1 className='cover-title'>Red de amigos que hacen Labor Social</h1>
                                <p className='cover-subtitle'>Un poco de tiempo al mes, un corazón más grande cada día.</p>
                                <p className='cover-copy'>Encuentra grupos de voluntarios con quienes participar en labores sociales de manera constante. Comparte la experiencia, asume responsabilidades y descubre cómo servir a los demás puede ayudarte a crecer en compasión cada día.</p>
                                <div className='cover-actions'>
                                    <Link className='btn' to='/proyectos'>Participa en un proyecto</Link>
                                    <Link className='btn btn-ghost' to='games/gritfast'>Conoce NEXO</Link>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </div>
        </motion.div>
    );
}

export default Cover;
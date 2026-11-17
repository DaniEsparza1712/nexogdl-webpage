import '../styles/Styles.css'
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import samaritan from '../assets/images/good-samaritan_jordaens.jpg'

function IndexAbout(){
    return(
        <div className='index-about'>
            <motion.div
            className='index-about-media'
            initial={{x: -10, opacity: 0}}
            whileInView={{x: 0, opacity: 1}}
            transition={{duration:0.5, delay: 0.3}}
            viewport={{once: true}}>
                <img src={samaritan} alt='El buen samaritano'/>
            </motion.div>
            <motion.div
            className='index-about-copy'
            initial={{x: 10, opacity: 0}}
            whileInView={{x: 0, opacity: 1}}
            transition={{duration:0.5, delay:0.3}}
            viewport={{once: true}}>
                <h2>¿Qué es Nexo?</h2>
                <p>NEXO es una plataforma que conecta a personas interesadas en participar en labores sociales en Guadalajara y crecer en compasión a través del servicio.</p>
                <h4>Objetivo</h4>
                <p>Facilitar oportunidades concretas de voluntariado y promover una cultura de servicio que nos ayude a vencer la indiferencia, dentro y fuera de cada jornada.</p>
                <h4>Inspiración</h4>
                <p>La parábola del Buen Samaritano nos enseña a detenernos ante las necesidades de los demás. También nos invita a llevar el servicio a nuestra familia, amistades y trabajo, como una actitud cotidiana.</p>
                <Link className='btn' to='games/gritfast'>Conoce NEXO</Link>
            </motion.div>
        </div>
    )
}

export default IndexAbout;
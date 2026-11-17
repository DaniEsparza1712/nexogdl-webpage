import '../styles/Styles.css'
import { motion } from 'framer-motion'
import samaritan from '../assets/images/good-samaritan_jordaens.jpg'

function AboutUs(){
    return(
        <>
        <section className='about-page'>
            <motion.div
                className='about-intro'
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.1 }}>
                <h1>¿Qué es NEXO?</h1>
                <p>
                    NEXO es un grupo de amigos que se organiza para realizar labores sociales en Guadalajara. A través de proyectos habituales, buscamos crear espacios donde podamos ayudar a quienes lo necesitan, fortalecer nuestras amistades y crecer juntos en compasión.
                </p>
                <div className='about-principles'>
                    <article>
                        <h2>Misión</h2>
                        <p>
                            Facilitar proyectos de labor social constantes a fin de ayudar a jóvenes profesionistas a integrar el servicio en su proyecto de vida por medio de la amistad, la responsabilidad, la reflexión y la constancia.
                        </p>
                    </article>
                    <article>
                        <h2>Visión</h2>
                        <p>
                            Ser una red consolidada de amigos, con una variedad de proyectos de labor social en marcha, coordinados por decenas de grupos de voluntarios que vivan los principios de NEXO —amistad, responsabilidad, reflexión y constancia— en sus actividades.
                        </p>
                    </article>
                </div>
                <div className='about-values'>
                    <h2>Principios</h2>
                    <div className='about-values-grid'>
                        <article>
                            <h3>Amistad</h3>
                            <p>
                                Queremos que las labores sociales fortalezcan nuestras amistades y nos ayuden a crecer junto a nuestros amigos. También son una oportunidad para conocer nuevas personas y construir vínculos alrededor del servicio.
                            </p>
                        </article>
                        <article>
                            <h3>Responsabilidad</h3>
                            <p>
                                En NEXO todos tenemos un papel. No somos espectadores: desde armar los kits y coordinar una jornada hasta acompañar a personas necesitadas, cada uno se hace cargo de algo concreto.
                            </p>
                        </article>
                        <article>
                            <h3>Reflexión</h3>
                            <p>
                                Buscamos que el servicio transforme nuestra vida. Por eso, las jornadas incluyen momentos de reflexión para llevar lo aprendido a nuestra familia, amistades y responsabilidades cotidianas: pasar de ser el Buen Samaritano al posadero.
                            </p>
                        </article>
                        <article>
                            <h3>Constancia</h3>
                            <p>
                                Queremos que servir se convierta en un hábito. Facilitamos oportunidades periódicas —quincenales, mensuales o anuales— para que cada persona encuentre una manera constante de ayudar.
                            </p>
                        </article>
                    </div>
                </div>
            </motion.div>
        </section>
        <section className='about-inspiration'>
            <img src={samaritan} alt='El buen samaritano'/>
            <div className='about-inspiration-inner'>
                <p className='about-inspiration-kicker'>Nuestra inspiración</p>
                <h2>El Buen Samaritano</h2>
                <blockquote>
                    <p>«Enfrentamos cada día la opción de ser buenos samaritanos».</p>
                </blockquote>
                <p className='about-inspiration-source'>Papa Francisco · <cite>Fratelli tutti</cite>, n. 69</p>
                <p>
                    La parábola del Buen Samaritano nos inspira a vivir el servicio en dos dimensiones: salir al encuentro de quienes nos necesitan y llevar esa actitud de compasión a nuestra vida ordinaria.
                </p>
                <h3>Como el Buen Samaritano</h3>
                <p>
                    Detenernos de vez en cuando ante las necesidades de los demás, salir a su encuentro y dedicar nuestro tiempo, esfuerzo y recursos para ayudarlos de manera concreta.
                </p>
                <h3>Como el Posadero</h3>
                <p>
                    Dejar que esa experiencia de servicio transforme nuestro día a día y nos enseñe a servir mejor en el trabajo, la familia, las amistades y nuestras responsabilidades cotidianas.
                </p>
            </div>
        </section>
        </>
    )
}

export default AboutUs;

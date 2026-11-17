import '../styles/Styles.css'
import { motion } from 'framer-motion';
import logo from '../assets/logos/NEXO-2.png'

function AboutUs(){
    return(
        <div>
            <div className='about-image-container'>
                <motion.div style={{width: '100%', justifyContent: 'center', display: 'flex'}}
                initial={{opacity: 0}}
                animate={{opacity: 1}}
                transition={{duration: 0.3, delay: 0.3}}>
                    <img className='about-image' src={logo}/>
                </motion.div>
            </div>
            <div className='about-section'>
                <motion.div
                initial={{opacity: 0, y:20}}
                whileInView={{opacity: 1, y: 0}}
                viewport={{once: true}}
                transition={{duration: 0.3, delay: 0.1}}>
                    <h1 style={{marginBottom: '3%'}}>WHO ARE WE?</h1>
                    <h4 style={{width: '80%', margin: '0 auto'}}>Stunhoax Studios is an independent game development studio based in Guadalajara, Mexico, focused on creating gameplay-first experiences with strong systems and memorable worlds.</h4>
                </motion.div>
            </div>
            <div className='about-section-dark'>
                <motion.div
                initial={{opacity: 0, y:20}}
                whileInView={{opacity: 1, y: 0}}
                viewport={{once: true}}
                transition={{duration: 0.3, delay: 0.1}}>
                    <h1 style={{marginBottom: '3%'}}>VISION</h1>
                    <h4 style={{width: '80%', margin: '0 auto'}}>Our goal is to create original worlds and systems that players can continue discovering long after the first playthrough.</h4>
                </motion.div>
            </div>
            <div className='about-section'>
                <motion.div
                initial={{opacity: 0, y:20}}
                whileInView={{opacity: 1, y: 0}}
                viewport={{once: true}}
                transition={{duration: 0.3, delay: 0.1}}>
                    <h1 style={{marginBottom: '5%'}}>TEAM</h1>
                </motion.div>
                <motion.div className='team-container'
                initial={{opacity: 0}}
                whileInView={{opacity: 1}}
                viewport={{once: true}}
                transition={{duration: 0.4, delay: 0.3}}>
                    <div className='team-member-card'>
                        <h2 style={{marginBottom: '2%'}}>DANIEL ESPARZA</h2>
                        <p>Technical Director & Programmer</p>
                    </div>
                    <div className='team-member-card'>
                        <h2 style={{marginBottom: '2%'}}>ALEX ESPARZA</h2>
                        <p>Creative Director & 3D Artist</p>
                    </div>
                </motion.div>
            </div>
        </div>
    )
}

export default AboutUs;
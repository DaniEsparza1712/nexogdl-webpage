import '../styles/Styles.css'
import { motion } from 'framer-motion';

function IndexAbout(){
    return(
        <div className='index-quote'>
            <motion.div
            initial={{x: 10, opacity: 0}}
            whileInView={{x: 0, opacity: 1}}
            transition={{duration:0.5, delay:0.3}}
            viewport={{once: true}}>
                <h2>«Hay que alimentar el amor y las convicciones más profundas, y eso se hace con gestos.»</h2>
                <p className='quote-source'>León XIV · <a href="https://www.vatican.va/content/leo-xiv/es/apost_exhortations/documents/20251004-dilexi-te.html">Dilexi te, n. 119 ↗</a></p>
            </motion.div>
        </div>
    )
}

export default IndexAbout;
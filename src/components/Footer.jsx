import '../styles/Styles.css'
import { SocialIcon } from 'react-social-icons/component'
import 'react-social-icons/linkedin'
import 'react-social-icons/instagram'
import 'react-social-icons/x'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

function Footer(){
    const navigate = useNavigate();
    const goToSection = (id) => {
        navigate("/")
        setTimeout(() => {
            document.getElementById(id)?.scrollIntoView({behavior: 'smooth'})
        }, 100)
    }

    return(
        <div className='footer'>
            {/*Contact info*/}
            <div>
                <h3 style={{color: 'black'}}><b>NEXO</b> Gdl</h3>
                <p className='contact-text'>contacto</p>
            </div>
            {/*Learn more*/}
            <div>
                <h3 style={{color: 'black'}}><b>Conoce más</b></h3>
                <Link to='/about'><p className='contact-link'>Nosotros</p></Link>
                <span onClick={() => goToSection('games')}><p className='contact-link'>Proyectos</p></span>
            </div>
        </div>
    )
}

export default Footer;
import '../styles/Styles.css'
import logo from '../assets/logos/Nexo-2.png'
import { Link } from 'react-router-dom';

function Navbar(){
    return(
        <div className='navbar'>
            <Link to='/' className='logo-link'><img src={logo} style={{width: '50%'}}/></Link>

            {/*--Texto--*/}
            <div style={{display: 'flex', gap: '24px'}}>
                <Link to='/proyectos'><p className='navbar-text'>Proyectos</p></Link>
                <Link to='/calendarios'><p className='navbar-text'>Calendarios</p></Link>
                <Link to='/about'><p className='navbar-text'>Conócenos</p></Link>
            </div>
        </div>
    );
}

export default Navbar;
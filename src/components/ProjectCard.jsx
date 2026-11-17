import { useNavigate } from 'react-router-dom'

function ProjectCard({ item }) {
    const navigate = useNavigate()

    return (
        <article className='project-card'>
            <div className='project-card-media'>
                {item.coverimage && <img src={item.coverimage} alt='' />}
            </div>
            <div className='project-card-body'>
                <p className='project-card-status'>{item.status}</p>
                <h2>{item.title}</h2>
                <p className='project-card-desc'>{item.description}</p>
                <button
                    type='button'
                    className='btn project-card-action'
                    onClick={() => navigate(item.route)}>
                    Ver proyecto
                </button>
            </div>
        </article>
    )
}

export default ProjectCard

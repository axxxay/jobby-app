import './index.css'

const Skills = ({skill}) => {
  const {name, imageUrl} = skill
  return (
    <li className="job-details-skills">
      <img src={imageUrl} alt={name} className="job-details-skill-img" />
      <p className="job-details-skill-name">{name}</p>
    </li>
  )
}

export default Skills

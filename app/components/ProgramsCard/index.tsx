import styles from './style.module.css'

type Props = {
  title: string
  description: string
  image: string
}

const ProgramCard = ({ title, description, image }: Props) => {
  return (
    <div className={styles.card}>
      <div
        className={styles.image}
        style={{ backgroundImage: `url(${image})` }}
      />

      <div className={styles.content}>
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  )
}

export default ProgramCard
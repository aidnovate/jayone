import styles from './style.module.css'
import Button from './../Button/index'

const index = () => {
  return (
    <section className={styles.cta}>
      <div className={styles.overlay} />
      <div className={styles.content}>
        <h2>Your Fashion Journey Starts Here</h2>
        <Button variant="primary" href="/apply-now">
          Apply Today
        </Button>
      </div>
    </section>
  )
}

export default index
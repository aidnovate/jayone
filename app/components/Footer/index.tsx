import style from './style.module.css'

export default function Footer() {
  return (
    <footer className={style.luxuryFooter}>

      <div className={style.footerTop}>
        <h2>
          Designed for the Bold.
        </h2>
      </div>

      <div className={style.footerMiddle}>
        <div className={style.footerBrand}>
          <h3>JAYONE PRETIGE</h3>
          <p>
            Crafting the next generation of fashion leaders.
          </p>
        </div>

        <div className={style.footerLinks}>
          <a href="#">Programs</a>
          <a href="#">Student Works</a>
          <a href="#">Apply</a>
          <a href="#">Contact</a>
        </div>

        <div className={style.footerSocial}>
          <a href="#">Instagram</a>
          <a href="#">Facebook</a>
          <a href="#">LinkedIn</a>
        </div>
      </div>

      <div className={style.footerBottom}>
        <p>&copy; 2026 JAYONE PRETIGE. All Rights Reserved.</p>
      </div>

    </footer>
  );
}

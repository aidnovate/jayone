import style from "./page.module.css";
import HomeHero2 from "./components/HeroSlider2";
import Button from "./components/Button";
import ProgramCard from './components/ProgramsCard/index'
import CTA from './components/CTA/index'
import ContactBanner from "./components/ContactBanner";
import Testimonials from "./components/Testimonials";
import SampleWorks from './components/SampleWorks/index'
import Footer from "./components/Footer";
export default function Home() {
  return (
    <>
    {/* Hero Section */}
    <HomeHero2 />

    {/* Brief about section */}

    <section className={style.section}>
      <div className={style.left}>
        <span className={style.label}>About Jayone Prestige School</span>
        <h2>Crafting Designers. Building Futures.</h2>
      </div>

      <div className={style.right}>
        <p>
          JayOne Fashion School is a creative space where passion meets
          craftsmanship. We train aspiring designers to master both modern
          fashion techniques and timeless tailoring skills.
        </p>

        <div className={style.actions}>
          <Button variant="primary" href="/apply-now">
            Apply Now
          </Button>
          <Button variant="outline" href="/our-programs">
            View Programs
          </Button>
        </div>
      </div>
    </section>



    <section className={style.section}>
      <div className={style.header}>
        <span>Our Programs</span>
        <h2>Designed For Creators</h2>
      </div>

      <div className={style.grid}>
        <ProgramCard
          title="Fashion Design"
          description="Master design concepts, sketching, and couture creation."
          image="/images/hero1.jpg"
        />
        <ProgramCard
          title="Tailoring"
          description="Professional garment construction and finishing."
          image="/images/hero2.jpg"
        />
        <ProgramCard
          title="Pattern Making"
          description="Advanced drafting and garment structure techniques."
          image="/images/hero3.jpg"
        />
      </div>
    </section>

    {/* CTA Section */}

    <CTA />



    {/* Sample students works */}

    <SampleWorks />

    {/* Testimonials from students */}
    <Testimonials />

        {/* Contact Banner */}
    <ContactBanner />
    <Footer />

    </>
  );
}

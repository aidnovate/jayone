import style from "./page.module.css";
import HomeHero2 from "../components/HeroSlider2";
import Button from "../components/Button";
import ProgramCard from '../components/ProgramsCard/index'
import CTA from '../components/CTA/index'
import ContactBanner from "../components/ContactBanner";
import Testimonials from "../components/Testimonials";
import SampleWorks from '../components/SampleWorks/index'
import Footer from "../components/Footer";
import BlogCard from '../components/BlogCard';
import EventCard from '../components/EventCard';
import Link from "next/link";

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
          title="SUITING "
          description="Suiting program focuses on precision tailoring and garment construction."
          image="/images/hero4.png"
        />
        <ProgramCard
          title="Tailoring"
          description="Professional garment construction and finishing."
          image="/images/tailoring.jpeg"
        />
        <ProgramCard
          title="MAKE UP ARTISTRY"
          description="Comprehensive makeup techniques for fashion and beauty."
          image="/images/makup.png"
        />
      </div>
    </section>

    {/* CTA Section */}

    <CTA />




    {/* Sample students works */}
    <SampleWorks />

    {/* Blog Section */}
    <section className={style.blogSection}>
      <div className={style.header}>
        <span>Latest Blog Posts</span>
        <h2>From Our Blog</h2>
      </div>
      <div className={style.blogGrid}>
        {[{ id: 1, title: 'Blog Post 1', summary: 'Summary 1', image: '/images/hero1.png' },
          { id: 2, title: 'Blog Post 2', summary: 'Summary 2', image: '/images/hero2.png' },
          { id: 3, title: 'Blog Post 3', summary: 'Summary 3', image: '/images/hero3.png' }].map(post => (
          <BlogCard key={post.id} {...post} />
        ))}
      </div>
      <div className={style.viewAllBlogs}>
        <Link href="/blog">View All Blogs</Link>
      </div>
    </section>

    {/* Events Section */}
    <section className={style.eventSection}>
      <div className={style.header}>
        <span>Upcoming Events</span>
        <h2>Events & Workshops</h2>
      </div>
      <div className={style.eventsGrid} >
        {[{ id: 1, title: 'Event 1', date: '2026-03-10', description: 'Description 1', image: '/images/hero1.png' },
          { id: 2, title: 'Event 2', date: '2026-04-15', description: 'Description 2', image: '/images/hero2.png' },
          { id: 3, title: 'Event 3', date: '2026-05-20', description: 'Description 3', image: '/images/hero3.png' }].map(event => (
          <EventCard key={event.id} {...event} />
        ))}
      </div>
      <div className={style.viewAllEvents}>
        <Link href="/events">View All Events</Link>
      </div>
    </section>

    {/* Testimonials from students */}
    <Testimonials />

    {/* Contact Banner */}
    <ContactBanner />
    <Footer />

    </>
  );
}

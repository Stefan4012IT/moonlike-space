import React, { useState, useEffect, useMemo, useRef } from 'react';
import Navbar from '../Navbar/Navbar'
import MatrixRain from '../Elements/MatrixRain'
import WaveCanvas from '../Elements/WaveCanvas'
import HeroTitle from '../Elements/HeroTitle'
import ContactForm from '../Elements/ContactForm';

function Home() {
  const [opacity, setOpacity] = useState(1);
  const sectionsRef = useRef([]);
  const [sectionOpacities, setSectionOpacities] = useState([0, 0, 0]);

  const handleScroll = () => {
    const scrollPosition = window.scrollY;
    const maxScroll = window.innerHeight;
    // Provera širine ekrana
    const isMobile = window.innerWidth < 992;

    // Prilagodjavanje formule za opacity u zavisnosti od veličine ekrana
    const newOpacity = isMobile
      ? 1 - scrollPosition / (maxScroll * 3.5)  // Sporije opadanje opacity na manjim ekranima
      : 1 - scrollPosition / (maxScroll * 0.75);
    setOpacity(newOpacity >= 0 ? newOpacity : 0);

    const newOpacities = sectionsRef.current.map((section) => {
      const rect = section.getBoundingClientRect();
      const sectionMidpoint = rect.top + rect.height / 2;
      const screenMidpoint = window.innerHeight / 2;
      const distanceFromMidpoint = Math.abs(sectionMidpoint - screenMidpoint);
      const maxDistance = window.innerHeight / 2;
      return 1 - Math.min(distanceFromMidpoint / maxDistance, 1);
    });
    setSectionOpacities(newOpacities);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    // Provera širine ekrana
    const isMobile = window.innerWidth < 992;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const index = sectionsRef.current.indexOf(entry.target);

          if (index !== -1) {
            entry.target.style.opacity = entry.intersectionRatio;
          }

          if (index === 2) {
            !isMobile ? entry.target.style.opacity = entry.intersectionRatio + .2 : entry.target.style.opacity = entry.intersectionRatio + .5;
          }

        });
      },
      { threshold: Array.from({ length: 101 }, (_, i) => i / 100) }
    );

    sectionsRef.current.forEach((section) => {
      observer.observe(section);
    });

    return () => {
      sectionsRef.current.forEach((section) => {
        observer.unobserve(section);
      });
    };
  }, []);

  const memoizedWaveCanvas = useMemo(() => <WaveCanvas id="interactive-canvas" />, []);

  return (
    <>
      <Navbar />

      <div className="hero" style={{ opacity }}>
        <MatrixRain />
        <div className="hero-front">
          <div className="grid-item item1"></div>
          <div className="grid-item item2"><div className="background-img-1"></div><HeroTitle /></div>
          <div className="grid-item item3">
            <div className="background-img-2"><div className="overlay"></div></div>
            <div className="grid-item-text"><p>Mo<span className='span-red'>o</span>nlike.space is a <span className='span-red'>creative</span> web design <span className='span-red'>studio</span>. Creating usable products for your needs. If you have a questions, and would like to manage your business with a passion, please, contact us.</p></div>
          </div>
          <div className="grid-item item4">
            <div className="background-img-3"><div className="overlay"></div></div>
            <div className="grid-item-text"><p>Mo<span className='span-red'>o</span>nlike.space believes every business deserves a unique digital presence that truly reflects its values and vision.</p></div>
          </div>
        </div>
      </div>
      {memoizedWaveCanvas}
      <section id='intro' className="content-section section-who-we-are" ref={(el) => sectionsRef.current[0] = el}>
        <div className="ease-layer-overlay">
          <h3>Intro</h3>
          <p>Welcome to Mo<span className='span-red'>o</span>nlike.space — where creativity meets digital rebellion. A creative web design studio fueled by the drive to craft innovative, user-friendly digital solutions tailored exactly to what you need. It’s all about blending aesthetics with functionality to create digital experiences that don't just look good — they work for you.</p>
          <p>Every project is built on straightforward principles: design with purpose, create with clarity, and deliver results that matter. No gimmicks, no over-the-top promises—just solid digital tools crafted to help you succeed. Let’s keep it simple, focused, and effective.</p>
        </div>

      </section>
      <section id="catalyst" className='catalyst content-section' ref={(el) => sectionsRef.current[1] = el}>
        <div className="ease-layer-overlay">
          <div className="catalyst-img-1"></div>
          <h3>Take the initiative, be the catalyst.</h3>
        </div>
      </section>
      <section id='why-moonlike-space' className="content-section why-moonlike-space" ref={(el) => sectionsRef.current[2] = el}>
        <div className="ease-layer-overlay">
          <h3>Why Mo<span className='span-red'>o</span>nlike._?</h3>
          <p>Choosing Mo<span className='span-red'>o</span>nlike.space means opting for a fresh approach to digital design. Forget the cookie-cutter solutions — here, every project is a chance to do something unique. It’s all about finding what works best for the specific needs of each business, crafting customized solutions that are as effective as they are innovative.</p>
          <p>This is a place where new ideas flourish, where the goal is always to push boundaries and create digital experiences that stand out. It's not about following trends; it's about setting them. A focus on delivering value drives every decision, every design choice, ensuring that the final product not only meets but exceeds expectations.</p>
          <p>The commitment is simple: clear communication, focused execution, and results that speak for themselves. No overblown promises or empty buzzwords — just a dedication to getting the job done right and making sure every client feels the impact of truly effective digital work. Here, the goal is to make things happen and make them happen well.</p>
        </div>

      </section>
      <section id='get-what-you-want' className="content-section get-what-you-want" ref={(el) => sectionsRef.current[3] = el}>
        <div className="ease-layer-overlay">
          <h3>Get What You Want</h3>
          <p>Success starts with a clear understanding of what’s needed. Mo<span className='span-red'>o</span>nlike.space takes pride in delivering solutions that not only meet expectations but go beyond. The focus is always on the details that matter most — crafting digital experiences that are as functional as they are visually striking.</p>
          <p>Specialized skills come into play with every project, providing solutions that are precisely tailored to specific business needs. It’s all about efficiency, cutting through the noise, and focusing on what really counts: creating impactful results without unnecessary complications.</p>
          <p>Clear, straightforward communication is key. No drawn-out back-and-forths — just a direct path from concept to completion. This streamlined approach ensures strong execution every time, with a commitment to quality that leaves no room for compromise.</p>
        </div>
      </section>
      <section className="content-section get-what-you-want" ref={(el) => sectionsRef.current[4] = el}>
        <ContactForm />
      </section>
    </>
  )
}

export default Home
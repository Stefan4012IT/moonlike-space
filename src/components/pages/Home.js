import React, { useState, useEffect, useMemo, useRef } from 'react';
import Navbar from '../Navbar/Navbar'
import MatrixRain from '../Elements/MatrixRain'
import WaveCanvas from '../Elements/WaveCanvas'
import HeroTitle from '../Elements/HeroTitle'

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
            console.log(entry);
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
            <div className="grid-item-text"><p>We are <span className='span-red'>creative</span> web design <span className='span-red'>studio</span>. Creating usable products for your needs. If you have a questions, and would like to manage your business with a passion, please, contact us.</p></div>
          </div>
          <div className="grid-item item4">
            <div className="background-img-3"><div className="overlay"></div></div>
            <div className="grid-item-text"><p>At mo<span className='span-red'>o</span>nlike.space, we believe that every business deserves a unique digital presence that truly reflects its values and vision.</p></div>
          </div>
        </div>
      </div>
      {memoizedWaveCanvas}
      <section className="content-section section-who-we-are" ref={(el) => sectionsRef.current[0] = el}>
        <div className="ease-layer-overlay">
          <h3>Who we are?</h3>
          <p>We are mo<span className='span-red'>o</span>nlike.space, a <span className='span-red'>creative</span> web design <span className='span-red'>studio</span> dedicated to crafting innovative and user-friendly digital solutions tailored to your specific needs. Our young and enthusiastic team is passionate about blending aesthetics with functionality to deliver products that not only look great but also provide an exceptional user experience.</p>
          <p>At mo<span className='span-red'>o</span>nlike.space, we believe in the power of creativity and technology to transform ideas into reality. Our team of designers, developers, and strategists work collaboratively to bring your vision to life, ensuring that every project we undertake is executed with precision and creativity.</p>
        </div>

      </section>
      <section id='why-moonlike-space' className="content-section why-moonlike-space" ref={(el) => sectionsRef.current[1] = el}>
        <div className="ease-layer-overlay">
          <h3>Why Mo<span className='span-red'>o</span>nlike._?</h3>
          <h4><span className='span-red'>Young and Dynamic Team:</span></h4>
          <p>Our team is composed of passionate enthusiasts who bring fresh perspectives and innovative ideas to every project.</p>
          <h4><span className='span-red'>Tailored Solutions:</span></h4>
          <p> We take the time to understand your business and create customized solutions that fit your specific requirements.</p>
          <h4><span className='span-red'>Customer-Centric Approach:</span></h4>
          <p>Your satisfaction is our priority. We are dedicated to providing exceptional service and support throughout your project journey.</p>
        </div>

      </section>
      <section className="content-section get-what-you-want" ref={(el) => sectionsRef.current[2] = el}>
        <div className="ease-layer-overlay">
          <h3>Get What You Want</h3>
          <p>Our approach is centered around understanding your specific needs and delivering solutions that exceed your expectations. Here’s how we ensure you get exactly what you want:</p>
          <h4><span className='span-red'>Tailored Expertise:</span></h4>
          <p>We bring our specialized knowledge and skills to every project, ensuring that you receive a solution that is expertly crafted to meet your specific needs. Our team of young, dynamic professionals is committed to delivering top-notch results with precision and creativity.</p>
          <h4><span className='span-red'>Direct Communication:</span></h4>
          <p>We prioritize clear and direct communication to ensure that we understand your requirements perfectly. By cutting out unnecessary back-and-forth, we streamline the process and deliver your project efficiently and effectively.</p>
          <h4><span className='span-red'>Strong Execution:</span></h4>
          <p>With a focus on strong execution, we take pride in our ability to deliver high-quality work that speaks for itself. Our projects are completed with meticulous attention to detail, ensuring that you receive a product that not only meets but exceeds your expectations.</p>
          <h4><span className='span-red'>Trust and Reliability:</span></h4>
          <p>We understand the importance of trust in any business relationship. Our track record of successful projects and satisfied clients speaks volumes about our reliability and commitment. When you choose mo<span className='span-red'>o</span>nlike.space, you can be confident that your project is in capable hands.</p>
          <h4><span className='span-red'>Powerful Solutions:</span></h4>
          <p>Our team is dedicated to creating powerful digital solutions that drive results. Whether it’s a stunning website, an impactful social media campaign, or a comprehensive digital strategy, we harness our expertise to deliver outcomes that make a difference.</p>
          <h4><span className='span-red'>One-and-Done Excellence:</span></h4>
          <p>We believe in doing the job right the first time. Our one-and-done approach ensures that your project is completed to the highest standard, eliminating the need for constant revisions and adjustments. We get it right, so you can move forward with confidence.</p>
        </div>
      </section>
      <section className="content-section get-what-you-want" ref={(el) => sectionsRef.current[3] = el}>

      </section>
    </>
  )
}

export default Home
// src/screens/Home/Home.jsx
import React, { useState, useRef, useEffect } from 'react';
import Header from '../../components/Header/Header';
import ExploreMenu from '../../components/ExploreMenu/ExploreMenu';
import FoodDisplay from '../../components/FoodDisplay/FoodDisplay';
import './Home.css';

const Home = () => {
  const [category, setCategory] = useState('All');

  // Refs for scroll‑to and intersection observer
  const headerRef      = useRef(null);
  const exploreRef     = useRef(null);
  const foodDisplayRef = useRef(null);
  const footerRef      = useRef(null);

  // Simple IntersectionObserver to highlight nav links
  useEffect(() => {
    const sections = [
      { id: 'home',      ref: headerRef      },
      { id: 'explore',   ref: exploreRef     },
      { id: 'food-display', ref: foodDisplayRef },
      { id: 'footer',    ref: footerRef      },
    ];
    const navLinks = document.querySelectorAll('.navbar-menu a');

    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const visibleId = entry.target.id;
            navLinks.forEach(link => {
              link.classList.toggle(
                'active',
                link.getAttribute('href') === `/#${visibleId}` ||
                  (visibleId === 'home' && link.getAttribute('href') === '/')
              );
            });
          }
        });
      },
      { rootMargin: '-50% 0px -50% 0px' } // trigger when section is mid‑screen
    );

    sections.forEach(sec => {
      if (sec.ref.current) obs.observe(sec.ref.current);
    });
    return () => obs.disconnect();
  }, []);

  return (
    <div className="home">
      <section id="home" ref={headerRef}>
        <Header />
      </section>

      <section id="explore" ref={exploreRef}>
        <ExploreMenu category={category} setCategory={setCategory} />
      </section>

      <section id="food-display" ref={foodDisplayRef}>
        <FoodDisplay category={category} />
      </section>

      <section id="footer" ref={footerRef}>
        {/* Footer is rendered by App.jsx, but you can also wrap it here if desired */}
      </section>
    </div>
  );
};

export default Home;

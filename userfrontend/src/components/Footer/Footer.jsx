// src/components/Footer/Footer.jsx

import React from 'react';
import './Footer.css';
import { assets } from '../../assets/assets';

const socials = [
  {
    href: 'https://github.com/rakeesssh007',
    static: assets.github.static,
    gif:    assets.github.gif,
    alt:    'GitHub'
  },
  {
    href: 'https://www.linkedin.com/in/rakesh-chowdary-965663292',
    static: assets.linkedin.static,
    gif:    assets.linkedin.gif,
    alt:    'LinkedIn'
  },
  {
    href: 'https://discordapp.com/users/1171456118111862864',
    static: assets.discord.static,
    gif:    assets.discord.gif,
    alt:    'Discord'
  },
  {
    href: 'https://x.com/RakeshC007',
    static: assets.twitter.static,
    gif:    assets.twitter.gif,
    alt:    'Twitter'
  },
  {
    href: 'https://www.instagram.com/iamrakesh._007',
    static: assets.instagram.static,
    gif:    assets.instagram.gif,
    alt:    'Instagram'
  }
];

const Footer = () => (
  <footer className="footer" id="footer">
    <div className="container footer-content">
      <div className="footer-left">
        <img className="footer-logo" src={assets.logo_bottom} alt="Logo" />
      </div>

      <div className="footer-center">
        <h4>Let’s Connect</h4>
        <p>Check out the repo or shoot me an email!</p>
        <ul className="socials">
          {socials.map((s,i) => (
            <li key={i}>
              <a href={s.href} target="_blank" rel="noopener noreferrer">
                <img className="static" src={s.static} alt={s.alt} />
                <img className="gif"    src={s.gif}    alt={`${s.alt} GIF`} />
              </a>
            </li>
          ))}
        </ul>
      </div>

      <div className="footer-right">
        <h4>Contact</h4>
        <ul>
          <li><a href="tel:+919908576268">+91 99085 76268</a></li>
          <li><a href="mailto:rakeshchowdary.018@gmail.com">rakeshchowdary.018@gmail.com</a></li>
        </ul>
      </div>
    </div>

    <hr className="footer-hr" />
    <p className="footer-copy">© 2025 CraveOn. Built with fire by Rakesh.</p>
  </footer>
);

export default Footer;

import React, { useState, useEffect } from 'react';
import './Footer.css';

function Footer() {
  const [showFooter, setShowFooter] = useState(false);

  useEffect(() => {
    function handleScroll() {
      const contentHeight = document.body.scrollHeight;
      const scrollPosition = window.innerHeight + window.pageYOffset;
      if (scrollPosition >= contentHeight) {
        setShowFooter(true);
      } else {
        setShowFooter(false);
      }
    }

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className={`container-fluid p-2 d-flex justify-content-center align-items-center text-white footer ${showFooter ? 'show' : 'hide'}`}>
      <h4>TaskManager</h4> &nbsp;<p className='m-0'>&copy;TheDots</p>
    </div>
  );
}

export default Footer;

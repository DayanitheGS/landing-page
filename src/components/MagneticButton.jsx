import { useEffect, useRef } from 'react';

const MagneticButton = ({ href, onClick, type, disabled, className = '', children }) => {
  const particleFieldRef = useRef(null);

  useEffect(() => {
    const field = particleFieldRef.current;
    if (!field) return;

    for (let i = 0; i < 50; i++) {
      const particle = document.createElement('div');
      particle.className = 'magnetic-particle';
      particle.style.setProperty('--x', `${Math.random() * 200 - 100}px`);
      particle.style.setProperty('--y', `${Math.random() * 200 - 100}px`);
      particle.style.animation = `particleFloat ${1 + Math.random() * 2}s infinite`;
      particle.style.left = `${Math.random() * 100}%`;
      particle.style.top = `${Math.random() * 100}%`;
      field.appendChild(particle);
    }

    return () => {
      field.innerHTML = '';
    };
  }, []);

  const Tag = href ? 'a' : 'button';
  const tagProps = href ? { href } : { type: type || 'button', disabled };

  return (
    <Tag
      {...tagProps}
      onClick={onClick}
      className={`magnetic-btn ${className}`}
    >
      <span className="relative z-10 flex items-center justify-center gap-3">
        {children}
      </span>
      <div className="magnetic-particles-field" ref={particleFieldRef}></div>
    </Tag>
  );
};

export default MagneticButton;

import { useState, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';

interface PortalProps {
  selector?: string;
  children: React.ReactNode;
}

const Portal = ({ selector = '#modal', children }: PortalProps) => {
  const containerRef = useRef<Element | null>();
  const [mounted, setMounted] = useState<boolean>(false);

  useEffect(() => {
    containerRef.current = document.querySelector(selector);
    setMounted(true);
  }, [selector]);

  if (!containerRef.current) {
    return null;
  }

  return mounted ? ReactDOM.createPortal(children, containerRef.current) : null;
};

export default Portal;

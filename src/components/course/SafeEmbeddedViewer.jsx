import { useEffect, useRef } from 'react';
import { detachEmbeddedViewer, mountEmbeddedViewer } from '../../utils/safeEmbeddedViewer';

const SafeEmbeddedViewer = ({
  contentUrl,
  title,
  className = 'h-full w-full border-0',
  containerClassName = 'h-full w-full overflow-hidden',
}) => {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container || !contentUrl) return undefined;

    mountEmbeddedViewer(container, { contentUrl, title, className });

    return () => {
      detachEmbeddedViewer(container);
    };
  }, [className, contentUrl, title]);

  return <div ref={containerRef} className={containerClassName} />;
};

export default SafeEmbeddedViewer;

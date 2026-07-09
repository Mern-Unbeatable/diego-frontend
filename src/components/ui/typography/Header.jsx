import React from 'react';
import Heading from './Heading';
import Paragraph from './Paragraph';

const Header = ({
  title,
  subtitle,
  description,
  level = 1,
  titleClassName = '',
  subtitleClassName = 'text-sm text-gray-200 uppercase tracking-wider',
  descClassName = '',
  descVariant = 'body',
  containerClassName = '',
  ...props
}) => {
  return (
    <div className={containerClassName} {...props}>
      {title ? (
        <Heading level={level} className={titleClassName}>
          {title}
        </Heading>
      ) : null}

      {subtitle ? (
        <Paragraph variant="caption" className={subtitleClassName}>
          {subtitle}
        </Paragraph>
      ) : null}

      {description ? (
        <Paragraph variant={descVariant} className={descClassName}>
          {description}
        </Paragraph>
      ) : null}
    </div>
  );
};

export default Header;

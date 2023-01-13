interface Props extends React.HTMLAttributes<HTMLHeadingElement> {
  headingLevel: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
}

const Heading = ({ headingLevel, children, className }: Props) => {
  const Heading = headingLevel;
  return <Heading className={className}>{children}</Heading>;
};

export default Heading;

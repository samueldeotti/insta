export default function Title({ children, classname = '' }
: { children: React.ReactNode, classname?: string }) {
  return (
    <h3 className={ `${classname} text-center font-bold text-lg` }>{children}</h3>
  );
}

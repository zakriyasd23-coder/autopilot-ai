type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'outline';
};

export default function Button({
  variant = 'primary',
  className = '',
  ...props
}: Props) {
  const styles = variant === 'primary' ? 'btn-primary' : 'btn-outline';

  return <button {...props} className={`${styles} ${className}`} />;
}
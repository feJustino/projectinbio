import { cn } from '../../lib/utils';

export default function Button({
  children,
  variant = 'primary',
  ...props
}: {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'ghost';
} & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      {...props}
      className={cn(
        'p-3 text-white rounded-xl font-bold whitespace-nowrap hover:opacity-95 disabled:opacity-70 disabled:cursor-not-allowed',
        variant === 'primary' && 'bg-accent-purple',
        variant === 'secondary' && 'bg-background-secondary',
        variant === 'ghost' && 'bg-border-primary',
        props.className
      )}
    >
      {children}
    </button>
  );
}

Button.defaultProps = {
  children: 'Criar agora',
};

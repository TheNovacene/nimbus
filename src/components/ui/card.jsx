export function Card({ className = "", children, ...props }) {
  return <div className={`rounded-xl border border-slate-700 bg-slate-800/60 ${className}`} {...props}>{children}</div>;
}
export function CardContent({ className = "", children, ...props }) {
  return <div className={`p-4 ${className}`} {...props}>{children}</div>;
}

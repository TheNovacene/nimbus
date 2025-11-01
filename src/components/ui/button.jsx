export function Button({ variant = "default", size = "md", className = "", children, ...props }) {
  const base = "inline-flex items-center justify-center rounded-xl font-medium transition";
  const variants = {
    default: "bg-slate-100 text-slate-900 hover:bg-white",
    outline: "border border-slate-600 text-slate-100 hover:bg-slate-800/60",
  };
  const sizes = { sm: "px-3 py-1.5 text-sm", md: "px-4 py-2", lg: "px-5 py-2.5 text-lg" };
  return (
    <button className={`${base} ${variants[variant]} ${sizes[size]} ${className}`} {...props}>
      {children}
    </button>
  );
}

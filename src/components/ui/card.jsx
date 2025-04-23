export const Card = ({ children, className }) => (
  <div className={`shadow-lg border border-gray-300 rounded-2xl p-4 bg-white ${className}`}>
    {children}
  </div>
);

export const CardContent = ({ children }) => (
  <div className="p-4">
    {children}
  </div>
);
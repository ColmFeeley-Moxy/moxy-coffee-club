export const Button = ({ onClick, children }) => (
  <button onClick={onClick} className='px-4 py-2 bg-pink-700 text-white rounded-xl'>
    {children}
  </button>
);
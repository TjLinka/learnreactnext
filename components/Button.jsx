export default function Button({ children, classnName = "", onClick }) {
  return (
    <button onClick={onClick} className={`${classnName} bg-(--orange) px-3.5 py-4 rounded-xl text-lg cursor-pointer`}>
      {children}
    </button>
  );
}

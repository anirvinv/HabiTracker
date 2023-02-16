export default function Modal({ children }) {
  return (
    <div className="top-0 left-0 fixed h-screen w-screen bg-slate-500/50 flex justify-center items-center">
      {children}
    </div>
  );
}

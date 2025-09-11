// AVANT (pointait vers le mock)
// import './Button.mock.scss';
// const Button = ({ label, onClick, variant = 'primary', disabled, loading, className }) => {
//   return (
//     <button onClick={onClick} disabled={disabled || loading} className={`btn btn-${variant} ${className}`}>
//       {loading ? 'Chargement...' : label}
//     </button>
//   );
// };
// export default Button;

// APRÈS (pointe vers le vrai composant)
export { default } from './Button';
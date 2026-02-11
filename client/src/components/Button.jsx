
function Button({
  children,
  onClick,
  variant = 'primary',
  width = 'auto',
  type = 'button'
}){
  return (
    <button
      type={type}
      onClick={onClick}
      className={`btn btn-${variant} w-${width}`}
    >
      {children}
    </button>
  );
}

export default Button;
function Button({ className, type, children, onClick }) {
  return (
      <button
          className={className}
          type={type || "button"}
          onClick={onClick}
      >{children}</button>
  )
}

export default Button;

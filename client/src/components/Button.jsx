const Button = ({
  children,
  variant = "primary",
  className = "",
  ...props
}) => {
  const classes = `btn btn-${variant} ${className}`.trim();

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
};

export default Button;

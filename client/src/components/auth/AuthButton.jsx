const AuthButton = ({ children }) => {
  return (
    <button type="submit" className="auth-btn">
      {children}
    </button>
  );
};

export default AuthButton;

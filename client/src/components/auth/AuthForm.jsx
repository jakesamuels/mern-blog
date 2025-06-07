const AuthForm = ({ onSubmit, children }) => {
  return (
    <form className="auth-form" onSubmit={onSubmit}>
      {children}
    </form>
  );
};

export default AuthForm;

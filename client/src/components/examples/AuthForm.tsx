import AuthForm from '../AuthForm';

export default function AuthFormExample() {
  return (
    <AuthForm
      onLogin={(email, password, userType) => console.log('Login:', email, userType)}
      onSignup={(data, userType) => console.log('Signup:', data, userType)}
      onForgotPassword={(email) => console.log('Forgot password:', email)}
    />
  );
}

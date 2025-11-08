import AdminLogin from '../AdminLogin';

export default function AdminLoginExample() {
  return (
    <AdminLogin
      onLogin={(username, password, code) => 
        console.log('Admin login:', { username, password, code })
      }
    />
  );
}

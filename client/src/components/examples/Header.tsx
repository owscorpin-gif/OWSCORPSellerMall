import Header from '../Header';

export default function HeaderExample() {
  return (
    <Header 
      cartItemCount={3}
      isLoggedIn={false}
      onCartClick={() => console.log('Cart clicked')}
      onLoginClick={() => console.log('Login clicked')}
      onMenuClick={() => console.log('Menu clicked')}
    />
  );
}

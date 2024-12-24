import { useAuthContext } from '@/components/auth/AuthProvider';

export const Header = () => {
  const { isAuthenticated, user, signOut } = useAuthContext();
  
  console.log('Header auth state:', { isAuthenticated, user });

  return (
    <header>
      {isAuthenticated ? (
        <div>
          <span>Welcome, {user?.email}</span>
          <button onClick={signOut}>Sign Out</button>
        </div>
      ) : (
        <div>
          <button>Sign In</button>
        </div>
      )}
    </header>
  );
};
'use client'
import { useEffect } from 'react';
import { useCookies } from 'next-client-cookies';
import { toast } from 'sonner'; // Assuming you are using react-toastify

const CookieChecker = () => {
  const cookies = useCookies();

  useEffect(() => {
    const checkAndDeleteCookie = () => {
      try {
        // Check if the 'theme' cookie exists
        if (cookies.get('loggedin')) {
          // Show success message
          toast.success('Login successful');

          // Delete the cookie
          cookies.remove('loggedin')
        }
      } catch (error) {
        console.error('Error checking or deleting cookies:', error);
      }
    };

    checkAndDeleteCookie();
  }, [cookies]);

  return null; // This component doesn't render anything
};

export default CookieChecker;
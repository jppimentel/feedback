import { useEffect, useState } from 'react';
import { defaultApi } from "../services/defaultApi";

export function useAuthentication() {
  const [authenticated, setAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isTokenValid, setIsTokenValid] = useState(false);
  const [tokenIssuedAt, setTokenIssuedAt] = useState<Date | null>(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const isTokenValidInLocalStorage = localStorage.getItem('isTokenValid');
    const tokenIssuedAtInLocalStorage = localStorage.getItem('tokenIssuedAt');

    if (token && isTokenValidInLocalStorage === 'true' && tokenIssuedAtInLocalStorage) {
      setAuthenticated(true);
      setIsTokenValid(true);
      setTokenIssuedAt(new Date(tokenIssuedAtInLocalStorage));
      setIsLoading(false);
    } else {
      if (token) {
        defaultApi
          .get("/me", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          .then((data) => {
            if (data.data && data.data.id) {
              setAuthenticated(true);
              setIsTokenValid(true);
              setTokenIssuedAt(new Date());
              localStorage.setItem('tokenIssuedAt', new Date().toISOString());
              localStorage.setItem('isTokenValid', 'true');
              localStorage.setItem('userId', data.data.id);
            } else {
              setAuthenticated(false);
              setIsTokenValid(false);
              localStorage.setItem('isTokenValid', 'false');
            }
            setIsLoading(false);
          })
          .catch((err) => {
            console.log("error: " + JSON.stringify(err));
            setAuthenticated(false);
            setIsTokenValid(false);
            localStorage.setItem('isTokenValid', 'false');
            setIsLoading(false);
          });
      } else {
        setAuthenticated(false);
        setIsTokenValid(false);
        localStorage.setItem('isTokenValid', 'false');
        setIsLoading(false);
      }
    }
  }, []);

  useEffect(() => {
    if (tokenIssuedAt) {
      const oneDayInMillis = 24 * 60 * 60 * 1000;
      const currentTime = new Date().getTime();
      const tokenExpirationTime = tokenIssuedAt.getTime() + oneDayInMillis;

      if (currentTime > tokenExpirationTime) {
        setAuthenticated(false);
        setIsTokenValid(false);
        localStorage.setItem('isTokenValid', 'false');
      }
    }
  }, [tokenIssuedAt]);

  function logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('isTokenValid');
    localStorage.removeItem('tokenIssuedAt');
    setAuthenticated(false);
    setIsTokenValid(false);
    setTokenIssuedAt(null);
  }

  return { authenticated, isLoading, logout };
}

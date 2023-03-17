import React, {useState} from 'react';
import Cookies from 'js-cookie';
import jwt_decode from 'jwt-decode';

const useCookie = cookieName => {
  const [cookie, setCookie] = useState(Cookies.get(cookieName));

  const setCookies = val => setCookie(Cookies.set(cookieName, val));

  const getId = () => {
    try {
      const decoded = jwt_decode(cookie);
      return decoded.id;
    } catch (error) {
      return null;
    }
  };

  const hasExpires = () => {
    try {
      const decoded = jwt_decode(cookie);
      return Date.now() >= decoded.exp * 1000;
    } catch (error) {
      return true; // the cookie has expired
    }
  };

  const clearCookie = () => {
    Cookies.remove(cookieName);
    setCookie(null);
  };

  const getCookie = (cookieName = 'jwt') => Cookies.get(cookieName);

  const helper = {
    hasExpires,
    getId,
    getCookie,
    setCookies,
    clearCookie,
  };

  return [cookie, helper];
};

export default useCookie;

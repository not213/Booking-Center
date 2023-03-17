import React, {useEffect, useState} from 'react';
import {reqGetProfile} from '../http';

const useProfile = userId => {
  const [profile, setProfile] = useState(localStorage.getItem('profile') || null);

  useEffect(() => {
    if (!profile && userId) {
      getProfile();
    }
  }, []);

  const getProfile = async () => {
    try {
      const {data: resData} = await reqGetProfile(userId);

      setProfile(resData.data);
    } catch (error) {}
  };

  return profile;
};

export default useProfile;

import { useGeneralStore } from '@app/stores/generalStore';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../supabase/index';

export default function ResetPassword() {
  const [password, setPassword] = useState(null);

  const [hash, setHash] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    setHash(window.location.hash);
    const hashArr = window.location.hash
      .substring(1)
      .split('&')
      .map((param) => param.split('='));

    let type;
    let accessToken;
    for (const [key, value] of hashArr) {
      if (key === 'type') {
        type = value;
        if (type === 'magiclink') {
          navigate(`/dashboard`);
        }
      } else if (key === 'access_token') {
        accessToken = value;
      } else {
        navigate(`/dashboard`);
      }
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // if the user doesn't have accesstoken
      if (!hash) {
        return;
      } else if (hash) {
        const hashArr = hash
          .substring(1)
          .split('&')
          .map((param) => param.split('='));

        let type;
        let accessToken;
        for (const [key, value] of hashArr) {
          if (key === 'type') {
            type = value;
          } else if (key === 'access_token') {
            accessToken = value;
          }
        }

        if (type !== 'recovery' || !accessToken || typeof accessToken === 'object') {
          return;
        }

        //   now we will change the password
        const { error } = await supabase.auth.updateUser({
          password,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <form onSubmit={(e) => handleSubmit(e)}>
        <input
          type="password"
          required
          value={password}
          placeholder="Please enter your Password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

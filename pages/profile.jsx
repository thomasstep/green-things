import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

function Profile() {
  const [id, setId] = useState('');
  const [email, setEmail] = useState('');
  const router = useRouter();

//  useEffect(() => {
//    fetcher(getUser)
//      .then(({
//        viewer: {
//          id: viewerId,
//          email: viewerEmail,
//        },
//      }) => {
//        if (!viewerEmail) router.push('/signin');
//
//        setId(viewerId);
//        setEmail(viewerEmail);
//      })
//      .catch(() => {
//        router.push('/signin');
//      });
//  }, []);

  return (
    <p>this is a work in progress</p>
  );
}

export default Profile;

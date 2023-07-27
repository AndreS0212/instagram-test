import { useState } from 'react';
import axios from 'axios';
import { useMutation } from '@tanstack/react-query';
import Search from './components/Search';
import UserProfile from './components/UserProfile';
import Gallery from './components/Gallery';
import { UserData, Data } from './types';

const InstagramAuth = () => {
  const [searchValue, setSearchValue] = useState('');
  const [userData, setUserData] = useState<UserData>({
    name: '',
    biography: '',
    followers: 0,
    img_profile_url: '',
    profile_url: '',
    username: '',
    gallery: []
  });




  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  }

  const { mutate } = useMutation<Data, Error>(
    ['instagram', searchValue],
    async () => {
      const { data } = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/instagram`, { username: searchValue },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${import.meta.env.VITE_BACKEND_TOKEN}`
          }
        });
      return data;
    },
    {
      onSuccess: (data) => {
        setUserData({
          ...data.userData,
          gallery: data.media
        });
      },
      onError: (error) => {
        console.log(error);
      },
    }
  )

  const handleOnKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      mutate();
    }
  }


  return (
    <div className={`max-w-[390px] ${userData.name ? 'h-[390px]' : ''} flex flex-col max-h-[390px] mx-auto my-12 p-4 justify-center shadow-2xl rounded-3xl bg-white`}>
      {!userData.name && <Search value={searchValue} onChange={handleSearchChange} onKeyDown={handleOnKeyDown} />}
      {userData.name && (
        <div>
          <UserProfile userData={userData} />
          <Gallery galleryData={userData?.gallery} />
        </div>
      )}
    </div>
  )
}

export default InstagramAuth;
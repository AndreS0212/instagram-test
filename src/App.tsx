import { useState } from 'react';
import axios from 'axios';
import { Query, useQuery } from '@tanstack/react-query';

export interface Data {
  userData: UserData
  media: Media[]
}
export interface UserData {
  name: string
  biography: string
  followers: number
  img_profile_url: string
  username: string
  profile_url: string
}

export interface Media {
  display_url: string
  caption: string
  is_video?: boolean
  mediaId: string
  imgUrl: string
}

const InstagramAuth = () => {
  const [searchValue, setSearchValue] = useState('');
  const [userData, setUserData] = useState<UserData>({
    name: '',
    biography: '',
    followers: 0,
    img_profile_url: '',
    profile_url: '',
    username: '',

  });
  const [galleryData, setGalleryData] = useState<Media[]>(
    []
  )



  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  }

  const { refetch } = useQuery<Data, Error>(
    ['instagram', searchValue],
    async () => {
      const { data } = await axios.post(`https://q6xp8fus12.execute-api.us-east-2.amazonaws.com/scrapingPy`, { username: searchValue },
        { headers: { 'Content-Type': 'application/json' } });
      return data;
    },
    {
      onSuccess: (data) => {
        setUserData(data.userData);
        setGalleryData(data.media);
      },
      onError: (error) => {
        console.log(error);
      },
      staleTime: 1000 * 60 * 60 * 24 * 7,
      enabled: false,
    }
  )

  const handleOnKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      refetch();
    }
  }
  //390x390
  function formatNumber(number: number): string {
    if (number >= 1000000) {
      // Formato en millones
      return (number / 1000000).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + "M";
    } else if (number >= 1000) {
      // Formato en miles
      return (number / 1000).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + "K";
    } else {
      // Número sin formato
      return number.toString();
    }
  }

  return (
    <div className={`max-w-[390px] ${userData.name ? 'h-[390px]' : ''} flex flex-col max-h-[390px] mx-auto my-12 p-4 justify-center shadow-2xl rounded-3xl bg-white`}>
      {!userData.name && <div className="flex flex-row">
        <img src='/src/assets/instagram-logo.svg ' alt="Instagram Icon" className="h-[30px] mb-1" />
        <input className=" flex mx-3 max-w-[85%] w-[85%] outline-none" type="text" placeholder="@usuario or www.instagram.com/usuario" onKeyDown={handleOnKeyDown} onChange={handleSearchChange} value={searchValue} />
      </div>}
      {userData.name && <div>
        <div className="text-center">
          <div className="flex flex-row justify-around items-center mb-1">
            <a href={userData.profile_url} target="_blank" rel="noopener noreferrer">
              <div className="flex flex-col">
                <p className="mb-1 text-lg ">{userData.name}</p>
                <p className="mb-2 text-md">{'Followers: ' + formatNumber(userData.followers)}</p>
              </div>
            </a>
            <a href={userData.profile_url} target="_blank" rel="noopener noreferrer">
              <img src={userData.img_profile_url} alt="Cristiano Ronaldo" className="h-[90px] w-fit rounded-md" />
            </a>
          </div>
          {userData.biography && <div className="h-[40px] flex items-center justify-center">
            <p className="text-sm line-clamp-2 ">{userData.biography}</p>
          </div>}
        </div>
        <div className={`${galleryData.length == 1 ? 'mt-8' : 'mt-[10px]'} flex flex-wrap justify-around`}>
          {galleryData && galleryData.slice(0, 6).map((item: Media) => (
            <div className={`mb-2 ${galleryData.slice(0, 6).length === 2 ? '' : galleryData.slice(0, 6).length === 1 ? 'h-[180px]' : 'w-[29%]'}`} key={item.display_url}>
              <a href={item.imgUrl} target="_blank" rel="noopener noreferrer">
                <img src={item.display_url} alt={item.caption} className="w-full h-full rounded-md border border-gray-300" />
              </a>
            </div>
          ))}
        </div>


      </div>}
    </div>
  )
}

export default InstagramAuth;
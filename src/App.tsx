import { useEffect, useState } from 'react';
import axios from 'axios';
import { format } from 'date-fns';
export interface Data {
  userData: UserData
  media: Media[]
}
export interface UserData {
  name: string
  biography: string
  followers: number
  profile_pic_url: string
}

export interface Media {
  display_url: string
  caption: string
  is_video?: boolean
}

const InstagramAuth = () => {
  const [searchValue, setSearchValue] = useState('');
  const [userData, setUserData] = useState<UserData>({
    name: '',
    biography: '',
    followers: 0,
    profile_pic_url: ''
  });
  const [galleryData, setGalleryData] = useState<Media[]>(
    []
  )

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  }
  const handleGetInfo = async (searchValue: string) => {
    const response = await axios.post('http://localhost:3000/instagram/', {
      username: searchValue,
    }
    );
    setUserData(response.data.userData);
    setGalleryData(response.data.media);
    console.log(response.data)
  }

  //390x390


  return (
    <div className="container mx-auto px-4 py-8" >
      <h1 className="text-2xl font-bold mb-4">Instagram Info</h1>
      <div className='flex flex-col justify-center'>
        <input className='mb-2' type="text" onChange={handleSearchChange} value={searchValue} placeholder='Ingrese link o usuario de instagram' />
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded"
          onClick={() => handleGetInfo(searchValue)}
        >
          Get User Data
        </button>
      </div>

      <div className="mt-4">
        {userData && (
          <div>
            <p className="mb-2 text-xl">
              Name: {userData.name}
            </p>
            <p className="mb-2 text-xl">
              Biography: {userData.biography}
            </p>
            <p className="mb-2 text-xl">
              Followers: {userData.followers}
            </p>
            <img src={userData.profile_pic_url} alt={userData.name} className="max-w-sm" />
          </div>
        )}
      </div>
      <img src="https://z-p42-instagram.flim4-3.fna.fbcdn.net/v/t51.2885-15/359524075_2919230984879522_260347177607472215_n.jpg?stp=dst-jpg_e35_s640x640_sh0.08&_nc_ad=z-m&_nc_ht=z-p42-instagram.flim4-3.fna.fbcdn.net&_nc_cat=102&_nc_ohc=BX41cUJsnWUAX8UVPyG&edm=AOQ1c0wBAAAA&ccb=7-5&oh=00_AfBFaLd1IznkTSySQ0g21laPVX67_bqeCY2IVUYYeWd-PA&oe=64B450AA&_nc_sid=8b3546" alt="Image">
      </img>
      <div className="mt-4 flex flex-row">
        {galleryData && galleryData.map((item: Media) => (
          <div className="flex flex-col justify-center items-center mx-2">
            <img src={item.display_url} alt={item.caption} className="max-w-sm" />
            <p className="mb-2 text-xl">
              {item.caption}
            </p>
          </div>
        ))}
      </div>
    </div >
  );
};

export default InstagramAuth;
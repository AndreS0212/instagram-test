import { UserData } from "../types";
import instagramIcon from "../assets/instagram-logo.svg";
import { formatNumber } from "../utils";
interface Props {
    userData: UserData
}

const UserProfile = ({ userData }: Props) => {
    return (
        <div className="text-center">
            <div className="flex flex-row justify-around items-center mb-1">
                <a href={userData.profile_url} target="_blank" rel="noopener noreferrer">
                    <div className="flex flex-col items-center">
                        <img src={instagramIcon} alt="instagram icon" className="h-[35x] w-[35px] mb-1" />
                        <p className="text-lg ">{userData.name}</p>
                        <p className="text-sm">{'Followers: ' + formatNumber(userData.followers)}</p>
                    </div>
                </a>
                <a href={userData.profile_url} target="_blank" rel="noopener noreferrer">
                    <img src={userData.img_profile_url} alt={userData.name} className="h-[90px] w-fit rounded-md" />
                </a>
            </div>
            {userData.biography && (
                <div className="h-[40px] flex items-center justify-center">
                    <p className="text-sm line-clamp-2 ">{userData.biography}</p>
                </div>
            )}
        </div>
    );
};

export default UserProfile;
import { UserData } from "../types";
import { formatNumber } from "../utils";
interface Props {
    userData: UserData
}

const UserProfile = ({ userData }: Props) => {
    return (
        <div className="text-center">
            <div className="flex flex-row justify-around items-center mb-1">
                <a href={userData.profile_url} target="_blank" rel="noopener noreferrer">
                    <div className="flex flex-col">
                        <p className="mb-1 text-lg ">{userData.name}</p>
                        <p className="mb-2 text-md">{'Followers: ' + formatNumber(userData.followers)}</p>
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
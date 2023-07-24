export interface Data {
  userData: UserData;
  media: Media[];
}
export interface UserData {
  name: string;
  biography: string;
  followers: number;
  img_profile_url: string;
  username: string;
  profile_url: string;
  gallery: Media[];
}

export interface Media {
  display_url: string;
  caption: string;
  is_video?: boolean;
  mediaId: string;
  imgUrl: string;
}

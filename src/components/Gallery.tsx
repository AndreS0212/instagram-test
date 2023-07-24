import { Media } from '../types';

interface Props {
    galleryData: Media[]
}

const GalleryImages = ({ galleryData }: Props) => {
    return (
        <div className={`${galleryData?.length === 1 ? 'mt-8' : 'mt-[10px]'} flex flex-wrap justify-around`}>
            {galleryData?.map((item: Media) => (
                <div className={`mb-2 ${galleryData?.length === 2 ? '' : galleryData?.length === 1 ? 'h-[180px]' : 'w-[29%]'}`} key={item.display_url}>
                    <a href={item.imgUrl} target="_blank" rel="noopener noreferrer">
                        <img src={item.display_url} alt={item.caption} className="w-full h-full rounded-md border border-gray-300" />
                    </a>
                </div>
            ))}
        </div>
    );
};

export default GalleryImages;
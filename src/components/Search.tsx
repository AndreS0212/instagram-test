interface Props {
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
}

const Search = ({ value, onChange, onKeyDown }: Props) => {
    return (
        <div className="flex flex-row">
            <img src='/src/assets/instagram-logo.svg' alt="Instagram Icon" className="h-[30px] mb-1" />
            <input className="flex mx-3 max-w-[85%] w-[85%] outline-none" type="text" placeholder="@usuario or www.instagram.com/usuario" onKeyDown={onKeyDown} onChange={onChange} value={value} />
        </div>
    );
};

export default Search;
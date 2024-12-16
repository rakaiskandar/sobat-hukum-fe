import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

const HeaderProfile = ({ img }: { img?: string }) => {  
  return (
    <Avatar className="border-2 border-gray-300 hover:scale-105 transition-all ease-out duration-100 cursor-pointer">
      <AvatarImage src={img} alt="profile" />
      <AvatarFallback>PR</AvatarFallback>
    </Avatar>
  );
};

export default HeaderProfile;

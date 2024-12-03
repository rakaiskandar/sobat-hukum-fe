import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import Link from "next/link";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { usePathname } from "next/navigation";

const HeaderProfile = ({ img }: { img?: string }) => {
  const pathname = usePathname();
  const basePath = pathname?.split("/").slice(1, 3).join("/");
  
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Avatar className="border-2 border-gray-300 hover:scale-105 transition-all ease-out duration-100 cursor-pointer">
          <AvatarImage src={img} alt="profile" />
          <AvatarFallback>PR</AvatarFallback>
        </Avatar>
      </PopoverTrigger>
      <PopoverContent className="w-40 mr-5">
        <div className="grid gap-4">
          <Link href={`/${basePath}/profile`} className="hover:text-primary space-y-2">
            Profil
          </Link>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default HeaderProfile;

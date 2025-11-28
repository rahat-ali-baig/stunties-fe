import Image from "next/image";
import { logo } from "../../../public";

type LogoProps = {
  size?: 'small' | 'medium' | 'large';
}

const Logo = ({ size = 'large' }: LogoProps) => {
  return (
    <div className={`relative ${size === 'large' ? 'w-60 h-24' : size === 'medium' ? 'w-48 h-16' : 'w-40 h-14'}  `}>
      <Image
        src={logo}
        alt="logo"
        fill
        className="object-contain"
        priority
      />
    </div>
  );
};

export default Logo;

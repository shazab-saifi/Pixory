import Image from "next/image";
import pixory from "@/public/pixory.svg";

const Footer = () => {
  return (
    <div className='w-full bg-gray-50 px-20 py-12'>
      <div>
        <div>
          <Image
            src={pixory}
            alt="Logo"
            className="" 
          />
        </div>
        <div>

        </div>
      </div>
      <div>@ 2025 Pixory</div>
    </div>
  );
}

export default Footer
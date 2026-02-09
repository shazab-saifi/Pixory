import Image from "next/image";

const AboutSection = () => {
  return (
    <div className="relative hidden h-[96.25vh] w-[46%] items-center justify-center overflow-hidden rounded-xl rounded-b-2xl lg:flex">
      {[...Array(3)].map((_, index) => (
        <div
          key={index}
          className="mask-to-t absolute bottom-0 left-0 z-10 h-[40%] w-full backdrop-blur-md"
        />
      ))}
      <Image
        src="https://images.pexels.com/photos/18390118/pexels-photo-18390118.jpeg?_gl=1*wh685k*_ga*MTkzNzIyNDczOS4xNzY0MDY1MTA1*_ga_8JE65Q40S6*czE3NjkyNjI3NzMkbzYkZzEkdDE3NjkyNjY4NzQkajU5JGwwJGgw"
        alt="sign in/signup page background image"
        fill
        priority
        className="absolute inset-0 top-0 right-0 z-0 object-cover"
        quality={100}
      />
    </div>
  );
};

export default AboutSection;

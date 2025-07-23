import ContentSection from "./ContentSection";
import GoogleOneTap from "./GoogleOneTap";
import Header from "./Header";
import NavbarScroll from "./NavbarScroll";

const Landing = () => {
  return (
    <div>
      <GoogleOneTap />
      <Header />
      <NavbarScroll />
      <ContentSection />
    </div>
  );
};

export default Landing;

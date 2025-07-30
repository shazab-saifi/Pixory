import Landing from "@/components/Landing";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pixory",
  description:
    "Discover and download stunning free photos and videos on Pixory, your creative resource for high-quality, royalty-free images. Like Pexels, but with a fresh twist for creators and brands.",
  openGraph: {
    images: ["/ogImage.png"],
  },
};

export default function Home() {
  return (
    <div>
      <Landing />
    </div>
  );
}

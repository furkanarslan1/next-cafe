import Image from "next/image";

export default function AboutStory() {
  return (
    <div className=" bg-stone-300 p-4 ">
      <div className="flex flex-col md:flex-row gap-6 max-w-7xl mx-auto p-6">
        <div className="relative h-80 w-full order-1 md:order-2 ">
          <Image
            src="/cafe-gallery/g-6.webp"
            alt="about-description-image"
            fill
            className="object-cover z-10 rounded-2xl shadow-2xl rotate-2"
          />
          <div className="absolute left-5 md:left-10 h-full w-full bg-stone-500 -rotate-2 "></div>
        </div>
        <div className="text-stone-800 space-y-6 order-2 md:order-1">
          <h1 className="text-2xl font-bold">Our Story</h1>
          <p>
            Every great café starts with a simple idea: creating a place where
            people feel at home. What began as a small passion for good coffee
            has grown into a space where quality, comfort, and community come
            together—one cup at a time.
          </p>
        </div>
      </div>
    </div>
  );
}

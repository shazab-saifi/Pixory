import FAQ from "@/components/GetPixory+/FAQ"
import Pricing from "@/components/GetPixory+/Pricing"
import Navbar2 from "@/components/Navbar/Navbar2"

const page = () => {
  return (
    <div className='w-full h-full py-25 xl:py-40 space-y-10'>
      <Navbar2 />
      <div className="w-full flex flex-col items-center font-semibold lg:gap-2 xl:gap-4 xl:mb-30">
        <h1 className="text-2xl lg:text-3xl xl:text-5xl">Get Pixory+</h1>
        <h2 className="text-sm lg:text-lg xl:text-2xl">Choose the best plan for you</h2>
      </div>
      <Pricing />
      <FAQ />
    </div>
  )
}

export default page
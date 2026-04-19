import Hero from "@/components/ux/studentHero"
import CourseCard from "@/components/ux/CourseCard"

export default function Home() {
  return (
    <>
      <Hero />

      <div className="max-w-7xl mx-auto py-10 px-4">
        <h2 className="text-2xl font-bold mb-6">Our Courses</h2>

        <div className="flex flex-wrap -mx-4">
          <div className="w-full md:w-1/3 px-4 mb-6">
            <CourseCard
              title="Web Development"
              image="/images/1.jpg"
            />
          </div>

          <div className="w-full md:w-1/3 px-4 mb-6">
            <CourseCard
              title="Graphic Design"
              image="/images/2.jpg"
            />
          </div>

          <div className="w-full md:w-1/3 px-4 mb-6">
            <CourseCard
              title="Digital Marketing"
              image="/images/3.jpg"
            />
          </div>
        </div>
      </div>
    </>
  )
}
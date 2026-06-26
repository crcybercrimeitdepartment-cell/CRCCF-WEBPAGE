import { useParams } from 'react-router-dom'

export default function CategoryPage() {
  const { id } = useParams()

  const categoryNames = [
    "Our Student",
    "Media & Press Coverage",
    "Event",
    "Team Moments",
    "Certificates",
    "Client Work",
    "Training Programs",
    "Cyber Awareness Campaigns",
    "Product Launches",
    "Investigation Cases",
    "Research & Development",
    "Internship Activity",
    "UI & UX Designs",
    "Seminar Session",
    "Course"
  ]

  const title = categoryNames[id] || "Gallery"
  const heroImage = "https://images.unsplash.com/photo-1522202176988-66273c2fd55f"

  const sections = [
    {
      image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c",
      title: "Learning Environment",
      desc: "Students collaborating in a modern classroom with advanced tools and resources.",
    },
    {
      image: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d",
      title: "Group Activities",
      desc: "Teamwork and communication through engaging group activities.",
    },
    {
      image: "https://images.unsplash.com/photo-1509062522246-3755977927d7",
      title: "Presentations",
      desc: "Students presenting ideas and improving confidence through discussions.",
    },
  ]

  return (
    <div className="bg-[#F8FAFC] min-h-screen">
      <div className="p-[40px_24px]">
        {/* TOP SECTION */}
        <div className="max-w-[1400px] mx-auto mb-[40px] grid grid-cols-2 gap-[32px] items-center max-[768px]:grid-cols-1">
          <div className="bg-[#fff] rounded-[16px] shadow-[0_4px_6px_-1px_rgba(0,0,0,0.1)] p-[40px]">
            <h1 className="text-[clamp(30px,4vw,40px)] font-[800] text-[#0F172A] m-0">{title}</h1>
            <div className="w-[48px] h-[4px] bg-[#2563EB] rounded-[2px] mt-[12px]" />
            <p className="text-[#64748B] mt-[24px] leading-[1.6]">
              Empowering students, inspiring excellence,
              <br className="hidden sm:block" />
              building a brighter future.
            </p>
          </div>

          <div>
            <img loading="lazy" decoding="async"
              src={heroImage}
              alt="hero"
              className="w-full h-[260px] object-cover rounded-[16px] shadow-[0_4px_6px_-1px_rgba(0,0,0,0.1)]"
            />
          </div>
        </div>

        {/* CONTENT SECTIONS */}
        <div className="max-w-[1400px] mx-auto flex flex-col gap-[32px]">
          {sections.map((item, index) => (
            <div key={index} className="grid grid-cols-2 gap-[24px] items-center max-[768px]:grid-cols-1">
              <div>
                <img loading="lazy" decoding="async"
                  src={item.image}
                  alt={item.title}
                  className="w-full h-[200px] object-cover rounded-[16px] shadow-[0_4px_6px_-1px_rgba(0,0,0,0.1)]"
                />
              </div>

              <div className="bg-[#fff] rounded-[16px] shadow-[0_4px_6px_-1px_rgba(0,0,0,0.1)] p-[32px] border-l-[4px] border-solid border-[#2563EB] h-[200px] flex flex-col justify-center max-[768px]:h-auto">
                <div className="w-[40px] h-[40px] bg-[#DBEAFE] text-[#2563EB] font-[700] rounded-[8px] flex items-center justify-center mb-[12px]">
                  {String(index + 1).padStart(2, "0")}
                </div>
                <h2 className="text-[18px] font-[700] text-[#0F172A] m-0">{item.title}</h2>
                <p className="text-[#64748B] text-[14px] mt-[8px] m-0">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}


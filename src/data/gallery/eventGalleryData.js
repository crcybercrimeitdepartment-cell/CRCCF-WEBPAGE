const PREMIUM_IMAGES = [
  "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80&w=1200",
  "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&q=80&w=1200",
  "https://images.unsplash.com/photo-1515169067868-5387ec356754?auto=format&fit=crop&q=80&w=1200",
  "https://images.unsplash.com/photo-1475721028070-2051152a4db6?auto=format&fit=crop&q=80&w=1200",
  "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=1200",
  "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=1200",
  "https://images.unsplash.com/photo-1556761175-4b46a572b786?auto=format&fit=crop&q=80&w=1200",
  "https://images.unsplash.com/photo-1573164713988-8665fc963095?auto=format&fit=crop&q=80&w=1200",
  "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&q=80&w=1200",
  "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=1200",
  "https://images.unsplash.com/photo-1516321497487-e288fb19713f?auto=format&fit=crop&q=80&w=1200",
  "https://images.unsplash.com/photo-1497032205947-10ce614a8ce0?auto=format&fit=crop&q=80&w=1200",
  "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=1200",
  "https://images.unsplash.com/photo-1588196749597-9b597e3a0f18?auto=format&fit=crop&q=80&w=1200",
  "https://images.unsplash.com/photo-1557804506-6640953d5085?auto=format&fit=crop&q=80&w=1200"
];

const CAPTIONS = [
  "Opening Ceremony Highlights",
  "Keynote Speaker Address",
  "Interactive Workshop Session",
  "Panel Discussion",
  "Team Building Activity",
  "Certificate Distribution",
  "Networking Break",
  "Closing Remarks",
  "Group Photo Session",
  "Technology Showcase",
  "Cyber Security Demo",
  "Q&A Session",
  "Award Ceremony",
  "Live Hackathon Preview",
  "Community Engagement"
];

function generatePhotos(count, startIndex) {
  return Array.from({ length: count }).map((_, i) => {
    const imgIndex = (startIndex + i) % PREMIUM_IMAGES.length;
    const captionIndex = (startIndex + i) % CAPTIONS.length;
    return {
      id: `photo-${imgIndex}-${i}`,
      url: PREMIUM_IMAGES[imgIndex],
      caption: CAPTIONS[captionIndex]
    };
  });
}

export const eventGalleryData = [
  {
    id: "evt-01",
    date: "12 June 2026",
    title: "Global Cyber Security Summit",
    category: "Conferences",
    description: "An international summit gathering top cyber experts to discuss the future of digital security and emerging threats.",
    photos: generatePhotos(15, 0)
  },
  {
    id: "evt-02",
    date: "28 May 2026",
    title: "Cyber Awareness Campaign",
    category: "Education Section",
    description: "This event focused on spreading cyber awareness and digital safety among students and young professionals.",
    photos: generatePhotos(14, 5)
  },
  {
    id: "evt-03",
    date: "15 April 2026",
    title: "Youth Tech Internship Drive",
    category: "Workshops",
    description: "A hands-on workshop series aimed at equipping the youth with practical skills in ethical hacking and networking.",
    photos: generatePhotos(16, 10)
  },
  {
    id: "evt-04",
    date: "02 March 2026",
    title: "Annual Excellence Awards",
    category: "Ceremony",
    description: "Celebrating the incredible achievements of our team members and volunteers who made the digital world a safer place this year.",
    photos: generatePhotos(12, 3)
  }
];

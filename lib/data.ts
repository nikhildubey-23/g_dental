export const clinicInfo = {
  name: "Gouraha Dant Chikitsalaya",
  fullName: "Gouraha Dant Chikitsalaya (Dr. Abhishek Gouraha Dental Clinic)",
  doctor: {
    name: "Dr. Abhishek Gouraha",
    degree: "BDS, MDS",
    experience: "15+",
    specialization: "Cosmetic & Implant Dentistry",
    bio: "Dr. Abhishek Gouraha is a renowned dental surgeon with over 15 years of experience in advanced dental procedures. He specializes in dental implants, cosmetic dentistry, and smile makeovers. Having successfully treated over 10,000 patients, he is committed to providing world-class dental care in Bilaspur.",
  },
  address: "Seepat Rd, Near Khandelwal Bajaj, Shree Vihar, Ashok Nagar, Sarkanda, Bilaspur, Chhattisgarh 495006",
  phone: "09685372425",
  phoneLink: "+919685372425",
  whatsappLink: "https://wa.me/919685372425",
  hours: "Mon - Sat: 10:00 AM - 8:00 PM",
  email: "info@gourahadental.com",
  mapEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3742.5!2!3d!1m2!1s0x0%3A0x0!2zNDk1MDA2!5m2!1m4!1s0x0%3A0x0!2zNDk1MDA2",
  tagline: "Your Smile, Our Priority",
  subtitle: "Trusted Dental Care in Bilaspur, Chhattisgarh",
};

export interface Service {
  slug: string;
  title: string;
  shortDescription: string;
  description: string;
  icon: string;
  benefits: string[];
  process: { step: string; description: string }[];
  faqs: { question: string; answer: string }[];
}

export const services: Service[] = [
  {
    slug: "dental-implants",
    title: "Dental Implants",
    shortDescription: "Permanent tooth replacement that looks and feels natural. Advanced implant technology for a confident smile.",
    description: "Dental implants are the gold standard for replacing missing teeth. They are titanium posts surgically placed into the jawbone, providing a strong foundation for replacement teeth that look, feel, and function like natural teeth. Our clinic uses advanced implant technology to ensure precise placement and long-lasting results.",
    icon: "lucide: Smile",
    benefits: [
      "Permanent and durable solution",
      "Natural look and feel",
      "Preserves jawbone health",
      "No damage to adjacent teeth",
      "Improved speech and chewing",
      "Boosts confidence and appearance",
    ],
    process: [
      { step: "Consultation", description: "Digital X-ray and 3D scan to assess jawbone condition" },
      { step: "Implant Placement", description: "Surgical placement of titanium implant under local anesthesia" },
      { step: "Healing Period", description: "3-6 months for osseointegration (bone fusion)" },
      { step: "Crown Placement", description: "Custom-made porcelain crown attached to the implant" },
    ],
    faqs: [
      { question: "How long do dental implants last?", answer: "With proper care, dental implants can last a lifetime. The crown may need replacement after 10-15 years." },
      { question: "Is the implant procedure painful?", answer: "The procedure is done under local anesthesia, so you won't feel pain during surgery. Mild discomfort for a few days after is normal." },
      { question: "Am I a candidate for implants?", answer: "Most adults with adequate jawbone density and good general health are candidates. A consultation will determine your suitability." },
    ],
  },
  {
    slug: "root-canal",
    title: "Root Canal Treatment",
    shortDescription: "Save your natural tooth with painless root canal treatment using advanced techniques.",
    description: "Root canal treatment saves a severely damaged or infected tooth by removing the pulp, cleaning and shaping the root canal, then filling and sealing it. Modern techniques make the procedure comfortable and efficient, preserving your natural tooth for years to come.",
    icon: "lucide: Stethoscope",
    benefits: [
      "Saves your natural tooth",
      "Painless procedure with modern techniques",
      "Prevents spread of infection",
      "Restores normal biting force",
      "Maintains natural appearance",
      "Cost-effective long-term solution",
    ],
    process: [
      { step: "Diagnosis", description: "X-ray and sensitivity tests to confirm the need for root canal" },
      { step: "Anesthesia", description: "Local anesthesia to ensure complete comfort" },
      { step: "Cleaning", description: "Removal of infected pulp and cleaning of root canals" },
      { step: "Filling", description: "Canals filled with biocompatible material and sealed" },
      { step: "Crown", description: "Custom crown placed to restore strength and appearance" },
    ],
    faqs: [
      { question: "Does root canal hurt?", answer: "Modern root canal treatment is virtually painless. You'll be completely numb during the procedure." },
      { question: "How long does a root canal take?", answer: "Most root canals are completed in 1-2 visits, each lasting 30-60 minutes." },
      { question: "What after a root canal?", answer: "Avoid chewing on the treated tooth until the crown is placed. Maintain good oral hygiene." },
    ],
  },
  {
    slug: "braces-and-orthodontics",
    title: "Braces & Orthodontics",
    shortDescription: "Straighten your teeth with metal braces, ceramic braces, or clear aligners.",
    description: "Orthodontic treatment corrects misaligned teeth, bite issues, and gaps using braces or clear aligners. We offer metal braces, ceramic braces, and invisible aligners to suit every lifestyle and budget. A beautiful, straight smile is within your reach at any age.",
    icon: "lucide: AlignCenter",
    benefits: [
      "Straighter, more aligned teeth",
      "Improved bite and jaw alignment",
      "Better oral hygiene",
      "Reduced risk of tooth damage",
      "Enhanced facial aesthetics",
      "Multiple options: metal, ceramic, invisible",
    ],
    process: [
      { step: "Assessment", description: "Digital scans and X-rays to plan your treatment" },
      { step: "Appliance Fitting", description: "Custom braces or aligners fitted to your teeth" },
      { step: "Active Treatment", description: "Regular adjustments every 4-6 weeks" },
      { step: "Retention", description: "Retainers to maintain your new smile" },
    ],
    faqs: [
      { question: "What age is best for braces?", answer: "Orthodontic treatment can be done at any age. Early assessment at age 7 is recommended for children." },
      { question: "How long do I need to wear braces?", answer: "Treatment typically lasts 12-24 months depending on the complexity of your case." },
      { question: "Are clear aligners as effective as braces?", answer: "For most cases, yes. Clear aligners are great for mild to moderate alignment issues." },
    ],
  },
  {
    slug: "teeth-whitening",
    title: "Teeth Whitening",
    shortDescription: "Professional teeth whitening for a brighter, more confident smile in just one visit.",
    description: "Professional teeth whitening removes stains and discoloration, brightening your smile by several shades in just one session. We use safe, dentist-supervised whitening systems that deliver dramatic results without damaging your enamel.",
    icon: "lucide: Sparkles",
    benefits: [
      "Instantly brighter smile",
      "Safe and supervised procedure",
      "Removes deep stains and discoloration",
      "Boosts confidence immediately",
      "Non-invasive treatment",
      "Results last 6-12 months with care",
    ],
    process: [
      { step: "Consultation", description: "Assessment of current tooth shade and staining" },
      { step: "Preparation", description: "Gum protection and teeth cleaning" },
      { step: "Whitening", description: "Professional-grade whitening gel applied with LED activation" },
      { step: "Results", description: "Instant visible improvement, take-home kits available" },
    ],
    faqs: [
      { question: "Is teeth whitening safe?", answer: "Yes, professional whitening is completely safe and supervised by a dentist." },
      { question: "How long do results last?", answer: "Results typically last 6-12 months. Avoiding staining foods and drinks helps maintain results." },
      { question: "How many shades whiter can I get?", answer: "Most patients see improvement of 4-8 shades in a single session." },
    ],
  },
  {
    slug: "pediatric-dentistry",
    title: "Pediatric Dentistry",
    shortDescription: "Gentle, kid-friendly dental care to build healthy oral habits from an early age.",
    description: "Pediatric dentistry focuses on the oral health of children from infancy through adolescence. Our child-friendly environment and gentle approach make dental visits fun and stress-free, helping kids develop positive attitudes toward dental care that last a lifetime.",
    icon: "lucide: Baby",
    benefits: [
      "Kid-friendly, welcoming environment",
      "Gentle and patient approach",
      "Early detection of dental issues",
      "Preventive treatments (sealants, fluoride)",
      "Education on oral hygiene habits",
      "Sedation options for anxious children",
    ],
    process: [
      { step: "First Visit", description: "Fun, pressure-free introduction to dental care" },
      { step: "Check-up", description: "Comprehensive exam with kid-friendly explanations" },
      { step: "Prevention", description: "Fluoride treatments and dental sealants as needed" },
      { step: "Ongoing Care", description: "Regular visits to build lifelong healthy habits" },
    ],
    faqs: [
      { question: "When should my child first see a dentist?", answer: "The American Academy of Pediatrics recommends the first dental visit by age 1 or within 6 months of the first tooth erupting." },
      { question: "How do I prepare my child for a dental visit?", answer: "Keep it positive, read children's books about dentist visits, and avoid using words like 'pain' or 'shot'." },
      { question: "Are dental X-rays safe for children?", answer: "Yes, dental X-rays use very low radiation and are safe when used as needed." },
    ],
  },
  {
    slug: "oral-surgery",
    title: "Oral Surgery",
    shortDescription: "Expert oral surgical procedures including wisdom tooth removal and jaw treatments.",
    description: "Oral surgery encompasses a range of surgical procedures performed in the mouth and jaw area. From wisdom tooth extraction to corrective jaw surgery, our experienced surgeon uses advanced techniques for faster healing and better outcomes.",
    icon: "lucide: Shield",
    benefits: [
      "Expert surgical care",
      "Advanced technology for precision",
      "Minimally invasive techniques",
      "Faster recovery times",
      "Comprehensive pre and post-op care",
      "Sedation options for comfort",
    ],
    process: [
      { step: "Evaluation", description: "3D imaging and thorough examination" },
      { step: "Treatment Plan", description: "Detailed discussion of procedure and recovery" },
      { step: "Surgery", description: "Performed under local anesthesia or sedation" },
      { step: "Recovery", description: "Detailed post-op instructions and follow-up" },
    ],
    faqs: [
      { question: "When should wisdom teeth be removed?", answer: "Wisdom teeth should be removed if they're impacted, causing pain, infection, or crowding other teeth." },
      { question: "How long is recovery from oral surgery?", answer: "Most patients recover within 3-7 days. Full healing may take 2-4 weeks." },
      { question: "Can I eat normally after oral surgery?", answer: "You'll need soft foods for a few days. We provide detailed dietary guidelines for recovery." },
    ],
  },
];

export const testimonials = [
  {
    id: 1,
    name: "Priya Sharma",
    rating: 5,
    text: "Dr. Gouraha made my dental implant procedure completely painless. The results are amazing — I can smile confidently again! Best dentist in Bilaspur.",
    treatment: "Dental Implants",
  },
  {
    id: 2,
    name: "Rahul Verma",
    rating: 5,
    text: "My daughter was terrified of dentists, but the team at Gouraha Dental made her feel so comfortable. Now she actually looks forward to her check-ups!",
    treatment: "Pediatric Dentistry",
  },
  {
    id: 3,
    name: "Sunita Devi",
    rating: 5,
    text: "I got my teeth whitening done here and the results were instant! Professional service, clean clinic, and very affordable prices. Highly recommended!",
    treatment: "Teeth Whitening",
  },
  {
    id: 4,
    name: "Amit Patel",
    rating: 5,
    text: "Had a severe toothache and Dr. Gouraha treated me the same day. Root canal was done perfectly — zero pain. Thank you for the excellent care!",
    treatment: "Root Canal",
  },
];

export const stats = [
  { value: 15, suffix: "+", label: "Years Experience" },
  { value: 10000, suffix: "+", label: "Happy Patients" },
  { value: 50000, suffix: "+", label: "Treatments Done" },
  { value: 4.9, suffix: "", label: "Google Rating" },
];

export const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/smile-gallery", label: "Smile Gallery" },
  { href: "/contact", label: "Contact" },
];

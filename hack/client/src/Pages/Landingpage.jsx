import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import SimpleNavBar from "../components/SimpleNavBar"; // Import SimpleNavBar
import Footer from "../components/Footer";
import { ArrowUpRight } from "lucide-react";

const translations = {
  en: {
    nav: {
      home: "Home",
      
      features: "Features",
      community: "Community",
      learning: "Learning",
      contact: "Contact",
    },
    hero: {
      title: "Smart Financial Planning for Your Future",
      subtitle:
        "Expert guidance, micro-investments, and government schemes all in one place",
      cta: "Get Started",
    },
    businessIdeas: {
      title: "Trending Business Ideas",
      subtitle: "Scroll to explore opportunities",
      ideas: [
        {
          title: "Poultry Farming",
          description: "Start your own chicken and egg production farm",
          icon: "🐔",
        },
        {
          title: "Local Grocery Store",
          description: "Set up a store for essential food and household items",
          icon: "🛒",
        },
        {
          title: "Fishery Business",
          description: "Raise and sell fish for local and regional markets",
          icon: "🐟",
        },
        {
          title: "Organic Farming",
          description: "Cultivate and sell organic fruits and vegetables",
          icon: "🥦",
        },
        {
          title: "Dairy Farming",
          description: "Produce milk and other dairy products",
          icon: "🐄",
        },
        {
          title: "Handicrafts",
          description: "Make and sell handmade goods like baskets and pottery",
          icon: "🎨",
        },
      ],
    },
    successStories: {
      title: "Success Stories of the Underprivileged",
      subtitle: "Inspiring journeys of overcoming adversity",
      steps: [
        {
          title: "Rising from Poverty",
          description:
            "A story of determination and hard work leading to financial stability",
          icon: "🌟",
          youtubeId: "zZ-VeqYPxoA",
        },
        {
          title: "Empowering Women",
          description:
            "How micro-financing helped women start their own businesses",
          icon: "👩‍💼",
          youtubeId: "i9UYbJ2xMTI",
        },
        {
          title: "Education for All",
          description: "Providing education to children in impoverished areas",
          icon: "📚",
          youtubeId: "VILohre4Q6w",
        },
        {
          title: "Community Support",
          description:
            "Building a support network to uplift entire communities",
          icon: "🤝",
          youtubeId: "EsrJ_NKBkww",
        },
      ],
    },
  },
};

const BusinessIdeasScroll = ({ ideas }) => {
  const scrollContainerRef = React.useRef(null);

  React.useEffect(() => {
    const container = scrollContainerRef.current;
    const scrollSpeed = 2; // Speed of scrolling
    let scrollInterval;

    if (container) {
      scrollInterval = setInterval(() => {
        container.scrollBy({
          left: scrollSpeed,
          behavior: "smooth",
        });

        // Reset scroll position to the start if at the end
        if (
          container.scrollLeft + container.clientWidth >=
          container.scrollWidth
        ) {
          container.scrollTo({ left: 0 });
        }
      }, 20); // Interval for smooth scrolling
    }

    return () => clearInterval(scrollInterval);
  }, []);

  return (
    <div className="relative max-w-7xl mx-auto">
      <div
        ref={scrollContainerRef}
        className="flex overflow-x-auto hide-scrollbar gap-6 px-12 py-6 scroll-smooth"
        style={{
          scrollbarWidth: "none",
          msOverflowStyle: "none",
          WebkitOverflowScrolling: "touch",
        }}
      >
        {ideas.map((idea, index) => (
          <div
            key={index}
            className="flex-none w-72 bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
          >
            <span className="text-4xl mb-4 block">{idea.icon}</span>
            <h3 className="text-xl font-bold text-green-800 mb-2 flex items-center justify-center gap-2">
              {idea.title}
              <ArrowUpRight className="h-4 w-4" />
            </h3>
            <p className="text-green-600 text-center">{idea.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

const SuccessStoryTimeline = ({ steps }) => {
  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      {steps.map((step, index) => (
        <div
          key={index}
          className={`flex flex-col ${
            index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
          } items-center gap-8 mb-16 relative`}
        >
          <div className="w-full md:w-1/2 relative">
            <div
              className="relative rounded-xl overflow-hidden shadow-lg"
              style={{ height: "315px" }}
            >
              <iframe
                width="100%"
                height="100%"
                src={`https://www.youtube.com/embed/${step.youtubeId}?start=1&autoplay=0`}
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
          <div className="w-full md:w-1/2 space-y-4">
            <div className="backdrop-blur-sm bg-white/50 rounded-xl p-6">
              <div className="inline-block px-3 py-1 rounded-full bg-green-50 text-green-700 text-sm font-medium mb-4">
                Step {index + 1}
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">
                {step.title}
              </h3>
              <p className="text-gray-600 mb-4 leading-relaxed">
                {step.description}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

const FAQs = () => {
  const faqItems = [
    {
      question: "What is FinAdvise?",
      answer: "FinAdvise is a platform that helps you with smart financial planning, offering tools, resources, and expert guidance.",
    },
    {
      question: "How do I create an account?",
      answer: "Click on the 'Login' button at the top, and follow the instructions to sign up or log in.",
    },
    {
      question: "Is my data secure?",
      answer: "Yes, we prioritize your data security and use industry-standard encryption to protect your information.",
    },
  ];

  return (
    <section className="py-12 bg-white text-center">
      <h2 className="text-2xl font-bold text-green-800">FAQs</h2>
      <div className="mt-6 max-w-4xl mx-auto space-y-6">
        {faqItems.map((faq, index) => (
          <div key={index} className="text-left border-b pb-4">
            <h3 className="text-lg font-semibold text-green-800">{faq.question}</h3>
            <p className="text-gray-600 mt-2">{faq.answer}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

const HowItWorks = () => {
  const steps = [
    {
      title: "Step 1: Create an Account",
      description: "Click on the 'Login' button and sign up to create your account.",
    },
    {
      title: "Step 2: Explore Features",
      description: "Access tools like PPF calculators, schemes, and learning roadmaps.",
    },
    {
      title: "Step 3: Achieve Your Goals",
      description: "Use our resources and expert guidance to achieve financial success.",
    },
  ];

  return (
    <section className="py-12 bg-gradient-to-br from-green-100 to-green-50 text-center">
      <h2 className="text-2xl font-bold text-green-800">How It Works</h2>
      <div className="mt-6 max-w-4xl mx-auto space-y-8">
        {steps.map((step, index) => (
          <div key={index} className="text-left">
            <h3 className="text-lg font-semibold text-green-800">{step.title}</h3>
            <p className="text-gray-600 mt-2">{step.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

const AboutUs = () => {
  return (
    <section className="py-12 bg-white text-center" id="about">
      <h2 className="text-2xl font-bold text-green-800">About Us</h2>
      <p className="mt-4 text-gray-600 max-w-4xl mx-auto">
        FinAdvise is your trusted partner for smart financial planning. We
        provide expert guidance, tools, and resources to help you achieve your
        financial goals. Our mission is to empower individuals and communities
        with the knowledge and resources they need to make informed financial
        decisions.
      </p>
    </section>
  );
};

const ContactUs = () => {
  return (
    <section className="py-12 bg-gradient-to-br from-green-100 to-green-50 text-center" id="contact">
      <h2 className="text-2xl font-bold text-green-800">Contact Us</h2>
      <p className="mt-4 text-gray-600 max-w-4xl mx-auto">
        Email: satyajeet@gmail.com
        <br />
        Phone: +1 123 456 7890
        <br />
        Address: kondhawa, Pune, Maharashtra, India
      </p>
    </section>
  );
};

const PrivacyPolicy = () => {
  return (
    <section className="py-12 bg-white text-center" id="privacy">
      <h2 className="text-2xl font-bold text-green-800">Privacy Policy</h2>
      <p className="mt-4 text-gray-600 max-w-4xl mx-auto">
        At FinAdvise, we value your privacy. We are committed to protecting your
        personal information and ensuring that your data is secure. For more
        details, please read our full privacy policy.
      </p>
    </section>
  );
};

const TermsOfService = () => {
  return (
    <section className="py-12 bg-gradient-to-br from-green-100 to-green-50 text-center" id="terms">
      <h2 className="text-2xl font-bold text-green-800">Terms of Service</h2>
      <p className="mt-4 text-gray-600 max-w-4xl mx-auto">
        By using FinAdvise, you agree to our terms of service. We strive to
        provide accurate and reliable information, but we encourage users to
        consult with financial experts for personalized advice.
      </p>
    </section>
  );
};

const VideoSection = () => {
  return (
    <section className="relative w-full h-screen bg-black" id="vid">
      <video
        className="absolute top-0 left-0 w-full h-full object-cover"
        autoPlay
        loop
        muted
      >
        <source src="/video.mp4" type="video/mp4" />
        <source src="/video.webm" type="video/webm" />
        <source src="/video.ogg" type="video/ogg" />
        Your browser does not support the video tag.
      </video>
      <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
        <h2 className="text-4xl font-bold text-white text-center">
          
        </h2>
      </div>
    </section>
  );
};

const LandingPage = () => {
  const [language, setLanguage] = useState("en");
  const t = translations[language];
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#F3F4F6]">
      <SimpleNavBar language={language} toggleLanguage={() => setLanguage((prev) => (prev === "en" ? "hi" : "en"))} />
      <header className="text-center py-24 bg-[#1E3A8A] text-white">
        <h1 className="text-4xl font-bold">{t.hero.title}</h1>
        <p className="mt-4">{t.hero.subtitle}</p>
        <button
          className="mt-6 px-8 py-3 bg-[#3B82F6] text-white font-semibold rounded-lg hover:bg-[#2563EB] transition-colors"
          onClick={() => navigate("/login")}
        >
          {t.hero.cta}
        </button>
      </header>
      <section className="py-12 bg-white text-center">
        <h2 className="text-2xl font-bold text-[#1E3A8A]">
          {t.businessIdeas.title}
        </h2>
        <p className="mt-2 text-[#1F2937]">{t.businessIdeas.subtitle}</p>
        <BusinessIdeasScroll ideas={t.businessIdeas.ideas} />
      </section>
      <VideoSection /> {/* Updated Video Section */}
      <section className="py-12 bg-[#E5E7EB]">
        <h2 className="text-2xl font-bold text-[#1E3A8A] text-center">
          {t.successStories.title}
        </h2>
        <p className="mt-2 text-[#1F2937] text-center">
          {t.successStories.subtitle}
        </p>
        <SuccessStoryTimeline steps={t.successStories.steps} />
      </section>
      <HowItWorks />
      <FAQs />
      <AboutUs />
      <ContactUs />
      <PrivacyPolicy />
      <TermsOfService />
      <Footer />
    </div>
  );
};

export default LandingPage;

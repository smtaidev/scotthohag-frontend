
import SubscriptionPlan from '@/components/landingPage/SubscriptionPlan';
import HowItWorks from '@/components/landingPage/HowItWorks';
import Features from '@/components/landingPage/Features';
import WhoItsFor from '@/components/landingPage/WhoItsFor';
import AreasOfSpecialty from '@/components/landingPage/AreasOfSpecialty';
import AboutScott from '@/components/landingPage/AboutScott';
import LatestNews from '@/components/landingPage/LatestNews';
import ContactUs from '@/components/landingPage/ContactUs';

const page = () => {
  return (
    <div>
      <SubscriptionPlan />
      <HowItWorks />
      <Features />
      <WhoItsFor />
      <AreasOfSpecialty />
      <AboutScott />
      <LatestNews />
      <ContactUs />
    
    </div>
  );
};

export default page;
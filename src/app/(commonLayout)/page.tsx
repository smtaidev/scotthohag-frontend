
import SubscriptionPlan from '@/components/landingPage/SubscriptionPlan';
import HowItWorks from '@/components/landingPage/HowItWorks';
import Features from '@/components/landingPage/Features';
import WhoItsFor from '@/components/landingPage/WhoItsFor';
import AreasOfSpecialty from '@/components/landingPage/AreasOfSpecialty';
import AboutScott from '@/components/landingPage/AboutScott';
import LatestNews from '@/components/landingPage/LatestNews';
import ContactUs from '@/components/landingPage/ContactUs';
import Newsletter from '@/components/landingPage/Newslatter';

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
    <Newsletter/>
    </div>
  );
};

export default page;
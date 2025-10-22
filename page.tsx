
import AcademyHero from './AcademyHero';
import CourseCategories from './CourseCategories';
import FeaturedCourses from './FeaturedCourses';
import LearningPath from './LearningPath';
import BlogSection from './BlogSection';
import SubscriptionPlans from './SubscriptionPlans';

export default function AcademyPage() {
  return (
    <div className="min-h-screen bg-white">
      <AcademyHero />
      <CourseCategories />
      <FeaturedCourses />
      <LearningPath />
      <BlogSection />
      <SubscriptionPlans />
    </div>
  );
}

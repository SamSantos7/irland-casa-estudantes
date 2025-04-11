
import { Quote } from "lucide-react";

interface TestimonialCardProps {
  name: string;
  image: string;
  testimonial: string;
  location: string;
  role?: string;
  rating?: number;
}

const TestimonialCard = ({
  name,
  image,
  testimonial,
  location,
  role,
  rating,
}: TestimonialCardProps) => {
  const renderStars = () => {
    if (!rating) return null;
    
    const stars = [];
    for (let i = 0; i < 5; i++) {
      stars.push(
        <svg 
          key={i} 
          xmlns="http://www.w3.org/2000/svg" 
          width="16" 
          height="16" 
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="currentColor" 
          strokeWidth="2" 
          className={`${
            i < rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
          }`}
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" 
          />
        </svg>
      );
    }
    return (
      <div className="flex mb-2">
        {stars}
      </div>
    );
  };

  return (
    <div className="bg-white dark:bg-neutrals-dark p-6 rounded-2xl shadow-md relative card-shadow">
      <div className="absolute -top-3 left-6 bg-teal dark:bg-teal-light rounded-full p-2">
        <Quote size={20} className="text-white dark:text-teal" />
      </div>
      <div className="mt-6">
        {renderStars()}
        <p className="text-neutrals-dark dark:text-white italic mb-6">"{testimonial}"</p>
        <div className="flex items-center">
          <img
            src={image}
            alt={name}
            className="w-12 h-12 rounded-full object-cover mr-4"
          />
          <div>
            <p className="font-semibold text-neutrals-dark dark:text-white">{name}</p>
            <div className="text-sm text-muted-foreground">
              {role && <span>{role}, </span>}
              <span>{location}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestimonialCard;

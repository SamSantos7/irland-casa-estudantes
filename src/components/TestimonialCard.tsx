
import { Quote } from "lucide-react";

interface TestimonialCardProps {
  name: string;
  image: string;
  testimonial: string;
  location: string;
}

const TestimonialCard = ({
  name,
  image,
  testimonial,
  location,
}: TestimonialCardProps) => {
  return (
    <div className="bg-white dark:bg-neutrals-dark p-6 rounded-2xl shadow-md relative card-shadow">
      <div className="absolute -top-3 left-6 bg-teal dark:bg-teal-light rounded-full p-2">
        <Quote size={20} className="text-white dark:text-teal" />
      </div>
      <div className="mt-6">
        <p className="text-neutrals-dark dark:text-white italic mb-6">"{testimonial}"</p>
        <div className="flex items-center">
          <img
            src={image}
            alt={name}
            className="w-12 h-12 rounded-full object-cover mr-4"
          />
          <div>
            <p className="font-semibold text-neutrals-dark dark:text-white">{name}</p>
            <p className="text-sm text-muted-foreground">{location}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestimonialCard;

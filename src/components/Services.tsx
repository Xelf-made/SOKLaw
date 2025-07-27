import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

interface ServiceCardProps {
  title: string;
  description: string;
  imageUrl: string;
  icon: React.ElementType;
  id: string;
}

const ServiceCard = ({ title, description, imageUrl, icon: IconComponent, id }: ServiceCardProps) => {
  return (
    <div className="relative rounded-3xl overflow-hidden shadow-xl border border-white/10">
      {/* Blurred Background */}
      <div
        className="absolute inset-0 bg-cover bg-center backdrop-blur-sm"
        style={{
          backgroundImage: `url(${imageUrl})`,
          filter: 'blur(4px)', // adjust for readability
        }}
      ></div>

      {/* Overlay to subtly dim the background */}
      <div className="absolute inset-0 bg-black/10" />

      {/* Content */}
      <div className="relative z-10 p-8 sm:p-10 lg:p-12 text-left text-white">
        <div className="mb-6">
          <IconComponent className="h-12 w-12 text-blue-500" />
        </div>
        <h3 className="text-xl font-bold mb-4 text-neutral-900">{title}</h3>
        <p className="leading-relaxed mb-4 text-neutral-800">{description}</p>
        <Link
          to={`/services/${id}`}
          className="inline-flex items-center group/link font-semibold text-blue-700 hover:text-blue-800"
          aria-label={`Learn more about ${title}`}
        >
          <span>Learn More</span>
          <ArrowRight className="h-4 w-4 ml-2 group-hover/link:translate-x-1 transition-transform" />
        </Link>
      </div>
    </div>
  );
};

export default ServiceCard;

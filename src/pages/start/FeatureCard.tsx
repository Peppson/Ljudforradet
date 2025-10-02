import { Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

interface FeatureCardProps {
  imgSrc: string;
  title: string;
  description: string;
  padding: string;
}

export default function FeatureCard({ imgSrc, title, description, padding }: FeatureCardProps) {
  const navigate = useNavigate();

  return (
    <Card className="bg-transparent d-flex align-items-center text-center border-0 col-md-4">
      <div className={`d-flex justify-content-center ${padding}`}>
        <img
          src={imgSrc}
          alt={title}
          width={64}
          height={64}
          className="cursor-pointer img-hover-zoom img-hover-glow"
          style={{ objectFit: "contain" }}
          onClick={() => { navigate("/about-us"); }} />
      </div>
      <Card.Text className="text-white pt-3 fs-5">{title}</Card.Text>
      <Card.Text className="text-light">{description}</Card.Text>
    </Card >
  );
}

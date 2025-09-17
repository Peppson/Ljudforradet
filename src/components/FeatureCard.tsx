import { Card } from "react-bootstrap";
import type FeatureCardProps from "../interfaces/FeatureCardProps";

export default function FeatureCard({ imgSrc, title, description, padding }: FeatureCardProps) {
  return (
    <Card className="bg-transparent d-flex align-items-center text-center border-0 col-md-4">
      <div className={`d-flex justify-content-center ${padding}`}>
        <img
          src={imgSrc}
          alt={title}
          width={60}
          height={60}
          style={{ objectFit: "contain" }}
        />
      </div>
      <Card.Text className="text-white pt-3">{title}</Card.Text>
      <Card.Text className="text-light">{description}</Card.Text>
    </Card >
  );
}

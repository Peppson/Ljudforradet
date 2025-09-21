import { Card } from "react-bootstrap";

interface InstrumentCardProps {
  imgSrc: string;
  title: string;
  description: string;
}

export default function InstrumentCard({ imgSrc, title, description }: InstrumentCardProps) {
  return (
    <Card className="card bg-transparent overflow-hidden rounded-4 border-0 col-md-4">
      <img
        src={imgSrc}
        className="card-img-top img-hover-zoom"
        alt={title}
      />
      <Card.Text className="text-white pt-4">{title}</Card.Text>
      <Card.Text className="text-light">{description}</Card.Text>
    </Card>
  );
}

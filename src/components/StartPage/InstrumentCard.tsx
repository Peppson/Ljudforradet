import { useNavigate } from "react-router-dom";
import { Card } from "react-bootstrap";

interface InstrumentCardProps {
  imgSrc: string;
  title: string;
  description: string;
}

export default function InstrumentCard({ imgSrc, title, description }: InstrumentCardProps) {
  const navigate = useNavigate();

  return (
    <Card className="card bg-transparent overflow-hidden border-0 col-md-4">
      <img
        src={imgSrc}
        className="rounded-3 cursor-pointer img-hover-zoom img-hover-glow"
        alt={title}
        onClick={() => { navigate("/products"); }} />
      <Card.Text className="text-white pt-4">{title}</Card.Text>
      <Card.Text className="text-light">{description}</Card.Text>
    </Card>
  );
}

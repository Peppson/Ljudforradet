import { Col } from "react-bootstrap";

interface InfoCardProps {
  icon: string;
  label: string;
  value: string | number;
}

export default function InfoCard({ icon, label, value }: InfoCardProps) {
  return (
    <Col>
      <div className="card background-color-overlay border-light h-100">
        <div className="card-body py-2 px-3">
          <div className="d-flex align-items-center mb-1">
            <small className="text-light mb-0 fw-semibold">{label}</small>
            <i className={`bi ${icon} text-light ms-1`}></i>
          </div>
          <p className="text-white mb-0 small">{value}</p>
        </div>
      </div>
    </Col>
  );
}

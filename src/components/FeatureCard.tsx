import type FeatureCardProps from "../interfaces/FeatureCardProps";

export default function FeatureCard({ imgSrc, title, description, padding }: FeatureCardProps) {
    return (
        <div className="col-md-4">
            <div className="card bg-transparent d-flex align-items-center text-center">
                <div className={`d-flex justify-content-center ${padding}`}>
                    <img
                        src={imgSrc}
                        alt={title}
                        width={60}
                        height={60}
                        style={{ objectFit: "contain" }}
                    />
                </div>
                <h5 className="text-white pt-3">{title}</h5>
                <p className="text-light">{description}</p>
            </div>
        </div>
    );
}

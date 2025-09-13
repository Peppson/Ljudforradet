import type InstrumentCardProps from "../interfaces/InstrumentCardProps";

export default function InstrumentCard({ imgSrc, title, description }: InstrumentCardProps) {
    return (
        <div className="col-md-4">
            <div className="card bg-transparent">
                <img
                    src={imgSrc}
                    className="card-img-top rounded-4"
                    alt={title}
                />
                <h6 className="text-white pt-4">{title}</h6>
                <p className="text-light">{description}</p>
            </div>
        </div>
    );
}

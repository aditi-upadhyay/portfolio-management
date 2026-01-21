import './card.css';
import { ArrowUpRight } from 'lucide-react';

interface StatData {
    title: string;
    content: string;
}

interface CardProps {
    data: StatData;
}

export default function Card({ data }: CardProps) {
    return (
        <div className="card">
            <div className="head">
                <span className="title">{data.title}</span>
                <ArrowUpRight />
            </div>
            <span className="card-content">{data.content}</span>
        </div>
    );
}

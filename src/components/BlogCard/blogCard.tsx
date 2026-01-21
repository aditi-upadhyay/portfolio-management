import { BlogPost } from '../../data/dashboardData';
import './blogCard.css';

interface BlogCardProps {
    post: BlogPost;
}

export default function BlogCard({ post }: BlogCardProps) {
    return (
        <div className="blog-card">
            <div className="blog-header">
                <span className="blog-date">{post.date}</span>
                <span className="blog-category">{post.category}</span>
            </div>
            <h3 className="blog-title">{post.title}</h3>
            <p className="blog-description">{post.description}</p>
            <a href={post.link} className="read-more-link">Read full post</a>
        </div>
    );
}

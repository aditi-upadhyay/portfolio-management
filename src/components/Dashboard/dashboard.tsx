import { Link } from "react-router-dom";
import './dashboard.css';
import { heroContent, statsData, blogPosts } from "../../data/dashboardData.ts";
import Card from "../Card/card.tsx";
import BlogCard from "../BlogCard/blogCard.tsx";

export default function Dashboard() {
    return (
        <>
            <div className="home-hero">
                <h1>{heroContent.title}</h1>
                <p>
                    {heroContent.description}
                </p>
            </div>

            <div className="stats-grid">
                {statsData.map((stat, index) => (
                    <Card key={index} data={stat} />
                ))}
            </div>

            <div className="card" style={{ background: 'transparent', boxShadow: 'none', border: 'none', padding: 0 }}>
                <div className="card-header" style={{ paddingLeft: 0, paddingRight: 0 }}>
                    <h3 className="card-title">Latest Posts</h3>
                </div>
                <div className="card-body" style={{ padding: 0 }}>
                    <div className="blog-grid">
                        {blogPosts.map((post) => (
                            <BlogCard key={post.id} post={post} />
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}

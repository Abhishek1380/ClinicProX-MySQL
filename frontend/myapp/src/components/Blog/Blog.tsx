import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./Blog.css";

type BlogPost = {
    img: string;
    title: string;
    desc: string;
    date: string;
    slug: string;
}

const Blog = () => {
    const [blog, setBlog] = useState<BlogPost[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        axios.get("https://backend-clinic-website.onrender.com/blog")
            .then(response => {
                const extractedBlog: BlogPost[] = response.data.map((item: any) => ({
                    img: item.img_blog,
                    title: item.blog_title,
                    desc: item.blog_desc,
                    date: item.date,
                    slug: item.slug,
                }));

                setBlog(extractedBlog);
                setLoading(false);
            })
            .catch(error => {
                console.error("Error fetching blogs:", error);
                setError("Failed to load blogs. Please try again later.");
                setLoading(false);
            });
    }, []);

    return (
        <div className="Blogs_container">
            <h5 className="text center">
                <span>
                    <i className="ri-hospital-line"></i>
                    <i className="ri-arrow-right-s-line"></i>
                </span>{" "}
                blogs about Homeopathy
            </h5>

            {loading && (
                <div className="spinner-container">
                    <div className="spinner"></div>
                    <p>Loading blogs...</p>
                </div>
            )}

            {error && <p className="error">{error}</p>}

            <div className="Blogs_div">
                {blog.length > 0 ? (
                    blog.map((blog, index) => (
                        <div key={index} className="Blogs_card">
                            <div className="Blogscard-img-holder">
                                <img src={blog.img} alt={blog.title} />
                            </div>
                            <h3 className="Blogs_blog-title">{blog.title}</h3>
                            <span className="Blogs_blog-time">{blog.date}</span>
                            <p className="Blogs_description">{blog.desc}</p>
                            <div className="Blogs_options">
                                <Link to={`/blog/${blog.slug}`}>
                                    <button className="Blogs_btn">Read More</button>
                                </Link>
                            </div>
                        </div>
                    ))
                ) : (
                    !loading && <p>No blogs available.</p>
                )}
            </div>
        </div>
    );
};

export default Blog;

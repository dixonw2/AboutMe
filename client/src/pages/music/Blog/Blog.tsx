import type { Album } from "@/types/blog/Album";
import { useEffect, useState } from "react";
import CreateBlogEntry from "./components/CreateBlogEntry/CreateBlogEntry";

const Blog = () => {
  const [entries, setEntries] = useState<Album[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getEntries = async () => {
      const response = await fetch("api/music/blog");
      setEntries(await response.json());
    };

    getEntries();
    setLoading(false);
  }, []);

  return (
    <div>
      <title>Blog</title>
      <h1>Blog</h1>
      {loading ? (
        <em>Loading...</em>
      ) : (
        <div>
          <CreateBlogEntry />
        </div>
      )}
    </div>
  );
};

export default Blog;

"use client";
import { useState, useEffect } from "react";

interface ContentDisplayProps {
  apiRoute: string;
  method: "GET" | "POST";
  body?: any;
}

const ContentDisplay = ({ apiRoute, method, body }: ContentDisplayProps) => {
  const [content, setContent] = useState(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;
    const fetchContent = async () => {
      try {
        const requestOptions = {
          method: method,
          headers: {
            "Content-Type": "application/json",
          },
          body: method === "POST" ? JSON.stringify(body) : null,
        };

        const response = await fetch(apiRoute, requestOptions);

        if (!isMounted) return;

        if (response.ok) {
          const data = await response.json();
          setContent(data);
          setError(null);
        } else {
          setError("Failed to fetch content");
          setContent(null);
        }
      } catch (error) {
        if (!isMounted) return;
        console.error(error);
        setError("Error fetching content");
        setContent(null);
      }
    };

    fetchContent();
    return () => {
      isMounted = false;
    };
  }, [apiRoute, method, body]);

  return (
    <div>
      {error && <p>Error: {error}</p>}
      {content && <pre>{JSON.stringify(content, null, 2)}</pre>}
    </div>
  );
};

export default ContentDisplay;

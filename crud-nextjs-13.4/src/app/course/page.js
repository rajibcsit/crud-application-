import Link from "next/link";

export default async function page() {
  const res = await fetch("https://jsonplaceholder.typicode.com/todos/");
  const posts = await res.json();

  return (
    <>
      {posts.map((post) => {
        return (
          <div key={post.id}>
            <Link href={`course/${post.id}`}> {post.title}</Link>
          </div>
        );
      })}
    </>
  );
}

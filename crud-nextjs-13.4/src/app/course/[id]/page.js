export default async function page({ params }) {
  const id = params.id;

  const res = await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`);
  const post = await res.json();

  return (
    <>
      <h1> {post.id}</h1>
      <h1> {post.title}</h1>
      <h1> {post.completed}</h1>
    </>
  );
}

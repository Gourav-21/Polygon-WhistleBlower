import Post from "./post";

async function getpost() {
  const res = await fetch('http://localhost:3000/api/posts', { next: { tags: ['posts'] }})
  const data= await res.json();
  return data.posts;
}

export default async function Page() {
  const post = await getpost();
  return (
    <div>
      <Post posts={post} />
    </div>
  );
}
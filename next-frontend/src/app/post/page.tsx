import { POST } from "@/db";
import dbConnect from "@/db/dbConnect";
import { post } from "@/store/posts";
import { SecretNetworkClient } from "secretjs";
import Post from "./post";
import { unstable_noStore } from "next/cache";

// type metadata={
//   _id:string,
//   date:string,
//   vote:Number,
//   comments:[]
// }

// interface data{
// 	posts:post[]
// }

// const query = async (query) => {

//   let secretjs = new SecretNetworkClient({
//     chainId: "pulsar-3",
//     url: "https://api.pulsar.scrttestnet.com",
//   });

//   const my_query:data = await secretjs.query.compute.queryContract({
//     contract_address: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS,
//     code_hash: process.env.NEXT_PUBLIC_CONTRACT_HASH,
//     query: query,
//   });
  
//   return my_query;
// };

// async function getpost() {
//   unstable_noStore();
//   await dbConnect();
//   const msg = { get_post: {} }
//   const posts: data = await query(msg)

//   const metadata:metadata[] = await POST.find().populate('comments');
  
//   const mergedData = posts.posts.map(post => {
//     const matchedData:metadata = metadata.find(data => data.date === post.date);
//     const result = {
//       id: matchedData._id,
//       date: post.date,
//       title: post.title,
//       description: post.description,
//       vote: matchedData.vote,
//       comments: matchedData.comments,
//     };
//     return result;
//   });
//   return JSON.stringify(mergedData);
// };

async function getpost() {
  const res = await fetch('https://secretwhistleblower.vercel.app/api/posts', { next: { tags: ['posts'] }})
  const data= await res.json();
  return data.posts;
}

export default async function Page() {
  const post = await getpost();
  // const post=JSON.parse(data)
  return (
    <div>
      <Post posts={post} />
    </div>
  );
}
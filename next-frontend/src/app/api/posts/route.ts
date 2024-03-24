import { POST } from "@/db";
import dbConnect from "@/db/dbConnect";
import { post } from "@/store/posts";
import { unstable_noStore } from "next/cache";
import Posts from "@/artifacts/contracts/Posts.sol/Posts.json"
import { Contract, ethers } from "ethers";

type metadata={
  _id:string,
  date:string,
  vote:Number,
  comments:[]
}

interface data{
	posts:post[]
}

const query = async () => {
    const provider = new ethers.JsonRpcProvider(process.env.NEXT_PUBLIC_RPC_PROVIDER)
    const contract = new Contract(process.env.NEXT_PUBLIC_CONTRACT_ADDRESS, Posts.abi, provider)
	const p= await contract.getPosts()
	return p
};

export async function GET(request: Request) {
	unstable_noStore();
    await dbConnect();
	const posts: data = await query()
	const formattedData = posts.map(result => {
		return {
			timestamp: result[0],
			category: result[1],
			description: result[2]
		};
	});
	
	const metadata:metadata[] = await POST.find().populate('comments');
	
	const mergedData = posts.map(post => {
		const matchedData:metadata|undefined = metadata.find(data => data.date === post[0]);
		const result = {
			id: matchedData?._id,
			date: post[0],
			title: post[1],
			description: post[2],
			vote:matchedData?.vote,
			comments:matchedData?.comments,
		};
		return result;	
	});

	return Response.json({ posts:mergedData})
}
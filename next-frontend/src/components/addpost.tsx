import { provider as providerState } from "@/store/provider";
import { useState } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { Button } from "@/components/ui/button"
import { Label } from "@radix-ui/react-label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import axios from "axios";
import { postsAtom } from "@/store/posts";
import { useToast } from "./ui/use-toast";
import { postState } from "@/store/currentPost";
import ConnectWallet from "./ConnectWallet";
import { walletState } from "@/store/walletConnected";
import { Contract, ethers } from "ethers";
import Posts from "@/artifacts/contracts/Posts.sol/Posts.json"

export default function AddPostside(props) {
  const [loading,setLoading]=useState(false);
  const setPosts = useSetRecoilState(postsAtom);
  const setPostState = useSetRecoilState(postState)
  const isConnected = useRecoilValue(walletState);
  const { toast } = useToast()
  console.log(loading)

  const provider = useRecoilValue(providerState)

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const execute = async (msg, id) => {
    try {
      const signer = await provider.getSigner()
      const contract = new Contract(process.env.NEXT_PUBLIC_CONTRACT_ADDRESS, Posts.abi, signer)
      const tx = await contract.createPost(msg.title,msg.description,msg.date.toISOString())
      await tx.wait()
      console.log("executing...");
      toast({
        description: "post added",
      })
      const res = await axios.post("api/addpost", { id })
      toast({
        description: res.data.message,
      })
      const newPost = {
        date: id,
        title: title,
        description: description,
        vote: 0,
        comments: []
      }
      setPosts((prev) => [newPost, ...prev])
      setTitle("")
      setDescription("")
      setPostState(id)
      props.onClose()
      setLoading(false)
    } catch (error) {
      setLoading(false)
      toast({
        variant: "destructive",
        description: error.message,
      })
      console.log(error)
    }
  };

  async function handleSubmit() {
    if(loading){
      return
    }
    setLoading(true)
    if (!isConnected) {
      toast({
        variant: "destructive",
        title: "Connect Wallet",
        description: "Connect your wallet to add a post.",
      })
      return;
    }
    const id = new Date();
    if (!title || !description) {
      toast({
        variant: "destructive",
        description: "⚠️ Post cannot be empty",
      })
      return;
    }
    const msg = { title: title, description: description, date: id } 
    await execute(msg, id)
  }

  return (
    <div className="flex w-full justify-center">
      <Card className="grow z-20 h-screen rounded-none border-none">
        <CardHeader className="relative">
          <CardTitle>Create post</CardTitle>
          <CardDescription>Whistleblow Anonymously</CardDescription>
          <div className="absolute top-5 right-6">
            <ConnectWallet />
          </div>

        </CardHeader>
        <CardContent>
          <form className="flex flex-col space-y-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="title">Title</Label>
              <Input id="title" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="title" />
            </div>
            <div className="grid w-full gap-1.5">
              <Label htmlFor="message">Your message</Label>
              <Textarea rows={8} value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Type your message here." id="message" />
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" onClick={() => { props.onClose() }}>Cancel</Button>
          <Button className={"w-20"} onClick={handleSubmit}>post</Button>
        </CardFooter>
      </Card>
    </div>
  )
}

import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const PostsModule = buildModule("PostsModule", (m) => {
  const Posts = m.contract("Posts");

  return { Posts };
});

export default PostsModule;

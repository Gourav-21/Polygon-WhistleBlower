const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Posts", function () {
    let posts:any;

    async function deployPostsContract() {
        const Posts = await ethers.getContractFactory("Posts");
        return await Posts.deploy();
    }

    beforeEach(async function () {
        posts = await deployPostsContract();
    });

    describe("Deployment", function () {
        it("Should deploy with correct initial state", async function () {
            expect(posts).to.not.be.undefined;
        });
    });

    describe("createPost", function () {
        it("Should create a post with correct details", async function () {
            const title = "Test Title";
            const description = "Test Description";
            const date = "2024-03-22";

            await posts.createPost(title, description, date);

            const allPosts = await posts.getPosts();

            expect(allPosts.length).to.equal(1);

            const newPost = allPosts[0];
            expect(newPost.title).to.equal(title);
            expect(newPost.description).to.equal(description);
            expect(newPost.date).to.equal(date);
        });
    });

    describe("getPosts", function () {
        it("Should return all posts", async function () {
            const title1 = "Title 1";
            const description1 = "Description 1";
            const date1 = "2024-03-22";

            const title2 = "Title 2";
            const description2 = "Description 2";
            const date2 = "2024-03-23";

            await posts.createPost(title1, description1, date1);
            await posts.createPost(title2, description2, date2);

            const allPosts = await posts.getPosts();

            expect(allPosts.length).to.equal(2);
        });
    });
});

// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.24;

// Uncomment this line to use console.log
// import "hardhat/console.sol";

contract Posts {
    struct Post {
        string date;
        string title;
        string description;
    }

    event log(string msg);

    Post[] public posts;

    function createPost(string memory title,string memory description,string memory date) public payable {
        posts.push(Post(date,title,description));
        emit log("post added");
    }

    function getPosts() public view returns (Post[] memory){
        return posts;
    }
}
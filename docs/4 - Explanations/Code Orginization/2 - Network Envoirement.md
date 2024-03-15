Most of what I'm going to say in this article should be pretty self explanatory, but It'd feel weird not saying it for newcomers.
This article will cover good practices on what code to put on the client, what to put on the server, and then lastly what should be shared. Again a lot of this is based on my opinions.

**I'd highly recommend that you read my articles on security, as they're very important to understand how to make sure that the client isn't exploiting your scripts.**

## Core Concepts
When you're handling large numbers of players, you can't rely on the server to do everything, and I'll do my best to explain when to do what. You should view the server as the autority, it's the only place where you can access databases and other persistent data, and it's the only entity that can communicate with other clients. Now the client is the player's machine that connects to the server, typically the client will have more computing power available than the server to spare per client, since you'll only have to worry about each players computing on that machine. 

Let's say you want to know when a client is in a certain area, while you with the server natives could easily know entirely from the server, you're going to have to ask yourself why? This is something you'd typically off-load to the client, and then have it tell the server when it enters the area. Then as discussed in the security article, you'd have the server validate that the client is actually where it says it is. That's just one example, but generally speaking you'd want to put the least amount of load on the server as possible. Ask yourself this when making something: "Can I have the client do this and reliably know on the server it isn't lying?".

## Client
There's a few things you can only do on the client, and I'll list a few of them here:
- Anything related to User Interface (UI)
- Anything related to input

## Server
The server is the only place where you can access databases, and it's the only place where you can communicate with other clients. Here's a few things you'd typically do on the server:
- Anything related to persistant data (databases, server KVPs, etc)
- Anything related to communicating with other clients

## Shared
When you have something as shared in your fxmanifest, it's the same as having it in both the client and server.
Here's a few things you'd typically have in the shared space:
- Configs without sensitive information
- Utility that you'd want to use on both the client and server
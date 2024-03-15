In this article I'll go over common mistakes in regards to security.

## Common Mistakes
- **Letting clients provide data without validation**
    This is a very common mistake, and it's a very dangerous one - especially if said unvalidated data is being passed directly in an SQL query. Always and I mean always make sure that the data you got is what you expected it to be.
- **Making target for vulnerable events a parameter**
    Unless you're dealing with someone you've verified is allowed (staff, etc), you should never allow the client to tell you who you're going to target. I've seen this in money givers, anti-cheat self reports and more over the years. Always think what would happen when someone is able to call this event with whatever parameters they want.
- **Letting NUI call client and/or server events**
    This is a very common mistake. You want to have less NUI callbacks for cleaner code, great. The problem happens when you let the NUI process tell you what event to call without limits. You need to be aware that anyone with access to the nui_devtools can trigger NUI callbacks at will - that means you just introduced a way for people to call client and server events with only nui_devtools. A way to make this a lot more secure is to make a list of allowed events, and then have the NUI process tell you what event to call by the index of the allowed events. This way you can't call any event you want, only the ones you've allowed to. In a perfect world where every script is secure, you would have to worry less about this, but we're not there yet.


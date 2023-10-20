/*
 * @lc app=leetcode id=355 lang=typescript
 *
 * [355] Design Twitter
 *
 * https://leetcode.com/problems/design-twitter/description/
 *
 * algorithms
 * Medium (38.45%)
 * Total Accepted:    146.4K
 * Total Submissions: 380.3K
 * Testcase Example:  '["Twitter","postTweet","getNewsFeed","follow","postTweet","getNewsFeed","unfollow","getNewsFeed"]\n' +
  '[[],[1,5],[1],[1,2],[2,6],[1],[1,2],[1]]'
 *
 * Design a simplified version of Twitter where users can post tweets,
 * follow/unfollow another user, and is able to see the 10 most recent tweets
 * in the user's news feed.
 * 
 * Implement the Twitter class:
 * 
 * 
 * Twitter() Initializes your twitter object.
 * void postTweet(int userId, int tweetId) Composes a new tweet with ID tweetId
 * by the user userId. Each call to this function will be made with a unique
 * tweetId.
 * List<Integer> getNewsFeed(int userId) Retrieves the 10 most recent tweet IDs
 * in the user's news feed. Each item in the news feed must be posted by users
 * who the user followed or by the user themself. Tweets must be ordered from
 * most recent to least recent.
 * void follow(int followerId, int followeeId) The user with ID followerId
 * started following the user with ID followeeId.
 * void unfollow(int followerId, int followeeId) The user with ID followerId
 * started unfollowing the user with ID followeeId.
 * 
 * 
 * 
 * Example 1:
 * 
 * 
 * Input
 * ["Twitter", "postTweet", "getNewsFeed", "follow", "postTweet",
 * "getNewsFeed", "unfollow", "getNewsFeed"]
 * [[], [1, 5], [1], [1, 2], [2, 6], [1], [1, 2], [1]]
 * Output
 * [null, null, [5], null, null, [6, 5], null, [5]]
 * 
 * Explanation
 * Twitter twitter = new Twitter();
 * twitter.postTweet(1, 5); // User 1 posts a new tweet (id = 5).
 * twitter.getNewsFeed(1);  // User 1's news feed should return a list with 1
 * tweet id -> [5]. return [5]
 * twitter.follow(1, 2);    // User 1 follows user 2.
 * twitter.postTweet(2, 6); // User 2 posts a new tweet (id = 6).
 * twitter.getNewsFeed(1);  // User 1's news feed should return a list with 2
 * tweet ids -> [6, 5]. Tweet id 6 should precede tweet id 5 because it is
 * posted after tweet id 5.
 * twitter.unfollow(1, 2);  // User 1 unfollows user 2.
 * twitter.getNewsFeed(1);  // User 1's news feed should return a list with 1
 * tweet id -> [5], since user 1 is no longer following user 2.
 * 
 * 
 * 
 * Constraints:
 * 
 * 
 * 1 <= userId, followerId, followeeId <= 500
 * 0 <= tweetId <= 10^4
 * All the tweets have unique IDs.
 * At most 3 * 10^4 calls will be made to postTweet, getNewsFeed, follow, and
 * unfollow.
 * 
 * 
 */


// 필요 자료구조:
// 1. 누가 누구를 팔로우하고 있는지 {followerId: {followee1:true,followee2:true, ...}}
// 2. 트윗이 등록된 순서대로 저장하고 있는 것 하나. 0번이 가장 오래된 트윗이다. [tweet1, tweet2, ...]
// 3. 몇 번 트윗이 어떤 유저에 의해 포스팅됐는지. {postId: userId}
// => postTweet: 2와 3에 넣는다. {postId: userId}로
// => follow: 1에 넣는다 {followerId -> followeeId}
// => unfollow: 1에서 뺀다 delete{followerId: followeeId}
// => getNewsFeed: 2에서 최신 포스팅부터 훑으며, 3에서 각 포스트 id 작성자를 찾고 1에서 조회하여 본인 포함 팔로우 중인 id에 속하면 선택한다. 10개가 선택되면 2를 훑는 것을 멈춘다. 
class Twitter1 {
    private whoFollowsWhom: { [key: number]: { [key: number]: boolean } } // {followerId: {followeeId:true,... }}
    private tweetOrder: number[];        // [post1, post2, ...]
    private tweetPostedBy: { [key: number]: number }  // {postId: userId}
    constructor() {
        this.whoFollowsWhom = {};
        this.tweetOrder = [];
        this.tweetPostedBy = {};
    }

    postTweet(userId: number, tweetId: number): void {
        this.tweetOrder.push(tweetId);
        this.tweetPostedBy[tweetId] = userId;
        //? FIXME: 하나의 tweet ID를 여러 유저가 등록하는 경우? 
    }
    
    follow(followerId: number, followeeId: number): void {
        //? FIXME: 자기 자신을 팔로우하는 경우?
        if (this.whoFollowsWhom[followerId] === undefined)
            this.whoFollowsWhom[followerId] = {};
        this.whoFollowsWhom[followerId][followeeId] = true;
    }
    
    unfollow(followerId: number, followeeId: number): void {
        delete this.whoFollowsWhom[followerId]?.[followeeId];
    }

    getNewsFeed(userId: number): number[] {
        // => getNewsFeed: 2에서 최신 포스팅부터 훑으며, 3에서 각 포스트 id 작성자를 찾고 1에서 조회하여 본인 포함 팔로우 중인 id에 속하면 선택한다. 10개가 선택되면 2를 훑는 것을 멈춘다. 
        const newsFeed10: number[] = [];
        const followingUsers = this.whoFollowsWhom[userId] ?? {};
        let i = this.tweetOrder.length - 1;
        
        while (newsFeed10.length < 10) {
            //? FIXME: what if total posts are less than 10? 
            if (i < 0) return newsFeed10;

            let tweetId = this.tweetOrder[i];
            let posterId = this.tweetPostedBy[tweetId];
            // 트윗 발행자가 '나'거나 '내가 팔로잉하는 사람들' 중 하나라면 newsFeed10에 추가
            if (posterId === userId || followingUsers[posterId]) {
                newsFeed10.push(tweetId);
            }
            i--;
        }

        return newsFeed10;
    }

    // 내부 자료구조 관찰용 게터(테스트 시)
    getFollowingList(userId: number) {
        return this.whoFollowsWhom[userId];
    }
    getTweetList() {
        return this.tweetOrder;
    }
    getTweetPoster(tweetId: number) {
        return this.tweetPostedBy[tweetId];
    }
}

/**
 * Your Twitter object will be instantiated and called as such:
 * var obj = new Twitter()
 * obj.postTweet(userId,tweetId)
 * var param_2 = obj.getNewsFeed(userId)
 * obj.follow(followerId,followeeId)
 * obj.unfollow(followerId,followeeId)
 */

// 
class Twitter {
    private usersTweets = new Map<number, number[][]>();
    private followers = new Map<number, Set<number>>();
    private timestamp = 0;

    constructor() { }

    postTweet(userId: number, tweetId: number): void {
        this.timestamp++;
        if (!this.usersTweets.has(userId))
            this.usersTweets.set(userId, []);
        this.usersTweets.get(userId)!.push([tweetId, this.timestamp]);
    }

    getNewsFeed(userId: number): number[] {
        let tweets = this.usersTweets.get(userId) || [];
        const favs = this.followers.get(userId) || new Set();
        for (const followee of favs)
            tweets = tweets.concat(this.usersTweets.get(followee) || []);
        tweets.sort((a, b) => b[1] - a[1]);
        return tweets.slice(0, 10).map((tweet) => tweet[0]);
    }

    follow(followerId: number, followeeId: number): void {
        if (!this.followers.has(followerId))
            this.followers.set(followerId, new Set());
        this.followers.get(followerId)!.add(followeeId);
    }

    unfollow(followerId: number, followeeId: number): void {
        if (this.followers.has(followerId))
            this.followers.get(followerId)!.delete(followeeId);
    }
}

//? "!": Non-null Assertion Operator(null 아님 단언 연산자)
//    => 타입스크립트의 컴파일러에게 해당 변수가 null 또는 undefined가 아니라고 가정하도록 지시함. 'strictNullCheck' 옵션이 활성화돼있을 때 필요하다. 그랬는데 만약 코드 실행 중 null 또는 undefined가 발생하면 런타일 에러가 발생하게 된다. 

export default {
    Twitter: Twitter,
}

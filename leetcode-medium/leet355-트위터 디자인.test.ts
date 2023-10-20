import source from './leet355-트위터 디자인';
const { Twitter } = source;

describe('Design Twitter', () => {
	describe('Class initialization check', () => {
		let twitter: any;
		twitter	= new Twitter();
		it(`should exist when initialized as "new Twitter()"`, () => {
			expect(twitter).toBeDefined();
		});
		// it(`should have empty tweet list`, () => {
		// 	expect(twitter.getTweetList()).toBeDefined();
		// 	expect(twitter.getTweetList()).toEqual([]);
		// });
		// it(`should return "undefined" when called getTweetPoseter() with any user ID`, () => {
		// 	expect(twitter.getTweetPoster(1)).not.toBeDefined();
		// });
	});
	
	describe('Method check: POSTTWEET', () => {
		let twitter: any;
		beforeEach(() => {
			twitter = new Twitter();
			jest.spyOn(twitter, 'postTweet');
		});
		
		it(`User 1 posts tweet 10`, () => {
			twitter.postTweet(1, 10);
			expect(twitter.postTweet).toBeCalledWith(1, 10);
			expect(twitter.postTweet).toReturnWith(undefined);
			// expect(twitter.getTweetList()).toEqual([10]);
			// expect(twitter.getTweetPoster(10)).toBe(1);
		});
	});

	describe('Method check: FOLLOW', () => {
		let twitter: any;
		beforeEach(() => {
			twitter = new Twitter();
			jest.spyOn(twitter, 'follow');
		});
		
		it(`User 1 follows user 2: should have been called with (1, 2)`, () => {
			twitter.follow(1, 2);
			expect(twitter.follow).toBeCalledWith(1, 2);
			expect(twitter.follow).toReturn();
			expect(twitter.follow).toReturnWith(undefined);
			// expect(twitter.getFollowingList(1)).toEqual({ 2: true });
		});
		
		// Error 체크: 잘 안된다...
		// it(`Shouldn't be able to follow him/herself`, () => {
		// 	// twitter.follow(1, 1);
		// 	// expect(twitter.follow).toBeCalledWith(1, 1);
		// 	// expect(twitter.follow(1, 1)).toThrowError();
		// 	expect(twitter.follow(1, 1)).toThrowError('Users cannot follow themselves');
		// });
	});
	
	describe('Method check: UNFOLLOW', () => {
		let twitter: any;
		beforeEach(() => {
			twitter = new Twitter();
			jest.spyOn(twitter, 'unfollow');
		});
		
		it(`User 1 unfollows user2: ok`, () => {
			twitter.follow(1, 2);
			twitter.unfollow(1, 2);
			expect(twitter.unfollow).toReturn();
			expect(twitter.unfollow).toBeCalledWith(1, 2);
			// expect(twitter.getFollowingList(1)).toEqual({});
		});
		
		// Error 체크: 잘 안된다.
		// it(`User 1 unfollows user2: not ok`, () => {
		// 	twitter.unfollow(1, 2);
		// 	expect(twitter.unfollow).toThrowError();
		// });
	});

	describe('Method check: GETNEWSFEED', () => {
		let twitter: any;
		beforeEach(() => {
			twitter = new Twitter();
			jest.spyOn(twitter, 'getNewsFeed');
		});

		it(`User's tweet should be included in NewsFeed: should return [1]`, () => {
			twitter.postTweet(1, 1);
			expect(twitter.getNewsFeed(1)).toEqual([1]);
		});
		
		it(`User's followees' tweet should be included in NewsFeed: should return [10]`, () => {
			twitter.follow(1, 10);
			twitter.postTweet(10, 10);
			expect(twitter.getNewsFeed(1)).toEqual([10]);
		});
		
		it(`User's unfollowees' tweet must not be included in NewsFeed: should return []`, () => {
			twitter.postTweet(2, 2);
			expect(twitter.getNewsFeed(1)).toEqual([]);
		});
		
		it(`Only 10 recent tweets must be included: should return [25,15,22,21,9,11,10,6,5,1]`, () => {
			twitter.follow(1, 10);
			twitter.follow(1, 20);
			twitter.postTweet(1, 1);
			twitter.postTweet(2, 2);
			twitter.postTweet(2, 3);
			twitter.postTweet(1, 5);
			twitter.postTweet(1, 6);
			twitter.postTweet(10, 10);
			twitter.postTweet(10, 11);
			twitter.postTweet(1, 9);
			twitter.postTweet(2, 8);
			twitter.postTweet(20, 21);
			twitter.postTweet(20, 22);
			twitter.postTweet(10, 15);
			twitter.postTweet(20, 25);
			expect(twitter.getNewsFeed(1)).toEqual([25,15,22,21,9,11,10,6,5,1]);
		});
	});
	
	describe('Example Scenario', () => {
		let twitter = new Twitter();

		it(`should return [5]`, () => {
			twitter.postTweet(1, 5);
			expect(twitter.getNewsFeed(1)).toEqual([5]);
		});

		it(`should return [6,5]`, () => {
			twitter.follow(1, 2);
			twitter.postTweet(2, 6);
			expect(twitter.getNewsFeed(1)).toEqual([6, 5]);
		});

		it(`should return [5]`, () => {
			twitter.unfollow(1, 2);
			expect(twitter.getNewsFeed(1)).toEqual([5]);
		});

	})
});
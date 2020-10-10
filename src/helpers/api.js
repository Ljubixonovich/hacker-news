export default class Api {

  static async getAllStories () {
    try {
      let storyIds = await Api.getAllStoriesIds();

      if (storyIds.error) throw Error(storyIds.error)

      let posts = [];
      await Promise.all(storyIds.map(async (id) => {
        const story = await Api.getStorie(id);
        posts.push(story);
      }));

      // return posts;
      return posts.slice(0, 20);
    } catch (error) {
      console.warn('err: ', error)
      return 'err: ' + error;
    }
  }

  static async getAllStoriesIds () {
    console.log('getAllStoriesIds()');
    return new Promise((resolve, reject) => {
      fetch('https://hacker-news.firebaseio.com/v0/beststories.json')
      .then(res => res.json())
      .then(data => resolve(data))
      .catch(reject)
    })
  }

  static async getStorie (id) {
    console.log('getStorie(id)');
    return new Promise((resolve, reject) => {
      fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json`)
      .then(res => res.json())
      .then(data => resolve(data))
      .catch(reject)
    })
  }

}

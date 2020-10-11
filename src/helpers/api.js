
const compareScore = (a, b) => {
  if (a.score < b.score) {
    return -1;
  }
  if (a.score > b.score) {
    return 1;
  }
  return 0;
}

export default class Api {

  static async getAllStories () {
    try {
      let posts = [];
      let storyIds = await Api.getAllStoriesIds();

      if (storyIds.error) throw Error(storyIds.error)

      await Promise.all(storyIds.map(async (id) => {
        const story = await Api.getStorie(id);
        posts.push(story);
      }));

      posts.sort(compareScore).reverse();

      return posts.map((p, index) => {
        return {...p, rank: index + 1}
      });

    } catch (error) {
      console.warn('err: ', error)
      return 'err: ' + error;
    }
  }

  static async getAllStoriesIds () {
    return new Promise((resolve, reject) => {
      fetch('https://hacker-news.firebaseio.com/v0/beststories.json')
      .then(res => res.json())
      .then(data => resolve(data))
      .catch(reject)
    })
  }

  static async getStorie (id) {
    return new Promise((resolve, reject) => {
      fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json`)
      .then(res => res.json())
      .then(data => resolve(data))
      .catch(reject)
    })
  }

}

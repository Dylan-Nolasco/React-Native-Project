import database from '@react-native-firebase/database';

export default class Firebase {
  /**
   *
   * @returns
   */
  static getPosts() {
    return database()
      .ref('posts')
      .once('value')
      .then(snapshot => {
        const posts = [];
        snapshot.forEach(childSnapshot => {
          posts.push({
            id: childSnapshot.key,
            ...childSnapshot.val(),
          });
        });
        return posts;
      });
  }

  /**
   * 
   * @param {*} postId 
   * @returns 
   */
  static getPost(postId) {
    return database()
      .ref(`posts/${postId}`)
      .once('value')
      .then(snapshot => {
        return {
          id: snapshot.key,
          ...snapshot.val(),
        };
      });
  }

  /**
   * 
   * @param {*} text 
   * @returns 
   */
  static createPost(text) {
    const content = {
      text,
      image: 'https://picsum.photos/200/300',
      likesCount: 0,
      commentsCount: 0,
      sharesCount: 0,
      user: {
        id: 1,
        name: 'Dylan Nolasco',
        username: '@dylkibot',
        avatar: 'https://avatars.githubusercontent.com/u/26236080?v=4',
      },
      comments: [],
    };

    return database()
      .ref('posts')
      .push(content)
      .then((snapshot) => {
        return {
          id: snapshot.key,
          ...content,
        };
      });
  }

  /**
   * 
   * @param {*} postId 
   * @param {*} content 
   * @returns 
   */
  static updatePost(postId, content) {
    return database()
      .ref(`posts/${postId}`)
      .set(content)
      .then(() => {
        console.log('Post updated!');
        return content;
      });
  }
}

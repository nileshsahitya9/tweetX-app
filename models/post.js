import moment from "moment";

class Post {
  constructor(id, post, name, date) {
    this.id = id;
    this.userPost = post;
    this.userName = name;
    this.date = date;
  }

  get readableDate() {
    return moment(this.date).fromNow();
  }
}

export default Post;

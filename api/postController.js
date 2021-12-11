import { PostsControllerURLS } from "../utils/urls";


export const getAllPosts = async () => {
  const value = await fetch(PostsControllerURLS.getAllPosts)
    .then((res) => {
      if (res.status == 200) return res.json();
      return null;
    })
    .catch((ex) => {
      console.error("getAllPosts ex", ex);
      return null;
    });
  return value;
};


export const DeletePost = async (postId) => {
  const value = await fetch(PostsControllerURLS.DeletePost + postId, {
    method: "DELETE",
  }).then((res) => {
    if (res.status === 200) return res.json();
    else return null;
  });
  return value;
};


export const GetPostById = async (id) => {
  const value = await fetch(PostsControllerURLS.PostsOfPartnersByUserId + id)
    .then((res) => {
      if (res.status == 200) return res.json();
      return null;
    })
    .catch((ex) => {
      console.error("getAllPostsByUserId ex", ex);
      return null;
    });
  return value;
};
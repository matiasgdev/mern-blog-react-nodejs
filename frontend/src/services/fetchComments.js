const API_URL = 'http://localhost:4000/api/post/'

export default function fetchComments({ commentId, postId }) {

  return window
    .fetch(`${API_URL}/${postId}/${commentId}`)
    .then(res => { if(res.ok) return res.json() })
    .then(data => data)
    .catch(e => console.log(e))

}
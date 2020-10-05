const URL_NEW_POST = `http://localhost:4000/api/post/`


export default function useFetchPost({ payload } = {}) {
  
  const config = {
    method: 'POST',
    body: payload
  }
  
  return fetch(URL_NEW_POST, config)
    .then(res =>  res.json())
    .then((data) => data)
    .catch(err => {
      return err
    })
}
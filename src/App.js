import { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {

  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');

  useEffect(() => {

    axios.get(" http://localhost:3001/posts")
      .then(response => setComments(response.data))
      .catch(error => console.error('Error fetching comments:', error));
  }, []);

  const handlePost = () => {

    axios.post('http://localhost:3001/posts', { text: newComment })
      .then(response => {

        setComments([...comments, response.data]);
        setNewComment(''); // Clear the input field
      })
      .catch(error => console.error('Error posting comment:', error));
  };

  const Deleteid = (id) => {
    axios.delete('http://localhost:3001/posts')((res) => {
      console.log(res);
    })
  }

  return (
    <div>
      <div>
        <input
          type="text"
          placeholder="New Comment"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
        />
        <button onClick={handlePost}>Post</button>
      </div>
      <div>
        {comments?.map((comment) => (
          <div key={comment.id}>
            <div className='span'>
              <span>{comment.text}</span>
              <button onClick={Deleteid}>delete</button>
            </div>
          </div>

        ))}
      </div>
    </div>
  );
};


export default App;
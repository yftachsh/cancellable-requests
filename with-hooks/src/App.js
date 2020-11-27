import { useState, useEffect } from 'react';

const getUrl = userId => {
    if (userId.length === 0) return 'http://jsonplaceholder.typicode.com/posts';
    return `http://jsonplaceholder.typicode.com/posts?userId=${userId}`;
}

function App() {
    /**
     * If you'd like to test how this works for yourself, make sure you enable throttling
     * within the browser's developer tools
     */

    const [userId, setUserId] = useState('');
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        let isCanceled = false;
        fetch(getUrl(userId))
        .then(response => response.json())
        .then(data => {
            if (!isCanceled) {
                console.log(`setting data userId=${userId}`);
                setPosts(data);
            }
        })
        .catch(console.error);

        return () => isCanceled = true;
    }, [userId]);

    return (
        <div className="App">
            <input  className='search-term'
                    value={userId}
                    onChange={({ target }) => setUserId(target.value)}
                    placeholder='Enter user ID...' />
            <div className="results">
                {
                    posts.map(post => {
                        const {
                            id,
                            title,
                            body
                        } = post;

                        return (
                            <div className='post' key={id}>
                                <div className='title'>{title}</div>
                                <div className='body'>{body}</div>
                            </div>
                        );
                    })
                }
            </div>
        </div>
    );
}

export default App;

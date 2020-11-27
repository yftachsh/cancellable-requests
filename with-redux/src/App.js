import { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import post from './actions/post';

const mapStateToProps = state => ({
    posts: state.post.posts
});

const mapDispatchToProps = dispatch => ({
    loadPosts: userId => dispatch(post.loadPosts(userId))
});

function App({
    loadPosts,
    posts,
}) {
    const [userId, setUserId] = useState('');

    useEffect(() => {
        loadPosts(userId);
    }, [loadPosts, userId]);

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

export default connect(mapStateToProps, mapDispatchToProps)(App);

import PostsContainer from './components/PostsContainer';
import PostCreation from './components/PostCreation';
import { useState } from 'react';
import './style.css'

function App() {
    const [posts, setPosts] = useState([]);
    const [creatingPost, setCreatingPost] = useState(false);
    const [viewingPost, setViewingPost] = useState(false);

    const cancelPostCreationState = () =>{
        setCreatingPost(false);
    }

    const isViewingPost = (isViewingPost: boolean) => {
        setViewingPost(isViewingPost)
    }

    return (
        <>
            <div className="black"
            id="page-header">
                <div className="drop-shadow-red header-content">
                    <p className="large-text">Forum Page</p>
                    {!viewingPost
                    ? <button onClick={() => setCreatingPost(true)} className="orange medium-button"> Create Post</button>
                    : <></>
                    }
                </div>
            </div>
            <div id="content-container">
                <div 
                className="black"
                id="side-bar">
                    {!viewingPost
                    ? <></>
                    : <button onClick={() => isViewingPost(false)}className="orange large-button side-content">Return</button>
                    }
                </div>
                    <PostsContainer 
                    posts={posts}
                    setPosts={setPosts}
                    cancelPostState={cancelPostCreationState} 
                    setViewingPost={isViewingPost} 
                    viewingPost={viewingPost}
                    />
                <div 
                className="black" 
                id="side-bar">
                    {creatingPost
                    ? <PostCreation 
                    setPosts={setPosts}
                    cancelPostState={cancelPostCreationState}
                    /> 
                    : <></>
                    }
                </div>
            </div>
        </>
    );
}

export default App

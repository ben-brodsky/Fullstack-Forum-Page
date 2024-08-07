import {useEffect, useState} from 'react';
import PostThumbnails from './PostThumbnails';
import PostObject from './PostObject'
import PostFallback from './PostFallback'
import Axios from "axios";
import { Suspense } from 'react';

interface Props {
    setViewingPost: Function
    viewingPost: Boolean
    cancelPostState: Function
}

function PostsContainer({setViewingPost, cancelPostState, viewingPost} : Props) {
    const [posts, setPosts] = useState([]);
    const [selectedPost, setSelectedPost] = useState(-1)
    const [scrollPosition, setScrollPosition] = useState(0);

    useEffect(() => {
        window.scrollTo(0, 0)
        Axios.get("http://localhost:8080/posts").then((res) => {
            const posts = res.data.posts;
            setPosts(posts);
        })
    }, [])

    const handlePostClick = (id: number) => {
        setScrollPosition(window.scrollY)
        setSelectedPost(id);
        setViewingPost(true);
    }

    let postsNewest = posts.slice(0).reverse();

    return(
        <>
        {!viewingPost 
        
        ?
        <>
        <ul id="posts-container">
        <PostThumbnails 
        posts={postsNewest}
        handlePostClick={handlePostClick}
        scrollPosition={scrollPosition}/>
        </ul>
        </>
        :
        <>
        <PostObject 
        id={selectedPost}
        cancelPostState={cancelPostState}
        />
        </>
        }
        </>
    );
}   

export default PostsContainer
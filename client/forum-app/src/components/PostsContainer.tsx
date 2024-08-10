import {useEffect, useState} from 'react';
import PostThumbnails from './PostThumbnails';
import FullPost from './FullPost'
import Axios from "axios";

interface Props {
    posts: Array<Object>
    setPosts: Function
    setViewingPost: Function
    viewingPost: Boolean
    cancelPostState: Function
}

let postsNewest:Array<Object> = []

function PostsContainer({setViewingPost, cancelPostState, viewingPost, posts, setPosts} : Props) {
    const [selectedPost, setSelectedPost] = useState(BigInt(-1))
    const [scrollPosition, setScrollPosition] = useState(0);

    useEffect(() => {
        Axios.get("http://localhost:8080/posts").then((res) => {
            const posts = res.data.posts;
            setPosts(posts);
            postsNewest = posts.slice(0).reverse();
        })
    }, [posts])

    const handlePostClick = (id: bigint) => {
        setScrollPosition(window.scrollY)
        setSelectedPost(id);
        setViewingPost(true);
    }

    return(
        <>
        {!viewingPost 
        ?
        <>
        <ul id="posts-container">
            <PostThumbnails 
            posts={postsNewest}
            handlePostClick={handlePostClick}
            scrollPosition={scrollPosition}
            />
        </ul>
        </>
        :
        <>
            <FullPost 
            id={selectedPost}
            cancelPostState={cancelPostState}
            />
        </>
        }
        </>
    );
}   

export default PostsContainer
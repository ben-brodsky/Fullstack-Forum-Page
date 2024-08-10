import { useEffect } from "react"

interface Props{
    handlePostClick: Function
    posts: Array<any>
    scrollPosition: number
}

function PostThumbnails({posts, handlePostClick, scrollPosition}: Props) {

    useEffect(() => {
        window.scrollTo(0, scrollPosition)
    }, [])

    return (
        <>
         {posts.map((post) =>(
            <li id="thumbnail-item" key={post.ID} onClick={() => handlePostClick(post.ID)} data-value={post.ID}>
                <div className="white drop-shadow"id="post-thumbnail">
                    <p className="gray small-text black-text" id="post-username">{post.Username}</p>
                    <p className="gray medium-text black-text bold-text" id="post-title">{post.Title}</p>
                </div>
            </li>
        ))}
        </>
    );
}

export default PostThumbnails
import {useEffect, useState} from 'react';
import CommentList from './CommentList';
import Axios from "axios";

interface Props{
    id: bigint
    cancelPostState: Function
}

const commentSubmit = async (event:any, setComments:Function, postID:bigint, parentID:Number) => {
    event.preventDefault();
    if (event.target[0].value != ""){
        const contents = event.target[0].value;
        event.target[0].value = "";
        const res = await Axios.post("http://localhost:8080/post/" + postID + "/" + parentID, {contents:contents})
        console.log(contents)
        setComments((comments:any) => [...comments, res])
    }
}

function FullPost({id, cancelPostState}: Props) {
    const [currentPost, setCurrentPost] = useState({Username:"", Title:"", Contents:"", ID:BigInt(0)})
    const [comments, setComments] = useState([]);

    useEffect( () => {
        window.scrollTo(0, 0);
    }, [])

    useEffect( () => {
        Axios.get("http://localhost:8080/post/" + id).then((res) => {
            setCurrentPost({Username: res.data.post.Username, 
                            Title: res.data.post.Title, 
                            Contents: res.data.post.Contents,
                            ID: res.data.post.ID});
            let commentsNewest = res.data.comments.slice(0).reverse();
            setComments(commentsNewest)
            cancelPostState()
        })
    }, [comments])
    

    return (
        <>
        <div id="full-post-container">
            <div className="white drop-shadow post">
                <p className="gray black-text small-text" id="post-username">{currentPost["Username"]}</p>
                <p className="gray black-text bold-text" id="post-title">{currentPost["Title"]}</p>
                <p className="black-text" id="post-content">{currentPost["Contents"]}</p>
                <div id="comment-form">
                    <form onSubmit={(event) => commentSubmit(event, setComments, currentPost["ID"], 0)} id="comment-form">
                        <textarea placeholder={"Add a Comment"} className="black comment"></textarea>
                        <button className="medium-button orange comment-form" type="submit">Comment</button>
                    </form>
                </div>
            </div>  
            <CommentList 
            key={currentPost["ID"]}
            comments={comments}
            setComments={setComments}
            currentPostID={currentPost["ID"]}
            />
        </div>
        </>
    );
}

export default FullPost
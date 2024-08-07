import {useEffect, useState} from 'react';
import Axios from "axios";

interface Props{
    id: number
    cancelPostState: Function
}

function PostObject({id, cancelPostState}: Props) {
    const [username, setUsername] = useState('');
    const [title, setTitle] = useState('');
    const [contents, setContents] = useState('');

    useEffect( () => {
        Axios.get("http://localhost:8080/post/" + id).then((res) => {
            window.scrollTo(0, 0)
            const post = res.data.post;
            setTitle(post.Title)
            setUsername(post.Username)
            setContents(post.Contents)
            cancelPostState()
        })
    }, [])

    return (
        <>
            <div className="white drop-shadow" id="post-object">
                <p className="gray black-text small-text" id="post-username">{username}</p>
                <p className="gray black-text bold-text" id="post-title">{title}</p>
                <p className="black-text"id="post-content">{contents}</p>
                <div id="comment-form">
                    <form>
                        
                    </form>
                </div>
            </div>  
        </>
    );
}

export default PostObject
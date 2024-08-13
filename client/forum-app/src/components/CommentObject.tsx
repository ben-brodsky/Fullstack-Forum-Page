import {useEffect, useState} from 'react';
import Axios from "axios";

interface Props {
    treeDepth: number
    comment: {ID:0, Username:"", Contents:"", ParentID:0}
    setComments: Function
    currentPostID: bigint
}

function CommentObject({comment, setComments, currentPostID, treeDepth} : Props) {
    const [localDepth, setLocalDepth] = useState(0);

    const replySubmit = async (event:any, setComments:Function, postID:bigint, parentID:Number) => {
        event.preventDefault();
        if (event.target[0].value != ""){
            const contents = event.target[0].value;
            event.target[0].value = ""; 
            const res = await Axios.post("http://localhost:8080/post/" + postID + "/" + parentID, {contents:contents});
            setComments((comments:any) => [...comments, res]);
        }
    }

    useEffect( () => {
        setLocalDepth(treeDepth)
    }, [])

    return(
    <>
        {localDepth <= 6 &&
        <div className="comment white drop-shadow">
            <p className="gray small-text black-text bold-text" id="post-username">{comment["Username"]}</p>
            <p className="comment black-text" id="post-content">{comment["Contents"]}</p>
            <div>
                <form key={currentPostID} onSubmit={(event) => replySubmit(event, setComments, currentPostID, comment["ID"])} id="reply-form">
                    <textarea key={currentPostID} placeholder="Add a Reply"className="black comment"></textarea>
                    <button className="medium-button orange comment-form" type="submit">Reply</button>
                </form>
            </div>
        </div>
        }
    </>
    );
}   

export default CommentObject
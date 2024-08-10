import { useEffect } from "react"
import ReplyList from "./ReplyList";
import Axios from "axios";

interface Props{
    comments: Array<any>
    setComments: Function
    currentPostID: bigint
}

function CommentList({comments, setComments, currentPostID}: Props) {

    const replySubmit = async (event:any, setComments:Function, postID:bigint, parentID:Number) => {
        event.preventDefault();
        if (event.target[0].value != ""){
            const contents = event.target[0].value;
            event.target[0].value = ""; 
            const res = await Axios.post("http://localhost:8080/post/" + postID + "/" + parentID, {contents:contents});
            setComments((comments:any) => [...comments, res]);
        }
    }

    return (
        <>
         <ul className="comment">
            {comments.map((comment) =>( 
            <li key={comment["ID"]} className="comment" id="comment-item" data-value={comment["ID"]}>
                <div className="comment white drop-shadow">
                    <p className="gray small-text black-text bold-text" id="post-username">{comment["Username"]}</p>
                    <p className="comment black-text" id="post-content">{comment["Contents"]}</p>
                    <div>
                    <form onSubmit={(event) => replySubmit(event, setComments, currentPostID, comment["ID"])} id="reply-form">
                        <textarea placeholder="Add a Reply"className="black comment"></textarea>
                        <button className="medium-button orange comment-form" type="submit">Reply</button>
                    </form>
                </div>
                </div>
                {comment["Replies"]?.length
                ? <ReplyList
                    key={currentPostID}
                    comments={comment["Replies"]}
                    setComments={setComments}
                    currentPostID={currentPostID}
                 />
                : <></>
                }
            </li>
            ))}
            </ul>
        </>
    );
}

export default CommentList
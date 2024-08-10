import { useEffect } from "react"
import Axios from "axios";

interface Props{
    key: bigint
    comments: Array<any>
    setComments: Function
    currentPostID: bigint
}

function ReplyList({comments, setComments, currentPostID}: Props) {

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
         <ul key={currentPostID}id="nested-ul">
            {comments.map((comment) =>(
            <li className="comment" id="comment-item" key={comment["ID"]} data-value={comment["ID"]}>
                <div className="comment white drop-shadow">
                    <p className="gray small-text black-text bold-text" id="post-username">{comment["Username"]}</p>
                    <p className="black-text comment" id="post-content">{comment["Contents"]}</p>
                    <div className="">
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

export default ReplyList
import CommentObject from "./CommentObject";
import ReplyList from "./ReplyList";

interface Props{
    comments: Array<any>
    setComments: Function
    currentPostID: bigint
}

function CommentList({comments, setComments, currentPostID}: Props) {
    return (
        <>
         <ul className="comment">
            {comments.map((comment) =>( 
            <li key={comment["ID"]} className="comment" id="comment-item" data-value={comment["ID"]}>
                <CommentObject 
                treeDepth={0}
                comment={comment}
                setComments={setComments}
                currentPostID={currentPostID}
                /> 
                {comment["Replies"]?.length
                ? <ReplyList
                    treeDepth={1}
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
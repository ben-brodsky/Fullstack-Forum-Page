import { useEffect, useState } from "react"
import CommentObject from "./CommentObject";

interface Props{
    treeDepth: number
    comments: Array<any>
    setComments: Function
    currentPostID: bigint
}

function ReplyList({comments, setComments, currentPostID, treeDepth}: Props) {
    const [commentsNewest, setCommentsNewest] = useState(Array<any>)

    useEffect(() => {
        setCommentsNewest(comments.slice(0).reverse());
    }, [comments])

    return (
        <>
         <ul key={currentPostID}id="nested-ul">
        {commentsNewest.map((comment) => (
            <li className="comment" id="comment-item" key={comment["ID"]} data-value={comment["ID"]}>
                <CommentObject
                treeDepth={treeDepth}
                comment={comment}
                setComments={setComments}
                currentPostID={currentPostID}
                /> 
                {comment["Replies"]?.length != 0 && treeDepth <= 6 &&
                <ReplyList
                    treeDepth={treeDepth + 1}
                    comments={comment["Replies"]}
                    setComments={setComments}
                    currentPostID={currentPostID}
                />
                }
            </li>
        ))}
        {treeDepth > 6 &&
        <button style={{color:"black", marginBottom:"10px"}} className="medium-button white drop-shadow">Expand Comments</button>
        }
        </ul>
        </>
    );
}

export default ReplyList
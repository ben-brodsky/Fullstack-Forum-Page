import Axios from "axios";

interface Props {
    cancelPostState: Function
}

const handleSubmit = async (event:any) => {
    const title = event.target[0].value;
    const content = event.target[1].value;
    const res = await Axios.post("http://localhost:8080/post", {title:title, content:content})
    console.log(res)
}

function PostCreation({cancelPostState}: Props) {
    return (
        <>
            <div className="white drop-shadow"id="post-creation-page">
                <div id="post-creation-page-content">
                <p style={{marginTop:"10px", fontWeight:"bold"}}className="large-text black-text">Create Post</p>
                <form onSubmit={(event) => handleSubmit(event)}>
                    <div style={{paddingLeft:"10px", paddingTop:"5px", marginBottom:"10px"}}className="gray drop-shadow">
                        <p className="medium-text black-text bold-text">Title</p>
                        <textarea className="black"id="create-post-title"></textarea>
                    </div> 
                    <div style={{paddingLeft:"10px", paddingTop:"5px", marginBottom:"10px"}}className="gray drop-shadow">
                        <p className="medium-text black-text bold-text">Body</p>
                        <textarea className="black"id="create-post-body"></textarea>
                    </div>  
                    <button 
                        style={{marginLeft:"0px"}} 
                        className="medium-button orange" 
                        type="submit">Submit Post</button>
                </form>
                <button 
                    onClick={(event) => cancelPostState(event)}
                    style={{marginLeft:"0px", marginTop:"10px"}} 
                    className="medium-button orange" 
                    type="submit">Cancel</button>
                </div>
            </div>
        </>
    );
}

export default PostCreation
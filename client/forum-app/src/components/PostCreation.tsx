import Axios from "axios";

interface Props {
    cancelPostState: Function
    setPosts: Function
}

const handleSubmit = async (event:any, setPosts:Function, cancelPostState:Function) => {
    event.preventDefault();
    window.scrollTo(0,0)
    const title = event.target[0].value;
    const content = event.target[1].value;
    const res = await Axios.post("http://localhost:8080/post", {title:title, content:content})
    setPosts((posts:any) => [...posts, res])
    cancelPostState()
}

function PostCreation({cancelPostState, setPosts}: Props) {
    return (
        <>
            <div className="white drop-shadow"id="post-creation-page">
                <div id="post-creation-page-content">
                <p style={{marginTop:"10px", fontWeight:"bold"}}className="large-text black-text">Create Post</p>
                <form onSubmit={(event) => handleSubmit(event, setPosts, cancelPostState)}>
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
export default function PageAttributes(props) {
    return (
        <div className="w-100">
            <h5>Page Attributes</h5>
            <form>
                <div className="form-group">
                    <label htmlFor="inputTitle" className="mb-1">Title</label>
                    <input type="text" value={props.pageInfo["title"]} onChange={(e)=>props.updatePageInfo("title",e.target.value)} className="form-control" id="inputTitle" placeholder="Type title here..." />
                </div>
                <div className="form-group">
                    <label htmlFor="inputMetaDescription" className="mb-1">Excerpt</label>
                    <textarea value={props.pageInfo["excerpt"]} onChange={(e)=>props.updatePageInfo("excerpt",e.target.value)} rows="3" maxLength="180" type="text" className="form-control resizeNone" id="inputMetaDescription" aria-describedby="metaDescriptionHelp" placeholder="Type Excerpt here..." />
                    <small id="metaDescriptionHelp" className="form-text text-muted">Enter a short description of your post under 160-180 words</small>
                </div>
                <div className="form-group">
                    <label htmlFor="inputTags" className="mb-1">Tags</label>
                    <input type="text" value={props.pageInfo["tags"]} onChange={(e)=>props.updatePageInfo("tags",e.target.value)} className="form-control" id="inputTags" aria-describedby="tagsHelp" placeholder="Tags separated by commas" />
                    <small id="tagsHelp" className="form-text text-muted">Enter tags separated by commas</small>
                </div>
                <div className="form-group">
                    <label htmlFor="inputFeautredImage" className="mb-1">Feautred Image</label>
                    <input type="text" value={props.pageInfo["feautredImage"]} onChange={(e)=>props.updatePageInfo("feautredImage",e.target.value)} className="form-control" id="inputFeautredImage" aria-describedby="feautredImageHelp" placeholder="Image Link here..." />
                    <img className="img-fluid form-text" src={props.pageInfo["feautredImage"]}/>
                </div>
            </form>
        </div>
    )
}
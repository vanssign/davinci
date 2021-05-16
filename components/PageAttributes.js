export default function PageAttributes() {
    return (
        <div className="w-100">
            <h5>Page Attributes</h5>
            <form>
                <div className="form-group">
                    <label htmlFor="inputTitle" className="mb-1">Title</label>
                    <input type="text" className="form-control" id="inputTitle" placeholder="Type title here..." />
                </div>
                <div className="form-group">
                    <label htmlFor="inputMetaDescription" className="mb-1">Excerpt</label>
                    <textarea rows="3" maxLength="180" type="text" className="form-control resizeNone" id="inputMetaDescription" aria-describedby="metaDescriptionHelp" placeholder="Type Excerpt here..." />
                    <small id="metaDescriptionHelp" class="form-text text-muted">Enter a short description of your post under 160-180 words</small>
                </div>
                <div className="form-group">
                    <label htmlFor="inputTags" className="mb-1">Tags</label>
                    <input type="text" className="form-control" id="inputTags" aria-describedby="tagsHelp" placeholder="Tags separated by commas" />
                    <small id="tagsHelp" class="form-text text-muted">Enter tags separated by commas</small>
                </div>
                <div className="form-group">
                    <label htmlFor="inputFeautredImage" className="mb-1">Feautred Image</label>
                    <input type="text" className="form-control" id="inputFeautredImage" aria-describedby="feautredImageHelp" placeholder="Image Link here..." />
                    <img className="img-fluid form-text" src="https://www.oberlo.com/media/1603954915-copy-of-blog-header-image-880x450-5-min.jpg?fit=max&fm=jpg&w=1824"/>
                </div>
                <button type="submit" disabled className="btn btn-primary-x btn-block">Publish</button>
            </form>
        </div>
    )
}
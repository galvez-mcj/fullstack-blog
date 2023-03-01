export default function Blog() {
    return (
        <div className="blog">
            <img className="blog-img" src="https://images.unsplash.com/photo-1677566133417-a86d5eb7fab0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80" />
            <div className="blog-content">
            <h2 className="blog-title">Bad luck go away!</h2>
            <p className="blog-info">
                <a className="blog-author">Tinay Galvez</a> 
                <time>2023-02-28 16:34</time>
            </p>
            <p className="blog-summary">Lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum.</p>
            </div>
        </div>
    )
}
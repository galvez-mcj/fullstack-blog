import { useState } from 'react'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'

const modules = {
    toolbar: [
      [{ 'header': [1, 2, false] }],
      ['bold', 'italic', 'underline','strike', 'blockquote'],
      [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
      ['link', 'image'],
      ['clean']
    ],
}

const formats = [
    'header',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'indent',
    'link', 'image'
]

export default function CreatePost() {
    const [title, setTitle] = useState('');
    const [summary, setSummary] = useState('');
    const [content, setContent] = useState('');
    const [files, setFiles] = useState('');
    const [redirect, setRedirect] = useState(false);

    function handleSubmit(event) {
        event.preventDefault()
        
    }

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text" 
                placeholder="Title"
                name="title"
                onChange={event => setTitle(event.target.value)}
                value={title}/>
            <input 
                type="text" 
                placeholder="Summary"                
                name="summary"
                onChange={event => setSummary(event.target.value)}
                value={summary}
                />
            <input 
                type="file" 
                onChange={event => setFiles(event.target.files)}/>
            <ReactQuill 
                name="content"
                onChange={newValue => setContent(newValue)}
                value={content}
                modules={modules}
                formats={formats}/>
            <button className="blog-btn">Create blog post</button>
        </form>
    )
}
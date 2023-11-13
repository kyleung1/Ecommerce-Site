const Contact = () => {
    
    return (
        <div>
            <h2>Contact page</h2>
            <ul className = "contactLinks">
                <a href = "https://www.linkedin.com/in/kyle-leung412/"><img className = "linkedIcon" src = {require('../images/LinkedIn.webp')}></img></a>
                <a href = "https://github.com/kyleung1"><img className = "gitIcon" src = {require('../images/Github.png')}></img></a>
            </ul>
        </div>
    );
}

export default Contact;
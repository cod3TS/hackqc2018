import React from "react";

class Chat extends React.Component {
    componentDidMount() {
        (function() {
            // DON'T EDIT BELOW THIS LINE
            var d = document,
                s = d.createElement("script");
            s.src = "https://hackqc.disqus.com/embed.js";
            s.setAttribute("data-timestamp", +new Date());
            (d.head || d.body).appendChild(s);
        })();
    }
    render() {
        return <div id="disqus_thread" />;
    }
}

export default Chat;

#/usr/bin/python3
from flask import Flask, session
import xmltodict
import requests
import pprint
import json
app = Flask(__name__)

app.secret_key = 'SdkndKXZCNN8WEHH1293HFAKASDHasdasd'

@app.route('/api/news')
def news():
    articles = []
    xml = requests.get("https://news.google.com/news/rss/search/section/q/inondations/inondations?hl=fr-CA&gl=CA&ned=fr_ca").text
    article_array = xmltodict.parse(xml)["rss"]["channel"]["item"]

    for article in article_array:
        title = article["title"]
        url   = article["link"]
        description = article["description"]

        start = description.find("<img src=")+10
        end   = description.find('"', start)
        urlToImg = description[start:end]
        articles.append({"title": title, "url": url, "urlToImg": urlToImg})

    return json.dumps(articles)


if __name__ == '__main__':
    app.run(port=4000, debug=True)


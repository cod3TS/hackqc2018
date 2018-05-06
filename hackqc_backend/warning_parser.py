#!/usr/bin/python2
import requests
import json

target    = "http://www.quebec511.info/en/diffusion/etatreseau/avertissements.aspx"
response  = requests.get(target).text
start     = response.find('class="titreRegion"')+40
result    = []

index = 0
while True:
    start = response.find('class="titreRegion"', start)+40
    region_end = response.find('</td>', start)
    if start == -1 + 40:
        break



    print(response[start:end])
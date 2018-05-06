#!/usr/bin/env python
# -*- coding: utf-8 -*-
from flask import Flask
import pandas
import geopandas as gp
import json
from shapely.geometry import Polygon
app = Flask(__name__)

@app.route("/quebec/zone_inondable")
def quebec():
    data = pandas.read_csv('data/ziquebec.csv')
    loc = []
    for num in range(0, len(data)):
        row = data.iloc[num][0].replace('POLYGON ((', '').replace(')', '').replace('(', '').strip()
        res = []
        for rec in row.split(','):
            res.append(list(reversed([float(val) for val in rec.split()])))
        loc.append({res})
    return json.dumps(loc)

@app.route("/sherbrooke/zone_inondable")
def sherbrooke():
    data = pandas.read_csv('data/zisherbrooke.csv')
    loc = []
    for num in range(0, len(data)):
        row = data.iloc[num][4].replace('POLYGON ((', '').replace('MULTI', '').replace(')', '').replace('(', '').strip()
        res = []
        for rec in row.split(','):
            res.append(list(reversed([float(val) for val in rec.split()])))
        loc.append(res)
    return json.dumps(loc)

@app.route("/quebec/inondation")
def inondation():
    payload = {}
    file = '050904';
    data = pandas.read_csv('data/%s.txt' % file)
    payload[file] = []
    for num in range(0, len(data)):
        payload[file].append({"debit": data.iloc[num][2], "date": data.iloc[num][1]})
    file = '050915';
    data = pandas.read_csv('data/%s.csv' % file)
    payload[file] = []
    for num in range(0, len(data)):
        payload[file].append({"debit": data.iloc[num][2], "date": data.iloc[num][1]})
    payload['inondations'] = {}
    payload['inondations']["quebec"] = {
        "date_observation": "2017\/05\/18 00:00:00",
        "severity": "normale",
        "geometry": {"type": "Point", "coordinates": [46.801783368329254, -71.209886382005337]}
    }
    return json.dumps(payload)


# { "type": "Feature", "properties": { "date_observation": "2017\/05\/18 00:00:00", "code_municipalite": "23027", "nom": "Québec", "coordonnee_x": -71.209886382005337, "coordonnee_y": 46.801783368329318, "urgence": "Passée", "certitude": "Observé", "type": "Inondation", "severite": "Normale", "etat": "Actuel", "imprecision": "localisation" }, "geometry": { "type": "Point", "coordinates": [ -71.209886382005337, 46.801783368329254 ] } },

if __name__ == "__main__":
    app.run(host='0.0.0.0')

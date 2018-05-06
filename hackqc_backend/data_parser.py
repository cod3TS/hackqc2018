#!/usr/bin/python2
import requests
import json

target    = "https://geoegl.msp.gouv.qc.ca/adnv2/"
response  = requests.get(target).text
start     = response.find("<tbody")
tbody_end = response.find("</tbody>", start)
result    = []

index = 0
while start != -1 and start < tbody_end:
    name_start  = response.find("'>", start) + 2
    name_end    = response.find("</", name_start)
    state_start = response.find("'>", response.find("'>", name_end)+2)+2
    state_end   = response.find("</", state_start)
    delta_start = response.find("<br>", state_end) + 4
    delta_end   = response.find("</", delta_start)

    if name_start == 1:
        break

    name      = response[name_start:name_end].strip()
    state     = response[state_start:state_end].strip()
    tendance  = response[delta_start:delta_end].strip()
    state_val = 0
    variation = 0 if tendance == "En baisse" else 1

    if state == "Inondation majeure":
        state_val = 3
    elif state == "Inondation moyenne":
        state_val = 2
    elif state == "Inondation mineure":
        state_val = 1
    else:
        state_val = 0

    result.append({"name": name, "state": state_val, "variation": variation})
    start = response.find("</tr>", name_start)

print(json.dumps(result))
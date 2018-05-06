import React, { Component } from "react";
import "./Map.css";

import FlatButton from "material-ui/FlatButton";
import HeatmapLayer from "react-google-maps/lib/components/visualization/HeatmapLayer";
import {
    withScriptjs,
    withGoogleMap,
    GoogleMap,
    Polygon,
    Marker,
    Circle
} from "react-google-maps";
import Dialog from "material-ui/Dialog";

import { getPositionFromAddress } from "../../services/geocode";

import polygons from "../../assets/polygons.json";
import hydrometrie from "../../assets/hydrometrie.json";

/*const hydro = Promise.all(
    hydrometrie.map(hydro =>
        getPositionFromAddress(hydro.name + ", QC").then(r => {
            if (r.status === "OK") {
                return {
                    ok: true,
                    name: r.results[0].formatted_address,
                    state: hydro.state,
                    variation: hydro.variation,
                    location: r.results[0].geometry.location
                };
            }
            return {
                ok: false,
                name: hydro.name,
                state: hydro.state,
                variation: hydro.variation,
                location: { lat: "?", lng: "?" }
            };
        })
    )
)
    .then(r => r.filter(r => r.ok === true))
    .then(r => r.map(x => {
        delete x.ok;
        return x;
    }))*/

navigator.geolocation.getCurrentPosition = success => {
    return success({
        coords: {
            latitude: 46.8700755,
            longitude: -71.3859498
        }
    });
};

const poly_array = polygons.map(poly =>
        poly.map(p => ({ lat: p[1], lng: p[0] }))
    ),
    polys = [];
poly_array.forEach(poly => polys.push(poly));

console.log(hydrometrie);

class MapRender extends Component {
    constructor() {
        super();
        this.state = {
            zoom: 5,
            dialogIsOpen: false,
            showMarker: true,
            heatmap: [],
            position: {
                lat: 53.5580573,
                lng: -67.8224484
            }
        };
        this.onClick = this.onClick.bind(this);
        this.handleClose = this.handleClose.bind(this);
    }

    componentWillMount() {
        const options = {
            enableHighAccuracy: true
        };

        const success = pos => {
            const crd = pos.coords;
            this.setState({
                zoom: 15,
                showMarker: true,
                heatmap: [],
                position: {
                    lat: crd.latitude,
                    lng: crd.longitude
                }
            });

            console.log("Your current position is:");
            console.log(`Latitude : ${crd.latitude}`);
            console.log(`Longitude: ${crd.longitude}`);
            console.log(`More or less ${crd.accuracy} meters.`);
        };

        const error = err => {
            console.warn(`ERROR(${err.code}): ${err.message}`);
        };

        navigator.geolocation.getCurrentPosition(success, error, options);
    }

    posIsInCircle(position) {
        hydrometrie.forEach(circle => {
            const circlePos = circle.location;
            const dist = Math.sqrt(
                Math.pow(position.lat - circlePos.lat, 2) +
                    Math.pow(position.lng - circlePos.lng, 2)
            );
            if (dist < 0.010) {
                this.setState({
                    dialogIsOpen: true
                });
            }
        });
    }

    onClick(e) {
        // this.state.heatmap.push({
        //     lat: e.latLng.lat(),
        //     lng: e.latLng.lng()
        // });
        // this.forceUpdate();
        this.setState({
            position: {
                lat: e.latLng.lat(),
                lng: e.latLng.lng()
            }
        });
        this.posIsInCircle({
            lat: e.latLng.lat(),
            lng: e.latLng.lng()
        });
    }
    handleClose() {
        this.setState({
            dialogIsOpen: false
        });
    }

    render(props) {
        const actions = [
            <FlatButton
                label="Cancel"
                primary={true}
                onClick={this.handleClose}
            />
        ];
        return (
            <React.Fragment>
                <Dialog
                    title="Alerte Inondation!"
                    actions={actions}
                    onRequestClose={this.handleClose}
                    modal={false}
                    open={this.state.dialogIsOpen}
                >
                    Inondation imminente!
                </Dialog>
                <GoogleMap
                    zoom={this.state.zoom}
                    center={this.state.position}
                    onClick={this.onClick}
                >
                    {polys.length > 0 && (
                        <Polygon
                            paths={polys}
                            onClick={this.onClick}
                            options={{
                                strokeColor: "#0061ff",
                                fillColor: "#a0c4ff",
                                strokeOpacity: 0.5,
                                strokeWeight: 1,
                                fillOpacity: 0.5
                            }}
                        />
                    )}
                    {hydrometrie.length > 0 &&
                        hydrometrie
                            .filter((hydro, i) => {
                                for (
                                    let a = 0, h = hydrometrie[a];
                                    a < hydrometrie.length;
                                    h = hydrometrie[++a]
                                ) {
                                    if (a === i) continue;
                                    if (h.name === hydro.name) {
                                        return false;
                                    }
                                }
                                return true;
                            })
                            .filter(hydro => hydro.state > 0)
                            .map((hydro, i) => (
                                <Circle
                                    key={i}
                                    onClick={this.onClick}
                                    center={
                                        new google.maps.LatLng(
                                            hydro.location.lat,
                                            hydro.location.lng
                                        )
                                    }
                                    radius={1000}
                                    options={(() => {
                                        let color = "blue";
                                        switch (hydro.state) {
                                            case 1:
                                                color = "green";
                                                break;
                                            case 2:
                                                color = "yellow";
                                                break;
                                            case 3:
                                                color = "red";
                                                break;
                                        }
                                        return {
                                            strokeColor: color,
                                            fillColor: color,
                                            strokeOpacity: 0.5,
                                            strokeWeight: 1,
                                            fillOpacity: 0.5
                                        };
                                    })()}
                                />
                            ))}
                    {this.state.heatmap.length > 0 && (
                        <HeatmapLayer
                            data={this.state.heatmap.map(
                                pos => new google.maps.LatLng(pos.lat, pos.lng)
                            )}
                        />
                    )}
                    {this.state.showMarker && (
                        <Marker position={this.state.position} />
                    )}
                </GoogleMap>
            </React.Fragment>
        );
    }
}

const MapWrapped = withScriptjs(
    withGoogleMap(props => <MapRender {...props} />)
);

export class MapComponent extends Component {
    render(props) {
        return (
            <MapWrapped
                googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=visualization,geometry,drawing,places&key=AIzaSyCyqd_OcCW9zLc8UNcfm7dfHft7meqJMuQ"
                loadingElement={
                    <div style={{ height: `calc(100vh - 64px)` }} />
                }
                containerElement={
                    <div style={{ height: `calc(100vh - 64px)` }} />
                }
                mapElement={<div style={{ height: `calc(100vh - 64px)` }} />}
                {...props}
            />
        );
    }
}

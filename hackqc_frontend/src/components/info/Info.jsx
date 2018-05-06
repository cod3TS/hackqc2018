import React from 'react';

import warning from "../../assets/warning.json"
import {
    Accordion,
    AccordionItem,
    AccordionItemTitle,
    AccordionItemBody,
} from 'react-accessible-accordion';
import 'react-accessible-accordion/dist/fancy-example.css';

class Info extends React.Component {
    constructor() {
        super();
    }

    render () {
        return (
            <Accordion>
                <AccordionItem>
                    <AccordionItemTitle>
                        <h2>Consulter les routes</h2>
                    </AccordionItemTitle>
                    <AccordionItemBody>
                        <Accordion>
                        {Object.keys(warning).map((key, i) => {
                            return (<AccordionItem key={i}>
                                <AccordionItemTitle key={i}>{key}</AccordionItemTitle>
                                <AccordionItemBody>
                                {warning[key].map((desc, i2) => <li key={i2}>{desc}</li>)}
                                </AccordionItemBody>
                            </AccordionItem>);
                        })}</Accordion>
                    </AccordionItemBody>
                </AccordionItem>
                <AccordionItem>
                    <AccordionItemTitle>
                        <h2>Trousse d'urgence de base</h2>
                    </AccordionItemTitle>
                    <AccordionItemBody>
                        <li>Eau</li>
                        <li>Aliments non périssables</li>
                        <li>Ouvre-boîte manuel</li>
                        <li>Lampe de poche</li>
                        <li>Trousse de premiers soins</li>
                        <li>Articles particuliers comme des médicaments d'ordonnance</li>
                        <li>Clés additionnelles de la voiture et la maison</li>
                        <li>Argent comptant en petites coupures</li>
                        <li>Une copie de votre plan d'urgence</li>
                        <li>Les coordonnées des personnes à contacter</li>
                    </AccordionItemBody>
                </AccordionItem>
                <AccordionItem>
                    <AccordionItemTitle>
                        <h2>Avant une inondation</h2>
                    </AccordionItemTitle>
                    <AccordionItemBody>
                        <Accordion>
                            <AccordionItem>
                                <AccordionItemTitle>
                                    <h3>Pour réduire la probabilité de dégâts causés par une inondation</h3>
                                </AccordionItemTitle>
                                <AccordionItemBody>
                                    Calfeutrez le pourtour des fenêtres du sous-sol et le bas des portes du rez-de-chaussée.
                                    Assurez-vous que les descentes pluviales rejettent l'eau à une distance suffisante de la maison pour qu'elle s\'écoule dans la direction opposée à celle-ci.
                                    Vous pourriez également installer dans votre sous-sol une pompe de puisard et des drains de plancher à clapet antiretour.
                                    N\'entreposez pas vos documents importants au sous-sol. Conservez-les sur les étages supérieurs, ce qui les prémunira contre les inondations.
                                </AccordionItemBody>
                            </AccordionItem>
                        </Accordion>
                    </AccordionItemBody>
                </AccordionItem>
            </Accordion>
        );
    }
}

export default Info

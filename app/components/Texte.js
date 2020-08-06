/* eslint-disable react/jsx-closing-tag-location */
/* eslint-disable indent */
/* eslint-disable react/jsx-indent */
/* eslint-disable react/jsx-wrap-multilines */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable react/prop-types */
import React from "react";
import {Container, Row, Col} from "react-bootstrap";

/**
 * Fonction composant permettant l'affichage d'un texte selon des props passées
 *
 * @name Header
 * @author Bruno Boissie <bruno.boissie@aviation-civile.gouv.fr>
 * @copyright (c) 2020, DSNA/DTI. All rights reserved.
 *
 * @param {Object}  props       propriétés
 * @return  {Node}      Composant
 */
const Texte = props => {
    const {title, content} = props;
    return (
        <>
            <h1>{title}</h1>
            {typeof content === "string" && <p className="text">{content}</p>}
            {typeof content === "object" && 
            <Container>
            <Row>
              <Col sm={6}>{content.c1}</Col>
              <Col sm={6}>{content.c2}</Col>
            </Row>
          </Container>}
        </>
    );
};
export default Texte;
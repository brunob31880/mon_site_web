/* eslint-disable radix */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable no-console */
/* eslint-disable require-jsdoc */
/* eslint-disable func-names */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/alt-text */
import React, { useEffect, useMemo } from "react";
import { useApp } from "./AppContext";
import Parse from 'parse'; //Import parse
import { config } from "../datas/config";
/**
 * Stateless component for back4App.
 *
 * @name Date
 * @author Bruno Boissie <bruno.boissie@aviation-civile.gouv.fr>
 * @copyright (c) 2020, DSNA/DTI. All rights reserved.
 *
 * @param {Object}	props		Incoming component properties
 * @return	{Node}		Rendered Component node
 */
const Back4AppHOC = ({ children }) => {

    const [{ user,page,article }, dispatch] = useApp();

    const hasConnecteduser = () => !(user.email === undefined);
    useEffect(() => {
        // Back4APP
        console.log("[Back4AppHOC] connection BDD");
        Parse.serverURL = 'https://parseapi.back4app.com';
        Parse.initialize(
            config.BACK4APP.Application_ID, // Application ID
            config.BACK4APP.JavaScript_key // Javascript key
        );
    }, []);

    const fillArticles = () => {
        dispatch({
            type: "setArticles",
            payload: {
                articles: []
            }
        });
        const Articles = Parse.Object.extend('Article');
        const query = new Parse.Query(Articles);
        query.find().then(
            (result) => {
                console.log("[Back4AppHOC] Articles=" + JSON.stringify(result));
                result.forEach(element => {
                    // console.log("Article="+JSON.parse(JSON.stringify(element)));
                    const { category, contenu, filecontenu } = JSON.parse(JSON.stringify(element));
                    dispatch({
                        type: "addArticle",
                        payload: {
                            article: { category, contenu, filecontenu }
                        }
                    });
                });
            },
            (error) => { console.error(error) }
        );
    }

    useMemo(() => {
        if (hasConnecteduser()) fillArticles();
    }, [user]);


    return (
        <>
            {children}
        </>
    )
};
export const getUser = () => {
    const User = Parse.Object.extend('User');
    const query = new Parse.Query(User);
    query.find().then(
        (result) => {
            console.log("[Back4AppHOC] User=" + JSON.stringify(result));
        },
        (error) => { console.error(error) }
    );
    return query;
};
export const getConnection = (email, password, onLog) => {
    Parse.User.logIn(email, password).then((user) => {
        console.log("Logging");
        onLog();
    }).catch(error => {
        console.log("Error=" + error);
    })

};

export const createArticle=(c1, c2, c3) => {
    const Article = Parse.Object.extend('Article');
    const myNewObject = new Article();

    myNewObject.set('category', c1);
    myNewObject.set('contenu', c2);
    myNewObject.set('filecontenu', c3);

    myNewObject.save().then(
        (result) => {         
            console.log('Article created', result);
            
        },
        (error) => {
          
            console.error('Error while creating Article: ', error);
        }
    );
}
export default Back4AppHOC;
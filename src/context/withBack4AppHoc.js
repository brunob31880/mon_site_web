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

//https://www.back4app.com/docs/platform/parse-server-live-query-example
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

    const [{ user, page, article }, dispatch] = useApp();

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
                     console.log("Article="+JSON.parse(JSON.stringify(element)));
                    const { objectId,category, contenu, filecontenu } = JSON.parse(JSON.stringify(element));
                    dispatch({
                        type: "addArticle",
                        payload: {
                            article: { objectId,category, contenu, filecontenu }
                        }
                    });
                });
            },
            (error) => { console.error(error) }
        );
    }

    useMemo(() => {
        if (hasConnecteduser()) {
            console.log("[Back4appHOC] user connected");
            var client = new Parse.LiveQueryClient({
                applicationId: config.BACK4APP.Application_ID,
                serverURL: 'wss://' + 'monsiteweb.b4a.io', // Example: 'wss://livequerytutorial.back4app.io'
                javascriptKey: config.BACK4APP.JavaScript_key
            });
            client.open();
            var query = new Parse.Query('Article');
            query.ascending('createdAt').limit(5);
            var subscription = client.subscribe(query);
            subscription.on('create', article => {
                console.log("On create event article");
                const { objectId,category, contenu, filecontenu } = JSON.parse(JSON.stringify(article));
                dispatch({
                    type: "addArticle",
                    payload: {
                        article: { objectId,category, contenu, filecontenu }
                    }
                });
            });
            subscription.on('delete', article => {
                console.log("On delete event article");
                const { objectId } = JSON.parse(JSON.stringify(article));
                dispatch({
                    type: "delArticle",
                    payload: {
                        objectId
                    }
                });
            });
            fillArticles();
        }
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
export const getConnection = (email, password,dispatch) => {
   
    Parse.User.logIn(email, password).then((user) => {
        console.log("Logging "+JSON.stringify(user));
        const { objectId,avatar } = JSON.parse(JSON.stringify(user));
        let messages = [];
			messages.push("Informations utiles")
			messages.push("autres informations")
			
			dispatch({
				type: "logUser",
				payload: {
					user: {
                        avatar,
                        objectId,
						messages: messages,
						email,
						token :""
					}
				}
			});		
    }).catch(error => {
        console.log("Error=" + error);
    })
};

export const testUpdateuser =(id,b64) => {
    const User = new Parse.User();
    const query = new Parse.Query(User);  
    console.log("base64="+JSON.stringify(b64));
    const { base64 } = JSON.parse(JSON.stringify(b64[0]));
    console.log("base64="+JSON.stringify(base64));
    // Finds the user by its ID
    query.get(id).then((user) => {
      // Updates the data we want
      user.set('avatar', new Parse.File("avatar", { base64 }, "image/png"));
      // Saves the user with the updated data
      user.save().then((response) => {
        console.log('Updated user', response);
      }).catch((error) => {
        console.error('Error while updating user', error);
      });
    });
}
export const deleteArticle = (id) => {
    console.log("[Back4AppHOC] Deleting=" + id);
    const Article = Parse.Object.extend('Article');
    const query = new Parse.Query(Article);
    // here you put the objectId that you want to delete
    query.get(id).then((object) => {
      object.destroy().then((response) => {      
        console.log('Deleted Article', response);
      }, (error) => {
        console.error('Error while deleting Article', error);
      });
    });
}
export const createArticle = (c1, c2, c3) => {
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
/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useState } from 'react';
import { Redirect } from "react-router";
import { useApp } from "../../context/AppContext";
import FileBase64 from 'react-file-base64';
import { testUpdateuser} from "../../context/withBack4AppHoc";
/**
 * Stateless component for React Playground management.
 *
 * @name Management
 * @author Bruno Boissie <bruno.boissie@aviation-civile.gouv.fr>
 * @copyright (c) 2020, DSNA/DTI. All rights reserved.
 * On transfert les props au sous composant pour qu'ils ai acces à la valeur de l'entête 
 * et puisse décider de leur representation dans ce cas
 * @param {Object}	props		Incoming component properties
 * @return	{Node}		Rendered Component node
 */
const Management = props => {
	const [{ page, user }] = useApp();
	const [file, setFile] = useState();
	const navToPages = () => (user.email !== undefined && page !== "management");

	const getFiles=(files)=>{
		setFile({ files: files })
		testUpdateuser(user.objectId,files);
	  }
	
	return (
		navToPages()
			? <Redirect to={page} />
			: (
				<>
					<div className="listemanagement">
						<FileBase64
							multiple={true}
							onDone={getFiles.bind(this)} />
					</div>
				</>
			)

	);
};

export default Management;

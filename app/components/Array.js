/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable react/prop-types */
import React from "react";
/*
*/
const Array = props => {
	const {datas, refdatas, title} = props;

	return (
		<>
			<caption><h1>{title}</h1></caption>
			<table className="arraytable">
				<thead>
					<tr>
						{refdatas.map(data => (
							<th className="arrayth" scope="col">{data}</th>
						))}
					</tr>
				</thead>
				<tbody>
					{datas.map(data => (
						<tr className="arraytr">
							<th className="arrayth" scope="row">{data.title}</th>
							<td>
								<a href={data.link}>
									<img className={data.image} width="120" height="75" />
								</a>
							</td>
							<td className="arraytd">{data.info}</td>
						</tr>
					))}
				</tbody>
			</table>
		</>
	);
};
export default Array;

import React from "react";
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import axiosInstance from '../utils/axios';
import {  useEffect,useState } from "react";
import { useParams } from "react-router-dom";


export default function Post() {
    const {slug}=useParams();
	const search = window.location.search;
    
    
	const [data, setData] = useState({posts:[]});

	useEffect(() => {
		axiosInstance.get('post/'+slug).then((res) => {
			setData(res.data);
			console.log(res.data);
		});
       console.log(search)
	}, []);

	return (
		<Container component="main" maxWidth="md">
			
			<div ></div>
			<div >
				<Container maxWidth="sm">
					<Typography
						component="h1"
						variant="h2"
						align="center"
						color="textPrimary"
						gutterBottom
					>
						{data.title}
					</Typography>
					<Typography
						variant="h5"
						align="center"
						color="textSecondary"
						paragraph
					>
						{data.description}
					</Typography>
				</Container>
			</div>
		</Container>
	);
}

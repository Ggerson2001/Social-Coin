import React from "react";
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import axiosInstance from '../utils/axios';
import {  useEffect,useState } from "react";
import { useParams } from "react-router-dom";
import Table from '../Components/table';
import Button from '@mui/material/Button';

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
       // eslint-disable-next-line
	}, []);

	return (
		<Container align="left" >
			
		
				
					<Typography
						component="h1"
						variant="h2"
						align="left"
						color="textPrimary"
						gutterBottom
					>
						{data.title}
					</Typography>
					<Typography
						variant="h5"
						align="left"
						color="textSecondary"
						paragraph
					>
						{data.description}
					</Typography>
                    <Typography
						variant="h5"
						align="left"
						color="textSecondary"
						paragraph
					>
						Address: {data.place}
					</Typography>
                    <Typography
						variant="h5"
						align="left"
						color="textSecondary"
						paragraph
					>
						Posted on :{data.published}
					</Typography>
                    <Typography
						variant="h5"
						align="left"
						color="textSecondary"
						paragraph
					>
						Status :{data.status}
					</Typography>
                    <Table/>
                    
				
                <Button variant="contained">Transfer Coins</Button>
		
		</Container>
	);
}

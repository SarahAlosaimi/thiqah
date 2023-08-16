import React, { useState } from 'react'
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Collapse from 'react-bootstrap/Collapse';
import "./css/styles.css"
import axios from 'axios'; // Import axios library
import { useNavigate } from "react-router-dom";


const ProgramCards = (props) => {
    const [open, setOpen] = useState(false); // for show less / show more 

    const userId = JSON.parse(localStorage.getItem('userid'));
    const naviagate = useNavigate();


    const handleEnroll = () => {
        // Make an API request to enroll the user in the selected program
        axios.post('https://graduate-program-c0d91ea2bf20.herokuapp.com/enroll', {
            userId: userId,
            programId: props.program.id
        })
            .then(response => {
                if (response.data.message == "successful") {
                    alert("You enrolled in the program successfully! ");
                    localStorage.setItem('pID', 'in'); // Set the session flag

                    naviagate('/StudentDashBoard');
                }


            })
            .catch(error => {
                console.error('Error enrolling:', error);
            });
    };






    return (
        <Col key={props.index}>
            <Card className='borderCard'>
                <Card.Header className='text-center h5 cardHeader text-white'>{props.program.title}</Card.Header>
                <Card.Body>
                    <Card.Text>
                        <div>
                            <span>Level of Study: </span>
                            <span className='text-muted'>{props.program.level}</span>
                        </div>
                        <div>
                            <span>Program: </span>
                            <span className='text-muted'>{props.program.program}</span>
                        </div>
                        <div>
                            <span>Faculty/Division: </span>
                            <span className='text-muted'>{props.program.Faculty}</span>
                        </div>
                        <div>
                            <Collapse in={open}>
                                <div id="example-collapse-text">
                                    <span>Description:</span>
                                    <span className='text-muted'> {props.program.Description}</span>
                                </div>
                            </Collapse>
                            {!open && <div>Description: {props.program.Description.slice(0, 20)}...</div>}
                        </div>
                        <div className='text-center'>
                            <Button
                                onClick={() => setOpen(!open)}
                                className='showButton mt-2 w-50'
                                variant='link'
                            >
                                {open ? 'Show Less' : 'Show More'}
                            </Button>
                        </div>
                        <Button className='text-white mt-2 w-50 buttonColor' onClick={handleEnroll}>Enroll</Button>
                    </Card.Text>
                </Card.Body>
            </Card>
        </Col>
    )
}

export default ProgramCards
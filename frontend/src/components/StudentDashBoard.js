import { useState, useEffect } from "react";

import { useNavigate } from "react-router-dom";
import axios from 'axios';
import './css/StudentDashBoard.css';

import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Header from "./Header";
import Footer from "./Footer";
export default function Profile() {
  const userId = JSON.parse(localStorage.getItem('userid'));

  const navigate = useNavigate(); // Initialize the navigate function
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('loggedIn') === 'true');
  const [studentInfo, setStudentInfo] = useState({}); // State to hold student information
  const [image, setImage] = useState('');




  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/login'); // Redirect to login page if not logged in
    } else {
      // Fetch student information from the server
      axios.get(`https://graduate-program-c0d91ea2bf20.herokuapp.com/getStudentInfo?userId=${userId}`)
        .then(response => {

          setStudentInfo(response.data); // Set the fetched student information to state
          if (response.data.profile_picture == null) {
            const imageUrl1 = `https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png`;
            setImage(imageUrl1);

          }
          else {
            const imageFilename = response.data.profile_picture;
            const imageUrl2 = `https://graduate-program-c0d91ea2bf20.herokuapp.com/${imageFilename.substring(7)}`;
            setImage(imageUrl2);
          }

        })
        .catch(error => {
          console.error('Error fetching student information:', error);
        });
    }
  }, [isLoggedIn, navigate]);

  return (
    <>
      <Header db={true} />

      <div className="container rounded bg-white mt-5 mb-5" id="body">
        <Row>
          <Col className="col-md-3 border-right">
            <div className="d-flex flex-column align-items-center text-center p-3 py-5">
              <img className="rounded-circle mt-5" src={image} style={{ width: 150, height: 150 }} />
              <h6 className="f-w-600 mt-2" >{studentInfo.firstname} {studentInfo.lastname}</h6></div>
          </Col>
          <Col className="col-md-5">
            <div className="p-3 py-5">
              <div className="d-flex justify-content-between align-items-center mb-3 horizontal-line">
                <h3 className="text-right">Graduate Program Information</h3>
                <div className="horizontal-line"></div>

              </div>
              <Row className="mt-2">
                <Col className="col-md-6">  <p className="m-b-10 f-w-600">Level of study</p>           <h6 className="text-muted f-w-400">{studentInfo.level}</h6></Col>
                <Col className="col-md-6">         <p className="m-b-10 f-w-600">Program</p>
                  <h6 className="text-muted f-w-400">{studentInfo.program}</h6>   </Col>
              </Row>
              <Row className="mt-3">
                <Col className="col-md-12">                   <p className="m-b-10 f-w-600">Faculty/Divison</p>
                  <h6 className="text-muted f-w-400">{studentInfo.faculty}</h6></Col>

              </Row>

            </div>
          </Col>

        </Row>
      </div>

      <Footer />

    </>
  );
}

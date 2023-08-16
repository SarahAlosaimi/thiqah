
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import thiqahLogo from '../assets/thiqahLogo.png';


// Define the Login functional component //
export default function Login() {

  const [isHovered, setIsHovered] = useState(false);
  const [isEnrolled, setisEnrolled] = useState('false');


  // Define a style object for conditional button styling
  const style = {
    regButton:
    {
      background: isHovered ? "#0387b0" : "#04ade2",
      border: isHovered ? "#0387b0" : "#04ade2",
      transition: "background 0.3s, border 0.3s", // Add smooth transition


    }
  }

  const naviagate = useNavigate(); // Define the navigate function for routing

  // Define the form data state using useState

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    noUser: ''
  });


  const [errors, setErrors] = useState({}); // Initialize errors state as an empty object

  // Function to handle when the user changes the input
  const handleOnChange = (event) => {
    const { name, value } = event.target;
    let newErrors = { ...errors }; // Create a copy of the errors object

    newErrors.noUser = "";
    if (name === 'email') {
      if (!value) {
        newErrors.email = 'Email is Required';
        delete newErrors.noUser;
      } else {
        delete newErrors.email;
      }
    }

    if (name === 'password') {
      if (!value) {
        newErrors.password = 'Password is Required';
        delete newErrors.noUser;
      } else {
        delete newErrors.password;
      }
    }

    setErrors(newErrors); // Update the errors state with the newErrors object

    setFormData({ ...formData, [event.target.name]: event.target.value }); // change input values to the current values
  };



  // Function to handle when the user submits the inputs
  const handleOnSubmit = (e) => {
    e.preventDefault();

    let newErrors = { ...errors }; // Create a copy of the errors object
    var errorStatus = false;

    // Check for validation errors and update errorStatus

    if (!formData.email) {
      newErrors.email = 'Email is Required';

      errorStatus = true;
    }
    else {
      delete newErrors.email;
    }


    if (!formData.password) {
      newErrors.password = 'Password is Required';
      errorStatus = true;
    }
    else {
      delete newErrors.password;
    }

    //Check for validation errors before proceeding
    if (errorStatus) {
      setErrors(newErrors); // Update the errors state with the newErrors object
      return;
    }


    // Make a POST request to the login 
    axios.post('https://graduate-program-c0d91ea2bf20.herokuapp.com/login', { ...formData },
      {
      }
    )
      .then((res) => {


        if (res.data.message === "success") {
          localStorage.setItem('loggedIn', 'true'); // Set the session flag
          localStorage.setItem('userid', JSON.stringify(res.data.userid)); // Store the user ID in localStorage
          console.log("pid " + res.data.pID)
          console.log("pid " + typeof (res.data.pID));

          if ((res.data.pID === null)) {
            setisEnrolled(0);
          }
          if (isEnrolled == 0) {
            naviagate('/GPpage');
          }
          else {
            naviagate('/StudentDashBoard');
          }


        } else {
          newErrors.noUser = "The Email or password is incorrect";
          console.log("1")
          setErrors(newErrors);


        }

      })
      .catch((err) => console.log(err));





  };


  return (
    <div className="container1">
      <div className="container">
        <div className='mt-4 align-items-center mainRegLog'> {/*mt-4: margin top */}
          <Row className='px-2'> {/*padding left and right, padding bottom */}

            <Col
              md={{ span: 6, order: "first" }}
              sm={{ offset: 12, order: "last" }}
              xs={{ offset: 12, order: "last" }}
            >



              <Row className='mt-3'>
                <Col>
                  <Form.Label>Email  <span className='text-danger'>*</span></Form.Label>
                  <Form.Control type="email" placeholder="example@example.com" name="email" value={formData.email} onChange={handleOnChange} />
                  {errors.email ? <div className="text-danger"> {errors.email} </div> : null}

                </Col>
              </Row>


              <Row className='mt-3'>
                <Col>
                  <Form.Label>Password <span className='text-danger'>*</span></Form.Label>
                  <Form.Control type="password" placeholder="Enter Password" name="password" value={formData.password} onChange={handleOnChange} />
                  {errors.password ? <div className="text-danger"> {errors.password} </div> : null}

                </Col>
                {errors.noUser ? <div className="text-danger"> {errors.noUser} </div> : null}
              </Row>



              <Row className='mt-5'>
                <Col>
                  <h6 className='d-lg-none d-md-block d-xs-block'>Do not you have an account? <Link to="/"> Register </Link></h6>

                  <Button className='w-100 text-white ' onClick={handleOnSubmit} style={style.regButton} onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)} >Log in </Button>{' '}
                </Col>
              </Row>
            </Col>




            <Col
              md={{ span: 6, order: "last" }} // when the screen is big
              sm={{ offset: 12, order: "first" }} // when the screen is small, i want to display this column at the top of the page
              xs={{ offset: 12, order: "first" }}
              className=' d-flex flex-column align-items-center justify-content-center cover1'
            >

              <Row className="logo">
                <img src={thiqahLogo} alt="Thiqah Logo" />
              </Row>
              <h2 className='text-center textLog'>Join the Graduate Program</h2>
              <h4 className='text-center textLog2' > Explore Different Programs and Join One!</h4>
              <h6 className='text-center d-md-none d-sm-none d-lg-block'>Don't have an account? <Link to="/"> Register</Link></h6>
            </Col>

          </Row>

        </div>
      </div>
    </div>
  );
};








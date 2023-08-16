
import { useState } from "react";

import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import bcrypt from 'bcryptjs'; // Import bcrypt library
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import thiqahLogo from '../assets/thiqahLogo.png';
import './css/RegistrationLogin.css';

function RegistraionPage(props) {

  const [isHovered, setIsHovered] = useState(false);

  const style = {
    regButton:
    {
      background: isHovered ? "#0387b0" : "#04ade2",
      border: isHovered ? "#0387b0" : "#04ade2",
      transition: "background 0.3s, border 0.3s", // Add smooth transition


    }
  }
  const naviagate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    birthdate: '',
    profilePicture: null,
    password: '',
    confirmPassword: '',
  });




  const [errors, setErrors] = useState({
    firstName: '',
    lastName: '',
    email: '',
    birthdate: '',
    password: '',
    confirmPassword: '',
  }); // Initialize errors state as an empty object

  const validationPerInput = (name, value) => {
    console.log("in");
    let newErrors = { ...errors }; // Create a copy of the errors object

    if (name === 'firstName') {
      if (!value || /^\s+/.test(value)) {
        newErrors.firstName = 'First Name is Required';

      } else {
        delete newErrors.firstName; // Remove the error message
      }
    }

    if (name === 'lastName') {
      if (!value || /^\s+/.test(value)) {
        newErrors.lastName = 'Last Name is Required';
      } else {
        delete newErrors.lastName;
      }
    }

    if (name === 'email') {
      if (!value) {
        newErrors.email = 'Email is Required';
      } else if (!/^\S+@\S+\.\S+$/.test(value)) {
        newErrors.email = 'Please enter a valid Email';
      } else {
        delete newErrors.email;
      }
    }

    if (name === 'password') {
      if (!value) {
        newErrors.password = 'Password is Required';
      } else if (!/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&_\-^#]{8,}$/.test(value)) {
        newErrors.password = 'Please enter at least 8 characters (including one letter and one number at least)';
      } else {
        delete newErrors.password;
      }
    }

    if (name === 'confirmPassword') {
      if (!value) {
        newErrors.confirmPassword = 'Confirm Password is Required';
      } else if (value !== formData.password) {
        newErrors.confirmPassword = 'The Passwords do not match';
      } else {
        delete newErrors.confirmPassword;
      }
    }

    if (name === 'birthdate') {
      if (!value) {
        newErrors.birthdate = 'Birthdate is required';
      } else {
        const currentDate = new Date();
        const selectedDate = new Date(value);

        if (selectedDate > currentDate) {
          newErrors.birthdate = 'Birthdate is not valid'; // Birthdate is in the future
        } else {
          delete newErrors.birthdate;
        }
      }



    }

    setErrors(newErrors); // Update the errors state with the newErrors object



  }

  const validationforAllForm = () => {
    let newErrors = { ...errors }; // Create a copy of the errors object
    for (const [key, value] of Object.entries(formData)) {

      if (key === 'firstName') {
        console.log('t');
        if (!value || /^\s+/.test(value)) {
          newErrors.firstName = 'First Name is Required';

        }
      }

      if (key === 'lastName') {
        if (!value || /^\s+/.test(value)) {
          newErrors.lastName = 'Last Name is Required';
        }
      }

      if (key === 'email') {
        if (!value) {
          newErrors.email = 'Email is Required';
        }
      }

      if (key === 'password') {
        if (!value) {
          newErrors.password = 'Password is Required';
        }
      }

      if (key === 'confirmPassword') {
        if (!value) {
          newErrors.confirmPassword = 'Confirm Password is Required';
        }
      }

      if (key === 'birthdate') {
        if (!value) {
          newErrors.birthdate = 'Birthdate is required';
        }


      }
    }
    setErrors(newErrors); // Update the errors state with the newErrors object



  }

  const handleOnChange = (event) => {
    const { name, value, type, files } = event.target;
    validationPerInput(name, value);

    // Special handling for file input
    if (type === 'file') {
      console.log('yes');
      setFormData((prevData) => ({
        ...prevData,
        profilePicture: files[0],
      }));

    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }


  }






  // if the user submit the form 
  const handleOnSubmit = async (event) => {
    event.preventDefault();
    validationforAllForm();
    // Check for validation errors before proceeding
    if (Object.keys(errors).length > 0) {

      return;
    }
    const hashedPassword = await bcrypt.hash(formData.password, 10);


    axios.post('https://graduate-program-c0d91ea2bf20.herokuapp.com/register', { ...formData, password: hashedPassword },
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        }
      }
    )
      .then((res) => {
        console.log("success");
        const insertedId = res.data.insertedId;
        localStorage.setItem('loggedIn', 'true'); // Set the session flag  
        localStorage.setItem('userid', JSON.stringify(insertedId)); // add the user to local storage
        naviagate('/GPpage')
      })
      .catch((err) => console.log(err));

  }




  return (
    <>


      <div className="container regsiter">

        <div className='mt-4 align-items-center mainRegLog'> {/*mt-4: margin top */}
          <Row className='px-2 '> {/*padding left and right, padding bottom */}

            <Col
              md={{ span: 6, order: "first" }}
              sm={{ offset: 12, order: "last" }}
              xs={{ offset: 12, order: "last" }}
            >

              <Row className='mt-3'>
                <Col sm={12} lg={6} md={12}>
                  <Form.Label>First Name <span className='text-danger'>*</span></Form.Label>
                  <Form.Control type="text" placeholder="Enter First Name" name="firstName" value={formData.firstName} onChange={handleOnChange} />
                  {errors.firstName ? <div className="text-danger"> {errors.firstName} </div> : null}
                </Col>
                <Col sm={12} lg={6} md={12}>
                  <Form.Label>Last Name <span className='text-danger'>*</span></Form.Label>
                  <Form.Control type="text" placeholder="Enter Last Name" name="lastName" value={formData.lastName} onChange={handleOnChange} />
                  {errors.lastName ? <div className="text-danger"> {errors.lastName} </div> : null}



                </Col>
              </Row>



              <Row className='mt-3'>
                <Col>
                  <Form.Label>Email <span className='text-danger'>*</span></Form.Label>
                  <Form.Control type="email" placeholder="example@example.com" name="email" value={formData.email} onChange={handleOnChange} />
                  {errors.email ? <div className="text-danger"> {errors.email} </div> : null}

                </Col>
              </Row>

              <Row className='mt-3'>
                <Col>
                  <Form.Label>Birthdate <span className='text-danger'>*</span></Form.Label>
                  <Form.Control type="date" name="birthdate" value={formData.birthdate} onChange={handleOnChange} />

                  {errors.birthdate ? <div className="text-danger"> {errors.birthdate} </div> : null}


                </Col>
              </Row>

              <Row className='mt-3'>
                <Col>
                  <Form.Label>Profile Picture</Form.Label>
                  <Form.Control type="file" accept='.png, .jpeg, .jpg' name="profilePicture" onChange={handleOnChange} />
                  {errors.profilePicture ? <div className="text-danger"> {errors.profilePicture} </div> : null}

                </Col>
              </Row>

              <Row className='mt-3'>
                <Col>
                  <Form.Label>Password <span className='text-danger'>*</span></Form.Label>
                  <Form.Control type="password" placeholder="Enter Password" name="password" value={formData.password} onChange={handleOnChange} />
                  {errors.password ? <div className="text-danger"> {errors.password} </div> : null}


                </Col>
              </Row>

              <Row className='mt-3'>
                <Col>
                  <Form.Label>Confirm Password <span className='text-danger'>*</span></Form.Label>
                  <Form.Control type="password" placeholder="Enter Confirmation Password" name="confirmPassword" value={formData.confirmPassword} onChange={handleOnChange} />
                  {errors.confirmPassword ? <div className="text-danger"> {errors.confirmPassword} </div> : null}

                </Col>
              </Row>

              <Row className='mt-5'>
                <Col>
                  <h6 className='d-lg-none d-md-block d-xs-block'>Do you have an account? <Link to="/login"> Log in </Link></h6>

                  <Button className='w-100 text-white ' onClick={handleOnSubmit} style={style.regButton} onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)} >Register</Button>{' '}

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
              <h2 className='text-center'>Join the Graduate Program</h2>
              <h4 className='text-center'>Explore Different Programs and Join One!</h4>
              <h6 className='text-center d-md-none d-sm-none d-lg-block'>Already have an account? <Link to="/login"> Log in </Link></h6>
            </Col>

          </Row>

        </div>
      </div>
    </>
  );
};



export default RegistraionPage;
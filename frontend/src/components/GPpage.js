import React, { useState, useEffect } from 'react'
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import ProgramCards from './ProgramCard';
import CardsSkeleton from './CardsSkeleton';
import thiqahLogo from '../assets/thiqahLogo.png';
import axios from 'axios'; // Import axios library
import Header from './Header';
import Footer from './Footer';
import "./css/styles.css"


// Define the GPpage functional component (Graduate Programs Page )
const GPpage = () => {
  const userId = JSON.parse(localStorage.getItem('userid'));

  const [selectedValues, setSelectedValues] = useState({
    dropdown1: "",
    dropdown2: "",
    dropdown3: "",
    id: userId,
  });



  const [programs, setPrograms] = useState([]); // State to hold the fetched programs
  const [filteredPrograms, setFilteredPrograms] = useState([]);
  const [isLoading, setLoading] = useState(true); // State to manage loading status


  // Load programs using useEffect
  useEffect(() => {

    // Fetch programs from the server
    axios.get('https://graduate-program-c0d91ea2bf20.herokuapp.com/getPrograms')
      .then(response => {

        setLoading(false);
        setPrograms(response.data);
      })
      .catch(error => {
        console.error('Error fetching programs:', error);
      });
  }, []);


  // Handle dropdown selection changes
  const handleDropdownChange = (event, dropdownName) => {
    event === "all" ? event = "" : event = event
    setSelectedValues((prevValues) => ({
      ...prevValues,
      [dropdownName]: event,
    }));
  };


  // Filter programs based on selected dropdown values
  useEffect(() => {
    const filtered = programs.filter(program => {
      const levelMatch = selectedValues.dropdown1 === "" || program.level === selectedValues.dropdown1;
      const programMatch = selectedValues.dropdown2 === "" || program.program === selectedValues.dropdown2;
      const facultyMatch = selectedValues.dropdown3 === "" || program.Faculty === selectedValues.dropdown3;
      return levelMatch && programMatch && facultyMatch;
    });

    setFilteredPrograms(filtered);
  }, [selectedValues, programs]);

  return (
    <>
      <Header db={false} />
      <div className='container gpProgramsMain'>

        <div className='mt-4 align-items-center main px-4 pt-1'>
          <h2 className='text-center'>Choose Your Program</h2>
          <hr />
          <Row className='text-start mb-4 justify-content-center'>
            {/* Dropdown for Level of study */}
            <Col md={3} sm={12}>
              <label>Level of study</label>
              <select
                className="form-select"
                onChange={(event) => handleDropdownChange(event.target.value, "dropdown1")}
              >
                <option selected value="all">All</option>
                <option value="Diploma">Diploma</option>
                <option value="Bachelor">Bacloher</option>
                <option value="Master">Master</option>
                <option value="Doctoral"> Doctoral </option>
              </select>
            </Col>
            {/* Dropdown for Program */}

            <Col md={3} sm={12}>
              <label>Program</label>
              <select
                className="form-select"
                onChange={(event) => handleDropdownChange(event.target.value, "dropdown2")}
              >
                <option selected value="all">All</option>
                <option value="Computer Science">Computer Science</option>
                <option value="IT Support">IT Support</option>
                <option value="Business Administration">Business Administration</option>
                <option value="Software Engineering">Software Engineering</option>
                <option value="Entrepreneurship and Innovation">Entrepreneurship and Innovation</option>

              </select>
            </Col>
            {/* Dropdown for Faculty */}

            <Col md={3} sm={12}>
              <label>Faculty</label>
              <select
                className="form-select"
                onChange={(event) => handleDropdownChange(event.target.value, "dropdown3")}
              >
                <option selected value="all">All</option>
                <option value="Information Technology">Information Technology</option>
                <option value="Business">Business</option>
              </select>
            </Col>
          </Row>
          {/* Row to display program cards */}
          <Row xs={1} md={3} className="g-3 ">
            {isLoading ? <CardsSkeleton /> :


              filteredPrograms.length === 0 ?
                <div className="NoData" > <h6>  No Data Available</h6> </div>
                :
                filteredPrograms.map((program, index) => (
                  <ProgramCards program={program} key={index} />
                ))
            }

          </Row>
        </div>

      </div>

    </>
  )
}

export default GPpage;
import React, { useState, useEffect } from 'react';
import Modal from './Modal';

const SearchStudent = () => {
    const [students, setStudents] = useState([]);
    const [query, setQuery] = useState('');
	const [selectedPrograms, setSelectedPrograms] = useState([]);
	const [selectedUser, setSelectedUser] = useState(null);
	  const [data, setData] = useState([]);
	const programs = ['General Science',  'Home Economics', 'Bussiness', 'Visual Arts'];

    useEffect(() => {
        fetch('http://localhost:3000/students')
            .then((response) => response.json())
            .then((data) => setStudents(data))
            .catch((error) => console.error('Error fetching student data:', error));
    }, []);

    const filteredStudents = students.filter(student =>
        student.firstname.toLowerCase().includes(query.toLowerCase()) ||
        student.lastname.toLowerCase().includes(query.toLowerCase())
    );
	const handleCheckboxChange = (event) => {
		const program = event.target.name;
		setSelectedPrograms(prev => 
		  event.target.checked ? [...prev, program] : prev.filter(p => p !== program)
		);
	  };

       const fetchStudents = () => {
                  const params = selectedPrograms.length ? { programs: selectedPrograms.join(',') } : {};
                  axios.get('http://localhost:3000/students/sort', { params })
                    .then(response => {
                      setStudents(response.data);
                    })
                    .catch(error => {
                      console.error('Error fetching students:', error);
                    });
                };
      

    return (
		<>
        <div style={{ textAlign: 'center', padding: '20px' }}>
            <h2>Student List</h2>
            <input
                type="text"
                placeholder="Search by First or Last Name"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                style={{ padding: '8px', width: '250px', marginBottom: '10px' }}
            />
			<div>
			{programs.map(program => (
                  <label key={program}>
                    <input
                      type="checkbox"
                      name={program}
                      checked={selectedPrograms.includes(program)}
                      onChange={handleCheckboxChange}
                    />
                    {program}
                  </label>
				   ))}
			</div>
			<div>Total Number Registered student :{students.length} </div>

            <table border="1" width="80%" style={{ margin: '20px auto', borderCollapse: 'collapse' }}>
                <thead>
                    <tr>
                        <th>First Name</th>
                        <th>Last Name</th>
                        {/* <th>Year</th> */}
                        <th>Date of Birth</th>
                        <th>Program</th>
                        <th>Previous School</th>
                        <th>BECE Aggregate</th>
                        <th>Mother's Name</th>
                        <th>Father's Name</th>
                       
                    </tr>
                </thead>
                <tbody>
                    {filteredStudents.length > 0 ? (
                        filteredStudents.map((student, index) => (
                            <tr key={index} onClick={() => setSelectedUser(student)}>
                                <td>{student.firstname}</td>
                                <td>{student.lastname}</td>
                                {/* <td>{student.year}</td> */}
                                <td>{student.dateOfBirth}</td>
                                <td>{student.program}</td>
                                <td>{student.previousSchool}</td>
                                <td>{student.beceGrade}</td>
                                <td>{student.motherName}</td>
                                <td>{student.fatherName}</td>
                               
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="14">No data found</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
		{selectedUser && (
				<Modal user={selectedUser} onClose={() => setSelectedUser(null)} />
			  )}
			  </>
    );
};

export default SearchStudent;

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
        student.first_name.toLowerCase().includes(query.toLowerCase()) ||
        student.last_name.toLowerCase().includes(query.toLowerCase())
    );
	const handleCheckboxChange = (event) => {
		const program = event.target.name;
		setSelectedPrograms(prev => 
		  event.target.checked ? [...prev, program] : prev.filter(p => p !== program)
		);
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
			

            <table border="1" width="80%" style={{ margin: '20px auto', borderCollapse: 'collapse' }}>
                <thead>
                    <tr>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Year</th>
                        <th>Date of Birth</th>
                        <th>Program</th>
                        <th>Previous School</th>
                        <th>BECE Aggregate</th>
                        <th>Mother's Name</th>
                        <th>Father's Name</th>
                        <th>English</th>
                        <th>Maths</th>
                        <th>Science</th>
                        <th>Social Studies</th>
                        <th>ICT</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredStudents.length > 0 ? (
                        filteredStudents.map((student, index) => (
                            <tr key={index} onClick={() => setSelectedUser(student)}>
                                <td>{student.first_name}</td>
                                <td>{student.last_name}</td>
                                <td>{student.year}</td>
                                <td>{student.dob}</td>
                                <td>{student.program}</td>
                                <td>{student.Previous_School}</td>
                                <td>{student.BECE_aggregrate}</td>
                                <td>{student.mothers_name}</td>
                                <td>{student.fathers_name}</td>
                                <td>{student.english}</td>
                                <td>{student.maths}</td>
                                <td>{student.science}</td>
                                <td>{student.Social_studies}</td>
                                <td>{student.ICT}</td>
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

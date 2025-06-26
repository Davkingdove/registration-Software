
    
        import React, { useState, useEffect } from 'react';
        import axios from 'axios';
        import './SearchData.css';
        import Modal from './Modal';    
        const SearchData = () => {
          const [students, setStudents] = useState([]);
          const [selectedPrograms, setSelectedPrograms] = useState([]);
          const [selectedUser, setSelectedUser] = useState(null);
          const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const programs = ['General Science',  'Home Economics', 'Bussiness', 'Visual Arts'];
        
          useEffect(() => {
            fetchStudents();
          }, [selectedPrograms])

          useEffect(() => {
            fetchData();
          }, []);
        
          const fetchStudents = () => {
            const params = selectedPrograms.length ? { programs: selectedPrograms.join(',') } : {};
            axios.get('http://localhost:3000/students', { params })
              .then(response => {
                setStudents(response.data);
              })
              .catch(error => {
                console.error('Error fetching students:', error);
              });
          };

          const fetchData = async () => {
            try {
              const response = await axios.get('http://localhost:3000/search');
              setData(response.data);
            } catch (error) {
              console.error('Error fetching data:', error);
            }
          }
          const handleSearch = (event) => {
            const searchTerm = event.target.value;
            setSearchTerm(searchTerm);
            const results = data.filter(item =>
              item.first_name.toLowerCase().includes(searchTerm.toLowerCase()) 
              + item.last_name.toLowerCase().includes(searchTerm.toLowerCase()) 
            
            );
            setStudents(results);
          };

          const handleCheckboxChange = (event) => {
            const program = event.target.name;
            setSelectedPrograms(prev => 
              event.target.checked ? [...prev, program] : prev.filter(p => p !== program)
            );
          };
        
          return (
            <>
              <div>
              <h1>Student List</h1>
              <input
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={handleSearch}
      />
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
              <div>
              <table>
                <thead>
              <tr>
              <th>No.</th>
    <th>Firstname</th>
    <th>Lastname</th> <th>Program Offered</th> <th>Date of Birth</th> <th>Start Year</th> <th>Previous School</th> <th>Bece grade</th> 
    <th>Mothers Name</th><th>Mothers Contact</th><th>Fathers name</th><th>Fathers Contact</th> </tr>
    </thead>
             <tbody>  {students.map(student => (
         
                <tr  key={student.id} onClick={() => setSelectedUser(student)}><td>{student.id}</td> <td>{student.first_name}</td> 
                <td>{student.last_name} </td> <td>{student.program}</td> <td>{student.dob}</td><td>{student.year}</td> <td>{student.Previous_School}</td>
                  <td>{student.BECE_aggregrate}</td> <td>{student.mothers_name}</td> <td>{student.mothers_contact}</td> <td>{student.fathers_name}</td><td>{student.fathers_contact}</td>
                 </tr>
                ))}
                </tbody> 
            </table>
            </div>
            {selectedUser && (
        <Modal user={selectedUser} onClose={() => setSelectedUser(null)} />
      )}
            </>
          );
        };
       
        export default SearchData;
        

 
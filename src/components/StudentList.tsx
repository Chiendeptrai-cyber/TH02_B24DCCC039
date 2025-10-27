import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

interface Student {
  id: number;
  name: string;
  email: string;
}

const StudentList: React.FC = () => {
  const [students, setStudents] = useState<Student[]>([]);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await axios.get<Student[]>('https://jsonplaceholder.typicode.com/users');
        setStudents(response.data);
        setError('');
      } catch (err) {
        setError('Failed to fetch students');
      }
    };
    fetchStudents();
  }, []);

  return (
    <div>
      <h1>Student List</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <ul>
        {students.map((student) => (
          <li key={student.id}>
            <Link to={`/students/${student.id}`}>
              {student.name} ({student.email})
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default StudentList;
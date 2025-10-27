import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

interface Student {
  id: number;
  name: string;
  email: string;
  phone: string;
  website: string;
  company: { name: string };
}

const StudentDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [student, setStudent] = useState<Student | null>(null);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const fetchStudent = async () => {
      try {
        const response = await axios.get<Student>(`https://jsonplaceholder.typicode.com/users/${id}`);
        setStudent(response.data);
        setError('');
      } catch (err) {
        setError('Failed to fetch student details');
      }
    };
    fetchStudent();
  }, [id]);

  if (error) return <p style={{ color: 'red' }}>{error}</p>;
  if (!student) return <p>Loading...</p>;

  return (
    <div>
      <h1>Student Details</h1>
      <p><strong>Name:</strong> {student.name}</p>
      <p><strong>Email:</strong> {student.email}</p>
      <p><strong>Phone:</strong> {student.phone}</p>
      <p><strong>Website:</strong> {student.website}</p>
      <p><strong>Company:</strong> {student.company.name}</p>
    </div>
  );
};

export default StudentDetail;
import React, {useState, useEffect} from 'react';
import { calendarOperations } from './calendarOperation';
import { vacationOperations } from '../middleware-apis/vacationOperations';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import "./index.scss";

function Calendar() {

  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [dates, setDates] = useState([]);

  useEffect(() => {
    async function fetchDates() {
      try {
        const fetchedStartDate = await vacationOperations.getStartDate();
        setStartDate(fetchedStartDate);
        const fetchedEndDate = await vacationOperations.getEndDate();
        setEndDate(fetchedEndDate);
      } catch (error) {
        console.error('Error fetching dates:', error);
      }
    }

    fetchDates();
  }, []);

  useEffect(() => {
    if (startDate && endDate) {
      calendarOperations.initializeCalendar(startDate, endDate, setDates);
    }
  }, [startDate, endDate]);

  return (
    <Box>
      {dates.map((date, index) => (
        <Card key={index} sx={{ marginBottom: 2 }}>
          <CardContent>
            <Typography color="text.secondary" gutterBottom>{date}</Typography>
          </CardContent>
        </Card>
      ))}
    </Box>
  );


}

export default Calendar
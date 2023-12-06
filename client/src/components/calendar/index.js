import React, { useState, useEffect } from 'react';
import { calendarOperations } from './calendarOperation';
import { vacationOperations } from '../middleware-apis/vacationOperations';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Collapse from '@mui/material/Collapse';
import "./index.scss";

function Calendar() {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [dates, setDates] = useState([]);
  const [expandedId, setExpandedId] = useState(null); // Track expanded card

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

  const handleExpandClick = (index) => {
    setExpandedId(expandedId === index ? null : index);
  };

  return (
    <Box className="scrollable-container" sx={{ width: "97.5%" }}>
      {dates.map((date, index) => (
        <Card key={index} sx={{ margin: 1 }} onClick={() => handleExpandClick(index)}>
          <CardContent>
            <Typography color="text.secondary" gutterBottom>{date}</Typography>
          </CardContent>
          <Collapse in={expandedId === index} timeout="auto" unmountOnExit>
            {/* Add your collapsible content here */}
            <CardContent>
              <Typography paragraph>Details for {date}</Typography>
            </CardContent>
          </Collapse>
        </Card>
      ))}
    </Box>
  );
}

export default Calendar;

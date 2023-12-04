export const calendarOperations = {
    initializeCalendar: function(startDateStr, endDateStr, setDates) {
        //helper function to create a Date object from a date string in local time
        const createDateAsLocal = (dateStr) => {
            const [year, month, day] = dateStr.split('-').map(num => parseInt(num, 10));
            return new Date(year, month - 1, day);
        };

        const startDate = createDateAsLocal(startDateStr);
        const endDate = createDateAsLocal(endDateStr);
        const formattedDates = [];

        //helper function to format the date
        const formatDate = (date) => {
            const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
            const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

            const dayOfWeek = daysOfWeek[date.getDay()];
            const month = months[date.getMonth()];
            const dayNumber = date.getDate();

            return `${dayOfWeek}, ${month} ${dayNumber}`;
        };

        for (let iterateDate = new Date(startDate); iterateDate <= endDate; iterateDate = new Date(iterateDate.getFullYear(), iterateDate.getMonth(), iterateDate.getDate() + 1)) {
            formattedDates.push(formatDate(new Date(iterateDate)));
        }
    
        setDates(formattedDates);
    }
}
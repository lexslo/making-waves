module.exports = {
    formatDate: timestamp => {
        const month = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        const newDate = new Date(timestamp);
        const day = timestamp.getDate();
        const year = timestamp.getFullYear();
        return `${month[newDate.getMonth()]} ${day}, ${year}`;
    },
    formatTime: timestamp => {
        return new Date(timestamp).toLocaleString('en-US', {
            hour12: true,
            hourCycle: 'h12',
            hour: 'numeric',
            minute: '2-digit'
        });
    }
}
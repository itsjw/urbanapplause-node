const getMonthName = (date) => {
  var monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

  return monthNames[date.getMonth()];
}

export default getMonthName;

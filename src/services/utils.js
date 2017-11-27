const getUploadsImUrl = (file) => {
  return new Promise((resolve, reject) => {
      if (!file || !file.type.match(/image.*/)) return;
        document.body.className = "uploading";
        var fd = new FormData();
        fd.append("upload", file); // Append the file
        var xhr = new XMLHttpRequest();
        xhr.open("POST", "https://uploads.im/api");
        xhr.onload = function() {
        var url = JSON.parse(xhr.responseText).data.img_url
          resolve(url);
        }
        xhr.send(fd);
  })
}

const getMonthName = (date) => {
  var monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

  return monthNames[date.getMonth()];
}


const getAddressComponents = (place) => {
  var address = {};
        place.address_components.forEach(function(c) {
            switch(c.types[0]){
                case 'street_number':
                    address.StreetNumber = c;
                    break;
                case 'route':
                    address.StreetName = c;
                    break;
                case 'neighborhood': case 'locality':    // North Hollywood or Los Angeles?
                    address.City = c;
                    break;
                case 'administrative_area_level_1':     //  Note some countries don't have states
                    address.State = c;
                    break;
                case 'postal_code':
                    address.Zip = c;
                    break;
                case 'country':
                    address.Country = c;
                    break;
            }
        });

  return address;
}

const timeSince = (date) => {

  var seconds = Math.floor((new Date() - date) / 1000);

  var interval = Math.floor(seconds / 31536000);

  if (interval > 1) {
    return interval + " years";
  }
  interval = Math.floor(seconds / 2592000);
  if (interval > 1) {
    return interval + " months";
  }
  interval = Math.floor(seconds / 86400);
  if (interval > 1) {
    return interval + " days";
  }
  interval = Math.floor(seconds / 3600);
  if (interval > 1) {
    return interval + " hours";
  }
  interval = Math.floor(seconds / 60);
  if (interval > 1) {
    return interval + " minutes";
  }
  return Math.floor(seconds) + " seconds";
}

const memberSince = (date) => {
  return new Date(date).getFullYear()
}

module.exports = {
  getAddressComponents: getAddressComponents,
  timeSince: timeSince,
  getUploadsImUrl: getUploadsImUrl,
  getMonthName: getMonthName
}




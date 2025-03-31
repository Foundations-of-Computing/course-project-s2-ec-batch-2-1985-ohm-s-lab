// Function to show the sidebar
function showSidebar() {
  const sidebar = document.querySelector(".sidebar");
  sidebar.style.display = "flex";
}

// Function to hide the sidebar
function hideSidebar() {
  const sidebar = document.querySelector(".sidebar");
  sidebar.style.display = "none";
}

// Enable dragging if voltage and resistance are provided
function enableDrag() {
    let voltageInput = document.getElementById('Voltage').value;
    let resistanceInput = document.getElementById('Resistance').value;

    if (voltageInput && resistanceInput) {
      document.getElementById('dragtarget1').setAttribute('draggable', 'true');
      document.getElementById('dragtarget2').setAttribute('draggable', 'true');
    } else {
      alert("Please fill in both voltage and resistance.");
    }
}

// Event listener for dragstart
document.addEventListener("dragstart", function(event) {
    event.dataTransfer.setData("text", event.target.id); // Store the dragged item's id
});

// Event listener for dragover
document.addEventListener("dragover", function(event) {
    event.preventDefault(); // Allow dropping
});

// Event listener for drop
document.addEventListener("drop", function(event) {
    event.preventDefault();
    if (event.target.className == "dropbox1" || event.target.className == "dropbox2" || event.target.className == "holdbox") {
        var data = event.dataTransfer.getData("text");
        event.target.appendChild(document.getElementById(data)); // Append dragged element
    }

    var image = document.getElementById('dragtarget1');
    var dropbox = document.querySelector('#dp1');
    var image2 = document.getElementById('dragtarget2');
    var dropbox2 = document.querySelector('#dp2');

    var isImageInDropbox22 = dropbox2.contains(image2);
    var isImageInDropbox21 = dropbox2.contains(image);
    var isImageInDropbox11 = dropbox.contains(image);
    var isImageInDropbox12 = dropbox.contains(image2);

    var imgisthere = (isImageInDropbox22 && isImageInDropbox11) || (isImageInDropbox21 && isImageInDropbox12);

    console.log(imgisthere);

    var bulbImage = document.getElementById('bulb');
    if (imgisthere) {
        bulbImage.src = 'images/ON.jpg'; // Turn the bulb on
    } else {
        bulbImage.src = 'images/OFF.jpg'; // Keep the bulb off
    }
});

// Function to calculate current using Ohm's Law
function calculateCurrent() {
  const resistance = parseFloat(document.getElementById('Resistance').value);
  const voltage = parseFloat(document.getElementById('Voltage').value);

  if (isNaN(resistance) || isNaN(voltage) || resistance === 0) {
    return;
  }

  const current = voltage / resistance;

  var image = document.getElementById('dragtarget1');
  var dropbox = document.querySelector('#dp1');
  var image2 = document.getElementById('dragtarget2');
  var dropbox2 = document.querySelector('#dp2');
  var isImageInDropbox22 = dropbox2.contains(image2);
  var isImageInDropbox21 = dropbox2.contains(image);
  var isImageInDropbox11 = dropbox.contains(image);
  var isImageInDropbox12 = dropbox.contains(image2);

  var imgisthere = (isImageInDropbox22 && isImageInDropbox11) || (isImageInDropbox21 && isImageInDropbox12);

  if (imgisthere == true) {
    document.getElementById('Current').innerText = current.toFixed(2) + ' A'; // Show the calculated current

    google.charts.load('current', { packages: ['corechart', 'line'] });
    google.charts.setOnLoadCallback(drawBasic); // Draw the V-I graph

    function drawBasic() {
      var data = new google.visualization.DataTable();
      data.addColumn('number', "X");
      data.addColumn('number', "Current");

      data.addRows([
        [0, 0],   [voltage, current] // Initial and calculated data points
      ]);

      var options = {
        hAxis: { title: 'Voltage' },
        vAxis: { title: 'Current' }
      };

      var chart = new google.visualization.LineChart(document.getElementById('line-chart'));
      chart.draw(data, options); // Draw the chart
    }
  } else {
    alert("Please place the resistor or battery in their respective positions");
  }
};

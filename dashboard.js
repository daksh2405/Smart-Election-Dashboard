document.addEventListener("DOMContentLoaded", () => {

  const user = JSON.parse(localStorage.getItem("currentUser"));

  if (!user) {
    alert("Login first");
    window.location.href = "index.html";
    return;
  }

  const stateInput = document.getElementById("state-filter");
  const yearInput = document.getElementById("year-filter");

  stateInput.value = user.state;

  let barChart, pieChart;

  document.getElementById("apply-btn").addEventListener("click", () => {

    const state = stateInput.value.toLowerCase();

    const filtered = electionData.filter(d =>
      d.state.toLowerCase() === state
    );

    if (filtered.length === 0) {
      alert("No data found");
      return;
    }

    const parties = filtered.map(d => d.party);
    const votes = filtered.map(d => d.votes);

    const total = votes.reduce((a, b) => a + b, 0);
    document.getElementById("total-votes").innerText = total;

    const max = Math.max(...votes);
    const i = votes.indexOf(max);

    document.getElementById("leading-party").innerText = parties[i];
    document.getElementById("winner").innerText = parties[i];
    document.getElementById("winner-detail").innerText =
      `${parties[i]} with ${max} votes`;

    if (barChart) barChart.destroy();
    if (pieChart) pieChart.destroy();

    barChart = new Chart(document.getElementById("barChart"), {
      type: "bar",
      data: {
        labels: parties,
        datasets: [{
          label: "Votes",
          data: votes,
          backgroundColor: ["#a7c7e7", "#b7e4c7", "#f6eac2"]
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false
      }
    });

    pieChart = new Chart(document.getElementById("pieChart"), {
      type: "pie",
      data: {
        labels: parties,
        datasets: [{
          data: votes,
          backgroundColor: ["#a7c7e7", "#b7e4c7", "#f6eac2"]
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false
      }
    });

  });

  document.getElementById("logout-btn").onclick = () => {
    localStorage.removeItem("currentUser");
    window.location.href = "index.html";
  };

});
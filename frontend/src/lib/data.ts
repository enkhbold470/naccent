// Mock data for accent app metrics
export const pronunciationAccuracy = {
  labels: ["Vowels", "Consonants", "Stress", "Intonation"],
  datasets: [
    {
      label: "Current Session",
      data: [85, 78, 92, 88],
      backgroundColor: "rgba(255, 99, 132, 0.2)",
      borderColor: "rgba(255, 99, 132, 1)", 
      borderWidth: 1,
    },
    {
      label: "Previous Session",
      data: [75, 72, 85, 80],
      backgroundColor: "rgba(54, 162, 235, 0.2)",
      borderColor: "rgba(54, 162, 235, 1)",
      borderWidth: 1,
    }
  ]
};

export const fluencyScores = {
  labels: ["Week 1", "Week 2", "Week 3", "Week 4", "Week 5"],
  datasets: [
    {
      label: "Fluency Score",
      data: [65, 72, 78, 83, 88],
      backgroundColor: "rgba(75, 192, 192, 0.6)",
      borderColor: "rgba(75, 192, 192, 1)",
      borderWidth: 1,
    }
  ]
};

export const errorTypes = {
  labels: ["Vowel Errors", "Consonant Errors", "Stress Errors", "Intonation Errors"],
  datasets: [
    {
      label: "Error Distribution",
      data: [40, 30, 20, 10],
      backgroundColor: [
        "rgba(255, 99, 132, 0.6)",
        "rgba(54, 162, 235, 0.6)", 
        "rgba(255, 206, 86, 0.6)",
        "rgba(75, 192, 192, 0.6)"
      ],
      borderWidth: 1
    }
  ]
};

export const progressOverTime = {
  labels: ["Week 1", "Week 2", "Week 3", "Week 4"],
  datasets: [
    {
      label: "Pronunciation Accuracy",
      data: [70, 75, 82, 90],
      backgroundColor: "rgba(255, 99, 132, 0.2)",
      borderColor: "rgba(255, 99, 132, 1)",
      borderWidth: 1,
    },
    {
      label: "Fluency Score",
      data: [60, 68, 75, 85],
      backgroundColor: "rgba(54, 162, 235, 0.2)", 
      borderColor: "rgba(54, 162, 235, 1)",
      borderWidth: 1,
    }
  ]
};

export const userEngagement = {
  labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
  datasets: [
    {
      label: "Daily Active Users",
      data: [120, 145, 132, 158, 142, 115, 98],
      backgroundColor: "rgba(75, 192, 192, 0.6)",
      borderColor: "rgba(75, 192, 192, 1)",
      borderWidth: 1,
    },
    {
      label: "Session Completion Rate (%)",
      data: [85, 88, 82, 90, 87, 80, 75],
      backgroundColor: "rgba(255, 206, 86, 0.6)",
      borderColor: "rgba(255, 206, 86, 1)", 
      borderWidth: 1,
    }
  ]
};
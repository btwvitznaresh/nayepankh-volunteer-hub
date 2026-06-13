export const formatDate = (date) => {
  return new Date(date).toLocaleDateString("en-IN", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

export const formatTime = (date) => {
  return new Date(date).toLocaleTimeString("en-IN", {
    hour: "2-digit",
    minute: "2-digit",
  });
};

export const formatCurrency = (amount) => {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
  }).format(amount);
};

export const getInitials = (name) => {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();
};

export const calculateBadgeColor = (badge) => {
  const colors = {
    "First Step": "bg-blue-500",
    Helper: "bg-green-500",
    Champion: "bg-purple-500",
    Legend: "bg-yellow-500",
    Ambassador: "bg-pink-500",
  };
  return colors[badge] || "bg-gray-500";
};

export const truncateText = (text, length = 100) => {
  if (text.length > length) {
    return text.substring(0, length) + "...";
  }
  return text;
};

import Chip from "@mui/material/Chip";

export default function StatusChip({ status }) {

  const value =
    status?.toUpperCase() || "";

  const getStyle = () => {

    switch (value) {

      case "RUNNING":
        return {
          bg: "#dcfce7",
          color: "#166534"
        };

      case "STOPPED":
        return {
          bg: "#fee2e2",
          color: "#991b1b"
        };

      case "PENDING":
        return {
          bg: "#fef3c7",
          color: "#92400e"
        };

      case "APPROVED":
        return {
          bg: "#dcfce7",
          color: "#166534"
        };

      case "REJECTED":
        return {
          bg: "#fee2e2",
          color: "#991b1b"
        };

      default:
        return {
          bg: "#e2e8f0",
          color: "#334155"
        };
    }
  };

  const style = getStyle();

  return (
    <Chip
      label={status || "-"}
      sx={{
        bgcolor: style.bg,
        color: style.color,

        fontWeight: 700,
        fontSize: "12px",

        minWidth: 95,

        borderRadius: "20px",

        "& .MuiChip-label": {
          px: 2
        }
      }}
    />
  );
}s
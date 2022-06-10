export default function getCurrentDate() {
  const date = new Date()
    .toLocaleString()
    .split(",")[0]
    .split("/")
    .reverse()
    .join("-");
  const time = new Date().toLocaleTimeString();
  return `${date} ${time}`;
}

async function getData() {
  const response = await fetch("/api");
  const data = await response.json();
  console.log(data);

  for (item of data) {
    const root = document.createElement("p");
    const content = document.createElement("div");
    const timeStamp = document.createElement("div");
    const image = document.createElement("img");
    image.src = item.image64;
    image.alt = "image capture by webcam";
    content.textContent = `lat: ${item.lat}, lon: ${item.lon}`;
    const date = new Date(item.timeStamp).toLocaleDateString();
    timeStamp.textContent = `timeStamp: ${date}`;
    root.append(content, timeStamp, image);
    document.body.append(root);
  }
}
getData();

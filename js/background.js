const images = ["1.jpg", "2.png"];

const chosenImage = images[Math.floor(Math.random() * images.length)];

const bgImage = document.createElement("img");

bgImage.src = `./img/${chosenImage}`;

document.body.style.backgroundImage=`url(${bgImage.src})`;

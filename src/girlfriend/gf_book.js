// References to DOM Elements
const prevBtn = document.querySelector("#prev-btn");
const nextBtn = document.querySelector("#next-btn");
const book = document.querySelector("#book");

// Dynamically collect all papers
const papers = [
	document.querySelector("#p1"),
	document.querySelector("#p2"),
	document.querySelector("#p3"),
	document.querySelector("#p4"),
	document.querySelector("#p5"),
	document.querySelector("#p6"),
	document.querySelector("#p7"),
	document.querySelector("#p8")
];

const daysTogether = document.querySelector("#days-together");
const today = new Date();
const firstDay = new Date("2022-12-04");
const diffInMs = Math.abs(today.getTime() - firstDay.getTime());
const diffInDays = Math.ceil(diffInMs / (1000 * 60 * 60 * 24));
const diffInYears = Math.floor(diffInDays / 365);

daysTogether.innerHTML = `It's been <strong>${diffInDays}</strong> days<br>(<strong>${diffInYears}</strong> years and counting) since Dec 4, 2022`;

// Business Logic
let currentLocation = 1;
const numOfPapers = papers.length;
const maxLocation = numOfPapers + 1;

function openBook() {
	book.style.transform = "translateX(50%)";
	prevBtn.style.visibility = "visible";
	nextBtn.style.visibility = "visible";
}

function closeBook(isAtBeginning) {
	if (isAtBeginning) {
		book.style.transform = "translateX(0%)";
		prevBtn.style.visibility = "hidden";
	} else {
		book.style.transform = "translateX(100%)";
		nextBtn.style.visibility = "hidden";
	}
}

function goNextPage() {
	if (currentLocation < maxLocation) {
		if (currentLocation === 1) {
			openBook();
		}

		papers[currentLocation - 1].classList.add("flipped");
		papers[currentLocation - 1].style.zIndex = currentLocation;

		if (currentLocation === numOfPapers) {
			closeBook(false);
		}

		currentLocation++;
	}
}

function goPrevPage() {
	if (currentLocation > 1) {
		currentLocation--;

		papers[currentLocation - 1].classList.remove("flipped");
		papers[currentLocation - 1].style.zIndex = numOfPapers - currentLocation + 1;

		if (currentLocation === 1) {
			closeBook(true);
		} else if (currentLocation === numOfPapers) {
			openBook();
		}
	}
}

// Event Listeners
prevBtn.addEventListener("click", goPrevPage);
nextBtn.addEventListener("click", goNextPage);

// Initial state
closeBook(true);
